import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { BlockComponent } from './components/block/block.component';
import { MainComponent } from './main.component';
import { GraphComponent } from './components/graph/graph.component';
import { BlocksListComponent } from './components/blocks-list/blocks-list.component';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    MainComponent,
    BlockComponent,
    BlocksListComponent,
    GraphComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CoreModule
  ],
})
export class MainModule { }
