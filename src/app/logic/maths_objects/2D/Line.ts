import { Colors } from "src/app/display/values/colors";
import Point from "./Point"

export default class Line{
    start: Point
    end: Point
    color: string;
    width: number;
    dashed: boolean = false;
    dashString: string = '';
    opacity: number = 1;


    constructor(d: {start: Point, end: Point, color?: string, width?: number, dashed?: boolean, dashString?: string, opacity?: number}){
        this.start = d.start;
        this.end = d.end;
        this.color = d.color ?? Colors.white;
        this.width = d.width ?? 3;
        this.dashed = d.dashed != null ? d.dashed : false;
        this.dashString = d.dashString != null ? d.dashString : "";
        this.opacity = d.opacity ?? 1;
    }
}