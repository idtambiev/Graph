import { Component, OnInit } from '@angular/core';
import { GraphEdgeModel } from '@interfaces/models/graph-edge.model';
import { Graph } from '@interfaces/models/graph.interface';
import { FeaturesTableModel } from '@interfaces/table/features-table.model';
import { VerticesTableModel } from '@interfaces/table/vertices-table.model';
import { GraphService } from '@services/api/graph.service';
import { PythonService } from '@services/api/python.service';
import { GraphHelper } from '@services/graph/graph.helper';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  eccentricity = 0;
  radius = 0;
  diameter = 0;
  peripheralVertex = null;
  centralVertex = null;
  selected = '';

  graph: Graph | null = null;
  edges: GraphEdgeModel[] = [];

  features: FeaturesTableModel[] =[];

  blocks: VerticesTableModel[] = [];


  featuresDataSource: any;
  featuresDisplayedColumns: string[] = ['id', 'radius', 'diameter', 'centralVertex', 'peripheralVertex'];

  resultDataSource: any;
  resultDisplayedColumns: string[] = ['id', 'startVertex', 'endVertex', 'shortestPath'];

  constructor(private graphHelper: GraphHelper,
    private pythonService: PythonService,
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
          this.features = [];
          this.graph = res;
          this.features.push({
            radius: 0.3,
            diameter: 0.5,
            centralVertex: 1,
            peripheralVertex: 4
          })

          this.graph?.blocks.forEach((block)=>{
          this.blocks.push({
            id: block.id,
            value: block.value,
            weight: 0.1,
            eccentricity: 0.8
          })
        })
        console.log(this.blocks)
        }

        this.featuresDataSource = this.features;
      })
    }


    sendEdgesList(){
      this.edges=[]
      this.createEdgesList();
      console.log(this.edges)
      const formData = new FormData();
      formData.append('edges', JSON.stringify(this.edges));
      formData.append('count', this.graph!.blocks.length.toString())
      formData.append('start', this.selected);

      this.pythonService.sendEdgesList(formData)
      .subscribe((res)=>{
        console.log(res)
      }, err =>{
        console.log(err.error)
      })
    }



  createEdgesList(){
    this.graph!.blocks.forEach((block) => {
      block.relations.forEach((relation) => {
        this.edges.push(
          {
            startIdx: this.graph!.blocks.findIndex(x => x.id == block.id),
            edgeStart: block.id,
            endIdx: this.graph?.blocks.findIndex(x => x.id == relation.relatedBlockId),
            edgeEnd: relation.relatedBlockId,
            weight: relation.weight,
            value: relation.value
          })
      })
    });
  }
}
