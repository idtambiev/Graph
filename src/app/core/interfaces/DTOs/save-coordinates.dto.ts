export interface CoordinatesDTO{
  list: CoordinatesItem[];
  graphId: number;
}

export interface CoordinatesItem{
  id?: number;
  xCoordinate: number;
  yCoordinate: number;
  blockId: number;
}
