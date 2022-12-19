import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dimension-indicator',
  templateUrl: './dimension-indicator.component.html',
  styleUrls: ['./dimension-indicator.component.sass']
})
export class DimensionIndicatorComponent {
  @Input() endDimension: number = 2;
}
