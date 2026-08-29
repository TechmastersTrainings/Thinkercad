import { BoardDefinition } from '@circuit/shared';

export const MicrobitBoard: BoardDefinition = {
  id: 'board-microbit',
  name: 'micro:bit',
  family: 'BBC micro:bit',
  architecture: 'ARM_CORTEX_M',
  clockFrequencyHz: 64000000,
  flashSizeBytes: 524288,
  ramSizeBytes: 131072,
  electricalSpec: {
    minOperatingVoltage: 3.0,
    maxOperatingVoltage: 3.3,
    nominalOperatingVoltage: 3.3,
    maxCurrentDraw: 0.3,
    absoluteMaxVoltage: 3.6,
  },
  visualDimensions: { width: 220, height: 180 },
  gpioCapabilities: {
    'P0': { pinId: 'P0', gpioNumber: 0, digitalInput: true, digitalOutput: true, analogInput: true, dacOutput: false, pwmOutput: true, touchInput: true, i2cSupport: false, spiSupport: false, uartSupport: false, interruptSupport: true },
    'P1': { pinId: 'P1', gpioNumber: 1, digitalInput: true, digitalOutput: true, analogInput: true, dacOutput: false, pwmOutput: true, touchInput: true, i2cSupport: false, spiSupport: false, uartSupport: false, interruptSupport: true },
    'P2': { pinId: 'P2', gpioNumber: 2, digitalInput: true, digitalOutput: true, analogInput: true, dacOutput: false, pwmOutput: true, touchInput: true, i2cSupport: false, spiSupport: false, uartSupport: false, interruptSupport: true },
  },
  pins: [
    { id: 'P0', name: 'Pin 0', label: '0', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 30, y: 160 } },
    { id: 'P1', name: 'Pin 1', label: '1', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 75, y: 160 } },
    { id: 'P2', name: 'Pin 2', label: '2', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 120, y: 160 } },
    { id: '3V', name: '3V Power', label: '3V', signalType: 'POWER_VCC', position: { x: 165, y: 160 }, isPowerVcc: true, maxVoltage: 3.3 },
    { id: 'GND', name: 'GND', label: 'GND', signalType: 'POWER_GND', position: { x: 195, y: 160 }, isPowerGnd: true, maxVoltage: 0 },
  ],
};

export const MicrobitBreakoutBoard: BoardDefinition = {
  id: 'board-microbit-breakout',
  name: 'micro:bit with Breakout',
  family: 'BBC micro:bit',
  architecture: 'ARM_CORTEX_M',
  clockFrequencyHz: 64000000,
  flashSizeBytes: 524288,
  ramSizeBytes: 131072,
  electricalSpec: {
    minOperatingVoltage: 3.0,
    maxOperatingVoltage: 5.0,
    nominalOperatingVoltage: 3.3,
    maxCurrentDraw: 0.5,
    absoluteMaxVoltage: 5.5,
  },
  visualDimensions: { width: 240, height: 210 },
  gpioCapabilities: {
    'P0': { pinId: 'P0', gpioNumber: 0, digitalInput: true, digitalOutput: true, analogInput: true, dacOutput: false, pwmOutput: true, touchInput: true, i2cSupport: false, spiSupport: false, uartSupport: false, interruptSupport: true },
    'P1': { pinId: 'P1', gpioNumber: 1, digitalInput: true, digitalOutput: true, analogInput: true, dacOutput: false, pwmOutput: true, touchInput: true, i2cSupport: false, spiSupport: false, uartSupport: false, interruptSupport: true },
    'P2': { pinId: 'P2', gpioNumber: 2, digitalInput: true, digitalOutput: true, analogInput: true, dacOutput: false, pwmOutput: true, touchInput: true, i2cSupport: false, spiSupport: false, uartSupport: false, interruptSupport: true },
  },
  pins: [
    { id: 'P0', name: 'Pin 0', label: 'P0', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 30, y: 195 } },
    { id: 'P1', name: 'Pin 1', label: 'P1', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 60, y: 195 } },
    { id: 'P2', name: 'Pin 2', label: 'P2', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 90, y: 195 } },
    { id: '3V', name: '3V', label: '3V', signalType: 'POWER_VCC', position: { x: 150, y: 195 }, isPowerVcc: true, maxVoltage: 3.3 },
    { id: 'GND', name: 'GND', label: 'GND', signalType: 'POWER_GND', position: { x: 180, y: 195 }, isPowerGnd: true, maxVoltage: 0 },
    { id: '5V', name: '5V', label: '5V', signalType: 'POWER_VCC', position: { x: 210, y: 195 }, isPowerVcc: true, maxVoltage: 5.0 },
  ],
};

