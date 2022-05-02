import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RelationsType } from '@core/enums/relations-types.enum';
import { Line } from '@interfaces/render-models/line.interface';

@Component({
  selector: 'app-lines-svg',
  templateUrl: './lines-svg.component.html',
  styleUrls: ['./lines-svg.component.scss']
})
export class LinesSvgComponent implements OnInit, AfterViewInit {
  @Input() lines: Line[] = [];

  @Input() oneTypeUndirectedLines: Line[] = [];
  @Input() oneTypeOrientedLines: Line[] = [];
  @Input() diverseUndirectedLines: Line[] = [];
  @Input() diverseOrientedLines: Line[] = [];
  @Input() multipleUndirectedVectorLines: Line[] = [];
  @Input() multipleOrientedVectorLines: Line[] = [];

  markerWidth = 10;
  markerHeight = 7;

  constructor(
    private ref: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    console.log(this.lines)
  }

  ngAfterViewInit(): void {

  }

}
