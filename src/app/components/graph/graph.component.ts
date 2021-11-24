import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, NgZone, OnChanges, OnInit } from '@angular/core';
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
export class GraphComponent implements OnInit, AfterViewInit {
  renderedBlocks: Block[] = [];
  clickedBlocks: Block[] = [];
  lines: Line[] = [];
  relations: Relations[] = [];
  markerWidth = 10;
  markerHeight = 7;
  clicksCount = 0;
  lineOffsetCoordinates = {
    x: 0,
    y: 0
  }

  graphBlocks: Graph = {
    blocks: [
      {
        id: 1,
        value: 'A',
        relations: [{
          relatedBlockId: 2,
          type: 0,
          weight: 0
        }]
      },
      {
        id: 2,
        value: 'B',
        relations: [{
          relatedBlockId: 3,
          type: 0,
          weight: 0
        }]
      },
      {
        id: 3,
        value: 'C',
        relations: []
      },
      {
        id: 4,
        value: 'D',
        relations: [{
          relatedBlockId: 3,
          type: 0,
          weight: 0
        }]
      }
    ],
    relationsCount: 3
  }

  constructor(
    private graphService: GraphService,
    private ref: ChangeDetectorRef,
  ) {
    
   }

  ngOnInit(): void {
    this.graphService.clicksCount$.subscribe((val)=>{
      this.clicksCount = val;
    })
  }


  clickOnBlock(event: any): void{
    let clicks = this.graphService.clicksCount$.value + 1;
    this.graphService.clicksCount$.next(clicks)
    
    // this.clickedBlocks.push({
    //   id: event.target.id,
    //   xCoordinate: event.x,
    //   yCoordinate: event.y,
    //   width: event.target.offsetWidth,
    //   height: event.target.offsetHeight,
    // });

    // const wrapper = document.getElementById('graph-wrapper');
    // if (wrapper && clicks === 2){
    //   const div = wrapper.getBoundingClientRect()

    //   // this.line = {
    //   //   x1: this.clickedBlocks[0].xCoordinate - div.x,
    //   //   y1: this.clickedBlocks[0].yCoordinate- div.y,
    //   //   x2: this.clickedBlocks[1].xCoordinate- div.x,
    //   //   y2: this.clickedBlocks[1].yCoordinate - div.y
    //   // }
    //   // this.ngOnInit();
    //   this.clickedBlocks.splice(0,2)
    //   this.graphService.clicksCount$.next(0);
    // }
  }

  movingBlock(event: any, id: number): void{
    const distance = event.distance;

    if (this.lineOffsetCoordinates.x === 0 && this.lineOffsetCoordinates.y === 0){
      this.lineOffsetCoordinates = {
        x: distance.x,
        y: distance.y
      }
    } else {
      this.lineOffsetCoordinates = {
        x: distance.x - this.lineOffsetCoordinates.x,
        y: distance.y - this.lineOffsetCoordinates.y
      }
    }

    // this.changeRelationCoordinates(
    //   this.lineOffsetCoordinates.x,
    //   this.lineOffsetCoordinates.y ,
    // id);
  }

  endedMovingBlock(event: any, id: number){
    // this.getBlocksCoordinates();
    const distance = event.distance;

    this.changeRelationCoordinates(distance.x, distance.y, id);
  }

  changeRelationCoordinates(x: number, y: number, id: number): void{
    this.lines.forEach((line, idx) =>{
      if (line.startBlockId === id){
        this.lines[idx].x1 += x;
        this.lines[idx].y1 += y;
      }

      if (line.endBlockId === id){
        this.lines[idx].x2 += x;
        this.lines[idx].y2 += y;
      }
    })
  }

  ngAfterViewInit(): void{
    this.getBlocksCoordinates();
    this.ref.detectChanges();
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
    } else {
      console.log('blocks doesnt exist')
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
        x1: startBlock!.xCoordinate < endBlock!.xCoordinate ?
                      startBlock!.xCoordinate - wrapper!.x + startBlock!.width: 
                      startBlock!.xCoordinate - wrapper!.x,
        y1: startBlock!.yCoordinate - wrapper!.y + startBlock!.height/2,
        x2: startBlock!.xCoordinate > endBlock!.xCoordinate ?
                      endBlock!.xCoordinate - wrapper!.x + endBlock!.width + this.markerWidth : 
                      endBlock!.xCoordinate - wrapper!.x - this.markerWidth,
        y2: endBlock!.yCoordinate - wrapper!.y + endBlock!.height/2
      });
    });
  }

  createRelationsArray(): void{
    this.relations = [];
    this.graphBlocks.blocks
    .forEach((block)=>{
      if (block.relations.length){
        block.relations.forEach((relation) =>{
          this.relations.push({startBlockId: block.id, endBlockId: relation.relatedBlockId})
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

  clickOnLine(line: any){
    console.log(line);
  }
}
