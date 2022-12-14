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
  startDimension: number = 3;
  endDimension: number = 2;
  rootList: Array<PointND> = [];
  normals: Array<PointND> = [new PointND([0,0,1])];
  colorList: Array<Colors> = [];
  rotationMatrix: MatrixND = MatrixND.identity(4);
  dimensionsChanged: Subject<void> = new Subject();
  rotationsChanged: Subject<void> = new Subject();

  rootSystemIdentifier = "A3";
  projectionType: ProjectionType = ProjectionType.orthogonal;
  constructor(
    private canvasService: ProjectionCanvasService,
    private paintService: ProjectionPainterService,
    ) { }
  setStartDimension(x: number){
    this.startDimension = x;
    this.dimensionsChanged.next();
  }
  setEndDimension(x: number){
    this.endDimension = x;
    this.dimensionsChanged.next();

  }
  setRotationMatrix(m: MatrixND){
    this.rotationMatrix = m;
    this.paintProjection();
    this.normals = this.getNormal();
    this.rotationsChanged.next();
  }
  getNormal(){
    let normalComponents = new Array(this.startDimension).fill(0);
    let normal = new PointND(normalComponents);
    let normals: Array<PointND> = []
    for(let dim = this.endDimension; dim < this.startDimension; ++dim){
      let newComponents = [...normal.components]
      newComponents[dim] = 1;
      let newNormal = new PointND(newComponents).multiplyOnLeftWithMatrix(this.rotationMatrix);
      normals.push(newNormal);
    }
    return normals;

  }
  setProjectionType(type: ProjectionType){
    this.projectionType = type;
    this.normals = this.getNormal();
    this.rotationsChanged.next();
  }
  setPoints(points: Array<PointND>, id: string){
    this.rootList = points;
    this.rootSystemIdentifier = id;
  }
  setColors(colors: Array<Colors>){
    this.colorList = colors;
  }
  removePoints(){
    this.canvasService.reinitializePoints();
  }

  initializeView(canvas: HTMLElement){
    this.canvasService.initalizeScene(canvas);
    this.paintObjectForDimension();
  }
  paintObjectForDimension(){
    this.canvasService.reinitializeObjects();
    this.canvasService.set3DView();
    if(this.endDimension == 2){
      this.paintService.drawPlane();
      this.canvasService.disableOrbiting();
    }
    else if(this.endDimension == 3){
      this.paintService.drawCube();
      this.canvasService.enableOrbiting();

    }
  }
  paintProjection(){
    this.removePoints();
    this.paintObjectForDimension();
    if(this.rotationMatrix.components.length != this.startDimension){
      this.rotationMatrix = MatrixND.identity(this.startDimension);
      this.normals = this.getNormal();
      this.rotationsChanged.next();
    }
    switch(this.projectionType){
      case ProjectionType.orthogonal:
        // if(this.startDimension == 3 || this.startDimension == 4){
        //   this.paintService.projectPointsOrthogonallyWithNormal(
        //     this.rootList,
        //     this.colorList,
        //     normal,
        //     this.endDimension
        //   )
        // }else{
          this.paintService.projectPointsOrthogonallyWithMatrix(
          this.rootList,
          this.colorList,
          this.rotationMatrix,
          this.endDimension
          )

        // }
        break;
      case ProjectionType.stereographic:
        this.paintService.projectPointsStereographically(
          this.rootList,
          this.colorList,
          this.rotationMatrix,
          this.endDimension
        )
        break;
    }
  }
  // switchProjectionType(type: "2D"|"3D"){
  //   this.projectionType = type;
  //   this.canvasService.reinitializeObjects();
  //   this.paintObjectForDimension();
  //   if(type == "2D"){
  //     this.drawAs2DProjection();
  //   }
  //   else{
  //     this.drawAs3DProjection();
  //   }
  //   this.startDimensionChanged.next(this.startDimension);
  // }
  // paintObjectForDimension(){
  //   if(this.projectionType == "2D"){
  //     this.paintService.drawPlane();
  //   }
  //   else if(this.projectionType == "3D"){
  //     this.paintService.drawCube();
  //   }
  // }
  // setRootsAndColors(roots: Array<PointND>, colors: Array<Colors>){
  //   this.rootListND = roots;
  //   this.colorList = colors;
  //   console.log(this.rootListND);
  // }
  // updateNormalVector2D(normalVector: Point3D){
  //   this.normal2D = normalVector;
  //   this.drawAs2DProjection();
  // }
  // updateNormalVectorND(normalVector: PointND){
  //   this.normalND = normalVector;
  //   this.drawAs3DProjection();
  // }

  // drawAs3DProjection(){
  //   this.canvasService.reinitializePoints();
  //   // this.paintService.drawPointsWith3DStereographicProjection(
  //   //   this.rootListND,
  //   //   this.colorList,
  //   //   this.rotationMatrix
  //   // );
  //   this.paintService.draw4DPointsAs3DProjection(
  //     this.rootListND,
  //     this.normalND,
  //     this.colorList
  //     );
  // }
  // drawAs2DProjection(){
  //   this.canvasService.reinitializePoints();
  //   this.paintService.drawPointsWith2DProjection(
  //     this.rootList3D
  //     , this.normal2D, this.colorList);
  // }
  // projectFrom5DTo2D(){
  //   this.paintService
  //   .draw5DPointsAs2DProjection(this.rootListND,
  //   this.colorList);
  // }
  // projectFrom5DTo3D(){
  //   this.paintService
  //   .draw5DPointsAs3DProjection(this.rootListND,
  //   this.colorList);
  // }
  // projectFrom6DTo3D(){
  //   this.paintService
  //   .draw6DPointsAs3DProjection(this.rootListND,
  //   this.colorList);
  // }
}
export enum ProjectionType{
  orthogonal,
  stereographic
}
