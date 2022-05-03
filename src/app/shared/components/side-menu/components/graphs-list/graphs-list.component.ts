import { Component, OnInit } from '@angular/core';
import { GraphItemDto } from '@interfaces/DTOs/graph-item.dto';

@Component({
  selector: 'app-graphs-list',
  templateUrl: './graphs-list.component.html',
  styleUrls: ['./graphs-list.component.scss']
})
export class GraphsListComponent implements OnInit {
  graphs: GraphItemDto[] = [
    {
      id: 0,
      name: 'Graph №1',
      active: true,
    },
    {
      id: 1,
      name: 'Graph №2',
      active: false
    },
    {
      id: 2,
      name: 'Graph №3',
      active: false
    }

  ]
  constructor() { }

  ngOnInit(): void {
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

}
