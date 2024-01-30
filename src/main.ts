import { Game } from './controller/Game';
import { printError } from './utils/printError';

try {
    new Game({
        sizeX: 10,
        sizeY: 10,
        ships: [4, 4, 5],
        debug: false,
    });
} catch (e) {
    printError(e);
}
