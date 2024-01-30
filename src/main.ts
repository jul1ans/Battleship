import { Game } from './controller/Game';
import { printError } from './utils/printError';

try {
    new Game({
        sizeX: 10,
        sizeY: 10,
        // ships: [4, 4, 5],
        ships: [2],
        debug: true,
    });
} catch (e) {
    printError(e);
}
