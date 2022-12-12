import { Component, ContentChild, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Svg, SVG } from '@svgdotjs/svg.js';
import { rootSystems } from 'src/app/data/rootSystems';
import AffinePainter from 'src/app/display/2D/painters/AffinePainter';
import GridPainter from 'src/app/display/2D/painters/GridPainter';
import RootSystemPainter from 'src/app/display/2D/painters/RootSystemPainter';
import WeylChamberPainter from 'src/app/display/2D/painters/WeylChamberPainter';
import { RootSystemService } from 'src/app/logic/maths/2D/root-system.service';
import RootSystem2D, { Root } from 'src/app/logic/maths/2D/RootSystem';
import { Canvas, CanvasService } from 'src/app/services/2D/canvas.service';
import { PaintLayer } from 'src/app/services/2D/paint.service';
import { RootSystemTransformer2DService } from 'src/app/services/2D/root-system-transformer2-d.service';

@Component({
  selector: 'app-root-systems2-d',
  templateUrl: './root-systems2-d.component.html',
  styleUrls: ['./root-systems2-d.component.sass']
})
export class RootSystems2DComponent implements OnInit {
  @ViewChild('paintContainer') paintContainer!: ElementRef;

  @ViewChild('paintContainerLayer0') layer0!: ElementRef;
  @ViewChild('paintContainerLayer1') layer1!: ElementRef;
  @ViewChild('paintContainerLayer2') layer2!: ElementRef;
  @ViewChild('paintContainerLayer3') layer3!: ElementRef;
  @ViewChild('paintContainerLayer4') layer4!: ElementRef;

  paintSvgContainer!: Svg;
  pixelsInOneUnit: number = 130;
  // Used to move the canvas a little to the top on smaller screens to make space
  // for navigational elements
  offsetTop: number = 0;

  constructor(
    private canvas: CanvasService,
    private gridPainter: GridPainter,
    private rootSystemPainter: RootSystemPainter,
    private weylChamberPainter: WeylChamberPainter,
    private rootSystemService: RootSystemService,
    private transformService: RootSystemTransformer2DService
    ) {
      if(window.innerWidth < 750){
        this.pixelsInOneUnit = 100;
        this.offsetTop = -80;
      }
      if(window.innerHeight < 700 && window.innerWidth < 750){
        this.offsetTop = -90;
      }
      if(window.innerHeight < 700 && window.innerWidth < 680){
        this.offsetTop = -140;
      }
      if(window.innerHeight < 600 && window.innerWidth < 680){
        this.pixelsInOneUnit = 65;
        this.offsetTop = -140;
      }
      addEventListener("resize", (event) => {
        if(window.innerWidth < 750){
          this.pixelsInOneUnit = 100;
          this.offsetTop = -80;
        }else{
          this.pixelsInOneUnit = 130;
          this.offsetTop = 0;
        }
        if(window.innerHeight < 700 && window.innerWidth < 750){
          this.offsetTop = -90;
        }
        if(window.innerHeight < 700 && window.innerWidth < 680){
          this.pixelsInOneUnit = 80;
          this.offsetTop = -140;
        }
        if(window.innerHeight < 600 && window.innerWidth < 680){
          this.pixelsInOneUnit = 65;
          this.offsetTop = -140;
        }
        this.repaintObjects();

      });
      rootSystemService.repaintEvent.subscribe(() => {
        this.repaintObjects();
      });
      rootSystemPainter.repaintEvent.subscribe(() => {
        this.repaintObjects();
      })
      this.transformService.transformationChanged.subscribe(() => {
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
    if(this.paintSvgContainer != undefined){
    this.clearCanvas();
    this.initializeCanvas();
    this.paintObjects();}
  }
  paintObjects(){
    this.gridPainter.paint(PaintLayer.layer0);
    this.weylChamberPainter.paint(PaintLayer.layer1);
    this.rootSystemPainter.paint(PaintLayer.layer4);
  }
  clearCanvas(){
    if(this.paintSvgContainer != undefined)
      this.paintSvgContainer.remove();
  }
  initializeCanvas(){
    if(this.paintContainer == undefined){return;}
    // Set canvas dimensions
    const canvasHeight = document.body.clientHeight-4;
    const canvasWidth = document.body.clientWidth-1;
    this.paintSvgContainer  = SVG().addTo(this.paintContainer.nativeElement).size(
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
      pixelsInOneUnit: this.pixelsInOneUnit,
      offsetTop: this.offsetTop
    });
    this.canvas.initializeCanvas(canvas);
    this.canvas.initializePaintLayers(layers);
  }
}
