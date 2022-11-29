import { Component, ElementRef, ViewChild } from '@angular/core';
import { SVG, Svg } from '@svgdotjs/svg.js';
import GridPainter from 'src/app/display/2D/painters/GridPainter';
import RootSystemPainter from 'src/app/display/2D/painters/RootSystemPainter';
import WeylChamberPainter from 'src/app/display/2D/painters/WeylChamberPainter';
import { RootSystemService } from 'src/app/logic/maths/2D/root-system.service';
import { Canvas, CanvasService } from 'src/app/services/2D/canvas.service';
import { PaintLayer } from 'src/app/services/2D/paint.service';

@Component({
  selector: 'app-mini-view2-d',
  templateUrl: './mini-view2-d.component.html',
  styleUrls: ['./mini-view2-d.component.sass']
})
export class MiniView2DComponent {

  @ViewChild('miniView') miniView!: ElementRef;

  @ViewChild('paintContainerLayer0') layer0!: ElementRef;
  @ViewChild('paintContainerLayer1') layer1!: ElementRef;
  @ViewChild('paintContainerLayer2') layer2!: ElementRef;
  @ViewChild('paintContainerLayer3') layer3!: ElementRef;
  @ViewChild('paintContainerLayer4') layer4!: ElementRef;

  paintSvgContainer!: Svg;


  constructor(
    private canvas: CanvasService,
    private gridPainter: GridPainter,
    private rootSystemPainter: RootSystemPainter,
    private weylChamberPainter: WeylChamberPainter,
    private rootSystemService: RootSystemService
    ) {
      rootSystemService.repaintEvent.subscribe(() => {
        this.repaintObjects();
      });
      rootSystemPainter.repaintEvent.subscribe(() => {
        this.repaintObjects();
      })
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.initializeCanvas();
    this.paintObjects();
  }
  repaintObjects(){
    this.clearCanvas();
    this.initializeCanvas();
    this.paintObjects();
  }
  paintObjects(){
    this.gridPainter.paint(PaintLayer.layer0);
    this.weylChamberPainter.paint(PaintLayer.layer1);
    this.rootSystemPainter.paint(PaintLayer.layer4);
  }
  clearCanvas(){
    this.paintSvgContainer.remove();
  }
  initializeCanvas(){
    // Set canvas dimensions
    const canvasHeight = this.miniView.nativeElement.clientHeight-4;
    const canvasWidth = this.miniView.nativeElement.clientWidth-1;
    this.paintSvgContainer  = SVG().addTo(this.miniView.nativeElement).size(
      canvasWidth,
      canvasHeight
    )
    // Initalize the different layers with the screen dimensions
    const layers = [
      this.paintSvgContainer.nested().size(canvasWidth, canvasHeight),
      this.paintSvgContainer.nested().size(canvasWidth, canvasHeight),
      this.paintSvgContainer.nested().size(canvasWidth, canvasHeight),
      this.paintSvgContainer.nested().size(canvasWidth, canvasHeight),
      this.paintSvgContainer.nested().size(canvasWidth, canvasHeight)
    ]
    const canvas = new Canvas({
      height: canvasHeight,
      width: canvasWidth,
      pixelsInOneUnit: 150
    });
    this.canvas.initializeCanvas(canvas);
    this.canvas.initializePaintLayers(layers);
  }
}
