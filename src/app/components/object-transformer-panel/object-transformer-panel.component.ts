import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { rootSystemColors } from 'src/app/display/RootSystemColorMode';
import { Colors } from 'src/app/display/values/colors';
import { RootSystem3DService } from 'src/app/logic/maths/3D/root-system3-d.service';
import { Root3D } from 'src/app/logic/maths/3D/RootSystem3D';
import { RootSystemTransformer3DService } from 'src/app/services/3D/root-system-transformer3-d.service';

@Component({
  selector: 'app-object-transformer-panel',
  templateUrl: './object-transformer-panel.component.html',
  styleUrls: ['./object-transformer-panel.component.sass'],
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
export class ObjectTransformerPanelComponent {
  rootSystemColors: Array<Colors> = [];
  roots: Array<Root3D>;
  rootsToAppliedMirrorings: Array<Root3D> = [];
  isExpanded: boolean = true;
  moreInformationShown: boolean = false;

  constructor(private rootSystemService: RootSystem3DService,
    private cd: ChangeDetectorRef, private transformService: RootSystemTransformer3DService){
    this.rootSystemService.rootSystemChangeEvent.subscribe(() => {
      this.resetTransformations();
      this.rootSystemColors = rootSystemColors[rootSystemService.rootSystem.type];
      this.roots = this.getRoots();
      cd.detectChanges();
    })
    this.transformService.transformationChanged.subscribe(() => {
      this.getAppliedMirrorings();
    })
    this.roots = this.getRoots();
    this.rootSystemColors = rootSystemColors[rootSystemService.rootSystem.type];
    if(window.innerWidth < 1000){
      this.isExpanded = false;
    }
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
  toggleExpand(){
    this.isExpanded = !this.isExpanded;
  }
  getRoots(){
    return this.rootSystemService.rootSystem.getPositiveRoots();
  }
  getPositiveRootsWithoutBase(){
    return this.getRoots().filter((root) => !root.isSimple);
  }
  getBase(){
    return this.rootSystemService.rootSystem.getBase();
  }
  getColor(root: Root3D){
    return this.rootSystemColors[this.roots.findIndex((other)=>other.equal(root))];
  }
  getCoxeterMatrix(){
    return this.rootSystemService.rootSystem.coxeterMatrix;
  }
  getWeylGroupOrder(){
    return this.rootSystemService.rootSystem.orderOfWeylGroup;
  }
  getLength(){
    const reflectionRoots = this.transformService.appliedMirrorings;
    return this.rootSystemService.rootSystem.getLengthOfTransformation(reflectionRoots);
  }
  mirrorWithRoot(root: Root3D){
    this.transformService.mirrorOnPlaneOfRoot(root);
  }
  getAppliedMirrorings(){
    this.rootsToAppliedMirrorings = [...this.transformService.appliedMirrorings].reverse();
  }
  resetTransformations(){
    this.transformService.resetTransformation();
  }
}
