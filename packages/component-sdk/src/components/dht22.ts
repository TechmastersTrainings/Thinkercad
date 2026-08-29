import { ComponentDefinition } from '@circuit/shared';

export const DHT22Component: ComponentDefinition = {
  id: 'dht22',
  name: 'DHT22 (AM2302) Temp & Humidity',
  category: 'SENSORS',
  description: 'High accuracy digital temperature and relative humidity sensor module',
  electricalSpec: {
    minOperatingVoltage: 3.3,
    maxOperatingVoltage: 5.5,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.0025,
    absoluteMaxVoltage: 6.0,
  },
  visualDimensions: { width: 130, height: 165 },
  pins: [
    { id: 'vcc', name: 'VCC', label: 'VCC (3.3V-5V)', signalType: 'POWER_VCC', position: { x: 25, y: 155 }, isPowerVcc: true },
    { id: 'data', name: 'DATA', label: 'Data Signal', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 50, y: 155 } },
    { id: 'nc', name: 'NC', label: 'Not Connected', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 75, y: 155 } },
    { id: 'gnd', name: 'GND', label: 'GND Ground', signalType: 'POWER_GND', position: { x: 100, y: 155 }, isPowerGnd: true },
  ],
  propertiesSchema: [
    { key: 'temperatureC', label: 'Temperature (°C)', type: 'number', default: 24.5, min: -40, max: 80, unit: '°C' },
    { key: 'humidityPercent', label: 'Humidity (%)', type: 'number', default: 55, min: 0, max: 100, unit: '%' },
  ],
};
