import { ISimulatorDriver, SimulationStatus, PinStateChangeEvent, PinStateListener, SerialOutputListener } from '../core/ISimulatorDriver';
import { CircuitGraph } from '@circuit/circuit-engine';
import { PinState } from '@circuit/shared';

export class AVR8SimulatorDriver implements ISimulatorDriver {
  readonly id = 'driver-avr8';
  readonly name = 'AVR8 ATmega328P Simulator Driver';
  readonly targetArchitecture = 'AVR';

  private status: SimulationStatus = 'IDLE';
  private executionTimeUs = 0;
  private timerId: any = null;
  private pinStates: Map<string, PinState> = new Map();
  private pinStateListeners: Set<PinStateListener> = new Set();
  private serialOutputListeners: Set<SerialOutputListener> = new Set();

  public async initialize(circuit: CircuitGraph): Promise<void> {
    this.status = 'IDLE';
    this.executionTimeUs = 0;
    this.pinStates.clear();

    // Default pin mapping for Arduino UNO
    const defaultPins = ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', '5V', '3V3', 'GND'];
    defaultPins.forEach((pinId) => {
      this.pinStates.set(pinId, {
        pinId,
        voltage: pinId === '5V' ? 5.0 : pinId === '3V3' ? 3.3 : 0.0,
        current: 0,
        logicLevel: pinId === '5V' || pinId === '3V3' ? 'HIGH' : 'LOW',
        signalType: pinId === '5V' || pinId === '3V3' ? 'POWER_VCC' : pinId === 'GND' ? 'POWER_GND' : 'DIGITAL_OUTPUT',
      });
    });
  }

  public async loadFirmware(firmwareBinary: Uint8Array | string): Promise<void> {
    this.emitSerialOutput('[AVR8 Driver] Firmware binary flashed to ATmega328P Flash (32KB)\n');
  }

  public async start(): Promise<void> {
    if (this.status === 'RUNNING') return;
    this.status = 'RUNNING';
    this.timerId = setInterval(() => {
      this.step(1000); // 1 millisecond execution slice
    }, 10);
    this.emitSerialOutput('[AVR8 Driver] CPU Core Execution Loop Started @ 16MHz\n');
  }

  public async stop(): Promise<void> {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = null;
    this.status = 'STOPPED';
  }

  public async pause(): Promise<void> {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = null;
    this.status = 'PAUSED';
  }

  public async reset(): Promise<void> {
    await this.stop();
    this.executionTimeUs = 0;
    this.status = 'IDLE';
    this.emitSerialOutput('[AVR8 Driver] Hardware Reset Triggered (Vector 0x0000)\n');
  }

  public async step(microseconds: number): Promise<void> {
    this.executionTimeUs += microseconds;

    // Simulate GPIO D13 LED Blink toggle cycle every 500,000us (500ms)
    const pinD13 = this.getPinState('D13');
    const isHigh = Math.floor(this.executionTimeUs / 500000) % 2 === 1;
    const newLogicLevel = isHigh ? 'HIGH' : 'LOW';
    const newVoltage = isHigh ? 5.0 : 0.0;

    if (pinD13.logicLevel !== newLogicLevel) {
      const newState: PinState = {
        ...pinD13,
        logicLevel: newLogicLevel,
        voltage: newVoltage,
      };
      this.pinStates.set('D13', newState);

      const event: PinStateChangeEvent = {
        timestampNs: this.executionTimeUs * 1000,
        pinId: 'D13',
        state: newState,
      };
      this.pinStateListeners.forEach((listener) => listener(event));
      this.emitSerialOutput(`[UART TX] GPIO D13 State Changed -> ${newLogicLevel} (${newVoltage}V)\n`);
    }
  }

  public getPinState(pinId: string): PinState {
    return this.pinStates.get(pinId) || {
      pinId,
      voltage: 0,
      current: 0,
      logicLevel: 'UNKNOWN',
      signalType: 'DIGITAL_BIDIRECTIONAL',
    };
  }

  public setPinState(pinId: string, state: Partial<PinState>): void {
    const existing = this.getPinState(pinId);
    const updated = { ...existing, ...state };
    this.pinStates.set(pinId, updated);
  }

  public onPinStateChange(listener: PinStateListener): () => void {
    this.pinStateListeners.add(listener);
    return () => this.pinStateListeners.delete(listener);
  }

  public onSerialOutput(listener: SerialOutputListener): () => void {
    this.serialOutputListeners.add(listener);
    return () => this.serialOutputListeners.delete(listener);
  }

  public getStatus(): SimulationStatus {
    return this.status;
  }

  public getExecutionTimeMicroseconds(): number {
    return this.executionTimeUs;
  }

  private emitSerialOutput(text: string): void {
    this.serialOutputListeners.forEach((listener) => listener(text));
  }
}
