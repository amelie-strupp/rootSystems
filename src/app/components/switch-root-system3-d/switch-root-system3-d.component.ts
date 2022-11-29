import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { rootSystems3D, RootSystems3D } from 'src/app/data/rootSystems3D';
import { RootSystem3DService } from 'src/app/logic/maths/3D/root-system3-d.service';

@Component({
  selector: 'app-switch-root-system3-d',
  templateUrl: './switch-root-system3-d.component.html',
  styleUrls: ['./switch-root-system3-d.component.sass']
})
export class SwitchRootSystem3DComponent implements OnInit {
  RootSystems = RootSystems3D
  constructor(private rootSystemService: RootSystem3DService, private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.activatedRoute.params.subscribe(params => {
        console.log("Change!")
        let rootSystem = decodeURI(params['root_system'] || '') as RootSystems3D;
        if(rootSystems3D[rootSystem]!= undefined){
          this.rootSystemService.setInitialRootSystem(rootSystems3D[rootSystem])
        }
      });
  }

  ngOnInit(): void {
  }
  switchToRootSystem(rootSystem: RootSystems3D){
    this.rootSystemService.switchRootSystem(rootSystems3D[rootSystem])
    this.router.navigate(['/3D', {root_system: rootSystem}])

  }
  getSelectedRootSystem(){
    return this.rootSystemService.rootSystem.type;
  }
}
