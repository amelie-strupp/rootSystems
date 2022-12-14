import { Injectable } from "@angular/core";
import { RootSystemService } from "src/app/logic/maths/2D/root-system.service";
import { WeylChamber } from "src/app/logic/maths/2D/WeylChamber";
import Point from "src/app/logic/maths_objects/2D/Point";
import Polygon from "src/app/logic/maths_objects/2D/Polygon";
import { Polygon as SVGPolygon } from "@svgdotjs/svg.js";
import { CoordinateSystemService } from "src/app/services/2D/coordinate-system.service";
import { PaintLayer, PaintService } from "src/app/services/2D/paint.service";
import { Colors } from "../../values/colors";
import Painter from "./Painter.interface";
import { RootSystemTransformer2DService } from "src/app/services/2D/root-system-transformer2-d.service";

@Injectable({
    providedIn: 'root',
})
export default class WeylChamberPainter implements Painter{
    paintLayer: PaintLayer = PaintLayer.default;
    transformation!: {rotate: number, flip: 'x'|'y'|'none'};
    weylChamber!: SVGPolygon;
    constructor(
        private rootSystemService: RootSystemService,
        private painter: PaintService,
        private coord: CoordinateSystemService,
        private transformService: RootSystemTransformer2DService
    ){

    }
    paint(layer?: PaintLayer){
        let weylChamber = this.rootSystemService.getFundamentalWeylChamber();
        if(this.transformService.transformationAppliedTo('WEYL_CHAMBERS')){
            weylChamber = weylChamber.getTransformedWeylChamber(this.transformService.currentTranformation)
        }
        this.weylChamber = this.paintWeylChamber(weylChamber);
        this.paintLayer = layer ?? PaintLayer.default;
    }
    paintWeylChamber(chamber: WeylChamber){
        let scaleFactor = this.coord.getCrossLength();
        const bottomHyperplaneVector = new Point(
            Math.cos(chamber.startAngle) * scaleFactor,
            Math.sin(chamber.startAngle) * scaleFactor
        )
        const topHyperplaneVector = new Point(
            Math.cos(chamber.startAngle + chamber.spanningAngle) * scaleFactor,
            Math.sin(chamber.startAngle + chamber.spanningAngle) * scaleFactor
        )

        // Check if the angle is pi -> Draw a rectangle 
        // Float comparison -> A little error is fine
        if(Math.abs(chamber.spanningAngle - Math.PI) < 0.01){
            const orthogonalVector1 = new Point(
                bottomHyperplaneVector.y, -bottomHyperplaneVector.x);
            // Position vector at the end of the generating one
            orthogonalVector1.x += bottomHyperplaneVector.x;
            orthogonalVector1.y += bottomHyperplaneVector.y;

            const orthogonalVector2 = new Point(
                -topHyperplaneVector.y, -topHyperplaneVector.x);
            orthogonalVector2.x += topHyperplaneVector.x;
            orthogonalVector2.y += topHyperplaneVector.y;
            
            const paintedChamber = this.painter.paintPolygon(
                new Polygon({points: [
                    bottomHyperplaneVector,
                    orthogonalVector1,
                    orthogonalVector2,
                    topHyperplaneVector
                ],
                color: Colors.purple300,
                }
            ), this.paintLayer);
            paintedChamber.opacity(0.4);
            return paintedChamber;
        }
        else{
            const paintedChamber = this.painter.paintPolygon(
                new Polygon({
                    points:[
                    topHyperplaneVector,
                    new Point(0,0),
                    bottomHyperplaneVector
                ],
                color: Colors.purple300
                }),
                this.paintLayer
            )
            paintedChamber.opacity(0.4)
            return paintedChamber;
        }
        
    }
    transformWeylChamber(transform: {rotate: number, flip: 'x' | 'y' | 'none'}){
        this.transformation = transform;
        const rotationDegrees = (transform.rotate/(Math.PI*2))*360
        const centerPoint = this.coord.getCenterPoint()
        this.weylChamber.animate(250).transform({
            rotate: rotationDegrees,
            flip: this.transformation.flip === 'none' ? false : this.transformation.flip,
            originX: centerPoint.x, originY: centerPoint.y});
    }
    
}