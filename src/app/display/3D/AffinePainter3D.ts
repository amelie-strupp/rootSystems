import { Injectable } from "@angular/core";
import { RootSystem3DService } from "src/app/logic/maths/3D/root-system3-d.service";
import { Paint3dService } from "src/app/services/3D/paint3d.service";
import { RootSystemTransformer3DService } from "src/app/services/3D/root-system-transformer3-d.service";
import { SceneManagerService } from "src/app/services/3D/scene-manager.service";

@Injectable({
    providedIn: 'root',
  })
  export class RootSystemPainter3D implements Painter3D {
    constructor(
      private painter: Paint3dService,
      private rootSystemService: RootSystem3DService,
      private sceneManager: SceneManagerService,
      private transformServiece: RootSystemTransformer3DService
    ) {
    //   addEventListener("resize", (event) => {
    //     this.repaint();
    //   });
    //   this.rootSystem = rootSystemService.rootSystem;
    //   this.rootSystemService.rootSystemChangeEvent.subscribe(() => {
    //     if(this.rootSystemService.rootSystem.type != this.rootSystem.type){
    //       this.clearRootHighlight();
    //       this.clearHyperplaneVisibility();
    //     }
        
    //     this.repaint();
    //   });
    }
    // colorMode: RootSystemColorMode = RootSystemColorMode.base;
    // highlightedRoots: Array<Root3D> = [];
    // rootWithVisibleHyperplanes: Array<Root3D> = [];
  
    // rootSystem: RootSystem3D = rootSystems3D.A3;
    // repaint(){
    //   this.sceneManager.reinitializeScene();
    //   this.rootSystem = this.rootSystemService.rootSystem;
    //   this.paint();
    // }
    paint(): void {
      // this.paintAxis();
      this.paintAffineHyperplanes();
    }
    paintAffineHyperplanes(){

    }
  }  