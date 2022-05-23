import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInputComponent } from './components/auth-input/auth-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { LogoComponent } from './components/logo/logo.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RelationsListComponent } from './components/side-menu/components/relations-list/relations-list.component';
import { RelationComponent } from './components/side-menu/components/relation/relation.component';
import { CoreModule } from '@core/core.module';
import { GraphsListComponent } from './components/side-menu/components/graphs-list/graphs-list.component';
import { GraphItemComponent } from './components/side-menu/components/graph-item/graph-item.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { EdgesListComponent } from './components/side-menu/components/edges-list/edges-list.component';
import { EdgeComponent } from './components/side-menu/components/edge/edge.component';


@NgModule({
  declarations: [
    AuthInputComponent,
    AuthButtonComponent,
    LogoComponent,
    SideMenuComponent,
    RelationsListComponent,
    RelationComponent,
    GraphsListComponent,
    GraphItemComponent,
    TopMenuComponent,
    EdgesListComponent,
    EdgeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],
  exports: [
    AuthInputComponent,
    AuthButtonComponent,
    LogoComponent,
    SideMenuComponent,
    TopMenuComponent
  ]
})
export class SharedModule { }
