/**
 * Print error message inside error object
 * @param error error object
 */
export function printError(error: unknown) {
    console.error(error);
    const errorEl = document.querySelector('#error')!;
    errorEl.innerHTML = (error as Error).message;
    errorEl.setAttribute('aria-hidden', 'false');
}
