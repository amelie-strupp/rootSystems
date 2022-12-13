import { Injectable } from "@angular/core";
import { SVG, Svg } from "@svgdotjs/svg.js";
import { Alcove } from "src/app/logic/maths/2D/Alcove";
import { Hyperplane } from "src/app/logic/maths/2D/Hyperplane";
import { RootSystemService } from "src/app/logic/maths/2D/root-system.service";
import { Root } from "src/app/logic/maths/2D/RootSystem";
import Line from "src/app/logic/maths_objects/2D/Line";
import Point from "src/app/logic/maths_objects/2D/Point";
import Polygon from "src/app/logic/maths_objects/2D/Polygon";
import { CoordinateSystemService } from "src/app/services/2D/coordinate-system.service";
import { PaintLayer, PaintService } from "src/app/services/2D/paint.service";
import { Color } from "three";
import { Colors } from "../../values/colors";
import Painter from "./Painter.interface";
import RootSystemPainter from "./RootSystemPainter";
import {Polygon as PolygonObject} from "@svgdotjs/svg.js"
import { rootSystemColors } from "../../RootSystemColorMode";

@Injectable({
    providedIn: 'root',
})
export default class AffinePainter implements Painter{
    appliedReflections: Array<{hyperplane: Hyperplane, root: Root}> = [];
    reflectedAlcoveObject: undefined | PolygonObject;
    constructor(
        private rootSystem: RootSystemService,
        private coord: CoordinateSystemService,
        private painter: PaintService
    ){

    }
    paint(layer?: PaintLayer): void {
        for(let root of this.rootSystem.getPositiveRoots()){
            this.paintAffineHyperplanes(root);
        }
        this.paintFundamentalAlcove();
        this.applyReflections();
        this.paintReflectionBase();
    }
    // Used to paint the affine hyperplanes to a provided root
    paintAffineHyperplanes(root: Root){
        let color = Colors.purple300;
        let plane = root.getHyperplane()
        let startAngle = plane.angle;
        const startAngleInDegree = (startAngle/(Math.PI*2))*360
        const maxLength = this.coord.getCrossLength()/2;
        let dual = root.getVector();
        for(let i = -10; i <= 10; ++i){
                let offset = new Point(0,0).add(dual.multiply(i))
                const line = new Line({
                    start: new Point(-maxLength, 0).add(offset),
                    end: new Point(maxLength, 0).add(offset),
                    color: color,
                    width: 2,
                })
                this.painter.paintLine(line, PaintLayer.layer2).transform({rotate: -startAngleInDegree});

        }
    }
    addReflection(root: Root, onHyperplane: Hyperplane){
        this.appliedReflections.push({root: root, hyperplane: onHyperplane});
        this.applyReflections();
    }
    applyReflections(){
        this.clearAlcoveObject();
        let alcove = Alcove.fromRootSystem(this.rootSystem.rootSystem);
        if(alcove == null){return;}
        let reflectedPoints = [];
        for(let point of alcove!.points){
            let reflectedPoint = point;
            for(let h of this.appliedReflections){
                reflectedPoint = h.hyperplane.reflect(reflectedPoint);
                
            }
            reflectedPoints.push(reflectedPoint);
        }
        this.reflectedAlcoveObject = this.paintAlcove(Alcove.fromPoints(reflectedPoints));
    }
    resetReflection(){
        this.appliedReflections = [];
        this.clearAlcoveObject();
    }
    clearAlcoveObject(){
        if(this.reflectedAlcoveObject != undefined){
                    this.reflectedAlcoveObject.remove();
                }
    }
    paintFundamentalAlcove(){
        let alcove = Alcove.fromRootSystem(this.rootSystem.rootSystem);
        if(alcove != null)
            this.paintAlcove(alcove);
    }
    paintAlcove(alcove: Alcove){
        return this.painter.paintPolygon(new Polygon({points: [
            alcove?.walls[0].start,
            alcove?.walls[1].start,
            alcove?.walls[2].start,
            alcove?.walls[0].start,
        ],
        color: Colors.purple200}), PaintLayer.layer2).opacity(0.5)
    }
    paintReflectionBase(){
        let base = this.rootSystem.getAffineReflectionBase();
        const colors = rootSystemColors[this.rootSystem.rootSystem.type];
        for(let baseElement of base){
            let root = baseElement.root;
            let plane = baseElement.hyperplane;
            let color = colors[this.rootSystem.rootSystem.getPositiveRoots().findIndex((other)=>other.equal(root))];
            let startAngle = plane.angle;
            const startAngleInDegree = (startAngle/(Math.PI*2))*360
            const maxLength = this.coord.getCrossLength()/2;
            let offset = plane.anchorPoint;
            const line = new Line({
                start: new Point(-maxLength, 0).add(offset),
                end: new Point(maxLength, 0).add(offset),
                color: color,
                width: 10,
                opacity: 1
            })
            this.painter.paintLine(line, PaintLayer.layer4).transform({rotate: -startAngleInDegree});

            
        }
    }
}