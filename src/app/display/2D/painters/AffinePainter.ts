import { Injectable } from "@angular/core";
import { RootSystemService } from "src/app/logic/maths/2D/root-system.service";
import { Root } from "src/app/logic/maths/2D/RootSystem";
import Line from "src/app/logic/maths_objects/2D/Line";
import Point from "src/app/logic/maths_objects/2D/Point";
import { CoordinateSystemService } from "src/app/services/2D/coordinate-system.service";
import { PaintLayer, PaintService } from "src/app/services/2D/paint.service";
import { Colors } from "../../values/colors";
import Painter from "./Painter.interface";
import RootSystemPainter from "./RootSystemPainter";

@Injectable({
    providedIn: 'root',
})
export default class AffinePainter implements Painter{
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
    }
    // Used to paint the affine hyperplanes to a provided root
    paintAffineHyperplanes(root: Root){
        let color = Colors.purple200;
        let plane = root.getHyperplane()
        let startAngle = plane.angle;
        const startAngleInDegree = (startAngle/(Math.PI*2))*360
        const maxLength = this.coord.getCrossLength()/2;
        let dual = root.getDual();
        for(let i = -10; i <= 10; ++i){
                let offset = new Point(0,0).add(dual.multiply(i))
                const line = new Line({
                    start: new Point(-maxLength, 0).add(offset),
                    end: new Point(maxLength, 0).add(offset),
                    color: color,
                    width: 2,
                })
                this.painter.paintLine(line, PaintLayer.layer3).transform({rotate: -startAngleInDegree});

        }
    }

}