import { Injectable } from '@angular/core';
import Point3D from 'src/app/logic/maths_objects/3D/Point3D';
import Sphere3D from 'src/app/logic/maths_objects/3D/Sphere3D';
import { SceneManagerService } from './scene-manager.service';
import * as THREE from "three";
import Line3D from 'src/app/logic/maths_objects/3D/Line3D';
import { Vector3 } from 'three';
import { Hyperplane } from 'src/app/logic/maths/2D/Hyperplane';
import { Hyperplane3D } from 'src/app/logic/maths/3D/Hyperplane3D';
import { Colors } from 'src/app/display/values/colors';
import WeylChamber3D from 'src/app/logic/maths_objects/3D/WeylChamber3D';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
@Injectable({
  providedIn: 'root'
})
export class Paint3dService {
  scaleFactor = 5;
  constructor(private sceneManager: SceneManagerService) { }

  drawSphere(sphereData: Sphere3D){
    const geometry = new THREE.SphereGeometry( sphereData.radius*this.scaleFactor, 32, 16 );
    const material = new THREE.MeshLambertMaterial( {
      color: sphereData.colorNumber,
    } );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(sphereData.center.x*this.scaleFactor, sphereData.center.y*this.scaleFactor, sphereData.center.z*this.scaleFactor);
    this.sceneManager.addToRootGroup( sphere );
    return sphere;
  }

  drawLine(lineData: Line3D, group: 'ROOT'|'HYPERPLANE'|'WEYL_CHAMBER' = 'ROOT'){
    const directionVector = new Vector3(
      lineData.end.x - lineData.start.x,
      lineData.end.y - lineData.start.y,
      lineData.end.z - lineData.start.z,
    )

    const geometry = new THREE.CylinderGeometry( lineData.width*2, lineData.width*2,
      directionVector.length()*this.scaleFactor, 32 );
    const material = new THREE.MeshLambertMaterial( {color: lineData.color} );
    const cylinder = new THREE.Mesh( geometry, material );
    var axis = new THREE.Vector3(0, 1, 0);
    cylinder.quaternion.setFromUnitVectors(axis, directionVector.clone().normalize());

    // cylinder.position.set(0-directionVector.x, 0-directionVector.y, 0-directionVector.z)
    cylinder.position.copy(directionVector.clone().multiplyScalar(0.5*this.scaleFactor));
    // cylinder.position.set(lineData.start.x*this.scaleFactor, lineData.start.y*this.scaleFactor, lineData.start.z*this.scaleFactor)
    if(group == 'HYPERPLANE'){
      this.sceneManager.addToHyperplaneGroup(cylinder);

      }else if(group == 'WEYL_CHAMBER'){
        this.sceneManager.addToWeylChamberGroup(cylinder);
      }else{
        this.sceneManager.addToRootGroup(cylinder);
      }
  }
  drawPlane(hyperplane: Hyperplane3D, group: 'ROOT'|'HYPERPLANE'|'WEYL_CHAMBER' = 'HYPERPLANE'){
     // Create plane
    var dir = new THREE.Vector3(hyperplane.normalVector.x,hyperplane.normalVector.y,hyperplane.normalVector.z);
    var centroid = new THREE.Vector3(hyperplane.point.x,hyperplane.point.y,hyperplane.point.z);
    var plane = new THREE.Plane();
    plane.setFromNormalAndCoplanarPoint(dir, centroid).normalize();

    // Create a basic rectangle geometry
    var planeGeometry = new THREE.PlaneGeometry(9, 9);

    // Align the geometry to the plane
    var coplanarPoint: THREE.Vector3 = new Vector3();
    plane.coplanarPoint(coplanarPoint);
    var focalPoint = new THREE.Vector3().copy(coplanarPoint).add(plane.normal);
    planeGeometry.lookAt(focalPoint);
    planeGeometry.translate(coplanarPoint.x, coplanarPoint.y, coplanarPoint.z);

    // Create mesh with the geometry
    var planeMaterial = new THREE.MeshLambertMaterial({color: hyperplane.color, side: THREE.DoubleSide, opacity: 0.65,
transparent: true});
    var dispPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    if(group == 'HYPERPLANE'){
          this.sceneManager.addToHyperplaneGroup(dispPlane);

    }else if(group == 'WEYL_CHAMBER'){
      this.sceneManager.addToWeylChamberGroup(dispPlane);
    }else{
      this.sceneManager.addToRootGroup(dispPlane);
    }
  }

  drawWeylChamber(chamber: WeylChamber3D){
    const convertPointToNumberList = (point: Point3D) => [point.x, point.y, point.z];
    const drawVertices = (vertices: Float32Array) => {
        const geometry = new THREE.BufferGeometry();
        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        const material = new THREE.MeshBasicMaterial( { color: Colors.purple300, side: THREE.DoubleSide, transparent: true, opacity: 0.2} );
        const mesh = new THREE.Mesh( geometry, material );
        material.polygonOffset = true;
        material.polygonOffsetFactor = -0.1;
        this.sceneManager.addToWeylChamberGroup(mesh);
    }
    let i = -1
    const edgePoints = chamber.edgePoints;
    const size = chamber.size;
    while(i < chamber.edgePoints.length-1){

      i+=1
      this.drawLine(
        new Line3D({start: chamber.centerPoint, end: edgePoints[i].stretchedBy(100), color: Colors.purple300, width: 0.05})
        , "WEYL_CHAMBER"
        )
      if(i == edgePoints.length-1){
        const vertices = new Float32Array( [
          ...convertPointToNumberList(chamber.centerPoint),
          ...convertPointToNumberList(edgePoints[i].stretchedBy(size)),
          ...convertPointToNumberList(edgePoints[0].stretchedBy(size)),
        ] );
        drawVertices(vertices);
      }
      else{
        const vertices = new Float32Array( [
          ...convertPointToNumberList(chamber.centerPoint),
          ...convertPointToNumberList(edgePoints[i].stretchedBy(size)),
          ...convertPointToNumberList(edgePoints[i+1].stretchedBy(size)),
        ] );
        drawVertices(vertices);
      }
    }

  }
}
