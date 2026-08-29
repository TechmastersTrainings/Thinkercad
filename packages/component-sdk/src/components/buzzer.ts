import { ComponentDefinition } from '@circuit/shared';

export const BuzzerComponent: ComponentDefinition = {
  id: 'buzzer',
  name: 'Piezoelectric Buzzer',
  category: 'ELECTROMECHANICAL',
  description: '5V Active Piezo Buzzer for audio output alerts and tones.',
  electricalSpec: {
    minOperatingVoltage: 3.3,
    maxOperatingVoltage: 5.0,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.03,
    absoluteMaxVoltage: 7.0,
  },
  visualDimensions: { width: 60, height: 60 },
  pins: [
    { id: 'positive', name: 'Positive (+)', label: '+', signalType: 'PWM', position: { x: 15, y: 60 } },
    { id: 'negative', name: 'Negative (-)', label: '-', signalType: 'POWER_GND', position: { x: 45, y: 60 }, isPowerGnd: true },
  ],
  propertiesSchema: [
    {
      key: 'frequency',
      label: 'Frequency',
      type: 'number',
      default: 2000,
      unit: 'Hz',
      description: 'Tone pitch frequency in Hertz',
    },
  ],
};
