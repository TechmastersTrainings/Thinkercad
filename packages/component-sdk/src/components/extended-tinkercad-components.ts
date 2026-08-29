import { ComponentDefinition } from '@circuit/shared';

const defaultPassiveSpec = {
  minOperatingVoltage: -50,
  maxOperatingVoltage: 50,
  nominalOperatingVoltage: 0,
  maxCurrentDraw: 1.0,
  absoluteMaxVoltage: 100,
};

const defaultPowerSpec = {
  minOperatingVoltage: 0,
  maxOperatingVoltage: 12,
  nominalOperatingVoltage: 5,
  maxCurrentDraw: 2.0,
  absoluteMaxVoltage: 24,
};

export const PolarizedCapacitorComponent: ComponentDefinition = {
  id: 'capacitor-polarized',
  name: 'Polarized Capacitor',
  category: 'PASSIVE',
  description: 'Electrolytic capacitor with positive anode and negative cathode lead.',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 50, height: 70 },
  pins: [
    { id: 'anode', name: 'Anode (+)', label: '+', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 70 } },
    { id: 'cathode', name: 'Cathode (-)', label: '-', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 35, y: 70 } },
  ],
  propertiesSchema: [
    {
      key: 'capacitance',
      label: 'Capacitance',
      type: 'number',
      default: 100,
      unit: 'µF',
      min: 1,
      max: 10000,
    },
  ],
};

export const DiodeComponent: ComponentDefinition = {
  id: 'diode',
  name: 'Diode',
  category: 'PASSIVE',
  description: 'Standard PN junction rectifier diode (1N4007).',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 80, height: 30 },
  pins: [
    { id: 'anode', name: 'Anode (+)', label: 'A', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 0, y: 15 } },
    { id: 'cathode', name: 'Cathode (-)', label: 'C', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 80, y: 15 } },
  ],
  propertiesSchema: [],
};

export const ZenerDiodeComponent: ComponentDefinition = {
  id: 'diode-zener',
  name: 'Zener Diode',
  category: 'PASSIVE',
  description: 'Zener voltage regulator diode (5.1V).',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 80, height: 30 },
  pins: [
    { id: 'anode', name: 'Anode (+)', label: 'A', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 0, y: 15 } },
    { id: 'cathode', name: 'Cathode (-)', label: 'C', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 80, y: 15 } },
  ],
  propertiesSchema: [],
};

export const InductorComponent: ComponentDefinition = {
  id: 'inductor',
  name: 'Inductor',
  category: 'PASSIVE',
  description: 'Axial wire-wound copper coil inductor.',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 90, height: 30 },
  pins: [
    { id: 'pin1', name: 'Terminal 1', label: '1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 0, y: 15 } },
    { id: 'pin2', name: 'Terminal 2', label: '2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 90, y: 15 } },
  ],
  propertiesSchema: [
    {
      key: 'inductance',
      label: 'Inductance',
      type: 'number',
      default: 10,
      unit: 'mH',
    },
  ],
};

export const SlideSwitchComponent: ComponentDefinition = {
  id: 'slideswitch',
  name: 'Slideswitch',
  category: 'INPUT',
  description: 'SPDT 3-pin mechanical slide switch.',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 70, height: 40 },
  pins: [
    { id: 'term1', name: 'Terminal 1', label: '1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 40 } },
    { id: 'common', name: 'Common', label: 'C', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 35, y: 40 } },
    { id: 'term2', name: 'Terminal 2', label: '2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 55, y: 40 } },
  ],
  propertiesSchema: [
    {
      key: 'state',
      label: 'State',
      type: 'enum',
      default: 'LEFT',
      options: ['LEFT', 'RIGHT'],
    },
  ],
};

export const Tmp36SensorComponent: ComponentDefinition = {
  id: 'temp-sensor-tmp36',
  name: 'Temperature Sensor (TMP36)',
  category: 'SENSORS',
  description: 'Analog linear output Celsius temperature sensor.',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 50, height: 60 },
  pins: [
    { id: 'vcc', name: 'Power (+5V)', label: 'VCC', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 12, y: 60 } },
    { id: 'out', name: 'Vout (Analog)', label: 'OUT', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 25, y: 60 } },
    { id: 'gnd', name: 'Ground (GND)', label: 'GND', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 38, y: 60 } },
  ],
  propertiesSchema: [
    {
      key: 'temperature',
      label: 'Temperature',
      type: 'number',
      default: 25,
      unit: '°C',
      min: -40,
      max: 125,
    },
  ],
};

