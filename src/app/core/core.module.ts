import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './interceptors/request.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DragDropModule,
    MatTooltipModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
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
