import { Game } from './controller/Game';

new Game({
    sizeX: 10,
    sizeY: 10,
    field: {
        selector: '#field',
    },
});
