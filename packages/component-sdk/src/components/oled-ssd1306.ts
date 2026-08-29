import { ComponentDefinition } from '@circuit/shared';

export const SSD1306OLEDComponent: ComponentDefinition = {
  id: 'oled-ssd1306',
  name: '0.96" I2C OLED Display (SSD1306)',
  category: 'DISPLAYS',
  description: '128x64 Pixel monochrome graphics display module with I2C bus interface.',
  electricalSpec: {
    minOperatingVoltage: 3.3,
    maxOperatingVoltage: 5.0,
    nominalOperatingVoltage: 3.3,
    maxCurrentDraw: 0.02,
    absoluteMaxVoltage: 5.5,
  },
  visualDimensions: { width: 220, height: 180 },
  pins: [
    { id: 'vcc', name: 'VCC', label: 'VCC (+3.3V/5V)', signalType: 'POWER_VCC', position: { x: 30, y: 150 }, isPowerVcc: true, maxVoltage: 5.0 },
    { id: 'gnd', name: 'GND', label: 'GND (Ground)', signalType: 'POWER_GND', position: { x: 70, y: 150 }, isPowerGnd: true },
    { id: 'scl', name: 'SCL', label: 'SCL (Clock)', signalType: 'I2C_SCL', position: { x: 110, y: 150 } },
    { id: 'sda', name: 'SDA', label: 'SDA (Data)', signalType: 'I2C_SDA', position: { x: 150, y: 150 } },
  ],
  propertiesSchema: [
    { key: 'displayText', label: 'Display Buffer Text', type: 'string', default: 'SSD1306 OLED Ready', description: 'Text line rendered on simulated OLED screen' },
    { key: 'i2cAddress', label: 'I2C Address', type: 'enum', default: '0x3C', options: ['0x3C', '0x3D'], description: 'I2C Bus Address' },
  ],
  datasheetUrl: 'https://cdn-shop.adafruit.com/datasheets/SSD1306.pdf',
};