export const TiltSensorComponent: ComponentDefinition = {
  id: 'tilt-sensor',
  name: 'Tilt Sensor',
  category: 'SENSORS',
  description: 'SW-200D gravity ball tilt & motion switch.',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 80, height: 30 },
  pins: [
    { id: 'pin1', name: 'Terminal 1', label: '1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 5, y: 15 } },
    { id: 'pin2', name: 'Terminal 2', label: '2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 75, y: 15 } },
  ],
  propertiesSchema: [
    {
      key: 'isTilted',
      label: 'Is Tilted',
      type: 'boolean',
      default: false,
    },
  ],
};

export const LightBulbComponent: ComponentDefinition = {
  id: 'light-bulb',
  name: 'Light Bulb',
  category: 'OUTPUT',
  description: 'Incandescent filament glass bulb.',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 60, height: 80 },
  pins: [
    { id: 'term1', name: 'Terminal 1', label: '1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 22, y: 80 } },
    { id: 'term2', name: 'Terminal 2', label: '2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 38, y: 80 } },
  ],
  propertiesSchema: [],
};

export const NeoPixelRingComponent: ComponentDefinition = {
  id: 'neopixel-ring-12',
  name: 'NeoPixel Ring 12',
  category: 'OUTPUT',
  description: 'Circular ring of 12 addressable WS2812B RGB LEDs.',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 90, height: 90 },
  pins: [
    { id: 'din', name: 'Data In (DIN)', label: 'DIN', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 20, y: 90 } },
    { id: 'vcc', name: 'Power (+5V)', label: 'VCC', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 40, y: 90 } },
    { id: 'gnd', name: 'Ground (GND)', label: 'GND', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 60, y: 90 } },
    { id: 'dout', name: 'Data Out (DOUT)', label: 'DOUT', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 80, y: 90 } },
  ],
  propertiesSchema: [],
};

export const HobbyGearmotorComponent: ComponentDefinition = {
  id: 'gearmotor',
  name: 'Hobby Gearmotor',
  category: 'ACTUATORS',
  description: 'TT yellow dual shaft DC hobby gearmotor with 1:48 reduction.',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 80, height: 110 },
  pins: [
    { id: 'term1', name: 'Terminal 1 (+)', label: '+', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 25, y: 105 } },
    { id: 'term2', name: 'Terminal 2 (-)', label: '-', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 55, y: 105 } },
  ],
  propertiesSchema: [
    {
      key: 'rpm',
      label: 'RPM',
      type: 'number',
      default: 200,
    },
  ],
};

export const SevenSegmentComponent: ComponentDefinition = {
  id: 'seven-segment',
  name: '7 Segment Display',
  category: 'OUTPUT',
  description: 'Common cathode 0.56" 7-segment numerical LED display.',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 60, height: 90 },
  pins: [
    { id: 'a', name: 'Segment A', label: 'A', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 10, y: 5 } },
    { id: 'b', name: 'Segment B', label: 'B', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 20, y: 5 } },
    { id: 'c', name: 'Segment C', label: 'C', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 30, y: 5 } },
    { id: 'd', name: 'Segment D', label: 'D', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 40, y: 5 } },
    { id: 'e', name: 'Segment E', label: 'E', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 50, y: 5 } },
    { id: 'f', name: 'Segment F', label: 'F', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 10, y: 85 } },
    { id: 'g', name: 'Segment G', label: 'G', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 20, y: 85 } },
    { id: 'dp', name: 'Decimal Point', label: 'DP', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 30, y: 85 } },
    { id: 'com1', name: 'Common GND', label: 'COM', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 40, y: 85 } },
  ],
  propertiesSchema: [],
};

export const FlexSensorComponent: ComponentDefinition = {
  id: 'flex-sensor',
  name: 'Flex Sensor',
  category: 'SENSORS',
  description: '2.2" flexible bend resistance sensor.',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 30, height: 120 },
  pins: [
    { id: 'pin1', name: 'Terminal 1', label: '1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 10, y: 120 } },
    { id: 'pin2', name: 'Terminal 2', label: '2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 20, y: 120 } },
  ],
  propertiesSchema: [
    { key: 'bendAngle', label: 'Bend Angle', type: 'number', default: 0, min: 0, max: 90 },
  ],
};

export const ForceSensorComponent: ComponentDefinition = {
  id: 'force-sensor',
  name: 'Force Sensor (FSR)',
  category: 'SENSORS',
  description: 'Force sensing resistor pad.',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 40, height: 110 },
  pins: [
    { id: 'pin1', name: 'Terminal 1', label: '1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 110 } },
    { id: 'pin2', name: 'Terminal 2', label: '2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 25, y: 110 } },
  ],
  propertiesSchema: [
    { key: 'forcePressure', label: 'Force', type: 'number', default: 0, min: 0, max: 100 },
  ],
};

export const Battery9VComponent: ComponentDefinition = {
  id: 'battery-9v',
  name: '9V Battery',
  category: 'POWER',
  description: '9V alkaline rectangular transistor battery.',
  electricalSpec: { minOperatingVoltage: 9, maxOperatingVoltage: 9, nominalOperatingVoltage: 9, maxCurrentDraw: 1.5, absoluteMaxVoltage: 10 },
  visualDimensions: { width: 70, height: 100 },
  pins: [
    { id: 'positive', name: 'Positive (+9V)', label: '+', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 22, y: 10 } },
    { id: 'negative', name: 'Negative (GND)', label: '-', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 48, y: 10 } },
  ],
  propertiesSchema: [],
};

