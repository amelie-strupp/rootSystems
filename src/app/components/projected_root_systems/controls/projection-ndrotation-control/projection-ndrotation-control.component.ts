import { Component, Input } from '@angular/core';
import { ProjectionManagerService } from 'src/app/display/projections/projection-manager.service';
import MatrixND from 'src/app/logic/maths/nD/MatrixND';

@Component({
  selector: 'app-projection-ndrotation-control',
  templateUrl: './projection-ndrotation-control.component.html',
  styleUrls: ['./projection-ndrotation-control.component.sass']
})
export class ProjectionNDRotationControlComponent {
  angles: Array<number> = [];
  sliders: Array<Array<number>> = [];
  rotationMatrix!: MatrixND;
  @Input() dimension: number = 4;
  @Input() numberOfSliders: number = 2;
  constructor(private projectionManager: ProjectionManagerService){
    this.generateSliders();
  }
  ngOnInit(){
    this.angles = Array.apply(null, Array(this.sliders.length)).map((a) => 0)
    this.rotationMatrix = MatrixND.identity(this.dimension);
  }
  generateSliders(){
    for(let i = 1; i <= this.dimension; ++i){
      for(let j = 1; j < i; ++j){
        this.sliders.push([i,j]);
      }
    }
  }
  setAngle(index: number, angle: number){
    this.angles[index] = angle;
    this.generateMatrix();
  }
  generateMatrix(){
    let m = MatrixND.identity(this.dimension);
    let i = 0;
    for(let slider of this.sliders){
      let rotationMatrix = MatrixND.basicRotationMatrix(this.dimension, slider[0]-1, slider[1]-1,
        (this.angles[i]/360)*Math.PI*2);
        m = m.multiply(rotationMatrix);
      i++;
      console.log(rotationMatrix);
    }
    this.rotationMatrix = m;
    this.projectionManager.setRotationMatrix(this.rotationMatrix);
  }
}
