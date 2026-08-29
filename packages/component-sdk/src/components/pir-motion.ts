import { ComponentDefinition } from '@circuit/shared';

export const PIRMotionComponent: ComponentDefinition = {
  id: 'pir-motion',
  name: 'PIR Motion Sensor (HC-SR501)',
  category: 'SENSORS',
  description: 'Passive Infrared sensor detecting thermal motion and presence of humans or objects.',
  electricalSpec: {
    minOperatingVoltage: 4.5,
    maxOperatingVoltage: 12.0,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.001,
    absoluteMaxVoltage: 15.0,
  },
  visualDimensions: { width: 180, height: 160 },
  pins: [
    { id: 'vcc', name: 'VCC', label: 'VCC 5V', signalType: 'POWER_VCC', position: { x: 30, y: 130 }, isPowerVcc: true, maxVoltage: 5.0 },
    { id: 'out', name: 'OUT', label: 'OUT Digital', signalType: 'DIGITAL_OUTPUT', position: { x: 90, y: 130 } },
    { id: 'gnd', name: 'GND', label: 'GND Ground', signalType: 'POWER_GND', position: { x: 150, y: 130 }, isPowerGnd: true },
  ],
  propertiesSchema: [
    { key: 'motionDetected', label: 'Motion Detected State', type: 'boolean', default: false, description: 'Simulates physical human motion in front of PIR lens' },
  ],
  datasheetUrl: 'https://cdn-learn.adafruit.com/assets/assets/000/010/139/original/pir325-spec.pdf',
};
