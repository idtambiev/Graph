import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RelationsType } from '@core/enums/relations-types.enum';
import { CreateGraphDialogComponent } from '@dialogs/create-graph-dialog/create-graph-dialog.component';
import { CreateVectorDTO } from '@interfaces/DTOs/create-vector.dto';
import { VectorItem } from '@interfaces/models/graph.interface';
import { NewRelation } from '@interfaces/render-models/new-relation';
import { GraphService } from '@services/api/graph.service';
import { VectorService } from '@services/api/vector.service';
import { GraphHelper } from '@services/graph/graph.helper';

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



  vectorForm : FormGroup;
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
  ]

  get vectorItems(): FormArray {
    return this.vectorForm.get('items') as FormArray;
  }

  constructor(private dialogRef: MatDialogRef<CreateGraphDialogComponent>,
    private graphService: GraphService,
    private fb: FormBuilder,
    private vectorService: VectorService,
    private graphHelper: GraphHelper) {
      this.vectorForm = this.fb.group(
      {
        value: ['', Validators.required],
        items: this.fb.array([
        ])
      });
    }

  ngOnInit(): void {
    this.addItem();
  }


  addItem(){
    (<FormArray>this.vectorForm.get('items')).push(
      this.fb.group({
        value: '',
        type: '',
        weight: 0
      })
    );
  }

  removeItem(i: number): void{
    (<FormArray>this.vectorForm.get('items')).removeAt(i);
  }

  getFormsControls() : FormArray{
    return this.vectorForm.controls['items'] as FormArray;
}

  close(): void{
    this.dialogRef.close();
  }

  submit(): void{
    let data: CreateVectorDTO = this.vectorForm.value;
    data.graphId = this.graphHelper.selectedGraphId$.value;
    this.vectorService.createVector(data)
    .subscribe((res) => {
      console.log('Saved')
    })

  }
}
