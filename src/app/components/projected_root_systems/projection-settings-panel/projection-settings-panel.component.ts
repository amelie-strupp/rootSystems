import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RootSystems3D, rootSystems3D } from 'src/app/data/rootSystems3D';
import { rootSystemsND } from 'src/app/data/rootSystemsND';
import { ProjectionManagerService } from 'src/app/display/projections/projection-manager.service';
import { rootSystemColors } from 'src/app/display/RootSystemColorMode';
import { Colors } from 'src/app/display/values/colors';
import RootSystem3D from 'src/app/logic/maths/3D/RootSystem3D';
import PointND from 'src/app/logic/maths/nD/PointND';
import Point3D from 'src/app/logic/maths_objects/3D/Point3D';

@Component({
  selector: 'app-projection-settings-panel',
  templateUrl: './projection-settings-panel.component.html',
  styleUrls: ['./projection-settings-panel.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations:[
    trigger('expanded', [
      state('void', style({
        height: '0',
      })),
      state('true', style({
        height: '*',
      })),
      state('false', style({
        height: '0',
      })),
      transition('true <=> false', [
        animate('125ms ease-in-out')
      ]),

    ]),
  ]
})
export class ProjectionSettingsPanelComponent {
  isExpanded: boolean = true;
  projectionStart: number = 3;
  projectionEnd: number = 2;
  selectedRootSystem3D: any;
  selectedRootSystem4D: any;
  selectedRootSystem5D: any;

  rootSystems3D = [
    {text: "A3", ref: rootSystems3D.A3},
    {text: "B3", ref: rootSystems3D.B3},
    {text: "C3", ref: rootSystems3D.C3},
  ]
  rootSystems4D = [
    {text: "A4", ref: rootSystemsND.A4},
    {text: "B4", ref: rootSystemsND.B4},
    {text: "C4", ref: rootSystemsND.C4},
    {text: "D4", ref: rootSystemsND.D4},
    {text: "F4", ref: rootSystemsND.F4},
  ]
  rootSystems5D = [
    {text: "A5", ref: rootSystemsND.A5},
    {text: "B5", ref: rootSystemsND.B5},
    {text: "C5", ref: rootSystemsND.C5},
    {text: "D5", ref: rootSystemsND.D5},
  ]
  rootSystems6D = [
    {text: "A6", ref: rootSystemsND.A6},
    {text: "B6", ref: rootSystemsND.B6},
    {text: "C6", ref: rootSystemsND.C6},
    {text: "D6", ref: rootSystemsND.D6},
    {text: "E6", ref: rootSystemsND.E6}
  ]
  constructor(private projectionManager: ProjectionManagerService){
  }
  toggleExpand(){
    this.isExpanded = !this.isExpanded;
  }
  switchProjectionType(start: number, end: number){
    this.projectionStart = start;
    this.projectionEnd = end;
    if(end == 2)
      this.projectionManager.switchProjectionType("2D")
    else if(end == 3)
      this.projectionManager.switchProjectionType("3D")
    this.projectionManager.setStartDimension(start);
    this.projectionManager.removePoints();
  }
  load3DRootSystem(rootSystem: RootSystem3D){
    let positiveRoots = rootSystem.getPositiveRoots();
    let points: Array<Point3D> = [];
    positiveRoots.forEach((r)=>{
      points.push(r.getVector());
    })
    positiveRoots.forEach((r)=>{
      points.push(r.getNegative().getVector());
    })
    let colors: Array<Colors> = [];
    switch(rootSystem.type){
      case RootSystems3D.A3:
        colors = rootSystemColors.A3;
        break;
      case RootSystems3D.B3:
        colors = rootSystemColors.B3;
        break;
      case RootSystems3D.C3:
        colors = rootSystemColors.C3;
        break;
    }
    this.projectionManager.set3DRootsAndColors(points, [...colors, ...colors]);
    this.projectionManager.drawAs2DProjection();
  }
  load4DRootSystem(type: string, positiveRoots: Array<PointND>){
    let points = [...positiveRoots, ...positiveRoots.map((r)=>r.getNegative())]
    let colors: Array<Colors> = [];
    switch(type){
      case "A4":
        colors = rootSystemColors.A4;
        break;
      case "B4":
        colors = rootSystemColors.B4;
        break;
      case "C4":
        colors = rootSystemColors.C4;
        break;
      case "D4":
        colors = rootSystemColors.D4;
        break;
      case "F4":
        colors = rootSystemColors.F4;
        break;
    }
    this.projectionManager.setNDRootsAndColors(points, [...colors, ...colors]);
    this.projectionManager.drawAs3DProjection();
  }
  load5DRootSystem(type: string, positiveRoots: Array<PointND>){
    let points = [...positiveRoots, ...positiveRoots.map((r)=>r.getNegative())]
    let colors: Array<Colors> = [];
    switch(type){
      case "A5":
        colors = rootSystemColors.A5;
        break;
      case "B5":
        colors = rootSystemColors.B5;
        break;
      case "C5":
        colors = rootSystemColors.A5;
        break;
      case "D5":
        colors = rootSystemColors.A5;
        break;
    }
    this.projectionManager.removePoints();
    
    this.projectionManager.setNDRootsAndColors(points, [...colors, ...colors]);
    if(this.projectionEnd == 2){
          this.projectionManager.projectFrom5DTo2D();
    }else{
      this.projectionManager.projectFrom5DTo3D();
    }
  }
  load6DRootSystem(type: string, positiveRoots: Array<PointND>){
    let points = [...positiveRoots, ...positiveRoots.map((r)=>r.getNegative())]
    let colors: Array<Colors> = [];
    switch(type){
      case "A6":
        colors = rootSystemColors.B5;
        break;
      case "B6":
        colors = rootSystemColors.B5;
        break;
      case "C6":
        colors = rootSystemColors.B5;
        break;
      case "D6":
        colors = rootSystemColors.B5;
        break;
      case "E6":
        colors = rootSystemColors.B5;
        break;
    }
    this.projectionManager.removePoints();
    
    this.projectionManager.setNDRootsAndColors(points, [...colors, ...colors]);
    if(this.projectionEnd == 2){
          // this.projectionManager.projectFrom6DTo3D();
    }else{
          this.projectionManager.projectFrom6DTo3D();
        }
      }
}