export const BatteryAAComponent: ComponentDefinition = {
  id: 'battery-1_5v',
  name: '1.5V Battery',
  category: 'POWER',
  description: '1.5V AA cylindrical alkaline cell in holder.',
  electricalSpec: { minOperatingVoltage: 1.5, maxOperatingVoltage: 1.5, nominalOperatingVoltage: 1.5, maxCurrentDraw: 1.0, absoluteMaxVoltage: 2.0 },
  visualDimensions: { width: 40, height: 90 },
  pins: [
    { id: 'positive', name: 'Positive (+1.5V)', label: '+', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 20, y: 5 } },
    { id: 'negative', name: 'Negative (GND)', label: '-', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 20, y: 85 } },
  ],
  propertiesSchema: [],
};

export const BatteryCoinComponent: ComponentDefinition = {
  id: 'battery-coin',
  name: 'Coin Cell 3V Battery',
  category: 'POWER',
  description: 'CR2032 3V lithium coin cell battery.',
  electricalSpec: { minOperatingVoltage: 3, maxOperatingVoltage: 3, nominalOperatingVoltage: 3, maxCurrentDraw: 0.2, absoluteMaxVoltage: 3.6 },
  visualDimensions: { width: 60, height: 60 },
  pins: [
    { id: 'positive', name: 'Positive (+3V)', label: '+', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 30, y: 5 } },
    { id: 'negative', name: 'Negative (GND)', label: '-', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 30, y: 55 } },
  ],
  propertiesSchema: [],
};

export const SolarCellComponent: ComponentDefinition = {
  id: 'solar-cell',
  name: 'Solar Cell',
  category: 'POWER',
  description: '5V photovoltaic solar panel module.',
  electricalSpec: { minOperatingVoltage: 0, maxOperatingVoltage: 5, nominalOperatingVoltage: 5, maxCurrentDraw: 0.5, absoluteMaxVoltage: 6 },
  visualDimensions: { width: 90, height: 80 },
  pins: [
    { id: 'positive', name: 'Positive (+5V)', label: '+', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 35, y: 8 } },
    { id: 'negative', name: 'Negative (GND)', label: '-', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 55, y: 8 } },
  ],
  propertiesSchema: [],
};

export const PotatoBatteryComponent: ComponentDefinition = {
  id: 'potato-battery',
  name: 'Potato Battery',
  category: 'POWER',
  description: 'Potato electrochemical battery cell with zinc and copper electrodes.',
  electricalSpec: { minOperatingVoltage: 0, maxOperatingVoltage: 1, nominalOperatingVoltage: 0.8, maxCurrentDraw: 0.05, absoluteMaxVoltage: 1.5 },
  visualDimensions: { width: 100, height: 75 },
  pins: [
    { id: 'copper', name: 'Copper (+0.8V)', label: 'Cu', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 35, y: 20 } },
    { id: 'zinc', name: 'Zinc (GND)', label: 'Zn', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 65, y: 20 } },
  ],
  propertiesSchema: [],
};

export const LemonBatteryComponent: ComponentDefinition = {
  id: 'lemon-battery',
  name: 'Lemon Battery',
  category: 'POWER',
  description: 'Citrus lemon galvanic cell with copper and zinc electrodes.',
  electricalSpec: { minOperatingVoltage: 0, maxOperatingVoltage: 1.2, nominalOperatingVoltage: 0.9, maxCurrentDraw: 0.05, absoluteMaxVoltage: 1.5 },
  visualDimensions: { width: 95, height: 75 },
  pins: [
    { id: 'copper', name: 'Copper (+0.9V)', label: 'Cu', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 32, y: 20 } },
    { id: 'zinc', name: 'Zinc (GND)', label: 'Zn', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 68, y: 20 } },
  ],
  propertiesSchema: [],
};

export const BreadboardFullComponent: ComponentDefinition = {
  id: 'breadboard-full',
  name: 'Breadboard',
  category: 'BREADBOARDS',
  description: 'Full-size 830-point solderless breadboard with dual power distribution buses.',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 450, height: 160 },
  pins: [],
  propertiesSchema: [],
};

export const BreadboardSmallComponent: ComponentDefinition = {
  id: 'breadboard-small',
  name: 'Breadboard Small',
  category: 'BREADBOARDS',
  description: 'Half-size 400-point solderless breadboard with power rails.',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 260, height: 160 },
  pins: [],
  propertiesSchema: [],
};

export const BreadboardMiniComponent: ComponentDefinition = {
  id: 'breadboard-mini',
  name: 'Breadboard Mini',
  category: 'BREADBOARDS',
  description: 'Miniature 170-point solderless prototyping breadboard.',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 150, height: 120 },
  pins: [],
  propertiesSchema: [],
};

export const MultimeterComponent: ComponentDefinition = {
  id: 'multimeter',
  name: 'Multimeter',
  category: 'INSTRUMENTS',
  description: 'Digital benchtop multimeter for measuring Voltage, Current, and Resistance.',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 150, height: 80 },
  pins: [
    { id: 'pos', name: 'Positive Probe (+)', label: '+', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 50, y: 70 } },
    { id: 'neg', name: 'Negative Probe (-)', label: '-', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 100, y: 70 } },
  ],
  propertiesSchema: [
    {
      key: 'mode',
      label: 'Measurement Mode',
      type: 'enum',
      default: 'VOLTAGE',
      options: ['VOLTAGE', 'CURRENT', 'RESISTANCE'],
    },
  ],
};

