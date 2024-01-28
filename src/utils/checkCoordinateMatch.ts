import { Coordinate } from '../types/Coordinate';

export function checkCoordinateMatch(
    searchList: Coordinate[],
    target: Coordinate
): boolean {
    return searchList.some(({ x, y }) => x === target.x && y === target.y);
}
