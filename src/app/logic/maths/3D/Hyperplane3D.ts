import Point3D from "../../maths_objects/3D/Point3D";
import * as THREE from "three";
import { Colors } from "src/app/display/values/colors";

export class Hyperplane3D{
    normalVector: Point3D;
    point: Point3D
    color: string;
    constructor(normalVector: Point3D, point = Point3D.getZero(), color = Colors.white){
        this.normalVector = normalVector;
        this.point =  point;
        this.color = color;
    }
    getNormalVectorAsThreeVector(){
        return new THREE.Vector3(this.normalVector.x, this.normalVector.y, this.normalVector.z)
    }
    getCuttingPoints(other1: Hyperplane3D, other2: Hyperplane3D){
        
    }
}