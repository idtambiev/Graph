import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlgorythmResultModel } from '@interfaces/models/algorythm-result.model';
import { Observable, ObservedValueOf, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PythonService {
  url = 'http://localhost:8000/'
  constructor(private http: HttpClient) { }

  sendEdgesList(formData: FormData): Observable<AlgorythmResultModel>{
    return this.http.post<AlgorythmResultModel>(this.url, formData, {

    });
  }
}
