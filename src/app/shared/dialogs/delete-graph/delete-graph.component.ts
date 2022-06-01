import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GraphService } from '@services/api/graph.service';
import { GraphHelper } from '@services/graph/graph.helper';

@Component({
  selector: 'app-delete-graph',
  templateUrl: './delete-graph.component.html',
  styleUrls: ['./delete-graph.component.scss']
})
export class DeleteGraphComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<DeleteGraphComponent>,
    private graphService: GraphService,
    private graphHelper: GraphHelper) { }

  ngOnInit(): void {
  }

  submit(){
      this.graphService.deleteGraph(this.graphHelper.selectedGraph$.value.id)
      .subscribe((res)=> {
        this.dialogRef.close(true);
      })
  }

  close(): void{
    this.dialogRef.close();
  }

}
