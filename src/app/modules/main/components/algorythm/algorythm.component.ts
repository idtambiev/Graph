import { Component, OnInit } from '@angular/core';
import { BellmanFordAlgorythmService } from '@services/graph/bellman-ford-algorythm.service';
import { GraphService } from '@services/graph/graph.service';

@Component({
  selector: 'app-algorythm',
  templateUrl: './algorythm.component.html',
  styleUrls: ['./algorythm.component.scss']
})
export class AlgorythmComponent implements OnInit {

  constructor(private graphService: GraphService,
    private algorythmService: BellmanFordAlgorythmService) { }

  ngOnInit(): void {
  }

}
