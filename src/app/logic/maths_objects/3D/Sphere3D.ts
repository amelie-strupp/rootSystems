import { colorNumber } from "src/app/display/values/colors";
import Point3D from "./Point3D";

export default class Sphere{
    center: Point3D;
    radius: number;
    color: string;
    get colorNumber(): number{
        return colorNumber(this.color);
    };
    constructor(d: {
        center: Point3D,
        radius: number,
        color: string
    }){
        this.center = d.center;
        this.radius = d.radius;
        this.color = d.color;
    }
    
}