import seedrandom from 'seedrandom';
import { Ship } from '../models/Ship';
import { Coordinate } from '../types/Coordinate';

/**
 * Return an array with randomly placed ships
 * @param maxX maximum x coordinate
 * @param maxY maximum y coodrinate
 * @param types ship types which should be generated (number is the indicator for the size)
 * @param seed random string
 * @returns
 */
export function getShips(
    maxX: number,
    maxY: number,
    types: number[],
    seed = 'mySeed'
): Ship[] {
    const ships: Ship[] = [];
    const randomGen = seedrandom(seed);

    if (!checkTypesLengthForGridSize(maxX, maxY, types)) {
        throw new Error(
            `The grid size ${maxX}/${maxY} doesn't match with the types length and sizes. Please reduce the types or increase the grid size!`
        );
    }

    types.forEach((size) => {
        ships.push(createShip(maxX, maxY, size, ships, randomGen));
    });

    return ships;
}

/**
 * This function checks if the amount and size of the given types will match with the max grid-size.
 * @param maxX
 * @param maxY
 * @param types
 * @returns Check if the current setup is fine
 */
function checkTypesLengthForGridSize(
    maxX: number,
    maxY: number,
    types: number[]
): boolean {
    // Duplicate the amount of space each ship needs because so you allow extra space between the ships
    const spaceCounter = types.reduce((prev, curr) => prev + curr, 0) * 2;
    return maxX * maxY > spaceCounter;
}

function createShip(
    maxX: number,
    maxY: number,
    size: number,
    previousShips: Ship[],
    randomGen: seedrandom.PRNG
): Ship {
    const horizontal = Math.round(randomGen() * 1) === 0;

    // Reduce the max values by the size to allow the extra space for the coordinates
    const x = Math.floor(randomGen() * (maxX - (horizontal ? size : 0)));
    const y = Math.floor(randomGen() * (maxY - (horizontal ? 0 : size)));

    const coordinates: Coordinate[] = [{ x, y }];

    // Start by 1 because the first coordinate was already created
    for (let i = 1; i < size; i++) {
        if (horizontal) {
            coordinates.push({ x: x + i, y });
        } else {
            coordinates.push({ x, y: y + i });
        }
    }

    console.log(coordinates);

    return new Ship(coordinates);
}
