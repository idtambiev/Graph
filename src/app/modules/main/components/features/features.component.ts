import { Component, OnInit } from '@angular/core';
import { GraphEdgeModel } from '@interfaces/models/graph-edge.model';
import { Graph } from '@interfaces/models/graph.interface';
import { FeaturesTableModel } from '@interfaces/table/features-table.model';
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

  graph: Graph | null = null;
  edges: GraphEdgeModel[] = [];

  features: FeaturesTableModel[] =[];

  featuresDataSource: any;
  featuresDisplayedColumns: string[] = ['id', 'radius', 'diameter', 'centralVertex', 'peripheralVertex'];

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
        }

        this.featuresDataSource = this.features;
      })
    }


    sendEdgesList(){
      this.edges=[]
      this.createEdgesList();
      console.log(this.edges)
      const formData = new FormData();
      console.log(this.edges)
      formData.append('edges', JSON.stringify(this.edges));
      formData.append('count', this.graph!.blocks.length.toString())
      formData.append('start', '0')
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
