import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from '@modules/main/main.module';
import { AuthModule } from '@modules/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from '@core/interceptors/request.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule,
    AuthModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
