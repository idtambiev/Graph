export interface JsonModel{
    blocks: BlockModel[];
}

export interface BlockModel{
    blockId: number;
    value: string;
    isFirstBlock: boolean;
    isLastBlock: boolean;
    relations: RelationModel[];
}

export interface RelationModel{
    relationedBlockId: number;
    weight: number;
}