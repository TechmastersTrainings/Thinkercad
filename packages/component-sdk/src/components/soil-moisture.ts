import { ComponentDefinition } from '@circuit/shared';

export const SoilMoistureComponent: ComponentDefinition = {
  id: 'soil-moisture',
  name: 'Soil Moisture & Rain Sensor',
  category: 'SENSORS',
  description: 'Dual-probe soil moisture and water level detector with comparator threshold output',
  electricalSpec: {
    minOperatingVoltage: 3.3,
    maxOperatingVoltage: 5.0,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.035,
    absoluteMaxVoltage: 6.0,
  },
  visualDimensions: { width: 140, height: 165 },
  pins: [
    { id: 'vcc', name: 'VCC', label: 'VCC (3.3V-5V)', signalType: 'POWER_VCC', position: { x: 30, y: 155 }, isPowerVcc: true },
    { id: 'gnd', name: 'GND', label: 'GND Ground', signalType: 'POWER_GND', position: { x: 55, y: 155 }, isPowerGnd: true },
    { id: 'do', name: 'DO', label: 'Digital Out', signalType: 'DIGITAL_OUTPUT', position: { x: 80, y: 155 } },
    { id: 'ao', name: 'AO', label: 'Analog Out', signalType: 'ANALOG_OUTPUT', position: { x: 105, y: 155 } },
  ],
  propertiesSchema: [
    { key: 'moistureLevel', label: 'Moisture (%)', type: 'number', default: 45, min: 0, max: 100, unit: '%' },
  ],
};
