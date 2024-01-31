import { checkCoordinateMatch } from './checkCoordinateMatch';
import { getShips } from './getShips';

const mockSeedrandom = jest.fn().mockReturnValue(0);
jest.mock('seedrandom', () => () => mockSeedrandom);

describe('getShips', () => {
    beforeEach(() => {
        let counter = 0;
        mockSeedrandom.mockImplementation(() => {
            counter += 0.1;
            return counter;
        });
    });

    it('should generate a ship', () => {
        const ships = getShips(2, 2, [1]);
        expect(ships.length).toBe(1);
    });

    it('should generate two ships with different coordinates', () => {
        const ships = getShips(4, 4, [3, 1]);
        expect(ships.length).toBe(2);
        expect(
            checkCoordinateMatch(
                ships[0].getCoordinates(),
                ships[1].getCoordinates()[0],
            ),
        ).toBeFalsy();
    });

    it('should generate two ships with at least one empty cell between', () => {
        const ships = getShips(4, 4, [3, 2]);
        expect(ships.length).toBe(2);

        const ship1Coordinates = ships[0].getCoordinates();
        const ship2Coordinates = ships[1].getCoordinates();

        console.log(ship1Coordinates, ship2Coordinates);

        expect(
            ship1Coordinates.every((coordinate1) => {
                return ship2Coordinates.every((coordinate2) => {
                    const distanceX = Math.abs(coordinate1.x - coordinate2.x);
                    const distanceY = Math.abs(coordinate1.y - coordinate2.y);
                    return (
                        distanceX > 1 ||
                        distanceY > 1 ||
                        (distanceX === 1 && distanceY === 1)
                    );
                });
            }),
        ).toBeTruthy();
    });

    it('should throw an error because grid is generally too small', () => {
        expect(() => getShips(1, 1, [1])).toThrow(Error);
    });

    it('should throw an error because grid is too small regarding the largest element', () => {
        expect(() => getShips(10, 2, [3])).toThrow(Error);
    });

    it('should throw an error because too many position checks on occupied positions', () => {
        mockSeedrandom.mockReturnValue(0);
        expect(() => getShips(10, 10, [1, 1])).toThrow(Error);
    });
});
