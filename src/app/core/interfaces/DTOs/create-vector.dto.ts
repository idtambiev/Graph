import { RelationsType } from "@core/enums/relations-types.enum";

export interface CreateVectorDTO{
  graphId: number;
  items: VectorItemDTO[];
  value: string;
  minWeight?: boolean;
}

export interface VectorItemDTO{
  id: number;
  value: string;
  type: RelationsType;
  weight: number;
}
