import { RelationsType } from "@enums/relations-types.enum";

export interface Graph{
    blocks: GraphBlock[];
    relationsCount: number;
}

export interface GraphBlock{
    id: number;
    value: string;
    relations: Relation[];
}

export interface Relation{
    relatedBlockId: number;
    type: RelationsType;
    weight: number;
}

