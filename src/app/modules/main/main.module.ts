import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { GraphComponent } from './components/graph/graph.component';
import { CoreModule } from '@core/core.module';
import { LinesSvgComponent } from './components/lines-svg/lines-svg.component';
import { BlockComponent } from './components/block/block.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlgorythmComponent } from './components/algorythm/algorythm.component';


@NgModule({
  declarations: [
    MainComponent,
    GraphComponent,
    LinesSvgComponent,
    BlockComponent,
    AlgorythmComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CoreModule,
    SharedModule
  ],
})
export class MainModule { }
