import { ComponentDefinition } from '@circuit/shared';

export const GPSNEO6MComponent: ComponentDefinition = {
  id: 'gps-neo6m',
  name: 'NEO-6M GPS Receiver Module',
  category: 'CONNECTIVITY',
  description: 'High precision satellite positioning receiver with UART serial telemetry output.',
  electricalSpec: {
    minOperatingVoltage: 3.0,
    maxOperatingVoltage: 5.0,
    nominalOperatingVoltage: 3.3,
    maxCurrentDraw: 0.05,
    absoluteMaxVoltage: 5.5,
  },
  visualDimensions: { width: 220, height: 160 },
  pins: [
    { id: 'vcc', name: 'VCC', label: 'VCC (+3.3V/5V)', signalType: 'POWER_VCC', position: { x: 30, y: 130 }, isPowerVcc: true, maxVoltage: 5.0 },
    { id: 'rx', name: 'RX', label: 'RX Serial In', signalType: 'UART_RX', position: { x: 70, y: 130 } },
    { id: 'tx', name: 'TX', label: 'TX Serial Out', signalType: 'UART_TX', position: { x: 110, y: 130 } },
    { id: 'gnd', name: 'GND', label: 'GND Ground', signalType: 'POWER_GND', position: { x: 150, y: 130 }, isPowerGnd: true },
  ],
  propertiesSchema: [
    { key: 'latitude', label: 'Latitude (°N)', type: 'number', default: 37.7749, description: 'Simulated GPS Latitude Coordinate' },
    { key: 'longitude', label: 'Longitude (°W)', type: 'number', default: -122.4194, description: 'Simulated GPS Longitude Coordinate' },
    { key: 'satellitesLocked', label: 'Satellites Locked', type: 'number', default: 8, min: 0, max: 16, description: 'Satellites locked in view' },
  ],
  datasheetUrl: 'https://www.u-blox.com/en/product/neo-6-series',
};