export const PowerSupplyComponent: ComponentDefinition = {
  id: 'power-supply',
  name: 'Power Supply',
  category: 'INSTRUMENTS',
  description: 'Adjustable DC bench laboratory power supply (0-30V, 0-5A).',
  electricalSpec: { minOperatingVoltage: 0, maxOperatingVoltage: 30, nominalOperatingVoltage: 5, maxCurrentDraw: 5.0, absoluteMaxVoltage: 35 },
  visualDimensions: { width: 160, height: 130 },
  pins: [
    { id: 'pos', name: 'Positive (+)', label: '+', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 50, y: 120 } },
    { id: 'neg', name: 'Negative (-)', label: '-', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 110, y: 120 } },
  ],
  propertiesSchema: [
    { key: 'voltage', label: 'Voltage (V)', type: 'number', default: 5.0, min: 0, max: 30 },
    { key: 'current', label: 'Current Limit (A)', type: 'number', default: 2.0, min: 0, max: 5 },
  ],
};

export const FunctionGeneratorComponent: ComponentDefinition = {
  id: 'function-generator',
  name: 'Function Generator',
  category: 'INSTRUMENTS',
  description: 'Precision AC waveform signal generator (Sine, Triangle, Square).',
  electricalSpec: { minOperatingVoltage: -10, maxOperatingVoltage: 10, nominalOperatingVoltage: 5, maxCurrentDraw: 0.5, absoluteMaxVoltage: 15 },
  visualDimensions: { width: 180, height: 130 },
  pins: [
    { id: 'out', name: 'Main Output (BNC)', label: 'OUT', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 60, y: 120 } },
    { id: 'gnd', name: 'Ground', label: 'GND', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 120, y: 120 } },
  ],
  propertiesSchema: [
    { key: 'frequency', label: 'Frequency (Hz)', type: 'number', default: 1000, min: 1, max: 1000000 },
    { key: 'amplitude', label: 'Amplitude (V)', type: 'number', default: 5.0, min: 0, max: 10 },
    { key: 'waveType', label: 'Waveform', type: 'enum', default: 'SINE', options: ['SINE', 'SQUARE', 'TRIANGLE'] },
  ],
};

export const OscilloscopeComponent: ComponentDefinition = {
  id: 'oscilloscope',
  name: 'Oscilloscope',
  category: 'INSTRUMENTS',
  description: 'Benchtop digital storage oscilloscope with real-time waveform graticule.',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 170, height: 140 },
  pins: [
    { id: 'pos', name: 'Channel 1 Probe (+)', label: '+', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 55, y: 130 } },
    { id: 'neg', name: 'Ground Clip (-)', label: '-', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 115, y: 130 } },
  ],
  propertiesSchema: [
    { key: 'timePerDiv', label: 'Time / Div', type: 'number', default: 1.0, min: 0.01, max: 100 },
    { key: 'voltsPerDiv', label: 'Volts / Div', type: 'number', default: 1.0, min: 0.1, max: 10 },
  ],
};

// --- INTEGRATED CIRCUITS ---

export const Timer555Component: ComponentDefinition = {
  id: 'ic-timer-555',
  name: 'Timer',
  category: 'INTEGRATED_CIRCUITS',
  description: 'NE555 precision timing & pulse generator IC (DIP-8).',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 120, height: 100 },
  pins: [
    { id: 'gnd', name: 'GND', label: '1 (GND)', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 20, y: 15 } },
    { id: 'trig', name: 'Trigger', label: '2 (TRIG)', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 45, y: 15 } },
    { id: 'out', name: 'Output', label: '3 (OUT)', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 70, y: 15 } },
    { id: 'reset', name: 'Reset', label: '4 (RESET)', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 95, y: 15 } },
    { id: 'vcc', name: 'VCC', label: '8 (VCC)', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 20, y: 85 } },
    { id: 'disch', name: 'Discharge', label: '7 (DISCH)', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 45, y: 85 } },
    { id: 'thresh', name: 'Threshold', label: '6 (THRESH)', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 70, y: 85 } },
    { id: 'ctrl', name: 'Control', label: '5 (CTRL)', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 95, y: 85 } },
  ],
  propertiesSchema: [],
};

export const Timer556Component: ComponentDefinition = {
  id: 'ic-timer-556',
  name: 'Dual Timer',
  category: 'INTEGRATED_CIRCUITS',
  description: 'NE556 dual precision timing generator IC (DIP-14).',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 160, height: 100 },
  pins: [
    { id: 'disch1', name: 'Discharge 1', label: '1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 15 } },
    { id: 'thresh1', name: 'Threshold 1', label: '2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 35, y: 15 } },
    { id: 'ctrl1', name: 'Control 1', label: '3', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 55, y: 15 } },
    { id: 'reset1', name: 'Reset 1', label: '4', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 75, y: 15 } },
    { id: 'out1', name: 'Out 1', label: '5', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 95, y: 15 } },
    { id: 'trig1', name: 'Trigger 1', label: '6', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 115, y: 15 } },
    { id: 'gnd', name: 'GND', label: '7', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 135, y: 15 } },
    { id: 'vcc', name: 'VCC', label: '14', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 85 } },
    { id: 'disch2', name: 'Discharge 2', label: '13', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 35, y: 85 } },
    { id: 'thresh2', name: 'Threshold 2', label: '12', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 55, y: 85 } },
    { id: 'ctrl2', name: 'Control 2', label: '11', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 75, y: 85 } },
    { id: 'reset2', name: 'Reset 2', label: '10', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 95, y: 85 } },
    { id: 'out2', name: 'Out 2', label: '9', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 115, y: 85 } },
    { id: 'trig2', name: 'Trigger 2', label: '8', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 135, y: 85 } },
  ],
  propertiesSchema: [],
};

