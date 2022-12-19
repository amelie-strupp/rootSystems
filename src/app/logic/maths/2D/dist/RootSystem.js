"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Root = void 0;
var three_1 = require("three");
var Point_1 = require("../../maths_objects/2D/Point");
var PointND_1 = require("../nD/PointND");
var Hyperplane_1 = require("./Hyperplane");
var WeylChamber_1 = require("./WeylChamber");
var classifyPoint = require('robust-point-in-polygon');
var Root = /** @class */ (function () {
    function Root(d) {
        this.isSimple = false;
        this.isPositive = true;
        this.isHighestRoot = false;
        this.angle = d.angle;
        this.length = d.length;
        this.isSimple = d.isSimple;
        this.isPositive = d.isPositive != null ? d.isPositive : true;
        this.isHighestRoot = d.isHighestRoot != null ? d.isHighestRoot : false;
    }
    Root.prototype.equal = function (other) {
        return other.getVector().equal(this.getVector());
    };
    Root.prototype.getNegative = function () {
        return new Root({
            angle: this.angle + Math.PI,
            length: this.length,
            isSimple: false,
            isPositive: false
        });
    };
    Root.prototype.getVector = function () {
        return new Point_1["default"](Math.cos(this.angle) * this.length, Math.sin(this.angle) * this.length);
    };
    Root.prototype.getVectorUnderTransformation = function (matrix) {
        var vector = this.getVector();
        var vector3 = new three_1.Vector3(vector.x, vector.y, 0);
        var transformedVector = vector3.applyMatrix3(matrix);
        return new Point_1["default"](transformedVector.x, transformedVector.y);
    };
    Object.defineProperty(Root.prototype, "name", {
        get: function () {
            var vector = this.getVector();
            return "(" + Math.round(vector.x) + " " + Math.round(vector.y) + ")";
        },
        enumerable: false,
        configurable: true
    });
    Root.prototype.getHyperplane = function () {
        return new Hyperplane_1.Hyperplane(this.angle + Math.PI / 2);
    };
    Root.prototype.getDual = function () {
        var vector = this.getVector();
        var dotProduct = vector.dot(vector);
        return new Point_1["default"]((2 * vector.x * 1) / dotProduct, (2 * vector.y * 1) / dotProduct);
    };
    return Root;
}());
exports.Root = Root;
var RootSystem2D = /** @class */ (function () {
    function RootSystem2D(type, orderOfWeylGroup, weylGroup, coxeterMatrix, simpleRoots, minimumAngle) {
        this._positiveRoots = [];
        this.weylGroup = [];
        this.orderOfWeylGroup = 0;
        this.coxeterMatrix = [];
        this.type = type;
        this.orderOfWeylGroup = orderOfWeylGroup;
        this.coxeterMatrix = coxeterMatrix;
        this._positiveRoots = simpleRoots;
        this._minimumAngle = minimumAngle;
        this.weylGroup = weylGroup;
    }
    RootSystem2D.prototype.getAllRoots = function () {
        var allRoots = __spreadArrays(this._positiveRoots);
        this._positiveRoots.forEach(function (root) {
            allRoots.push(root.getNegative());
        });
        return allRoots;
    };
    RootSystem2D.prototype.getCoxeterMatrix = function () {
        return this.coxeterMatrix;
    };
    RootSystem2D.prototype.hasHighestRoot = function () {
        return this._positiveRoots.some(function (root) { return root.isHighestRoot; });
    };
    RootSystem2D.prototype.getHighestRoot = function () {
        return this._positiveRoots.find(function (root) { return root.isHighestRoot; });
    };
    RootSystem2D.prototype.getAffineReflectionBase = function () {
        if (this.hasHighestRoot()) {
            var highestRoot = this.getHighestRoot();
            var affineReflectionBase = __spreadArrays(this.getBase().map(function (root) {
                return { root: root, hyperplane: root.getHyperplane() };
            }), [
                {
                    root: highestRoot,
                    hyperplane: highestRoot
                        .getHyperplane()
                        .moveBy(highestRoot.getVector())
                },
            ]);
            return affineReflectionBase;
        }
        return __spreadArrays(this.getBase().map(function (root) {
            return { root: root, hyperplane: root.getHyperplane() };
        }));
    };
    RootSystem2D.prototype.getWeightsToHighestWeight = function (highestWeight) {
        var weylGroup = this.weylGroup;
        var expandPoint = function (p) {
            return new PointND_1["default"]([p.get(0) < 0 ? p.get(0) - 0.2 : p.get(0) + 0.2,
                p.get(1) < 0 ? p.get(1) - 0.2 : p.get(1) + 0.2,]);
        };
        var convexHull = weylGroup.map(function (w) {
            return expandPoint(highestWeight.multiplyOnLeftWithMatrix(w));
        });
        var less = function (a, b) {
            var center = new Point_1["default"](0, 0);
            if (a.x - center.x >= 0 && b.x - center.x < 0)
                return true;
            if (a.x - center.x < 0 && b.x - center.x >= 0)
                return false;
            if (a.x - center.x == 0 && b.x - center.x == 0) {
                if (a.y - center.y >= 0 || b.y - center.y >= 0)
                    return a.y > b.y;
                return b.y > a.y;
            }
            // compute the cross product of vectors (center -> a) x (center -> b)
            var det = (a.x - center.x) * (b.y - center.y) - (b.x - center.x) * (a.y - center.y);
            if (det < 0)
                return true;
            if (det > 0)
                return false;
            // points a and b are on the same line from the center
            // check which point is closer to the center
            var d1 = (a.x - center.x) * (a.x - center.x) + (a.y - center.y) * (a.y - center.y);
            var d2 = (b.x - center.x) * (b.x - center.x) + (b.y - center.y) * (b.y - center.y);
            return d1 > d2;
        };
        convexHull.sort(function (a, b) { return less(new Point_1["default"](a.get(0), a.get(1)), new Point_1["default"](b.get(0), b.get(1))) ? -1 : 1; });
        var convexHullCoordinates = convexHull.map(function (p) { return p.components; });
        var weights = [highestWeight];
        var rootPoints = this.getAllRoots().map(function (r) { return new PointND_1["default"]([r.getVector().x, r.getVector().y]); });
        // console.log("rootPoints", rootPoints);
        // console.log("Convex Hull", convexHullCoordinates);
        var inConvexHull = function (point) {
            var classification = classifyPoint(convexHullCoordinates, point.components);
            return classification == 1 ? false : true;
        };
        function inside(point, vs) {
            // ray-casting algorithm based on
            // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
            var x = point[0], y = point[1];
            var inside = false;
            for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
                var xi = vs[i][0], yi = vs[i][1];
                var xj = vs[j][0], yj = vs[j][1];
                var intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect)
                    inside = !inside;
            }
            return inside;
        }
        ;
        var rootTraversalAlgorithm = function (currentElement, root) {
            var newElement = currentElement.add(root);
            console.log("In Hull: ", inConvexHull(newElement));
            console.log("New element", newElement);
            var inArray = weights.some(function (w) { return w.equal(newElement); });
            if (!inArray && inConvexHull(newElement)) {
                // console.log(newElement);
                weights.push(newElement);
                for (var _i = 0, rootPoints_2 = rootPoints; _i < rootPoints_2.length; _i++) {
                    var root_1 = rootPoints_2[_i];
                    rootTraversalAlgorithm(newElement, root_1);
                }
            }
            return;
        };
        for (var _i = 0, rootPoints_1 = rootPoints; _i < rootPoints_1.length; _i++) {
            var root = rootPoints_1[_i];
            rootTraversalAlgorithm(highestWeight, root);
        }
        return weights;
    };
    RootSystem2D.prototype.getHyperplanes = function () {
        var hyperplanes = [];
        for (var _i = 0, _a = this._positiveRoots; _i < _a.length; _i++) {
            var root = _a[_i];
            hyperplanes.push(new Hyperplane_1.Hyperplane(root.angle + Math.PI / 2));
        }
        hyperplanes.sort(function (a, b) {
            if (a.angle < b.angle) {
                return -1;
            }
            else if (a.angle === b.angle) {
                return 0;
            }
            return 1;
        });
        return hyperplanes;
    };
    RootSystem2D.prototype.getPositiveRoots = function () {
        return this._positiveRoots;
    };
    RootSystem2D.prototype.getAllWeylChambers = function () {
        var weylChambers = [];
        var hyperplanes = this.getHyperplanes();
        for (var _i = 0, hyperplanes_1 = hyperplanes; _i < hyperplanes_1.length; _i++) {
            var hyperplane = hyperplanes_1[_i];
            // Add two weyl chambers - one for every side of the hyperplane
            var weylChamber1 = new WeylChamber_1.WeylChamber(hyperplane.angle, this._minimumAngle);
            var weylChamber2 = new WeylChamber_1.WeylChamber(hyperplane.angle + Math.PI, this._minimumAngle);
            weylChambers.push(weylChamber1);
            weylChambers.push(weylChamber2);
        }
        console.log(weylChambers);
        weylChambers.sort(function (a, b) {
            if (a.startAngle < b.startAngle) {
                return -1;
            }
            else if (a.startAngle === b.startAngle) {
                return 0;
            }
            return 1;
        });
        return weylChambers;
    };
    RootSystem2D.prototype.getFundamentalWeylChamber = function () {
        var _this = this;
        var fundamentalWeylChamber = this.getAllWeylChambers().filter(function (chamber) {
            var base = _this.getBase();
            var nonNegativeDotProductToEveryBaseVector = base.every(function (baseElement) {
                return (baseElement.getVector().dot(chamber.getStartBoundingVector()) >=
                    -0.01);
            });
            return nonNegativeDotProductToEveryBaseVector;
        });
        return fundamentalWeylChamber[0];
    };
    RootSystem2D.prototype.getBase = function () {
        return this.getPositiveRoots().filter(function (root) { return root.isSimple; });
    };
    RootSystem2D.prototype.getLengthOfTransformation = function (transformation) {
        var positiveRoots = this.getPositiveRoots();
        var transformedVectors = positiveRoots.map(function (root) {
            return root.getVectorUnderTransformation(transformation);
        });
        var rootsThatChangedToNegative = transformedVectors.filter(function (transformedVector) {
            return positiveRoots.every(function (root) { return !root.getVector().equal(transformedVector); });
        });
        return rootsThatChangedToNegative.length;
    };
    return RootSystem2D;
}());
exports["default"] = RootSystem2D;
