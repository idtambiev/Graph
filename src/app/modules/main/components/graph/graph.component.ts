import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { RelationsType } from '@core/enums/relations-types.enum';
import { Graph } from '@interfaces/models/graph.interface';
import { Block } from '@interfaces/render-models/block.interface';
import { Line } from '@interfaces/render-models/line.interface';
import { RenderedRelation } from '@interfaces/render-models/rendered-relation.interface';
import { BellmanFordAlgorythmService } from '@services/graph/bellman-ford-algorythm.service';
import { GraphHelper } from '@services/graph/graph.helper';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {
  renderedBlocks: Block[] = [];
  clickedBlocksCount = 0;
  lines: Line[] = [];
  oneTypeUndirectedLines: Line[] = [];
  oneTypeOrientedLines: Line[] = [];
  diverseUndirectedLines: Line[] = [];
  diverseOrientedLines: Line[] = [];
  multipleUndirectedVectorLines: Line[] = [];
  multipleOrientedVectorLines: Line[] = [];
  relations: RenderedRelation[] = [];
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
        id: 0,
        value: 'A',
        relations: [{
          relatedBlockId: 1,
          type: 1,
          weight: 0.1,
          oriented: true
        },
        {
          relatedBlockId: 3,
          type: 1,
          weight:  0.7,
          oriented: true
        },{
          relatedBlockId: 2,
          type: 1,
          weight:  0.4,
          oriented: true
        }]
      },
      {
        id: 1,
        value: 'B',
        relations: [{
          relatedBlockId: 2,
          type: 1,
          weight:  0.1,
          oriented: true
        },{
          relatedBlockId: 3,
          type: 1,
          weight:  0.5,
          oriented: true
        }]
      },
      {
        id: 2,
        value: 'C',
        relations: [{
          relatedBlockId: 3,
          type: 1,
          weight:  0.1,
          oriented: true
        }]
      },
      {
        id: 3,
        value: 'D',
        relations:[]
      }
    ],
    relationsCount: 4
  }

  constructor(
    private graphService: GraphHelper,
    private ref: ChangeDetectorRef,
    private algorythmService: BellmanFordAlgorythmService
  ) {

   }

  ngOnInit(): void {
    this.graphService.selectedGraph$.next(this.graphBlocks);
    this.graphService.newBlock$
    .subscribe((res) => {
      if (res) this.addNewBlock();
    })

    this.algorythmService.algorythm(this.graphBlocks);
  }

  clickOnBlock(event: any, blockId: number): void{
    const block = this.renderedBlocks.find((x) => x.id == blockId)
   // console.log(block, event)
    if (this.renderedBlocks){

    }
    const relationType = this.graphService.selectedRelationType$.value;
    if (relationType != null){
      this.clickedBlocksCount++;
      if (this.clickedBlocksCount < 2){
        this.graphService.selectedFirstBlock$.next(blockId);
      } else {
        this.createNewRelation(blockId, relationType);
      }
    }
  }

  createNewRelation(secondBlockId: number, relationType: RelationsType): void{
      const firstBlockId = this.graphService.selectedFirstBlock$.value;
      const idx = this.graphBlocks.blocks.findIndex((val) => val.id == firstBlockId);

      this.graphBlocks.blocks[idx].relations.push({
        relatedBlockId: secondBlockId,
          type: relationType,
          weight: 0
      });

      this.graphService.selectedFirstBlock$.next(null);
      this.clickedBlocksCount = 0;
      this.ngAfterViewInit()
  }

  movingBlock(event: any, id: number): void{
    const distance = event.distance;

    this.changeRelationCoordinates(
      distance.x - this.lineOffsetCoordinates.x,
      distance.y - this.lineOffsetCoordinates.y, id
    );

    this.lineOffsetCoordinates = {
      x: distance.x,
      y: distance.y
    }
  }

  endedMovingBlock(event: any, id: number): void{
    const distance = event.distance;

    this.changeRelationCoordinates(
      distance.x - this.lineOffsetCoordinates.x,
      distance.y - this.lineOffsetCoordinates.y, id
    );

    this.lineOffsetCoordinates = {
      x : 0,
      y : 0
    }
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

    this.createLinesArrays();
    this.updateBlocksCoordinates();
  }

  ngAfterViewInit(): void{
    this.graphService.selectedGraph$.next(this.graphBlocks)
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

  updateBlocksCoordinates(): void{
    const blocks = Array.from(document.querySelectorAll('.graph-block'));
    if (blocks.length){
      Array.from(blocks).forEach((block) => {
        const div = block.getBoundingClientRect()
        const idx = this.renderedBlocks.findIndex((x) => x.id === parseInt(block.id))
        const wrapper = this.getWrapperCoordinates();

        this.renderedBlocks[idx] = {
          id: parseInt(block.id),
          xCoordinate: div.x - wrapper.x,
          yCoordinate: div.y - wrapper.y,
          width: div.width,
          height: div.height,
        }
      });
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
                      endBlock!.xCoordinate - wrapper!.x + endBlock!.width + (relation?.oriented ? this.markerWidth: 0) :
                      endBlock!.xCoordinate - wrapper!.x - (relation?.oriented ? this.markerWidth: 0),

        y2: endBlock!.yCoordinate - wrapper!.y + endBlock!.height/2,

        type: relation.type
      });

      this.createLinesArrays();
    });
  }

  createRelationsArray(): void{
    this.relations = [];
    this.graphBlocks.blocks
    .forEach((block)=>{
      if (block.relations.length){
        block.relations.forEach((relation) =>{
          this.relations
          .push({
            startBlockId: block.id,
            endBlockId: relation.relatedBlockId,
            type: relation.type,
            oriented: relation.oriented
          })
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

  addNewBlock(){
    this.graphBlocks.blocks.push({
      id: this.graphBlocks.blocks.length+1,
      value: '',
      relations: []
    });
    this.graphBlocks.relationsCount++;
  }

  createLinesArrays(): void{
    this.oneTypeUndirectedLines = this.lines.filter((x) => x.type === RelationsType.oneTypeUndirected);
    this.oneTypeOrientedLines = this.lines.filter((x) => x.type === RelationsType.oneTypeOriented);
    this.diverseUndirectedLines = this.lines.filter((x) => x.type === RelationsType.diverseUndirected);
    this.diverseOrientedLines = this.lines.filter((x) => x.type === RelationsType.diverseOriented);
    this.multipleUndirectedVectorLines = this.lines.filter((x) => x.type === RelationsType.multipleUndirectedVector);
    this.multipleOrientedVectorLines = this.lines.filter((x) => x.type === RelationsType.multipleOrientedVector);
  }
}
