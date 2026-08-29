import { PinState } from '@circuit/shared';
import { CircuitGraph } from '@circuit/circuit-engine';

export type SimulationStatus = 'IDLE' | 'RUNNING' | 'PAUSED' | 'STOPPED' | 'ERROR';

export interface PinStateChangeEvent {
  timestampNs: number;
  pinId: string;
  state: PinState;
}

export type PinStateListener = (event: PinStateChangeEvent) => void;
export type SerialOutputListener = (data: string) => void;

export interface ISimulatorDriver {
  readonly id: string;
  readonly name: string;
  readonly targetArchitecture: string;

  initialize(circuit: CircuitGraph): Promise<void>;
  loadFirmware(firmwareBinary: Uint8Array | string): Promise<void>;
  
  start(): Promise<void>;
  stop(): Promise<void>;
  pause(): Promise<void>;
  reset(): Promise<void>;
  
  step(microseconds: number): Promise<void>;
  
  getPinState(pinId: string): PinState;
  setPinState(pinId: string, state: Partial<PinState>): void;
  
  onPinStateChange(listener: PinStateListener): () => void;
  onSerialOutput(listener: SerialOutputListener): () => void;

  getStatus(): SimulationStatus;
  getExecutionTimeMicroseconds(): number;
}
