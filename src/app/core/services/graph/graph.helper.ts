import { Injectable } from '@angular/core';
import { Graph } from '@interfaces/models/graph.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export enum ShowTypes{
  Graphs = 0,
  Relations = 1,
  Algorythm = 2,
  Features = 3
}
@Injectable({
  providedIn: 'root'
})
export class GraphHelper {
  url = environment.url+'/graph/';


  newBlock$: BehaviorSubject<any> = new BehaviorSubject(null);
  selectedFirstBlock$: BehaviorSubject<any> = new BehaviorSubject(null);
  addRelation$: BehaviorSubject<any> = new BehaviorSubject(null);
  showSelected$: BehaviorSubject<number> = new BehaviorSubject(ShowTypes.Graphs);
  selectedGraph$: BehaviorSubject<any> = new BehaviorSubject(null);
  selectedGraphId$: BehaviorSubject<any> = new BehaviorSubject(null);
  selectedVectorId$: BehaviorSubject<any> = new BehaviorSubject(null);

  addRelationMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  saveGraphCoordinates$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { }

  selectBlock(): void{

  }

}
