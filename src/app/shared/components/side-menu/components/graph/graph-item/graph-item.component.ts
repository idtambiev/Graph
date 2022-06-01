import { Component, Input, OnInit } from '@angular/core';
import { GraphItemDto } from '@interfaces/DTOs/graph-item.dto';
import { GraphHelper } from '@services/graph/graph.helper';

@Component({
  selector: 'app-graph-item',
  templateUrl: './graph-item.component.html',
  styleUrls: ['./graph-item.component.scss']
})
export class GraphItemComponent implements OnInit {
  @Input() item: GraphItemDto | null = null;
  constructor(private graphHelper: GraphHelper) { }

  ngOnInit(): void {
    if (this.graphHelper.selectedGraphId$.value == this.item?.id){
      this.item!.active = true;
    }
  }

  chooseGraph(): void{
    this.graphHelper.selectedGraphId$.next(this.item?.id)
  }

}
