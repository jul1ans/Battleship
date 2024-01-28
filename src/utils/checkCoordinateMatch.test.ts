import { checkCoordinateMatch } from './checkCoordinateMatch';

describe('checkCoordinateMatch', () => {
    it('should match', () => {
        expect(
            checkCoordinateMatch([{ x: 1, y: 1 }], { x: 1, y: 1 })
        ).toBeTruthy();
    });

    it('should not match', () => {
        expect(
            checkCoordinateMatch([{ x: 1, y: 1 }], { x: 1, y: 2 })
        ).toBeFalsy();
    });
});
