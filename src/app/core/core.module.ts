import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DragDropModule,
    MatTooltipModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DragDropModule,
    MatTooltipModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
