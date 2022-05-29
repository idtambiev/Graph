import { Component, Input, OnInit } from '@angular/core';
import { GraphItemDto } from '@interfaces/DTOs/graph-item.dto';
import { GraphService } from '@services/api/graph.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graphs-list',
  templateUrl: './graphs-list.component.html',
  styleUrls: ['./graphs-list.component.scss']
})
export class GraphsListComponent implements OnInit {
  @Input() reload: boolean = false;

  graphs: GraphItemDto[] = [];
  constructor(private graphService: GraphService) { }

  ngOnInit(): void {
    this.getList();
  }

  chooseActive(id: number): void{
    this.graphs.forEach((x) => {
      if (x.id === id){
        x.active = true;
      } else {
        x.active = false;
      }
    })
  }

  getList(): void{
    this.graphService.getList()
    .subscribe((res) => {
      this.graphs = res.items;
      this.graphs.map((x) => x.active == false);
    })
  }

}
