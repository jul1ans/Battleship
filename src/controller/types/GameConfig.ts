export type GameConfig = {
    sizeX: number;
    sizeY: number;
    field: FieldConfig;
    ships: number[]; // see getShips.ts for details
};

type FieldConfig = {
    selector: string;
};
