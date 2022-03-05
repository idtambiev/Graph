import { RelationsType } from "@core/enums/relations-types.enum";

export interface Line{
    id: number;
    startBlockId: number;
    endBlockId: number;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    type: RelationsType
}
