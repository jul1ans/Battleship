import { Ship } from '../models/Ship';
import { Coordinate } from '../types/Coordinate';
import { printError } from '../utils/printError';
import { generateRandomSeed } from '../utils/generateRandomSeed';
import { getShips } from '../utils/getShips';
import { Field } from '../views/Field/Field';
import { GameConfig } from './types/GameConfig';
import { SuccessMessage } from '../views/SuccessMessage/SuccessMessage';
import { ControlPanel } from '../views/ControlPanel/ControlPanel';

export class Game {
    private fieldView?: Field;
    private controlPanel?: ControlPanel;
    private ships: Ship[] = [];
    private hits: Coordinate[] = [];
    private misses: Coordinate[] = [];
    private gameConfig: GameConfig;

    public constructor(gameConfig: GameConfig) {
        this.gameConfig = gameConfig;
        this.init();
    }

    private init() {
        const { sizeX, sizeY, ships } = this.gameConfig;

        this.ships = [];
        this.hits = [];
        this.misses = [];
        this.fieldView = new Field(this.onSelectCell.bind(this), sizeX, sizeY);
        this.controlPanel = new ControlPanel();

        const randomSeed = generateRandomSeed(10);

        try {
            this.ships.push(...getShips(sizeX, sizeY, ships, randomSeed));
        } catch (e) {
            printError(e);
        }

        this.render();
    }

    private render() {
        this.fieldView?.render(
            this.hits,
            this.misses,
            this.gameConfig.debug
                ? this.ships.map((ship) => ship.getCoordinates()).flat()
                : [],
        );

        this.controlPanel?.setCounter(this.getTotalAmountShots());
    }

    private onSelectCell(x: number, y: number) {
        console.log(`clicked ${x}/${y}`);
        this.shootShips(x, y);
        this.render();
        this.checkGameEnd();
    }

    private shootShips(x: number, y: number) {
        const coordinate = { x, y };
        const hasHit = this.ships.some((ship) => ship.checkHit(coordinate));

        if (hasHit) {
            this.hits.push(coordinate);
        } else {
            this.misses.push(coordinate);
        }
    }

    private getTotalAmountShots(): number {
        return this.hits.length + this.misses.length;
    }

    private checkGameEnd() {
        // Game hasn't ended if at least one ship is healthy
        if (this.ships.some((ship) => ship.checkHealth())) {
            return;
        }

        const successMessage = new SuccessMessage(() => {
            this.init();
            successMessage.hideSuccess();
        });

        successMessage.showSuccess();
    }
}
