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
exports.ProjectionPainterService = void 0;
var core_1 = require("@angular/core");
var MatrixND_1 = require("src/app/logic/maths/nD/MatrixND");
var PointND_1 = require("src/app/logic/maths/nD/PointND");
var THREE = require("three");
var colors_1 = require("../values/colors");
var ProjectionPainterService = /** @class */ (function () {
    function ProjectionPainterService(projectionService, canvasService) {
        this.projectionService = projectionService;
        this.canvasService = canvasService;
        this.scaleFactor = 3;
    }
    // Projects a 4D point to 3D space
    // or a 3D Point to 2D space
    // projectPointsOrthogonallyWithNormal(
    //   points: Array<PointND>,
    //   colors: Array<Colors>,
    //   projectionNormal: PointND,
    //   endDim: number){
    //     let transformedPoints: Array<PointND> = [];
    //     let projectionMatrix = new MatrixND([]);
    //     if(endDim == 3){
    //       projectionMatrix = this.rotateToNormalCube(projectionNormal.normalized());
    //     }
    //     else{
    //       projectionMatrix = this.rotateToZPlane(projectionNormal);
    //     }
    //     for(let point of points){
    //       let projectedPoint = this.projectionService.projectOntoHyperplane(point, projectionNormal);
    //       let transformedPoint = projectedPoint.multiplyOnLeftWithMatrix(projectionMatrix);
    //       transformedPoints.push(transformedPoint);
    //     }
    //   this.drawPoints(transformedPoints, colors, endDim);
    // }
    ProjectionPainterService.prototype.projectPointsOrthogonallyWithMatrix = function (points, colors, rotationMatrix, endDim) {
        var projectedPoints = [];
        console.log("Rotate with", rotationMatrix);
        var normalComponents = new Array(points[0].dim).fill(0);
        if (endDim == 2) {
            normalComponents[2] = 1;
        }
        else {
            normalComponents[3] = 1;
        }
        var normalRotation = new PointND_1["default"](normalComponents).multiplyOnLeftWithMatrix(rotationMatrix);
        var projectionRotationMatrix = MatrixND_1["default"].identity(endDim);
        // console.log("Normal vector", normalRotation);
        // console.log("Normal vector start", normalComponents);
        projectionRotationMatrix = this.rotateToNormalCube(normalRotation, new PointND_1["default"](normalComponents));
        // console.log("Normal rotation matrix", projectionRotationMatrix)
        // console.log("Result", normalRotation.multiplyOnLeftWithMatrix(projectionRotationMatrix))
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            var projectedPoint = this.projectionService.projectWithMatrix(point, rotationMatrix, endDim);
            projectedPoints.push(projectedPoint.multiplyOnLeftWithMatrix(rotationMatrix.transpose()));
        }
        console.log(projectedPoints);
        this.drawPoints(projectedPoints, colors, endDim);
    };
    ProjectionPainterService.prototype.projectPointsStereographically = function (points, colors, rotation, endDim) {
        var transformedPoints = [];
        for (var _i = 0, points_2 = points; _i < points_2.length; _i++) {
            var point = points_2[_i];
            var rotatedPoint = point.multiplyOnLeftWithMatrix(rotation);
            var point2D = this.projectionService.stereographicProjectionFromND(rotatedPoint, endDim);
            transformedPoints.push(point2D);
        }
        this.drawPoints(transformedPoints, colors, endDim);
    };
    ProjectionPainterService.prototype.drawPoints = function (points, colors, endDim) {
        var i = 0;
        for (var _i = 0, points_3 = points; _i < points_3.length; _i++) {
            var mathPoint = points_3[_i];
            var geometry = new THREE.SphereGeometry(0.3, 16, 16);
            var material = new THREE.MeshStandardMaterial({
                color: colors[i]
            });
            if (endDim == 2) {
                material = new THREE.MeshBasicMaterial({
                    color: colors[i]
                });
            }
            var point = new THREE.Mesh(geometry, material);
            // 2D case
            if (endDim == 2) {
                point.position.set(mathPoint.get(0) * this.scaleFactor, mathPoint.get(1) * this.scaleFactor, 0);
            }
            // 3D case
            else {
                point.position.set(mathPoint.get(0) * this.scaleFactor, mathPoint.get(1) * this.scaleFactor, mathPoint.get(2) * this.scaleFactor);
            }
            this.canvasService.drawToPointGroup(point);
            i += 1;
        }
    };
    // drawPointsWith2DProjection(points: Array<Point3D>, projectionNormal: Point3D, colors: Array<Colors>){
    //   let transformedPoints: Array<Point3D> = [];
    //   let zProjectionMatrix = this.rotateToZPlane(projectionNormal.normalized());
    //   for(let point of points){
    //     let projectedPoint = this.projectionService.projectOnto2DPlane(point, projectionNormal);
    //     let transformedVector = new Vector3(projectedPoint.x, projectedPoint.y, projectedPoint.z);
    //     transformedVector.applyMatrix3(zProjectionMatrix);
    //     transformedPoints.push(new Point3D(transformedVector.x, transformedVector.y, transformedVector.z));
    //   }
    //   let i = 0;
    //   for(let transformedPoint of transformedPoints){
    //     const geometry = new THREE.SphereGeometry( 0.3, 16, 16 );
    //     const material = new THREE.MeshStandardMaterial( {
    //       color: colors[i],
    //     } );
    //     const point = new THREE.Mesh( geometry, material );
    //     point.position.set(transformedPoint.x*this.scaleFactor, transformedPoint.y*this.scaleFactor, transformedPoint.z*this.scaleFactor);
    //     this.canvasService.drawToPointGroup(point);
    //     i += 1
    //   }
    // }
    // drawPointsWith2DStereographicProjection(points: Array<PointND>, colors: Array<Colors>){
    //   let transformedPoints: Array<Point3D> = [];
    //   for(let point of points){
    //     let point2D = this.projectionService.stereographicProjectionFromND(point, 2)
    //     transformedPoints.push(new Point3D(point2D.components[0], point2D.components[1], 0));
    //   }
    //   let i = 0;
    //   for(let transformedPoint of transformedPoints){
    //     const geometry = new THREE.SphereGeometry( 0.3, 16, 16 );
    //     const material = new THREE.MeshStandardMaterial( {
    //       color: colors[i],
    //     } );
    //     const point = new THREE.Mesh( geometry, material );
    //     point.position.set(transformedPoint.x*this.scaleFactor, transformedPoint.y*this.scaleFactor, transformedPoint.z*this.scaleFactor);
    //     this.canvasService.drawToPointGroup(point);
    //     i += 1
    //   }
    // }
    // drawPointsWith3DStereographicProjection(points: Array<PointND>, colors: Array<Colors>,
    //   rotationMatrix: MatrixND = MatrixND.identity(4)){
    //   let transformedPoints: Array<Point3D> = [];
    //   for(let point of points){
    //     point = point.multiplyOnLeftWithMatrix(rotationMatrix)
    //     let projectedPoint = this.projectionService.stereographicProjectionFromND(point, 3)
    //     transformedPoints.push(new Point3D(projectedPoint.components[0], projectedPoint.components[1], projectedPoint.components[2]));
    //   }
    //   let i = 0;
    //   for(let transformedPoint of transformedPoints){
    //     const geometry = new THREE.SphereGeometry( 0.3, 16, 16 );
    //     const material = new THREE.MeshStandardMaterial( {
    //       color: colors[i],
    //     } );
    //     const point = new THREE.Mesh( geometry, material );
    //     point.position.set(transformedPoint.x*this.scaleFactor, transformedPoint.y*this.scaleFactor, transformedPoint.z*this.scaleFactor);
    //     this.canvasService.drawToPointGroup(point);
    //     i += 1
    //   }
    // }
    // draw4DPointsAs3DProjection(points: Array<PointND>, projectionNormal: PointND, colors: Array<Colors>){
    //   let transformedPoints: Array<PointND> = [];
    //   let zProjectionMatrix = this.rotateToNormalCube(projectionNormal.normalized());
    //   for(let point of points){
    //     let projectedPoint = this.projectionService.projectOntoHyperplane(point, projectionNormal);
    //     let transformedPoint = projectedPoint.multiplyOnLeftWithMatrix(zProjectionMatrix);
    //     transformedPoints.push(transformedPoint);
    //   }
    //   let i = 0;
    //   for(let transformedPoint of transformedPoints){
    //     const geometry = new THREE.SphereGeometry( 0.3, 16, 16 );
    //     const material = new THREE.MeshStandardMaterial( {
    //       color: colors[i],
    //     } );
    //     const point = new THREE.Mesh( geometry, material );
    //     point.position.set(
    //       transformedPoint.components[0]*this.scaleFactor,
    //       transformedPoint.components[1]*this.scaleFactor,
    //       transformedPoint.components[2]*this.scaleFactor
    //     );
    //     this.canvasService.drawToPointGroup(point);
    //     i += 1
    //   }
    // }
    // draw5DPointsAs3DProjection(points: Array<PointND>, colors: Array<Colors>){
    //   let projectedPoints: Array<PointND> = [];
    //   for(let point of points){
    //     let projectedPoint = this.projectionService.projectOnto3DHyperplaneIn5D(point, point);
    //     projectedPoints.push(projectedPoint);
    //   }
    //   let i = 0;
    //   for(let projectedPoint of projectedPoints){
    //     const geometry = new THREE.SphereGeometry( 0.3, 16, 16 );
    //     const material = new THREE.MeshStandardMaterial( {
    //       color: colors[i],
    //     } );
    //     const point = new THREE.Mesh( geometry, material );
    //     point.position.set(
    //       projectedPoint.components[0]*this.scaleFactor,
    //       projectedPoint.components[1]*this.scaleFactor,
    //       projectedPoint.components[2]*this.scaleFactor
    //     );
    //     this.canvasService.drawToPointGroup(point);
    //     i += 1
    //   }
    // }
    // draw6DPointsAs3DProjection(points: Array<PointND>, colors: Array<Colors>){
    //   let projectedPoints: Array<PointND> = [];
    //   for(let point of points){
    //     let projectedPoint = this.projectionService.projectOnto3DHyperplaneIn6D(point, point);
    //     projectedPoints.push(projectedPoint);
    //   }
    //   let i = 0;
    //   for(let projectedPoint of projectedPoints){
    //     const geometry = new THREE.SphereGeometry( 0.3, 16, 16 );
    //     const material = new THREE.MeshStandardMaterial( {
    //       color: colors[i],
    //     } );
    //     const point = new THREE.Mesh( geometry, material );
    //     point.position.set(
    //       projectedPoint.components[0]*this.scaleFactor,
    //       projectedPoint.components[1]*this.scaleFactor,
    //       projectedPoint.components[2]*this.scaleFactor
    //     );
    //     this.canvasService.drawToPointGroup(point);
    //     i += 1
    //   }
    // }
    // draw5DPointsAs2DProjection(points: Array<PointND>, colors: Array<Colors>){
    //   let transformedPoints: Array<Point> = [];
    //   for(let point of points){
    //     let projectedPoint = this.projectionService.projectOnto2DHyperplaneIn5D(point);
    //     transformedPoints.push(new Point(projectedPoint.components[0], projectedPoint.components[1]));
    //   }
    //   let i = 0;
    //   for(let transformedPoint of transformedPoints){
    //     const geometry = new THREE.SphereGeometry( 0.3, 16, 16 );
    //     const material = new THREE.MeshStandardMaterial( {
    //       color: colors[i],
    //     } );
    //     const point = new THREE.Mesh( geometry, material );
    //     point.position.set(transformedPoint.x*this.scaleFactor, transformedPoint.y*this.scaleFactor, 0);
    //     this.canvasService.drawToPointGroup(point);
    //     i += 1
    //   }
    // }
    ProjectionPainterService.prototype.rotateToNormalCube = function (y, x) {
        // https://math.stackexchange.com/questions/598750/finding-the-rotation-matrix-in-n-dimensions
        var dim = x.dim;
        x = x.normalized();
        // console.log("x", x);
        y = y.normalized();
        var u = x.normalized();
        var utyu = u.asMatrix().scalarMultiply((u.getTranspose().multiply(y.asMatrix())).components[0][0]);
        // console.log("UTYU", utyu);
        var v = y.asMatrix().add(utyu.scalarMultiply(-1));
        // console.log("V", v);
        var uut = u.asMatrix().multiply(u.getTranspose());
        // console.log("UUT", uut);
        var vvt = v.multiply(v.transpose());
        // console.log("VVT", vvt)
        var cos = x.dotProduct(y) * 1 / (x.length() * y.length());
        var sin = Math.sqrt(1 - cos * cos);
        // console.log("cos", cos)
        // console.log("sin", sin)
        var R = new MatrixND_1["default"]([[cos, -sin], [sin, cos]]);
        // console.log("R", R);
        var uvMatrixTranspose = new MatrixND_1["default"]([__spreadArrays(u.components), __spreadArrays(v.components.map(function (o) { return o[0]; }))]);
        // console.log("uvMatrixTranspose", uvMatrixTranspose);
        var uvMatrix = uvMatrixTranspose.transpose();
        // console.log("uvMatrix", uvMatrix);
        var secondPart = (uvMatrix.multiply(R)).multiply(uvMatrixTranspose);
        // console.log("secondPart", secondPart);
        // console.log("ID", MatrixND.identity(dim));
        var rotation = MatrixND_1["default"].identity(dim).add(uut.scalarMultiply(-1)).add(vvt.scalarMultiply(-1)).add(secondPart);
        // console.log("Rotation", rotation);
        return rotation.transpose();
    };
    // rotateToZPlane(point: PointND){
    //   //https://math.stackexchange.com/questions/180418/calculate-rotation-matrix-to-align-vector-a-to-vector-b-in-3d
    //   point = point.normalized();
    //   let zPlaneNormalVector = new PointND([0,0,1]);
    //   let v = point.crossProduct(zPlaneNormalVector);
    //   let c = point.dotProduct(zPlaneNormalVector);
    //   let m = new MatrixND([
    //     [0, v.get(2), -v.get(1),],
    //     [-v.get(2), 0, v.get(0),],
    //     [v.get(1), -v.get(0), 0]
    //   ])
    //   let mSquared = m.multiply(m).scalarMultiply(1/(1+c));
    //   let result = MatrixND.identity(3).add(m).add(mSquared);
    //   return result;
    // }
    // rotateToZPlane(point: Point3D){
    //   let v = new THREE.Vector3(point.x, point.y, point.z);
    //   let k = new THREE.Vector3(0,0,1)
    //   let cos = v.dot(k)
    //   cos = cos*1/v.length()
    //   let sin = Math.sqrt((v.x+v.x)/(v.length()*v.length()))
    //   let u = new Vector3();
    //   u.crossVectors(v,k)
    //   u = u.multiplyScalar(v.length())
    //   let u1 = u.x
    //   let u2 = u.y
    //   return new Matrix3().fromArray([
    //     cos + u1*u1*(1-cos), u1*u2*(1-cos), -u2*sin,
    //     u1*u2*(1-cos), cos+u2*u2*(1-cos), u1*sin,
    //     u2*sin, -u1*sin, cos
    //   ])
    // }
    // rotateToZPlane(point: Point3D){
    //   const addMatrices = (m1: Matrix3, m2: Matrix3) => {
    //     let e1 = m1.elements;
    //     let e2 = m2.elements;
    //     let addedElements = e1.map((e, i)=>e+e2[i]);
    //     return new Matrix3().fromArray(
    //       [addedElements[0], addedElements[3], addedElements[6],
    //       addedElements[1], addedElements[4], addedElements[7],
    //       addedElements[2], addedElements[5], addedElements[8],
    //     ]
    //     )
    //   }
    //   //https://math.stackexchange.com/questions/180418/calculate-rotation-matrix-to-align-vector-a-to-vector-b-in-3d
    //   let vector = new Vector3(point.x, point.y, point.z);
    //   vector = vector.normalize();
    //   let zPlaneNormalVector = new Vector3(0,0,1);
    //   let v = new Vector3()
    //   v.crossVectors(vector, zPlaneNormalVector);
    //   let c = vector.dot(zPlaneNormalVector);
    //   // let vMatrix = new Matrix3().fromArray([
    //   //   0, -v.z, v.y,
    //   //   v.z, 0, -v.x,
    //   //   -v.y, v.x, 0
    //   // ])
    //   let vMatrix = new Matrix3().fromArray([
    //     0, v.z, -v.y,
    //     -v.z, 0, v.x,
    //     v.y, -v.x, 0
    //   ])
    //   let vMatrixClone = new Matrix3().fromArray([
    //     0, v.z, -v.y,
    //     -v.z, 0, v.x,
    //     v.y, -v.x, 0
    //   ])
    //   let vMatrixClone2 = new Matrix3().fromArray([
    //     0, v.z, -v.y,
    //     -v.z, 0, v.x,
    //     v.y, -v.x, 0
    //   ])
    //   vMatrixClone = vMatrixClone.multiply(vMatrixClone2)
    //   vMatrixClone = vMatrixClone.multiplyScalar(1/(1+c))
    //   let firstStep = addMatrices(new Matrix3().identity(), vMatrix);
    //   let secondStep = addMatrices(firstStep, vMatrixClone);
    //   return secondStep;
    // }
    ProjectionPainterService.prototype.drawPlane = function () {
        var planeGeometry = new THREE.PlaneGeometry(14, 14, 10, 10);
        var planeMaterial = new THREE.MeshStandardMaterial({
            color: colors_1.Colors.purple200, side: THREE.DoubleSide, opacity: 0.1, transparent: true
        });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(0, 0, 0);
        this.canvasService.drawToObjectGroup(plane);
    };
    ProjectionPainterService.prototype.drawCube = function () {
        var geometry = new THREE.BoxGeometry(12, 12, 12);
        var material = new THREE.MeshStandardMaterial({
            color: colors_1.Colors.purple200, side: THREE.DoubleSide, opacity: 0.05, transparent: true
        });
        var cube = new THREE.Mesh(geometry, material);
        var axisGeometry = new THREE.CylinderGeometry(0.05, 0.05, 12, 32);
        var materialAxis = new THREE.MeshStandardMaterial({
            color: colors_1.Colors.purple400, side: THREE.DoubleSide, opacity: 0.2, transparent: false
        });
        var axis1Mesh = new THREE.Mesh(axisGeometry, materialAxis);
        var axis2Mesh = new THREE.Mesh(axisGeometry, materialAxis);
        var axis3Mesh = new THREE.Mesh(axisGeometry, materialAxis);
        cube.position.set(0, 0, 0);
        axis1Mesh.position.set(-6, 0, -6);
        axis2Mesh.position.set(-6, -6, 0);
        axis2Mesh.rotateX(Math.PI / 2);
        axis3Mesh.position.set(0, -6, -6);
        axis3Mesh.rotateZ(Math.PI / 2);
        this.canvasService.drawToObjectGroup(cube);
        this.canvasService.drawToObjectGroup(axis1Mesh);
        this.canvasService.drawToObjectGroup(axis2Mesh);
        this.canvasService.drawToObjectGroup(axis3Mesh);
    };
    ProjectionPainterService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProjectionPainterService);
    return ProjectionPainterService;
}());
exports.ProjectionPainterService = ProjectionPainterService;
