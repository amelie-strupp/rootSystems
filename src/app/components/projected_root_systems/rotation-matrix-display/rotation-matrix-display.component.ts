import { ProjectionManagerService, ProjectionType } from 'src/app/display/projections/projection-manager.service';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import MatrixND from 'src/app/logic/maths/nD/MatrixND';
import PointND from 'src/app/logic/maths/nD/PointND';

@Component({
  selector: 'app-rotation-matrix-display',
  templateUrl: './rotation-matrix-display.component.html',
  styleUrls: ['./rotation-matrix-display.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RotationMatrixDisplayComponent {
  rotationMatrix: MatrixND = MatrixND.identity(3);
  rotationNormals: Array<String> = []
  constructor(private projectionManager: ProjectionManagerService, private cd: ChangeDetectorRef){
    this.rotationNormals = this.getNormals();
    projectionManager.rotationsChanged.subscribe(() => {
      this.rotationMatrix = this.projectionManager.rotationMatrix;
      if(projectionManager.projectionType == ProjectionType.orthogonal){
          this.rotationNormals = this.getNormals();
      }else{
        this.rotationNormals = []
      }
      this.cd.detectChanges();
    })
  }

  getNormals(){
    return this.projectionManager.normals.map(n => n.components.map((c: number) => c.toFixed(1) != "-0.0" ? c.toFixed(1): "0.0").join(', '));
  }
}
