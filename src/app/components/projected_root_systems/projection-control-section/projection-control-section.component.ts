import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';
import { Point } from '@svgdotjs/svg.js';
import { Colors } from 'src/app/display/values/colors';
import Point3D from 'src/app/logic/maths_objects/3D/Point3D';
import { Matrix3, Matrix4, Vector3 } from 'three';

@Component({
  selector: 'app-projection-control-section',
  templateUrl: './projection-control-section.component.html',
  styleUrls: ['./projection-control-section.component.sass'],
})
export class ProjectionControlSectionComponent {
  Colors = Colors;
  angleX: number = Math.PI;
  angleY: number = Math.PI;
  angleZ: number = Math.PI;
  @Output() hyperplaneChanged: EventEmitter<Point3D> = new EventEmitter();
  changeAngle(axis: 'y' | 'x' | 'z', newValue: number) {
    switch (axis) {
      case 'x':
        this.angleX = newValue;
        break;
      case 'y':
        this.angleY = newValue;
        break;
      case 'z':
        this.angleZ = newValue;
    }
    this.hyperplaneChanged.emit(this.emitNewHyperplane());
  }
  emitNewHyperplane(){
    let rotationX = new Matrix4().makeRotationX(this.angleX)
    let rotationY = new Matrix4().makeRotationY(this.angleY);
    let rotationZ = new Matrix4().makeRotationZ(this.angleZ);
    let projectionMatrix = new Matrix4().multiply(rotationX).multiply(rotationY).multiply(rotationZ);
    let transformedNormalVector = new Vector3(0,1,0).applyMatrix4(projectionMatrix);
    return new Point3D(transformedNormalVector.x, transformedNormalVector.y,transformedNormalVector.z);
  }
}
