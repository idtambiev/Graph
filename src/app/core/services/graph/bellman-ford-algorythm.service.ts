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

  // algorythm2(graph: Graph): void{
  //   this.verticesCount = graph.blocks.length;
  //   const start = 1;
  //   for(let i=0; i< this.verticesCount; i++){
  //     this.dist.push(i==start-1 ? 0 : Infinity)
  //   }

  //   this.initializeArray();
  //   this.fillArray(graph);

  //   let labels = [];

  //   for(let k =1; k <= this.verticesCount-1; k++){
  //     for(let i =0; i< this.verticesCount; i++){
  //       for(let j =0; j< this.verticesCount; j++){
  //           labels.push(this.dist[j] + this.arr[j][i]);
  //           console.log(labels)
  //       }
  //       this.dist[i] = this.getMinFromArray(labels);
  //       labels.splice(0, labels.length)
  //     }
  //   }

  //   console.log(this.dist)
  // }

  // initializeArray(): void{
  //   for (let i = 0; i < this.verticesCount; i++){
  //     this.arr[i] = [];
  //     for (let j = 0; j < this.verticesCount; j++){
  //       this.arr[i][j] = 0;
  //     }
  //   }
  // }

  // fillArray(graph: Graph): void{
  //   graph.blocks.forEach((block) => {
  //     let i = block.id;
  //     block.relations.forEach((relation) => {
  //       this.arr[i][relation.relatedBlockId] = relation.weight;
  //     })
  //   });

  //   console.table(this.arr)
  // }

  // getMinFromArray(labels: number[]): number{
  //   let min = Infinity;
  //   labels.forEach((label) => {
  //     if (label < min){
  //       min = label;
  //     }
  //   })

  //   return min;
  // }



  algorythm(graph: Graph): void{
    this.verticesCount = graph.blocks.length;

    const start = 1;

    for(let i=0; i< this.verticesCount; i++){
      this.dist.push(i==0? 0 : Infinity)
    }

    this.createEdgesList(graph);
    for (let i = 0; i < this.verticesCount -1; i++){
      this.edges.forEach((edge, i) => {
        let u = edge.edgeStart;
        let v = edge.edgeEnd;

        if (this.dist[u] != Infinity
          && this.dist[u] + edge.weight < this.dist[v]){

          this.dist[v] = this.dist[u] + edge.weight;
        }
      });
    }
    console.log(this.dist)
  }

  createEdgesList(graph: Graph){
    graph.blocks.forEach((block) => {
      block.relations.forEach((relation) => {
        this.edges.push(
          {
            edgeStart: block.id,
            edgeEnd: relation.relatedBlockId,
            weight: relation.weight
          })
      })
    });
  }

}
