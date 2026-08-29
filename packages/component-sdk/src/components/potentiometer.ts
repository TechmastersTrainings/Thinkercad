import { ComponentDefinition } from '@circuit/shared';

export const PotentiometerComponent: ComponentDefinition = {
  id: 'potentiometer',
  name: 'Potentiometer',
  category: 'PASSIVE',
  description: 'Rotary 3-terminal variable resistor voltage divider.',
  electricalSpec: {
    minOperatingVoltage: 0,
    maxOperatingVoltage: 12,
    nominalOperatingVoltage: 5,
    maxCurrentDraw: 0.1,
    absoluteMaxVoltage: 24,
  },
  visualDimensions: { width: 80, height: 100 },
  pins: [
    { id: 'vcc', name: 'Terminal 1 (VCC)', label: 'VCC', signalType: 'POWER_VCC', position: { x: 10, y: 100 }, isPowerVcc: true },
    { id: 'wiper', name: 'Wiper (Output)', label: 'SIG', signalType: 'ANALOG_OUTPUT', position: { x: 40, y: 100 } },
    { id: 'gnd', name: 'Terminal 2 (GND)', label: 'GND', signalType: 'POWER_GND', position: { x: 70, y: 100 }, isPowerGnd: true },
  ],
  propertiesSchema: [
    {
      key: 'maxResistance',
      label: 'Max Resistance',
      type: 'number',
      default: 10000,
      unit: 'Ohm',
      description: 'Total track resistance in Ohms (e.g. 10k)',
    },
    {
      key: 'position',
      label: 'Wiper Position %',
      type: 'number',
      default: 50,
      min: 0,
      max: 100,
      description: 'Potentiometer knob position percentage',
    },
  ],
};
