import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { rootSystems3D } from 'src/app/data/rootSystems3D';
import PointND from 'src/app/logic/maths/nD/PointND';
import Point3D from 'src/app/logic/maths_objects/3D/Point3D';
import { Color } from 'three';
import { rootSystemColors } from '../RootSystemColorMode';
import { Colors } from '../values/colors';
import { ProjectionCanvasService } from './projection-canvas.service';
import { ProjectionPainterService } from './projection-painter.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectionManagerService {
  projectionType: "2D"|"3D" = "2D";
  rootListND: Array<PointND> = [];
  rootList3D: Array<Point3D> = [];
  normalND: PointND = new PointND([0,0,0,1]);
  normal2D: Point3D = new Point3D(1,0,0);
  colorList: Array<Colors> = [];
  dimensionChanged: Subject<"2D"|"3D"> = new Subject();
  constructor(
    private canvasService: ProjectionCanvasService,
    private paintService: ProjectionPainterService,
    ) { }
  switchProjectionType(type: "2D"|"3D"){
    this.projectionType = type;
    this.canvasService.reinitializeObjects();
    this.paintObjectForDimension();
    this.dimensionChanged.next(type);
    if(type == "2D"){
      this.drawAs2DProjection();
    }
    else{
      this.drawAs3DProjection();
    }
  }
  paintObjectForDimension(){
    if(this.projectionType == "2D"){
      this.paintService.drawPlane();
    }
    else if(this.projectionType == "3D"){
      this.paintService.drawCube();
    }
  }
  initializeView(canvas: HTMLElement){
    this.canvasService.initalizeScene(canvas);
    this.paintObjectForDimension();
    if(this.projectionType == "2D"){
      this.drawAs2DProjection();
    }else{
      this.drawAs3DProjection();
    }
  }
  set3DRootsAndColors(roots: Array<Point3D>, colors: Array<Colors>){
    this.rootList3D = roots;
    this.colorList = colors;
  }
  setNDRootsAndColors(roots: Array<PointND>, colors: Array<Colors>){
    this.rootListND = roots;
    this.colorList = colors;

  }
  updateNormalVector2D(normalVector: Point3D){
    this.normal2D = normalVector;
    this.drawAs2DProjection();
  }
  updateNormalVectorND(normalVector: PointND){
    this.normalND = normalVector;
    this.drawAs3DProjection();
  }
  drawAs3DProjection(){
    this.canvasService.reinitializePoints();
    this.paintService.drawPointsWith3DProjection(
      this.rootListND,
      this.normalND,
      this.colorList
      );
  }
  drawAs2DProjection(){
    this.canvasService.reinitializePoints();
    this.paintService.drawPointsWith2DProjection(
      this.rootList3D
      , this.normal2D, this.colorList);
  }

}
