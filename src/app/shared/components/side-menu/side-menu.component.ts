import { Component, Input, OnInit } from '@angular/core';
import { Graph } from '@interfaces/models/graph.interface';
import { GraphService, ShowTypes } from '@services/graph/graph.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  showType: ShowTypes = ShowTypes.Graphs;
  showActions: boolean = false;
  constructor(private graphService: GraphService) { }

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

}
