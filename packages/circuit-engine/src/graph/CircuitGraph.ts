import { WireEdge, NetlistNode } from '@circuit/shared';

export interface ComponentInstance {
  id: string;
  typeId: string;
  label: string;
  position: { x: number; y: number };
  rotation: number;
  properties: Record<string, any>;
}

export class CircuitGraph {
  private components: Map<string, ComponentInstance> = new Map();
  private wires: Map<string, WireEdge> = new Map();
  private pinToWiresMap: Map<string, Set<string>> = new Map(); // key: `${componentId}:${pinId}` -> wireIds

  public addComponent(component: ComponentInstance): void {
    this.components.set(component.id, component);
  }

  public removeComponent(componentId: string): void {
    this.components.delete(componentId);
    // Remove attached wires
    const wiresToRemove: string[] = [];
    this.wires.forEach((wire, wireId) => {
      if (wire.fromComponentId === componentId || wire.toComponentId === componentId) {
        wiresToRemove.push(wireId);
      }
    });
    wiresToRemove.forEach((wireId) => this.removeWire(wireId));
  }

  public getComponent(componentId: string): ComponentInstance | undefined {
    return this.components.get(componentId);
  }

  public getAllComponents(): ComponentInstance[] {
    return Array.from(this.components.values());
  }

  public addWire(wire: WireEdge): void {
    this.wires.set(wire.id, wire);
    
    const fromKey = `${wire.fromComponentId}:${wire.fromPinId}`;
    const toKey = `${wire.toComponentId}:${wire.toPinId}`;

    if (!this.pinToWiresMap.has(fromKey)) this.pinToWiresMap.set(fromKey, new Set());
    if (!this.pinToWiresMap.has(toKey)) this.pinToWiresMap.set(toKey, new Set());

    this.pinToWiresMap.get(fromKey)!.add(wire.id);
    this.pinToWiresMap.get(toKey)!.add(wire.id);
  }

  public removeWire(wireId: string): void {
    const wire = this.wires.get(wireId);
    if (!wire) return;

    const fromKey = `${wire.fromComponentId}:${wire.fromPinId}`;
    const toKey = `${wire.toComponentId}:${wire.toPinId}`;

    this.pinToWiresMap.get(fromKey)?.delete(wireId);
    this.pinToWiresMap.get(toKey)?.delete(wireId);

    this.wires.delete(wireId);
  }

  public getAllWires(): WireEdge[] {
    return Array.from(this.wires.values());
  }

  /**
   * Calculates electrical equivalence nets via Graph BFS traversal
   */
  public extractNetlists(): NetlistNode[] {
    const visitedPins = new Set<string>();
    const nets: NetlistNode[] = [];
    let netCounter = 1;

    this.pinToWiresMap.forEach((_, pinKey) => {
      if (visitedPins.has(pinKey)) return;

      const currentNetPins: Array<{ componentId: string; pinId: string }> = [];
      const queue: string[] = [pinKey];
      visitedPins.add(pinKey);

      while (queue.length > 0) {
        const currPinKey = queue.shift()!;
        const [comp = '', pin = ''] = currPinKey.split(':');
        currentNetPins.push({ componentId: comp, pinId: pin });

        const connectedWires = this.pinToWiresMap.get(currPinKey);
        if (connectedWires) {
          connectedWires.forEach((wireId) => {
            const wire = this.wires.get(wireId);
            if (!wire) return;

            const neighborKey = (currPinKey === `${wire.fromComponentId}:${wire.fromPinId}`)
              ? `${wire.toComponentId}:${wire.toPinId}`
              : `${wire.fromComponentId}:${wire.fromPinId}`;

            if (!visitedPins.has(neighborKey)) {
              visitedPins.add(neighborKey);
              queue.push(neighborKey);
            }
          });
        }
      }

      nets.push({
        netId: `NET_${netCounter++}`,
        name: `Net ${netCounter - 1}`,
        connectedPinIds: currentNetPins,
        voltage: 0,
        isShortedToGround: false,
        isShortedToVcc: false,
        isFloating: currentNetPins.length === 1,
      });
    });

    return nets;
  }
}
