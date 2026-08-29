import { ComponentDefinition } from '@circuit/shared';

export const LDRSensorComponent: ComponentDefinition = {
  id: 'ldr-sensor',
  name: 'LDR Light Sensor Module',
  category: 'SENSORS',
  description: 'Photoresistor module providing variable resistance and analog voltage inversely proportional to ambient light lux levels.',
  electricalSpec: {
    minOperatingVoltage: 3.3,
    maxOperatingVoltage: 5.0,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.005,
    absoluteMaxVoltage: 6.0,
  },
  visualDimensions: { width: 180, height: 160 },
  pins: [
    { id: 'vcc', name: 'VCC', label: 'VCC (+5V/3.3V)', signalType: 'POWER_VCC', position: { x: 30, y: 130 }, isPowerVcc: true, maxVoltage: 5.0 },
    { id: 'ao', name: 'AO', label: 'AO Analog Out', signalType: 'ANALOG_OUTPUT', position: { x: 90, y: 130 } },
    { id: 'gnd', name: 'GND', label: 'GND Ground', signalType: 'POWER_GND', position: { x: 150, y: 130 }, isPowerGnd: true },
  ],
  propertiesSchema: [
    { key: 'lux', label: 'Ambient Light Level (Lux)', type: 'number', default: 500, min: 0, max: 2000, unit: 'lux', description: 'Simulated illumination' },
  ],
  datasheetUrl: 'https://en.wikipedia.org/wiki/Photoresistor',
};
