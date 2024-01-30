import { FIELD_SELECTOR, SUCCESS_SELECTOR } from '../../constants/selectors';
import styles from './SuccessMessage.module.scss';

export class SuccessMessage {
    private target: HTMLDivElement | null;
    private field: HTMLDivElement | null;
    private button: HTMLButtonElement;

    public constructor(onButtonClick: () => void, counter: number) {
        this.target = document.querySelector(SUCCESS_SELECTOR);
        this.field = document.querySelector(FIELD_SELECTOR);
        this.button = document.createElement('button');

        if (!this.target) {
            return;
        }

        this.target.innerHTML = `<p>Congratulations, you have hit all ships with a total amount of ${counter} shots!</p>`;
        this.button.setAttribute('type', 'button');
        this.button.classList.add(styles.button);
        this.button.innerText = 'retry';
        this.target.appendChild(this.button);

        this.button.addEventListener('click', onButtonClick, {
            once: true,
        });
    }

    public showSuccess() {
        this.field?.setAttribute('aria-hidden', 'true');
        this.target?.setAttribute('aria-hidden', 'false');
    }

    public hideSuccess() {
        this.field?.setAttribute('aria-hidden', 'false');
        this.target?.setAttribute('aria-hidden', 'true');
    }
}
