import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {RootSystemPainter3D } from 'src/app/display/3D/RootSystemPainter3D';
import { RootSystemColorMode, rootSystemColors } from 'src/app/display/RootSystemColorMode';
import { Colors } from 'src/app/display/values/colors';
import { RootSystem3DService } from 'src/app/logic/maths/3D/root-system3-d.service';
import RootSystem3D, { Root3D } from 'src/app/logic/maths/3D/RootSystem3D';

@Component({
  selector: 'app-object-selector3-d',
  templateUrl: './object-selector3-d.component.html',
  styleUrls: ['./object-selector3-d.component.sass'],
  animations:[
    trigger('expanded', [
      state('true', style({
        height: '*',
      })),
      state('false', style({
        height: '0',
      })),
      transition('* => *', [
        animate('125ms ease-in-out')
      ]),

    ]),
  ]
})
export class ObjectSelector3DComponent implements OnInit {
  RootSystemColorMode = RootSystemColorMode;
  rootSystemColors: Array<Colors> = [];
  Colors = Colors;
  isExpanded: boolean = true;
  roots: Array<Root3D>;
  rootListForDisplay: Array<Array<Root3D>> = [];
  constructor(
    private rootSystemService: RootSystem3DService,
    private rootSystemPainter: RootSystemPainter3D
  ) {
      this.rootSystemColors = rootSystemColors[rootSystemService.rootSystem.type];
      this.rootSystemService.rootSystemChangeEvent.subscribe(() => {
        this.rootSystemColors = rootSystemColors[rootSystemService.rootSystem.type];
        this.roots = this.getRoots();
        this.rootListForDisplay = this.getDividedRootListForDisplay();
      })
      this.roots = this.getRoots();
      this.rootListForDisplay = this.getDividedRootListForDisplay();

    }
  toggleExpand(){
    this.isExpanded = !this.isExpanded;
  }
  ngOnInit(): void {
  }
  switchHighlightMode(colorMode: RootSystemColorMode){
    // If switch is called with the same color mode - switch to highlight mode
    if(colorMode == this.getCurrentColorMode()){
      this.rootSystemPainter.switchColorMode(RootSystemColorMode.highlight)
    }else{
      this.rootSystemPainter.switchColorMode(colorMode);

    }
  }
  toggleRootHighlight(root: Root3D){
    this.rootSystemPainter.switchColorMode(RootSystemColorMode.highlight);
    if(this.rootSystemPainter.rootIsHighlighted(root)){
      this.rootSystemPainter.removeHighlightFromRoot(root);
    }else{
      this.rootSystemPainter.highlightRoot(root);
    }
  }
  hyperplaneToRootVisible(root: Root3D){
    return this.rootSystemPainter.hyperplaneToRootIsVisible(root);
  }
  rootHighlighted(root: Root3D){
    return this.rootSystemPainter.rootIsHighlighted(root);
  }
  getRoots(){
    return this.rootSystemService.rootSystem.getPositiveRoots();
  }
  toggleHyperplane(root: Root3D){
    if(!this.rootSystemPainter.hyperplaneToRootIsVisible(root)){
          this.rootSystemPainter.showHyperplaneToRoot(root);
    }else{
      this.rootSystemPainter.hideHyperplaneToRoot(root);
    }
  }
  allRootsHighlighted(){
    return this.rootSystemPainter.allRootsHighlighted();
  }
  allHyperplanesVisible(){
    return this.rootSystemPainter.allHyperplanesVisible()
  }
  toggleAllRootsHighlighted(){
    if(this.allRootsHighlighted()){
      this.rootSystemPainter.clearRootHighlight();
    }else{
    this.rootSystemPainter.highlightAllRoots();
    this.rootSystemPainter.switchColorMode(RootSystemColorMode.highlight)
    }
  }
  toggleAllRootsHyperplanes(){
    if(this.allHyperplanesVisible()){
      this.rootSystemPainter.clearHyperplaneVisibility();
    }else{
    this.rootSystemPainter.showAllHyperplanes();
    }
  }
  getColor(root: Root3D){
    return this.rootSystemColors[this.roots.findIndex((other)=>other.equal(root))];
  }
  getCurrentColorMode(){
    return this.rootSystemPainter.colorMode;
  }
  getDividedRootListForDisplay(){
    let dividedRootList: Array<Array<Root3D>> = [];
    let rootCounter = 0;
    let sectionCounter = -1;
    while(rootCounter <= this.roots.length-1){
      if(rootCounter % 10 == 0 && rootCounter != this.roots.length-1){
        sectionCounter += 1
        dividedRootList.push([])
      }
      dividedRootList[sectionCounter].push(this.roots[rootCounter]);
      rootCounter += 1;
    }
    return dividedRootList;
  }
}
