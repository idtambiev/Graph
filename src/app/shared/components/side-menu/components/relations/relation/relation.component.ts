import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RelationsType } from '@core/enums/relations-types.enum';
import { NewRelation } from '@interfaces/render-models/new-relation';
import { GraphHelper } from '@services/graph/graph.helper';
import { SelectVectorComponent } from '../../../../../dialogs/select-vector/select-vector.component';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.scss']
})
export class RelationComponent implements OnInit {
  @Input() relation: NewRelation | null = null;

  choosed: boolean = false;
  value: string ='';
  type: string ='';

  relationsType = RelationsType;

  horizontalLineIcon: string = "horizontal_rule";
  arrowIcon: string = "trending_flat";

  constructor(private graphService: GraphHelper, private ref: MatDialog) {

   }

  ngOnInit(): void {
    this.graphService.addRelation$.subscribe((res) => {
      if (res != null && res == this.relation?.relationType){
        this.choosed = true;
      } else {
        this.choosed = false;
      }
    })
  }

  chooseType(): void{
    this.graphService.addRelation$.next(this.relation?.relationType);
    // if (this.relation?.relationType == this.relationsType.multipleUndirectedVector
    //     || this.relation?.relationType == this.relationsType.multipleOrientedVector){
    //       this.openVectorsDialog();
    // }

  }

  openVectorsDialog(){
    this.ref.open(SelectVectorComponent,
      {
        width: '650px',
        height: '600px'
      })
  }
}
