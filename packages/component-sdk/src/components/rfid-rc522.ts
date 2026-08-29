import { ComponentDefinition } from '@circuit/shared';

export const RFIDRC522Component: ComponentDefinition = {
  id: 'rfid-rc522',
  name: 'RC522 RFID Reader / Writer (SPI)',
  category: 'CONNECTIVITY',
  description: '13.56 MHz RFID / NFC Reader-Writer card module utilizing SPI communication protocol.',
  electricalSpec: {
    minOperatingVoltage: 3.3,
    maxOperatingVoltage: 3.3,
    nominalOperatingVoltage: 3.3,
    maxCurrentDraw: 0.03,
    absoluteMaxVoltage: 3.6,
  },
  visualDimensions: { width: 240, height: 180 },
  pins: [
    { id: '3v3', name: '3V3', label: '3.3V Power', signalType: 'POWER_VCC', position: { x: 20, y: 150 }, isPowerVcc: true, maxVoltage: 3.3 },
    { id: 'rst', name: 'RST', label: 'RST Reset', signalType: 'DIGITAL_INPUT', position: { x: 50, y: 150 } },
    { id: 'gnd', name: 'GND', label: 'GND Ground', signalType: 'POWER_GND', position: { x: 80, y: 150 }, isPowerGnd: true },
    { id: 'irq', name: 'IRQ', label: 'IRQ Interrupt', signalType: 'DIGITAL_OUTPUT', position: { x: 110, y: 150 } },
    { id: 'miso', name: 'MISO', label: 'MISO (SPI)', signalType: 'SPI_MISO', position: { x: 140, y: 150 } },
    { id: 'mosi', name: 'MOSI', label: 'MOSI (SPI)', signalType: 'SPI_MOSI', position: { x: 170, y: 150 } },
    { id: 'sck', name: 'SCK', label: 'SCK (Clock)', signalType: 'SPI_SCK', position: { x: 200, y: 150 } },
    { id: 'sda', name: 'SDA', label: 'SDA / SS', signalType: 'SPI_CS', position: { x: 220, y: 150 } },
  ],
  propertiesSchema: [
    { key: 'detectedUid', label: 'Simulated Card UID', type: 'enum', default: 'A1:B2:C3:D4', options: ['A1:B2:C3:D4', 'E5:F6:78:90', '11:22:33:44'], description: 'Virtual RFID Card/Fob UID tag presented to reader' },
    { key: 'cardPresent', label: 'Card Present Near Antenna', type: 'boolean', default: false, description: 'Simulates proximity sensor detection of RFID tag' },
  ],
  datasheetUrl: 'https://www.nxp.com/docs/en/data-sheet/MFRC522.pdf',
};
