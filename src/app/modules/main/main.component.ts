import { Component, OnInit, ViewChild } from '@angular/core';
import { Graph } from '@interfaces/models/graph.interface';
import { GraphService, ShowTypes } from '@services/graph/graph.service';
import { GraphComponent } from './components/graph/graph.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild(GraphComponent) graphComponent!: GraphComponent;
  showType: ShowTypes = ShowTypes.Graphs;

  graph: Graph = {
    blocks: [
      {
        id: 1,
        value: 'A',
        relations: [{
          relatedBlockId: 2,
          type: 1,
          weight: 0.1,
          oriented: true
        },
        {
          relatedBlockId: 4,
          type: 1,
          weight:  0.2,
          oriented: true
        }]
      },
      {
        id: 2,
        value: 'B',
        relations: [{
          relatedBlockId: 3,
          type: 1,
          weight:  0.3,
          oriented: true
        }]
      },
      {
        id: 3,
        value: 'C',
        relations: [{
          relatedBlockId: 4,
          type: 1,
          weight:  0.4,
          oriented: true
        }]
      },
      {
        id: 4,
        value: 'D',
        relations:[]
      }
    ],
    relationsCount: 4
  }

  constructor(private graphService: GraphService) { }

  ngOnInit(): void {
    this.graphService.showSelected$.subscribe((res)=>{
      this.showType = res;
    })

    this.graphService.selectedGraph$.subscribe((res)=>{
      console.log(res)
    })
  }

  addNewBlock(): void{
    this.graphComponent.addNewBlock();
  }

}
