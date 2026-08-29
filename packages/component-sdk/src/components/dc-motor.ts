import { ComponentDefinition } from '@circuit/shared';

export const DCMotorComponent: ComponentDefinition = {
  id: 'dc-motor',
  name: 'DC Motor + L298N Driver',
  category: 'ELECTROMECHANICAL',
  description: '12V DC Gear Motor coupled with L298N Dual H-Bridge motor driver module for directional PWM speed control.',
  electricalSpec: {
    minOperatingVoltage: 5.0,
    maxOperatingVoltage: 12.0,
    nominalOperatingVoltage: 9.0,
    maxCurrentDraw: 1.5,
    absoluteMaxVoltage: 18.0,
  },
  visualDimensions: { width: 220, height: 180 },
  pins: [
    { id: 'vcc', name: 'VCC', label: '12V / 5V Power', signalType: 'POWER_VCC', position: { x: 30, y: 150 }, isPowerVcc: true, maxVoltage: 12.0 },
    { id: 'gnd', name: 'GND', label: 'GND Ground', signalType: 'POWER_GND', position: { x: 70, y: 150 }, isPowerGnd: true },
    { id: 'in1', name: 'IN1', label: 'IN1 Dir A', signalType: 'DIGITAL_INPUT', position: { x: 110, y: 150 } },
    { id: 'in2', name: 'IN2', label: 'IN2 Dir B', signalType: 'DIGITAL_INPUT', position: { x: 150, y: 150 } },
    { id: 'ena', name: 'ENA', label: 'ENA Speed PWM', signalType: 'PWM', position: { x: 190, y: 150 } },
  ],
  propertiesSchema: [
    { key: 'rpm', label: 'Rotational Speed (RPM)', type: 'number', default: 0, min: -300, max: 300, description: 'Live simulated shaft RPM' },
    { key: 'direction', label: 'Spin Direction', type: 'enum', default: 'STOPPED', options: ['FORWARD', 'REVERSE', 'STOPPED'], description: 'Current spin state' },
  ],
  datasheetUrl: 'https://www.st.com/resource/en/datasheet/l298.pdf',
};
