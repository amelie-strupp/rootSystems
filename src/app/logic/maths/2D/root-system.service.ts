import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { rootSystems } from 'src/app/data/rootSystems';
import RootSystem2D from './RootSystem';

@Injectable({
  providedIn: 'root'
})
export class RootSystemService {
  rootSystem: RootSystem2D = rootSystems.A2;
  repaintEvent: Subject<void> = new Subject();
  constructor() { }
  switchRootSystem(rootSystem: RootSystem2D){
    if(rootSystem.type != this.rootSystem.type){
    this.rootSystem = rootSystem
    this.repaintEvent.next();
    }
  }
  getRoots(){
    return this.rootSystem.getAllRoots();
  }
  getPositiveRoots(){
    return this.rootSystem.getPositiveRoots();
  }
  getWeylChambers(){
    return this.rootSystem.getAllWeylChambers();
  }
  getFundamentalWeylChamber(){
    return this.rootSystem.getFundamentalWeylChamber();
  }
  getType(){
    return this.rootSystem.type;
  }
  getBase(){
    return this.rootSystem.getBase();
  }
  getAffineReflectionBase(){
    return this.rootSystem.getAffineReflectionBase();
  }

}
