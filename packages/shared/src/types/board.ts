import { ElectricalSpec } from './electrical';
import { ComponentPinDefinition } from './circuit';

export type MicrocontrollerArchitecture = 'AVR' | 'ESP32' | 'RP2040' | 'STM32' | 'RISC-V' | 'ARM_CORTEX_M';

export interface BoardGPIOCapability {
  pinId: string;
  gpioNumber: number;
  digitalInput: boolean;
  digitalOutput: boolean;
  analogInput: boolean;
  adcChannel?: number;
  dacOutput: boolean;
  pwmOutput: boolean;
  pwmChannel?: number;
  touchInput: boolean;
  i2cSupport: boolean;
  spiSupport: boolean;
  uartSupport: boolean;
  interruptSupport: boolean;
}

export interface BoardDefinition {
  id: string;
  name: string;
  family: string;
  architecture: MicrocontrollerArchitecture;
  clockFrequencyHz: number;
  flashSizeBytes: number;
  ramSizeBytes: number;
  electricalSpec: ElectricalSpec;
  pins: ComponentPinDefinition[];
  gpioCapabilities: Record<string, BoardGPIOCapability>;
  visualDimensions: { width: number; height: number };
  svgModelPath?: string;
  datasheetUrl?: string;
}
