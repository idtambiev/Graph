import { Component, OnInit, ViewChild } from '@angular/core';
import { GraphComponent } from './components/graph/graph.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild(GraphComponent) graphComponent!: GraphComponent;
  constructor() { }

  ngOnInit(): void {
  }

  addNewBlock(): void{
    this.graphComponent.addNewBlock();
  }

}
