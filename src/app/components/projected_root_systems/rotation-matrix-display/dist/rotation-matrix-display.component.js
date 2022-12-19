"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RotationMatrixDisplayComponent = void 0;
var projection_manager_service_1 = require("src/app/display/projections/projection-manager.service");
var core_1 = require("@angular/core");
var MatrixND_1 = require("src/app/logic/maths/nD/MatrixND");
var RotationMatrixDisplayComponent = /** @class */ (function () {
    function RotationMatrixDisplayComponent(projectionManager, cd) {
        var _this = this;
        this.projectionManager = projectionManager;
        this.cd = cd;
        this.rotationMatrix = MatrixND_1["default"].identity(3);
        this.rotationNormals = [];
        this.rotationNormals = this.getNormals();
        projectionManager.rotationsChanged.subscribe(function () {
            _this.rotationMatrix = _this.projectionManager.rotationMatrix;
            if (projectionManager.projectionType == projection_manager_service_1.ProjectionType.orthogonal) {
                _this.rotationNormals = _this.getNormals();
            }
            else {
                _this.rotationNormals = [];
            }
            _this.cd.detectChanges();
        });
    }
    RotationMatrixDisplayComponent.prototype.getNormals = function () {
        return this.projectionManager.normals.map(function (n) { return n.components.map(function (c) { return c.toFixed(1) != "-0.0" ? c.toFixed(1) : "0.0"; }).join(', '); });
    };
    RotationMatrixDisplayComponent = __decorate([
        core_1.Component({
            selector: 'app-rotation-matrix-display',
            templateUrl: './rotation-matrix-display.component.html',
            styleUrls: ['./rotation-matrix-display.component.sass'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], RotationMatrixDisplayComponent);
    return RotationMatrixDisplayComponent;
}());
exports.RotationMatrixDisplayComponent = RotationMatrixDisplayComponent;
