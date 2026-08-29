import { ComponentDefinition } from '@circuit/shared';

export const StepperMotorComponent: ComponentDefinition = {
  id: 'stepper-motor',
  name: '28BYJ-48 Stepper Motor + ULN2003 Driver',
  category: 'ELECTROMECHANICAL',
  description: '5V 4-Phase Unipolar Stepper Motor with ULN2003 Darlington transistor driver array board.',
  electricalSpec: {
    minOperatingVoltage: 5.0,
    maxOperatingVoltage: 5.0,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.3,
    absoluteMaxVoltage: 6.0,
  },
  visualDimensions: { width: 220, height: 180 },
  pins: [
    { id: 'vcc', name: 'VCC', label: '5V Power', signalType: 'POWER_VCC', position: { x: 30, y: 150 }, isPowerVcc: true, maxVoltage: 5.0 },
    { id: 'gnd', name: 'GND', label: 'GND Ground', signalType: 'POWER_GND', position: { x: 60, y: 150 }, isPowerGnd: true },
    { id: 'in1', name: 'IN1', label: 'IN1 (Coil A)', signalType: 'DIGITAL_INPUT', position: { x: 90, y: 150 } },
    { id: 'in2', name: 'IN2', label: 'IN2 (Coil B)', signalType: 'DIGITAL_INPUT', position: { x: 120, y: 150 } },
    { id: 'in3', name: 'IN3', label: 'IN3 (Coil C)', signalType: 'DIGITAL_INPUT', position: { x: 150, y: 150 } },
    { id: 'in4', name: 'IN4', label: 'IN4 (Coil D)', signalType: 'DIGITAL_INPUT', position: { x: 180, y: 150 } },
  ],
  propertiesSchema: [
    { key: 'stepAngle', label: 'Current Step Angle (°)', type: 'number', default: 0, min: 0, max: 360, description: 'Absolute rotor angle in degrees' },
    { key: 'stepCount', label: 'Total Steps Executed', type: 'number', default: 0, description: 'Accumulated step count' },
  ],
  datasheetUrl: 'https://croce.github.io/electronics/datasheets/28BYJ-48.pdf',
};
