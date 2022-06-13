import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GraphService } from '@services/api/graph.service';

@Component({
  selector: 'app-add-relation-dialog',
  templateUrl: './add-relation-dialog.component.html',
  styleUrls: ['./add-relation-dialog.component.scss']
})
export class AddRelationDialogComponent implements OnInit {
  value: string ='';
  type: string ='';
  oriented = false;
  weight = 0;

  constructor(private dialogRef: MatDialogRef<AddRelationDialogComponent>,
    private graphService: GraphService) { }

  ngOnInit(): void {
  }

  submit(){
    this.dialogRef.close({value: this.value, type: this.type, oriented: this.oriented, weight: this.weight});
  }

  close(): void{
    this.dialogRef.close();
  }
}
