"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RotationSliderComponent = void 0;
var core_1 = require("@angular/core");
var RotationSliderComponent = /** @class */ (function () {
    function RotationSliderComponent() {
        this.degreeChanged = new core_1.EventEmitter();
        this.degree = 0;
        this.base1 = 0;
        this.base2 = 0;
    }
    RotationSliderComponent.prototype.changeDegree = function (value) {
        this.degree = value;
        this.degreeChanged.emit(value);
    };
    __decorate([
        core_1.Output()
    ], RotationSliderComponent.prototype, "degreeChanged");
    __decorate([
        core_1.Input()
    ], RotationSliderComponent.prototype, "degree");
    __decorate([
        core_1.Input()
    ], RotationSliderComponent.prototype, "base1");
    __decorate([
        core_1.Input()
    ], RotationSliderComponent.prototype, "base2");
    RotationSliderComponent = __decorate([
        core_1.Component({
            selector: 'app-rotation-slider',
            templateUrl: './rotation-slider.component.html',
            styleUrls: ['./rotation-slider.component.sass']
        })
    ], RotationSliderComponent);
    return RotationSliderComponent;
}());
exports.RotationSliderComponent = RotationSliderComponent;
