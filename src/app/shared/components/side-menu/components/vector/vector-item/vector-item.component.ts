import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vector-item',
  templateUrl: './vector-item.component.html',
  styleUrls: ['./vector-item.component.scss']
})
export class VectorItemComponent implements OnInit {
  @Input() vector: any = null;
  constructor() { }

  ngOnInit(): void {
  }

}
