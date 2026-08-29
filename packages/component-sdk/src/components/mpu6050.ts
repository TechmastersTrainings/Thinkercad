import { ComponentDefinition } from '@circuit/shared';

export const MPU6050Component: ComponentDefinition = {
  id: 'mpu6050',
  name: 'MPU6050 6-Axis Motion Tracking IMU',
  category: 'SENSORS',
  description: 'Triple-axis MEMS accelerometer and triple-axis MEMS gyroscope sensor with I2C digital interface.',
  electricalSpec: {
    minOperatingVoltage: 3.3,
    maxOperatingVoltage: 5.0,
    nominalOperatingVoltage: 3.3,
    maxCurrentDraw: 0.005,
    absoluteMaxVoltage: 6.0,
  },
  visualDimensions: { width: 220, height: 180 },
  pins: [
    { id: 'vcc', name: 'VCC', label: 'VCC (+3.3V/5V)', signalType: 'POWER_VCC', position: { x: 30, y: 150 }, isPowerVcc: true, maxVoltage: 5.0 },
    { id: 'gnd', name: 'GND', label: 'GND Ground', signalType: 'POWER_GND', position: { x: 70, y: 150 }, isPowerGnd: true },
    { id: 'scl', name: 'SCL', label: 'SCL (I2C Clock)', signalType: 'I2C_SCL', position: { x: 110, y: 150 } },
    { id: 'sda', name: 'SDA', label: 'SDA (I2C Data)', signalType: 'I2C_SDA', position: { x: 150, y: 150 } },
    { id: 'int', name: 'INT', label: 'INT Interrupt', signalType: 'DIGITAL_OUTPUT', position: { x: 190, y: 150 } },
  ],
  propertiesSchema: [
    { key: 'accelX', label: 'Accel X (g)', type: 'number', default: 0, min: -2, max: 2, description: 'Simulated X-axis acceleration' },
    { key: 'accelY', label: 'Accel Y (g)', type: 'number', default: 0, min: -2, max: 2, description: 'Simulated Y-axis acceleration' },
    { key: 'accelZ', label: 'Accel Z (g)', type: 'number', default: 1.0, min: -2, max: 2, description: 'Simulated Z-axis gravity acceleration' },
  ],
  datasheetUrl: 'https://invensense.tdk.com/wp-content/uploads/2015/02/MPU-6000-Datasheet1.pdf',
};
