import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateVertexDTO } from '@interfaces/DTOs/create-vertex.dto';
import { GraphService } from '@services/api/graph.service';
import { VertexService } from '@services/api/vertex.service';
import { GraphHelper } from '@services/graph/graph.helper';

@Component({
  selector: 'app-add-vertex',
  templateUrl: './add-vertex.component.html',
  styleUrls: ['./add-vertex.component.scss']
})
export class AddVertexComponent implements OnInit {
  value: string ='';
  type: string ='';

  constructor(private dialogRef: MatDialogRef<AddVertexComponent>,
    private graphService: GraphService,
    private graphHelper: GraphHelper,
    private vertextService: VertexService) { }

  ngOnInit(): void {
  }

  submit(){
    const body: CreateVertexDTO = {
      graphId: this.graphHelper.selectedGraphId$.value,
      value: this.value
    }

    this.vertextService.create(body).subscribe((res) => {
      this.dialogRef.close(this.graphHelper.selectedGraphId$.value)
    })
    // this.dialogRef.close({value: this.value, type: this.type})
  }

  close(): void{
    this.dialogRef.close();
  }

}
