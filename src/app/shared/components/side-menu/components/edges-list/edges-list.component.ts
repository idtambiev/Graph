import { Component, Input, OnInit } from '@angular/core';
import { GraphEdgeModel } from '@interfaces/models/graph-edge.model';
import { Graph } from '@interfaces/models/graph.interface';
import { GraphHelper } from '@services/graph/graph.helper';

@Component({
  selector: 'app-edges-list',
  templateUrl: './edges-list.component.html',
  styleUrls: ['./edges-list.component.scss']
})
export class EdgesListComponent implements OnInit {
  graph: Graph | null = null;
  edges: GraphEdgeModel[] = [];

  constructor(private graphService: GraphHelper) { }

  ngOnInit(): void {
    this.graphService.selectedGraph$.subscribe((res) => {
        this.graph = res;
        if (this.graph){
          this.graph.blocks.forEach((block) => {
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
    })
  }

}
