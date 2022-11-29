import { Matrix3, Vector3 } from "three";
import Point from "../../maths_objects/2D/Point";

export class Hyperplane{
    angle: number;
    constructor(angle: number){
        // Make sure the angle is not larger than  2*pi or negative
        while(angle > Math.PI*2){
            angle -= Math.PI*2;
        }
        while(angle < 0){
            angle += Math.PI*2;
        }
        this.angle = angle;
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
}