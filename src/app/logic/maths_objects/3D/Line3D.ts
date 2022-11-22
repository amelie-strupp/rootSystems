import Point3D from "./Point3D";

export default class Line3D{
    start: Point3D
    end: Point3D
    color: string;
    width: number;
    dashed: boolean = false;
    dashString: string = '';

    constructor(d: {start: Point3D, end: Point3D, color: string, width: number, dashed?: boolean, dashString?: string}){
        this.start = d.start;
        this.end = d.end;
        this.color = d.color;
        this.width = d.width;
        this.dashed = d.dashed != null ? d.dashed : false;
        this.dashString = d.dashString != null ? d.dashString : "";
    }
}