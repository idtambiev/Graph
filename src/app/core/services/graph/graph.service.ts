import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  newBlock$: BehaviorSubject<any> = new BehaviorSubject(null);
  selectedFirstBlock$: BehaviorSubject<any> = new BehaviorSubject(null);
  selectedRelationType$: BehaviorSubject<any> = new BehaviorSubject(null);
  showRelations$: BehaviorSubject<any> = new BehaviorSubject(false);
  constructor() { }

  selectBlock(): void{

  }
}
