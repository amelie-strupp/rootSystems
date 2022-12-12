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
      this.angleChanged.next(radAngle+Math.PI/2)
    }
  }
}
