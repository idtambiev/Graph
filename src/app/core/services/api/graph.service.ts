import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GraphItemDto } from '@interfaces/DTOs/graph-item.dto';
import { ListResult } from '@interfaces/models/list-result.model';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  url = environment.url+'/graph/';
  constructor(private http: HttpClient) { }

  getList(): Observable<ListResult<GraphItemDto>>{
    return this.http.get<ListResult<GraphItemDto>>(this.url+'list');
  }

  create(name: string): Observable<any>{
    console.log(name)
    return this.http.post(this.url+'create', {"name": name});
  }
}
