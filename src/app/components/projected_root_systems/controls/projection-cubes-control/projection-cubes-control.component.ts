import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Colors } from 'src/app/display/values/colors';
import * as THREE from 'three';
import { Mesh, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-projection-cubes-control',
  templateUrl: './projection-cubes-control.component.html',
  styleUrls: ['./projection-cubes-control.component.sass']
})
export class ProjectionCubesControlComponent {
  @ViewChild('canvas') canvas!: ElementRef;
  @Input() rotateX: number = Math.PI/4;
  @Input() rotateY: number = 0;
  @Input() color1: string = Colors.red;
  @Input() color2: string = Colors.blue;
  scene!: THREE.Scene;
  camera!: THREE.Camera;
  renderer!: THREE.WebGLRenderer;
  cube?: Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
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
    this.drawCube();
    this.addCircles();
    this.displayScene();
  }
  adjustRotationToInput(){
    this.cube?.rotation.set(this.rotateX, this.rotateY, 0);
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
  drawCube(){
    const geometry = new THREE.BoxGeometry( 4, 4, 4);
    var material = new THREE.MeshLambertMaterial(
      {
        color: Colors.white
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.rotateX(this.rotateX);
    this.cube.rotateY(this.rotateY);
    this.scene.add(this.cube);
  }
  addLight(){
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.8);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10,50,0)
    this.scene.add( ambientLight );
    this.scene.add(directionalLight);
  }
  addCircles(){
    const geometryX = new THREE.TorusGeometry( 5, 0.5, 16, 100 );
    const materialX = new THREE.MeshLambertMaterial( { color: this.color1 } );
    
    const torusX = new THREE.Mesh( geometryX, materialX );
    torusX.rotateY(Math.PI/2);

    this.scene.add( torusX );
    
    const geometryY = new THREE.TorusGeometry( 5, 0.5, 16, 100 );
    const materialY = new THREE.MeshLambertMaterial( { color: this.color2 } );
    const torusY = new THREE.Mesh( geometryY, materialY );
    torusY.rotateX(Math.PI/2);
    this.scene.add( torusY );

  }

}
