import { Matrix3, Vector3 } from "three";
import Line from "../../maths_objects/2D/Line";
import Point from "../../maths_objects/2D/Point";

export class Hyperplane{
    angle: number;
    anchorPoint: Point = new Point(0,0);
    constructor(angle: number, anchorPoint?: Point){
        // Make sure the angle is not larger than  2*pi or negative
        while(angle > Math.PI*2){
            angle -= Math.PI*2;
        }
        while(angle < 0){
            angle += Math.PI*2;
        }
        this.angle = angle;
        this.anchorPoint = anchorPoint ?? new Point(0,0);
    }
    getNormalVector(){
        return new Point(Math.cos(this.angle + Math.PI/2), Math.sin(this.angle + Math.PI/2)).normalized();
    }
    withTransformation(matrix: Matrix3){
        const vector = this.getNormalVector();
        const vector3 = new Vector3(vector.x, vector.y, 0);
        const transformedVector = vector3.applyMatrix3(matrix);
        const newNormalVector = new Point(transformedVector.x, transformedVector.y);
        console.log(newNormalVector.x);
        return new Hyperplane(Math.atan(newNormalVector.y/newNormalVector.x) + Math.PI/2);
    }
    getDirection(){
        return new Point(Math.cos(this.angle), Math.sin(this.angle))
    }
    getDirectionLine(length = 100){
        let direction = this.getDirection();
        return new Line({start: this.anchorPoint.add(
            direction.multiply(length)
        ), end: this.anchorPoint.add(
            direction.multiply(-length)
        )});
    }
    reflect(point: Point){
        var reflect = function(p: Point, line: Line) {
            let dx, dy, a, b, x, y;
    
            dx = line.end.x - line.start.x;
            dy = line.end.y - line.start.y;
            a = (dx * dx - dy * dy) / (dx * dx + dy * dy);
            b = 2 * dx * dy / (dx * dx + dy * dy);
            x = a * (p.x - line.start.x) + b * (p.y - line.start.y) + line.start.x; 
            y = b * (p.x - line.start.x) - a * (p.y - line.start.y) + line.start.y;
    
            return new Point(x,y);
        }
        return reflect(point, this.getDirectionLine());
    }
    moveBy(point: Point){
        return new Hyperplane(this.angle, this.anchorPoint.add(point));
    }
}