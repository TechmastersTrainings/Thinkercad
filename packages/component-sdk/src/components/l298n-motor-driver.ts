import { ComponentDefinition } from '@circuit/shared';

export const L298NMotorDriverComponent: ComponentDefinition = {
  id: 'l298n-motor-driver',
  name: 'L298N Dual H-Bridge Motor Driver',
  category: 'ACTUATORS',
  description: 'High-power dual DC motor & stepper driver module with aluminum heatsink and 5V regulator',
  electricalSpec: {
    minOperatingVoltage: 5.0,
    maxOperatingVoltage: 35.0,
    nominalOperatingVoltage: 12.0,
    maxCurrentDraw: 2.0,
    absoluteMaxVoltage: 46.0,
  },
  visualDimensions: { width: 250, height: 200 },
  pins: [
    { id: 'ena', name: 'ENA', label: 'ENA (Speed A)', signalType: 'PWM', position: { x: 25, y: 190 } },
    { id: 'in1', name: 'IN1', label: 'IN1 Direction', signalType: 'DIGITAL_INPUT', position: { x: 50, y: 190 } },
    { id: 'in2', name: 'IN2', label: 'IN2 Direction', signalType: 'DIGITAL_INPUT', position: { x: 75, y: 190 } },
    { id: 'in3', name: 'IN3', label: 'IN3 Direction', signalType: 'DIGITAL_INPUT', position: { x: 100, y: 190 } },
    { id: 'in4', name: 'IN4', label: 'IN4 Direction', signalType: 'DIGITAL_INPUT', position: { x: 125, y: 190 } },
    { id: 'enb', name: 'ENB', label: 'ENB (Speed B)', signalType: 'PWM', position: { x: 150, y: 190 } },
    { id: '12v', name: '12V', label: 'Motor Power (12V)', signalType: 'POWER_VCC', position: { x: 175, y: 190 }, isPowerVcc: true },
    { id: 'gnd', name: 'GND', label: 'Power GND', signalType: 'POWER_GND', position: { x: 200, y: 190 }, isPowerGnd: true },
    { id: '5v', name: '5V', label: '5V Logic Out', signalType: 'POWER_VCC', position: { x: 225, y: 190 } },
  ],
  propertiesSchema: [
    { key: 'motorASpeed', label: 'Motor A Speed (0-255)', type: 'number', default: 0, min: 0, max: 255 },
    { key: 'motorBSpeed', label: 'Motor B Speed (0-255)', type: 'number', default: 0, min: 0, max: 255 },
  ],
};
