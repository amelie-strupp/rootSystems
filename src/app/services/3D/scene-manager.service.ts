import { HostListener, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { colorNumber, Colors } from 'src/app/display/values/colors';
import * as THREE from "three";
import { Camera, DirectionalLightHelper, Matrix4, PerspectiveCamera, Scene, Vector2, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';

@Injectable({
  providedIn: 'root'
})
export class SceneManagerService {
  scene!: Scene;
  camera!: PerspectiveCamera;
  renderer!: WebGLRenderer;
  rendererDom!: HTMLCanvasElement;
  canvasReference!: HTMLElement;
  composer!: EffectComposer;
  orbitControls!: OrbitControls;
  rootGroup: THREE.Group = new THREE.Group();
  hyperplaneGroup: THREE.Group = new THREE.Group();
  weylChamberGroup: THREE.Group = new THREE.Group();

  reinitializedScene: Subject<void> = new Subject();

  // Same objects for the small display without the transformations applied to it
  rendererMiniView!: WebGLRenderer;
  sceneMiniView!: Scene;
  cameraMiniView!: PerspectiveCamera;
  rendererDomMiniView!: HTMLCanvasElement;
  canvasReferenceMiniView!: HTMLElement;
  miniViewRootSystemGroup: THREE.Group = new THREE.Group();
  miniViewOrbitControls!: OrbitControls;



  constructor() {
    
  }

  initializeScene(canvasReference: HTMLElement){
    this.canvasReference = canvasReference;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 50, canvasReference.clientWidth / canvasReference.clientHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer({antialias: true});

    this.renderer.setSize( canvasReference.clientWidth, canvasReference.clientHeight );
    this.rendererDom = this.renderer.domElement
    canvasReference.appendChild( this.rendererDom);
    this.camera.position.set( -20, 5, 0 );
    if(this.canvasReference.clientWidth < 500){
      this.camera.position.set( -25, 5, 0 );
      this.camera.updateProjectionMatrix();
    }
    if(this.canvasReference.clientHeight < 700){
      this.camera.position.set( -30, 5, 0 );
      this.camera.updateProjectionMatrix();
    }
    this.camera.updateProjectionMatrix();
    this.addOrbitControls();

    this.addComposer();
    this.displayScene();
    this.scene.add( this.rootGroup );
    this.scene.add(this.weylChamberGroup);
    this.scene.add(this.hyperplaneGroup)
    this.reactToMainSceneOrbitChange();
  }
  initializeMiniView(canvasReference: HTMLElement){
    this.canvasReferenceMiniView = canvasReference;
    this.sceneMiniView = new THREE.Scene();
    this.cameraMiniView = new THREE.PerspectiveCamera( 50, canvasReference.clientWidth / canvasReference.clientHeight, 0.1, 70 );
    this.rendererMiniView = new THREE.WebGLRenderer();
    this.rendererMiniView.setSize( canvasReference.clientWidth, canvasReference.clientHeight );
    this.rendererDomMiniView = this.rendererMiniView.domElement
    canvasReference.appendChild( this.rendererDomMiniView);
    this.cameraMiniView.position.set( -20, 5, 0 );

    // Display the mini view
    this.displayMiniView();
    this.startMiniViewDisplay();
    this.sceneMiniView.add( this.miniViewRootSystemGroup );
    this.addOrbitControlsToMiniView();
    this.reactToMainSceneOrbitChange();
  }
  addOrbitControlsToMiniView(){
    this.miniViewOrbitControls = new OrbitControls(this.cameraMiniView, this.rendererMiniView.domElement);
    this.miniViewOrbitControls.enabled = false;
  }
  rerender(){
    this.renderer.render(this.scene, this.camera);
    this.composer.render();
  }
  addToRootGroup(object: any){
    this.rootGroup.add( object );
    this.miniViewRootSystemGroup.add(object.clone());
  }
  addToWeylChamberGroup(object: any){
    this.weylChamberGroup.add( object );
    this.miniViewRootSystemGroup.add(object.clone());
  }
  addToHyperplaneGroup(object: any){
    this.hyperplaneGroup.add( object );
    this.miniViewRootSystemGroup.add(object.clone());
  }
  removeTransformations(){
    this.rootGroup.position.set( 0, 0, 0 );
    this.rootGroup.rotation.set( 0, 0, 0 );
    this.rootGroup.scale.set( 1, 1, 1 );
    this.rootGroup.updateMatrix();

    this.hyperplaneGroup.position.set( 0, 0, 0 );
    this.hyperplaneGroup.rotation.set( 0, 0, 0 );
    this.hyperplaneGroup.scale.set( 1, 1, 1 );
    this.hyperplaneGroup.updateMatrix();


    this.weylChamberGroup.position.set( 0, 0, 0 );
    this.weylChamberGroup.rotation.set( 0, 0, 0 );
    this.weylChamberGroup.scale.set( 1, 1, 1 );
    this.weylChamberGroup.updateMatrix();
  }
  setTransformations(transformationMatrix: Matrix4, appliedTo: Array<"ROOTS" | "HYPERPLANES"|"WEYL_CHAMBERS">){
    // Set the inital transformation to none
    this.removeTransformations();
    if(appliedTo.includes('ROOTS')){
          this.rootGroup.applyMatrix4(transformationMatrix);
    }
    if(appliedTo.includes('HYPERPLANES')){
      this.hyperplaneGroup.applyMatrix4(transformationMatrix);
    }
    if(appliedTo.includes('WEYL_CHAMBERS')){
      this.weylChamberGroup.applyMatrix4(transformationMatrix);
    }
  }
  clearScene(){
    if(!this.scene){
      return
    }
    function clearThree(obj: any){
      while(obj.children.length > 0){ 
        clearThree(obj.children[0]);
        obj.remove(obj.children[0]);
      }
      if(obj.geometry) obj.geometry.dispose();
    
      if(obj.material){ 
        //in case of map, bumpMap, normalMap, envMap ...
        Object.keys(obj.material).forEach(prop => {
          if(!obj.material[prop])
            return;
          if(obj.material[prop] !== null && typeof obj.material[prop].dispose === 'function')                                  
            obj.material[prop].dispose();                                                      
        })
        obj.material.dispose();
      }
    }   
    clearThree(this.scene);
    clearThree(this.sceneMiniView);
  }
  reinitializeScene(){
    this.clearScene();
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvasReference.clientWidth,this.canvasReference.clientHeight)

    this.rootGroup = new THREE.Group();
    this.hyperplaneGroup = new THREE.Group();
    this.weylChamberGroup = new THREE.Group();
    this.miniViewRootSystemGroup = new THREE.Group();
    this.scene.add( this.rootGroup );
    this.scene.add( this.hyperplaneGroup );
    this.scene.add( this.weylChamberGroup );

    this.sceneMiniView.add(this.miniViewRootSystemGroup);
    this.startMiniViewDisplay();
    this.startDisplay();
    this.reinitializedScene.next();
  }
  startDisplay(){
    this.adjustBackgroundColor(Colors.purple800);
    this.addLight();
  }
  startMiniViewDisplay(){
      // Set the background color of the mini view
      this.rendererMiniView.setClearColor( Colors.purple800);
      const ambientLight = new THREE.AmbientLight( 0xffffff, 0.8);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(0,30,0)
      this.sceneMiniView.add( ambientLight );
      this.sceneMiniView.add(directionalLight);
  }
  displayMiniView(){
    requestAnimationFrame( () => this.displayMiniView() );
	  this.rendererMiniView.render( this.sceneMiniView, this.cameraMiniView );
  }
  displayScene(){
    requestAnimationFrame( () => this.displayScene() );
	  // this.renderer.render( this.scene, this.camera );
    this.composer.render();
  }
  adjustBackgroundColor(color: string){
    this.renderer.setClearColor( color);
  }
  addOrbitControls(){
    this.orbitControls = new OrbitControls( this.camera, this.renderer.domElement );
    this.orbitControls.addEventListener('change', (event) => {this.reactToMainSceneOrbitChange()});
  }
  reactToMainSceneOrbitChange(){
    // Could be called before the camera is initialized -> In that case return
    if(this.camera == undefined){
      return;
    }
    var vector = new THREE.Vector3(); // create once and reuse it!
    this.camera.getWorldPosition( vector );
    vector.setLength(21.5);
    this.cameraMiniView.position.set(vector.x, vector.y, vector.z);
    this.cameraMiniView.lookAt( new Vector3(0,0,0) );
  }
  addComposer(){
    const renderScene = new RenderPass(this.scene, this.camera);
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(renderScene);
    // const bloomPass = new UnrealBloomPass(new Vector2(this.canvasReference.clientWidth, this.canvasReference.clientHeight),
    //   0.08,
    //   0.2,
    //   0.1
    // );
    // this.composer.addPass(bloomPass);

  }
  addLight(){
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.8);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0,30,0)
    this.scene.add( ambientLight );
    this.scene.add(directionalLight);
  }
}
