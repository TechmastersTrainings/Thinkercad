import { ComponentDefinition } from '@circuit/shared';

export const HC05BluetoothComponent: ComponentDefinition = {
  id: 'hc05-bluetooth',
  name: 'HC-05 Bluetooth Serial Module',
  category: 'WIRELESS',
  description: 'Full-duplex Bluetooth SPP UART serial transceiver module for wireless Arduino/IoT communication',
  electricalSpec: {
    minOperatingVoltage: 3.6,
    maxOperatingVoltage: 6.0,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.04,
    absoluteMaxVoltage: 7.0,
  },
  visualDimensions: { width: 175, height: 185 },
  pins: [
    { id: 'state', name: 'STATE', label: 'STATE', signalType: 'DIGITAL_OUTPUT', position: { x: 25, y: 175 } },
    { id: 'rxd', name: 'RXD', label: 'RXD', signalType: 'UART_RX', position: { x: 50, y: 175 } },
    { id: 'txd', name: 'TXD', label: 'TXD', signalType: 'UART_TX', position: { x: 75, y: 175 } },
    { id: 'gnd', name: 'GND', label: 'GND Ground', signalType: 'POWER_GND', position: { x: 100, y: 175 }, isPowerGnd: true },
    { id: 'vcc', name: 'VCC', label: 'VCC (3.6V-6V)', signalType: 'POWER_VCC', position: { x: 125, y: 175 }, isPowerVcc: true },
    { id: 'en', name: 'EN', label: 'EN / Key', signalType: 'DIGITAL_INPUT', position: { x: 150, y: 175 } },
  ],
  propertiesSchema: [
    { key: 'deviceName', label: 'Device Name', type: 'string', default: 'HC-05' },
    { key: 'baudRate', label: 'Baud Rate', type: 'enum', options: ['9600', '38400', '115200'], default: '9600' },
    { key: 'connected', label: 'Client Connected', type: 'boolean', default: false },
  ],
};
