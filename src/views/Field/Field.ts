import styles from './Field.module.css';

export class Field {
  private target: HTMLElement | null;

  public constructor(
    private targetSelector: string,
    private onCellClick: (x: number, y: number) => void,
    private sizeX = 10,
    private sizeY = 10,
  ) {
    this.target = document.querySelector<HTMLDivElement>(this.targetSelector);
  }

  public render() {
    if (!this.target) {
      return;
    }

    // Clear previous content
    this.target.innerHTML = '';

    const wrapper = this.createWrapper();
    this.target.appendChild(wrapper);

    for (let x = 0; x < this.sizeX; x++) {
      for (let y = 0; y < this.sizeY; y++) {
        wrapper.appendChild(this.createCell(x, y));
      }
    }
  }

  private createWrapper(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add(styles.wrapper);
    wrapper.setAttribute('style', `--size-x: ${this.sizeX}; --size-y: ${this.sizeY}`);
    return wrapper;
  }

  private createCell(x: number, y: number): HTMLElement {
    const cell = document.createElement('button');
    cell.classList.add(styles.cell);
    cell.addEventListener('click', () => {
      this.onCellClick(x, y);
    });
    return cell;
  }
}
