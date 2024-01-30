import { CONTROL_PANEL_SELECTOR } from '../../constants/selectors';
import styles from './ControlPanel.module.css';

export class ControlPanel {
    private counter?: HTMLElement;

    public constructor() {
        const panelEl = document.querySelector(CONTROL_PANEL_SELECTOR);

        if (!panelEl) {
            return;
        }

        panelEl.innerHTML = '';

        const wrapperEl = document.createElement('div');
        wrapperEl.classList.add(styles.wrapper);
        wrapperEl.innerHTML = 'Counter:&nbsp;';
        panelEl.appendChild(wrapperEl);

        this.counter = document.createElement('span');
        this.counter.classList.add(styles.counter);
        this.counter.innerText = '0';
        wrapperEl.appendChild(this.counter);
    }

    public setCounter(count: number) {
        if (this.counter) {
            this.counter.innerText = `${count}`;
        }
    }
}
