import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RelationsType } from '@core/enums/relations-types.enum';
import { AddRelationDialogComponent } from '@dialogs/add-relation-dialog/add-relation-dialog.component';
import { CreateEdgeDTO } from '@interfaces/DTOs/create-edge.dto';
import { CoordinatesDTO, CoordinatesItem } from '@interfaces/DTOs/save-coordinates.dto';
import { Graph } from '@interfaces/models/graph.interface';
import { Block } from '@interfaces/render-models/block.interface';
import { Line } from '@interfaces/render-models/line.interface';
import { RenderedRelation } from '@interfaces/render-models/rendered-relation.interface';
import { EdgeService } from '@services/api/edge.service';
import { GraphService } from '@services/api/graph.service';
import { VertexService } from '@services/api/vertex.service';
import { BellmanFordAlgorythmService } from '@services/graph/bellman-ford-algorythm.service';
import { GraphHelper } from '@services/graph/graph.helper';
import { LoadingService } from '@services/loading.service';
import { Subject, takeUntil, takeWhile } from 'rxjs';
import { CreateVectorComponent } from 'src/app/shared/components/side-menu/components/vector/create-vector/create-vector.component';

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

  createRelationMode = false;

  graphBlocks: Graph | null = null;
  coordinates: CoordinatesDTO | null = null;
  globalWrapper: any = null;

  private destroyed: Subject<void> = new Subject<void>();

  constructor(
    private graphHelper: GraphHelper,
    private graphService: GraphService,
    private ref: ChangeDetectorRef,
    private vertexService: VertexService,
    private loadingService: LoadingService,
    private dialog: MatDialog,
    private edgeService: EdgeService
  ) {

   }

  ngOnInit(): void {
    this.selectGraph();

    this.graphHelper.selectedGraphId$
    .pipe(takeUntil(this.destroyed))
    .subscribe((id)=> {
      if (id){
        // this.dialog.open(CreateVectorComponent,{
        //   width: '630px',
        //   height: '550px'
        // })
        this.oneTypeUndirectedLines = [];
        this.oneTypeOrientedLines = [];
        this.diverseUndirectedLines = [];
        this.diverseOrientedLines = [];
        this.multipleUndirectedVectorLines = [];
        this.multipleOrientedVectorLines = [];
        this.coordinates = null;
        this.renderedBlocks = [];
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



    this.graphHelper.addRelationMode$
    .pipe(takeUntil(this.destroyed))
    .subscribe(res =>{
      this.createRelationMode = res;
    })
  }

  saveCoordinates(): void{
    this.loadingService.loading$.next(true);
    const graphId = this.graphHelper.selectedGraphId$.value;
    this.updateBlocksCoordinates();
    let body: CoordinatesDTO = {
      list: [],
      graphId: graphId
    };

    this.renderedBlocks.forEach((x) => {
      body.list.push({
        blockId: x.id,
        xCoordinate: Math.round(x.xCoordinate),
        yCoordinate: Math.round(x.yCoordinate)
      })
    })
    this.vertexService.saveCoordinates(body)
    .pipe(takeUntil(this.destroyed))
    .subscribe((res) => {
      setTimeout(() => {
        this.loadingService.loading$.next(false);
      }, 600);

    })
  }

  selectGraph(): void{
    this.graphHelper.selectedGraph$.next(this.graphBlocks);
    //this.getBlocksCoordinates();
  }

  loadGraph(id: number): void{
    this.loadingService.loading$.next(true);
    this.graphService.getById(id)
    .pipe(takeUntil(this.destroyed))
    .subscribe((res) => {
      this.graphBlocks = res;
      this.selectGraph();

      setTimeout(() => {
        this.ngAfterViewInit();
        this.loadingService.loading$.next(false);
      }, 100);
    });
  }

  loadCoordinates(){
    this.loadingService.loading$.next(true);
    const graphId = this.graphHelper.selectedGraphId$.value;
    this.vertexService.getCoordinates(graphId)
    .subscribe((res)=>{
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
          d.style.position = "absolute";
          d.style.left = (360 + x.xCoordinate)+'px';
          d.style.top = (85 + x.yCoordinate)+'px';
        }
      })
    }
    this.createRelationLines();
    this.loadingService.loading$.next(false);
  }

  clickOnBlock(event: any, blockId: number): void{
    const block = this.renderedBlocks.find((x) => x.id == blockId)

    if (this.createRelationMode){
      this.clickedBlocksCount++;
      if (this.clickedBlocksCount < 2){
        this.graphHelper.selectedFirstBlock$.next(blockId);
      } else {
        this.createNewRelation(blockId);
      }
    }
  }

  createNewRelation(secondBlockId: number): void{
    const firstBlockId = this.graphHelper.selectedFirstBlock$.value;
    this.dialog.open(AddRelationDialogComponent)
    .afterClosed()
    .subscribe((res) => {
      if (res){
        const body:CreateEdgeDTO = {
          blockId: firstBlockId,
          relatedId: secondBlockId,
          value: res.value,
          oriented: res.oriented,
          type: res.type,
          vectorId: this.graphHelper.selectedVectorId$.value ? this.graphHelper.selectedVectorId$.value: null,
          weight: res.weight
        }

        this.edgeService.create(body)
        .pipe(takeUntil(this.destroyed))
        .subscribe((res)=>{
          this.loadGraph(this.graphHelper.selectedGraphId$.value);
        })
      }
    });


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

    // this.saveCoordinates();
    // this.loadCoordinates();
    // this.createRelationLines();
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
    //this.saveCoordinates()
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
      this.loadCoordinates();

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
    console.log(this.renderedBlocks)
    this.relations.forEach((relation, index) => {
      let startBlock = this.coordinates?.list.find((x) => x.blockId == relation.startBlockId);
      let endBlock = this.coordinates?.list.find((x) => x.blockId == relation.endBlockId);

      if (startBlock?.xCoordinate && endBlock?.xCoordinate){
        this.generateLinesCoordinates(startBlock, endBlock, index, relation);
      }
      this.createLinesArrays();
    });
  }

  generateLinesCoordinates(startBlock: CoordinatesItem, endBlock:CoordinatesItem, index: number, relation: RenderedRelation): any{
    let x1 = 0;
    let y1 = 0;
    let x2 = 0;
    let y2 = 0;

    const width = 46;
    const height = 48;

    // start higher
    if (startBlock.yCoordinate + height*3 < endBlock.yCoordinate){
        if (startBlock.xCoordinate >= endBlock.xCoordinate){
          x1 = startBlock.xCoordinate + width/2;
          y1 = startBlock.yCoordinate + height;
          if (endBlock.xCoordinate < startBlock.xCoordinate-width*2){
              x2 = endBlock.xCoordinate + width;
              y2 = endBlock.yCoordinate + height/2;
          } else {
              x2 = endBlock.xCoordinate + width/2;
              y2 = endBlock.yCoordinate;
          }
        } else if (startBlock.xCoordinate < endBlock.xCoordinate){
          x1 = startBlock.xCoordinate + width/2;
          y1 = startBlock.yCoordinate + height;
          if (endBlock.xCoordinate > startBlock.xCoordinate + width*2){
              x2 = endBlock.xCoordinate;
              y2 = endBlock.yCoordinate + height/2;
          } else {
              x2 = endBlock.xCoordinate + width/2;
              y2 = endBlock.yCoordinate;
          }
        }
    }

    // start lower
    if (startBlock.yCoordinate - height*3 > endBlock.yCoordinate){
      if (startBlock.xCoordinate >= endBlock.xCoordinate){
        x1 = startBlock.xCoordinate + width/2;
        y1 = startBlock.yCoordinate;
        if (endBlock.xCoordinate < startBlock.xCoordinate-width*2){
            x2 = endBlock.xCoordinate + width;
            y2 = endBlock.yCoordinate + height/2;
        } else {
            x2 = endBlock.xCoordinate + width/2;
            y2 = endBlock.yCoordinate;
        }
      } else if (startBlock.xCoordinate < endBlock.xCoordinate){
        x1 = startBlock.xCoordinate + width/2;
        y1 = startBlock.yCoordinate + height;
        if (endBlock.xCoordinate > startBlock.xCoordinate + width*2){
            x2 = endBlock.xCoordinate;
            y2 = endBlock.yCoordinate + height/2;
        } else {
            x2 = endBlock.xCoordinate + width/2;
            y2 = endBlock.yCoordinate;
        }
      }

  }


    // start horizontal
    if ( endBlock.yCoordinate <= startBlock.yCoordinate+height*3 && endBlock.yCoordinate >= startBlock.yCoordinate - height*3){
      if (startBlock.xCoordinate >= endBlock.xCoordinate){
        x1 = startBlock.xCoordinate;
        y1 = startBlock.yCoordinate + height/2;
        x2 = endBlock.xCoordinate + width;
        y2 = endBlock.yCoordinate + height/2;
      } else if (startBlock.xCoordinate < endBlock.xCoordinate){
        x1 = startBlock.xCoordinate + width;
        y1 = startBlock.yCoordinate + height/2;
        x2 = endBlock.xCoordinate;
        y2 = endBlock.yCoordinate+ height/2;
      }

  }

    this.lines.push({
      id: index + 1,
      startBlockId: relation.startBlockId,
      endBlockId: relation.endBlockId,
      x1: x1,
      y1: y1,
      x2: x2 - (relation?.oriented ? this.markerWidth: 0),
      y2: y2 - (relation?.oriented ? this.markerHeight: 0),
      type: relation.type,
      oriented: relation.oriented,
      vectorId: relation.vectorId
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

  // addNewBlock(){
  //   this.graphBlocks?.blocks.push({
  //     id: this.graphBlocks.blocks.length+1,
  //     value: `gv${this.graphBlocks.blocks.length+1}`,
  //     relations: [],
  //     isNewBlock: true
  //   });
  //   if (this.graphBlocks){
  //     this.graphBlocks.relationsCount++;
  //   }
  // }

  createLinesArrays(): void{
    this.oneTypeUndirectedLines = this.lines.filter((x) => !x.oriented && !x.vectorId);
    this.oneTypeOrientedLines = this.lines.filter((x) => x.oriented && !x.vectorId);
    this.multipleUndirectedVectorLines = this.lines.filter((x) => !x.oriented && x.vectorId);
    this.multipleOrientedVectorLines = this.lines.filter((x) => x.oriented && x.vectorId);
  }



  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