export const OpAmp741Component: ComponentDefinition = {
  id: 'ic-opamp-741',
  name: '741 Operational Amplifier',
  category: 'INTEGRATED_CIRCUITS',
  description: 'LM741 general purpose operational amplifier (DIP-8).',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 120, height: 100 },
  pins: [
    { id: 'offset1', name: 'Offset Null 1', label: '1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 20, y: 15 } },
    { id: 'in_inv', name: 'Inverting Input (-)', label: '2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 45, y: 15 } },
    { id: 'in_noninv', name: 'Non-inverting Input (+)', label: '3', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 70, y: 15 } },
    { id: 'v_neg', name: 'V- Supply', label: '4', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 95, y: 15 } },
    { id: 'nc', name: 'No Connect', label: '8', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 20, y: 85 } },
    { id: 'v_pos', name: 'V+ Supply', label: '7', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 45, y: 85 } },
    { id: 'out', name: 'Output', label: '6', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 70, y: 85 } },
    { id: 'offset2', name: 'Offset Null 2', label: '5', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 95, y: 85 } },
  ],
  propertiesSchema: [],
};

export const QuadComparatorLM339Component: ComponentDefinition = {
  id: 'ic-comparator-lm339',
  name: 'Quad comparator',
  category: 'INTEGRATED_CIRCUITS',
  description: 'LM339 quad differential voltage comparator IC (DIP-14).',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 160, height: 100 },
  pins: [
    { id: 'out2', name: 'Output 2', label: '1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 15 } },
    { id: 'out1', name: 'Output 1', label: '2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 35, y: 15 } },
    { id: 'vcc', name: 'VCC (+)', label: '3', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 55, y: 15 } },
    { id: 'in1_inv', name: 'In 1 (-)', label: '4', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 75, y: 15 } },
    { id: 'in1_noninv', name: 'In 1 (+)', label: '5', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 95, y: 15 } },
    { id: 'in2_inv', name: 'In 2 (-)', label: '6', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 115, y: 15 } },
    { id: 'in2_noninv', name: 'In 2 (+)', label: '7', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 135, y: 15 } },
    { id: 'gnd', name: 'GND (-)', label: '12', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 55, y: 85 } },
  ],
  propertiesSchema: [],
};

export const DualComparatorLM393Component: ComponentDefinition = {
  id: 'ic-comparator-lm393',
  name: 'Dual comparator',
  category: 'INTEGRATED_CIRCUITS',
  description: 'LM393 dual differential voltage comparator IC (DIP-8).',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 120, height: 100 },
  pins: [
    { id: 'out1', name: 'Output 1', label: '1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 20, y: 15 } },
    { id: 'in1_inv', name: 'In 1 (-)', label: '2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 45, y: 15 } },
    { id: 'in1_noninv', name: 'In 1 (+)', label: '3', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 70, y: 15 } },
    { id: 'gnd', name: 'GND', label: '4', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 95, y: 15 } },
    { id: 'vcc', name: 'VCC', label: '8', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 20, y: 85 } },
    { id: 'out2', name: 'Output 2', label: '7', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 45, y: 85 } },
  ],
  propertiesSchema: [],
};

export const Optocoupler4N35Component: ComponentDefinition = {
  id: 'ic-optocoupler-4n35',
  name: 'Optocoupler',
  category: 'INTEGRATED_CIRCUITS',
  description: '4N35 phototransistor optocoupler isolator IC (DIP-6).',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 100, height: 100 },
  pins: [
    { id: 'anode', name: 'Anode (LED)', label: '1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 20, y: 15 } },
    { id: 'cathode', name: 'Cathode (LED)', label: '2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 50, y: 15 } },
    { id: 'nc', name: 'NC', label: '3', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 80, y: 15 } },
    { id: 'emitter', name: 'Emitter', label: '4', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 80, y: 85 } },
    { id: 'collector', name: 'Collector', label: '5', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 50, y: 85 } },
    { id: 'base', name: 'Base', label: '6', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 20, y: 85 } },
  ],
  propertiesSchema: [],
};

// --- POWER CONTROL ---

export const NPNTransistorComponent: ComponentDefinition = {
  id: 'transistor-npn',
  name: 'NPN Transistor',
  category: 'POWER_CONTROL',
  description: 'General purpose NPN BJT transistor (2N2222/2N3904) in TO-92 package.',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 60, height: 75 },
  pins: [
    { id: 'c', name: 'Collector (C)', label: 'C', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 65 } },
    { id: 'b', name: 'Base (B)', label: 'B', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 30, y: 65 } },
    { id: 'e', name: 'Emitter (E)', label: 'E', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 45, y: 65 } },
  ],
  propertiesSchema: [],
};

