import { ElectricalSpec } from './electrical';
import { ComponentPinDefinition } from './circuit';

export type ComponentCategory = 
  | 'PASSIVE'
  | 'DISCRETE_SEMICONDUCTOR'
  | 'OPTOELECTRONICS'
  | 'ELECTROMECHANICAL'
  | 'SENSORS'
  | 'DISPLAYS'
  | 'POWER'
  | 'CONNECTIVITY'
  | 'INTEGRATED_CIRCUITS'
  | 'CAMERAS'
  | 'WIRELESS'
  | 'ACTUATORS'
  | 'INPUT'
  | 'OUTPUT'
  | 'BREADBOARDS'
  | 'INSTRUMENTS'
  | 'POWER_CONTROL'
  | 'CONNECTORS'
  | 'LOGIC';

export interface ComponentPropertySchema {
  key: string;
  label: string;
  type: 'number' | 'string' | 'boolean' | 'enum';
  default: any;
  unit?: string;
  options?: string[]; // for enum
  min?: number;
  max?: number;
  description?: string;
}

export interface ComponentDefinition {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  electricalSpec: ElectricalSpec;
  pins: ComponentPinDefinition[];
  propertiesSchema: ComponentPropertySchema[];
  visualDimensions: { width: number; height: number };
  svgPath?: string;
  datasheetUrl?: string;
}
