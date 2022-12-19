import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import RootSystemPainter from 'src/app/display/2D/painters/RootSystemPainter';
import { RootSystemColorMode, rootSystemColors } from 'src/app/display/RootSystemColorMode';
import { Colors } from 'src/app/display/values/colors';
import { RootSystemService } from 'src/app/logic/maths/2D/root-system.service';
import { Root } from 'src/app/logic/maths/2D/RootSystem';

@Component({
  selector: 'app-object-selector2-d',
  templateUrl: './object-selector2-d.component.html',
  styleUrls: ['./object-selector2-d.component.sass'],
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
export class ObjectSelector2DComponent implements OnInit {
  RootSystemColorMode = RootSystemColorMode;
  rootSystemColors: Array<Colors> = [];
  Colors = Colors;
  isExpanded: boolean = true;
  roots: Array<Root>;
  rootListForDisplay: Array<Array<Root>> = [];
  isAffineRootSystem: boolean = false;
  showDominantWeights: boolean = false;
  constructor(
    private rootSystemService: RootSystemService,
    private rootSystemPainter: RootSystemPainter,
    private cd: ChangeDetectorRef
  ) {
    this.rootSystemService.repaintEvent.subscribe(() => {
      this.rootSystemColors = rootSystemColors[rootSystemService.rootSystem.type];
      this.roots = this.rootSystemService.getPositiveRoots();
      this.showDominantWeights = this.rootSystemPainter.showDominantWeights;
      this.cd.detectChanges();
    })
      this.rootSystemColors = rootSystemColors[rootSystemService.rootSystem.type];
      this.roots = this.rootSystemService.getPositiveRoots();
      if(window.innerWidth < 1000){
        this.isExpanded = false;
      }
    }
  toggleExpand(){
    this.isExpanded = !this.isExpanded;
  }
  ngOnInit(): void {
  }
  switchHighlightMode(colorMode: RootSystemColorMode){
      this.rootSystemPainter.switchColorMode(colorMode);
  }

  switchAffineVersion(showAffine: boolean){
    this.isAffineRootSystem = showAffine;
    this.rootSystemPainter.switchVersion(this.isAffineRootSystem);
  }
  toggleRootHighlight(root: Root){
    if(this.rootSystemPainter.rootIsHighlighted(root)){
      this.rootSystemPainter.removeHighlightFromRoot(root);
    }else{
      this.rootSystemPainter.highlightRoot(root);
    }
  }
  toggleDominantWeights(){
    this.showDominantWeights = !this.showDominantWeights;
    this.rootSystemPainter.setDisplayStateOfDominantWeights(this.showDominantWeights)
  }
  hyperplaneToRootHighlighted(root: Root){
    return this.rootSystemPainter.hyperplaneToRootHighlighted(root);
  }
  rootHighlighted(root: Root){
    return this.rootSystemPainter.rootIsHighlighted(root);
  }
  getPositiveRoots(){
    return this.rootSystemService.rootSystem.getPositiveRoots();
  }
  toggleHyperplane(root: Root){
    if(!this.rootSystemPainter.hyperplaneToRootHighlighted(root)){
          this.rootSystemPainter.highlightHyperplaneToRoot(root);
    }else{
      this.rootSystemPainter.removeHighlightOfHyperplaneToRoot(root);
    }
  }
  allRootsHighlighted(){
    return this.rootSystemPainter.allRootsHighlighted();
  }
  allHyperplanesHighlighted(){
    return this.rootSystemPainter.allHyperplanesHighlighted()
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
    if(this.allHyperplanesHighlighted()){
      this.rootSystemPainter.clearHyperplaneHighlight();
    }else{
    this.rootSystemPainter.highlightAllHyperplanes();
    }
  }
  getColor(root: Root){
    return this.rootSystemColors[this.roots.findIndex((other)=>other.equal(root))];
  }
  getCurrentColorMode(){
    return this.rootSystemPainter.colorMode;
  }
  getDividedRootListForDisplay(){
    let dividedRootList: Array<Array<Root>> = [];
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
