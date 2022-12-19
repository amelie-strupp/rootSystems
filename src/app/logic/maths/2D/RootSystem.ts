import { RootSystems2D } from "src/app/data/rootSystems";
import { Matrix3, Vector3 } from "three";
import Point from "../../maths_objects/2D/Point";
import MatrixND from "../nD/MatrixND";
import PointND from "../nD/PointND";
import { Hyperplane } from "./Hyperplane";
import { WeylChamber } from "./WeylChamber";

export class Root{
    angle: number;
    length: number;
    isSimple: boolean = false;
    isPositive: boolean = true;
    isHighestRoot: boolean = false;
    constructor(d:
        {
            angle: number,
            length: number,
            isSimple: boolean,
            isPositive?: boolean,
            isHighestRoot?: boolean
        }){
        this.angle = d.angle;
        this.length = d.length;
        this.isSimple = d.isSimple;
        this.isPositive = d.isPositive != null ? d.isPositive : true;
        this.isHighestRoot = d.isHighestRoot != null ? d.isHighestRoot : false;
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

    getDual(){
        let vector = this.getVector();
        let dotProduct = vector.dot(vector)
        return new Point(2*vector.x*1/dotProduct, 2*vector.y*1/dotProduct);

    }
}

export default class RootSystem2D{
    type: RootSystems2D
    private _positiveRoots: Array<Root> = [];
    // The minimum angle occuring in this root system
    private _minimumAngle: number;
    orderOfWeylGroup: number = 0;

    coxeterMatrix: Array<number> = [];
    constructor(
        type: RootSystems2D,
        orderOfWeylGroup: number,
        coxeterMatrix: Array<number>,
        simpleRoots: Array<Root>,
        minimumAngle: number,
        ){
        this.type = type;
        this.orderOfWeylGroup = orderOfWeylGroup;
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
    hasHighestRoot(){
        return this._positiveRoots.some((root)=>root.isHighestRoot)
    }
    getHighestRoot(){
        return this._positiveRoots.find((root)=>root.isHighestRoot)
    }
    getAffineReflectionBase(){
        if(this.hasHighestRoot()){
            let highestRoot = this.getHighestRoot()!;
        let affineReflectionBase = [
            ...this.getBase().map((root) => {return {root: root, hyperplane: root.getHyperplane()}}),
            {root: highestRoot, hyperplane: highestRoot.getHyperplane().moveBy(highestRoot.getVector())}]
        return affineReflectionBase;
    }
        return [...this.getBase().map((root) => {return {root: root, hyperplane: root.getHyperplane()}})];
    }
    getWeightsToHighestWeight(){
      let weylGroup = [
        new MatrixND( [[1,0],
          [0,1]]),
          new MatrixND( [[ 1,1],
          [ 0,-1]] ),
          new MatrixND( [[-1,0],
          [ 3,1]] ),
          new MatrixND( [[-1 -1],
          [ 3,2]] ),
          new MatrixND( [[ 2,1],
          [-3,-1]] ),
          new MatrixND( [[ 2 , 1],
          [-3,-2]] ),
          new MatrixND( [[-2 -1],
          [ 3, 2]] ),
          new MatrixND( [[-2 -1],
          [ 3,1]] ),
          new MatrixND( [[ 1 , 1],
          [-3,-2]] ),
          new MatrixND( [[ 1, 0],
          [-3,-1]] ),
          new MatrixND( [[-1,-1],
          [ 0, 1]] ),
          new MatrixND( [[-1, 0],
          [ 0,-1]] ),]
          let highestWeight = new PointND([1,1])
          let convexHull = weylGroup.map((w)=> highestWeight.multiplyOnLeftWithMatrix(w));
          console.log(convexHull);
          let weights: Array<PointND> = [];
          const rootTraversalAlgorithm = (currentElement: PointND, root: PointND) => {
            let newElement = currentElement.add(root.getNegative())
          }
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
      this.getWeightsToHighestWeight();

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
