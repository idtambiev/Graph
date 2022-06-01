import { RelationsType } from "@enums/relations-types.enum";

export interface Graph{
    id: number;
    name: string;
    blocks: GraphBlock[];
    relationsCount: number;
}

export interface GraphBlock{
    id: number;
    value: string;
    relations: Relation[];
    isNewBlock?: boolean;
}

export interface Relation{
    id: number
    relatedBlockId: number;
    type: RelationsType;
    weight: number;
    oriented?: boolean;
    vectorId?: number;
    isNew: boolean;
}

export interface Vector{
  id: number;
  vectorItems: VectorItem[];
  minWeight?: boolean;
}

export interface VectorItem{
  id: number;
  type: RelationsType;
  weight: number;
  vectorTowards?: boolean;
}

