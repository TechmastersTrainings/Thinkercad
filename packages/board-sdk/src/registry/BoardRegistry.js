import { ArduinoUnoBoard } from '../boards/arduino-uno';
import { ArduinoMegaBoard } from '../boards/arduino-mega';
import { ESP32DevKitBoard } from '../boards/esp32-devkit';
import { RaspberryPiPicoBoard } from '../boards/raspberry-pi-pico';
import { STM32NucleoBoard } from '../boards/stm32-nucleo';
export class BoardRegistry {
    static boards = new Map([
        [ArduinoUnoBoard.id, ArduinoUnoBoard],
        [ArduinoMegaBoard.id, ArduinoMegaBoard],
        [ESP32DevKitBoard.id, ESP32DevKitBoard],
        [RaspberryPiPicoBoard.id, RaspberryPiPicoBoard],
        [STM32NucleoBoard.id, STM32NucleoBoard],
    ]);
    static registerBoard(board) {
        this.boards.set(board.id, board);
    }
    static getBoard(id) {
        return this.boards.get(id);
    }
    static getAllBoards() {
        return Array.from(this.boards.values());
    }
}
//# sourceMappingURL=BoardRegistry.js.map