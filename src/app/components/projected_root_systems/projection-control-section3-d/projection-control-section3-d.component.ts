import { Component, EventEmitter, Output } from '@angular/core';
import { ProjectionManagerService } from 'src/app/display/projections/projection-manager.service';
import { Colors } from 'src/app/display/values/colors';
import MatrixND from 'src/app/logic/maths/nD/MatrixND';
import PointND from 'src/app/logic/maths/nD/PointND';

@Component({
  selector: 'app-projection-control-section3-d',
  templateUrl: './projection-control-section3-d.component.html',
  styleUrls: ['./projection-control-section3-d.component.sass']
})
export class ProjectionControlSection3DComponent {
  zw: number = Math.PI;
  yw: number = Math.PI;
  yz: number = Math.PI;
  xw: number = Math.PI;
  xz: number = Math.PI;
  xy: number = Math.PI;
  Colors = Colors;
  constructor(private projectionManager: ProjectionManagerService){
  }
  changeAngle(axis:
    'zw' | 'yw' | 'yz'| 'xw'|'xz'|'xy', newValue: number) {
    switch (axis) {
      case 'zw':
        this.zw = newValue;
        break;
      case 'yw':
        this.yw = newValue;
        break;
      case 'yz':
        this.yz = newValue;
        break;
      case 'xw':
        this.xw = newValue;
        break;
      case 'xz':
        this.xz = newValue;
        break;
      case 'xy':
        this.xy = newValue;
        break;
    }
    this.applyRotation();
  }
  applyRotation(){
    let normalVector = new PointND([0,0,0,1])
    let Rzw = new MatrixND([
      [Math.cos(this.zw), -Math.sin(this.zw), 0, 0],
      [Math.sin(this.zw), Math.cos(this.zw), 0, 0],
      [0,0,1,0],
      [0,0,0,1],
    ])
    let Ryw = new MatrixND([
      [Math.cos(this.yw),  0, -Math.sin(this.yw), 0],
      [0,1,0,0],
      [Math.sin(this.yw), 0, Math.cos(this.yw), 0],
      [0,0,0,1],
    ])
    let Ryz = new MatrixND([
      [Math.cos(this.yz),  0, 0, -Math.sin(this.yz)],
      [0,1,0,0],
      [0,0,1,0],
      [Math.sin(this.yz), 0, 0, Math.cos(this.yz)],
    ])
    let Rxw = new MatrixND([
      [1,0,0,0],
      [0, Math.cos(this.xw), -Math.sin(this.xw), 0],
      [0, Math.sin(this.xw), Math.cos(this.xw), 0],
      [0,0,0,1],
    ])

    let Rxz = new MatrixND([
      [1,0,0,0],
      [0, Math.cos(this.xz), 0, -Math.sin(this.xz)],
      [0,0,1,0],
      [0, Math.sin(this.xz), 0, Math.cos(this.xz)],
    ])

    let Rxy = new MatrixND([
      [1,0,0,0],
      [0,1,0,0],
      [0, 0, Math.cos(this.xy), -Math.sin(this.xy)],
      [0, 0, Math.sin(this.xy), Math.cos(this.xy)],
    ])

    let matrixProduct = Rzw.multiply(Ryw)
    .multiply(Ryz).multiply(Rxw).multiply(Rxz).multiply(Rxy)
    this.projectionManager.setRotationMatrix(matrixProduct);
  }
}
