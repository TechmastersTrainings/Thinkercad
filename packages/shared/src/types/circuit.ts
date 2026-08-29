import { PinState, SignalType } from './electrical';

export interface ComponentPinPosition {
  x: number;
  y: number;
}

export interface ComponentPinDefinition {
  id: string;
  name: string;
  label: string;
  signalType: SignalType;
  position: ComponentPinPosition;
  isPowerGnd?: boolean;
  isPowerVcc?: boolean;
  maxVoltage?: number;
}

export interface CircuitNode {
  id: string;
  componentId: string;
  pinId: string;
  netId: string | null;
}

export interface WireEdge {
  id: string;
  fromComponentId: string;
  fromPinId: string;
  toComponentId: string;
  toPinId: string;
  color: string;
  gaugeAWG: number;
  netId: string;
  waypoints?: Array<{ x: number; y: number }>;
}

export interface NetlistNode {
  netId: string;
  name: string;
  connectedPinIds: Array<{ componentId: string; pinId: string }>;
  voltage: number;
  isShortedToGround: boolean;
  isShortedToVcc: boolean;
  isFloating: boolean;
}

export type ValidationSeverity = 'ERROR' | 'WARNING' | 'INFO';

export interface ElectricalValidationError {
  id: string;
  code: string;
  severity: ValidationSeverity;
  title: string;
  message: string;
  affectedComponentIds: string[];
  affectedPinIds: string[];
  affectedNetIds: string[];
  recommendation: string;
}

export interface CircuitGraphData {
  id: string;
  name: string;
  components: Array<{
    id: string;
    typeId: string;
    label: string;
    position: { x: number; y: number };
    rotation: number;
    properties: Record<string, any>;
  }>;
  wires: WireEdge[];
  nets: NetlistNode[];
}
