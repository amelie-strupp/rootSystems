import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import AffinePainter from 'src/app/display/2D/painters/AffinePainter';
import { AffineRootSystemPainter3D } from 'src/app/display/3D/AffinePainter3D';
import { RootSystemPainter3D } from 'src/app/display/3D/RootSystemPainter3D';
import { Paint3dService } from 'src/app/services/3D/paint3d.service';
import { SceneManagerService } from 'src/app/services/3D/scene-manager.service';
import * as THREE from "three";
@Component({
  selector: 'app-root-systems3-d',
  templateUrl: './root-systems3-d.component.html',
  styleUrls: ['./root-systems3-d.component.sass'],

})
export class RootSystems3DComponent implements OnInit {
  @ViewChild('canvas') canvas!: ElementRef;
  constructor(
    private sceneManager: SceneManagerService,
    private rootSystemPainter: RootSystemPainter3D,
    private affinePainter: AffineRootSystemPainter3D) {  
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.initializeThreeJs();
    this.rootSystemPainter.paint();
    // AFFINE
    // this.affinePainter.paint();
  }
  initializeThreeJs(){
    this.sceneManager.initializeScene(this.canvas.nativeElement);
    this.sceneManager.startDisplay();
  }
}
