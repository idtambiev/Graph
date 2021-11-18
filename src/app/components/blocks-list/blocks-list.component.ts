import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Block } from 'src/app/core/interafaces/block.interface';
import { GraphService } from 'src/app/core/services/graph/graph.service';


@Component({
  selector: 'app-blocks-list',
  templateUrl: './blocks-list.component.html',
  styleUrls: ['./blocks-list.component.scss']
})
export class BlocksListComponent implements OnInit {
  @Output() returnEvent = new EventEmitter<number>();

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
    // this.clickedBlock = {
    //   id: event.target.id,
    //   xCoordinate: event.x,
    //   yCoordinate: event.y,
    //   width: event.target.offsetWidth,
    //   height: event.target.offsetHeight
    // }
    // console.log(this.clickedBlock)

    // let clicks = this.graphService.clicksCount$.value+1;
    // this.graphService.clicksCount$.next(clicks)
  }

}
