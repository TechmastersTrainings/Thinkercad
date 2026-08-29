import { ComponentDefinition } from '@circuit/shared';

export const CameraOV2640Component: ComponentDefinition = {
  id: 'camera-ov2640',
  name: 'ESP32-CAM (OV2640 Camera)',
  category: 'CAMERAS',
  description: 'High-resolution 2MP OV2640 Camera Module with ESP32 wireless imaging and flash LED',
  electricalSpec: {
    minOperatingVoltage: 4.75,
    maxOperatingVoltage: 5.25,
    nominalOperatingVoltage: 5.0,
    maxCurrentDraw: 0.31,
    absoluteMaxVoltage: 6.0,
  },
  visualDimensions: { width: 270, height: 200 },
  pins: [
    { id: '5v', name: '5V', label: '5V Power', signalType: 'POWER_VCC', position: { x: 20, y: 190 }, isPowerVcc: true },
    { id: 'gnd', name: 'GND', label: 'GND Ground', signalType: 'POWER_GND', position: { x: 45, y: 190 }, isPowerGnd: true },
    { id: 'gpio12', name: 'IO12', label: 'GPIO12', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 70, y: 190 } },
    { id: 'gpio13', name: 'IO13', label: 'GPIO13', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 95, y: 190 } },
    { id: 'gpio14', name: 'IO14', label: 'GPIO14', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 120, y: 190 } },
    { id: 'gpio15', name: 'IO15', label: 'GPIO15', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 145, y: 190 } },
    { id: 'gpio2', name: 'IO2', label: 'GPIO2', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 170, y: 190 } },
    { id: 'gpio4', name: 'IO4', label: 'GPIO4 (Flash)', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 195, y: 190 } },
    { id: 'tx', name: 'TX', label: 'U0TXD', signalType: 'UART_TX', position: { x: 220, y: 190 } },
    { id: 'rx', name: 'RX', label: 'U0RXD', signalType: 'UART_RX', position: { x: 245, y: 190 } },
  ],
  propertiesSchema: [
    { key: 'resolution', label: 'Resolution', type: 'enum', options: ['UXGA (1600x1200)', 'SVGA (800x600)', 'VGA (640x480)', 'QVGA (320x240)'], default: 'VGA (640x480)' },
    { key: 'flashEnabled', label: 'Flash LED', type: 'boolean', default: false },
    { key: 'jpegQuality', label: 'JPEG Quality', type: 'number', default: 12, min: 10, max: 63 },
  ],
};
