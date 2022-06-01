import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateVectorComponent } from '../create-vector/create-vector.component';

@Component({
  selector: 'app-vectors-list',
  templateUrl: './vectors-list.component.html',
  styleUrls: ['./vectors-list.component.scss']
})
export class VectorsListComponent implements OnInit {
  showVectors: boolean = false;
  vectors: any[] = [];

  constructor(private ref: MatDialog) { }

  ngOnInit(): void {

    this.openCreateVectorDialog();
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

}
