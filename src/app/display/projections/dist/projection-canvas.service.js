"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectionCanvasService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var THREE = require("three");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var colors_1 = require("../values/colors");
var ProjectionCanvasService = /** @class */ (function () {
    function ProjectionCanvasService() {
        this.pointGroup = new THREE.Group();
        this.otherObjectsGroup = new THREE.Group();
        this.sceneInitializedSubject = new rxjs_1.Subject();
        this.sceneHasBeenInitialized = false;
    }
    ProjectionCanvasService.prototype.initalizeScene = function (canvas) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.canvas.appendChild(this.renderer.domElement);
        this.renderer.setClearColor(colors_1.Colors.purple800);
        this.camera.position.z = 20;
        this.camera.position.y = 0;
        this.camera.updateMatrix();
        this.addOrbitControls();
        this.addLight();
        this.displayScene();
        this.scene.add(this.pointGroup);
        this.scene.add(this.otherObjectsGroup);
        this.sceneInitializedSubject.next();
        this.sceneHasBeenInitialized = true;
    };
    ProjectionCanvasService.prototype.reinitializePoints = function () {
        this.pointGroup.removeFromParent();
        this.pointGroup = new THREE.Group();
        this.scene.add(this.pointGroup);
    };
    ProjectionCanvasService.prototype.reinitializeObjects = function () {
        this.otherObjectsGroup.removeFromParent();
        this.otherObjectsGroup = new THREE.Group();
        this.scene.add(this.otherObjectsGroup);
    };
    ProjectionCanvasService.prototype.addOrbitControls = function () {
        this.orbitControls = new OrbitControls_1.OrbitControls(this.camera, this.renderer.domElement);
        // orbitControls.enabled = false;
    };
    ProjectionCanvasService.prototype.disableOrbiting = function () {
        this.orbitControls.reset();
        this.orbitControls.enableRotate = false;
    };
    ProjectionCanvasService.prototype.enableOrbiting = function () {
        this.orbitControls.enableRotate = true;
    };
    ProjectionCanvasService.prototype.displayScene = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.displayScene(); });
        this.renderer.render(this.scene, this.camera);
    };
    ProjectionCanvasService.prototype.addLight = function () {
        var ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
        directionalLight.position.set(0, 20, 0);
        this.scene.add(ambientLight);
        this.scene.add(directionalLight);
    };
    ProjectionCanvasService.prototype.drawToPointGroup = function (mesh) {
        this.pointGroup.add(mesh);
    };
    ProjectionCanvasService.prototype.drawToObjectGroup = function (mesh) {
        this.otherObjectsGroup.add(mesh);
    };
    ProjectionCanvasService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProjectionCanvasService);
    return ProjectionCanvasService;
}());
exports.ProjectionCanvasService = ProjectionCanvasService;
