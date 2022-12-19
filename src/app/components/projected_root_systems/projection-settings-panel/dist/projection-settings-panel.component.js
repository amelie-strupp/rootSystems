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
exports.ProjectionSettingsPanelComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var rootSystems3D_1 = require("src/app/data/rootSystems3D");
var rootSystemsND_1 = require("src/app/data/rootSystemsND");
var projection_manager_service_1 = require("src/app/display/projections/projection-manager.service");
var RootSystemColorMode_1 = require("src/app/display/RootSystemColorMode");
var PointND_1 = require("src/app/logic/maths/nD/PointND");
var ProjectionSettingsPanelComponent = /** @class */ (function () {
    function ProjectionSettingsPanelComponent(projectionManager, canvasService) {
        var _this = this;
        this.projectionManager = projectionManager;
        this.canvasService = canvasService;
        this.ProjectionType = projection_manager_service_1.ProjectionType;
        this.isExpanded = true;
        this.projectionStart = 3;
        this.projectionEnd = 2;
        this.selectedRootSystem = "A3";
        this.possibleStartDimensions = [3, 4, 5, 6];
        this.projectionType = projection_manager_service_1.ProjectionType.orthogonal;
        this.rootSystems = [
            { dim: 3, systems: [
                    { text: "A3", ref: rootSystems3D_1.rootSystems3D.A3.getPositiveRoots().map(function (r) {
                            var v = r.getVector();
                            return new PointND_1["default"]([v.x, v.y, v.z]);
                        }), colors: RootSystemColorMode_1.rootSystemColors.A3 },
                    { text: "B3", ref: rootSystems3D_1.rootSystems3D.B3.getPositiveRoots().map(function (r) {
                            var v = r.getVector();
                            return new PointND_1["default"]([v.x, v.y, v.z]);
                        }), colors: RootSystemColorMode_1.rootSystemColors.B3 },
                    { text: "C3", ref: rootSystems3D_1.rootSystems3D.C3.getPositiveRoots().map(function (r) {
                            var v = r.getVector();
                            return new PointND_1["default"]([v.x, v.y, v.z]);
                        }), colors: RootSystemColorMode_1.rootSystemColors.C3 },
                ]
            },
            { dim: 4,
                systems: [
                    { text: "A4", ref: rootSystemsND_1.rootSystemsND.A4, colors: RootSystemColorMode_1.rootSystemColors.A4 },
                    { text: "B4", ref: rootSystemsND_1.rootSystemsND.B4, colors: RootSystemColorMode_1.rootSystemColors.B4 },
                    { text: "C4", ref: rootSystemsND_1.rootSystemsND.C4, colors: RootSystemColorMode_1.rootSystemColors.C4 },
                    { text: "D4", ref: rootSystemsND_1.rootSystemsND.D4, colors: RootSystemColorMode_1.rootSystemColors.D4 },
                    { text: "F4", ref: rootSystemsND_1.rootSystemsND.F4, colors: RootSystemColorMode_1.rootSystemColors.F4 },
                ] },
            { dim: 5,
                systems: [
                    { text: "A5", ref: rootSystemsND_1.rootSystemsND.A5, colors: RootSystemColorMode_1.rootSystemColors.A5 },
                    { text: "B5", ref: rootSystemsND_1.rootSystemsND.B5, colors: RootSystemColorMode_1.rootSystemColors.B5 },
                    { text: "C5", ref: rootSystemsND_1.rootSystemsND.C5, colors: RootSystemColorMode_1.rootSystemColors.B5 },
                    { text: "D5", ref: rootSystemsND_1.rootSystemsND.D5, colors: RootSystemColorMode_1.rootSystemColors.B5 },
                ] },
            { dim: 6,
                systems: [
                    { text: "A6", ref: rootSystemsND_1.rootSystemsND.A6, colors: RootSystemColorMode_1.rootSystemColors.B5 },
                    { text: "B6", ref: rootSystemsND_1.rootSystemsND.B6, colors: RootSystemColorMode_1.rootSystemColors.B5 },
                    { text: "C6", ref: rootSystemsND_1.rootSystemsND.C6, colors: RootSystemColorMode_1.rootSystemColors.B5 },
                    { text: "D6", ref: rootSystemsND_1.rootSystemsND.D6, colors: RootSystemColorMode_1.rootSystemColors.B5 },
                    { text: "E6", ref: rootSystemsND_1.rootSystemsND.E6, colors: RootSystemColorMode_1.rootSystemColors.B5 }
                ] }
        ];
        this.canvasService.sceneInitializedSubject.subscribe(function () {
            if (_this.projectionManager.rootList.length == 0) {
                var rootSystemsWithDim = _this.rootSystems.findIndex(function (o) { return o.dim == _this.projectionStart; });
                var firstRootSystem = _this.rootSystems[rootSystemsWithDim].systems[0];
                _this.loadRootSystem(firstRootSystem.ref, firstRootSystem.colors, firstRootSystem.text);
            }
            _this.paintRootSystem();
        });
    }
    ProjectionSettingsPanelComponent.prototype.ngAfterViewInit = function () {
        this.projectionType = this.projectionManager.projectionType;
        this.projectionEnd = this.projectionManager.endDimension;
        this.projectionStart = this.projectionManager.startDimension;
        this.selectedRootSystem = this.projectionManager.rootSystemIdentifier;
    };
    ProjectionSettingsPanelComponent.prototype.toggleExpand = function () {
        this.isExpanded = !this.isExpanded;
    };
    ProjectionSettingsPanelComponent.prototype.loadRootSystem = function (rootSystem, colors, id) {
        this.selectedRootSystem = id;
        this.projectionManager.setPoints(__spreadArrays(rootSystem, rootSystem.map(function (r) { return r.getNegative(); })), id);
        this.projectionManager.setColors(__spreadArrays(colors, colors));
        this.paintRootSystem();
    };
    ProjectionSettingsPanelComponent.prototype.setProjectionDim = function (start, end) {
        var _this = this;
        this.projectionStart = start;
        this.projectionManager.setStartDimension(start);
        this.projectionEnd = end;
        this.projectionManager.setEndDimension(end);
        var rootSystemsWithDim = this.rootSystems.findIndex(function (o) { return o.dim == _this.projectionStart; });
        var firstRootSystem = this.rootSystems[rootSystemsWithDim].systems[0];
        this.loadRootSystem(firstRootSystem.ref, firstRootSystem.colors, firstRootSystem.text);
        this.paintRootSystem();
    };
    ProjectionSettingsPanelComponent.prototype.setProjectionType = function (type) {
        this.projectionType = type;
        this.projectionManager.setProjectionType(type);
        this.paintRootSystem();
    };
    ProjectionSettingsPanelComponent.prototype.paintRootSystem = function () {
        // if(this.selectedRootSystem == "E6"){
        //   this.projectionManager.setStartDimension(8);
        // }
        this.projectionManager.paintProjection();
        // this.projectionManager.setStartDimension(6);
    };
    ProjectionSettingsPanelComponent = __decorate([
        core_1.Component({
            selector: 'app-projection-settings-panel',
            templateUrl: './projection-settings-panel.component.html',
            styleUrls: ['./projection-settings-panel.component.sass'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
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
    ], ProjectionSettingsPanelComponent);
    return ProjectionSettingsPanelComponent;
}());
exports.ProjectionSettingsPanelComponent = ProjectionSettingsPanelComponent;