export const PNPTransistorComponent: ComponentDefinition = {
  id: 'transistor-pnp',
  name: 'PNP Transistor',
  category: 'POWER_CONTROL',
  description: 'General purpose PNP BJT transistor (2N3906) in TO-92 package.',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 60, height: 75 },
  pins: [
    { id: 'e', name: 'Emitter (E)', label: 'E', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 65 } },
    { id: 'b', name: 'Base (B)', label: 'B', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 30, y: 65 } },
    { id: 'c', name: 'Collector (C)', label: 'C', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 45, y: 65 } },
  ],
  propertiesSchema: [],
};

export const SmallSignalNMOSComponent: ComponentDefinition = {
  id: 'transistor-nmos-signal',
  name: 'Small Signal nMOS',
  category: 'POWER_CONTROL',
  description: 'N-channel MOSFET (2N7000) in TO-92 package.',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 60, height: 75 },
  pins: [
    { id: 'd', name: 'Drain (D)', label: 'D', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 65 } },
    { id: 'g', name: 'Gate (G)', label: 'G', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 30, y: 65 } },
    { id: 's', name: 'Source (S)', label: 'S', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 45, y: 65 } },
  ],
  propertiesSchema: [],
};

export const SmallSignalPMOSComponent: ComponentDefinition = {
  id: 'transistor-pmos-signal',
  name: 'Small Signal pMOS',
  category: 'POWER_CONTROL',
  description: 'P-channel MOSFET (BS250) in TO-92 package.',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 60, height: 75 },
  pins: [
    { id: 's', name: 'Source (S)', label: 'S', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 65 } },
    { id: 'g', name: 'Gate (G)', label: 'G', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 30, y: 65 } },
    { id: 'd', name: 'Drain (D)', label: 'D', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 45, y: 65 } },
  ],
  propertiesSchema: [],
};

export const NMOSTransistorComponent: ComponentDefinition = {
  id: 'transistor-nmos-power',
  name: 'nMOS Transistor',
  category: 'POWER_CONTROL',
  description: 'High-power N-channel MOSFET (IRF540N) in TO-220 package.',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 65, height: 95 },
  pins: [
    { id: 'g', name: 'Gate (G)', label: 'G', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 85 } },
    { id: 'd', name: 'Drain (D)', label: 'D', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 32, y: 85 } },
    { id: 's', name: 'Source (S)', label: 'S', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 50, y: 85 } },
  ],
  propertiesSchema: [],
};

export const PMOSTransistorComponent: ComponentDefinition = {
  id: 'transistor-pmos-power',
  name: 'pMOS Transistor',
  category: 'POWER_CONTROL',
  description: 'High-power P-channel MOSFET (IRF9540N) in TO-220 package.',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 65, height: 95 },
  pins: [
    { id: 'g', name: 'Gate (G)', label: 'G', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 85 } },
    { id: 'd', name: 'Drain (D)', label: 'D', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 32, y: 85 } },
    { id: 's', name: 'Source (S)', label: 'S', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 50, y: 85 } },
  ],
  propertiesSchema: [],
};

export const TIP120Component: ComponentDefinition = {
  id: 'transistor-tip120',
  name: 'TIP120',
  category: 'POWER_CONTROL',
  description: 'Medium power NPN Darlington transistor in TO-220 package.',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 65, height: 95 },
  pins: [
    { id: 'b', name: 'Base (B)', label: 'B', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 85 } },
    { id: 'c', name: 'Collector (C)', label: 'C', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 32, y: 85 } },
    { id: 'e', name: 'Emitter (E)', label: 'E', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 50, y: 85 } },
  ],
  propertiesSchema: [],
};

export const RelaySPDTComponent: ComponentDefinition = {
  id: 'relay-spdt',
  name: 'Relay SPDT',
  category: 'POWER_CONTROL',
  description: '5V Single Pole Double Throw electromechanical relay.',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 100, height: 75 },
  pins: [
    { id: 'coil1', name: 'Coil (+)', label: 'Coil 1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 65 } },
    { id: 'coil2', name: 'Coil (-)', label: 'Coil 2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 35, y: 65 } },
    { id: 'com', name: 'Common', label: 'COM', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 55, y: 65 } },
    { id: 'no', name: 'Normally Open', label: 'NO', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 75, y: 65 } },
    { id: 'nc', name: 'Normally Closed', label: 'NC', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 90, y: 65 } },
  ],
  propertiesSchema: [],
};

export const RelayDPDTComponent: ComponentDefinition = {
  id: 'relay-dpdt',
  name: 'Relay DPDT',
  category: 'POWER_CONTROL',
  description: '5V Double Pole Double Throw electromechanical relay.',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 120, height: 75 },
  pins: [
    { id: 'coil1', name: 'Coil (+)', label: '1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 65 } },
    { id: 'coil2', name: 'Coil (-)', label: '2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 35, y: 65 } },
    { id: 'com1', name: 'COM 1', label: '3', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 55, y: 65 } },
    { id: 'no1', name: 'NO 1', label: '4', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 75, y: 65 } },
    { id: 'com2', name: 'COM 2', label: '5', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 95, y: 65 } },
    { id: 'no2', name: 'NO 2', label: '6', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 110, y: 65 } },
  ],
  propertiesSchema: [],
};

