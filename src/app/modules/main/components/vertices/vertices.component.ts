import { Component, OnInit } from '@angular/core';
import { Graph } from '@interfaces/models/graph.interface';
import { VerticesTableModel } from '@interfaces/table/vertices-table.model';
import { GraphService } from '@services/api/graph.service';
import { GraphHelper } from '@services/graph/graph.helper';

@Component({
  selector: 'app-vertices',
  templateUrl: './vertices.component.html',
  styleUrls: ['./vertices.component.scss']
})
export class VerticesComponent implements OnInit {
  verticesDataSource: any;
  graph: Graph | null = null;
  verticesDisplayedColumns: string[] = ['id', 'value', 'weight', 'eccentricity', 'actions'];
  blocks: VerticesTableModel[] = [];

  constructor(private graphHelper: GraphHelper,
    private graphService: GraphService) { }

  ngOnInit(): void {
    this.graphHelper.selectedGraphId$
    .subscribe((res) => {
      if (res){
        this.loadGraph(res);
      }
    })
  }

  loadGraph(id: number){
    this.graphService.getById(id)
    .subscribe((res) => {
      if (res){
        this.blocks = []
        this.graph = res;
        this.graph?.blocks.forEach((block, i)=>{
          this.blocks.push({
            id: block.id,
            value: block.value,
            weight: 0.1,
            eccentricity: 0.1 * i+1
          })
        })


        this.verticesDataSource = this.blocks;
      }
    })

  }

}
