import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RelationsType } from '@core/enums/relations-types.enum';
import { SelectVectorComponent } from '@dialogs/select-vector/select-vector.component';
import { NewRelation } from '@interfaces/render-models/new-relation';

@Component({
  selector: 'app-relations-list',
  templateUrl: './relations-list.component.html',
  styleUrls: ['./relations-list.component.scss']
})
export class RelationsListComponent implements OnInit {
  value: string ='';
  type: string ='';
  relationsList: NewRelation[] =[
    {
      text: "One Type Undirected",
      relationType: RelationsType.oneTypeUndirected,
    },
    {
      text: "One Type Oriented",
      relationType: RelationsType.oneTypeOriented,
    },
    // {
    //   text: "Diverse Undirected",
    //   relationType: RelationsType.diverseUndirected,
    // },
    // {
    //   text: "Diverse Oriented",
    //   relationType: RelationsType.diverseOriented,
    // },
    // {
    //   text: "Multiple Undirected Vector",
    //   relationType: RelationsType.multipleUndirectedVector,
    // },
    // {
    //   text: "Multiple Oriented Vector",
    //   relationType: RelationsType.multipleOrientedVector,
    // },
  ]

  showRelations: boolean = false;
  constructor(private ref: MatDialog) { }

  ngOnInit(): void {
    //this.openVectorsDialog();
  }

  changeActionsStatus(): void{
    this.showRelations = !this.showRelations;
  }

  add(){

  }

  clear(){
    this.value = ''
    this.type = ''
  }

  openVectorsDialog(){
    this.ref.open(SelectVectorComponent,
      {
        width: '900px',
        height: '700px'
      })
  }

}
