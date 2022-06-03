import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VectorService } from '@services/api/vector.service';
import { GraphHelper } from '@services/graph/graph.helper';

@Component({
  selector: 'app-select-vector',
  templateUrl: './select-vector.component.html',
  styleUrls: ['./select-vector.component.scss']
})
export class SelectVectorComponent implements OnInit {
  vectors: any[] = [];

  vectorsColumns: string[] = ['id', 'value', 'minWeight', 'count', 'items', 'action'];

  vectorItemsColumns: string[] = ['value', 'Weight', 'count'];

  showItems: boolean = false;

  constructor(private ref: MatDialog,
    private vectorService: VectorService,
    private graphHelper: GraphHelper,
    private matDialogRef: MatDialogRef<SelectVectorComponent>) { }


  ngOnInit(): void {
    this.loadVectors();
  }

  loadVectors(): void{
    if (this.graphHelper.selectedGraphId$.value){
      this.vectorService.getList(this.graphHelper.selectedGraphId$.value)
      .subscribe((res) => {
        this.vectors = res;
        console.log(res)
      })
    }

  }

  close(){
    this.matDialogRef.close();
  }

  choose(id: number): void{
    this.graphHelper.selectedVectorId$.next(id);
  }

  submit(){
    this.close();
  }


}
