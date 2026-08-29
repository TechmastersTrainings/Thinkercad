import { ComponentDefinition } from '@circuit/shared';

export const PushbuttonComponent: ComponentDefinition = {
  id: 'pushbutton',
  name: 'Momentary Push Button',
  category: 'ELECTROMECHANICAL',
  description: '4-Pin SPST Momentary Tactile Switch.',
  electricalSpec: {
    minOperatingVoltage: 0,
    maxOperatingVoltage: 24,
    nominalOperatingVoltage: 5,
    maxCurrentDraw: 0.05,
    absoluteMaxVoltage: 50,
  },
  visualDimensions: { width: 60, height: 60 },
  pins: [
    { id: '1a', name: 'Pin 1A', label: '1A', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 0, y: 15 } },
    { id: '1b', name: 'Pin 1B', label: '1B', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 0, y: 45 } },
    { id: '2a', name: 'Pin 2A', label: '2A', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 60, y: 15 } },
    { id: '2b', name: 'Pin 2B', label: '2B', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 60, y: 45 } },
  ],
  propertiesSchema: [
    {
      key: 'isPressed',
      label: 'Button State',
      type: 'boolean',
      default: false,
      description: 'Tactile switch mechanical contact state',
    },
  ],
};
