import { BoardDefinition } from '@circuit/shared';

export const ESP32DevKitBoard: BoardDefinition = {
  id: 'board-esp32-devkit',
  name: 'ESP32 DevKit V1',
  family: 'ESP32',
  architecture: 'ESP32',
  clockFrequencyHz: 240000000,
  flashSizeBytes: 4194304,
  ramSizeBytes: 524288,
  electricalSpec: {
    minOperatingVoltage: 3.0,
    maxOperatingVoltage: 3.6,
    nominalOperatingVoltage: 3.3,
    maxCurrentDraw: 0.8,
    absoluteMaxVoltage: 3.6,
  },
  visualDimensions: { width: 280, height: 350 },
  gpioCapabilities: {
    'GPIO2': { pinId: 'GPIO2', gpioNumber: 2, digitalInput: true, digitalOutput: true, analogInput: true, adcChannel: 2, dacOutput: false, pwmOutput: true, touchInput: true, i2cSupport: false, spiSupport: false, uartSupport: false, interruptSupport: true },
    'GPIO21': { pinId: 'GPIO21', gpioNumber: 21, digitalInput: true, digitalOutput: true, analogInput: false, dacOutput: false, pwmOutput: true, touchInput: false, i2cSupport: true, spiSupport: false, uartSupport: false, interruptSupport: true },
    'GPIO22': { pinId: 'GPIO22', gpioNumber: 22, digitalInput: true, digitalOutput: true, analogInput: false, dacOutput: false, pwmOutput: true, touchInput: false, i2cSupport: true, spiSupport: false, uartSupport: false, interruptSupport: true },
  },
  pins: [
    { id: '3V3', name: '3V3', label: '3.3V', signalType: 'POWER_VCC', position: { x: 20, y: 20 }, isPowerVcc: true, maxVoltage: 3.3 },
    { id: 'GND', name: 'GND', label: 'GND', signalType: 'POWER_GND', position: { x: 20, y: 40 }, isPowerGnd: true, maxVoltage: 0 },
    { id: 'GPIO2', name: 'GPIO2', label: 'GPIO 2 (LED)', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 260, y: 100 } },
    { id: 'GPIO21', name: 'GPIO21', label: 'GPIO 21 (SDA)', signalType: 'I2C_SDA', position: { x: 260, y: 200 } },
    { id: 'GPIO22', name: 'GPIO22', label: 'GPIO 22 (SCL)', signalType: 'I2C_SCL', position: { x: 260, y: 220 } },
  ],
  datasheetUrl: 'https://www.espressif.com/sites/default/files/documentation/esp32_wroom_32_datasheet_en.pdf',
};
