import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { GraphComponent } from './components/graph/graph.component';
import { CoreModule } from '@core/core.module';
import { LinesSvgComponent } from './components/lines-svg/lines-svg.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { BlockComponent } from './components/block/block.component';
import { TopMenuRelationsListComponent } from './components/top-menu/components/top-menu-relations-list/top-menu-relations-list.component';
import { TopMenuRelationComponent } from './components/top-menu/components/top-menu-relation/top-menu-relation.component';


@NgModule({
  declarations: [
    MainComponent,
    GraphComponent,
    LinesSvgComponent,
    TopMenuComponent,
    BlockComponent,
    TopMenuRelationsListComponent,
    TopMenuRelationComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CoreModule
  ],
})
export class MainModule { }
