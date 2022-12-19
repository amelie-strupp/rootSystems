import { ElementRef, Injectable, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import * as THREE from 'three';
import { Mesh, Vector3, Matrix4 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Colors } from '../values/colors';

@Injectable({
  providedIn: 'root'
})
export class ProjectionCanvasService {
  canvas!: HTMLElement;
  orbitControls!: OrbitControls;
  scene!: THREE.Scene;
  camera!: THREE.Camera;
  renderer!: THREE.WebGLRenderer;
  pointGroup: THREE.Group = new THREE.Group();
  otherObjectsGroup: THREE.Group = new THREE.Group();
  sceneInitializedSubject: Subject<void> = new Subject();
  sceneHasBeenInitialized: boolean = false;
  initalizeScene(canvas: HTMLElement){
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 50, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize( this.canvas.clientWidth, this.canvas.clientHeight );
    this.canvas.appendChild( this.renderer.domElement);
    this.renderer.setClearColor( Colors.purple800);
    this.camera.position.z = 20;
    this.camera.position.y = 0;
    this.camera.updateMatrix();
    this.addOrbitControls();
    this.addLight();
    this.displayScene();
    this.scene.add(this.pointGroup);
    this.scene.add(this.otherObjectsGroup);
    this.sceneInitializedSubject.next();
    this.sceneHasBeenInitialized = true;
  }
  reinitializePoints(){
    this.pointGroup.removeFromParent();
    this.pointGroup = new THREE.Group();
    this.scene.add(this.pointGroup);
  }
  reinitializeObjects(){
    this.otherObjectsGroup.removeFromParent();
    this.otherObjectsGroup = new THREE.Group();
    this.scene.add(this.otherObjectsGroup);
  }
  addOrbitControls(){
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
      // orbitControls.enabled = false;
  }
  disableOrbiting(){
    this.orbitControls.reset();
    this.orbitControls.enableRotate = false;
  }
  enableOrbiting(){

    this.orbitControls.enableRotate = true;
  }
  set3DView(){
    console.log(this.camera.rotation);
    if(Math.abs(this.camera.rotation.x) <0.05 && Math.abs(this.camera.rotation.y) <0.05 && Math.abs(this.camera.rotation.z) <0.05){
      this.orbitControls.reset();
      this.camera.position.z = 15;
      this.camera.position.y = 15;
      this.camera.position.x = 15;
      this.camera.updateMatrix();
      this.orbitControls.update();
  }}
  displayScene(){
    requestAnimationFrame( () => this.displayScene() );
	  this.renderer.render( this.scene, this.camera );
  }
  addLight(){
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.7);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0,20,0)
    this.scene.add( ambientLight );
    this.scene.add(directionalLight);
  }
  drawToPointGroup(mesh: Mesh<any, any>){
    this.pointGroup.add(mesh);
  }
  drawToObjectGroup(mesh: Mesh<any, any>){
    this.otherObjectsGroup.add(mesh);
  }
}
