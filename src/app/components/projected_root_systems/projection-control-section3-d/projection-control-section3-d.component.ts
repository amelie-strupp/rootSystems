import { Component, EventEmitter, Output } from '@angular/core';
import { Colors } from 'src/app/display/values/colors';

@Component({
  selector: 'app-projection-control-section3-d',
  templateUrl: './projection-control-section3-d.component.html',
  styleUrls: ['./projection-control-section3-d.component.sass']
})
export class ProjectionControlSection3DComponent {
  angleX1: number = 0;
  angleX2: number = 0;
  angleY1: number = 0;
  angleY2: number = 0;
  @Output() hyperplaneChanged: EventEmitter<void> = new EventEmitter();
  Colors = Colors;
  changeAngle(axis: 'y1' | 'x1' | 'y2'| 'x2', newValue: number) {
    switch (axis) {
      case 'y1':
        this.angleY1 = newValue;
        break;
      case 'y2':
        this.angleY2 = newValue;
        break;
      case 'x1':
        this.angleX1 = newValue;
        break;
      case 'x2':
        this.angleX2 = newValue;
    }
    // this.hyperplaneChanged.emit(this.emitNewHyperplane());
  }
}
