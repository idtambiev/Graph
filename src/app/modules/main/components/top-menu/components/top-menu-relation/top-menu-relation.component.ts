import { Component, Input, OnInit } from '@angular/core';
import { NewRelation } from '@interfaces/render-models/new-relation';

@Component({
  selector: 'app-top-menu-relation',
  templateUrl: './top-menu-relation.component.html',
  styleUrls: ['./top-menu-relation.component.scss']
})
export class TopMenuRelationComponent implements OnInit {
  @Input() relation: NewRelation | null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
