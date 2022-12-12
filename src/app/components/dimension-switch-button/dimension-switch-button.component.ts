import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dimension-switch-button',
  templateUrl: './dimension-switch-button.component.html',
  styleUrls: ['./dimension-switch-button.component.sass']
})
export class DimensionSwitchButtonComponent {
  @Output() switchedToDimension: EventEmitter<"3D" | "2D" | "Projection"> = new EventEmitter();
  selectedDimension: "3D" | "2D" | "Projection" = "2D";
  constructor(route: ActivatedRoute, router: Router){
    router.events.subscribe((event)=>{
        if(event instanceof NavigationEnd){
          console.log(event);
          const url = event.url;
          let selectedDim = url.substring(
            url.indexOf("/") + 1, 
            url.lastIndexOf(";"));
        if(selectedDim == '2D' || selectedDim == '3D'){
          this.selectedDimension = selectedDim;
        }
        
        
      }});

  }
  switchToDimension(dim: "3D" | "2D" | "Projection"){
    this.selectedDimension = dim;
    this.switchedToDimension.emit(dim);
  }
}
