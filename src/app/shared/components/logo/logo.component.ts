import { Component, Input, OnInit } from '@angular/core';
import { GraphHelper } from '@services/graph/graph.helper';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  @Input() isSideMenuLogo: boolean = true;
  constructor(private graphService: GraphHelper) { }

  ngOnInit(): void {
  }

  returnToGraphs(): void{
    if (this.isSideMenuLogo) this.graphService.showSelected$.next(0);
  }
}
