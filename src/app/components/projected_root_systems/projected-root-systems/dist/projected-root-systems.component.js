"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectedRootSystemsComponent = void 0;
var core_1 = require("@angular/core");
var ProjectedRootSystemsComponent = /** @class */ (function () {
    function ProjectedRootSystemsComponent(projectionManager, cd) {
        var _this = this;
        this.projectionManager = projectionManager;
        this.cd = cd;
        this.projectionStartDim = 3;
        this.projectionEndDim = 2;
        projectionManager.dimensionsChanged.subscribe(function () {
            _this.updateProjectionType();
            _this.cd.detectChanges();
        });
    }
    ProjectedRootSystemsComponent.prototype.ngAfterViewInit = function () {
        this.projectionManager.initializeView(this.canvas.nativeElement);
    };
    ProjectedRootSystemsComponent.prototype.updateProjectionType = function () {
        this.projectionStartDim = this.projectionManager.startDimension;
        this.projectionEndDim = this.projectionManager.endDimension;
    };
    __decorate([
        core_1.ViewChild('threeCanvas')
    ], ProjectedRootSystemsComponent.prototype, "canvas");
    ProjectedRootSystemsComponent = __decorate([
        core_1.Component({
            selector: 'app-projected-root-systems',
            templateUrl: './projected-root-systems.component.html',
            styleUrls: ['./projected-root-systems.component.sass'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ProjectedRootSystemsComponent);
    return ProjectedRootSystemsComponent;
}());
exports.ProjectedRootSystemsComponent = ProjectedRootSystemsComponent;
