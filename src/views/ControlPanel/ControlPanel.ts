import { CONTROL_PANEL_SELECTOR } from '../../constants/selectors';
import styles from './ControlPanel.module.scss';

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
        wrapperEl.innerText = 'Counter: ';
        panelEl.appendChild(wrapperEl);

        this.counter = document.createElement('span');
        this.counter.innerText = '0';
        panelEl.appendChild(this.counter);
    }

    public setCounter(count: number) {
        if (this.counter) {
            this.counter.innerText = `${count}`;
        }
    }
}
