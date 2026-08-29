import { ComponentDefinition } from '@circuit/shared';

export const RGBLEDComponent: ComponentDefinition = {
  id: 'rgb-led',
  name: 'RGB LED (Common Cathode)',
  category: 'OPTOELECTRONICS',
  description: '4-pin Tri-Color RGB LED with individual Red, Green, Blue controls and common ground pin.',
  electricalSpec: {
    minOperatingVoltage: 2.0,
    maxOperatingVoltage: 3.4,
    nominalOperatingVoltage: 3.0,
    maxCurrentDraw: 0.06,
    absoluteMaxVoltage: 4.0,
  },
  visualDimensions: { width: 140, height: 160 },
  pins: [
    { id: 'red', name: 'RED', label: 'R (Red)', signalType: 'DIGITAL_INPUT', position: { x: 20, y: 130 } },
    { id: 'cathode', name: 'GND', label: 'Cathode (-)', signalType: 'POWER_GND', position: { x: 50, y: 130 }, isPowerGnd: true },
    { id: 'green', name: 'GREEN', label: 'G (Green)', signalType: 'DIGITAL_INPUT', position: { x: 80, y: 130 } },
    { id: 'blue', name: 'BLUE', label: 'B (Blue)', signalType: 'DIGITAL_INPUT', position: { x: 110, y: 130 } },
  ],
  propertiesSchema: [
    { key: 'colorR', label: 'Red Channel (0-255)', type: 'number', default: 255, min: 0, max: 255, description: 'PWM Intensity of Red LED' },
    { key: 'colorG', label: 'Green Channel (0-255)', type: 'number', default: 128, min: 0, max: 255, description: 'PWM Intensity of Green LED' },
    { key: 'colorB', label: 'Blue Channel (0-255)', type: 'number', default: 0, min: 0, max: 255, description: 'PWM Intensity of Blue LED' },
  ],
  datasheetUrl: 'https://cdn-shop.adafruit.com/datasheets/RGBLED.pdf',
};
