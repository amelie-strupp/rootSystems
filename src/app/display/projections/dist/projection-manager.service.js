"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ProjectionType = exports.ProjectionManagerService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var MatrixND_1 = require("src/app/logic/maths/nD/MatrixND");
var PointND_1 = require("src/app/logic/maths/nD/PointND");
var ProjectionManagerService = /** @class */ (function () {
    function ProjectionManagerService(canvasService, paintService) {
        this.canvasService = canvasService;
        this.paintService = paintService;
        this.startDimension = 3;
        this.endDimension = 2;
        this.rootList = [];
        this.normals = [new PointND_1["default"]([0, 0, 1])];
        this.colorList = [];
        this.rotationMatrix = MatrixND_1["default"].identity(4);
        this.dimensionsChanged = new rxjs_1.Subject();
        this.rotationsChanged = new rxjs_1.Subject();
        this.rootSystemIdentifier = "A3";
        this.projectionType = ProjectionType.orthogonal;
    }
    ProjectionManagerService.prototype.setStartDimension = function (x) {
        this.startDimension = x;
        this.dimensionsChanged.next();
    };
    ProjectionManagerService.prototype.setEndDimension = function (x) {
        this.endDimension = x;
        this.dimensionsChanged.next();
    };
    ProjectionManagerService.prototype.setRotationMatrix = function (m) {
        this.rotationMatrix = m;
        this.paintProjection();
        this.normals = this.getNormal();
        this.rotationsChanged.next();
    };
    ProjectionManagerService.prototype.getNormal = function () {
        var normalComponents = new Array(this.startDimension).fill(0);
        var normal = new PointND_1["default"](normalComponents);
        var normals = [];
        for (var dim = this.endDimension; dim < this.startDimension; ++dim) {
            var newComponents = __spreadArrays(normal.components);
            newComponents[dim] = 1;
            var newNormal = new PointND_1["default"](newComponents).multiplyOnLeftWithMatrix(this.rotationMatrix);
            normals.push(newNormal);
        }
        return normals;
    };
    ProjectionManagerService.prototype.setProjectionType = function (type) {
        this.projectionType = type;
        this.normals = this.getNormal();
        this.rotationsChanged.next();
    };
    ProjectionManagerService.prototype.setPoints = function (points, id) {
        this.rootList = points;
        this.rootSystemIdentifier = id;
    };
    ProjectionManagerService.prototype.setColors = function (colors) {
        this.colorList = colors;
    };
    ProjectionManagerService.prototype.removePoints = function () {
        this.canvasService.reinitializePoints();
    };
    ProjectionManagerService.prototype.initializeView = function (canvas) {
        this.canvasService.initalizeScene(canvas);
        this.paintObjectForDimension();
    };
    ProjectionManagerService.prototype.paintObjectForDimension = function () {
        this.canvasService.reinitializeObjects();
        if (this.endDimension == 2) {
            this.paintService.drawPlane();
            this.canvasService.disableOrbiting();
        }
        else if (this.endDimension == 3) {
            this.paintService.drawCube();
            this.canvasService.enableOrbiting();
        }
    };
    ProjectionManagerService.prototype.paintProjection = function () {
        this.removePoints();
        this.paintObjectForDimension();
        if (this.rotationMatrix.components.length != this.startDimension) {
            this.rotationMatrix = MatrixND_1["default"].identity(this.startDimension);
            this.normals = this.getNormal();
            this.rotationsChanged.next();
        }
        switch (this.projectionType) {
            case ProjectionType.orthogonal:
                // if(this.startDimension == 3 || this.startDimension == 4){
                //   this.paintService.projectPointsOrthogonallyWithNormal(
                //     this.rootList,
                //     this.colorList,
                //     normal,
                //     this.endDimension
                //   )
                // }else{
                this.paintService.projectPointsOrthogonallyWithMatrix(this.rootList, this.colorList, this.rotationMatrix, this.endDimension);
                // }
                break;
            case ProjectionType.stereographic:
                this.paintService.projectPointsStereographically(this.rootList, this.colorList, this.rotationMatrix, this.endDimension);
                break;
        }
    };
    ProjectionManagerService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProjectionManagerService);
    return ProjectionManagerService;
}());
exports.ProjectionManagerService = ProjectionManagerService;
var ProjectionType;
(function (ProjectionType) {
    ProjectionType[ProjectionType["orthogonal"] = 0] = "orthogonal";
    ProjectionType[ProjectionType["stereographic"] = 1] = "stereographic";
})(ProjectionType = exports.ProjectionType || (exports.ProjectionType = {}));
