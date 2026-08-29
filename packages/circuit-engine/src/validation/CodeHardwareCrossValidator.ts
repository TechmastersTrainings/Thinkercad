import { CircuitGraph } from '../graph/CircuitGraph';
import { ElectricalValidationError } from '@circuit/shared';

export interface CodePinDeclaration {
  variableName: string;
  declaredPinNumber: number;
  pinId: string;
  usageMode?: 'INPUT' | 'OUTPUT' | 'INPUT_PULLUP';
}

export class CodeHardwareCrossValidator {
  /**
   * Parses C++/Arduino firmware source code and verifies pin definitions against actual canvas netlist wires.
   */
  public static validateCrossReferences(
    code: string,
    graph: CircuitGraph
  ): ElectricalValidationError[] {
    const errors: ElectricalValidationError[] = [];
    const pinDeclarations: CodePinDeclaration[] = [];

    // Regex 1: Match `const int trigPin = 9;` or `int led = 13;`
    const constPinRegex = /(?:const\s+)?int\s+([a-zA-Z0-9_]+)\s*=\s*(\d+);/g;
    let match: RegExpExecArray | null;
    while ((match = constPinRegex.exec(code)) !== null) {
      const varName = match[1];
      const pinNum = parseInt(match[2], 10);
      pinDeclarations.push({
        variableName: varName,
        declaredPinNumber: pinNum,
        pinId: `D${pinNum}`,
      });
    }

    // Regex 2: Match `#define TRIG_PIN 9`
    const definePinRegex = /#define\s+([a-zA-Z0-9_]+)\s+(\d+)/g;
    while ((match = definePinRegex.exec(code)) !== null) {
      const varName = match[1];
      const pinNum = parseInt(match[2], 10);
      if (!pinDeclarations.some((p) => p.declaredPinNumber === pinNum)) {
        pinDeclarations.push({
          variableName: varName,
          declaredPinNumber: pinNum,
          pinId: `D${pinNum}`,
        });
      }
    }

    // Regex 3: Match `servo.attach(9);`
    const servoAttachRegex = /servo\s*\.\s*attach\s*\(\s*(\d+)\s*\)/gi;
    while ((match = servoAttachRegex.exec(code)) !== null) {
      const pinNum = parseInt(match[1], 10);
      pinDeclarations.push({
        variableName: 'Servo Control Pin',
        declaredPinNumber: pinNum,
        pinId: `D${pinNum}`,
        usageMode: 'OUTPUT',
      });
    }

    // Regex 4: Match `pinMode(13, OUTPUT)` or `pinMode(buttonPin, INPUT)`
    const pinModeRegex = /pinMode\s*\(\s*(\d+|[a-zA-Z0-9_]+)\s*,\s*(OUTPUT|INPUT|INPUT_PULLUP)\s*\)/g;
    while ((match = pinModeRegex.exec(code)) !== null) {
      const arg = match[1];
      const mode = match[2] as 'INPUT' | 'OUTPUT' | 'INPUT_PULLUP';
      const parsedNum = parseInt(arg, 10);
      if (!isNaN(parsedNum)) {
        const existing = pinDeclarations.find((p) => p.declaredPinNumber === parsedNum);
        if (existing) {
          existing.usageMode = mode;
        } else {
          pinDeclarations.push({
            variableName: `Pin ${parsedNum}`,
            declaredPinNumber: parsedNum,
            pinId: `D${parsedNum}`,
            usageMode: mode,
          });
        }
      }
    }

    const nets = graph.extractNetlists();
    const boards = graph.getAllComponents().filter((c) => c.typeId.startsWith('board-'));

    if (boards.length === 0) return errors;

    const board = boards[0];

    pinDeclarations.forEach((decl) => {
      // Find net attached to this board pin (e.g. D9 or D13)
      const pinNet = nets.find((net) =>
        net.connectedPinIds.some(
          (p) => p.componentId === board.id && (p.pinId === decl.pinId || p.pinId === `GPIO${decl.declaredPinNumber}`)
        )
      );

      if (!pinNet || pinNet.connectedPinIds.length <= 1) {
        errors.push({
          id: `CROSS_ERR_UNWIRED_PIN_${decl.pinId}`,
          code: 'CODE_PIN_UNCONNECTED',
          severity: 'ERROR',
          title: `Code Pin Unwired Mismatch (${decl.variableName} = Pin ${decl.declaredPinNumber})`,
          message: `Firmware code references Pin ${decl.declaredPinNumber} ('${decl.variableName}'), but no wire is connected to pin ${decl.pinId} on board '${board.label}'.`,
          affectedComponentIds: [board.id],
          affectedPinIds: [`${board.id}:${decl.pinId}`],
          affectedNetIds: [],
          recommendation: `Connect a virtual wire from board pin ${decl.pinId} to the target component on the workspace, or edit code to match connected pin.`,
        });
      }
    });

    return errors;
  }
}
