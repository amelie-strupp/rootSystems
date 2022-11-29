import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Root } from 'src/app/logic/maths/2D/RootSystem';
import { Matrix3 } from 'three';

@Injectable({
  providedIn: 'root'
})
export class RootSystemTransformer2DService {
  currentTranformation: Matrix3 = new Matrix3().identity();
  appliedMirrorings: Array<Root> = [];
  transformationChanged: Subject<void> = new Subject();
  objectsTransformationActsOn: Array<"ROOTS" | "HYPERPLANES"|"WEYL_CHAMBERS"> = ["ROOTS", "WEYL_CHAMBERS"];
  
  constructor() { }
  transformationAppliedTo(obj: "ROOTS" | "HYPERPLANES"|"WEYL_CHAMBERS"){
    return this.objectsTransformationActsOn.includes(obj);
  }
  getCurrentTransformedObjects(){
    return this.objectsTransformationActsOn;
  }
  addTransformedObjectType(type: "ROOTS" | "HYPERPLANES"|"WEYL_CHAMBERS"){
    this.objectsTransformationActsOn.push(type);
    this.transformationChanged.next();
  }
  removeTransformedObjectType(type: "ROOTS" | "HYPERPLANES"|"WEYL_CHAMBERS"){
    this.objectsTransformationActsOn = this.objectsTransformationActsOn.filter((obj)=>obj!=type);
    this.transformationChanged.next();
  }

  resetTransformation(){
    this.appliedMirrorings = [];
    this.currentTranformation = new Matrix3().identity();
    this.transformationChanged.next();
  }
  mirrorOnPlaneOfRoot(root: Root){
    this.appliedMirrorings.push(root);
    const plane = root.getHyperplane();
    const normal = plane.getNormalVector().normalized();
    const transformationMatrix = new Matrix3(
    ).fromArray([
      // First Row
        1-2*normal.x*normal.x,
        -2*normal.x*normal.y,
        0,
      // Second Row
      -2*normal.x*normal.y,
      1-2*normal.y*normal.y,
      0,
      // Third Row
      0,
      0,
      1,
    ]
    );
    this.currentTranformation = transformationMatrix.multiply(
      this.currentTranformation
      );
      this.transformationChanged.next();
  }


}
