import { RootSystems2D } from "src/app/data/rootSystems";
import { Matrix3, Vector3 } from "three";
import Point from "../../maths_objects/2D/Point";
import { Hyperplane } from "./Hyperplane";
import { WeylChamber } from "./WeylChamber";

export class Root{
    angle: number;
    length: number;
    isSimple: boolean = false;
    isPositive: boolean = true;
    constructor(d:
        {
            angle: number,
            length: number,
            isSimple: boolean,
            isPositive?: boolean
        }){
        this.angle = d.angle;
        this.length = d.length;
        this.isSimple = d.isSimple;
        this.isPositive = d.isPositive != null ? d.isPositive : true;
    }
    equal(other: Root){
        return other.getVector().equal(this.getVector())
    }
    getNegative(){
        return new Root({
            angle: this.angle + Math.PI,
            length: this.length,
            isSimple: false,
            isPositive: false
        })
    }
    getVector(){
        return new Point(
            Math.cos(this.angle)*this.length,
            Math.sin(this.angle)*this.length
        )
    }
    getVectorUnderTransformation(matrix: Matrix3){
        const vector = this.getVector();
        const vector3 = new Vector3(vector.x, vector.y, 0);
        const transformedVector = vector3.applyMatrix3(matrix);
        return new Point(transformedVector.x, transformedVector.y);
    }
    get name(){
        let vector = this.getVector();
        return `(${Math.round(vector.x)} ${Math.round(vector.y)})`
    }
    getHyperplane(){
        return new Hyperplane(this.angle+Math.PI/2);
    }
}

export default class RootSystem2D{
    type: RootSystems2D
    private _positiveRoots: Array<Root> = [];
    // The minimum angle occuring in this root system
    private _minimumAngle: number;
    coxeterMatrix: Array<number> = [];
    constructor(
        type: RootSystems2D,
        coxeterMatrix: Array<number>,
        simpleRoots: Array<Root>,
        minimumAngle: number){
        this.type = type;
        this.coxeterMatrix = coxeterMatrix;
        this._positiveRoots = simpleRoots;
        this._minimumAngle = minimumAngle;
    }
    getAllRoots(){
        const allRoots = [...this._positiveRoots];
        this._positiveRoots.forEach((root: Root) => {
            allRoots.push(root.getNegative());
        })
        return allRoots;
    }
    getCoxeterMatrix(){
        return this.coxeterMatrix;
    }
    getHyperplanes(){
        const hyperplanes: Array<Hyperplane> = [];
        for(let root of this._positiveRoots){
            hyperplanes.push(new Hyperplane(root.angle+Math.PI/2));
        }
        hyperplanes.sort((a,b) => {
            if(a.angle < b.angle){
                return -1;
            }
            else if(a.angle === b.angle){
                return 0;
            }
            return 1;
        })
        return hyperplanes;
    }
    getPositiveRoots(){
        return this._positiveRoots;
    }
    getAllWeylChambers(){
        const weylChambers: Array<WeylChamber> = [];
        const hyperplanes = this.getHyperplanes();
        for(let hyperplane of hyperplanes){
            // Add two weyl chambers - one for every side of the hyperplane
            const weylChamber1 = new WeylChamber(hyperplane.angle, this._minimumAngle);
            const weylChamber2 = new WeylChamber(hyperplane.angle + Math.PI, this._minimumAngle);
            weylChambers.push(weylChamber1);
            weylChambers.push(weylChamber2);
        }
        console.log(weylChambers);
        weylChambers.sort((a,b) => {
            if(a.startAngle < b.startAngle){
                return -1;
            }
            else if(a.startAngle === b.startAngle){
                return 0;
            }
            return 1;
        })
        return weylChambers;
    }
    getFundamentalWeylChamber(): WeylChamber{
        const fundamentalWeylChamber = this.getAllWeylChambers().filter((chamber)=>{
            let base = this.getBase();
            let nonNegativeDotProductToEveryBaseVector = base.every((baseElement) => 
            {
                return baseElement.getVector().dot(chamber.getStartBoundingVector()) >= -0.01}
                )
            return nonNegativeDotProductToEveryBaseVector;
        });
        return fundamentalWeylChamber[0];
    }

    getBase(){
        return this.getPositiveRoots().filter((root)=>root.isSimple);
    }
    getLengthOfTransformation(transformation: Matrix3){
        let positiveRoots = this.getPositiveRoots();
        let transformedVectors = positiveRoots.map((root) => {
            return root.getVectorUnderTransformation(transformation)
        });
        const rootsThatChangedToNegative = transformedVectors.filter((transformedVector) =>
            positiveRoots.every((root) => !root.getVector().equal(transformedVector))
        );
        return rootsThatChangedToNegative.length;
    }
}