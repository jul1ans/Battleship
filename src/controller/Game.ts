import { Ship } from '../models/Ship';
import { Coordinate } from '../types/Coordinate';
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

        this.ships.push(
            new Ship([
                { x: 0, y: 0 },
                { x: 0, y: 1 },
            ])
        );

        this.render();
    }

    private render() {
        this.fieldView.render(this.hits);
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
