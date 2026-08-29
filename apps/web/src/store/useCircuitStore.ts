import { create } from 'zustand';
import { CircuitGraph, ElectricalValidator, CodeHardwareCrossValidator, ComponentInstance } from '@circuit/circuit-engine';
import { useSimulationStore } from './useSimulationStore';
import { WireEdge, ElectricalValidationError } from '@circuit/shared';
import { ComponentRegistry } from '@circuit/component-sdk';
import { BoardRegistry } from '@circuit/board-sdk';

interface WireDraft {
  fromComponentId: string;
  fromPinId: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

interface HistorySnapshot {
  components: ComponentInstance[];
  wires: WireEdge[];
}

interface CircuitStoreState {
  graph: CircuitGraph;
  components: ComponentInstance[];
  wires: WireEdge[];
  validationErrors: ElectricalValidationError[];
  selectedComponentId: string | null;
  selectedWireId: string | null;
  activeWireDraft: WireDraft | null;
  selectedWireColor: string;
  selectedWireType: string;
  notesVisible: boolean;
  historyStack: HistorySnapshot[];
  futureStack: HistorySnapshot[];

  setSelectedWireColor: (color: string) => void;
  setSelectedWireType: (type: string) => void;
  toggleNotesVisible: () => void;
  rotateComponent: (id: string) => void;
  addComponent: (typeId: string, x: number, y: number) => void;
  addBoard: (boardId: string, x: number, y: number) => void;
  removeComponent: (id: string) => void;
  selectWire: (id: string | null) => void;
  removeWire: (id: string) => void;
  updateWireColor: (wireId: string, color: string) => void;
  updateComponentPosition: (id: string, x: number, y: number) => void;
  updateComponentProperty: (id: string, key: string, value: any) => void;
  selectComponent: (id: string | null) => void;
  startWireDraft: (componentId: string, pinId: string, x: number, y: number) => void;
  updateWireDraft: (toX: number, toY: number) => void;
  completeWireDraft: (toComponentId: string, toPinId: string) => void;
  cancelWireDraft: () => void;
  runValidation: () => void;
  clearCircuit: () => void;
  load3LedPreset: () => void;
  undo: () => void;
  redo: () => void;
}

const buildDefaultCircuit = () => {
  const graph = new CircuitGraph();

  // 1. Arduino UNO Board
  const uno: ComponentInstance = {
    id: 'board_uno_main',
    typeId: 'board-arduino-uno',
    label: 'Arduino UNO R3',
    position: { x: 80, y: 150 },
    rotation: 0,
    properties: {},
  };
  graph.addComponent(uno);

  // 2. Three 220Ω Resistors stacked horizontally
  const r1: ComponentInstance = {
    id: 'resistor_top',
    typeId: 'resistor',
    label: 'Resistor 1 (220Ω)',
    position: { x: 380, y: 65 },
    rotation: 0,
    properties: { resistance: 220 },
  };
  const r2: ComponentInstance = {
    id: 'resistor_mid',
    typeId: 'resistor',
    label: 'Resistor 2 (220Ω)',
    position: { x: 380, y: 110 },
    rotation: 0,
    properties: { resistance: 220 },
  };
  const r3: ComponentInstance = {
    id: 'resistor_bot',
    typeId: 'resistor',
    label: 'Resistor 3 (220Ω)',
    position: { x: 380, y: 155 },
    rotation: 0,
    properties: { resistance: 220 },
  };
  graph.addComponent(r1);
  graph.addComponent(r2);
  graph.addComponent(r3);

  // 3. Three 5mm LEDs (Red, Yellow, Green) stacked vertically
  const led1: ComponentInstance = {
    id: 'led_top',
    typeId: 'led',
    label: 'Red LED (Pin 0)',
    position: { x: 500, y: 160 },
    rotation: 0,
    properties: { color: 'RED' },
  };
  const led2: ComponentInstance = {
    id: 'led_mid',
    typeId: 'led',
    label: 'Yellow LED (Pin 1)',
    position: { x: 500, y: 220 },
    rotation: 0,
    properties: { color: 'YELLOW' },
  };
  const led3: ComponentInstance = {
    id: 'led_bot',
    typeId: 'led',
    label: 'Green LED (Pin 2)',
    position: { x: 500, y: 280 },
    rotation: 0,
    properties: { color: 'GREEN' },
  };
  graph.addComponent(led1);
  graph.addComponent(led2);
  graph.addComponent(led3);

  // 4. Wires connecting according to the user reference diagram
  // Red Wire: D0 (RX) -> Resistor 1
  graph.addWire({
    id: 'wire_d0_r1',
    fromComponentId: 'board_uno_main',
    fromPinId: 'D0',
    toComponentId: 'resistor_top',
    toPinId: 'pin1',
    color: '#FF0000',
    gaugeAWG: 22,
    netId: '',
  });

  // Red Wire: Resistor 1 -> LED 1 Anode
  graph.addWire({
    id: 'wire_r1_led1',
    fromComponentId: 'resistor_top',
    fromPinId: 'pin2',
    toComponentId: 'led_top',
    toPinId: 'anode',
    color: '#FF0000',
    gaugeAWG: 22,
    netId: '',
  });

  // Yellow Wire: D1 (TX) -> Resistor 2
  graph.addWire({
    id: 'wire_d1_r2',
    fromComponentId: 'board_uno_main',
    fromPinId: 'D1',
    toComponentId: 'resistor_mid',
    toPinId: 'pin1',
    color: '#FFD600',
    gaugeAWG: 22,
    netId: '',
  });

  // Yellow Wire: Resistor 2 -> LED 2 Anode
  graph.addWire({
    id: 'wire_r2_led2',
    fromComponentId: 'resistor_mid',
    fromPinId: 'pin2',
    toComponentId: 'led_mid',
    toPinId: 'anode',
    color: '#FFD600',
    gaugeAWG: 22,
    netId: '',
  });

  // Green Wire: D2 -> Resistor 3
  graph.addWire({
    id: 'wire_d2_r3',
    fromComponentId: 'board_uno_main',
    fromPinId: 'D2',
    toComponentId: 'resistor_bot',
    toPinId: 'pin1',
    color: '#00C853',
    gaugeAWG: 22,
    netId: '',
  });

  // Green Wire: Resistor 3 -> LED 3 Anode
  graph.addWire({
    id: 'wire_r3_led3',
    fromComponentId: 'resistor_bot',
    fromPinId: 'pin2',
    toComponentId: 'led_bot',
    toPinId: 'anode',
    color: '#00C853',
    gaugeAWG: 22,
    netId: '',
  });

  // Black Ground Rail: GND -> LED 3 Cathode
  graph.addWire({
    id: 'wire_gnd_led3',
    fromComponentId: 'board_uno_main',
    fromPinId: 'GND',
    toComponentId: 'led_bot',
    toPinId: 'cathode',
    color: '#000000',
    gaugeAWG: 22,
    netId: '',
  });

  // Ground Daisy-Chain: LED 3 Cathode -> LED 2 Cathode
  graph.addWire({
    id: 'wire_gnd_led3_to_led2',
    fromComponentId: 'led_bot',
    fromPinId: 'cathode',
    toComponentId: 'led_mid',
    toPinId: 'cathode',
    color: '#000000',
    gaugeAWG: 22,
    netId: '',
  });

  // Ground Daisy-Chain: LED 2 Cathode -> LED 1 Cathode
  graph.addWire({
    id: 'wire_gnd_led2_to_led1',
    fromComponentId: 'led_mid',
    fromPinId: 'cathode',
    toComponentId: 'led_top',
    toPinId: 'cathode',
    color: '#000000',
    gaugeAWG: 22,
    netId: '',
  });

  return graph;
};

const takeSnapshot = (components: ComponentInstance[], wires: WireEdge[]): HistorySnapshot => {
  return {
    components: JSON.parse(JSON.stringify(components)),
    wires: JSON.parse(JSON.stringify(wires)),
  };
};

const restoreFromSnapshot = (snapshot: HistorySnapshot): CircuitGraph => {
  const newGraph = new CircuitGraph();
  snapshot.components.forEach((c) => newGraph.addComponent({ ...c, properties: { ...c.properties } }));
  snapshot.wires.forEach((w) => newGraph.addWire({ ...w }));
  return newGraph;
};

const recordHistory = (set: any, get: any) => {
  const currentSnapshot = takeSnapshot(get().components, get().wires);
  set((state: any) => ({
    historyStack: [...state.historyStack.slice(-49), currentSnapshot],
    futureStack: [],
  }));
};

const initialGraph = buildDefaultCircuit();

export const useCircuitStore = create<CircuitStoreState>((set, get) => ({
  graph: initialGraph,
  components: initialGraph.getAllComponents(),
  wires: initialGraph.getAllWires(),
  validationErrors: [],
  selectedComponentId: null,
  selectedWireId: null,
  activeWireDraft: null,
  selectedWireColor: '#FF0000', // Authentic Tinkercad Red
  selectedWireType: 'hookup',
  notesVisible: true,
  historyStack: [],
  futureStack: [],

  setSelectedWireColor: (color: string) => set({ selectedWireColor: color }),
  setSelectedWireType: (type: string) => set({ selectedWireType: type }),
  toggleNotesVisible: () => set((state) => ({ notesVisible: !state.notesVisible })),

  rotateComponent: (id: string) => {
    recordHistory(set, get);
    const comp = get().graph.getComponent(id);
    if (comp) {
      comp.rotation = (comp.rotation + 30) % 360;
      set({ components: get().graph.getAllComponents() });
    }
  },

  addComponent: (typeId: string, x: number, y: number) => {
    const compDef = ComponentRegistry.getComponent(typeId);
    if (!compDef) return;

    recordHistory(set, get);

    const newComp: ComponentInstance = {
      id: `comp_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      typeId,
      label: `${compDef.name} ${get().components.length + 1}`,
      position: { x, y },
      rotation: 0,
      properties: Object.fromEntries(
        compDef.propertiesSchema.map((p) => [p.key, p.default])
      ),
    };

    get().graph.addComponent(newComp);
    set({
      components: get().graph.getAllComponents(),
      selectedComponentId: newComp.id,
      selectedWireId: null,
    });
    get().runValidation();
  },

  addBoard: (boardId: string, x: number, y: number) => {
    const boardDef = BoardRegistry.getBoard(boardId);
    if (!boardDef) return;

    recordHistory(set, get);

    const newComp: ComponentInstance = {
      id: `board_${Date.now()}`,
      typeId: boardId,
      label: boardDef.name,
      position: { x, y },
      rotation: 0,
      properties: {},
    };

    get().graph.addComponent(newComp);
    set({
      components: get().graph.getAllComponents(),
      selectedComponentId: newComp.id,
      selectedWireId: null,
    });
    get().runValidation();
  },

  removeComponent: (id: string) => {
    recordHistory(set, get);
    get().graph.removeComponent(id);
    set({
      components: get().graph.getAllComponents(),
      wires: get().graph.getAllWires(),
      selectedComponentId: get().selectedComponentId === id ? null : get().selectedComponentId,
    });
    get().runValidation();
  },

  updateComponentPosition: (id: string, x: number, y: number) => {
    const comp = get().graph.getComponent(id);
    if (comp) {
      comp.position = { x, y };
      set({ components: get().graph.getAllComponents() });
    }
  },

  updateComponentProperty: (id: string, key: string, value: any) => {
    recordHistory(set, get);
    const comp = get().graph.getComponent(id);
    if (comp) {
      comp.properties[key] = value;
      set({ components: get().graph.getAllComponents() });
    }
  },

  selectComponent: (id: string | null) => {
    set({ selectedComponentId: id, selectedWireId: id ? null : get().selectedWireId });
  },

  startWireDraft: (componentId: string, pinId: string, x: number, y: number) => {
    set({
      activeWireDraft: {
        fromComponentId: componentId,
        fromPinId: pinId,
        fromX: x,
        fromY: y,
        toX: x,
        toY: y,
      },
    });
  },

  updateWireDraft: (toX: number, toY: number) => {
    const draft = get().activeWireDraft;
    if (!draft) return;
    set({
      activeWireDraft: { ...draft, toX, toY },
    });
  },

  selectWire: (id: string | null) => {
    set({ selectedWireId: id, selectedComponentId: id ? null : get().selectedComponentId });
  },

  removeWire: (id: string) => {
    recordHistory(set, get);
    get().graph.removeWire(id);
    set({
      wires: get().graph.getAllWires(),
      selectedWireId: get().selectedWireId === id ? null : get().selectedWireId,
    });
    get().runValidation();
  },

  updateWireColor: (wireId: string, color: string) => {
    recordHistory(set, get);
    const wire = get().wires.find((w) => w.id === wireId);
    if (wire) {
      wire.color = color;
      set({ wires: [...get().wires] });
    }
  },

  completeWireDraft: (toComponentId: string, toPinId: string) => {
    const draft = get().activeWireDraft;
    if (!draft) return;

    if (draft.fromComponentId === toComponentId && draft.fromPinId === toPinId) {
      set({ activeWireDraft: null });
      return;
    }

    recordHistory(set, get);

    // Smart Auto-Color based on signal / pin names (Tinkercad standards)
    const p1 = draft.fromPinId.toLowerCase();
    const p2 = toPinId.toLowerCase();
    let wireColor = get().selectedWireColor;

    if (p1.includes('gnd') || p2.includes('gnd') || p1.includes('cathode') || p2.includes('cathode') || p1.includes('ground') || p2.includes('ground')) {
      wireColor = '#000000'; // Black for GND
    } else if (p1.includes('5v') || p2.includes('5v') || p1.includes('3v3') || p2.includes('3v3') || p1.includes('vcc') || p2.includes('vcc') || p1.includes('vin') || p2.includes('vin')) {
      wireColor = '#FF0000'; // Red for VCC
    } else if (p1.includes('13') || p2.includes('13') || p1.includes('anode') || p2.includes('anode')) {
      wireColor = '#00C853'; // Green for Digital Pin 13 / LED Anode
    } else if (p1.startsWith('d') || p2.startsWith('d')) {
      wireColor = '#2979FF'; // Blue for Digital GPIO
    } else if (p1.startsWith('a') || p2.startsWith('a')) {
      wireColor = '#FFD600'; // Yellow for Analog Inputs
    } else if (p1.includes('sda') || p2.includes('sda') || p1.includes('scl') || p2.includes('scl')) {
      wireColor = '#00E5FF'; // Turquoise for I2C
    }

    const newWire: WireEdge = {
      id: `wire_${Date.now()}`,
      fromComponentId: draft.fromComponentId,
      fromPinId: draft.fromPinId,
      toComponentId,
      toPinId,
      color: wireColor,
      gaugeAWG: 22,
      netId: '',
    };

    get().graph.addWire(newWire);
    set({
      wires: get().graph.getAllWires(),
      activeWireDraft: null,
    });
    get().runValidation();
  },

  cancelWireDraft: () => {
    set({ activeWireDraft: null });
  },

  runValidation: () => {
    const electricalErrors = ElectricalValidator.validate(get().graph);
    const firmwareCode = useSimulationStore.getState().firmwareCode || '';
    const crossErrors = CodeHardwareCrossValidator.validateCrossReferences(firmwareCode, get().graph);
    set({ validationErrors: [...electricalErrors, ...crossErrors] });
  },

  clearCircuit: () => {
    recordHistory(set, get);
    const newGraph = new CircuitGraph();
    set({
      graph: newGraph,
      components: [],
      wires: [],
      validationErrors: [],
      selectedComponentId: null,
      selectedWireId: null,
      activeWireDraft: null,
    });
  },

  load3LedPreset: () => {
    recordHistory(set, get);
    const presetGraph = buildDefaultCircuit();
    set({
      graph: presetGraph,
      components: presetGraph.getAllComponents(),
      wires: presetGraph.getAllWires(),
      selectedComponentId: null,
      selectedWireId: null,
      activeWireDraft: null,
    });
    get().runValidation();
  },

  undo: () => {
    const { historyStack, futureStack, components, wires } = get();
    if (historyStack.length === 0) return;

    const previousSnapshot = historyStack[historyStack.length - 1];
    const newHistory = historyStack.slice(0, -1);
    const currentSnapshot = takeSnapshot(components, wires);

    const restoredGraph = restoreFromSnapshot(previousSnapshot);

    set({
      graph: restoredGraph,
      components: restoredGraph.getAllComponents(),
      wires: restoredGraph.getAllWires(),
      historyStack: newHistory,
      futureStack: [currentSnapshot, ...futureStack],
      selectedComponentId: null,
      selectedWireId: null,
    });
    get().runValidation();
  },

  redo: () => {
    const { historyStack, futureStack, components, wires } = get();
    if (futureStack.length === 0) return;

    const nextSnapshot = futureStack[0];
    const newFuture = futureStack.slice(1);
    const currentSnapshot = takeSnapshot(components, wires);

    const restoredGraph = restoreFromSnapshot(nextSnapshot);

    set({
      graph: restoredGraph,
      components: restoredGraph.getAllComponents(),
      wires: restoredGraph.getAllWires(),
      historyStack: [...historyStack, currentSnapshot],
      futureStack: newFuture,
      selectedComponentId: null,
      selectedWireId: null,
    });
    get().runValidation();
  },
}));
