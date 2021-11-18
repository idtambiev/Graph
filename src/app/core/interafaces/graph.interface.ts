export interface Graph{
    blocks: GraphBlock[];
    relationsCount: number;
}

export interface GraphBlock{
    id: number;
    // value: string;
    relations: number[];
}
