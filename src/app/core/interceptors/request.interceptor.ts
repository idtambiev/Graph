import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '@services/storage.service';
import { access } from 'fs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.storageService.get('accessToken');
    // const req = request.clone(
    //   {
    //     setHeaders:
    //     {
    //       Authorization: `Bearer ${token ? token : ''}`
    //     }
    //   });
    //console.log(`Bearer ${token ? token : ''}`)
    return next.handle(request);
  }
}
