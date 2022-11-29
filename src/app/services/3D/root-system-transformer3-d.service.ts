import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Hyperplane3D } from 'src/app/logic/maths/3D/Hyperplane3D';
import { Root3D } from 'src/app/logic/maths/3D/RootSystem3D';
import { Matrix3, Matrix4 } from 'three';
import { SceneManagerService } from './scene-manager.service';

@Injectable({
  providedIn: 'root'
})
export class RootSystemTransformer3DService {
  currentTranformation: Matrix4 = new Matrix4().identity();
  appliedMirrorings: Array<Root3D> = [];
  transformationChanged: Subject<void> = new Subject();
  objectsTransformationActsOn: Array<"ROOTS" | "HYPERPLANES"|"WEYL_CHAMBERS"> = ["ROOTS", "WEYL_CHAMBERS"];

  constructor(private sceneManager: SceneManagerService) {
    sceneManager.reinitializedScene.subscribe(()=>{
      this.applyTransformation();
    })
  }
  transformationAppliedTo(obj: "ROOTS" | "HYPERPLANES"|"WEYL_CHAMBERS"){
    return this.objectsTransformationActsOn.includes(obj);
  }
  getCurrentTransformedObjects(){
    return this.objectsTransformationActsOn;
  }
  addTransformedObjectType(type: "ROOTS" | "HYPERPLANES"|"WEYL_CHAMBERS"){
    this.objectsTransformationActsOn.push(type);
    this.transformationChanged.next();
    this.applyTransformation();
  }
  removeTransformedObjectType(type: "ROOTS" | "HYPERPLANES"|"WEYL_CHAMBERS"){
    this.objectsTransformationActsOn = this.objectsTransformationActsOn.filter((obj)=>obj!=type);
    this.transformationChanged.next();
    this.applyTransformation();
  }
  resetTransformation(){
    this.appliedMirrorings = [];
    this.currentTranformation = new Matrix4().identity();
    this.clearTranformation();
    this.transformationChanged.next();
  }
  clearTranformation(){
    this.sceneManager.removeTransformations();
  }
  applyTransformation(){
    this.sceneManager.setTransformations(this.currentTranformation, this.objectsTransformationActsOn);
    this.transformationChanged.next();
  }
  mirrorOnPlaneOfRoot(root: Root3D){
    this.appliedMirrorings.push(root);
    const plane = root.getHyperplane();
    const normal = plane.normalVector.normalized();
    const transformationMatrix = new Matrix3(
    ).fromArray([
      // First Row
        1-2*normal.x*normal.x,
        -2*normal.x*normal.y,
        -2*normal.x*normal.z,
      // Second Row
      -2*normal.x*normal.y,
      1-2*normal.y*normal.y,
      -2*normal.y*normal.z,
      // Third Row
      -2*normal.x*normal.z,
      -2*normal.y*normal.z,
      1-2*normal.z*normal.z,
    ]
    );
    this.currentTranformation = new Matrix4().setFromMatrix3(transformationMatrix).multiply(
      this.currentTranformation
      );
    this.applyTransformation();
  }

}
