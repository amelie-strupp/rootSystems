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
    getDual(){
        let vector = this.getVector();
        let dotProduct = vector.dotProduct(vector)
        return new Point3D(2*vector.x*1/dotProduct, 2*vector.y*1/dotProduct, 2*vector.z*1/dotProduct);
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
    getFundamentalWeylChamber(){
          const planes: Array<THREE.Plane> = [];
          const planeObjects: Array<Hyperplane3D> = [];

          for(let root of this._simpleRoots){
            const hyperplane = this.getHyperplaneToRoot(root)
            planes.push(new THREE.Plane(
                hyperplane.getNormalVectorAsThreeVector(), 1000
                ));
                planeObjects.push(hyperplane)
          }
          let cutPoints: Array<Point3D> = [];
          let chamberEdgePoints: Array<Point3D> = [];
          let index = 0;
          // Determine cuts of planes
          for(let plane1 of planes){
            for(let plane2 of planes){
                if(plane1 != plane2){
                    let intersection = planeObjects[index].getIntersectionWithOtherPlanes(plane2);
                    let direction = intersection![1];
                    let directionPoint = new Point3D(direction.x, direction.y, direction.z);
                    cutPoints.push(directionPoint)
                    
                }
            }
            index++;
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
