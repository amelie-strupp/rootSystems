import { Injectable } from '@angular/core';
import { Point } from '@svgdotjs/svg.js';
import * as e from 'express';
import MatrixND from 'src/app/logic/maths/nD/MatrixND';
import PointND from 'src/app/logic/maths/nD/PointND';
import Point3D from 'src/app/logic/maths_objects/3D/Point3D';
import { Matrix3, Vector3 } from 'three';

@Injectable({
  providedIn: 'root',
})
export class ProjectionService {
  constructor() {}

  stereographicProjectionFromND(point: PointND, endDimension: number) {
    let currentDimension = point.dim;
    let transformedPoint = point;
    while (currentDimension > endDimension) {
      let lastCoordinate =
        transformedPoint.components[transformedPoint.dim - 1];
      transformedPoint = transformedPoint.normalized();
      transformedPoint = new PointND(
        transformedPoint.components.map((c) => c / (1 - lastCoordinate))
      );
      currentDimension -= 1;
    }
    return transformedPoint;
  }
  projectOnto2DPlane(point: Point3D, normalOfPlane: Point3D) {
    normalOfPlane = normalOfPlane.normalized();
    const projectionOnNormal = point.dotProduct(normalOfPlane);
    const projectionPoint = point.add(
      normalOfPlane.stretchedBy(projectionOnNormal).getNegative()
    );
    return projectionPoint;
  }
  projectOnto3DHyperplane(point: PointND, normalOfPlane: PointND) {
    normalOfPlane = normalOfPlane.normalized();
    const projectionOnNormal = point.dotProduct(normalOfPlane);
    const projectionPoint = point.add(
      normalOfPlane.stretchedBy(projectionOnNormal).getNegative()
    );
    return projectionPoint;
  }
  projectOnto2DHyperplaneIn5D(point: PointND) {
    let projectionMatrix = new MatrixND([
      [
        Math.cos(0),
        Math.cos((Math.PI * 4) / 5),
        Math.cos((Math.PI * 8) / 5),
        Math.cos((Math.PI * 12) / 5),
        Math.cos((Math.PI * 16) / 5),
      ],
      [
        Math.sin(0),
        Math.sin((Math.PI * 4) / 5),
        Math.sin((Math.PI * 8) / 5),
        Math.sin((Math.PI * 12) / 5),
        Math.sin((Math.PI * 16) / 5),
      ],
      // [Math.SQRT1_2,Math.SQRT1_2,Math.SQRT1_2,Math.SQRT1_2,Math.SQRT1_2],
    ]);
    let transformedPoint = point.multiplyOnLeftWithMatrix(projectionMatrix);
    return transformedPoint;
  }
  projectOnto3DHyperplaneIn5D(point: PointND, normalOfPlane: PointND) {
    let projectionMatrix = new MatrixND([
      [
        Math.cos(0),
        Math.cos((Math.PI * 4) / 5),
        Math.cos((Math.PI * 8) / 5),
        Math.cos((Math.PI * 12) / 5),
        Math.cos((Math.PI * 16) / 5),
      ],
      [
        Math.sin(0),
        Math.sin((Math.PI * 4) / 5),
        Math.sin((Math.PI * 8) / 5),
        Math.sin((Math.PI * 12) / 5),
        Math.sin((Math.PI * 16) / 5),
      ],
      [Math.SQRT1_2, Math.SQRT1_2, Math.SQRT1_2, Math.SQRT1_2, Math.SQRT1_2],
    ]);
    let transformedPoint = point.multiplyOnLeftWithMatrix(projectionMatrix);
    console.log(transformedPoint);
    return transformedPoint;
  }
  projectOnto3DHyperplaneIn6D(point: PointND, normalOfPlane: PointND) {
    let projectionMatrix = new MatrixND([[0.103142124625879, 0.103142124625879, 0.309426373877638, 0.103142124625879, 0.928279121632914, -0.103142124625879], [0.264107038033552, 0.841457307223178, 0.214970844911031, 0.264107038033552, -0.221112869051346, 0.0245680965612607], [-0.175181386375974, 0.0945223307784031, -0.220552105149607, 0.112166499190372, 0.0831796510849947, 0.118467987908932]]
      )
    let transformedPoint = point.multiplyOnLeftWithMatrix(projectionMatrix);
    console.log(transformedPoint);
    return transformedPoint;
  }
}
