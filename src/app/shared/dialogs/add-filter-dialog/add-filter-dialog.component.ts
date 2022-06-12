import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GraphService } from '@services/api/graph.service';

@Component({
  selector: 'app-add-filter-dialog',
  templateUrl: './add-filter-dialog.component.html',
  styleUrls: ['./add-filter-dialog.component.scss']
})
export class AddFilterDialogComponent implements OnInit {
  name: string ='';
  constructor(private dialogRef: MatDialogRef<AddFilterDialogComponent>,
    private graphService: GraphService) { }

  ngOnInit(): void {
  }

  submit(){

  }

  close(): void{
    this.dialogRef.close();
  }
}
