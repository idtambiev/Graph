import { Injectable } from '@angular/core';
import { Graph } from '@interfaces/models/graph.interface';

@Injectable({
  providedIn: 'root'
})
export class BellmanFordAlgorythmService {
  dist: number[] = [];
  arr: number[][] = [];
  verticesCount: number = 0;
  constructor() { }

  algorythm(graph: Graph): void{
    this.verticesCount = graph.blocks.length;
    for(let i=0; i< this.verticesCount; i++){
      this.dist.push(i==0 ? 0: Infinity)
    }

    this.initializeArray();
    this.fillArray(graph);

  }

  initializeArray(): void{
    for (let i = 0; i < this.verticesCount; i++){
      this.arr[i] = [];
      for (let j = 0; j < this.verticesCount; j++){
        this.arr[i][j] = 0;
      }
    }
  }

  fillArray(graph: Graph): void{
    graph.blocks.forEach((block) => {
      let i = block.id;
      block.relations.forEach((relation) => {
        this.arr[i][relation.relatedBlockId] = relation.weight;
      })
    });

    console.table(this.arr)
  }
}
