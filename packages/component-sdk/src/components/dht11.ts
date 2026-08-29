import { ComponentDefinition } from '@circuit/shared';

export const DHT11Component: ComponentDefinition = {
  id: 'dht11',
  name: 'DHT11 Temperature & Humidity Sensor',
  category: 'SENSORS',
  description: 'Calibrated digital temperature and humidity sensor module with single-wire interface.',
  electricalSpec: {
    minOperatingVoltage: 3.3,
    maxOperatingVoltage: 5.5,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.0025, // 2.5mA max
    absoluteMaxVoltage: 6.0,
  },
  visualDimensions: { width: 80, height: 90 },
  pins: [
    { id: 'vcc', name: 'VCC Power', label: 'VCC', signalType: 'POWER_VCC', position: { x: 15, y: 90 }, isPowerVcc: true },
    { id: 'data', name: 'DATA Serial Signal', label: 'DATA', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 40, y: 90 } },
    { id: 'gnd', name: 'GND Ground', label: 'GND', signalType: 'POWER_GND', position: { x: 65, y: 90 }, isPowerGnd: true },
  ],
  propertiesSchema: [
    {
      key: 'temperatureC',
      label: 'Ambient Temperature (°C)',
      type: 'number',
      default: 25,
      min: 0,
      max: 50,
      unit: '°C',
      description: 'Simulated ambient temperature in degrees Celsius',
    },
    {
      key: 'humidity',
      label: 'Relative Humidity (%)',
      type: 'number',
      default: 60,
      min: 20,
      max: 90,
      unit: '%',
      description: 'Simulated relative humidity percentage',
    },
  ],
};
