import MatrixND from "./MatrixND";

export default class PointND{
    components: Array<number> = [];
    constructor(components: Array<number>){
        this.components = components;
    }
    get dim(){
        return this.components.length;
    }
    get(index: number){
        return this.components[index];
    }
    getNegative(){
        return new PointND(
            this.components.map((c) => -c)
        )
    }
    equal(other: PointND){
        return this.components.every((c, i) => {
            return Math.abs(c - other.components[i]) < 0.01
        })
        
    }
    getTranspose(){
        return new MatrixND([this.components]);
    }
    asMatrix(){
        return new MatrixND([...this.components.map((e)=>[e])]);
    }
    length(){
        let sum = 0;
        this.components.forEach((c) => sum += c*c);
        return Math.sqrt(sum)
    }
    multiplyOnLeftWithMatrix(matrix: MatrixND){
        let pointMatrix = this.asMatrix();
        let result = matrix.multiply(pointMatrix);
        return new PointND(result.components.map((o)=>o[0]));
    }
    normalized(){
        let length = this.length();
        return new PointND(
            this.components.map((c) => c/length)
        );
    }
    stretchedBy(length: number){
        return new PointND(this.components.map((c) => c*length));
    }
    dotProduct(other: PointND){
        let products =  this.components.map((c, i) => {
            return c * other.components[i]
        })
        let sum = 0;
        products.forEach((p) => {sum +=p});
        return sum;
    }
    add(other: PointND){
        let sum =  this.components.map((c, i) => {
            return c + other.components[i]
        })
        return new PointND(sum);
    }
    crossProduct(other: PointND){
        return new PointND([
            this.get(1)*other.get(2) - this.get(2)*other.get(1),
            this.get(2)*other.get(0) - this.get(0)*other.get(2),
            this.get(0)*other.get(1) - this.get(1)*other.get(0),
        ])
    }
}