"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var Alcove_1 = require("src/app/logic/maths/2D/Alcove");
var Line_1 = require("src/app/logic/maths_objects/2D/Line");
var Point_1 = require("src/app/logic/maths_objects/2D/Point");
var Polygon_1 = require("src/app/logic/maths_objects/2D/Polygon");
var paint_service_1 = require("src/app/services/2D/paint.service");
var colors_1 = require("../../values/colors");
var RootSystemColorMode_1 = require("../../RootSystemColorMode");
var AffinePainter = /** @class */ (function () {
    function AffinePainter(rootSystem, coord, painter) {
        this.rootSystem = rootSystem;
        this.coord = coord;
        this.painter = painter;
        this.appliedReflections = [];
    }
    AffinePainter.prototype.paint = function (layer) {
        for (var _i = 0, _a = this.rootSystem.getPositiveRoots(); _i < _a.length; _i++) {
            var root = _a[_i];
            this.paintAffineHyperplanes(root);
        }
        this.paintFundamentalAlcove();
        this.applyReflections();
        this.paintReflectionBase();
    };
    // Used to paint the affine hyperplanes to a provided root
    AffinePainter.prototype.paintAffineHyperplanes = function (root) {
        var color = colors_1.Colors.purple300;
        var plane = root.getHyperplane();
        var startAngle = plane.angle;
        var startAngleInDegree = (startAngle / (Math.PI * 2)) * 360;
        var maxLength = this.coord.getCrossLength() / 2;
        var dual = root.getVector();
        for (var i = -10; i <= 10; ++i) {
            var offset = new Point_1["default"](0, 0).add(dual.multiply(i));
            var line = new Line_1["default"]({
                start: new Point_1["default"](-maxLength, 0).add(offset),
                end: new Point_1["default"](maxLength, 0).add(offset),
                color: color,
                width: 2
            });
            this.painter.paintLine(line, paint_service_1.PaintLayer.layer2).transform({ rotate: -startAngleInDegree });
        }
    };
    AffinePainter.prototype.addReflection = function (root, onHyperplane) {
        this.appliedReflections.push({ root: root, hyperplane: onHyperplane });
        this.applyReflections();
    };
    AffinePainter.prototype.applyReflections = function () {
        this.clearAlcoveObject();
        var alcove = Alcove_1.Alcove.fromRootSystem(this.rootSystem.rootSystem);
        if (alcove == null) {
            return;
        }
        var reflectedPoints = [];
        for (var _i = 0, _a = alcove.points; _i < _a.length; _i++) {
            var point = _a[_i];
            var reflectedPoint = point;
            for (var _b = 0, _c = this.appliedReflections; _b < _c.length; _b++) {
                var h = _c[_b];
                reflectedPoint = h.hyperplane.reflect(reflectedPoint);
            }
            reflectedPoints.push(reflectedPoint);
        }
        this.reflectedAlcoveObject = this.paintAlcove(Alcove_1.Alcove.fromPoints(reflectedPoints));
    };
    AffinePainter.prototype.resetReflection = function () {
        this.appliedReflections = [];
        this.clearAlcoveObject();
    };
    AffinePainter.prototype.clearAlcoveObject = function () {
        if (this.reflectedAlcoveObject != undefined) {
            this.reflectedAlcoveObject.remove();
        }
    };
    AffinePainter.prototype.paintFundamentalAlcove = function () {
        var alcove = Alcove_1.Alcove.fromRootSystem(this.rootSystem.rootSystem);
        if (alcove != null)
            this.paintAlcove(alcove);
    };
    AffinePainter.prototype.paintAlcove = function (alcove) {
        return this.painter.paintPolygon(new Polygon_1["default"]({ points: [
                alcove === null || alcove === void 0 ? void 0 : alcove.walls[0].start,
                alcove === null || alcove === void 0 ? void 0 : alcove.walls[1].start,
                alcove === null || alcove === void 0 ? void 0 : alcove.walls[2].start,
                alcove === null || alcove === void 0 ? void 0 : alcove.walls[0].start,
            ], color: colors_1.Colors.purple200 }), paint_service_1.PaintLayer.layer2).opacity(0.5);
    };
    AffinePainter.prototype.paintReflectionBase = function () {
        var base = this.rootSystem.getAffineReflectionBase();
        var colors = RootSystemColorMode_1.rootSystemColors[this.rootSystem.rootSystem.type];
        var _loop_1 = function (baseElement) {
            var root = baseElement.root;
            var plane = baseElement.hyperplane;
            var color = colors[this_1.rootSystem.rootSystem.getPositiveRoots().findIndex(function (other) { return other.equal(root); })];
            var startAngle = plane.angle;
            var startAngleInDegree = (startAngle / (Math.PI * 2)) * 360;
            var maxLength = this_1.coord.getCrossLength() / 2;
            var offset = plane.anchorPoint;
            var line = new Line_1["default"]({
                start: new Point_1["default"](-maxLength, 0).add(offset),
                end: new Point_1["default"](maxLength, 0).add(offset),
                color: color,
                width: 5,
                opacity: 1
            });
            this_1.painter.paintLine(line, paint_service_1.PaintLayer.layer4).transform({ rotate: -startAngleInDegree });
        };
        var this_1 = this;
        for (var _i = 0, base_1 = base; _i < base_1.length; _i++) {
            var baseElement = base_1[_i];
            _loop_1(baseElement);
        }
    };
    AffinePainter = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AffinePainter);
    return AffinePainter;
}());
exports["default"] = AffinePainter;
