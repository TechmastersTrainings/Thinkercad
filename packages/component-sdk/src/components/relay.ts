import { ComponentDefinition } from '@circuit/shared';

export const RelayComponent: ComponentDefinition = {
  id: 'relay',
  name: '5V Single Channel Relay Module',
  category: 'ELECTROMECHANICAL',
  description: 'Optocoupler isolated 5V relay switch module for controlling AC/DC high voltage loads.',
  electricalSpec: {
    minOperatingVoltage: 4.5,
    maxOperatingVoltage: 5.5,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.08, // 80mA coil current
    absoluteMaxVoltage: 6.0,
  },
  visualDimensions: { width: 110, height: 90 },
  pins: [
    { id: 'vcc', name: 'VCC Power', label: 'VCC', signalType: 'POWER_VCC', position: { x: 15, y: 90 }, isPowerVcc: true },
    { id: 'in', name: 'Signal Input (Active Low)', label: 'IN', signalType: 'DIGITAL_INPUT', position: { x: 45, y: 90 } },
    { id: 'gnd', name: 'GND Ground', label: 'GND', signalType: 'POWER_GND', position: { x: 75, y: 90 }, isPowerGnd: true },
    { id: 'com', name: 'Common (COM)', label: 'COM', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 100, y: 15 } },
    { id: 'no', name: 'Normally Open (NO)', label: 'NO', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 100, y: 40 } },
    { id: 'nc', name: 'Normally Closed (NC)', label: 'NC', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 100, y: 65 } },
  ],
  propertiesSchema: [
    {
      key: 'isOpen',
      label: 'Relay Coil Switch State',
      type: 'boolean',
      default: false,
      description: 'Electromagnetic coil activation state',
    },
  ],
};
