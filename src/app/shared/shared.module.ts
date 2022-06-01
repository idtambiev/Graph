import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInputComponent } from './components/auth-input/auth-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { LogoComponent } from './components/logo/logo.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RelationsListComponent } from './components/side-menu/components/relations/relations-list/relations-list.component';
import { RelationComponent } from './components/side-menu/components/relations/relation/relation.component';
import { CoreModule } from '@core/core.module';
import { GraphsListComponent } from './components/side-menu/components/graph/graphs-list/graphs-list.component';
import { GraphItemComponent } from './components/side-menu/components/graph/graph-item/graph-item.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { EdgesListComponent } from './components/side-menu/components/edges/edges-list/edges-list.component';
import { EdgeComponent } from './components/side-menu/components/edges/edge/edge.component';
import { CreateGraphDialogComponent } from './dialogs/create-graph-dialog/create-graph-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './components/loading/loading.component';
import { DeleteGraphComponent } from './dialogs/delete-graph/delete-graph.component';
import { VectorsListComponent } from './components/side-menu/components/vector/vectors-list/vectors-list.component';
import { VectorItemComponent } from './components/side-menu/components/vector/vector-item/vector-item.component';
import { CreateVectorComponent } from './components/side-menu/components/vector/create-vector/create-vector.component';
import { MatSelectModule } from '@angular/material/select';
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
    EdgeComponent,
    CreateGraphDialogComponent,
    LoadingComponent,
    DeleteGraphComponent,
    VectorsListComponent,
    VectorItemComponent,
    CreateVectorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  exports: [
    AuthInputComponent,
    AuthButtonComponent,
    LogoComponent,
    SideMenuComponent,
    TopMenuComponent,
    MatDialogModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }
