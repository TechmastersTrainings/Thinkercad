import { ComponentDefinition } from '@circuit/shared';

export const CapacitorComponent: ComponentDefinition = {
  id: 'capacitor',
  name: 'Capacitor (10µF / 100nF)',
  category: 'PASSIVE',
  description: 'Passive component used for voltage smoothing, filtering noise, and decoupling power lines.',
  electricalSpec: {
    minOperatingVoltage: 0.0,
    maxOperatingVoltage: 25.0,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.5,
    absoluteMaxVoltage: 50.0,
  },
  visualDimensions: { width: 140, height: 140 },
  pins: [
    { id: 'anode', name: 'ANODE', label: 'Positive (+)', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 40, y: 110 } },
    { id: 'cathode', name: 'CATHODE', label: 'Negative (-)', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 100, y: 110 } },
  ],
  propertiesSchema: [
    { key: 'capacitance', label: 'Capacitance (µF)', type: 'number', default: 10, min: 0.1, max: 1000, unit: 'µF', description: 'Capacitance value' },
  ],
  datasheetUrl: 'https://en.wikipedia.org/wiki/Capacitor',
};
