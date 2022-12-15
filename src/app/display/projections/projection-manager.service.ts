import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { rootSystems3D } from 'src/app/data/rootSystems3D';
import MatrixND from 'src/app/logic/maths/nD/MatrixND';
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
  startDimension: number = 3;
  rootListND: Array<PointND> = [];
  normalND: PointND = new PointND([0,0,0,1]);
  colorList: Array<Colors> = [];

  // TESTT
  rotationMatrix: MatrixND = MatrixND.identity(4);


  startDimensionChanged: Subject<number> = new Subject();
  constructor(
    private canvasService: ProjectionCanvasService,
    private paintService: ProjectionPainterService,
    ) { }
  setStartDimension(x: number){
    this.startDimension = x;
    this.startDimensionChanged.next(this.startDimension);
  }
  setRotationMatrix(m: MatrixND){
    this.rotationMatrix = m;
  }
  switchProjectionType(type: "2D"|"3D"){
    this.projectionType = type;
    this.canvasService.reinitializeObjects();
    this.paintObjectForDimension();
    if(type == "2D"){
      this.drawAs2DProjection();
    }
    else{
      this.drawAs3DProjection();
    }
    this.startDimensionChanged.next(this.startDimension);
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
  setRootsAndColors(roots: Array<PointND>, colors: Array<Colors>){
    this.rootListND = roots;
    this.colorList = colors;
    console.log(this.rootListND);
  }
  updateNormalVector2D(normalVector: Point3D){
    this.normal2D = normalVector;
    this.drawAs2DProjection();
  }
  updateNormalVectorND(normalVector: PointND){
    this.normalND = normalVector;
    this.drawAs3DProjection();
  }
  removePoints(){
    this.canvasService.reinitializePoints();

  }
  drawAs3DProjection(){
    this.canvasService.reinitializePoints();
    // this.paintService.drawPointsWith3DStereographicProjection(
    //   this.rootListND,
    //   this.colorList,
    //   this.rotationMatrix
    // );
    this.paintService.draw4DPointsAs3DProjection(
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
  projectFrom5DTo2D(){
    this.paintService
    .draw5DPointsAs2DProjection(this.rootListND, 
    this.colorList);
  }
  projectFrom5DTo3D(){
    this.paintService
    .draw5DPointsAs3DProjection(this.rootListND, 
    this.colorList);
  }
  projectFrom6DTo3D(){
    this.paintService
    .draw6DPointsAs3DProjection(this.rootListND, 
    this.colorList);
  }
}
