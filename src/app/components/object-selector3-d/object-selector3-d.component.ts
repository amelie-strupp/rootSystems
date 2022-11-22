import { Component, OnInit } from '@angular/core';
import { RootSystemColorMode, rootSystemColors, RootSystemPainter3D } from 'src/app/display/3D/RootSystemPainter3D';
import { Colors } from 'src/app/display/values/colors';
import { RootSystem3DService } from 'src/app/logic/maths/3D/root-system3-d.service';
import RootSystem3D, { Root3D } from 'src/app/logic/maths/3D/RootSystem3D';

@Component({
  selector: 'app-object-selector3-d',
  templateUrl: './object-selector3-d.component.html',
  styleUrls: ['./object-selector3-d.component.sass']
})
export class ObjectSelector3DComponent implements OnInit {
  RootSystemColorMode = RootSystemColorMode;
  rootSystemColors: Array<Colors> = [];
  constructor(
    private rootSystemService: RootSystem3DService,
    private rootSystemPainter: RootSystemPainter3D) {
      this.rootSystemColors = rootSystemColors[rootSystemService.rootSystem.type];
      this.rootSystemService.rootSystemChangeEvent.subscribe(() => {
        this.rootSystemColors = rootSystemColors[rootSystemService.rootSystem.type];
      })
    }

  ngOnInit(): void {
  }
  switchHighlightMode(colorMode: RootSystemColorMode){
    this.rootSystemPainter.switchColorMode(colorMode);
  }
  toggleRootHighlight(root: Root3D){
    this.rootSystemPainter.switchColorMode(RootSystemColorMode.highlight);
    if(this.rootSystemPainter.rootIsHighlighted(root)){
      this.rootSystemPainter.removeHighlightFromRoot(root);
    }else{
      this.rootSystemPainter.highlightRoot(root);
    }
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
  getColor(i: number){
    return this.rootSystemColors[i];
  }
}
