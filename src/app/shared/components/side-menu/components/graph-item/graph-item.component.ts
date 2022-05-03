import { Component, Input, OnInit } from '@angular/core';
import { GraphItemDto } from '@interfaces/DTOs/graph-item.dto';

@Component({
  selector: 'app-graph-item',
  templateUrl: './graph-item.component.html',
  styleUrls: ['./graph-item.component.scss']
})
export class GraphItemComponent implements OnInit {
  @Input() item: GraphItemDto | null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
