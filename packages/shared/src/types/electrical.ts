/**
 * Electrical Engineering Fundamental Units & Domain Types
 */

export type ElectricalUnit = 'V' | 'mV' | 'A' | 'mA' | 'uA' | 'Ohm' | 'kOhm' | 'MOhm' | 'F' | 'uF' | 'nF' | 'pF' | 'Hz' | 'kHz' | 'MHz';

export type LogicLevel = 'LOW' | 'HIGH' | 'HIGH_IMPEDANCE' | 'UNKNOWN';

export type SignalType = 
  | 'POWER_VCC'
  | 'POWER_GND'
  | 'PASSIVE_BIDIRECTIONAL'
  | 'DIGITAL_INPUT'
  | 'DIGITAL_OUTPUT'
  | 'DIGITAL_BIDIRECTIONAL'
  | 'ANALOG_INPUT'
  | 'ANALOG_OUTPUT'
  | 'PWM'
  | 'I2C_SDA'
  | 'I2C_SCL'
  | 'SPI_MOSI'
  | 'SPI_MISO'
  | 'SPI_SCK'
  | 'SPI_CS'
  | 'UART_TX'
  | 'UART_RX';

export interface PinState {
  pinId: string;
  voltage: number; // In Volts
  current: number; // In Amperes
  logicLevel: LogicLevel;
  signalType: SignalType;
  dutyCycle?: number; // 0.0 to 1.0 for PWM
  frequency?: number; // In Hz for PWM / Signal
}

export interface ElectricalSpec {
  minOperatingVoltage: number; // Volts
  maxOperatingVoltage: number; // Volts
  nominalOperatingVoltage: number; // Volts
  maxCurrentDraw: number; // Amperes
  absoluteMaxVoltage: number; // Overvoltage threshold
}
