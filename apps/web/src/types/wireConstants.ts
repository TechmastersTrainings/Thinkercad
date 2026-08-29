export interface WireColorOption {
  name: string;
  hex: string;
  label: string;
}

export interface WireTypeOption {
  id: string;
  name: string;
  desc: string;
}

export const TINKERCAD_WIRE_COLORS: WireColorOption[] = [
  { name: 'Red', hex: '#FF0000', label: 'VCC / Power' },
  { name: 'Black', hex: '#000000', label: 'GND / Ground' },
  { name: 'Green', hex: '#00C853', label: 'Signal / Digital' },
  { name: 'Yellow', hex: '#FFD600', label: 'Analog / Clock' },
  { name: 'Blue', hex: '#2979FF', label: 'PWM / Data' },
  { name: 'Orange', hex: '#FF6D00', label: '5V Auxiliary' },
  { name: 'White', hex: '#FFFFFF', label: 'Control / Bus' },
  { name: 'Brown', hex: '#795548', label: 'Earth / Ground' },
  { name: 'Turquoise', hex: '#00E5FF', label: 'I2C SDA / SCL' },
  { name: 'Purple', hex: '#AA00FF', label: 'Interrupt / RX' },
  { name: 'Pink', hex: '#FF4081', label: 'Status LED' },
];

export const TINKERCAD_WIRE_TYPES: WireTypeOption[] = [
  { id: 'normal', name: 'Normal', desc: 'Flexible strand wire' },
  { id: 'hookup', name: 'Hookup', desc: 'Rigid solid core wire' },
  { id: 'alligator', name: 'Alligator Clip', desc: 'Clip lead connector' },
  { id: 'automatic', name: 'Automatic', desc: 'Smart routed wire' },
];
