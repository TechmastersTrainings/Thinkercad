import { ComponentDefinition } from '@circuit/shared';

export const ServoComponent: ComponentDefinition = {
  id: 'servo',
  name: 'SG90 Micro Servo Motor',
  category: 'ELECTROMECHANICAL',
  description: '180 Degree rotational micro servo motor controlled by PWM signal pulses.',
  electricalSpec: {
    minOperatingVoltage: 4.8,
    maxOperatingVoltage: 6.0,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.6, // 600mA stall current
    absoluteMaxVoltage: 7.0,
  },
  visualDimensions: { width: 100, height: 100 },
  pins: [
    { id: 'pwm', name: 'PWM Control (Orange)', label: 'PWM', signalType: 'PWM', position: { x: 20, y: 100 } },
    { id: 'vcc', name: 'VCC Power (Red)', label: 'VCC', signalType: 'POWER_VCC', position: { x: 50, y: 100 }, isPowerVcc: true },
    { id: 'gnd', name: 'GND Ground (Brown)', label: 'GND', signalType: 'POWER_GND', position: { x: 80, y: 100 }, isPowerGnd: true },
  ],
  propertiesSchema: [
    {
      key: 'angle',
      label: 'Servo Shaft Angle (°)',
      type: 'number',
      default: 90,
      min: 0,
      max: 180,
      unit: '°',
      description: 'Current shaft angle position in degrees',
    },
  ],
};
