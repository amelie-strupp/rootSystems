export default class Point{
    x: number;
    y: number;
    constructor(x: number,y: number){
        this.x = x;
        this.y = y;
    }
    equal(other: Point){
        return Math.abs(other.x - this.x) < 0.01 && Math.abs(other.y - this.y) < 0.01
    }
    normalized(){
        const length = Math.sqrt(this.x*this.x + this.y*this.y);
        return new Point(this.x/length, this.y/length);
    }
    length(){
        return Math.sqrt(this.x*this.x + this.y*this.y);;
    }
    dot(other: Point){
        return this.x*other.x + this.y * other.y;
    }
}