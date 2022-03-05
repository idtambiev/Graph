import { RelationsType } from "@enums/relations-types.enum";

export interface RenderedRelation{
    startBlockId: number;
    endBlockId: number;
    type: RelationsType;
}
