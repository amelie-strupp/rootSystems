import { Matrix3, Vector3 } from "three";
import Point from "../../maths_objects/2D/Point";

export class WeylChamber{
    startAngle: number;
    spanningAngle: number;
    constructor(startAngle: number, angle: number){
        this.spanningAngle = angle;
        // Make sure the angle is not larger than  2*pi or negative
        while(startAngle >= Math.PI*2){
            startAngle -= Math.PI*2;
        }
        while(startAngle <= 0){
            startAngle += Math.PI*2;
        }
        if(Math.abs(startAngle-Math.PI*2)<0.1){
            startAngle = 0;
        }
        this.startAngle = startAngle;
    }
    // Returns the bounding vector associated with the start angle
    getStartBoundingVector(){
        return new Point(Math.cos(this.startAngle), Math.sin(this.startAngle));
    }
    // Returns the bounding vector associated with the end wall

    getEndBoundingVector(){
        return new Point(Math.cos(this.startAngle + this.spanningAngle) , Math.sin(this.startAngle + this.spanningAngle));

    }
    getTransformedWeylChamber(matrix: Matrix3){
        const vectorStart = new Vector3(Math.cos(this.startAngle), Math.sin(this.startAngle), 0);
        const transformedStartVector = vectorStart.applyMatrix3(matrix);
        let newStartAngle = Math.atan(transformedStartVector.y/transformedStartVector.x);
        if(transformedStartVector.x < 0){
            newStartAngle += Math.PI;
        }
        const vectorEnd = new Vector3(Math.cos(this.spanningAngle + this.startAngle), Math.sin(this.spanningAngle + this.startAngle), 0);
        const transformedEndVector = vectorEnd.applyMatrix3(matrix);
        let newEndAngle = Math.atan(transformedEndVector.y/transformedEndVector.x);
        if(transformedEndVector.x < 0){
            newEndAngle += Math.PI;
        }
        console.log("Start", newStartAngle);
        console.log("End", newEndAngle);
        if(newStartAngle < newEndAngle)
        return new WeylChamber(
            newStartAngle,
            newEndAngle - newStartAngle
            )
        else{
        return new WeylChamber(
            newEndAngle,
            newStartAngle - newEndAngle
            )
        }
    }
}
