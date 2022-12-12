import Line from "../../maths_objects/2D/Line";
import Point from "../../maths_objects/2D/Point";
import { Hyperplane } from "./Hyperplane";
import RootSystem2D from "./RootSystem";

export class Alcove{
    walls: Array<Line> = [];
    constructor(walls: Array<Line>){
        this.walls = walls;
    }
    get points(){
        let points = this.walls.map((wall) => wall.start);
        points.push(this.walls[this.walls.length-1].start);
        return points;
    }
    static fromPoints(points: Array<Point>){
        return new Alcove([
            new Line({start: points[0], end: points[1]}),
            new Line({start: points[1], end: points[2]}),
            new Line({start: points[2], end: points[3]}),

        ]);
    }
    static fromRootSystem(rootSystem: RootSystem2D){
            // line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
            // Determine the intersection point of two line segments
            // Return FALSE if the lines don't intersect
            function intersect(line1: Line, line2: Line) {

                // Check if none of the lines are of length 0
                if ((line1.start.x === line1.end.x &&
                    line1.start.y === line1.end.y) || (
                    line2.start.x === line2.end.x && 
                    line2.start.y === line2.end.y)) {
                    return false
                }
            
                let denominator = ((line2.end.y - line2.start.y) * (line1.end.x - line1.start.x) -
                (line2.end.x - line2.start.x) * (line1.end.y - line1.start.y))
            
                // Lines are parallel
                if (denominator === 0) {
                    return false
                }
            
                let ua = ((line2.end.x - line2.start.x) * (line1.start.y - line2.start.y) - (line2.end.y - line2.start.y) * (line1.start.x - line2.start.x)) / denominator
                let ub = ((line1.end.x - line1.start.x) * (line1.start.y - line2.start.y) - (line1.end.y - line1.start.y) * (line1.start.x - line2.start.x)) / denominator
            
                // is the intersection along the segments
                if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
                    return false
                }
            
                // Return a object with the x and y coordinates of the intersection
                let x = line1.start.x + ua * (line1.end.x - line1.start.x)
                let y = line1.start.y + ua * (line1.end.y - line1.start.y)
            
                return new Point(x,y)
            }
        if(rootSystem.hasHighestRoot()){
            let highestRoot = rootSystem.getHighestRoot();
            let hyperplane = highestRoot!.getHyperplane();
            let direction = new Point(Math.cos(hyperplane.angle), Math.sin(hyperplane.angle))
            let point = direction.add(highestRoot!.getVector());
            // Determining the Wall of the upper bound of the alcove
            let centerWall = new Line({start: point.add(
                direction.multiply(100)
            ), end: point.add(
                direction.multiply(-100)
            )});
            let weylChamber = rootSystem.getFundamentalWeylChamber();
            let leftWallVector = weylChamber.getStartBoundingVector();
            let rightWallVector = weylChamber.getEndBoundingVector();
            let rightWall = new Line({start: rightWallVector.multiply(100), end: rightWallVector.multiply(-100)});
            let leftWall = new Line({start: leftWallVector.multiply(100), end: leftWallVector.multiply(-100)});

            // The intersection of the right and left wall is always in the zero point
            let intersection1 = new Point(0,0)
            let intersection2 = intersect(rightWall, centerWall) as Point;
            let intersection3 = intersect(leftWall, centerWall) as Point;
            return new Alcove([
                new Line({start: intersection1, end: intersection2}),
                new Line({start: intersection2, end: intersection3}),
                new Line({start: intersection3, end: intersection1}),

            ]);
        }
        return null;
    }
}