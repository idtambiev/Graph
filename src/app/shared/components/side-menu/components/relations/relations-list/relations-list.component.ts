import { Component, OnInit } from '@angular/core';
import { RelationsType } from '@core/enums/relations-types.enum';
import { NewRelation } from '@interfaces/render-models/new-relation';

@Component({
  selector: 'app-relations-list',
  templateUrl: './relations-list.component.html',
  styleUrls: ['./relations-list.component.scss']
})
export class RelationsListComponent implements OnInit {
  relationsList: NewRelation[] =[
    {
      text: "One Type Undirected",
      relationType: RelationsType.oneTypeUndirected,
    },
    {
      text: "One Type Oriented",
      relationType: RelationsType.oneTypeOriented,
    },
    {
      text: "Diverse Undirected",
      relationType: RelationsType.diverseUndirected,
    },
    {
      text: "Diverse Oriented",
      relationType: RelationsType.diverseOriented,
    },
    {
      text: "Multiple Undirected Vector",
      relationType: RelationsType.multipleUndirectedVector,
    },
    {
      text: "Multiple Oriented Vector",
      relationType: RelationsType.multipleOrientedVector,
    },
  ]

  showRelations: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  changeActionsStatus(): void{
    this.showRelations = !this.showRelations;
  }

}
