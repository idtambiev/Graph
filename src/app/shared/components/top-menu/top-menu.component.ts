import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GraphHelper, ShowTypes } from '@services/graph/graph.helper';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  @Input() isGraphBlock: boolean = true;
  @Output() newBlockOutput = new EventEmitter<number>();
  show: boolean = false;
  status: ShowTypes = ShowTypes.Canvas

  constructor(
    private graphService: GraphHelper
  ) { }

  ngOnInit(): void {
    this.graphService.showSelected$
    .subscribe((res) => {
      //this.show = res;
    });
  }

  showRelations(status: ShowTypes): void{
    this.graphService.showSelected$.next(status);
    this.status = status;
  }
}
