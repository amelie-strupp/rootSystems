import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { rootSystems3D } from 'src/app/data/rootSystems3D';
import RootSystem3D from './RootSystem3D';

@Injectable({
  providedIn: 'root'
})
export class RootSystem3DService {
  rootSystem: RootSystem3D = rootSystems3D.A3;
  repaintEvent: Subject<void> = new Subject();

  constructor() { }
  switchRootSystem(rootSystem: RootSystem3D){
    this.rootSystem = rootSystem;
    this.repaintEvent.next();
  }
}
