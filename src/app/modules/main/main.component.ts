import { Component, OnInit, ViewChild } from '@angular/core';
import { Graph } from '@interfaces/models/graph.interface';
import { GraphHelper, ShowTypes } from '@services/graph/graph.helper';
import { LoadingService } from '@services/loading.service';
import { GraphComponent } from './components/graph/graph.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild(GraphComponent) graphComponent!: GraphComponent;
  showType: ShowTypes = ShowTypes.Canvas;
  isLoading = false;

  constructor(private graphService: GraphHelper,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.graphService.showSelected$.subscribe((res)=>{
      this.showType = res;
    })

    this.graphService.selectedGraph$.subscribe((res)=>{
      //console.log(res)
    })

    this.loadingService.loading$.subscribe((res)=>{
      this.isLoading = res;
    })
  }

  addNewBlock(): void{
   // this.graphComponent.addNewBlock();
  }

}
