import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GraphService } from '@services/graph/graph.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() value: number = 0;
  @Input() isGraphBlock: boolean = true;
  lineTypes = [

  ]
  constructor(
    private graphService: GraphService
  ) { }

  ngOnInit(): void {
  }

  addNewBlock(){
    if (!this.isGraphBlock) {
      this.graphService.newBlock$.next(true);
    }
  }

}
