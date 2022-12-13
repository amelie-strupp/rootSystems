import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import AffinePainter from 'src/app/display/2D/painters/AffinePainter';
import RootSystemPainter from 'src/app/display/2D/painters/RootSystemPainter';
import { rootSystemColors } from 'src/app/display/RootSystemColorMode';
import { Colors } from 'src/app/display/values/colors';
import { Hyperplane } from 'src/app/logic/maths/2D/Hyperplane';
import { RootSystemService } from 'src/app/logic/maths/2D/root-system.service';
import { Root } from 'src/app/logic/maths/2D/RootSystem';
import { RootSystemTransformer2DService } from 'src/app/services/2D/root-system-transformer2-d.service';

@Component({
  selector: 'app-object-transformer-panel2-d',
  templateUrl: './object-transformer-panel2-d.component.html',
  styleUrls: ['./object-transformer-panel2-d.component.sass'],
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectTransformerPanel2DComponent {
  rootSystemColors: Array<Colors> = [];
  roots: Array<Root>;
  rootsToAppliedMirrorings: Array<Root> = [];
  rootsToAffineMirrorings: Array<Root> = [];
  isExpanded: boolean = true;
  moreInformationShown: boolean = false;
  isAffineVersion: boolean = false;
  constructor(
    private rootSystemService: RootSystemService,
    private rootSystemPainter: RootSystemPainter,
    private cd: ChangeDetectorRef,
    private transformService: RootSystemTransformer2DService,
    private affinePainter: AffinePainter){
    this.rootSystemService.repaintEvent.subscribe(() => {
      this.isAffineVersion = rootSystemPainter.showAffineVersion;
      this.resetTransformations();
      this.rootSystemColors = rootSystemColors[rootSystemService.rootSystem.type];
      this.roots = this.getRoots();
      this.resetAffineTransformation();
      cd.detectChanges();
    })
    this.transformService.transformationChanged.subscribe(() => {
      this.getAppliedMirrorings();
      this.cd.detectChanges();
    })
    this.roots = this.getRoots();
    this.rootSystemColors = rootSystemColors[rootSystemService.rootSystem.type];
    if(window.innerWidth < 1000){
      this.isExpanded = false;
    }
    
  }
  toggleExpand(){
    this.isExpanded = !this.isExpanded;
  }
  toggleMoreInformation(){
    this.moreInformationShown = !this.moreInformationShown;
  }
  toggleObjectActedOn(obj: "ROOTS" | "HYPERPLANES"|"WEYL_CHAMBERS"){
    // Add the object to the list of transformed objects if it isn't in there yet
    // - otherwise remove it
    if(this.transformService.transformationAppliedTo(obj)){
      this.transformService.removeTransformedObjectType(obj);
    }
    else{
      this.transformService.addTransformedObjectType(obj);
    }
    this.cd.detectChanges();
  }
  transformationAppliedTo(obj: "ROOTS" | "HYPERPLANES"|"WEYL_CHAMBERS"){
    return this.transformService.transformationAppliedTo(obj);
  }
  getRoots(){
    return this.rootSystemService.rootSystem.getPositiveRoots();
  }
  getPositiveRootsWithoutBase(){
    return this.getRoots().filter((root) => !root.isSimple);
  }
  getCoxeterMatrix(){
    return this.rootSystemService.rootSystem.getCoxeterMatrix();
  }
  getBase(){
    return this.rootSystemService.getBase();
  }
  getColor(root: Root){
    return this.rootSystemColors[this.roots.findIndex((other)=>other.equal(root))];
  }
  getLength(){
    const reflectionRoots = this.transformService.appliedMirrorings;
    return this.rootSystemService.rootSystem.getLengthOfTransformation(this.transformService.currentTranformation);
  }
  mirrorWithRoot(root: Root){
    this.transformService.mirrorOnPlaneOfRoot(root);
  }
  getAppliedMirrorings(){
    this.rootsToAppliedMirrorings = [...this.transformService.appliedMirrorings].reverse();
  }
  resetTransformations(){
    this.transformService.resetTransformation();
    
  }
  resetAffineTransformation(){
    this.affinePainter.resetReflection();
    this.getAppliedReflections();
    this.cd.detectChanges();
  }
  getAffineReflectionBase(){
    return this.rootSystemService.getAffineReflectionBase();
  }
  applyAffineReflection(root: Root, hyperplane: Hyperplane){
    this.affinePainter.addReflection(root, hyperplane);
    this.getAppliedReflections();
    this.cd.detectChanges();
  }
  getAppliedReflections(){
    this.rootsToAffineMirrorings = this.affinePainter.appliedReflections.map((obj)=>obj.root);
  }
}