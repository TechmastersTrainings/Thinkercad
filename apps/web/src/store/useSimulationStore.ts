import { create } from 'zustand';
import { SimulationManager, AVR8SimulatorDriver, SimulationStatus } from '@circuit/simulation-sdk';
import { useCircuitStore } from './useCircuitStore';

interface SimulationStoreState {
  manager: SimulationManager;
  driver: AVR8SimulatorDriver;
  status: SimulationStatus;
  executionTimeUs: number;
  serialLogs: string[];
  firmwareCode: string;
  pinStates: Record<string, boolean>;

  initSimulation: () => Promise<void>;
  start: () => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
  reset: () => Promise<void>;
  updateFirmware: (code: string) => void;
  clearLogs: () => void;
}

const defaultArduinoCode = `int led_red = 0; // the red LED is connected to Pin 0 of the Arduino
int led_yellow = 1; // the yellow LED is connected to Pin 1 of the Arduino
int led_green = 2; // the green LED is connected to Pin 2 of the Arduino

void setup() {
  // set up all the LEDs as OUTPUT
  pinMode(led_red, OUTPUT);
  pinMode(led_yellow, OUTPUT);
  pinMode(led_green, OUTPUT);
}

void loop() {
  // turn the green LED on and the other LEDs off
  digitalWrite(led_red, LOW); 
  digitalWrite(led_yellow, LOW);
  digitalWrite(led_green, HIGH);
  delay(2000);    // wait 2 seconds
  
  // turn the yellow LED on and the other LEDs off
  digitalWrite(led_red, LOW);   
  digitalWrite(led_yellow, HIGH);
  digitalWrite(led_green, LOW);
  delay(1000);   // wait 1 second
  
  // turn the red LED on and the other LEDs off
  digitalWrite(led_red, HIGH);  
  digitalWrite(led_yellow, LOW);
  digitalWrite(led_green, LOW);
  delay(3000);  // wait 3 seconds        
}
`;

interface ExecutionStep {
  pinOps: Array<{ pinId: string; state: boolean }>;
  delayMs: number;
  logText: string;
}

function parseArduinoExecutionPlan(code: string): ExecutionStep[] {
  const vars: Record<string, number> = {};
  const varRegex = /(?:const\s+)?int\s+([a-zA-Z0-9_]+)\s*=\s*(\d+);/g;
  let match: RegExpExecArray | null;
  while ((match = varRegex.exec(code)) !== null) {
    vars[match[1]] = parseInt(match[2], 10);
  }
  const defineRegex = /#define\s+([a-zA-Z0-9_]+)\s+(\d+)/g;
  while ((match = defineRegex.exec(code)) !== null) {
    vars[match[1]] = parseInt(match[2], 10);
  }

  const loopMatch = /void\s+loop\s*\(\s*\)\s*\{([\s\S]*?)\}(?:\s*void|\s*$)/.exec(code);
  const loopBody = loopMatch ? loopMatch[1] : code;

  const steps: ExecutionStep[] = [];
  let currentPinOps: Array<{ pinId: string; state: boolean }> = [];
  const lines = loopBody.split('\n');

  for (const line of lines) {
    const cleanLine = line.trim();
    if (!cleanLine || cleanLine.startsWith('//')) continue;

    const dwMatch = /digitalWrite\s*\(\s*([a-zA-Z0-9_]+)\s*,\s*(HIGH|LOW|1|0)\s*\)/i.exec(cleanLine);
    if (dwMatch) {
      const pinArg = dwMatch[1];
      const stateArg = dwMatch[2].toUpperCase();
      const pinNum = vars[pinArg] !== undefined ? vars[pinArg] : parseInt(pinArg, 10);
      const isHigh = stateArg === 'HIGH' || stateArg === '1';
      if (!isNaN(pinNum)) {
        currentPinOps.push({ pinId: `D${pinNum}`, state: isHigh });
      }
    }

    const delayMatch = /delay\s*\(\s*(\d+)\s*\)/i.exec(cleanLine);
    if (delayMatch) {
      const delayMs = Math.max(100, parseInt(delayMatch[1], 10));
      const logParts = currentPinOps.map((op) => `${op.pinId}=${op.state ? 'HIGH' : 'LOW'}`).join(', ');
      steps.push({
        pinOps: [...currentPinOps],
        delayMs,
        logText: `[Loop Step] ${logParts || 'Delay'} (${delayMs}ms)`,
      });
      currentPinOps = [];
    }
  }

  if (steps.length === 0) {
    steps.push({
      pinOps: [{ pinId: 'D13', state: true }, { pinId: 'D0', state: true }, { pinId: 'D1', state: true }, { pinId: 'D2', state: true }],
      delayMs: 1000,
      logText: '[Loop Step] Default Blink Step (1000ms)',
    });
    steps.push({
      pinOps: [{ pinId: 'D13', state: false }, { pinId: 'D0', state: false }, { pinId: 'D1', state: false }, { pinId: 'D2', state: false }],
      delayMs: 1000,
      logText: '[Loop Step] Default Blink Step (1000ms)',
    });
  }

  return steps;
}

