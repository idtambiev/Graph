import { Component, OnInit } from '@angular/core';
import { GraphEdgeModel } from '@interfaces/models/graph-edge.model';
import { Graph } from '@interfaces/models/graph.interface';
import { PythonService } from '@services/api/python.service';
import { BellmanFordAlgorythmService } from '@services/graph/bellman-ford-algorythm.service';
import { GraphHelper } from '@services/graph/graph.helper';

@Component({
  selector: 'app-algorythm',
  templateUrl: './algorythm.component.html',
  styleUrls: ['./algorythm.component.scss']
})
export class AlgorythmComponent implements OnInit {
  //graph: Graph | null = null;
  edges: GraphEdgeModel[] = [];

  graph: Graph = {
    id: 0,
    name: '',
    blocks: [
      {
        id: 0,
        value: 'A',
        relations: [{
          id: 0,
          relatedBlockId: 1,
          type: 1,
          weight: 0.1,
          oriented: true,
          isNew: false,
        },
        {
          id: 1,
          relatedBlockId: 3,
          type: 1,
          weight:  0.7,
          oriented: true,
          isNew: false,
        },{
          id: 2,
          relatedBlockId: 2,
          type: 1,
          weight:  0.4,
          oriented: true,
          isNew: false,
        }]
      },
      {
        id: 1,
        value: 'B',
        relations: [{
          id: 3,
          relatedBlockId: 2,
          type: 1,
          weight:  0.1,
          oriented: true,
          isNew: false,
        },{
          id: 4,
          relatedBlockId: 3,
          type: 1,
          weight:  0.5,
          oriented: true,
          isNew: false,
        }]
      },
      {
        id: 2,
        value: 'C',
        relations: [{
          id: 5,
          relatedBlockId: 3,
          type: 1,
          weight:  0.1,
          oriented: true,
          isNew: false,
        }]
      },
      {
        id: 3,
        value: 'D',
        relations:[]
      }
    ],
    relationsCount: 4
  }

  constructor(private graphService: GraphHelper,
    private algorythmService: BellmanFordAlgorythmService,
    private pythonService: PythonService) { }

  ngOnInit(): void {
  }

  sendEdgesList(){
    this.createEdgesList();
    console.log(JSON.stringify(this.edges))

    const formData = new FormData();
    formData.append('edges', JSON.stringify(this.edges));
    this.pythonService.sendEdgesList(formData)
    .subscribe((res) => {
      console.log(res)
    })
  }

  createEdgesList(){
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

}
