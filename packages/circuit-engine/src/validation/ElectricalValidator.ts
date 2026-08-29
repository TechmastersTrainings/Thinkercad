import { CircuitGraph } from '../graph/CircuitGraph';
import { ElectricalValidationError } from '@circuit/shared';
import { BoardRegistry } from '@circuit/board-sdk';

export class ElectricalValidator {
  public static validate(graph: CircuitGraph): ElectricalValidationError[] {
    const errors: ElectricalValidationError[] = [];
    const nets = graph.extractNetlists();

    nets.forEach((net) => {
      let containsVcc = false;
      let containsGnd = false;
      const vccPins: string[] = [];
      const gndPins: string[] = [];

      net.connectedPinIds.forEach(({ componentId, pinId }: { componentId: string; pinId: string }) => {
        const pinLower = pinId.toLowerCase();
        if (pinLower.includes('vcc') || pinLower.includes('5v') || pinLower.includes('3v3')) {
          containsVcc = true;
          vccPins.push(`${componentId}:${pinId}`);
        }
        if (pinLower.includes('gnd') || pinLower.includes('ground')) {
          containsGnd = true;
          gndPins.push(`${componentId}:${pinId}`);
        }
      });

      // Check 1: Direct Short Circuit (VCC directly connected to GND)
      if (containsVcc && containsGnd) {
        errors.push({
          id: `ERR_SHORT_CIRCUIT_${net.netId}`,
          code: 'SHORT_CIRCUIT',
          severity: 'ERROR',
          title: 'Direct Short Circuit Detected',
          message: `Net ${net.name} directly connects Power Rail (VCC) to Ground (GND). This will cause immediate hardware component damage.`,
          affectedComponentIds: net.connectedPinIds.map((p) => p.componentId),
          affectedPinIds: [...vccPins, ...gndPins],
          affectedNetIds: [net.netId],
          recommendation: 'Remove direct wire connection between VCC and GND or insert a load resistor.',
        });
      }

      // Check 2: Floating Pin Detection
      if (net.isFloating) {
        const { componentId, pinId } = net.connectedPinIds[0];
        errors.push({
          id: `WARN_FLOATING_${componentId}_${pinId}`,
          code: 'FLOATING_PIN',
          severity: 'WARNING',
          title: 'Unconnected Floating Pin',
          message: `Pin '${pinId}' on component '${componentId}' is floating without wire connection.`,
          affectedComponentIds: [componentId],
          affectedPinIds: [`${componentId}:${pinId}`],
          affectedNetIds: [net.netId],
          recommendation: 'Connect pin to valid micro-controller GPIO, power rail, or ground.',
        });
      }

      // Check 3: Voltage Mismatch Warning (5V signal connected to 3.3V logic board)
      const has5VRail = net.connectedPinIds.some((p) => p.pinId === '5V' || p.pinId === 'vcc');
      const has3V3Board = net.connectedPinIds.some((p) => {
        const comp = graph.getComponent(p.componentId);
        if (!comp || !comp.typeId.startsWith('board-')) return false;
        const boardDef = BoardRegistry.getBoard(comp.typeId);
        return boardDef && boardDef.electricalSpec.nominalOperatingVoltage === 3.3;
      });

      if (has5VRail && has3V3Board) {
        errors.push({
          id: `WARN_VOLTAGE_MISMATCH_${net.netId}`,
          code: 'VOLTAGE_MISMATCH',
          severity: 'ERROR',
          title: 'Logic Level Voltage Mismatch (5V -> 3.3V Pin)',
          message: `Net ${net.name} feeds a 5V signal into a 3.3V MCU board pin. Connecting 5V to non-tolerant 3.3V pins risks permanent chip damage.`,
          affectedComponentIds: net.connectedPinIds.map((p) => p.componentId),
          affectedPinIds: net.connectedPinIds.map((p) => `${p.componentId}:${p.pinId}`),
          affectedNetIds: [net.netId],
          recommendation: 'Insert a 5V to 3.3V logic level shifter or potential resistor divider (e.g. 1kΩ / 2kΩ).',
        });
      }
    });

    // Check 4: LED Series Resistor Check
    const components = graph.getAllComponents();
    components.forEach((comp) => {
      if (comp.typeId === 'led' || comp.typeId === 'rgb-led') {
        const netsWithLed = nets.filter((n) =>
          n.connectedPinIds.some((p) => p.componentId === comp.id)
        );

        let holdsResistor = false;
        netsWithLed.forEach((net) => {
          net.connectedPinIds.forEach((p) => {
            const nodeComp = graph.getComponent(p.componentId);
            if (nodeComp && nodeComp.typeId === 'resistor') {
              holdsResistor = true;
            }
          });
        });

        if (!holdsResistor) {
          errors.push({
            id: `WARN_LED_NO_RESISTOR_${comp.id}`,
            code: 'LED_NO_RESISTOR',
            severity: 'WARNING',
            title: 'LED Missing Series Resistor',
            message: `LED '${comp.label}' is wired without a current-limiting resistor. Overcurrent will burn out the LED diode.`,
            affectedComponentIds: [comp.id],
            affectedPinIds: comp.typeId === 'led' ? [`${comp.id}:anode`, `${comp.id}:cathode`] : [`${comp.id}:red`, `${comp.id}:green`, `${comp.id}:blue`],
            affectedNetIds: netsWithLed.map((n) => n.netId),
            recommendation: 'Add a 220Ω - 330Ω current-limiting resistor in series with the LED anode.',
          });
        }
      }
    });

    // Check 5: Board Power Draw Overcurrent Alert (e.g. multiple motors/servos on 5V rail)
    const boards = components.filter((c) => c.typeId.startsWith('board-'));
    boards.forEach((boardComp) => {
      const boardDef = BoardRegistry.getBoard(boardComp.typeId);
      if (!boardDef) return;

      const powerNets = nets.filter((n) =>
        n.connectedPinIds.some((p) => p.componentId === boardComp.id && (p.pinId === '5V' || p.pinId === '3V3'))
      );

      let totalCurrentDraw = 0;
      const heavyLoadTypes = ['dc-motor', 'stepper-motor', 'servo', 'gsm-sim800l'];
      const loads: string[] = [];

      powerNets.forEach((net) => {
        net.connectedPinIds.forEach((p) => {
          const comp = graph.getComponent(p.componentId);
          if (comp && heavyLoadTypes.includes(comp.typeId)) {
            totalCurrentDraw += 0.4; // estimated current per motor/servo
            loads.push(comp.label);
          }
        });
      });

      if (totalCurrentDraw > boardDef.electricalSpec.maxCurrentDraw) {
        errors.push({
          id: `WARN_POWER_BUDGET_${boardComp.id}`,
          code: 'POWER_BUDGET_EXCEEDED',
          severity: 'WARNING',
          title: 'Microcontroller Power Budget Exceeded',
          message: `High-power components (${loads.join(', ')}) are drawing current directly from the microcontroller power pin. This can cause brownout resets or regulator overheating.`,
          affectedComponentIds: [boardComp.id],
          affectedPinIds: [`${boardComp.id}:5V`],
          affectedNetIds: powerNets.map((n) => n.netId),
          recommendation: 'Power motors and high-current modules using an external 5V/12V power supply instead of board pins.',
        });
      }
    });

    return errors;
  }
}
