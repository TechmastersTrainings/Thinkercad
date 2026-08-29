export const STM32NucleoBoard = {
    id: 'board-stm32-nucleo',
    name: 'STM32 BluePill / Nucleo',
    family: 'STM32',
    architecture: 'ARM_CORTEX_M',
    clockFrequencyHz: 72000000,
    flashSizeBytes: 65536,
    ramSizeBytes: 20480,
    electricalSpec: {
        minOperatingVoltage: 3.0,
        maxOperatingVoltage: 3.6,
        nominalOperatingVoltage: 3.3,
        maxCurrentDraw: 0.5,
        absoluteMaxVoltage: 3.6,
    },
    visualDimensions: { width: 280, height: 320 },
    gpioCapabilities: {
        'PA0': { pinId: 'PA0', gpioNumber: 0, digitalInput: true, digitalOutput: true, analogInput: true, dacOutput: false, pwmOutput: true, touchInput: false, i2cSupport: false, spiSupport: false, uartSupport: false, interruptSupport: true },
        'PB6': { pinId: 'PB6', gpioNumber: 6, digitalInput: true, digitalOutput: true, analogInput: false, dacOutput: false, pwmOutput: true, touchInput: false, i2cSupport: true, spiSupport: false, uartSupport: false, interruptSupport: true },
        'PB7': { pinId: 'PB7', gpioNumber: 7, digitalInput: true, digitalOutput: true, analogInput: false, dacOutput: false, pwmOutput: true, touchInput: false, i2cSupport: true, spiSupport: false, uartSupport: false, interruptSupport: true },
        'PC13': { pinId: 'PC13', gpioNumber: 13, digitalInput: true, digitalOutput: true, analogInput: false, dacOutput: false, pwmOutput: false, touchInput: false, i2cSupport: false, spiSupport: false, uartSupport: false, interruptSupport: true },
    },
    pins: [
        { id: '3V3', name: '3V3', label: '3.3V Power', signalType: 'POWER_VCC', position: { x: 20, y: 20 }, isPowerVcc: true, maxVoltage: 3.3 },
        { id: 'GND', name: 'GND', label: 'GND Ground', signalType: 'POWER_GND', position: { x: 20, y: 40 }, isPowerGnd: true, maxVoltage: 0 },
        { id: '5V', name: '5V', label: '5V Power', signalType: 'POWER_VCC', position: { x: 20, y: 60 }, isPowerVcc: true, maxVoltage: 5.0 },
        { id: 'PC13', name: 'PC13', label: 'PC13 (Onboard LED)', signalType: 'DIGITAL_BIDIRECTIONAL', position: { x: 260, y: 80 } },
        { id: 'PA0', name: 'PA0', label: 'PA0 (Analog In)', signalType: 'ANALOG_INPUT', position: { x: 260, y: 120 } },
        { id: 'PB6', name: 'PB6', label: 'PB6 (I2C SCL)', signalType: 'I2C_SCL', position: { x: 260, y: 180 } },
        { id: 'PB7', name: 'PB7', label: 'PB7 (I2C SDA)', signalType: 'I2C_SDA', position: { x: 260, y: 200 } },
    ],
    datasheetUrl: 'https://www.st.com/resource/en/datasheet/stm32f103c8.pdf',
};
//# sourceMappingURL=stm32-nucleo.js.map