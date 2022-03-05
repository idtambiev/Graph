import { RelationsType } from "@enums/relations-types.enum";

export interface Relation{
    startBlockId: number;
    endBlockId: number;
    type: RelationsType;
}
