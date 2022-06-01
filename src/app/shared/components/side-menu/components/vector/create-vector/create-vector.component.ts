import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private fb: FormBuilder) {
      this.vectorForm = this.fb.group(
      {
        name: ['', Validators.required],
        items: this.fb.array([

        ])
      });
    }

  ngOnInit(): void {
    this.addItem();
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
    console.log(this.vectorForm.value)
  }
}
