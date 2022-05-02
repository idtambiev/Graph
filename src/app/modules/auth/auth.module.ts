import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CoreModule } from '@core/core.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AuthComponent,
    ForgotPasswordComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class AuthModule { }
