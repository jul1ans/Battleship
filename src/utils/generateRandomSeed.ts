export function generateRandomSeed(length: number): string {
  let seed = '';

  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * 55) + 65;

    // Skip I and O because they are ofthen mistaken with zero and the pipe symbol
    if (String.fromCharCode(randomNum) === 'I') {
      seed += 8;
    } else if (String.fromCharCode(randomNum) === 'O') {
      seed += 9;
    } else if (randomNum >= 91 && randomNum <= 96) {
      seed += `${randomNum - 89}`;
    } else {
      seed += String.fromCharCode(randomNum);
    }
  }

  return seed;
}
