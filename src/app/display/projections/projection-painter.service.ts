import { Injectable } from '@angular/core';
import MatrixND from 'src/app/logic/maths/nD/MatrixND';
import PointND from 'src/app/logic/maths/nD/PointND';
import Point from 'src/app/logic/maths_objects/2D/Point';
import Point3D from 'src/app/logic/maths_objects/3D/Point3D';
import * as THREE from 'three';
import { Matrix3, Vector3 } from 'three';
import { Colors } from '../values/colors';
import { ProjectionCanvasService } from './projection-canvas.service';
import { ProjectionService } from './projection.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectionPainterService {
  scaleFactor = 3;
  constructor(
    private projectionService: ProjectionService,
    private canvasService: ProjectionCanvasService
  ) { }
  drawPointsWith2DProjection(points: Array<Point3D>, projectionNormal: Point3D, colors: Array<Colors>){
    let transformedPoints: Array<Point3D> = [];
    let zProjectionMatrix = this.rotateToZPlane(projectionNormal.normalized());
    for(let point of points){
      let projectedPoint = this.projectionService.projectOnto2DPlane(point, projectionNormal);
      let transformedVector = new Vector3(projectedPoint.x, projectedPoint.y, projectedPoint.z);
      transformedVector.applyMatrix3(zProjectionMatrix);
      transformedPoints.push(new Point3D(transformedVector.x, transformedVector.y, transformedVector.z));
    }
    let i = 0;
    for(let transformedPoint of transformedPoints){
      const geometry = new THREE.SphereGeometry( 0.3, 16, 16 );
      const material = new THREE.MeshStandardMaterial( {
        color: colors[i],
      } );
      const point = new THREE.Mesh( geometry, material );
      point.position.set(transformedPoint.x*this.scaleFactor, transformedPoint.y*this.scaleFactor, transformedPoint.z*this.scaleFactor);
      this.canvasService.drawToPointGroup(point);
      i += 1
    }
  }
  drawPointsWith3DProjection(points: Array<PointND>, projectionNormal: PointND, colors: Array<Colors>){
    let transformedPoints: Array<PointND> = [];
    let zProjectionMatrix = this.rotateToNormalCube(projectionNormal.normalized());
    for(let point of points){
      let projectedPoint = this.projectionService.projectOnto3DHyperplane(point, projectionNormal);
      // console.log(projectionNormal.dotProduct(projectedPoint));
      let transformedPoint = projectedPoint.multiplyOnLeftWithMatrix(zProjectionMatrix);
      transformedPoints.push(transformedPoint);
    }
    let i = 0;
    for(let transformedPoint of transformedPoints){
      const geometry = new THREE.SphereGeometry( 0.3, 16, 16 );
      const material = new THREE.MeshStandardMaterial( {
        color: colors[i],
      } );
      const point = new THREE.Mesh( geometry, material );
      point.position.set(
        transformedPoint.components[0]*this.scaleFactor,
        transformedPoint.components[1]*this.scaleFactor,
        transformedPoint.components[2]*this.scaleFactor
      );
      this.canvasService.drawToPointGroup(point);
      i += 1
    }
  }
  rotateToNormalCube(x: PointND){
    // https://math.stackexchange.com/questions/598750/finding-the-rotation-matrix-in-n-dimensions
    let dim = 4;
    x = x.normalized();
    // console.log("x", x);
    let y = new PointND([0,0,0,1]);
    let u = x.normalized();
    let utyu = u.asMatrix().scalarMultiply((u.getTranspose().multiply(y.asMatrix())).components[0][0])
    // console.log("UTYU", utyu);

    let v = y.asMatrix().add(utyu.scalarMultiply(-1));
    // console.log("V", v);
    let uut = u.asMatrix().multiply(u.getTranspose());
    // console.log("UUT", uut);

    let vvt = v.multiply(v.transpose());
    // console.log("VVT", vvt)

    let cos = x.dotProduct(y)*1/(x.length()*y.length());
    let sin = Math.sqrt(1-cos*cos);
    // console.log("cos", cos)
    // console.log("sin", sin)

    let R = new MatrixND(
      [[cos, -sin], [sin, cos]]
    )
    // console.log("R", R);

    let uvMatrixTranspose = new MatrixND([[...u.components], [...v.components.map((o)=>o[0])]]);
    // console.log("uvMatrixTranspose", uvMatrixTranspose);

    let uvMatrix = uvMatrixTranspose.transpose();
    // console.log("uvMatrix", uvMatrix);

    let secondPart = (uvMatrix.multiply(R)).multiply(uvMatrixTranspose)
    // console.log("secondPart", secondPart);
    // console.log("ID", MatrixND.identity(dim));
    let rotation = MatrixND.identity(dim).add(uut.scalarMultiply(-1)).add(vvt.scalarMultiply(-1)).add(secondPart);
    // console.log("Rotation", rotation);
    return rotation;
  }
  // rotateToZPlane(point: Point3D){
  //   let v = new THREE.Vector3(point.x, point.y, point.z);
  //   let k = new THREE.Vector3(0,0,1)
  //   let cos = v.dot(k)
  //   cos = cos*1/v.length()
  //   let sin = Math.sqrt((v.x+v.x)/(v.length()*v.length()))
  //   let u = new Vector3();
  //   u.crossVectors(v,k)
  //   u = u.multiplyScalar(v.length())
  //   let u1 = u.x
  //   let u2 = u.y
  //   return new Matrix3().fromArray([
  //     cos + u1*u1*(1-cos), u1*u2*(1-cos), -u2*sin,
  //     u1*u2*(1-cos), cos+u2*u2*(1-cos), u1*sin,
  //     u2*sin, -u1*sin, cos
  //   ])
  // }
  rotateToZPlane(point: Point3D){
    const addMatrices = (m1: Matrix3, m2: Matrix3) => {
      let e1 = m1.elements;
      let e2 = m2.elements;
      let addedElements = e1.map((e, i)=>e+e2[i]);
      return new Matrix3().fromArray(
        [addedElements[0], addedElements[3], addedElements[6],
        addedElements[1], addedElements[4], addedElements[7],
        addedElements[2], addedElements[5], addedElements[8],
      ]
      )
    }
    //https://math.stackexchange.com/questions/180418/calculate-rotation-matrix-to-align-vector-a-to-vector-b-in-3d
    let vector = new Vector3(point.x, point.y, point.z);
    vector = vector.normalize();
    let zPlaneNormalVector = new Vector3(0,0,1);
    let v = new Vector3()
    v.crossVectors(vector, zPlaneNormalVector);
    let c = vector.dot(zPlaneNormalVector);
    // let vMatrix = new Matrix3().fromArray([
    //   0, -v.z, v.y,
    //   v.z, 0, -v.x,
    //   -v.y, v.x, 0
    // ])
    let vMatrix = new Matrix3().fromArray([
      0, v.z, -v.y,
      -v.z, 0, v.x,
      v.y, -v.x, 0
    ])
    let vMatrixClone = new Matrix3().fromArray([
      0, v.z, -v.y,
      -v.z, 0, v.x,
      v.y, -v.x, 0
    ])
    let vMatrixClone2 = new Matrix3().fromArray([
      0, v.z, -v.y,
      -v.z, 0, v.x,
      v.y, -v.x, 0
    ])
    vMatrixClone = vMatrixClone.multiply(vMatrixClone2)
    vMatrixClone = vMatrixClone.multiplyScalar(1/(1+c))
    let firstStep = addMatrices(new Matrix3().identity(), vMatrix);
    let secondStep = addMatrices(firstStep, vMatrixClone);
    return secondStep;
  }
  drawPlane(){
    var planeGeometry = new THREE.PlaneGeometry(14,14, 10, 10);
    var planeMaterial = new THREE.MeshStandardMaterial(
      {
        color: Colors.purple200, side: THREE.DoubleSide, opacity:0.1, transparent: true
    });
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0,0,0)
    this.canvasService.drawToObjectGroup(plane);
  }
  drawCube(){
    var geometry = new THREE.BoxGeometry(12,12, 12,);
    var material = new THREE.MeshStandardMaterial(
      {
        color: Colors.purple200, side: THREE.DoubleSide, opacity:0.05, transparent: true
    });
    let cube = new THREE.Mesh(geometry, material);
    cube.position.set(0,0,0)
    this.canvasService.drawToObjectGroup(cube);
  }

}
