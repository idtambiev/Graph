import { Component, OnInit } from '@angular/core';
import { GraphEdgeModel } from '@interfaces/models/graph-edge.model';
import { Graph } from '@interfaces/models/graph.interface';
import { GraphHelper } from '@services/graph/graph.helper';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.scss']
})
export class RelationsComponent implements OnInit {
  graph: Graph | null = null;
  edges: GraphEdgeModel[] = [];
  displayedColumns: string[] = ['id', 'value', 'startVertex', 'endVertex', 'type', 'weight', 'actions'];
  dataSource = this.edges;

  constructor(private graphService: GraphHelper) { }

  ngOnInit(): void {
    this.graphService.selectedGraph$
    .subscribe((res) => {
      this.graph = res;
      if (this.graph){
        this.graph.blocks.forEach((block) => {
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
                value: relation.value,
                type: relation.type
              })
          })
        });
      }
  })
  }

}
