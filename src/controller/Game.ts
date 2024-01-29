import { Ship } from '../models/Ship';
import { Coordinate } from '../types/Coordinate';
import { printError } from '../utils/printError';
import { generateRandomSeed } from '../utils/generateRandomSeed';
import { getShips } from '../utils/getShips';
import { Field } from '../views/Field/Field';
import { GameConfig } from './types/GameConfig';

export class Game {
    private fieldView: Field;
    private ships: Ship[];
    private hits: Coordinate[];
    private debug: boolean;

    public constructor({ sizeX, sizeY, ships, debug }: GameConfig) {
        this.ships = [];
        this.hits = [];
        this.fieldView = new Field(
            '#field',
            this.onSelectCell.bind(this),
            sizeX,
            sizeY,
        );
        this.debug = debug;

        const randomSeed = generateRandomSeed(10);

        try {
            this.ships.push(...getShips(sizeX, sizeY, ships, randomSeed));
        } catch (e) {
            printError(e);
        }

        this.render();
    }

    private render() {
        this.fieldView.render(
            this.hits,
            this.debug
                ? this.ships.map((ship) => ship.getCoordinates()).flat()
                : [],
        );
    }

    private onSelectCell(x: number, y: number) {
        console.log(`clicked ${x}/${y}`);
        this.shootShips(x, y);
        this.render();
        this.checkGameEnd();
    }

    private shootShips(x: number, y: number) {
        const hasHit = this.ships.some((ship) => ship.checkHit({ x, y }));

        if (hasHit) {
            this.hits.push({ x, y });
        }
    }

    private checkGameEnd() {
        // Game hasn't ended if at least one ship is healthy
        if (this.ships.some((ship) => ship.checkHealth())) {
            return;
        }

        document.querySelector('#field')!.setAttribute('aria-hidden', 'true');
        document
            .querySelector('#successMessage')!
            .setAttribute('aria-hidden', 'false');
    }
}
