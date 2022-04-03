import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  newBlock$: BehaviorSubject<any> = new BehaviorSubject(null);
  createRelation$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { }

  selectBlock(): void{

  }
}
