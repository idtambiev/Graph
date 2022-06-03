export interface GraphEdgeModel{
  startIdx: number;
  edgeStart: number;
  endIdx?: number;
  startValue?: string;
  edgeEnd: number;
  endValue?: string;
  weight: number;
  type?: number;
}
