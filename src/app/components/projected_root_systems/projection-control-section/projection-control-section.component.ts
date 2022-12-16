import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';
import { Point } from '@svgdotjs/svg.js';
import { ProjectionManagerService } from 'src/app/display/projections/projection-manager.service';
import { Colors } from 'src/app/display/values/colors';
import MatrixND from 'src/app/logic/maths/nD/MatrixND';
import PointND from 'src/app/logic/maths/nD/PointND';
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
  constructor(
    private projectionManager: ProjectionManagerService
  ){

  }
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
    this.applyRotation();
  }
  applyRotation(){
    let rotationX = MatrixND.basicRotationMatrix(3, 1,2, this.angleX);
    let rotationY = MatrixND.basicRotationMatrix(3, 0,2, this.angleY);
    let rotationZ = MatrixND.basicRotationMatrix(3, 0,1, this.angleZ);
    let projectionMatrix = rotationX.multiply(rotationY).multiply(rotationZ);
    this.projectionManager.setRotationMatrix(projectionMatrix);
  }
}
