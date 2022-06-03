import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '@services/storage.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.storageService.get('accessToken');
    if (request.url != 'http://localhost:8000/'){
      request= request.clone(
        {
          setHeaders:
          {
            Authorization: `Bearer ${token ? token : ''}`,
          }
        });
    }


    return next.handle(request);
  }
}
