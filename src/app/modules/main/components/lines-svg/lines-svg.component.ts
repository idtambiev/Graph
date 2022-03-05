import { Component, Input, OnInit } from '@angular/core';
import { Line } from '@interfaces/render-models/line.interface';

@Component({
  selector: 'app-lines-svg',
  templateUrl: './lines-svg.component.html',
  styleUrls: ['./lines-svg.component.scss']
})
export class LinesSvgComponent implements OnInit {
  @Input() lines: Line[] = [];
  markerWidth = 10;
  markerHeight = 7;

  constructor() { }

  ngOnInit(): void {
  }

}
