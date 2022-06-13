import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateEdgeDTO } from '@interfaces/DTOs/create-edge.dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EdgeService {
  url = environment.url+'/edge/';
  constructor(private http: HttpClient) { }

  create(body: CreateEdgeDTO): Observable<any>{
    return this.http.post(this.url+'create', body);
  }
}
