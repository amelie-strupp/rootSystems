"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var RootSystem_1 = require("src/app/logic/maths/2D/RootSystem");
var MatrixND_1 = require("src/app/logic/maths/nD/MatrixND");
var PointND_1 = require("src/app/logic/maths/nD/PointND");
var Circle_1 = require("src/app/logic/maths_objects/2D/Circle");
var Line_1 = require("src/app/logic/maths_objects/2D/Line");
var Point_1 = require("src/app/logic/maths_objects/2D/Point");
var paint_service_1 = require("src/app/services/2D/paint.service");
var colors_1 = require("../../values/colors");
var WeightPainter = /** @class */ (function () {
    function WeightPainter(rootSystem, coord, painter) {
        this.rootSystem = rootSystem;
        this.coord = coord;
        this.painter = painter;
    }
    WeightPainter.prototype.paint = function (layer) {
        this.paintWeightToHighestRoot();
        var lines = [];
        for (var _i = 0, _a = this.rootSystem.getPositiveRoots(); _i < _a.length; _i++) {
            var root = _a[_i];
            lines.push.apply(lines, this.paintAffineHyperplanes(root));
        }
        this.paintDominantIntegralWeights(lines);
    };
    WeightPainter.prototype.paintWeightToHighestRoot = function () {
        var w = new RootSystem_1.Root({
            angle: Math.PI / 2 - Math.PI / 3 + Math.PI / 6,
            length: 1,
            isSimple: false,
            isHighestRoot: true
        }).getVector();
        var weights = this.rootSystem.rootSystem.getWeightsToHighestWeight(new PointND_1["default"]([w.x, w.y]));
        for (var _i = 0, weights_1 = weights; _i < weights_1.length; _i++) {
            var weight = weights_1[_i];
            this.painter.paintCircle(new Circle_1["default"]({ center: new Point_1["default"](weight.get(0), weight.get(1)), color: colors_1.Colors.azul, radius: 20 }), paint_service_1.PaintLayer.layer3);
        }
    };
    // Used to paint the affine hyperplanes to a provided root
    WeightPainter.prototype.paintAffineHyperplanes = function (root) {
        var color = colors_1.Colors.palePurple300;
        var plane = root.getHyperplane();
        var startAngle = plane.angle;
        var startAngleInDegree = (startAngle / (Math.PI * 2)) * 360;
        var maxLength = this.coord.getCrossLength() / 2;
        console.log("maxLength", maxLength);
        var dual = root.getVector();
        var lines = [];
        for (var i = -2; i <= 2; ++i) {
            var offset = new Point_1["default"](0, 0).add(root.getVector().multiply(-1 / 2).multiply(i));
            var line = new Line_1["default"]({
                start: new Point_1["default"](-maxLength, 0).add(offset),
                end: new Point_1["default"](maxLength, 0).add(offset),
                color: color,
                width: 3
            });
            this.painter.paintLine(line, paint_service_1.PaintLayer.layer2).transform({ rotate: -startAngleInDegree });
            var rotation = MatrixND_1["default"].basicRotationMatrix(2, 0, 1, (-startAngleInDegree / 360) * Math.PI * 2);
            console.log("Rotation", rotation);
            var p1 = new Point_1["default"](-maxLength, 0).add(offset);
            var p2 = new Point_1["default"](maxLength, 0).add(offset);
            var point1 = new PointND_1["default"]([p1.x, p1.y]);
            var point2 = new PointND_1["default"]([p2.x, p2.y]);
            point1 = point1.multiplyOnLeftWithMatrix(rotation);
            point2 = point2.multiplyOnLeftWithMatrix(rotation);
            lines.push(new Line_1["default"]({
                start: new Point_1["default"](point1.get(0), point1.get(1)),
                end: new Point_1["default"](point2.get(0), point2.get(1))
            }));
        }
        return lines;
    };
    WeightPainter.prototype.paintDominantIntegralWeights = function (lines) {
        // line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
        // Determine the intersection point of two line segments
        // Return FALSE if the lines don't intersect
        function intersect(line1, line2) {
            // Check if none of the lines are of length 0
            if ((line1.start.x === line1.end.x &&
                line1.start.y === line1.end.y) || (line2.start.x === line2.end.x &&
                line2.start.y === line2.end.y)) {
                return false;
            }
            var denominator = ((line2.end.y - line2.start.y) * (line1.end.x - line1.start.x) -
                (line2.end.x - line2.start.x) * (line1.end.y - line1.start.y));
            // Lines are parallel
            if (denominator === 0) {
                return false;
            }
            var ua = ((line2.end.x - line2.start.x) * (line1.start.y - line2.start.y) - (line2.end.y - line2.start.y) * (line1.start.x - line2.start.x)) / denominator;
            var ub = ((line1.end.x - line1.start.x) * (line1.start.y - line2.start.y) - (line1.end.y - line1.start.y) * (line1.start.x - line2.start.x)) / denominator;
            // is the intersection along the segments
            if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
                return false;
            }
            // Return a object with the x and y coordinates of the intersection
            var x = line1.start.x + ua * (line1.end.x - line1.start.x);
            var y = line1.start.y + ua * (line1.end.y - line1.start.y);
            return new Point_1["default"](x, y);
        }
        var dominantWeights = [];
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line1 = lines_1[_i];
            for (var _a = 0, lines_2 = lines; _a < lines_2.length; _a++) {
                var line2 = lines_2[_a];
                console.log(line1);
                console.log(line2);
                if (line1 != line2) {
                    var line3 = new Line_1["default"]({ start: line1.start, end: line1.end });
                    var line4 = new Line_1["default"]({ start: line2.start, end: line2.end });
                    line3.start = line3.start.multiply(100);
                    line3.end = line3.end.multiply(100);
                    line4.start = line4.start.multiply(100);
                    line4.end = line4.end.multiply(100);
                    var intersection = intersect(line1, line2);
                    console.log(intersection);
                    if (intersection != false) {
                        dominantWeights.push(intersection);
                    }
                }
            }
        }
        console.log("Dominant weights", dominantWeights);
        for (var _b = 0, dominantWeights_1 = dominantWeights; _b < dominantWeights_1.length; _b++) {
            var weight = dominantWeights_1[_b];
            this.painter.paintCircle(new Circle_1["default"]({ center: new Point_1["default"](weight.x, weight.y), color: colors_1.Colors.yellow, radius: 4 }), paint_service_1.PaintLayer.layer3);
        }
    };
    WeightPainter = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], WeightPainter);
    return WeightPainter;
}());
exports["default"] = WeightPainter;
