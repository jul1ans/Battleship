import { ERROR_SELECTOR } from '../constants/selectors';

/**
 * Print error message inside error object
 * @param error error object
 */
export function printError(error: unknown) {
  console.error(error);
  const errorEl: HTMLDivElement = document.querySelector(ERROR_SELECTOR)!;
  errorEl.innerText = (error as Error).message;
  errorEl.setAttribute('aria-hidden', 'false');
}
