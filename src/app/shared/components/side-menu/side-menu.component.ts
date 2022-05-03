import { Component, Input, OnInit } from '@angular/core';
import { GraphService } from '@services/graph/graph.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  showRelations: boolean = false;
  constructor(private graphService: GraphService) { }

  ngOnInit(): void {
    this.graphService.showRelations$
    .subscribe((res) => {
      this.showRelations = res;
    })
  }

}
