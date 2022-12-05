import { RootSystems3D } from "src/app/data/rootSystems3D";
import Point3D from "../../maths_objects/3D/Point3D";
import { Hyperplane3D } from "./Hyperplane3D";
import * as THREE from "three";
import { WeylChamber } from "../2D/WeylChamber";
import WeylChamber3D from "../../maths_objects/3D/WeylChamber3D";
import { Matrix3, Vector3 } from "three";

export class Root3D{
    direction: Point3D;
    length: number;
    isSimple: boolean = false;
    isPositive: boolean = true;
    name: string;
    constructor(d:
        {
            vector: Point3D,
            isSimple: boolean,
            isPositive?: boolean,
        }){
        this.direction = d.vector.normalized();
        this.length = d.vector.length();
        this.isSimple = d.isSimple;
        this.name = `(${this.getVector().x} ${this.getVector().y} ${this.getVector().z})`;
        this.isPositive = d.isPositive != undefined ? d.isPositive : true;
    }
    getNegative(){
        return new Root3D({
            vector: this.direction.getNegative().stretchedBy(this.length),
            isSimple: false,
            isPositive: !this.isPositive,
        })
    }
    plus(other: Root3D){
        const newPoint = new Point3D(this.direction.x*this.length + other.direction.x*other.length,
            this.direction.y*this.length + other.direction.y*other.length, this.direction.z*this.length + other.direction.z*other.length);
        return new Root3D({
            vector: newPoint,
            isSimple: false,
        })
    }
    times(number: number){
        return new Root3D({
            vector: this.direction.normalized().stretchedBy(this.length*number),
            isSimple: false,
        })
    }
    equal(other: Root3D){
        return other.direction.equal(this.direction) && Math.abs(other.length - this.length) < 0.01;
    }
    getVector(){
        return new Point3D(
            this.direction.x*this.length,
            this.direction.y*this.length,
            this.direction.z*this.length,
        )
    }
    getHyperplane(){
        return new Hyperplane3D(this.direction, Point3D.getZero())
    }
}
export default class RootSystem3D{
    type: RootSystems3D
    private _simpleRoots: Array<Root3D> = [];
    private _positiveRoots: Array<Root3D> = [];
    coxeterMatrix: Array<number> = [];
    // The minimum angle occuring in this root system
    constructor(
        type: RootSystems3D,
        coxeterMatrix: Array<number>,
        // simpleRoots: Array<Root3D>,
        positiveRoots: Array<Root3D>){
        this.type = type;
        this.coxeterMatrix = coxeterMatrix;
        // this._simpleRoots = simpleRoots;
        this._positiveRoots = positiveRoots;
        this._simpleRoots = this._positiveRoots.filter((root)=>root.isSimple);
    }

    getBase(){
        return this._simpleRoots;
    }
    getRoots(){
        let roots: Array<Root3D> = [...this._positiveRoots];
        this._positiveRoots.forEach((root: Root3D) => {
            roots.push(root.getNegative());
            })
        return roots;
    }
    getPositiveRoots(){
        return this._positiveRoots;
    }
    getNegativeRoots(){
        let roots: Array<Root3D> = [...this._positiveRoots];
        this._positiveRoots.forEach((root: Root3D) => {
            roots.push(root.getNegative());
            })
        return roots;
    }
    getHyperplanesToSimpleRoots(){
        const hyperplanes: Array<Hyperplane3D> = [];
        for(let root of this._simpleRoots){
            if(root.direction.x >= 0)
            hyperplanes.push(this.getHyperplaneToRoot(root));
        }
        return hyperplanes;
    }
    getAllHyperplanes(){
        let allRoots = this.getRoots();
        const hyperplanes: Array<Hyperplane3D> = [];
        for(let root of allRoots){
            if(root.direction.x >= 0)
            hyperplanes.push(this.getHyperplaneToRoot(root));
        }
        return hyperplanes;
    }
    getHyperplaneToRoot(root: Root3D){
        return new Hyperplane3D(root.direction, Point3D.getZero())
    }
    getIntersectionOfPlanes(p1: THREE.Plane, p2: THREE.Plane){
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
            var direction = new THREE.Vector3().crossVectors(p1.normal, p2.normal)
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
              point = solveIntersectingPoint('z', 'x', 'y', p1, p2)
            } else if (Y >= Z && Y >= X){
              point = solveIntersectingPoint('y', 'z', 'x', p1, p2)
            } else {
              point = solveIntersectingPoint('x', 'y', 'z', p1, p2)
            }
          
            return [point, direction]
          

          

    }
    getFundamentalWeylChamber(){

          const planes: Array<THREE.Plane> = [];
          for(let root of this._simpleRoots){
            const hyperplane = this.getHyperplaneToRoot(root)
            planes.push(new THREE.Plane(
                hyperplane.getNormalVectorAsThreeVector(), 1000
                ));
          }
          let cutPoints: Array<Point3D> = [];
          let chamberEdgePoints: Array<Point3D> = [];
          // Determine cuts of planes
          for(let plane1 of planes){
            for(let plane2 of planes){
                if(plane1 != plane2){
                    let intersection = this.getIntersectionOfPlanes(plane1, plane2);
                    let direction = intersection![1];
                    let directionPoint = new Point3D(direction.x, direction.y, direction.z);
                    cutPoints.push(directionPoint)
                }
            }
          }
          for(let point of cutPoints){
            for(let root of this._simpleRoots){
                if(root.direction.dotProduct(point)>=0.01){
                    chamberEdgePoints.push(point);
                }
            }
          }
          const chamber = new WeylChamber3D({edgePoints: chamberEdgePoints});
          return chamber;
    }
    getLengthOfTransformation(transformations: Array<Root3D>){
        let finalTransformationMatrix = new Matrix3().identity();
        for(let transformation of transformations){
            const {x,y,z} = transformation.getVector().normalized();
            let transformationMatrix = new Matrix3(
                ).fromArray([
                // First Row
                    1-2*x*x,
                    -2*x*y,
                    -2*x*z,
                    // Second Row
                    -2*x*y,
                    1-2*y*y,
                    -2*y*z,
                    // Third Row
                    -2*x*z,
                    -2*y*z,
                    1-2*z*z,
                ]
                );
            finalTransformationMatrix = transformationMatrix.multiply(finalTransformationMatrix);
        }
        const positiveRoots = this.getPositiveRoots();
        let transformedPositiveRoots = positiveRoots.map((root) => {
            const rootVector = root.getVector();
            const vector = new Vector3(rootVector.x, rootVector.y, rootVector.z).applyMatrix3(finalTransformationMatrix)
            return new Root3D({vector: new Point3D(vector.x, vector.y, vector.z), isSimple: false})
        })
        const rootsThatChangedToNegative = transformedPositiveRoots.filter((transformedRoot) =>
            positiveRoots.every((root) => !root.equal(transformedRoot))
        );

        return rootsThatChangedToNegative.length;
    }
}
