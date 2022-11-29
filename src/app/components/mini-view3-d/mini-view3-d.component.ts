import { Component, ElementRef, ViewChild } from '@angular/core';
import { SceneManagerService } from 'src/app/services/3D/scene-manager.service';

@Component({
  selector: 'app-mini-view3-d',
  templateUrl: './mini-view3-d.component.html',
  styleUrls: ['./mini-view3-d.component.sass']
})
export class MiniView3DComponent {
  @ViewChild('miniView') miniViewCont!: ElementRef;

  constructor(private sceneManager: SceneManagerService){
  }
  ngAfterViewInit(){
    this.initializeThreeJs();
  }
  initializeThreeJs(){
    this.sceneManager.initializeMiniView(this.miniViewCont.nativeElement);
  }
}
