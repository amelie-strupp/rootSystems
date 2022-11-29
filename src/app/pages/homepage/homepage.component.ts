import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {

  showDimension: '3D' | '2D' = '2D';
  constructor(private router: Router, private route: ActivatedRoute) {
    this.initializeView();
  }

  ngOnInit(): void {
  }
  initializeView(){
    let selectedDim = this.route.snapshot.url.toString().split('/').pop();
    if(selectedDim == '2D' || selectedDim == '3D'){
      this.showDimension = selectedDim;
      if(this.route.snapshot.params['root_system'] != undefined){
        this.router.navigate(['/' + this.showDimension, {root_system: this.route.snapshot.params['root_system']}])
      }
    }
  }
  switchDimension(dim: '3D' | '2D'){
      this.router.navigateByUrl('/' + dim)
  }
}
