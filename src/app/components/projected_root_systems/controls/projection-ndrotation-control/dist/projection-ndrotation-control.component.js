"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectionNDRotationControlComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var MatrixND_1 = require("src/app/logic/maths/nD/MatrixND");
var ProjectionNDRotationControlComponent = /** @class */ (function () {
    function ProjectionNDRotationControlComponent(projectionManager) {
        this.projectionManager = projectionManager;
        this.angles = [];
        this.sliders = [];
        this.isExpanded = true;
        this.dimension = 4;
        this.numberOfSliders = 2;
    }
    ProjectionNDRotationControlComponent.prototype.ngOnInit = function () {
        this.generateSliders();
        this.angles = Array.apply(null, Array(this.sliders.length)).map(function (a) { return 0; });
        this.rotationMatrix = MatrixND_1["default"].identity(this.dimension);
    };
    ProjectionNDRotationControlComponent.prototype.toggleExpand = function () {
        this.isExpanded = !this.isExpanded;
    };
    ProjectionNDRotationControlComponent.prototype.ngOnChanges = function (changes) {
        if (changes["dimension"]) {
            this.generateSliders();
            this.angles = Array.apply(null, Array(this.sliders.length)).map(function (a) { return 0; });
            this.rotationMatrix = MatrixND_1["default"].identity(this.dimension);
        }
    };
    ProjectionNDRotationControlComponent.prototype.generateSliders = function () {
        for (var i = 1; i <= this.dimension; ++i) {
            for (var j = 1; j < i; ++j) {
                this.sliders.push([i, j]);
            }
        }
    };
    ProjectionNDRotationControlComponent.prototype.setAngle = function (index, angle) {
        this.angles[index] = angle;
        this.generateMatrix();
    };
    ProjectionNDRotationControlComponent.prototype.generateMatrix = function () {
        var m = MatrixND_1["default"].identity(this.dimension);
        var i = 0;
        for (var _i = 0, _a = this.sliders; _i < _a.length; _i++) {
            var slider = _a[_i];
            var rotationMatrix = MatrixND_1["default"].basicRotationMatrix(this.dimension, slider[0] - 1, slider[1] - 1, (this.angles[i] / 360) * Math.PI * 2);
            m = m.multiply(rotationMatrix);
            i++;
            console.log(rotationMatrix);
        }
        this.rotationMatrix = m;
        this.projectionManager.setRotationMatrix(this.rotationMatrix);
    };
    __decorate([
        core_1.Input()
    ], ProjectionNDRotationControlComponent.prototype, "dimension");
    ProjectionNDRotationControlComponent = __decorate([
        core_1.Component({
            selector: 'app-projection-ndrotation-control',
            templateUrl: './projection-ndrotation-control.component.html',
            styleUrls: ['./projection-ndrotation-control.component.sass'],
            animations: [
                animations_1.trigger('expanded', [
                    animations_1.state('void', animations_1.style({
                        height: '0'
                    })),
                    animations_1.state('true', animations_1.style({
                        height: '*'
                    })),
                    animations_1.state('false', animations_1.style({
                        height: '0'
                    })),
                    animations_1.transition('true <=> false', [
                        animations_1.animate('125ms ease-in-out')
                    ]),
                ]),
            ]
        })
    ], ProjectionNDRotationControlComponent);
    return ProjectionNDRotationControlComponent;
}());
exports.ProjectionNDRotationControlComponent = ProjectionNDRotationControlComponent;
