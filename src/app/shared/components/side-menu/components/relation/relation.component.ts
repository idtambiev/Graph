import { Component, Input, OnInit } from '@angular/core';
import { RelationsType } from '@core/enums/relations-types.enum';
import { NewRelation } from '@interfaces/render-models/new-relation';
import { GraphService } from '@services/graph/graph.service';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.scss']
})
export class RelationComponent implements OnInit {
  @Input() relation: NewRelation | null = null;

  choosed: boolean = false

  relationsType = RelationsType;

  horizontalLineIcon: string = "horizontal_rule";
  arrowIcon: string = "trending_flat";

  constructor(private graphService: GraphService) {

   }

  ngOnInit(): void {
    this.graphService.selectedRelationType$.subscribe((res) => {
      if (res != null && res == this.relation?.relationType){
        this.choosed = true;
      } else {
        this.choosed = false;
      }
    })
  }

  chooseType(): void{
    this.graphService.selectedRelationType$.next(this.relation?.relationType);
  }
}
