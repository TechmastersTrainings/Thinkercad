import { ComponentDefinition } from '@circuit/shared';

export const ResistorComponent: ComponentDefinition = {
  id: 'resistor',
  name: 'Resistor',
  category: 'PASSIVE',
  description: 'Axial-leaded fixed resistance passive electrical resistor.',
  electricalSpec: {
    minOperatingVoltage: -50,
    maxOperatingVoltage: 50,
    nominalOperatingVoltage: 0,
    maxCurrentDraw: 0.25, // Watts / Voltage
    absoluteMaxVoltage: 250,
  },
  visualDimensions: { width: 120, height: 40 },
  pins: [
    { id: 'pin1', name: 'Pin 1', label: '1', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 0, y: 20 } },
    { id: 'pin2', name: 'Pin 2', label: '2', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 120, y: 20 } },
  ],
  propertiesSchema: [
    {
      key: 'resistance',
      label: 'Resistance',
      type: 'number',
      default: 220,
      unit: 'Ohm',
      min: 1,
      max: 10000000,
      description: 'Electrical resistance value in Ohms',
    },
    {
      key: 'tolerance',
      label: 'Tolerance',
      type: 'enum',
      default: '5%',
      options: ['1%', '5%', '10%'],
      description: 'Manufacturing resistance tolerance percentage',
    },
  ],
};
