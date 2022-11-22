export default class Point3D{
    x: number;
    y: number;
    z: number;
    constructor(x: number,y: number, z: number){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    getNegative(){
        return new Point3D(
            -this.x,
            -this.y,
            -this.z
        )
    }
    equal(other: Point3D){
        return Math.abs(this.x - other.x) < 0.01 &&
        Math.abs(this.y - other.y) < 0.01 &&
        Math.abs(this.z - other.z) < 0.01
    }
    static getZero(){
        return new Point3D(0,0,0);
    }
    length(){
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z)
    }
    normalized(){
        return new Point3D(this.x/this.length(), this.y/this.length(), this.z/this.length());
    }
    stretchedBy(length: number){
        return new Point3D(this.x*length, this.y*length, this.z*length);
    }
    dotProduct(other: Point3D){
        return other.x*this.x + other.y*this.y+other.z*this.z;
    }
}