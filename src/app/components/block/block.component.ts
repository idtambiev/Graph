import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GraphService } from 'src/app/core/services/graph/graph.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() value: number = 0;
  @Input() isGraphBlock: boolean = true;
  @Output() newBlockOutput = new EventEmitter<number>();
  lineTypes = [

  ]
  constructor(
  ) { }

  ngOnInit(): void {
  }

  addNewBlock(){
    if (!this.isGraphBlock){
      this.newBlockOutput.emit();
    }

  }
}
