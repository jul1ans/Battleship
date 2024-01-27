export type GameConfig = {
  sizeX: number;
  sizeY: number;
  field: FieldConfig;
}

type FieldConfig = {
  selector: string;
}
