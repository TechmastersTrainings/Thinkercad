export const RaspberryPiPicoBoard = {
    id: 'board-raspberry-pi-pico',
    name: 'Raspberry Pi Pico',
    family: 'RP2040',
    architecture: 'RP2040',
    clockFrequencyHz: 133000000,
    flashSizeBytes: 2097152,
    ramSizeBytes: 264192,
    electricalSpec: {
        minOperatingVoltage: 1.8,
        maxOperatingVoltage: 3.3,
        nominalOperatingVoltage: 3.3,
        maxCurrentDraw: 0.3,
        absoluteMaxVoltage: 3.6,
    },
    visualDimensions: { width: 220, height: 380 },
    gpioCapabilities: {
        'GP25': { pinId: 'GP25', gpioNumber: 25, digitalInput: true, digitalOutput: true, analogInput: false, dacOutput: false, pwmOutput: true, touchInput: false, i2cSupport: false, spiSupport: false, uartSupport: false, interruptSupport: true },
    },
    pins: [
        { id: '3V3', name: '3V3', label: '3.3V OUT', signalType: 'POWER_VCC', position: { x: 20, y: 300 }, isPowerVcc: true, maxVoltage: 3.3 },
        { id: 'GND', name: 'GND', label: 'GND', signalType: 'POWER_GND', position: { x: 20, y: 320 }, isPowerGnd: true, maxVoltage: 0 },
        { id: 'GP25', name: 'GP25', label: 'GP25 (LED)', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 200, y: 150 } },
    ],
    datasheetUrl: 'https://datasheets.raspberrypi.com/pico/pico-datasheet.pdf',
};
//# sourceMappingURL=raspberry-pi-pico.js.map