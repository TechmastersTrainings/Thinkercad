import { ComponentDefinition } from '@circuit/shared';

export const MQ2GasSensorComponent: ComponentDefinition = {
  id: 'mq2-gas-sensor',
  name: 'MQ-2 Gas & Smoke Sensor',
  category: 'SENSORS',
  description: 'Analog and Digital flammable gas, methane, smoke, and LPG sensor module',
  electricalSpec: {
    minOperatingVoltage: 4.5,
    maxOperatingVoltage: 5.5,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.15,
    absoluteMaxVoltage: 6.0,
  },
  visualDimensions: { width: 140, height: 165 },
  pins: [
    { id: 'vcc', name: 'VCC', label: 'VCC (5V)', signalType: 'POWER_VCC', position: { x: 30, y: 155 }, isPowerVcc: true },
    { id: 'gnd', name: 'GND', label: 'GND', signalType: 'POWER_GND', position: { x: 55, y: 155 }, isPowerGnd: true },
    { id: 'do', name: 'DO', label: 'Digital Out', signalType: 'DIGITAL_OUTPUT', position: { x: 80, y: 155 } },
    { id: 'ao', name: 'AO', label: 'Analog Out', signalType: 'ANALOG_OUTPUT', position: { x: 105, y: 155 } },
  ],
  propertiesSchema: [
    { key: 'gasLevelPpm', label: 'Gas Concentration (PPM)', type: 'number', default: 150, min: 0, max: 10000, unit: 'ppm' },
    { key: 'thresholdPpm', label: 'Alarm Threshold', type: 'number', default: 300, min: 50, max: 2000, unit: 'ppm' },
  ],
};