export const VoltageRegulator5VComponent: ComponentDefinition = {
  id: 'voltage-regulator-5v',
  name: '5V Regulator [LM7805]',
  category: 'POWER_CONTROL',
  description: 'LM7805 positive 5V linear voltage regulator in TO-220 package.',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 65, height: 95 },
  pins: [
    { id: 'in', name: 'Input (7-35V)', label: 'IN', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 85 } },
    { id: 'gnd', name: 'Ground', label: 'GND', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 32, y: 85 } },
    { id: 'out', name: 'Output (+5V)', label: 'OUT', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 50, y: 85 } },
  ],
  propertiesSchema: [],
};

export const VoltageRegulator3V3Component: ComponentDefinition = {
  id: 'voltage-regulator-3v3',
  name: '3.3V Regulator',
  category: 'POWER_CONTROL',
  description: 'LM1117-3.3 low dropout 3.3V linear voltage regulator.',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 65, height: 95 },
  pins: [
    { id: 'gnd', name: 'Ground', label: 'GND', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 85 } },
    { id: 'out', name: 'Output (+3.3V)', label: 'OUT', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 32, y: 85 } },
    { id: 'in', name: 'Input (4.5-15V)', label: 'IN', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 50, y: 85 } },
  ],
  propertiesSchema: [],
};

export const HBridgeMotorDriverL293DComponent: ComponentDefinition = {
  id: 'ic-motor-driver-l293d',
  name: 'H-bridge Motor Driver',
  category: 'POWER_CONTROL',
  description: 'L293D quadruple high-current half-H driver IC (DIP-16).',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 170, height: 100 },
  pins: [
    { id: 'en1', name: 'Enable 1,2', label: '1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 15 } },
    { id: 'in1', name: 'Input 1', label: '2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 35, y: 15 } },
    { id: 'out1', name: 'Output 1', label: '3', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 55, y: 15 } },
    { id: 'gnd1', name: 'GND', label: '4', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 75, y: 15 } },
    { id: 'gnd2', name: 'GND', label: '5', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 95, y: 15 } },
    { id: 'out2', name: 'Output 2', label: '6', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 115, y: 15 } },
    { id: 'in2', name: 'Input 2', label: '7', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 135, y: 15 } },
    { id: 'vcc1', name: 'VCC1 (Logic 5V)', label: '8', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 155, y: 15 } },
    { id: 'vcc2', name: 'VCC2 (Motor Power)', label: '16', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 85 } },
  ],
  propertiesSchema: [],
};

// --- CONNECTORS ---

export const Header8PinComponent: ComponentDefinition = {
  id: 'connector-header-8pin',
  name: '8 Pin Header',
  category: 'CONNECTORS',
  description: '8-position 0.1" (2.54mm) pitch single row header strip.',
  electricalSpec: defaultPassiveSpec,
  visualDimensions: { width: 30, height: 160 },
  pins: [
    { id: 'pin1', name: 'Pin 1', label: '1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 15 } },
    { id: 'pin2', name: 'Pin 2', label: '2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 35 } },
    { id: 'pin3', name: 'Pin 3', label: '3', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 55 } },
    { id: 'pin4', name: 'Pin 4', label: '4', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 75 } },
    { id: 'pin5', name: 'Pin 5', label: '5', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 95 } },
    { id: 'pin6', name: 'Pin 6', label: '6', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 115 } },
    { id: 'pin7', name: 'Pin 7', label: '7', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 135 } },
    { id: 'pin8', name: 'Pin 8', label: '8', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 155 } },
  ],
  propertiesSchema: [],
};

export const USBStandardAComponent: ComponentDefinition = {
  id: 'connector-usb-a',
  name: 'USB standard A',
  category: 'CONNECTORS',
  description: 'USB Type-A male breakout connector cable with VBUS, D-, D+, GND.',
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 120, height: 60 },
  pins: [
    { id: 'vbus', name: 'VBUS (+5V)', label: 'VBUS', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 110, y: 15 } },
    { id: 'dm', name: 'D- (Data Negative)', label: 'D-', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 110, y: 25 } },
    { id: 'dp', name: 'D+ (Data Positive)', label: 'D+', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 110, y: 35 } },
    { id: 'gnd', name: 'GND (Ground)', label: 'GND', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 110, y: 45 } },
  ],
  propertiesSchema: [],
};

// --- LOGIC GATES (74xx DIP-14) ---

