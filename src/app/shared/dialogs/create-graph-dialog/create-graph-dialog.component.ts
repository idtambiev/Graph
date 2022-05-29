import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GraphService } from '@services/api/graph.service';

@Component({
  selector: 'app-create-graph-dialog',
  templateUrl: './create-graph-dialog.component.html',
  styleUrls: ['./create-graph-dialog.component.scss']
})

export class CreateGraphDialogComponent implements OnInit {
  name: string ='';
  constructor(private dialogRef: MatDialogRef<CreateGraphDialogComponent>,
    private graphService: GraphService) { }

  ngOnInit(): void {
  }

  submit(){
    if (this.name){
      this.graphService.create(this.name)
      .subscribe((res)=> {
        this.dialogRef.close(true);
      })
    }
  }

  close(): void{
    this.dialogRef.close();
  }

}
