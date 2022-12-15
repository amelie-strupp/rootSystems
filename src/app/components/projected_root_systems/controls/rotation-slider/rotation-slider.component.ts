import { Component, ComponentRef, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-rotation-slider',
  templateUrl: './rotation-slider.component.html',
  styleUrls: ['./rotation-slider.component.sass']
})
export class RotationSliderComponent {
  @Output() degreeChanged: EventEmitter<number> = new EventEmitter();
  @Input() degree: number = 0;
  changeDegree(value: any){
    this.degree = value;
    this.degreeChanged.emit(value);
  }
}
