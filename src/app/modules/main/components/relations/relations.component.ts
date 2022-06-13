import { Component, OnInit } from '@angular/core';
import { GraphEdgeModel } from '@interfaces/models/graph-edge.model';
import { Graph } from '@interfaces/models/graph.interface';
import { GraphService } from '@services/api/graph.service';
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
  dataSource: any;

  constructor(private graphHelper: GraphHelper, private graphService: GraphService) { }

  ngOnInit(): void {
    this.graphHelper.selectedGraphId$
    .subscribe((res) => {
      //this.graph = res;
      console.log(res)
      if (res){
        this.edges = [];
        this.loadGraph(res);
      }
    })

  }

  loadGraph(id: number){
    this.graphService.getById(id)
    .subscribe((res) => {
      if (res){
        this.graph = res;
        this.graph?.blocks.forEach((block) => {
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

        this.dataSource = this.edges;
      }
    })

  }

}
