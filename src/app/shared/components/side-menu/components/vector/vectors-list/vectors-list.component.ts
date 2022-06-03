import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectVectorComponent } from '@dialogs/select-vector/select-vector.component';
import { VectorService } from '@services/api/vector.service';
import { GraphHelper } from '@services/graph/graph.helper';
import { CreateVectorComponent } from '../create-vector/create-vector.component';

@Component({
  selector: 'app-vectors-list',
  templateUrl: './vectors-list.component.html',
  styleUrls: ['./vectors-list.component.scss']
})
export class VectorsListComponent implements OnInit {
  showVectors: boolean = false;
  vectors: any[] = [];

  constructor(private ref: MatDialog,
    private vectorService: VectorService,
    private graphHelper: GraphHelper) { }

  ngOnInit(): void {
    //this.openCreateVectorDialog();
    this.loadVectors()
  }

  changeShowStatus(): void{
    this.showVectors = !this.showVectors;
  }

  openCreateVectorDialog(): void{
    this.ref.open(CreateVectorComponent,{
      width: '630px',
      height: '550px'
    })
  }

  openVectorsList(): void{
    this.ref.open(SelectVectorComponent,{
      width: '900px',
      height: '700px'
    })
  }

  loadVectors(): void{
    if (this.graphHelper.selectedGraphId$.value){
      this.vectorService.getList(this.graphHelper.selectedGraphId$.value)
      .subscribe((res) => {
        console.log(res)
      })
    }

  }

}
