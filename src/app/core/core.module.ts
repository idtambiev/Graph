import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DragDropModule,
    MatTooltipModule
  ],
  exports: [
    DragDropModule,
    MatTooltipModule
  ]
})
export class CoreModule { }
