import { BoardDefinition } from '@circuit/shared';
import { ArduinoUnoBoard } from '../boards/arduino-uno';
import { ArduinoMegaBoard } from '../boards/arduino-mega';
import { ESP32DevKitBoard } from '../boards/esp32-devkit';
import { RaspberryPiPicoBoard } from '../boards/raspberry-pi-pico';
import { STM32NucleoBoard } from '../boards/stm32-nucleo';
import { MicrobitBoard, MicrobitBreakoutBoard, ATtiny85Board } from '../boards/microbit';

export class BoardRegistry {
  private static boards: Map<string, BoardDefinition> = new Map([
    [ArduinoUnoBoard.id, ArduinoUnoBoard],
    [ArduinoMegaBoard.id, ArduinoMegaBoard],
    [MicrobitBoard.id, MicrobitBoard],
    [MicrobitBreakoutBoard.id, MicrobitBreakoutBoard],
    [ATtiny85Board.id, ATtiny85Board],
    [ESP32DevKitBoard.id, ESP32DevKitBoard],
    [RaspberryPiPicoBoard.id, RaspberryPiPicoBoard],
    [STM32NucleoBoard.id, STM32NucleoBoard],
  ]);

  public static registerBoard(board: BoardDefinition): void {
    this.boards.set(board.id, board);
  }

  public static getBoard(id: string): BoardDefinition | undefined {
    return this.boards.get(id);
  }

  public static getAllBoards(): BoardDefinition[] {
    return Array.from(this.boards.values());
  }
}
