import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Graph } from '@interfaces/models/graph.interface';
import { GraphHelper, ShowTypes } from '@services/graph/graph.helper';
import { CreateGraphDialogComponent } from '@dialogs/create-graph-dialog/create-graph-dialog.component';
import { GraphsListComponent } from './components/graph/graphs-list/graphs-list.component';
import { GraphService } from '@services/api/graph.service';
import { SaveGraphDTO, SaveRelationDTO } from '@interfaces/DTOs/save-graph.dto';
import { DeleteGraphComponent } from '@dialogs/delete-graph/delete-graph.component';
import { AddVertexComponent } from '@dialogs/add-vertex/add-vertex.component';
import { AddRelationDialogComponent } from '@dialogs/add-relation-dialog/add-relation-dialog.component';
import { LoadingService } from '@services/loading.service';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @ViewChild(GraphsListComponent) child!: GraphsListComponent;

  showType: ShowTypes = ShowTypes.Graphs;
  showActions: boolean = false;
  mode = false;
  constructor(private graphHelper: GraphHelper,
    private graphService: GraphService,
    private ref: MatDialog,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.graphHelper.showSelected$
    .subscribe((res) => {
      this.showType = res;
      //this.showRelations = res;
    })
  }

  changeActionsStatus(): void{
    this.showActions = !this.showActions;
  }

  createNewgraph(): void{
    this.ref.open(CreateGraphDialogComponent,
    {
        width: '450px',
        height: '250px'
    }).afterClosed().subscribe((res)=> {
      if (res){
        this.child.getList();
      }
    });
  }

  saveGraphCoordinates(): void{
    this.graphHelper.saveGraphCoordinates$.next(true)
  }

  deleteGraph(): void{
    this.ref.open(DeleteGraphComponent,
      {
          width: '450px',
          height: '250px'
      }).afterClosed().subscribe((res)=> {
        if (res){
          this.child.getList();
        }
      });
  }

  addNewBlock(){
    //this.graphHelper.newBlock$.next(true);
    this.ref.open(AddVertexComponent)
    .afterClosed().subscribe((res) => {
      if (res){
        this.graphHelper.selectedGraphId$.next(res);
      }
    })

  }

  addRelation(){
    this.mode = !this.mode;
    this.graphHelper.addRelationMode$.next(this.mode);
    // this.ref.open(AddRelationDialogComponent)
    // .afterClosed().subscribe((res) => {
    //   if (res){
    //     //this.graphHelper.selectedGraphId$.next(res);
    //   }
    // })
    //this.graphHelper.addRelation$.next(true);
  }

  saveGraph(): void{
    this.loadingService.loading$.next(true);
    const graph: Graph | null = this.graphHelper.selectedGraph$.value;
    if (graph){

      let dto: SaveGraphDTO = {
        id: graph.id,
        blocks: []
      }

      graph.blocks.forEach(x =>
        {
          let relations: SaveRelationDTO[] = [];

          x.relations.forEach((rel) => {
            let relationDto: SaveRelationDTO = {
              id: rel.id,
              blockId: x.id,
              relatedBlockId: rel.relatedBlockId,
              type: rel.type,
              weight: rel.weight,
              isNew: rel.isNew
            }

            relations.push(relationDto);
          })
          dto.blocks.push({id: x.id, value: x.value, isNewBlock: x.isNewBlock!, relations: relations})
        }
      )

      this.graphService.saveGraph(dto)
      .subscribe((res) => {
        console.log('save')
        this.loadingService.loading$.next(false);
      })
    }
  }

}
