import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GraphBlock } from '@interfaces/models/graph.interface';
import { GraphHelper } from '@services/graph/graph.helper';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() blockInput: GraphBlock | null = null;
  @Input() isGraphBlock: boolean = true;
  lineTypes = [

  ]
  constructor(
    private graphService: GraphHelper
  ) { }

  ngOnInit(): void {
  }

  addNewBlock(){
    if (!this.isGraphBlock) {
      this.graphService.newBlock$.next(true);
    }
  }

}
