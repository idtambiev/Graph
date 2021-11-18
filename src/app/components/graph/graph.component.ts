import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, DoCheck, NgZone, OnChanges, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Block } from 'src/app/core/interafaces/block.interface';
import { Graph } from 'src/app/core/interafaces/graph.interface';
import { Line } from 'src/app/core/interafaces/line.interface';
import { Relations } from 'src/app/core/interafaces/relation.interface';
import { GraphService } from 'src/app/core/services/graph/graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterContentChecked {
  renderedBlocks: Block[] = [];
  clickedBlocks: Block[] = [];
  lines: Line[] = [];
  relations: Relations[] = [];
  
  clicksCount = 0;

  lineSvg = ''


  graphBlocks: Graph = {
    blocks: [
      {
        id: 1,
        relations: [2]
      },
      {
        id: 2,
        relations: [3]
      },
      {
        id: 3,
        relations: []
      }
    ],
    relationsCount: 2
  }

  // line = {
  //   x1: 0,
  //   y1: 0,
  //   x2: 0,
  //   y2: 0
  // }


  constructor(
    private graphService: GraphService,
    private ref: ChangeDetectorRef,
  ) {
    
   }

  ngOnInit(): void {
    this.graphService.clicksCount$.subscribe((val)=>{
      this.clicksCount = val;
    })
    
    let timeout = setInterval(() => {
      if (this.lines.length === this.graphBlocks.relationsCount){
        clearTimeout(timeout)
      }
    }, 1000);
  }


  clickOnBlock(event: any): void{
    let clicks = this.graphService.clicksCount$.value + 1;
    this.graphService.clicksCount$.next(clicks)
    
    this.clickedBlocks.push({
      id: event.target.id,
      xCoordinate: event.x,
      yCoordinate: event.y,
      width: event.target.offsetWidth,
      height: event.target.offsetHeight,
    });

    const wrapper = document.getElementById('graph-wrapper');
    if (wrapper && clicks === 2){
      const div = wrapper.getBoundingClientRect()

      // this.line = {
      //   x1: this.clickedBlocks[0].xCoordinate - div.x,
      //   y1: this.clickedBlocks[0].yCoordinate- div.y,
      //   x2: this.clickedBlocks[1].xCoordinate- div.x,
      //   y2: this.clickedBlocks[1].yCoordinate - div.y
      // }
      // this.ngOnInit();
      this.clickedBlocks.splice(0,2)
      this.graphService.clicksCount$.next(0);
    }
  }

  ngAfterContentChecked(): void{
    this.getBlocksCoordinates();
  }

  getBlocksCoordinates(): void{
    const blocks = Array.from(document.querySelectorAll('.graph-block'));
    if (blocks.length){
      Array.from(blocks).forEach((block) => {
        const div = block.getBoundingClientRect()
  
        this.renderedBlocks.push({
          id: parseInt(block.id),
          xCoordinate: div.x,
          yCoordinate: div.y,
          width: div.width,
          height: div.height,
        })
      });
      this.createRelationLines();
    }
    
  }


  createRelationLines(): void{
    this.createRelationsArray();
    const wrapper = this.getWrapperCoordinates();
    this.lines = [];
    this.relations.forEach((relation, index) => {
      let startBlock = this.getRelationBlockById(relation.startBlockId);
      let endBlock = this.getRelationBlockById(relation.endBlockId);

      this.lines.push({
        id: index + 1,
        startBlockId: relation.startBlockId,
        endBlockId: relation.endBlockId,
        x1: startBlock!.xCoordinate - wrapper!.x + startBlock!.width,
        y1: startBlock!.yCoordinate - wrapper!.y + startBlock!.height/2,
        x2: endBlock!.xCoordinate - wrapper!.x,
        y2: endBlock!.yCoordinate - wrapper!.y + endBlock!.height/2
      });
    });
    this.lineSvg = '<svg><line *ngFor="let line of lines" [attr.x1]="line.x1" [attr.y1]="line.y1" [attr.x2]="line.x2" [attr.y2]="line.y2" stroke="black" /></svg>'
    console.log(this.lines)
  }

  createRelationsArray(): void{
    this.relations = [];
    this.graphBlocks.blocks
    .forEach((block)=>{
      if (block.relations.length){
        block.relations.forEach((relationBlockId) =>{
          this.relations.push({startBlockId: block.id, endBlockId: relationBlockId})
        })
      }
    });
  }

  getRelationBlockById(id: number){
    return this.renderedBlocks.find((block)=> block.id === id);
  }
  
  getWrapperCoordinates(){
    const wrapper = document.getElementById('graph-wrapper');
    return wrapper!.getBoundingClientRect();
  }
}
