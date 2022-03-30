import { Component, OnInit } from '@angular/core';
import { RelationsType } from '@core/enums/relations-types.enum';
import { NewRelation } from '@interfaces/render-models/new-relation';

@Component({
  selector: 'app-top-menu-relations-list',
  templateUrl: './top-menu-relations-list.component.html',
  styleUrls: ['./top-menu-relations-list.component.scss']
})
export class TopMenuRelationsListComponent implements OnInit {
  relationsList: NewRelation[] =[
    {
      text: "One Type Undirected",
      relationType: RelationsType.oneTypeUndirected,
      icon: "string"
    },
    {
      text: "One Type Oriented",
      relationType: RelationsType.oneTypeOriented,
      icon: "string"
    },
    {
      text: "Diverse Undirected",
      relationType: RelationsType.diverseUndirected,
      icon: "string"
    },
    {
      text: "Diverse Oriented",
      relationType: RelationsType.diverseOriented,
      icon: "string"
    },
    {
      text: "Multiple Undirected Vector",
      relationType: RelationsType.multipleUndirectedVector,
      icon: "string"
    },
    {
      text: "Multiple Oriented Vector",
      relationType: RelationsType.multipleOrientedVector,
      icon: "string"
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
