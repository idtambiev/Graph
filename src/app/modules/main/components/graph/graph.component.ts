import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RelationsType } from '@core/enums/relations-types.enum';
import { AddRelationDialogComponent } from '@dialogs/add-relation-dialog/add-relation-dialog.component';
import { CoordinatesDTO } from '@interfaces/DTOs/save-coordinates.dto';
import { Graph } from '@interfaces/models/graph.interface';
import { Block } from '@interfaces/render-models/block.interface';
import { Line } from '@interfaces/render-models/line.interface';
import { RenderedRelation } from '@interfaces/render-models/rendered-relation.interface';
import { GraphService } from '@services/api/graph.service';
import { VertexService } from '@services/api/vertex.service';
import { BellmanFordAlgorythmService } from '@services/graph/bellman-ford-algorythm.service';
import { GraphHelper } from '@services/graph/graph.helper';
import { Subject, takeUntil, takeWhile } from 'rxjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})

export class GraphComponent implements OnInit, AfterViewInit, OnDestroy {
  loading = false;
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

  graphBlocks: Graph | null = null;
  coordinates: CoordinatesDTO | null = null;
  globalWrapper: any = null;

  private destroyed: Subject<void> = new Subject<void>();

  constructor(
    private graphHelper: GraphHelper,
    private graphService: GraphService,
    private ref: ChangeDetectorRef,
    private algorythmService: BellmanFordAlgorythmService,
    private dialog: MatDialog,
    private vertexService: VertexService

  ) {

   }

  ngOnInit(): void {
    this.selectGraph();

    this.graphHelper.selectedGraphId$
    .pipe(takeUntil(this.destroyed))
    .subscribe((id)=> {
      if (id){
        this.loadGraph(id);
      }
    });

    this.graphHelper.saveGraphCoordinates$
    .pipe(takeUntil(this.destroyed))
    .subscribe((res) => {
      if (res){
        this.saveCoordinates();
      }
    })

    //this.algorythmService.algorythm(this.graphBlocks);
  }

  saveCoordinates(): void{
    const graphId = this.graphHelper.selectedGraphId$.value;
    this.updateBlocksCoordinates();
    let body: CoordinatesDTO = {
      list: [],
      graphId: graphId
    };

    this.renderedBlocks.forEach((x) => {
      body.list.push({
        blockId: x.id,
        xCoordinate: x.xCoordinate,
        yCoordinate: x.yCoordinate
      })
    })

    this.vertexService.saveCoordinates(body)
    .pipe(takeUntil(this.destroyed))
    .subscribe((res) => {
    })
  }

  selectGraph(): void{
    this.graphHelper.selectedGraph$.next(this.graphBlocks);
    //this.getBlocksCoordinates();
  }

  loadGraph(id: number): void{
    this.loading = true;
    this.graphService.getById(id)
    .pipe(takeUntil(this.destroyed))
    .subscribe((res) => {
      console.log(res);

      this.graphBlocks = res;
      this.selectGraph();

      setTimeout(() => {
        this.ngAfterViewInit()
        this.loading = false;
      }, 100);
    });
  }

  loadCoordinates(){
    const graphId = this.graphHelper.selectedGraphId$.value;
    this.vertexService.getCoordinates(graphId).subscribe((res)=>{
      this.coordinates = res;
      this.changeCoordinates();
    })
  }

  changeCoordinates(): void{
    if(this.coordinates){
      this.coordinates.list.forEach((x) => {
        let d = document.getElementById(x.blockId.toString());
        if (d){
          const wrapper = document.getElementById('graph-wrapper');
          wrapper!.getBoundingClientRect();
          console.log(wrapper)
          d.style.position = "absolute";
          d.style.left = (360 + x.xCoordinate)+'px';
          d.style.top = (85 + x.yCoordinate)+'px';
        }
      })
    }
  }

  clickOnBlock(event: any, blockId: number): void{
    const block = this.renderedBlocks.find((x) => x.id == blockId)

    if (this.renderedBlocks){

    }
    const relationType = this.graphHelper.addRelation$.value;
    if (relationType != null){
      this.clickedBlocksCount++;
      if (this.clickedBlocksCount < 2){
        this.graphHelper.selectedFirstBlock$.next(blockId);
      } else {
        this.createNewRelation(blockId, relationType);
      }
    }
  }

  createNewRelation(secondBlockId: number, relationType: RelationsType): void{
    if (this.graphBlocks){
      const firstBlockId = this.graphHelper.selectedFirstBlock$.value;
      const idx = this.graphBlocks.blocks.findIndex((val) => val.id == firstBlockId);

      this.graphBlocks.blocks[idx].relations.push({
        id: this.relations.length+1,
        relatedBlockId: secondBlockId,
        type: relationType,
        weight: 0,
        isNew: true,
        value: '',
        vectorId: relationType == 5 ? this.graphHelper.selectedVectorId$.value: null,
        oriented: false
      });
    }

      this.selectGraph();
      this.graphHelper.selectedFirstBlock$.next(null);
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
    this.graphHelper.selectedGraph$.next(this.graphBlocks)
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
      this.loadCoordinates()
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

      if (startBlock?.xCoordinate && endBlock?.xCoordinate){
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

          type: relation.type,
          oriented: relation.oriented,
          vectorId: relation.vectorId
        });
      }


      this.createLinesArrays();
    });
  }

  createRelationsArray(): void{
    this.relations = [];

    this.graphBlocks?.blocks
    .forEach((block)=>{
      if (block.relations.length>0){
        block.relations.forEach((relation) =>{
          this.relations
          .push({
            startBlockId: block.id,
            endBlockId: relation.relatedBlockId,
            type: relation.type,
            oriented: relation.oriented,
            vectorId: relation?.vectorId
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
    this.graphBlocks?.blocks.push({
      id: this.graphBlocks.blocks.length+1,
      value: `gv${this.graphBlocks.blocks.length+1}`,
      relations: [],
      isNewBlock: true
    });
    if (this.graphBlocks){
      this.graphBlocks.relationsCount++;
    }

  }

  createLinesArrays(): void{
    this.oneTypeUndirectedLines = this.lines.filter((x) => !x.oriented && !x.vectorId);
    this.oneTypeOrientedLines = this.lines.filter((x) => x.oriented && !x.vectorId);
   // console.log(this.lines)
    this.multipleUndirectedVectorLines = this.lines.filter((x) => !x.oriented && x.vectorId);
    this.multipleOrientedVectorLines = this.lines.filter((x) => x.oriented && x.vectorId);
  }



  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
