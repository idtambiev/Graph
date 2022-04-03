import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GraphService } from '@services/graph/graph.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  @Input() isGraphBlock: boolean = true;
  @Output() newBlockOutput = new EventEmitter<number>();
  show: boolean = false;

  constructor(
    private graphService: GraphService
  ) { }

  ngOnInit(): void {
  }

  showRelations(): void{
    this.show = !this.show;
    this.graphService.selectedRelationType$.next(null);
  }
}
