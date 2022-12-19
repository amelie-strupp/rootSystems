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
          const url = event.url;
          const end = url.lastIndexOf(";");
          let selectedDim = url.substring(
            url.indexOf("/") + 1,
            end > -1 ? end : url.length
            );
            console.log("Dim; ", selectedDim);

        if(selectedDim == '2D' || selectedDim == '3D'|| selectedDim == 'Projection'){
          this.selectedDimension = selectedDim;
        }
      }});
  }
  switchToDimension(dim: "3D" | "2D" | "Projection"){
    this.selectedDimension = dim;
    this.switchedToDimension.emit(dim);
  }
}
