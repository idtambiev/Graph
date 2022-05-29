import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginTokens } from '@interfaces/DTOs/login-tokens.dto';
import { LoginModel } from '@interfaces/models/login.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url+'/auth/';
  constructor(private http: HttpClient) { }

  login(model: LoginModel): Observable<LoginTokens>{
    return this.http.post<LoginTokens>(this.url+'login', model)
  }

  test(): Observable<any>{
    return this.http.get(this.url+'test');
  }
}
