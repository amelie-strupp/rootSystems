import { Injectable } from '@angular/core';
import PointND from 'src/app/logic/maths/nD/PointND';
import Point3D from 'src/app/logic/maths_objects/3D/Point3D';
import { Matrix3, Vector3 } from 'three';

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {

  constructor() { }
  projectOnto2DPlane(point: Point3D, normalOfPlane: Point3D){
    normalOfPlane = normalOfPlane.normalized();
    const projectionOnNormal = point.dotProduct(normalOfPlane);
    const projectionPoint = point.add(normalOfPlane.stretchedBy(projectionOnNormal).getNegative());
    return projectionPoint;
  }
  projectOnto3DHyperplane(point: PointND, normalOfPlane: PointND){
    normalOfPlane = normalOfPlane.normalized();
    const projectionOnNormal = point.dotProduct(normalOfPlane);
    const projectionPoint = point.add(normalOfPlane.stretchedBy(projectionOnNormal).getNegative());
    return projectionPoint;
  }
}
