import { Injectable } from '@angular/core';
import { RootSystemPainter3D } from 'src/app/display/3D/RootSystemPainter3D';
import { colorNumber, Colors } from 'src/app/display/values/colors';
import * as THREE from "three";
import { Camera, DirectionalLightHelper, Scene, Vector2, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';

@Injectable({
  providedIn: 'root'
})
export class SceneManagerService {
  scene!: Scene;
  camera!: Camera;
  renderer!: WebGLRenderer;
  rendererDom!: HTMLCanvasElement;
  canvasReference!: HTMLElement;
  composer!: EffectComposer;
  constructor(
    
  ) { }
  initializeScene(canvasReference: HTMLElement){
    this.canvasReference = canvasReference;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, canvasReference.clientWidth / canvasReference.clientHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( canvasReference.clientWidth, canvasReference.clientHeight );
    this.rendererDom = this.renderer.domElement
    canvasReference.appendChild( this.rendererDom);
    this.camera.position.set( -20, 5, 0 );
    this.addComposer();
    this.displayScene();
    this.addOrbitControls();
  }
  reinitializeScene(){
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
    this.startDisplay();
  }

  startDisplay(){
    this.adjustBackgroundColor(Colors.purple800);
    this.addLight();
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
    const controls = new OrbitControls( this.camera, this.renderer.domElement );
  }
  addComposer(){
    const renderScene = new RenderPass(this.scene, this.camera);
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(renderScene);
    const bloomPass = new UnrealBloomPass(new Vector2(this.canvasReference.clientWidth, this.canvasReference.clientHeight),
      0.08,
      0.2,
      0.1
    );
    this.composer.addPass(bloomPass);

  }
  addLight(){
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.8);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0,30,0)
    this.scene.add( ambientLight );
    this.scene.add(directionalLight);
  }
}
