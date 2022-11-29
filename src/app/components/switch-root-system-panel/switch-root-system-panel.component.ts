import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { rootSystems, RootSystems2D } from 'src/app/data/rootSystems';
import { RootSystemService } from 'src/app/logic/maths/2D/root-system.service';
import RootSystem2D from 'src/app/logic/maths/2D/RootSystem';

@Component({
  selector: 'app-switch-root-system-panel',
  templateUrl: './switch-root-system-panel.component.html',
  styleUrls: ['./switch-root-system-panel.component.sass']
})
export class SwitchRootSystemPanelComponent implements OnInit {
  RootSystems = RootSystems2D
  constructor(private rootSystemService: RootSystemService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      console.log("Change!")
      let rootSystem = decodeURI(params['root_system'] || '') as RootSystems2D;
      if(rootSystems[rootSystem]!= undefined){
        this.rootSystemService.switchRootSystem(rootSystems[rootSystem])
      }
    });

  }

  ngOnInit(): void {
  }
  switchToRootSystem(rootSystem: RootSystems2D){
    this.rootSystemService.switchRootSystem(rootSystems[rootSystem])
    this.router.navigate(['/2D', {root_system: rootSystem}])
  }
  getSelectedRootSystem(){
    return this.rootSystemService.getType();
  }
}
