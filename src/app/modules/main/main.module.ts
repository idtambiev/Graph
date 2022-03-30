import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { GraphComponent } from './components/graph/graph.component';
import { CoreModule } from '@core/core.module';
import { LinesSvgComponent } from './components/lines-svg/lines-svg.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { BlockComponent } from './components/block/block.component';
import { LinesListComponent } from './components/lines-list/lines-list.component';
import { LineComponent } from './components/line/line.component';


@NgModule({
  declarations: [
    MainComponent,
    GraphComponent,
    LinesSvgComponent,
    TopMenuComponent,
    BlockComponent,
    LinesListComponent,
    LineComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CoreModule
  ],
})
export class MainModule { }
