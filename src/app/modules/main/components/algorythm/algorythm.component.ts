import { Component, OnInit } from '@angular/core';
import { BellmanFordAlgorythmService } from '@services/graph/bellman-ford-algorythm.service';
import { GraphHelper } from '@services/graph/graph.helper';

@Component({
  selector: 'app-algorythm',
  templateUrl: './algorythm.component.html',
  styleUrls: ['./algorythm.component.scss']
})
export class AlgorythmComponent implements OnInit {

  constructor(private graphService: GraphHelper,
    private algorythmService: BellmanFordAlgorythmService) { }

  ngOnInit(): void {
  }

}
