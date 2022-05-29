import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Graph } from '@interfaces/models/graph.interface';
import { GraphHelper, ShowTypes } from '@services/graph/graph.helper';
import { CreateGraphDialogComponent } from '@dialogs/create-graph-dialog/create-graph-dialog.component';
import { GraphsListComponent } from './components/graphs-list/graphs-list.component';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @ViewChild(GraphsListComponent) child!: GraphsListComponent;

  showType: ShowTypes = ShowTypes.Graphs;
  showActions: boolean = false;
  constructor(private graphService: GraphHelper, private ref: MatDialog) { }

  ngOnInit(): void {
    this.graphService.showSelected$
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

}
