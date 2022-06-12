import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateVertexDTO } from '@interfaces/DTOs/create-vertex.dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VertexService {
  url = environment.url+'/vertex/';
  constructor(private http: HttpClient) { }

  create(body: CreateVertexDTO): Observable<any>{
    return this.http.post(this.url+'create', body)
  }
}
