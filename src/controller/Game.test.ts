import { Game } from './Game';

const mockRender = jest.fn();

let onSelectCell: (x: number, y: number) => void;

jest.mock('../views/Field/Field', () => ({
    Field: jest.fn().mockImplementation((fn) => {
        onSelectCell = fn;

        return {
            render: mockRender,
        };
    }),
}));

const mockSetCounter = jest.fn();

jest.mock('../views/ControlPanel/ControlPanel', () => ({
    ControlPanel: jest.fn().mockImplementation(() => ({
        setCounter: mockSetCounter,
    })),
}));

const mockShowSuccess = jest.fn();
const mockHideSuccess = jest.fn();

jest.mock('../views/SuccessMessage/SuccessMessage', () => ({
    SuccessMessage: jest.fn().mockImplementation(() => ({
        showSuccess: mockShowSuccess,
        hideSuccess: mockHideSuccess,
    })),
}));

const mockGetCoordinates = jest.fn().mockReturnValue([{ x: 1, y: 1 }]);
const mockCheckHit = jest.fn().mockReturnValue(false);
const mockCheckHealth = jest.fn().mockReturnValue(true);

const mockShip = jest.fn().mockImplementation(() => ({
    getCoordinates: mockGetCoordinates,
    checkHit: mockCheckHit,
    checkHealth: mockCheckHealth,
}));

const mockGetShips = jest.fn().mockReturnValue([mockShip()]);

jest.mock('../utils/getShips', () => ({
    // eslint-disable-next-line
    getShips: (...args: any) => mockGetShips(...args),
}));

describe('Game', () => {
    beforeAll(() => {
        new Game({
            sizeX: 5,
            sizeY: 6,
            ships: [1, 2, 3],
        });
    });

    it('should call get ships with parameter', () => {
        expect(mockGetShips).toHaveBeenLastCalledWith(
            5,
            6,
            expect.arrayContaining([1, 2, 3]),
            expect.stringContaining(''),
        );
    });

    it('should init the field', () => {
        expect(mockRender).toHaveBeenLastCalledWith([], [], []);
    });

    it('should miss the ship and re-render', () => {
        onSelectCell(1, 2);
        expect(mockRender).toHaveBeenLastCalledWith([], [{ x: 1, y: 2 }], []);
        expect(mockShowSuccess).not.toHaveBeenCalled();
    });

    it('should hit the ship and show success', () => {
        mockCheckHit.mockReturnValueOnce(true);
        mockCheckHealth.mockReturnValueOnce(false);
        onSelectCell(1, 1);
        expect(mockRender).toHaveBeenLastCalledWith(
            [{ x: 1, y: 1 }],
            [{ x: 1, y: 2 }],
            [],
        );
        expect(mockShowSuccess).toHaveBeenCalled();
    });

    it('should call the counter with the total shots value', () => {
        expect(mockSetCounter).toHaveBeenLastCalledWith(2);
    });
});
