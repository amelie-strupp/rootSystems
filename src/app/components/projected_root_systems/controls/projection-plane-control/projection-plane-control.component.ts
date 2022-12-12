import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Colors } from 'src/app/display/values/colors';
import * as THREE from 'three';
import { Mesh, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-projection-plane-control',
  templateUrl: './projection-plane-control.component.html',
  styleUrls: ['./projection-plane-control.component.sass']
})
export class ProjectionPlaneControlComponent {
  @ViewChild('canvas') canvas!: ElementRef;
  @Input() rotateX: number = 0;
  @Input() rotateY: number = 0;
  @Input() rotateZ: number = 0;
  scene!: THREE.Scene;
  camera!: THREE.Camera;
  renderer!: THREE.WebGLRenderer;
  plane?: Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>;
  ngOnChanges(){
    this.adjustRotationToInput();
  }
  ngAfterViewInit(){
    this.initalizeThree();
  }
  initalizeThree(){
    const canvasElement = this.canvas.nativeElement;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 50, canvasElement.clientWidth / canvasElement.clientHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize( canvasElement.clientWidth, canvasElement.clientHeight );
    canvasElement.appendChild( this.renderer.domElement);
    this.renderer.setClearColor( Colors.purple800);
    this.camera.position.z = 20;
    this.camera.position.y = 4
    this.camera.updateMatrix();
    this.addOrbitControls();
    this.addLight();
    // this.drawSphere();
    this.drawPlane();
    this.addCircles();
    this.displayScene();
  }
  adjustRotationToInput(){
    this.plane?.rotation.set(this.rotateX, this.rotateY, this.rotateZ);
  }
  addOrbitControls(){
      let orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
  }
  displayScene(){
    requestAnimationFrame( () => this.displayScene() );
	  this.renderer.render( this.scene, this.camera );
  }
  drawSphere(){
    const geometry = new THREE.SphereGeometry( 4, 16, 16 );
    const material = new THREE.MeshStandardMaterial( {
      color: Colors.purple200,
      wireframe: true
    } );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(0, 0, 0);
    this.scene.add(sphere);
  }
  drawPlane(){
    var dir = new THREE.Vector3(0,-1,0);
    var centroid = new THREE.Vector3(0,0,0);
    var plane = new THREE.Plane();
    plane.setFromNormalAndCoplanarPoint(dir, centroid).normalize();
    // Create a basic rectangle geometry
    var planeGeometry = new THREE.PlaneGeometry(9, 9, 9, 9);
    // Align the geometry to the plane
    var coplanarPoint: THREE.Vector3 = new Vector3();
    plane.coplanarPoint(coplanarPoint);
    var focalPoint = new THREE.Vector3().copy(coplanarPoint).add(plane.normal);
    planeGeometry.lookAt(focalPoint);
    planeGeometry.translate(coplanarPoint.x, coplanarPoint.y, coplanarPoint.z);
    // Create mesh with the geometry
    var planeMaterial = new THREE.MeshStandardMaterial(
      {
        
        color: Colors.white, side: THREE.DoubleSide, opacity: 0.8
    });
    this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
    this.plane.rotateX(0);
    this.plane.rotateY(0);
    this.plane.rotateZ(0);

    this.scene.add(this.plane);
  }
  addLight(){
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.8);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0,30,0)
    this.scene.add( ambientLight );
    this.scene.add(directionalLight);
  }
  addCircles(){
    const geometryX = new THREE.TorusGeometry( 3.0, 0.4, 16, 100 );
    const materialX = new THREE.MeshLambertMaterial( { color: Colors.red } );
    
    const torusX = new THREE.Mesh( geometryX, materialX );
    torusX.rotateY(Math.PI/2);

    this.scene.add( torusX );
    
    const geometryY = new THREE.TorusGeometry( 3.0, 0.4, 16, 100 );
    const materialY = new THREE.MeshLambertMaterial( { color: Colors.blue } );
    const torusY = new THREE.Mesh( geometryY, materialY );
    torusY.rotateX(Math.PI/2);
    this.scene.add( torusY );

    const geometryZ = new THREE.TorusGeometry( 3.0, 0.4, 16, 100 );
    const materialZ = new THREE.MeshLambertMaterial( { color: Colors.yellow } );
    const torusZ = new THREE.Mesh( geometryZ, materialZ );
    torusY.rotateZ(Math.PI/2);
    this.scene.add( torusZ );
  }
}
