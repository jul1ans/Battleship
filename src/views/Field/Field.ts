import { FIELD_SELECTOR } from '../../constants/selectors';
import { Coordinate } from '../../types/Coordinate';
import { checkCoordinateMatch } from '../../utils/checkCoordinateMatch';
import styles from './Field.module.css';

export class Field {
    private target: HTMLElement | null;

    public constructor(
        private onCellClick: (x: number, y: number) => void,
        private sizeX = 10,
        private sizeY = 10,
    ) {
        this.target = document.querySelector<HTMLDivElement>(FIELD_SELECTOR);
    }

    public render(
        hitCoordinates: Coordinate[],
        missCoordinates: Coordinate[],
        visibleShipCoordinates: Coordinate[] = [],
    ) {
        if (!this.target) {
            console.error(`Field not found with seletor ${FIELD_SELECTOR}`);
            return;
        }

        // Clear previous content
        this.target.innerHTML = '';

        const wrapper = this.createWrapper();
        this.target.appendChild(wrapper);

        for (let y = 0; y < this.sizeY; y++) {
            for (let x = 0; x < this.sizeX; x++) {
                wrapper.appendChild(
                    this.createCell(
                        x,
                        y,
                        checkCoordinateMatch(hitCoordinates, { x, y }),
                        checkCoordinateMatch(missCoordinates, { x, y }),
                        checkCoordinateMatch(visibleShipCoordinates, { x, y }),
                    ),
                );
            }
        }
    }

    private createWrapper(): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.classList.add(styles.wrapper);
        wrapper.setAttribute(
            'style',
            `--size-x: ${this.sizeX}; --size-y: ${this.sizeY}`,
        );
        return wrapper;
    }

    private createCell(
        x: number,
        y: number,
        hit: boolean,
        miss: boolean,
        show: boolean,
    ): HTMLElement {
        const cell = document.createElement('button');
        cell.classList.add(styles.cell);
        cell.classList.toggle(styles.hit, hit);
        cell.classList.toggle(styles.miss, miss);
        cell.classList.toggle(styles.show, show);

        cell.addEventListener('click', () => {
            this.onCellClick(x, y);
        });
        return cell;
    }
}
