import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DragDropModule,
    MatTooltipModule,
    MatIconModule
  ],
  exports: [
    DragDropModule,
    MatTooltipModule,
    MatIconModule
  ]
})
export class CoreModule { }
