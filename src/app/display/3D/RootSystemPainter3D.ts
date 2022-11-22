import { Injectable } from '@angular/core';
import { rootSystems3D } from 'src/app/data/rootSystems3D';
import { Hyperplane3D } from 'src/app/logic/maths/3D/Hyperplane3D';
import { RootSystem3DService } from 'src/app/logic/maths/3D/root-system3-d.service';
import RootSystem3D, { Root3D } from 'src/app/logic/maths/3D/RootSystem3D';
import Line3D from 'src/app/logic/maths_objects/3D/Line3D';
import Point3D from 'src/app/logic/maths_objects/3D/Point3D';
import Sphere3D from 'src/app/logic/maths_objects/3D/Sphere3D';
import WeylChamber3D from 'src/app/logic/maths_objects/3D/WeylChamber3D';
import { Paint3dService } from 'src/app/services/3D/paint3d.service';
import { SceneManagerService } from 'src/app/services/3D/scene-manager.service';
import { Color } from 'three';
import { colorNumber, Colors } from '../values/colors';
import Painter3D from './Painter3D';

@Injectable({
  providedIn: 'root',
})
export class RootSystemPainter3D implements Painter3D {
  constructor(
    private painter: Paint3dService,
    private rootSystemService: RootSystem3DService,
    private sceneManager: SceneManagerService
  ) {
    this.rootSystem = rootSystemService.rootSystem;
    this.rootSystemService.rootSystemChangeEvent.subscribe(() => {
      this.rootWithVisibleHyperplanes = [];
      this.highlightedRoots = [];

      this.repaint();
    });
  }
  colorMode: RootSystemColorMode = RootSystemColorMode.highlight;
  highlightedRoots: Array<Root3D> = [];
  rootWithVisibleHyperplanes: Array<Root3D> = [];

  rootSystem: RootSystem3D = rootSystems3D.A3;
  repaint(){
    this.sceneManager.reinitializeScene();
    this.rootSystem = this.rootSystemService.rootSystem;
    this.paint();
  }
  paint(): void {
    // this.paintAxis();
    this.paintCenter();
    this.paintRoots();
    this.paintHyperplanes();
    this.paintWeylChambers();
  }
  switchColorMode(colorMode: RootSystemColorMode){
    this.colorMode = colorMode;
    this.repaint();
  }
  highlightRoot(root: Root3D){
    this.highlightedRoots.push(root);
    this.repaint();
  }
  removeHighlightFromRoot(root: Root3D){
    this.highlightedRoots = this.highlightedRoots.filter((other)=>!other.equal(root))
    this.repaint();
  }
  showHyperplaneToRoot(root: Root3D){
    this.rootWithVisibleHyperplanes.push(root);
    this.repaint();
  }
  hideHyperplaneToRoot(root: Root3D){
    this.rootWithVisibleHyperplanes = this.rootWithVisibleHyperplanes.filter((other)=>!other.equal(root))
    this.repaint();

  }
  rootIsHighlighted(root: Root3D){
    return this.highlightedRoots.some((highlightedRoot)=>highlightedRoot.equal(root));
  }
  hyperplaneToRootIsVisible(root: Root3D){
    return this.rootWithVisibleHyperplanes.some((other)=>other.equal(root));

  }
  paintCenter() {
    this.painter.drawSphere(
      new Sphere3D({
        center: new Point3D(0, 0, 0),
        radius: 0.1,
        color: Colors.white,
      })
    );
  }
  paintAxis() {
    this.painter.drawLine(
      new Line3D({
        start: new Point3D(100, 0, 0),
        end: new Point3D(-100, 0, 0),
        color: Colors.purple500,
        width: 0.03,
      })
    );
    this.painter.drawLine(
      new Line3D({
        start: new Point3D(-100, 0, 0),
        end: new Point3D(100, 0, 0),
        color: Colors.purple500,
        width: 0.03,
      })
    );

    this.painter.drawLine(
      new Line3D({
        start: new Point3D(0, -100, 0),
        end: new Point3D(0, 0, 0),
        color: Colors.purple500,
        width: 0.03,
      })
    );
    this.painter.drawLine(
      new Line3D({
        start: new Point3D(0, 100, 0),
        end: new Point3D(0, 0, 0),
        color: Colors.purple500,
        width: 0.03,
      })
    );
    this.painter.drawLine(
      new Line3D({
        start: new Point3D(0, 0, 100),
        end: new Point3D(0, 0, -100),
        color: Colors.purple500,
        width: 0.03,
      })
    );
    this.painter.drawLine(
      new Line3D({
        start: new Point3D(0, 0, -100),
        end: new Point3D(0, 0, 100),
        color: Colors.purple500,
        width: 0.03,
      })
    );
  }