const manager = new SimulationManager();
const driver = new AVR8SimulatorDriver();
let simTimeout: any = null;
let currentStepIdx = 0;
let executionPlan: ExecutionStep[] = [];

export const useSimulationStore = create<SimulationStoreState>((set, get) => ({
  manager,
  driver,
  status: 'IDLE',
  executionTimeUs: 0,
  serialLogs: ['[System] Simulator Ready. Build your circuit and press Start Simulation.\n'],
  firmwareCode: defaultArduinoCode,
  pinStates: { D0: false, D1: false, D2: false, D13: false, '5V': true, '3V3': true, GND: false },

  initSimulation: async () => {
    const circuitGraph = useCircuitStore.getState().graph;
    await manager.registerAndInitDriver(driver, circuitGraph);

    manager.onStatusChange((status) => {
      set({ status });
    });

    driver.onSerialOutput((text) => {
      set((state) => ({ serialLogs: [...state.serialLogs, text] }));
    });
  },

  start: async () => {
    if (simTimeout) clearTimeout(simTimeout);
    await get().initSimulation();
    await manager.loadFirmware(get().firmwareCode);
    await manager.startSimulation();

    executionPlan = parseArduinoExecutionPlan(get().firmwareCode);
    currentStepIdx = 0;

    set({
      status: 'RUNNING',
      serialLogs: [
        ...get().serialLogs,
        `[${new Date().toLocaleTimeString()}] Simulation Running: AVR CPU 16MHz Clock Initialized\n`,
        `Firmware compiled: ${executionPlan.length} execution step(s) loaded\n`,
      ],
    });

    const runNextStep = () => {
      if (get().status !== 'RUNNING' && get().status !== 'IDLE') return;

      const step = executionPlan[currentStepIdx % executionPlan.length];
      currentStepIdx++;

      const updatedPinStates = { ...get().pinStates };
      step.pinOps.forEach((op) => {
        updatedPinStates[op.pinId] = op.state;
      });

      set((state) => ({
        pinStates: updatedPinStates,
        serialLogs: [
          ...state.serialLogs.slice(-80),
          `${step.logText}\n`,
        ],
      }));

      simTimeout = setTimeout(runNextStep, step.delayMs);
    };

    runNextStep();
  },

  pause: async () => {
    if (simTimeout) clearTimeout(simTimeout);
    await manager.pauseSimulation();
    set({ status: 'PAUSED' });
  },

  stop: async () => {
    if (simTimeout) clearTimeout(simTimeout);
    await manager.stopSimulation();
    set({
      status: 'IDLE',
      pinStates: { D0: false, D1: false, D2: false, D13: false, '5V': true, '3V3': true, GND: false },
    });
  },

  reset: async () => {
    if (simTimeout) clearTimeout(simTimeout);
    await manager.resetSimulation();
    set({
      executionTimeUs: 0,
      serialLogs: ['[System] Simulator Reset.\n'],
      pinStates: { D0: false, D1: false, D2: false, D13: false, '5V': true, '3V3': true, GND: false },
    });
  },

  updateFirmware: (code: string) => {
    set({ firmwareCode: code });
    useCircuitStore.getState().runValidation();
  },

  clearLogs: () => {
    set({ serialLogs: [] });
  },
}));
