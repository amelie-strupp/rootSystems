import { Hyperplane } from 'src/app/logic/maths/2D/Hyperplane';
import { Injectable } from "@angular/core";
import { RootSystemService } from "src/app/logic/maths/2D/root-system.service";
import { Root } from "src/app/logic/maths/2D/RootSystem";
import MatrixND from "src/app/logic/maths/nD/MatrixND";
import PointND from "src/app/logic/maths/nD/PointND";
import Circle from "src/app/logic/maths_objects/2D/Circle";
import Line from "src/app/logic/maths_objects/2D/Line";
import Point from "src/app/logic/maths_objects/2D/Point";
import { CoordinateSystemService } from "src/app/services/2D/coordinate-system.service";
import { PaintLayer, PaintService } from "src/app/services/2D/paint.service";
import { Colors } from "../../values/colors";
import Painter from "./Painter.interface";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class WeightPainter implements Painter{
  repaintEvent: Subject<void> = new Subject();
  constructor(
      private rootSystem: RootSystemService,
      private coord: CoordinateSystemService,
      private painter: PaintService
  ){

  }
  paint(layer?: PaintLayer): void {
    let lines: Array<Line> = [];
    // for(let root of this.rootSystem.getPositiveRoots()){
      this.paintAffineHyperplanes();
    // }
    this.paintDominantIntegralWeights();
  }
  paintDominantIntegralWeights(){
    let elements: Array<Point> = []
    const dominantElementTraversalAlgorithm = (currentElement: Point, halfVector: Point) => {
      let newElement = currentElement.add(halfVector);
      length = newElement.length();
      let inArray = elements.some((e) => e.equal(newElement))
      if (length < 10 && !inArray) {
        elements.push(newElement);
        for (let w of [
          ...this.rootSystem.rootSystem.fundamentalWeights, ...this.rootSystem.rootSystem.fundamentalWeights.map((v)=>v.multiply(-1))]) {
          dominantElementTraversalAlgorithm(newElement, w);
        }
      }
      return;
    };
    for (let halfVector of [...this.rootSystem.rootSystem.fundamentalWeights, ...this.rootSystem.rootSystem.fundamentalWeights.map((v)=>v.multiply(-1))]) {
      dominantElementTraversalAlgorithm(new Point(0,0), halfVector);
    }
    let base = this.rootSystem.getBase().map((b)=>b.getVector());
    for(let v of elements){
      if(base.every((b)=>{ return b.dot(v)>=-0.05})){
        this.painter.paintCircle(
          new Circle({center: new Point(v.x, v.y), color: Colors.purple, radius: 8}), PaintLayer.layer4).click(() => {
            this.repaintEvent.next();
            this.paintWeightToHighestWeight(v);
          })
      }else{
        this.painter.paintCircle(
        new Circle({center: new Point(v.x, v.y), color: Colors.purple400, radius: 8}), PaintLayer.layer4)

      }

    }
  }
  paintWeightToHighestWeight(heighestWeight: Point){
    let weights = this.rootSystem.rootSystem.getWeightsToHighestWeight(new PointND([heighestWeight.x,heighestWeight.y]));
    for(let weight of weights){
      this.painter.paintCircle(
        new Circle({center: new Point(weight.get(0), weight.get(1)), color: Colors.palePurple200, radius: 20}), PaintLayer.layer3)
    }
  }
      // Used to paint the affine hyperplanes to a provided root
      paintAffineHyperplanes(){
        let color = Colors.palePurple300;
        const maxLength = this.coord.getCrossLength()/2;
        let points = [new Point(1,0), new Point(0.5, 0.5)]
        for(let i = -5; i <= 5; ++i){
                const line = new Line({
                    start: new Point(points[0].x, points[0].y).add(new Point(1,0)),
                    end: new Point(8*points[0].x-points[0].x, 8*points[0].y-points[0].y).add(new Point(1,0)),
                    color: color,
                    width: 1,
                })
        this.painter.paintLine(line, PaintLayer.layer2)

        }
}
    // paintDominantIntegralWeights(lines: Array<Line>){
    //         // line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
    //         // Determine the intersection point of two line segments
    //         // Return FALSE if the lines don't intersect
    //         function intersect(line1: Line, line2: Line) {
    //           let x1 = line1.start.x
    //           let x2 = line1.end.x
    //           let y1 = line1.start.y
    //           let y2 = line1.end.y
    //           let x3 = line2.start.x
    //           let x4 = line2.end.x
    //           let y3 = line2.start.y
    //           let y4 = line2.end.y
    //           // Check if none of the lines are of length 0
    //           if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    //             return false
    //           }

    //           let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    //           // Lines are parallel
    //           if (denominator === 0) {
    //             return false
    //           }

    //           let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    //           let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    //           // is the intersection along the segments
    //           if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    //             return false
    //           }

    //           // Return a object with the x and y coordinates of the intersection
    //           let x = x1 + ua * (x2 - x1)
    //           let y = y1 + ua * (y2 - y1)

    //           return new Point(x,y);
    //         }
    //       let dominantWeights: Array<Point> = [];
    //       for(let line1 of lines){
    //         for(let line2 of lines){
    //           if(line1 != line2){
    //             let line3 = new Line({start: line1.start, end: line1.end});
    //             let line4 = new Line({start: line2.start, end: line2.end});
    //             let intersection = intersect(line3, line4);
    //             if(intersection != false){
    //               dominantWeights.push(intersection);
    //             }
    //           }
    //         }
    //       }
    //       for(let weight of dominantWeights){
    //         console.log(weight);
    //         this.painter.paintCircle(
    //           new Circle({center: new Point(weight.x, weight.y), color: Colors.yellow, radius: 4}), PaintLayer.layer4)
    //       }
    // }

}