  paintHyperplanes() {
    let i = 0;
    const colorSystem = rootSystemColors[this.rootSystem.type];
    for (let root of this.rootSystem.getPositiveRoots()) {
      let hyperplane = root.getHyperplane();
      if(this.colorMode == RootSystemColorMode.highlight){
              if(this.rootIsHighlighted(root)){
                hyperplane.color = colorSystem[i];
              }
              if(this.hyperplaneToRootIsVisible(root)){
                this.painter.drawPlane(hyperplane);
              }
      }
      i+=1;
    }
  }
  paintRoots() {
    let i = 0;
    for (let root of this.rootSystem.getPositiveRoots()) {
      this.paintRoot(root, i);
      this.paintRoot(root.getNegative(), i);
      i+=1;
    }
  }
  paintRoot(root: Root3D, index: number) {
    if (this.colorMode == RootSystemColorMode.base) {
      this.paintRootWithBaseMarked(root);
    }
    else if(this.colorMode == RootSystemColorMode.positiveRoots){
      this.paintRootWithPositiveMarked(root);
    }else if(this.colorMode == RootSystemColorMode.highlight){
      this.paintRootWithHighlight(root, index);
    }
  }
  paintRootWithHighlight(root: Root3D, index: number){
    const colorSystem = rootSystemColors[this.rootSystem.type];
    let color = Colors.white;
    if(this.rootIsHighlighted(root) || this.rootIsHighlighted(root.getNegative())){
      color = colorSystem[index];
    }
    this.painter.drawSphere(
      new Sphere3D({
        center: root.getVector(),
        radius: 0.1,
        color: color,
      })
    );
    this.painter.drawLine(
      new Line3D({
        start: Point3D.getZero(),
        end: root.getVector(),
        width: 0.04,
        color: Colors.white,
      })
    );
  }
  paintRootWithPositiveMarked(root: Root3D){
    if (root.isPositive) {
      this.painter.drawSphere(
        new Sphere3D({
          center: root.getVector(),
          radius: 0.1,
          color: Colors.brightRed,
        })
      );
    } else {
      this.painter.drawSphere(
        new Sphere3D({
          center: root.getVector(),
          radius: 0.1,
          color: Colors.brightGreen,
        })
      );
    }
    this.painter.drawLine(
      new Line3D({
        start: Point3D.getZero(),
        end: root.getVector(),
        width: 0.04,
        color: Colors.white,
      })
    );
}

  paintRootWithBaseMarked(root: Root3D){
      if (root.isSimple) {
        this.painter.drawSphere(
          new Sphere3D({
            center: root.getVector(),
            radius: 0.1,
            color: Colors.brightRed,
          })
        );
      } else {
        this.painter.drawSphere(
          new Sphere3D({
            center: root.getVector(),
            radius: 0.1,
            color: Colors.brightGreen,
          })
        );
      }
      this.painter.drawLine(
        new Line3D({
          start: Point3D.getZero(),
          end: root.getVector(),
          width: 0.04,
          color: Colors.white,
        })
      );
    
  }
  paintWeylChambers() {
    const fundamentalWeylChamber = this.rootSystem.getFundamentalWeylChamber();
    this.painter.drawWeylChamber(fundamentalWeylChamber);
  }
}

export const rootSystemColors = {
  A3: [
    Colors.red,
    Colors.orange,
    Colors.yellow,
    Colors.turqouis,
    Colors.green,
    Colors.blue,
  ],
  D3: [
    Colors.red,
    Colors.orange,
    Colors.yellow,
    Colors.turqouis,
    Colors.green,
    Colors.blue,
  ],
  C3: [
    Colors.purpleDark,
    Colors.pink,
    Colors.red,
    Colors.orange,
    Colors.yellow,
    Colors.turqouis,
    Colors.green,
    Colors.blue,
    Colors.azulDark,
  ],
  B3: [
    Colors.purpleDark,
    Colors.pink,
    Colors.red,
    Colors.orange,
    Colors.yellow,
    Colors.turqouis,
    Colors.green,
    Colors.blue,
    Colors.azulDark,
  ],
};
export enum RootSystemColorMode {
  base,
  positiveRoots,
  highlight,
}
