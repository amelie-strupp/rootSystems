import { Injectable } from "@angular/core";
import { Root } from "src/app/logic/maths/2D/RootSystem";
import { Hyperplane3D } from "src/app/logic/maths/3D/Hyperplane3D";
import { RootSystem3DService } from "src/app/logic/maths/3D/root-system3-d.service";
import { Root3D } from "src/app/logic/maths/3D/RootSystem3D";
import Line3D from "src/app/logic/maths_objects/3D/Line3D";
import Point3D from "src/app/logic/maths_objects/3D/Point3D";
import Sphere from "src/app/logic/maths_objects/3D/Sphere3D";
import { Paint3dService } from "src/app/services/3D/paint3d.service";
import { RootSystemTransformer3DService } from "src/app/services/3D/root-system-transformer3-d.service";
import { SceneManagerService } from "src/app/services/3D/scene-manager.service";
import { Colors } from "../values/colors";
import Painter3D from "./Painter3D";

@Injectable({
    providedIn: 'root',
  })
  export class AffineRootSystemPainter3D implements Painter3D {
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
        let posRoots = this.rootSystemService.rootSystem.getRoots();
        let hyperplanes: Array<{root: Root3D, hyperplanes: Array<Hyperplane3D>}> = [];
        for(let root of posRoots){
            hyperplanes.push({root: root, hyperplanes:[]})
            const rootHyperplane = root.getHyperplane();
            const dual = root.getVector();
            for(let i = -2; i <= 2; ++i){ 
                hyperplanes[hyperplanes.length-1].hyperplanes.push(
                    new Hyperplane3D(
                        rootHyperplane.normalVector,
                        dual.stretchedBy(i)
                    )
                )
            }
        }
        function getCutsOfHyperplanes(
            hyperplanes1: Array<Hyperplane3D>,
            hyperplanes2: Array<Hyperplane3D>,
            hyperplanes3: Array<Hyperplane3D>,
            ){
            const cuts: Array<Point3D> = [];
                for(let h1 of hyperplanes1){
                    for(let h2 of hyperplanes2){
                        for(let h3 of hyperplanes3){
                            let cut = h1.getIntersectionWithTwoOtherPlanes(
                                h2.getPlaneAsThreePlane(),
                                h3.getPlaneAsThreePlane()
                            );
                            if(cut != null)
                                cuts.push(cut);               
                        }
                    }
                }
            return cuts;
        }
        const allCuts: Array<Point3D> = [];
        const allCutLines: Array<THREE.Line3> = [];

        for(let hyperplanes1 of hyperplanes){
            for(let hyperplanes2 of hyperplanes){
                for(let hyperplanes3 of hyperplanes){
                    if(hyperplanes1 == hyperplanes2 || hyperplanes1 == hyperplanes3 || hyperplanes2 == hyperplanes3){
                        continue;
                    }
                    let newCuts = getCutsOfHyperplanes(
                        hyperplanes1.hyperplanes,
                        hyperplanes2.hyperplanes,
                        hyperplanes3.hyperplanes
                    )
                    allCuts.push(...newCuts);
                }
            }
        }
        const unique = [...new Map(allCuts.map(item => [`
        ${item.x.toFixed(2)} +
        ${item.y.toFixed(2)} +
        ${item.z.toFixed(2)}`, item])).values()]
        for(let cut of unique){
            if(cut.length() < 7)
            this.painter.drawSphere(new Sphere(
                {center: cut, radius: 0.1, color: Colors.white}
            ))
            
        }

    }
  }  