import { generateRandomSeed } from './generateRandomSeed';

describe('generateRandomSeed', () => {
  it('should generate a string with length x', () => {
    expect(generateRandomSeed(10)).toHaveLength(10);
    expect(generateRandomSeed(4)).toHaveLength(4);
  });
});
