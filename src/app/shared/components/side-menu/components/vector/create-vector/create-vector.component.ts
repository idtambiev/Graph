import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RelationsType } from '@core/enums/relations-types.enum';
import { CreateGraphDialogComponent } from '@dialogs/create-graph-dialog/create-graph-dialog.component';
import { VectorItem } from '@interfaces/models/graph.interface';
import { NewRelation } from '@interfaces/render-models/new-relation';
import { GraphService } from '@services/api/graph.service';

@Component({
  selector: 'app-create-vector',
  templateUrl: './create-vector.component.html',
  styleUrls: ['./create-vector.component.scss']
})
export class CreateVectorComponent implements OnInit {
  items: VectorItem[] = [{
    id: 0,
    weight: 0,
    type: 0
  }];

  itemsForm : FormGroup;
  //itemsFormArray: FormArray;

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

  constructor(private dialogRef: MatDialogRef<CreateGraphDialogComponent>,
    private graphService: GraphService,
    private fb: FormBuilder) {
      this.itemsForm = this.fb.group(
      {
        items: this.fb.array([
          {
            weight: '',
            type: ''
          }
        ])
      })
    }

  ngOnInit(): void {
    //this.addItem();
  }

  // submit(){
  //   if (this.name){
  //     this.graphService.create(this.name)
  //     .subscribe((res)=> {
  //       this.dialogRef.close(true);
  //     })
  //   }
  //}


  addItem(){
    (<FormArray>this.itemsForm.get('items')).push(
      this.fb.group({
        type: '',
        weight: 0
      })
    );
  }

  getFormsControls() : FormArray{
    return this.itemsForm.controls['items'] as FormArray;
}

  close(): void{
    this.dialogRef.close();
  }
}
