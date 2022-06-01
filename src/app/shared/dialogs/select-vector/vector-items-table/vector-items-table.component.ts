import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vector-items-table',
  templateUrl: './vector-items-table.component.html',
  styleUrls: ['./vector-items-table.component.scss']
})
export class VectorItemsTableComponent implements OnInit {
  @Input() vectorItems: any = [];
  vectorItemsColumns: string[] = ['value', 'weight', 'type'];
  constructor() { }

  ngOnInit(): void {
  }

}
