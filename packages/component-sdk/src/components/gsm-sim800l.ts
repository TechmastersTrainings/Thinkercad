import { ComponentDefinition } from '@circuit/shared';

export const GSMSIM800LComponent: ComponentDefinition = {
  id: 'gsm-sim800l',
  name: 'SIM800L Quad-Band GSM/GPRS Module',
  category: 'CONNECTIVITY',
  description: 'Cellular modem module supporting SMS messaging, Voice call triggering, and GPRS data transfers via AT commands.',
  electricalSpec: {
    minOperatingVoltage: 3.7,
    maxOperatingVoltage: 4.4,
    nominalOperatingVoltage: 4.0,
    maxCurrentDraw: 2.0,
    absoluteMaxVoltage: 4.5,
  },
  visualDimensions: { width: 220, height: 170 },
  pins: [
    { id: 'vcc', name: 'VCC', label: 'VCC (3.7V - 4.4V)', signalType: 'POWER_VCC', position: { x: 30, y: 140 }, isPowerVcc: true, maxVoltage: 4.4 },
    { id: 'rst', name: 'RST', label: 'RST Reset', signalType: 'DIGITAL_INPUT', position: { x: 70, y: 140 } },
    { id: 'rxd', name: 'RXD', label: 'RXD Serial In', signalType: 'UART_RX', position: { x: 110, y: 140 } },
    { id: 'txd', name: 'TXD', label: 'TXD Serial Out', signalType: 'UART_TX', position: { x: 150, y: 140 } },
    { id: 'gnd', name: 'GND', label: 'GND Ground', signalType: 'POWER_GND', position: { x: 190, y: 140 }, isPowerGnd: true },
  ],
  propertiesSchema: [
    { key: 'networkSignal', label: 'Network Signal Strength (CSQ)', type: 'number', default: 24, min: 0, max: 31, description: 'Cellular signal level' },
    { key: 'simStatus', label: 'SIM Card Status', type: 'enum', default: 'READY', options: ['READY', 'NO_SIM', 'PIN_REQUIRED'], description: 'SIM state' },
  ],
  datasheetUrl: 'https://cdn-shop.adafruit.com/datasheets/SIM800L.pdf',
};
