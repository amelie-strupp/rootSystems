import Point3D from "../../maths_objects/3D/Point3D";
import * as THREE from "three";
import { Colors } from "src/app/display/values/colors";
import { Vector3 } from "three";

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
        return new THREE.Vector3(this.normalVector.x, this.normalVector.y, this.normalVector.z).normalize()
    }
    getIntersectionWithTwoOtherPlanes(other1: THREE.Plane, other2: THREE.Plane){
        let line = this.getIntersectionWithOtherPlanes(other1);
        if(line == null){return;}
        const lineDirection = line![1];
        const linePoint = line![0];
        const startVector = new Vector3(
          lineDirection.x*100 + linePoint.x,
          lineDirection.y*100 + linePoint.y,
          lineDirection.z*100 + linePoint.z)
          const endVector = new Vector3(
            lineDirection.x*-1000 + linePoint.x,
          lineDirection.y*-1000 + linePoint.y,
          lineDirection.z*-1000 + linePoint.z)
        
        var threeLine = new THREE.Line3(
            startVector,
            endVector
        );
        let result = new Vector3();
        other2.intersectLine(threeLine, result);
        return new Point3D(result.x, result.y, result.z);
    }
    getIntersectionLineWithOtherPlane(other: THREE.Plane){
      const lineData = this.getIntersectionWithOtherPlanes(other);
      if(lineData == null){
        return null;
      }
      const lineDirection = lineData![1];
      const linePoint = lineData![0];
      
      const startVector = new Vector3(
        lineDirection.x*100 + linePoint.x,
        lineDirection.y*100 + linePoint.y,
        lineDirection.z*100 + linePoint.z)
        const endVector = new Vector3(
          lineDirection.x*-1000 + linePoint.x,
        lineDirection.y*-1000 + linePoint.y,
        lineDirection.z*-1000 + linePoint.z)
      
      const threeLine = new THREE.Line3(
          startVector,
          endVector
      );
      return threeLine;
    }
    getIntersectionWithOtherPlanes(other: THREE.Plane){
        let p1 = new THREE.Plane(
            this.getNormalVectorAsThreeVector(),
            this.point.length()
            );
        /*
          This method helps finding a point on the intersection between two planes.
          Depending on the orientation of the planes, the problem could solve for the
          zero point on either the x, y or z axis
          
          */
          function solveIntersectingPoint(zeroCoord: any, A: any, B:any, p1:any, p2:any){
            var a1 = p1.normal[A]
            var b1 = p1.normal[B]
            var d1 = p1.constant
        
            var a2 = p2.normal[A]
            var b2 = p2.normal[B]
            var d2 = p2.constant
        
            var A0 = ((b2 * d1) - (b1 * d2)) / ((a1 * b2 - a2 * b1))
            var B0 = ((a1 * d2) - (a2 * d1)) / ((a1 * b2 - a2 * b1))
        
            var point:any = new THREE.Vector3()
            point[zeroCoord] = 0
            point[A] = A0
            point[B] = B0
        
            return point
          }
                    // the cross product gives us the direction of the line at the intersection
            // of the two planes, and gives us an easy way to check if the two planes
            // are parallel - the cross product will have zero magnitude
            var direction = new THREE.Vector3().crossVectors(p1.normal, other.normal)
            var magnitude = direction.distanceTo(new THREE.Vector3(0, 0, 0))
            if (magnitude === 0) {
              return null
            }
          
            // now find a point on the intersection. We use the 'Direct Linear Equation'
            // method described in the linked page, and we choose which coordinate
            // to set as zero by seeing which has the largest absolute value in the
            // directional vector
          
            var X = Math.abs(direction.x)
            var Y = Math.abs(direction.y)
            var Z = Math.abs(direction.z)
          
            var point
          
            if (Z >= X && Z >= Y) {
              point = solveIntersectingPoint('z', 'x', 'y', p1, other)
            } else if (Y >= Z && Y >= X){
              point = solveIntersectingPoint('y', 'z', 'x', p1, other)
            } else {
              point = solveIntersectingPoint('x', 'y', 'z', p1, other)
            }
          
            return [point, direction]
    }
    getPlaneAsThreePlane(){
        return new THREE.Plane(
            this.getNormalVectorAsThreeVector(),this.point.length()

            );

    }
}