import { Coordinate } from '../types/Coordinate';
import { checkCoordinateMatch } from '../utils/checkCoordinateMatch';

export class Ship {
    private hits: Coordinate[] = [];

    public constructor(private coordinates: Coordinate[]) {}

    // Add hit to ship when coordinates match
    public checkHit(coordinate: Coordinate): boolean {
        const hasHit = checkCoordinateMatch(this.coordinates, coordinate);
        const hitPrevious = checkCoordinateMatch(this.hits, coordinate);

        if (hasHit && !hitPrevious) {
            // Prevent creating reference here by using shallow copy
            this.hits.push({ ...coordinate });
        }

        return hasHit;
    }

    /**
     * @returns check if the ship is still alive or already destroyed
     */
    public checkHealth(): boolean {
        // Ship is healthy when at least one coordinate was not hitted
        return this.hits.length < this.coordinates.length;
    }

    public getCoordinates(): Coordinate[] {
        return this.coordinates;
    }
}
