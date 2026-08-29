import { ComponentDefinition } from '@circuit/shared';

export const UltrasonicHCSR04Component: ComponentDefinition = {
  id: 'ultrasonic-hcsr04',
  name: 'HC-SR04 Ultrasonic Distance Sensor',
  category: 'SENSORS',
  description: 'Ultrasonic non-contact distance measurement module (2cm to 400cm).',
  electricalSpec: {
    minOperatingVoltage: 4.5,
    maxOperatingVoltage: 5.5,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.015, // 15mA
    absoluteMaxVoltage: 6.0,
  },
  visualDimensions: { width: 140, height: 70 },
  pins: [
    { id: 'vcc', name: 'VCC', label: 'VCC', signalType: 'POWER_VCC', position: { x: 20, y: 70 }, isPowerVcc: true },
    { id: 'trig', name: 'TRIG (Trigger Input)', label: 'TRIG', signalType: 'DIGITAL_INPUT', position: { x: 50, y: 70 } },
    { id: 'echo', name: 'ECHO (Echo Pulse Output)', label: 'ECHO', signalType: 'DIGITAL_OUTPUT', position: { x: 80, y: 70 } },
    { id: 'gnd', name: 'GND', label: 'GND', signalType: 'POWER_GND', position: { x: 110, y: 70 }, isPowerGnd: true },
  ],
  propertiesSchema: [
    {
      key: 'distanceCm',
      label: 'Target Distance (cm)',
      type: 'number',
      default: 50,
      min: 2,
      max: 400,
      unit: 'cm',
      description: 'Simulated obstacle distance in centimeters',
    },
  ],
};
