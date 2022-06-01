import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateVectorDTO } from '@interfaces/DTOs/create-vector.dto';
import { Vector } from '@interfaces/models/graph.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VectorService {
  url = environment.url+'/vector/';
  constructor(private http: HttpClient) { }

  createVector(body: CreateVectorDTO): Observable<any>{
    return this.http.post(this.url, body);
  }

  getList(id: number): Observable<Vector[]>{
    return this.http.get<Vector[]>(this.url+'by-id', {
      params: {
        graphId: id
      }
    })
  }
}
