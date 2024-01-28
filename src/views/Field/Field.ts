import { Coordinate } from '../../types/Coordinate';
import { checkCoordinateMatch } from '../../utils/checkCoordinateMatch';
import styles from './Field.module.css';

export class Field {
    private target: HTMLElement | null;

    public constructor(
        private targetSelector: string,
        private onCellClick: (x: number, y: number) => void,
        private sizeX = 10,
        private sizeY = 10
    ) {
        this.target = document.querySelector<HTMLDivElement>(
            this.targetSelector
        );
    }

    public render(hitCoordinates: Coordinate[], showShips = false) {
        if (!this.target) {
            alert('Field not found!');
            console.error(
                `Field not found with seletor ${this.targetSelector}`
            );
            return;
        }

        // Clear previous content
        this.target.innerHTML = '';

        const wrapper = this.createWrapper();
        this.target.appendChild(wrapper);

        for (let x = 0; x < this.sizeX; x++) {
            for (let y = 0; y < this.sizeY; y++) {
                wrapper.appendChild(
                    this.createCell(
                        x,
                        y,
                        checkCoordinateMatch(hitCoordinates, { x, y }),
                        showShips
                    )
                );
            }
        }
    }

    private createWrapper(): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.classList.add(styles.wrapper);
        wrapper.setAttribute(
            'style',
            `--size-x: ${this.sizeX}; --size-y: ${this.sizeY}`
        );
        return wrapper;
    }

    private createCell(
        x: number,
        y: number,
        hit: boolean,
        show: boolean
    ): HTMLElement {
        const cell = document.createElement('button');
        cell.classList.add(styles.cell);
        cell.classList.toggle(styles.hit, hit);
        cell.classList.toggle(styles.show, show);

        cell.addEventListener('click', () => {
            this.onCellClick(x, y);
        });
        return cell;
    }
}
