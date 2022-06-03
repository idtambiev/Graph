import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PythonService {
  url = 'http://localhost:8000/'
  constructor(private http: HttpClient) { }

  sendEdgesList(formData: FormData): Observable<any>{
    return this.http.post(this.url, formData);
  }
}
