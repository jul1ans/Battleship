import { Game } from './controller/Game';

try {
    new Game({
        sizeX: 10,
        sizeY: 10,
        field: {
            selector: '#field',
        },
        ships: [4, 4, 5],
    });
} catch (e) {
    console.error(e);
    const errorEl = document.querySelector('#error')!;
    errorEl.innerHTML = (e as Error).message;
    errorEl.setAttribute('aria-hidden', 'false');
}
