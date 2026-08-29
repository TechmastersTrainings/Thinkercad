import { ComponentDefinition } from '@circuit/shared';

export const WiFiESP8266Component: ComponentDefinition = {
  id: 'wifi-esp8266',
  name: 'ESP8266 ESP-01 Wi-Fi Module',
  category: 'CONNECTIVITY',
  description: '802.11 b/g/n Wi-Fi transceiver module with integrated TCP/IP protocol stack and AT commands.',
  electricalSpec: {
    minOperatingVoltage: 3.0,
    maxOperatingVoltage: 3.6,
    nominalOperatingVoltage: 3.3,
    maxCurrentDraw: 0.3,
    absoluteMaxVoltage: 3.6,
  },
  visualDimensions: { width: 220, height: 170 },
  pins: [
    { id: 'vcc', name: 'VCC', label: 'VCC 3.3V', signalType: 'POWER_VCC', position: { x: 30, y: 140 }, isPowerVcc: true, maxVoltage: 3.3 },
    { id: 'rx', name: 'RX', label: 'RX Serial In', signalType: 'UART_RX', position: { x: 70, y: 140 } },
    { id: 'tx', name: 'TX', label: 'TX Serial Out', signalType: 'UART_TX', position: { x: 110, y: 140 } },
    { id: 'ch_pd', name: 'CH_PD', label: 'CH_PD Enable', signalType: 'DIGITAL_INPUT', position: { x: 150, y: 140 } },
    { id: 'gnd', name: 'GND', label: 'GND Ground', signalType: 'POWER_GND', position: { x: 190, y: 140 }, isPowerGnd: true },
  ],
  propertiesSchema: [
    { key: 'ssid', label: 'Wi-Fi Network SSID', type: 'string', default: 'Virtual_Lab_AP', description: 'Simulated Access Point Name' },
    { key: 'connected', label: 'Wi-Fi Connection Status', type: 'boolean', default: true, description: 'Simulated connection state' },
  ],
  datasheetUrl: 'https://www.espressif.com/sites/default/files/documentation/0a-esp8266ex_datasheet_en.pdf',
};
