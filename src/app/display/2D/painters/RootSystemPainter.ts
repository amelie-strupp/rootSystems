import { style } from '@angular/animations';
import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { iif, Subject } from "rxjs";
import { rootSystems, RootSystems2D } from "src/app/data/rootSystems";
import { RootSystemService } from "src/app/logic/maths/2D/root-system.service";
import RootSystem2D, { Root } from "src/app/logic/maths/2D/RootSystem";
import Circle from "src/app/logic/maths_objects/2D/Circle";
import Line from "src/app/logic/maths_objects/2D/Line";
import Point from "src/app/logic/maths_objects/2D/Point";
import Polygon from "src/app/logic/maths_objects/2D/Polygon";
import { CanvasService } from "src/app/services/2D/canvas.service";
import { CoordinateSystemService } from "src/app/services/2D/coordinate-system.service";
import { PaintLayer, PaintService } from "src/app/services/2D/paint.service";
import { RootSystemTransformer2DService } from "src/app/services/2D/root-system-transformer2-d.service";
import { Color, Matrix3 } from "three";
import { RootSystemColorMode, rootSystemColors } from "../../RootSystemColorMode";
import { Colors } from "../../values/colors";
import AffinePainter from "./AffinePainter";
import Painter from "./Painter.interface";

@Injectable({
    providedIn: 'root',
})
export default class RootSystemPainter implements Painter{
    paintLayer: PaintLayer = PaintLayer.default;
    colorMode: RootSystemColorMode = RootSystemColorMode.base;
    showAffineVersion: boolean = false;
    repaintEvent: Subject<void> = new Subject();
    highlightedRoots: Array<Root> = [];
    highlightedHyperplanes: Array<Root> = [];
    showDominantWeights: boolean = false;
    constructor(
        private canvas: CanvasService,
        private rootSystem: RootSystemService,
        private coord: CoordinateSystemService,
        private painter: PaintService,
        private affinePainter: AffinePainter,
        private transformService: RootSystemTransformer2DService
    ){
        rootSystem.repaintEvent.subscribe(() => {
            this.clearHyperplaneHighlight();
            this.clearRootHighlight();
        })
    }
    paint(layer?: PaintLayer){
        const roots = this.rootSystem.getRoots();
        if(!this.showAffineVersion)
        this.paintExtraGeometry();
        // Paint the roots
        for(let root of roots){
            this.paintRoot(root);
            // Make sure to only paint the hyperplane once
            if(root.isPositive && !this.showAffineVersion)
                this.paintHyperplane(root);
        }
        if(layer != undefined){
            this.paintLayer = layer;
        }
        if(this.showAffineVersion){
            this.affinePainter.paint(PaintLayer.layer3)
        }
    }
    setDisplayStateOfDominantWeights(display: boolean){
      this.showDominantWeights = display;
      this.repaintEvent.next();
    }
    switchColorMode(colorMode: RootSystemColorMode){
        this.colorMode = colorMode;
        // Make sure the changes are applied by rerendering the scene
        this.repaintEvent.next();
    }
    switchVersion(toAffineVersion: boolean){
        this.showAffineVersion = toAffineVersion;
        this.rootSystem.repaintEvent.next();

    }
    highlightRoot(root: Root){
        this.highlightedRoots.push(root);
        this.repaintEvent.next();
    }
    highlightHyperplaneToRoot(root: Root){
        this.highlightedHyperplanes.push(root);
        this.repaintEvent.next();
    }
    rootIsHighlighted(root: Root){
        return this.highlightedRoots.some((other) => other.equal(root));
    }
    removeHighlightFromRoot(root: Root){
        this.highlightedRoots = this.highlightedRoots.filter((other) => !root.equal(other))
        this.repaintEvent.next();
    }
    hyperplaneToRootHighlighted(root: Root){
        return this.highlightedHyperplanes.some((other) => other.equal(root));
    }
    removeHighlightOfHyperplaneToRoot(root: Root){
        this.highlightedHyperplanes = this.highlightedHyperplanes.filter((other) => !root.equal(other))
        this.repaintEvent.next();
    }
    allRootsHighlighted(){
        return this.highlightedRoots.length == this.rootSystem.getPositiveRoots().length;
    }
    allHyperplanesHighlighted(){
        return this.highlightedHyperplanes.length == this.rootSystem.getPositiveRoots().length;
    }
    clearRootHighlight(){
        this.highlightedRoots = [];
        this.repaintEvent.next();

    }
    clearHyperplaneHighlight(){
        this.highlightedHyperplanes = [];
        this.repaintEvent.next();

    }
    highlightAllRoots(){
        this.highlightedRoots = this.rootSystem.getPositiveRoots();
        this.repaintEvent.next();

    }
    highlightAllHyperplanes(){
        this.highlightedHyperplanes = this.rootSystem.getPositiveRoots();
        this.repaintEvent.next();

    }
    // Used to paint extra objects that should only appear with certain root systems
    paintExtraGeometry(){
        let type = this.rootSystem.getType();
        switch(type){
            case RootSystems2D.A2:
                this.paintTriangle();
                break;
            case RootSystems2D.B2:
                this.paintSquare();
                break;
            // case RootSystems2D.C2:
            //     this.paintSquare();
            //     break;
            case RootSystems2D.G2:
                this.paintHexagon();
                break;
        }
    }
    paintVectorEnd(point: Point, color: string, opacity: number = 1, borderColor: string = "transparent"){
        this.painter.paintCircle(
            new Circle({center: point, color: color, radius: 16}), PaintLayer.layer4).opacity(opacity)
            .stroke({
              color: borderColor,
              width: 3
            });
    }
    paintVectorLine(startPoint: Point, endPoint: Point, opacity: number = 1, color: Colors = Colors.white){
        const line = new Line({
            start: startPoint,
            end: endPoint,
            color: color,
            width: 7
        })
        this.painter.paintLine(line, PaintLayer.layer3).opacity(opacity);
    }

