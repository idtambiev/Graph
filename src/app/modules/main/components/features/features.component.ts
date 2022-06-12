import { Component, OnInit } from '@angular/core';
import { GraphEdgeModel } from '@interfaces/models/graph-edge.model';
import { Graph } from '@interfaces/models/graph.interface';
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

  constructor(private graphHelper: GraphHelper,
    private pythonService: PythonService,) { }

  ngOnInit(): void {
    this.graphHelper.selectedGraph$.subscribe((res) => {
      this.graph = res;
      console.log(res)
    })
  }


  sendEdgesList(){
    this.edges=[]
    this.createEdgesList();
    console.log(this.edges)
    const formData = new FormData();
    formData.append('edges', JSON.stringify(this.edges));
    formData.append('count', this.graph!.blocks.length.toString())
    formData.append('start', '0')
    this.pythonService.sendEdgesList(formData)
    .subscribe((res) => {
      console.log(res)
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
