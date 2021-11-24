import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Block } from 'src/app/core/interafaces/block.interface';
import { GraphService } from 'src/app/core/services/graph/graph.service';


@Component({
  selector: 'app-blocks-list',
  templateUrl: './blocks-list.component.html',
  styleUrls: ['./blocks-list.component.scss']
})
export class BlocksListComponent implements OnInit {
  @Output() newBlockOutput = new EventEmitter<number>();

  clicksCount = 0;
  // clickedBlock: Block = {id: -1}
  blocks: Block[] = []

  constructor(
    private graphService: GraphService
  ) { }

  ngOnInit(): void {
    this.graphService.clicksCount$.subscribe((val)=>{
      this.clicksCount = val;
    })
  }

  clickOnBlock(event: any): void{
  }

  addNewBlock(){
    this.newBlockOutput.emit();
  }

}
