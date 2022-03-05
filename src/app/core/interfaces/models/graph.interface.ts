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

export enum RelationsType{
    oneTypeUndirected = 0,
    oneTypeOriented = 1,
    diverseUndirected = 2,
    diverseOriented = 3,
    multipleUndirectedVector = 4,
    multipleOrientedVector = 5
}