const createLogicGateComponent = (id: string, name: string, description: string): ComponentDefinition => ({
  id,
  name,
  category: 'LOGIC',
  description,
  electricalSpec: defaultPowerSpec,
  visualDimensions: { width: 160, height: 100 },
  pins: [
    { id: '1A', name: '1A', label: '1', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 15 } },
    { id: '1B', name: '1B', label: '2', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 35, y: 15 } },
    { id: '1Y', name: '1Y', label: '3', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 55, y: 15 } },
    { id: '2A', name: '2A', label: '4', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 75, y: 15 } },
    { id: '2B', name: '2B', label: '5', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 95, y: 15 } },
    { id: '2Y', name: '2Y', label: '6', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 115, y: 15 } },
    { id: 'gnd', name: 'GND', label: '7', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 135, y: 15 } },
    { id: 'vcc', name: 'VCC (+5V)', label: '14', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 15, y: 85 } },
    { id: '4B', name: '4B', label: '13', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 35, y: 85 } },
    { id: '4A', name: '4A', label: '12', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 55, y: 85 } },
    { id: '4Y', name: '4Y', label: '11', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 75, y: 85 } },
    { id: '3B', name: '3B', label: '10', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 95, y: 85 } },
    { id: '3A', name: '3A', label: '9', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 115, y: 85 } },
    { id: '3Y', name: '3Y', label: '8', signalType: 'PASSIVE_BIDIRECTIONAL', position: { x: 135, y: 85 } },
  ],
  propertiesSchema: [],
});

export const Logic74HC00Component = createLogicGateComponent('logic-74hc00', 'Quad NAND gate', '74HC00 Quad 2-Input NAND Gate (DIP-14).');
export const Logic74HC02Component = createLogicGateComponent('logic-74hc02', 'Quad NOR gate', '74HC02 Quad 2-Input NOR Gate (DIP-14).');
export const Logic74HC08Component = createLogicGateComponent('logic-74hc08', 'Quad AND gate', '74HC08 Quad 2-Input AND Gate (DIP-14).');
export const Logic74HC32Component = createLogicGateComponent('logic-74hc32', 'Quad OR gate', '74HC32 Quad 2-Input OR Gate (DIP-14).');
export const Logic74HC86Component = createLogicGateComponent('logic-74hc86', 'Quad XOR gate', '74HC86 Quad 2-Input XOR Gate (DIP-14).');
export const Logic74HC04Component = createLogicGateComponent('logic-74hc04', 'Hex Inverter', '74HC04 Hex Inverter Gate (DIP-14).');
export const Logic74HC14Component = createLogicGateComponent('logic-74hc14', 'Inverting Schmitt...', '74HC14 Hex Inverting Schmitt Trigger (DIP-14).');
export const Logic74HC132Component = createLogicGateComponent('logic-74hc132', 'Quad NAND Schmitt...', '74HC132 Quad 2-Input NAND Schmitt Trigger (DIP-14).');
export const Logic74HC10Component = createLogicGateComponent('logic-74hc10', 'Triple 3-Input NAND gate', '74HC10 Triple 3-Input NAND Gate (DIP-14).');
export const Logic74HC11Component = createLogicGateComponent('logic-74hc11', 'Triple 3-Input AND gate', '74HC11 Triple 3-Input AND Gate (DIP-14).');
export const Logic74HC27Component = createLogicGateComponent('logic-74hc27', 'Triple 3-Input NOR gate', '74HC27 Triple 3-Input NOR Gate (DIP-14).');
export const Logic74HC20Component = createLogicGateComponent('logic-74hc20', 'Dual 4-Input NAND gate', '74HC20 Dual 4-Input NAND Gate (DIP-14).');
export const Logic74HC21Component = createLogicGateComponent('logic-74hc21', 'Dual 4-Input AND gate', '74HC21 Dual 4-Input AND Gate (DIP-14).');
export const Logic74HC73Component = createLogicGateComponent('logic-74hc73', 'Dual J-K Flip-Flop', '74HC73 Dual J-K Flip-Flop with Reset (DIP-14).');
export const Logic74HC74Component = createLogicGateComponent('logic-74hc74', 'Dual D Flip-Flop', '74HC74 Dual D-Type Positive-Edge-Triggered Flip-Flop (DIP-14).');
export const Logic74HC75Component = createLogicGateComponent('logic-74hc75', '4-Bit Latch', '74HC75 Quad Bistable Transparent Latch (DIP-16).');
export const Logic74HC93Component = createLogicGateComponent('logic-74hc93', '4-Bit Binary Counter', '74HC93 4-Bit Binary Ripple Counter (DIP-14).');
export const Logic74HC283Component = createLogicGateComponent('logic-74hc283', '4-Bit Adder', '74HC283 4-Bit Binary Full Adder with Fast Carry (DIP-16).');
export const Logic74HC595Component = createLogicGateComponent('logic-74hc595', '8-Bit Shift Register', '74HC595 8-Bit Serial-In Parallel-Out Shift Register (DIP-16).');
export const Logic74HC4017Component = createLogicGateComponent('logic-74hc4017', 'Johnson Decade...', '74HC4017 Decade Counter / Divider with 10 Decoded Outputs (DIP-16).');
export const LogicCD4511Component = createLogicGateComponent('logic-cd4511', '7-Segment Decoder', 'CD4511 BCD to 7-Segment Latch/Decoder/Driver (DIP-16).');
export const LogicPCF8574Component = createLogicGateComponent('logic-pcf8574', '8-port I2C expander', 'PCF8574 Remote 8-Bit I/O Expander for I2C-bus (DIP-16).');