    paintRoot(root: Root){
        const point = root.getVector();
        let color = Colors.white;
        let lineColor = Colors.white;
        let borderColor = "transparent";
        let opacity = 1;
        // Only paint a grayed out root system with the affine version
        if(this.showAffineVersion){
            opacity = 1
            lineColor = Colors.purple900
            color = Colors.purple900
        }
        else if(this.colorMode == RootSystemColorMode.base){
            color = root.isSimple ? Colors.brightRed : Colors.brightGreen;
            if(this.rootIsHighlighted(root) || this.rootIsHighlighted(root.getNegative())){
              const rootIndex = this.rootSystem.getPositiveRoots().findIndex((other)=>other.equal(root) || other.equal(root.getNegative()));
              borderColor = rootSystemColors[this.rootSystem.getType()][rootIndex];
            }
        }else if(this.colorMode == RootSystemColorMode.positiveRoots){
            color = root.isPositive ? Colors.brightRed : Colors.brightGreen;
            if(this.rootIsHighlighted(root) || this.rootIsHighlighted(root.getNegative())){
              const rootIndex = this.rootSystem.getPositiveRoots().findIndex((other)=>other.equal(root) || other.equal(root.getNegative()));
              borderColor = rootSystemColors[this.rootSystem.getType()][rootIndex];
            }
        }else{
            if(this.rootIsHighlighted(root) || this.rootIsHighlighted(root.getNegative())){
            const rootIndex = this.rootSystem.getPositiveRoots().findIndex((other)=>other.equal(root) || other.equal(root.getNegative()));
            color = rootSystemColors[this.rootSystem.getType()][rootIndex];
            }
        }
        this.paintVectorLine(new Point(0,0), point, opacity, lineColor);

        // Transform the object accoring to the group action if it has been selected
        // to be transformed
        if(this.transformService.transformationAppliedTo('ROOTS')){
            const transformedPoint = root.getVectorUnderTransformation(this.transformService.currentTranformation);
            this.paintVectorEnd(transformedPoint, color, opacity, borderColor);
        }
        else{
            this.paintVectorEnd(root.getVector(), color, opacity, borderColor);
        }
    }

    paintHyperplane(root: Root){
        let color = Colors.white;
        if(this.hyperplaneToRootHighlighted(root) || this.hyperplaneToRootHighlighted(root.getNegative())){
            const rootIndex = this.rootSystem.getPositiveRoots().findIndex((other)=>other.equal(root) || other.equal(root.getNegative()));
            color = rootSystemColors[this.rootSystem.getType()][rootIndex];
        }
        let plane = root.getHyperplane()
        // Transform the object accoring to the group action if it has been selected
        // to be transformed
        if(this.transformService.transformationAppliedTo('HYPERPLANES')){
            plane = root.getHyperplane()
            .withTransformation(this.transformService.currentTranformation);
        }
        console.log(root,plane.getDirection())

        let startAngle = plane.angle;
        const startAngleInDegree = (startAngle/(Math.PI*2))*360
        const maxLength = this.coord.getCrossLength()/2;
        const line = new Line({
            start: new Point(-maxLength, 0),
            end: new Point(maxLength, 0),
            color: color,
            width: 2,
            dashed: true,
            dashString: "12 12"
        })
        this.painter.paintLine(line, PaintLayer.layer3).transform({rotate: -startAngleInDegree});
    }
    paintTriangle(){
        let triangle = new Polygon({
            points: [
                new Point(
                    Math.cos(Math.PI/3 + Math.PI/6),
                    Math.sin(Math.PI/3 + Math.PI/6),
                ),
                new Point(Math.cos(Math.PI + Math.PI/6),Math.sin(Math.PI + Math.PI/6)),
                new Point(
                    Math.cos(2*Math.PI - Math.PI/3 + Math.PI/6),
                    Math.sin(2*Math.PI - Math.PI/3 + Math.PI/6)
                )
            ],
            color: '#9999CC'
        })
        this.painter.paintPolygon(
            triangle,
            PaintLayer.layer3
        ).opacity(0.5)

    }
    paintSquare(){
        let square = new Polygon({
            points: [
                new Point(
                    0.5,
                    0.5
                ),
                new Point(
                    -0.5,
                    0.5
                ),
                new Point(
                    -0.5,
                    -0.5
                ),
                new Point(
                    0.5,
                    -0.5
                ),
            ],
            color: '#9999CC'
        })
        this.painter.paintPolygon(
            square,
            PaintLayer.layer3
        ).opacity(0.5).transform({rotate: 45})
    }
    paintHexagon(){
        let hexagon = new Polygon({
            points: [
                new Point(
                    0.8,
                    0
                ),
                new Point(
                    0.8*Math.cos(Math.PI/3),
                    0.8*Math.sin(Math.PI/3),
                ),
                new Point(
                    0.8*Math.cos(2*Math.PI/3),
                    0.8*Math.sin(2*Math.PI/3),
                ),
                new Point(
                    0.8*Math.cos(3*Math.PI/3),
                    0.8*Math.sin(3*Math.PI/3),
                ),
                new Point(
                    0.8*Math.cos(4*Math.PI/3),
                    0.8*Math.sin(4*Math.PI/3),
                ),
                new Point(
                    0.8*Math.cos(5*Math.PI/3),
                    0.8*Math.sin(5*Math.PI/3),
                ),
            ],
            color: '#9999CC'
        })
        this.painter.paintPolygon(
            hexagon,
            PaintLayer.layer3
        ).opacity(0.5).transform({rotate: 30})
    }
}
