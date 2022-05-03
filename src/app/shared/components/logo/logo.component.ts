import { Component, Input, OnInit } from '@angular/core';
import { GraphService } from '@services/graph/graph.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  @Input() isSideMenuLogo: boolean = true;
  constructor(private graphService: GraphService) { }

  ngOnInit(): void {
  }

  returnToGraphs(): void{
    if (this.isSideMenuLogo) this.graphService.showRelations$.next(false);
  }
}
