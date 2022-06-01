import { RelationsType } from "@core/enums/relations-types.enum";

export interface SaveGraphDTO{
  id: number;
  blocks: SaveBlockDTO[];
}

export interface SaveBlockDTO{
  id: number;
  value: string;
  isNewBlock: boolean;
  relations: SaveRelationDTO[];
}

export interface SaveRelationDTO{
  id: number;
  blockId: number;
  relatedBlockId: number;
  type: RelationsType;
  weight: number;
  isNew: boolean;
}
