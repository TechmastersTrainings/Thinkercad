import { ComponentDefinition } from '@circuit/shared';

export const IRObstacleComponent: ComponentDefinition = {
  id: 'ir-obstacle',
  name: 'IR Obstacle Avoidance Sensor',
  category: 'SENSORS',
  description: 'Infrared transmitter-receiver pair with LM393 comparator for line tracking and obstacle detection',
  electricalSpec: {
    minOperatingVoltage: 3.3,
    maxOperatingVoltage: 5.0,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.02,
    absoluteMaxVoltage: 6.0,
  },
  visualDimensions: { width: 110, height: 165 },
  pins: [
    { id: 'vcc', name: 'VCC', label: 'VCC (3.3V-5V)', signalType: 'POWER_VCC', position: { x: 30, y: 155 }, isPowerVcc: true },
    { id: 'gnd', name: 'GND', label: 'GND Ground', signalType: 'POWER_GND', position: { x: 55, y: 155 }, isPowerGnd: true },
    { id: 'out', name: 'OUT', label: 'Digital Out', signalType: 'DIGITAL_OUTPUT', position: { x: 80, y: 155 } },
  ],
  propertiesSchema: [
    { key: 'obstacleDetected', label: 'Obstacle Detected', type: 'boolean', default: false },
    { key: 'detectionDistanceCm', label: 'Distance (cm)', type: 'number', default: 12, min: 2, max: 30, unit: 'cm' },
  ],
};
