import { Injectable } from '@angular/core';
import { GraphEdgeModel } from '@interfaces/models/graph-edge.model';
import { Graph } from '@interfaces/models/graph.interface';

@Injectable({
  providedIn: 'root'
})
export class BellmanFordAlgorythmService {
  dist: number[] = [];
  arr: number[][] = [];
  verticesCount: number = 0;

  graph: Graph | null = null;
  edges: GraphEdgeModel[] = [];

  constructor() { }

  algorythm(graph: Graph): void{
    this.verticesCount = graph.blocks.length;

    const start = 1;

    for(let i=0; i< this.verticesCount; i++){
      this.dist.push(i==0 ? 0 : Infinity)
    }

    this.createEdgesList(graph);
    for (let i = 1; i <= this.verticesCount - 1; i++){
      for (let j = 0; j < this.edges.length; j ++){
        let u = this.edges[j].edgeStart;
        let v = this.edges[j].edgeEnd;
        let weight = this.edges[j].weight;

        if (this.dist[u] != Infinity
          && this.dist[u] + weight < this.dist[v]){

          this.dist[v] = this.dist[u] + weight;
        }
      }
    }
    console.log(this.dist)
  }

  createEdgesList(graph: Graph){
    graph.blocks.forEach((block) => {
      block.relations.forEach((relation, index) => {
        this.edges.push(
          {
            startIdx: index,
                  edgeStart: block.id,
                  startValue: block.value,
                  endIdx: this.graph?.blocks.findIndex(x => x.id == relation.relatedBlockId),
                  edgeEnd: relation.relatedBlockId,
                  endValue: this.graph?.blocks.find(x => x.id == relation.relatedBlockId)?.value,
                  weight: relation.weight,
                  value: relation.value
          })
      })
    });
  }

}
