import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInputComponent } from './components/auth-input/auth-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { LogoComponent } from './components/logo/logo.component';



@NgModule({
  declarations: [
    AuthInputComponent,
    AuthButtonComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthInputComponent,
    AuthButtonComponent,
    LogoComponent
  ]
})
export class SharedModule { }
