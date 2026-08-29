import { ComponentDefinition } from '@circuit/shared';

export const LCD1602Component: ComponentDefinition = {
  id: 'lcd1602',
  name: 'HD44780 16x2 LCD Display',
  category: 'DISPLAYS',
  description: '16 Characters x 2 Lines Monochrome LCD Display with I2C Backpack module support.',
  electricalSpec: {
    minOperatingVoltage: 4.7,
    maxOperatingVoltage: 5.3,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.12, // 120mA with backlight
    absoluteMaxVoltage: 6.0,
  },
  visualDimensions: { width: 240, height: 110 },
  pins: [
    { id: 'vcc', name: 'VCC', label: 'VCC', signalType: 'POWER_VCC', position: { x: 20, y: 110 }, isPowerVcc: true },
    { id: 'gnd', name: 'GND', label: 'GND', signalType: 'POWER_GND', position: { x: 50, y: 110 }, isPowerGnd: true },
    { id: 'sda', name: 'SDA (I2C Data)', label: 'SDA', signalType: 'I2C_SDA', position: { x: 80, y: 110 } },
    { id: 'scl', name: 'SCL (I2C Clock)', label: 'SCL', signalType: 'I2C_SCL', position: { x: 110, y: 110 } },
  ],
  propertiesSchema: [
    {
      key: 'line1Text',
      label: 'Line 1 Display Text',
      type: 'string',
      default: 'Circuit Platform',
      description: 'Text rendered on top line of LCD',
    },
    {
      key: 'line2Text',
      label: 'Line 2 Display Text',
      type: 'string',
      default: 'System Online',
      description: 'Text rendered on bottom line of LCD',
    },
  ],
};
