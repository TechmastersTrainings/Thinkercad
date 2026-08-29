import { CircuitGraph } from '../graph/CircuitGraph';
import { NetlistNode } from '@circuit/shared';

export class NetlistExtractor {
  public static extract(graph: CircuitGraph): NetlistNode[] {
    return graph.extractNetlists();
  }
}
