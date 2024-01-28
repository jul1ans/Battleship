import { Ship } from '../models/Ship';
import { Coordinate } from '../types/Coordinate';
import { getShips } from '../utils/getShips';
import { Field } from '../views/Field/Field';
import { GameConfig } from './types/GameConfig';

export class Game {
    private fieldView: Field;
    private ships: Ship[];
    private hits: Coordinate[];

    public constructor({
        field: { selector: fieldSelector },
        sizeX,
        sizeY,
    }: GameConfig) {
        this.ships = [];
        this.hits = [];
        this.fieldView = new Field(
            fieldSelector,
            this.onSelectCell.bind(this),
            sizeX,
            sizeY
        );

        this.ships.push(...getShips(sizeX, sizeY, [4, 4, 5], 'test'));

        this.render();
    }

    private render() {
        this.fieldView.render(
            this.hits,
            this.ships.map((ship) => ship.getCoordinates()).flat()
        );
    }

    private onSelectCell(x: number, y: number) {
        console.log(`clicked ${x}/${y}`);
        this.shootShips(x, y);
        this.render();
    }

    private shootShips(x: number, y: number) {
        const hasHit = this.ships.some((ship) => ship.checkHit({ x, y }));

        if (hasHit) {
            this.hits.push({ x, y });
        }
    }
}
