import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { RootSystems3D, rootSystems3D } from 'src/app/data/rootSystems3D';
import RootSystem3D from './RootSystem3D';

@Injectable({
  providedIn: 'root'
})
export class RootSystem3DService {
  rootSystem: RootSystem3D = rootSystems3D.A3;
  rootSystemChangeEvent: Subject<void> = new Subject();

  constructor() {

  }
  setInitialRootSystem(rootSystem: RootSystem3D){
    this.rootSystem = rootSystem;
    this.rootSystemChangeEvent.next();
  }
  switchRootSystem(rootSystem: RootSystem3D){
    this.rootSystem = rootSystem;
    this.rootSystemChangeEvent.next();
  }
}
