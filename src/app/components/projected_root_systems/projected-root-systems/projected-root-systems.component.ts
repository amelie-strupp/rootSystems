import { Component, ElementRef, ViewChild } from '@angular/core';
import { Point } from '@svgdotjs/svg.js';
import { rootSystems3D } from 'src/app/data/rootSystems3D';
import { ProjectionCanvasService } from 'src/app/display/projections/projection-canvas.service';
import { ProjectionPainterService } from 'src/app/display/projections/projection-painter.service';
import { ProjectionService } from 'src/app/display/projections/projection.service';
import { rootSystemColors } from 'src/app/display/RootSystemColorMode';
import { Colors } from 'src/app/display/values/colors';
import PointND from 'src/app/logic/maths/nD/PointND';
import Point3D from 'src/app/logic/maths_objects/3D/Point3D';
import { Matrix3, Matrix4 } from 'three';

@Component({
  selector: 'app-projected-root-systems',
  templateUrl: './projected-root-systems.component.html',
  styleUrls: ['./projected-root-systems.component.sass']
})
export class ProjectedRootSystemsComponent {
  @ViewChild('threeCanvas') canvas!: ElementRef;
  constructor(private canvasService: ProjectionCanvasService,
    private paintService: ProjectionPainterService
    ){
  }
  ngAfterViewInit(){
        this.canvasService.initalizeScene(this.canvas.nativeElement)
        // this.draw4DRootSystem();
        this.drawWithProjectionPlane(new Point3D(0,1,0));
  }
  draw4DRootSystem(){
    this.canvasService.reinitializePoints();
    this.paintService.drawPointsWith3DProjection([], new PointND([0,0,0,1]), rootSystemColors.C3);
  }
  drawWithProjectionPlane(normalVector: Point3D){
    this.canvasService.reinitializePoints();
    let positiveRootSystemPoints = rootSystems3D.C3.getPositiveRoots().map((root)=>root.getVector());
    let negativeRootSystemPoints = positiveRootSystemPoints.map((root)=>root.getNegative());

    let colors = rootSystemColors.C3;
    let colorsForPositiveAndNegativeRoots = [...colors, ...colors];
    // this.paintService.drawPointsWith2DProjection([
    //   ...positiveRootSystemPoints,
    //   ...negativeRootSystemPoints
    // ], normalVector, colorsForPositiveAndNegativeRoots)
    this.paintService.drawPointsWith2DProjection([
      ...this.paintService.drawPointsWith3DProjection([], new PointND([0,0,0,1]), rootSystemColors.C3),
    ], normalVector, colorsForPositiveAndNegativeRoots)
  }
}
