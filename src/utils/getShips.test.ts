import { checkCoordinateMatch } from './checkCoordinateMatch';
import { getShips } from './getShips';

describe('getShips', () => {
    it('should generate a ship', () => {
        const ships = getShips(2, 2, [1]);
        expect(ships.length).toBe(1);
    });

    it('should generate two ships with different coordinates', () => {
        const ships = getShips(4, 4, [3, 1], 'mySeed');
        expect(ships.length).toBe(2);
        expect(
            checkCoordinateMatch(
                ships[0].getCoordinates(),
                ships[1].getCoordinates()[0],
            ),
        ).toBeFalsy();
    });

    it('should generate two ships with at least one empty cell between', () => {
        const ships = getShips(4, 4, [3, 1], 'mySeed');
        expect(ships.length).toBe(2);

        const ship2Coordinate = ships[1].getCoordinates()[0];

        expect(
            ships[0].getCoordinates().every((coordinate) => {
                const distanceX = Math.abs(ship2Coordinate.x - coordinate.x);
                const distanceY = Math.abs(ship2Coordinate.y - coordinate.y);
                return distanceX > 1 || distanceY > 1;
            }),
        ).toBeTruthy();
    });

    it('should throw an error because grid is generally too small', () => {
        expect(() => getShips(1, 1, [1])).toThrow(Error);
    });

    it('should throw an error because grid is too small regarding the largest element', () => {
        expect(() => getShips(10, 2, [3])).toThrow(Error);
    });
});
