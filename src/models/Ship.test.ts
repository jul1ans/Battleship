import { Ship } from './Ship';

describe('Ship', () => {
    it('should identify hit', () => {
        const ship = new Ship([{ x: 1, y: 1 }]);
        const hit = ship.checkHit({ x: 1, y: 1 });
        expect(hit).toBeTruthy();
    });

    it('should identify miss', () => {
        const ship = new Ship([{ x: 1, y: 1 }]);
        const hit = ship.checkHit({ x: 1, y: 0 });
        expect(hit).toBeFalsy();
    });

    it('should check healthy', () => {
        const ship = new Ship([{ x: 1, y: 1 }]);

        expect(ship.checkHealth()).toBeTruthy();
    });

    it('should check destroyed', () => {
        const ship = new Ship([{ x: 1, y: 1 }]);
        ship.checkHit({ x: 1, y: 1 });

        expect(ship.checkHealth()).toBeFalsy();
    });
});
