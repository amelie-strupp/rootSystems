import { HostListener, Injectable } from '@angular/core';
import { G, Svg } from '@svgdotjs/svg.js';
import { PaintLayer } from './paint.service';

export class Canvas{
  offsetTop: number = 0;
  height: number;
  width: number;
  pixelsInOneUnit: number;
  constructor(d: {height: number, width: number, pixelsInOneUnit: number, offsetTop?: number}){
    this.height = d.height;
    this.width = d.width;
    this.pixelsInOneUnit = d.pixelsInOneUnit;
    this.offsetTop = d.offsetTop ?? 0;
  }
}


@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  canvas!: Canvas; // Data about the displayed canvas
  miniViewCanvas!: Canvas;
  paintContainer!: Svg; // Reference to the container where the data will be plotted

  // SVG Groups are used to put certain elements in the foreground and others in the background
  // independently of their drawing time
  paintLayers: Array<Svg> = [];
  miniViewPaintLayers: Array<Svg> = [];

  adjustPixelsInUnit(nmb: number){
    this.canvas.pixelsInOneUnit = nmb;
  }
  initializeCanvas(c: Canvas){
    this.canvas = c;
  }
  initializeMiniView(c: Canvas){
    this.miniViewCanvas = c;
  }
  initializeMiniViewPaintLayers(layers: Array<Svg>){
    this.miniViewPaintLayers = layers;
  }
  initializePaintLayers(layers: Array<Svg>){
    this.paintLayers = layers;
  }
  get height(){
    return this.canvas.height;
  }
  get width(){
    return this.canvas.width;
  }
  get pixelsInOneUnit(){
    return this.canvas.pixelsInOneUnit;
  }
  getPaintLayer(layer: PaintLayer){
    switch(layer){
      case PaintLayer.layer0:
        return this.paintLayers[0];
      case PaintLayer.layer1:
        return this.paintLayers[1];
      case PaintLayer.layer2:
        return this.paintLayers[2];
      case PaintLayer.layer3:
        return this.paintLayers[3];
      case PaintLayer.layer4:
        return this.paintLayers[4];
    }
    // Standard
    return this.paintLayers[2];
  }
  getMiniViewPaintLayer(layer: PaintLayer){
    switch(layer){
      case PaintLayer.layer0:
        return this.miniViewPaintLayers[0];
      case PaintLayer.layer1:
        return this.miniViewPaintLayers[1];
      case PaintLayer.layer2:
        return this.miniViewPaintLayers[2];
      case PaintLayer.layer3:
        return this.miniViewPaintLayers[3];
      case PaintLayer.layer4:
        return this.miniViewPaintLayers[4];
    }
    // Standard
    return this.miniViewPaintLayers[2];
  }
}
