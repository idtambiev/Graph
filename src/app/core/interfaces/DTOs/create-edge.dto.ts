export interface CreateEdgeDTO{
  blockId: number;
  relatedId: number;
  weight: number;
  type: string;
  value: string;
  vectorId?: number;
  oriented: boolean;
}
