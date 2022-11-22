import { Component, OnInit } from '@angular/core';
import { RootSystemColorMode, RootSystemPainter3D } from 'src/app/display/3D/RootSystemPainter3D';
import { RootSystem3DService } from 'src/app/logic/maths/3D/root-system3-d.service';
import RootSystem3D from 'src/app/logic/maths/3D/RootSystem3D';

@Component({
  selector: 'app-object-selector3-d',
  templateUrl: './object-selector3-d.component.html',
  styleUrls: ['./object-selector3-d.component.sass']
})
export class ObjectSelector3DComponent implements OnInit {
  RootSystemColorMode = RootSystemColorMode;
  constructor(
    private rootSystemService: RootSystem3DService,
    private rootSystemPainter: RootSystemPainter3D) { }

  ngOnInit(): void {
  }
  switchHighlightMode(colorMode: RootSystemColorMode){
    this.rootSystemPainter.switchColorMode(colorMode);
  }
  highlightRoot(){
    this.rootSystemPainter.switchColorMode(RootSystemColorMode.highlight);
    let root = this.rootSystemService.rootSystem.getRoots()[0]
    this.rootSystemPainter.highlightRoot(root);
  }
}
