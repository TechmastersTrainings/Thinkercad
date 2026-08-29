import { ComponentDefinition } from '@circuit/shared';

export const Keypad4x4Component: ComponentDefinition = {
  id: 'keypad-4x4',
  name: '4x4 Matrix Keypad Module',
  category: 'ELECTROMECHANICAL',
  description: '16-button tactile matrix keypad arranged in 4 rows and 4 columns for numeric/alphanumeric PIN entry.',
  electricalSpec: {
    minOperatingVoltage: 3.3,
    maxOperatingVoltage: 5.0,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.01,
    absoluteMaxVoltage: 6.0,
  },
  visualDimensions: { width: 240, height: 220 },
  pins: [
    { id: 'r1', name: 'R1', label: 'Row 1', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 20, y: 190 } },
    { id: 'r2', name: 'R2', label: 'Row 2', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 50, y: 190 } },
    { id: 'r3', name: 'R3', label: 'Row 3', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 80, y: 190 } },
    { id: 'r4', name: 'R4', label: 'Row 4', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 110, y: 190 } },
    { id: 'c1', name: 'C1', label: 'Col 1', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 140, y: 190 } },
    { id: 'c2', name: 'C2', label: 'Col 2', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 170, y: 190 } },
    { id: 'c3', name: 'C3', label: 'Col 3', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 200, y: 190 } },
    { id: 'c4', name: 'C4', label: 'Col 4', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 220, y: 190 } },
  ],
  propertiesSchema: [
    { key: 'lastKeyPressed', label: 'Last Key Pressed', type: 'string', default: 'None', description: 'Interactive button key state' },
  ],
  datasheetUrl: 'https://cdn-shop.adafruit.com/datasheets/Keypad4x4.pdf',
};
