import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Colors } from 'src/app/display/values/colors';

@Component({
  selector: 'app-rotation-control',
  templateUrl: './rotation-control.component.html',
  styleUrls: ['./rotation-control.component.sass']
})
export class RotationControlComponent {
  @Input() angle: number = 90;
  @Input() color: string = Colors.blue;
  @ViewChild('wheelCenter') wheelCenterElement!: ElementRef;
  @Output() angleChanged: EventEmitter<number> = new EventEmitter();

  changeActivated: boolean = false;
  startChangingAngle(){
    this.changeActivated = true;
  }
  stopChangingAngle(){
    this.changeActivated = false;
  }
  changeAngle(event: MouseEvent){
    if(this.changeActivated){
      var rect = this.wheelCenterElement.nativeElement.getBoundingClientRect();
      var x = event.clientX - (rect.left + rect.width/2);
      var y = event.clientY - (rect.top + rect.height/2);
      const radAngle = Math.atan2(x,y);
      this.angle = ((radAngle/(Math.PI*2))*360)
      if(Math.abs(this.angle-45) < 8){
        this.angle = 45
      }
      else if(Math.abs(this.angle) < 8){
        this.angle = 0
      }
      if(Math.abs(this.angle-90) < 8){
        this.angle = 90
      }
      if(Math.abs(this.angle-135) < 8){
        this.angle = 135
      }
      if(Math.abs(this.angle-180) < 8){
        this.angle = 180
      }

      if(Math.abs(this.angle+45) < 8){
        this.angle = -45
      }

      if(Math.abs(this.angle+90) < 8){
        this.angle = -90
      }
      if(Math.abs(this.angle+135) < 8){
        this.angle = -135
      }
      if(Math.abs(this.angle+180) < 8){
        this.angle = -180
      }
      this.angleChanged.next((this.angle/360)*2*Math.PI+Math.PI/2)
    }
  }
}
