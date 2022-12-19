"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var rootSystems_1 = require("src/app/data/rootSystems");
var Circle_1 = require("src/app/logic/maths_objects/2D/Circle");
var Line_1 = require("src/app/logic/maths_objects/2D/Line");
var Point_1 = require("src/app/logic/maths_objects/2D/Point");
var Polygon_1 = require("src/app/logic/maths_objects/2D/Polygon");
var paint_service_1 = require("src/app/services/2D/paint.service");
var RootSystemColorMode_1 = require("../../RootSystemColorMode");
var colors_1 = require("../../values/colors");
var RootSystemPainter = /** @class */ (function () {
    function RootSystemPainter(canvas, rootSystem, coord, painter, affinePainter, transformService) {
        var _this = this;
        this.canvas = canvas;
        this.rootSystem = rootSystem;
        this.coord = coord;
        this.painter = painter;
        this.affinePainter = affinePainter;
        this.transformService = transformService;
        this.paintLayer = paint_service_1.PaintLayer["default"];
        this.colorMode = RootSystemColorMode_1.RootSystemColorMode.base;
        this.showAffineVersion = false;
        this.repaintEvent = new rxjs_1.Subject();
        this.highlightedRoots = [];
        this.highlightedHyperplanes = [];
        rootSystem.repaintEvent.subscribe(function () {
            _this.clearHyperplaneHighlight();
            _this.clearRootHighlight();
        });
    }
    RootSystemPainter.prototype.paint = function (layer) {
        var roots = this.rootSystem.getRoots();
        if (!this.showAffineVersion)
            this.paintExtraGeometry();
        // Paint the roots
        for (var _i = 0, roots_1 = roots; _i < roots_1.length; _i++) {
            var root = roots_1[_i];
            this.paintRoot(root);
            // Make sure to only paint the hyperplane once
            if (root.isPositive && !this.showAffineVersion)
                this.paintHyperplane(root);
        }
        if (layer != undefined) {
            this.paintLayer = layer;
        }
        if (this.showAffineVersion) {
            this.affinePainter.paint(paint_service_1.PaintLayer.layer3);
        }
    };
    RootSystemPainter.prototype.switchColorMode = function (colorMode) {
        this.colorMode = colorMode;
        // Make sure the changes are applied by rerendering the scene
        this.repaintEvent.next();
    };
    RootSystemPainter.prototype.switchVersion = function (toAffineVersion) {
        this.showAffineVersion = toAffineVersion;
        this.rootSystem.repaintEvent.next();
    };
    RootSystemPainter.prototype.highlightRoot = function (root) {
        this.highlightedRoots.push(root);
        this.repaintEvent.next();
    };
    RootSystemPainter.prototype.highlightHyperplaneToRoot = function (root) {
        this.highlightedHyperplanes.push(root);
        this.repaintEvent.next();
    };
    RootSystemPainter.prototype.rootIsHighlighted = function (root) {
        return this.highlightedRoots.some(function (other) { return other.equal(root); });
    };
    RootSystemPainter.prototype.removeHighlightFromRoot = function (root) {
        this.highlightedRoots = this.highlightedRoots.filter(function (other) { return !root.equal(other); });
        this.repaintEvent.next();
    };
    RootSystemPainter.prototype.hyperplaneToRootHighlighted = function (root) {
        return this.highlightedHyperplanes.some(function (other) { return other.equal(root); });
    };
    RootSystemPainter.prototype.removeHighlightOfHyperplaneToRoot = function (root) {
        this.highlightedHyperplanes = this.highlightedHyperplanes.filter(function (other) { return !root.equal(other); });
        this.repaintEvent.next();
    };
    RootSystemPainter.prototype.allRootsHighlighted = function () {
        return this.highlightedRoots.length == this.rootSystem.getPositiveRoots().length;
    };
    RootSystemPainter.prototype.allHyperplanesHighlighted = function () {
        return this.highlightedHyperplanes.length == this.rootSystem.getPositiveRoots().length;
    };
    RootSystemPainter.prototype.clearRootHighlight = function () {
        this.highlightedRoots = [];
        this.repaintEvent.next();
    };
    RootSystemPainter.prototype.clearHyperplaneHighlight = function () {
        this.highlightedHyperplanes = [];
        this.repaintEvent.next();
    };
    RootSystemPainter.prototype.highlightAllRoots = function () {
        this.highlightedRoots = this.rootSystem.getPositiveRoots();
        this.repaintEvent.next();
    };
    RootSystemPainter.prototype.highlightAllHyperplanes = function () {
        this.highlightedHyperplanes = this.rootSystem.getPositiveRoots();
        this.repaintEvent.next();
    };
    // Used to paint extra objects that should only appear with certain root systems
    RootSystemPainter.prototype.paintExtraGeometry = function () {
        var type = this.rootSystem.getType();
        switch (type) {
            case rootSystems_1.RootSystems2D.A2:
                this.paintTriangle();
                break;
            case rootSystems_1.RootSystems2D.B2:
                this.paintSquare();
                break;
            // case RootSystems2D.C2:
            //     this.paintSquare();
            //     break;
            case rootSystems_1.RootSystems2D.G2:
                this.paintHexagon();
                break;
        }
    };
    RootSystemPainter.prototype.paintVectorEnd = function (point, color, opacity, borderColor) {
        if (opacity === void 0) { opacity = 1; }
        if (borderColor === void 0) { borderColor = "transparent"; }
        this.painter.paintCircle(new Circle_1["default"]({ center: point, color: color, radius: 16 }), paint_service_1.PaintLayer.layer4).opacity(opacity)
            .stroke({
            color: borderColor,
            width: 3
        });
    };
    RootSystemPainter.prototype.paintVectorLine = function (startPoint, endPoint, opacity, color) {
        if (opacity === void 0) { opacity = 1; }
        if (color === void 0) { color = colors_1.Colors.white; }
        var line = new Line_1["default"]({
            start: startPoint,
            end: endPoint,
            color: color,
            width: 7
        });
        this.painter.paintLine(line, paint_service_1.PaintLayer.layer3).opacity(opacity);
    };
    RootSystemPainter.prototype.paintRoot = function (root) {
        var point = root.getVector();
        var color = colors_1.Colors.white;
        var lineColor = colors_1.Colors.white;
        var borderColor = "transparent";
        var opacity = 1;
        // Only paint a grayed out root system with the affine version
        if (this.showAffineVersion) {
            opacity = 1;
            lineColor = colors_1.Colors.purple900;
            color = colors_1.Colors.purple900;
        }
        else if (this.colorMode == RootSystemColorMode_1.RootSystemColorMode.base) {
            color = root.isSimple ? colors_1.Colors.brightRed : colors_1.Colors.brightGreen;
            if (this.rootIsHighlighted(root) || this.rootIsHighlighted(root.getNegative())) {
                var rootIndex = this.rootSystem.getPositiveRoots().findIndex(function (other) { return other.equal(root) || other.equal(root.getNegative()); });
                borderColor = RootSystemColorMode_1.rootSystemColors[this.rootSystem.getType()][rootIndex];
            }
        }
        else if (this.colorMode == RootSystemColorMode_1.RootSystemColorMode.positiveRoots) {
            color = root.isPositive ? colors_1.Colors.brightRed : colors_1.Colors.brightGreen;
            if (this.rootIsHighlighted(root) || this.rootIsHighlighted(root.getNegative())) {
                var rootIndex = this.rootSystem.getPositiveRoots().findIndex(function (other) { return other.equal(root) || other.equal(root.getNegative()); });
                borderColor = RootSystemColorMode_1.rootSystemColors[this.rootSystem.getType()][rootIndex];
            }
        }
        else {
            if (this.rootIsHighlighted(root) || this.rootIsHighlighted(root.getNegative())) {
                var rootIndex = this.rootSystem.getPositiveRoots().findIndex(function (other) { return other.equal(root) || other.equal(root.getNegative()); });
                color = RootSystemColorMode_1.rootSystemColors[this.rootSystem.getType()][rootIndex];
            }
        }
        this.paintVectorLine(new Point_1["default"](0, 0), point, opacity, lineColor);
        // Transform the object accoring to the group action if it has been selected
        // to be transformed
        if (this.transformService.transformationAppliedTo('ROOTS')) {
            var transformedPoint = root.getVectorUnderTransformation(this.transformService.currentTranformation);
            this.paintVectorEnd(transformedPoint, color, opacity, borderColor);
        }
        else {
            this.paintVectorEnd(root.getVector(), color, opacity, borderColor);
        }
    };
    RootSystemPainter.prototype.paintHyperplane = function (root) {
        var color = colors_1.Colors.white;
        if (this.hyperplaneToRootHighlighted(root) || this.hyperplaneToRootHighlighted(root.getNegative())) {
            var rootIndex = this.rootSystem.getPositiveRoots().findIndex(function (other) { return other.equal(root) || other.equal(root.getNegative()); });
            color = RootSystemColorMode_1.rootSystemColors[this.rootSystem.getType()][rootIndex];
        }
        var plane = root.getHyperplane();
        // Transform the object accoring to the group action if it has been selected
        // to be transformed
        if (this.transformService.transformationAppliedTo('HYPERPLANES')) {
            plane = root.getHyperplane()
                .withTransformation(this.transformService.currentTranformation);
        }
        console.log("Plane Direction", plane.getNormalVector());
        var startAngle = plane.angle;
        var startAngleInDegree = (startAngle / (Math.PI * 2)) * 360;
        var maxLength = this.coord.getCrossLength() / 2;
        var line = new Line_1["default"]({
            start: new Point_1["default"](-maxLength, 0),
            end: new Point_1["default"](maxLength, 0),
            color: color,
            width: 2,
            dashed: true,
            dashString: "12 12"
        });
        this.painter.paintLine(line, paint_service_1.PaintLayer.layer3).transform({ rotate: -startAngleInDegree });
    };
    RootSystemPainter.prototype.paintTriangle = function () {
        var triangle = new Polygon_1["default"]({
            points: [
                new Point_1["default"](Math.cos(Math.PI / 3 + Math.PI / 6), Math.sin(Math.PI / 3 + Math.PI / 6)),
                new Point_1["default"](Math.cos(Math.PI + Math.PI / 6), Math.sin(Math.PI + Math.PI / 6)),
                new Point_1["default"](Math.cos(2 * Math.PI - Math.PI / 3 + Math.PI / 6), Math.sin(2 * Math.PI - Math.PI / 3 + Math.PI / 6))
            ],
            color: '#9999CC'
        });
        this.painter.paintPolygon(triangle, paint_service_1.PaintLayer.layer3).opacity(0.5);
    };
    RootSystemPainter.prototype.paintSquare = function () {
        var square = new Polygon_1["default"]({
            points: [
                new Point_1["default"](0.5, 0.5),
                new Point_1["default"](-0.5, 0.5),
                new Point_1["default"](-0.5, -0.5),
                new Point_1["default"](0.5, -0.5),
            ],
            color: '#9999CC'
        });
        this.painter.paintPolygon(square, paint_service_1.PaintLayer.layer3).opacity(0.5).transform({ rotate: 45 });
    };
    RootSystemPainter.prototype.paintHexagon = function () {
        var hexagon = new Polygon_1["default"]({
            points: [
                new Point_1["default"](0.8, 0),
                new Point_1["default"](0.8 * Math.cos(Math.PI / 3), 0.8 * Math.sin(Math.PI / 3)),
                new Point_1["default"](0.8 * Math.cos(2 * Math.PI / 3), 0.8 * Math.sin(2 * Math.PI / 3)),
                new Point_1["default"](0.8 * Math.cos(3 * Math.PI / 3), 0.8 * Math.sin(3 * Math.PI / 3)),
                new Point_1["default"](0.8 * Math.cos(4 * Math.PI / 3), 0.8 * Math.sin(4 * Math.PI / 3)),
                new Point_1["default"](0.8 * Math.cos(5 * Math.PI / 3), 0.8 * Math.sin(5 * Math.PI / 3)),
            ],
            color: '#9999CC'
        });
        this.painter.paintPolygon(hexagon, paint_service_1.PaintLayer.layer3).opacity(0.5).transform({ rotate: 30 });
    };
    RootSystemPainter = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RootSystemPainter);
    return RootSystemPainter;
}());
exports["default"] = RootSystemPainter;