export const ATtiny85Board: BoardDefinition = {
  id: 'board-attiny85',
  name: 'ATtiny',
  family: 'AVR',
  architecture: 'AVR',
  clockFrequencyHz: 8000000,
  flashSizeBytes: 8192,
  ramSizeBytes: 512,
  electricalSpec: {
    minOperatingVoltage: 2.7,
    maxOperatingVoltage: 5.5,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.1,
    absoluteMaxVoltage: 6.0,
  },
  visualDimensions: { width: 140, height: 110 },
  gpioCapabilities: {
    'PB0': { pinId: 'PB0', gpioNumber: 0, digitalInput: true, digitalOutput: true, analogInput: false, dacOutput: false, pwmOutput: true, touchInput: false, i2cSupport: true, spiSupport: true, uartSupport: false, interruptSupport: true },
    'PB1': { pinId: 'PB1', gpioNumber: 1, digitalInput: true, digitalOutput: true, analogInput: false, dacOutput: false, pwmOutput: true, touchInput: false, i2cSupport: false, spiSupport: true, uartSupport: false, interruptSupport: true },
    'PB2': { pinId: 'PB2', gpioNumber: 2, digitalInput: true, digitalOutput: true, analogInput: true, dacOutput: false, pwmOutput: false, touchInput: false, i2cSupport: true, spiSupport: true, uartSupport: false, interruptSupport: true },
    'PB3': { pinId: 'PB3', gpioNumber: 3, digitalInput: true, digitalOutput: true, analogInput: true, dacOutput: false, pwmOutput: false, touchInput: false, i2cSupport: false, spiSupport: false, uartSupport: false, interruptSupport: false },
    'PB4': { pinId: 'PB4', gpioNumber: 4, digitalInput: true, digitalOutput: true, analogInput: true, dacOutput: false, pwmOutput: true, touchInput: false, i2cSupport: false, spiSupport: false, uartSupport: false, interruptSupport: false },
  },
  pins: [
    { id: 'PB5', name: 'PB5 (RESET)', label: '1 (PB5)', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 25, y: 15 } },
    { id: 'PB3', name: 'PB3 (ADC3)', label: '2 (PB3)', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 55, y: 15 } },
    { id: 'PB4', name: 'PB4 (ADC2)', label: '3 (PB4)', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 85, y: 15 } },
    { id: 'GND', name: 'GND', label: '4 (GND)', signalType: 'POWER_GND', position: { x: 115, y: 15 }, isPowerGnd: true, maxVoltage: 0 },
    { id: 'PB0', name: 'PB0 (MOSI/SDA)', label: '5 (PB0)', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 115, y: 95 } },
    { id: 'PB1', name: 'PB1 (MISO)', label: '6 (PB1)', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 85, y: 95 } },
    { id: 'PB2', name: 'PB2 (SCK/SCL)', label: '7 (PB2)', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 55, y: 95 } },
    { id: 'VCC', name: 'VCC (+5V)', label: '8 (VCC)', signalType: 'POWER_VCC', position: { x: 25, y: 95 }, isPowerVcc: true, maxVoltage: 5.5 },
  ],
};
