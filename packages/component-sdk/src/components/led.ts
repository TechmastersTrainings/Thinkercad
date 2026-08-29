import { ComponentDefinition } from '@circuit/shared';

export const LEDComponent: ComponentDefinition = {
  id: 'led',
  name: 'Light Emitting Diode (LED)',
  category: 'OPTOELECTRONICS',
  description: '5mm Through-Hole Light Emitting Diode with forward voltage drop.',
  electricalSpec: {
    minOperatingVoltage: 1.8,
    maxOperatingVoltage: 2.2,
    nominalOperatingVoltage: 2.0,
    maxCurrentDraw: 0.02, // 20mA max
    absoluteMaxVoltage: 3.3,
  },
  visualDimensions: { width: 60, height: 80 },
  pins: [
    { id: 'anode', name: 'Anode (+)', label: 'A', signalType: 'DIGITAL_INPUT', position: { x: 15, y: 80 } },
    { id: 'cathode', name: 'Cathode (-)', label: 'K', signalType: 'POWER_GND', position: { x: 45, y: 80 }, isPowerGnd: true },
  ],
  propertiesSchema: [
    {
      key: 'color',
      label: 'LED Color',
      type: 'enum',
      default: 'RED',
      options: ['RED', 'GREEN', 'BLUE', 'YELLOW', 'WHITE'],
      description: 'Emitted light color wavelength',
    },
  ],
};
