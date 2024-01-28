import { getShips } from './getShips';

describe('getShips', () => {
    it('should generate a ship', () => {
        const ships = getShips(2, 2, [1]);
        expect(ships.length).toBe(1);
    });

    it('should throw an error because grid is too small', () => {
        expect(() => getShips(1, 1, [1])).toThrow(Error);
    });
});
