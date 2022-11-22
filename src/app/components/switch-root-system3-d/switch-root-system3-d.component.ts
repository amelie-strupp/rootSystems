import { Component, OnInit } from '@angular/core';
import { rootSystems3D, RootSystems3D } from 'src/app/data/rootSystems3D';
import { RootSystem3DService } from 'src/app/logic/maths/3D/root-system3-d.service';

@Component({
  selector: 'app-switch-root-system3-d',
  templateUrl: './switch-root-system3-d.component.html',
  styleUrls: ['./switch-root-system3-d.component.sass']
})
export class SwitchRootSystem3DComponent implements OnInit {
  RootSystems = RootSystems3D
  constructor(private rootSystemService: RootSystem3DService) {}

  ngOnInit(): void {
  }
  switchToRootSystem(rootSystem: RootSystems3D){
    this.rootSystemService.switchRootSystem(rootSystems3D[rootSystem])
  }
}
