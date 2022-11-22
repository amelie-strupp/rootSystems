import Point3D from "./Point3D";

export default class WeylChamber3D{
    centerPoint: Point3D = Point3D.getZero();
    edgePoints: Array<Point3D> = [];
    size: number = 10000;
    constructor(d:{
        edgePoints: Array<Point3D>,
        size?: number;
        }){
        this.size = d.size != undefined ? d.size: this.size;
        this.edgePoints = d.edgePoints.map((point)=>point.normalized())
    }
}