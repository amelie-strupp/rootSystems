import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';
import Point from '../../logic/maths_objects/2D/Point';

@Injectable({
  providedIn: 'root'
})
export class CoordinateSystemService {
  topOffset: number = -100;
  constructor(private c: CanvasService) { }
  getCenterPoint(){
    return new Point(this.c.width/2, this.c.height/2 + this.c.canvas.offsetTop);
  }
  getCoordinateSystemDimensions(){
    const distances =  {
      left: -this.convertToMathsCoordinates(new Point(0, this.c.height/2)).x,
      right: this.convertToMathsCoordinates(new Point(this.c.width, this.c.height/2)).x,
      top: -this.convertToMathsCoordinates(new Point(this.c.width/2, 0)).y,
      bottom: this.convertToMathsCoordinates(new Point(this.c.width/2, this.c.height)).y
    }
    return {
      left: distances.left,
      right: distances.right,
      top: distances.top,
      bottom: distances.bottom,
      height: distances.top + distances.bottom,
      width: distances.left + distances.right
    }
  }
  getCrossLength(){
    const dim = this.getCoordinateSystemDimensions();
    return Math.sqrt(Math.pow(dim.width,2) + Math.pow(dim.height,2));
  }
  // Converts a point given in "maths coordinates" to a point on the canvas
  convertToPaintCoordinates(point: Point){
    let centerPoint = this.getCenterPoint()
    let xOffset = point.x * this.c.pixelsInOneUnit + centerPoint.x;
    let yOffset = centerPoint.y - point.y * this.c.pixelsInOneUnit;
    return new Point(xOffset, yOffset);
  }
  // Converts a point given in canvas coordinates to a point in "maths coordinates"
  convertToMathsCoordinates(point: Point){
    let centerPoint = this.getCenterPoint()
    let xOffset = (point.x - centerPoint.x) / this.c.pixelsInOneUnit;
    let yOffset =  (point.y - centerPoint.y) / this.c.pixelsInOneUnit;
    return new Point(xOffset, yOffset);
  }
}
