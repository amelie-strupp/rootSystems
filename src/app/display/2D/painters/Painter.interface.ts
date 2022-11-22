import { PaintLayer } from "src/app/services/2D/paint.service";

// Interface to determine the api for painters
export default interface Painter{
    paint(layer?: PaintLayer): void;
}