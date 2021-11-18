import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  firstSelectedBlock$: BehaviorSubject<number> = new BehaviorSubject(-1);
  secondSelectedBlock$: BehaviorSubject<number> = new BehaviorSubject(-1);
  clicksCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor() { }

  selectBlock(): void{

  }
}
