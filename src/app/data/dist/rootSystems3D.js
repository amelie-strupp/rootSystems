"use strict";
exports.__esModule = true;
exports.rootSystems3D = exports.RootSystems3D = void 0;
var RootSystem3D_1 = require("../logic/maths/3D/RootSystem3D");
var Point3D_1 = require("../logic/maths_objects/3D/Point3D");
var RootSystems3D;
(function (RootSystems3D) {
    RootSystems3D["A3"] = "A3";
    RootSystems3D["B3"] = "B3";
    RootSystems3D["C3"] = "C3";
    // D3 = "D3"
})(RootSystems3D = exports.RootSystems3D || (exports.RootSystems3D = {}));
var A3 = new RootSystem3D_1["default"](RootSystems3D.A3, [1, 3, 2, 3, 1, 3, 2, 3, 1], [
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](0, 1, -1),
        isSimple: true
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](1, -1, 0),
        isSimple: true
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](0, 1, 1),
        isSimple: true
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](1, 0, -1),
        isSimple: false
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](1, 1, 0),
        isSimple: false
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](1, 0, 1),
        isSimple: false
    }),
]);
// const D3 = new RootSystem3D(
//     RootSystems3D.D3,
//     [
//         1,3,2,3,1,3,2,3,1
//     ],
//     [
//         new Root3D({
//             vector: new Point3D(
//                 0,1,-1
//             ),
//             isSimple: true,
//             }
//         ),
//         new Root3D({
//             vector: new Point3D(
//                 1,-1,0
//             ),
//             isSimple: true,
//             }
//         ),
//         new Root3D({
//             vector: new Point3D(
//                 0,1,1
//             ),
//             isSimple: true,
//             }
//         ),
//         new Root3D({
//             vector: new Point3D(
//                 1,0,-1
//             ),
//             isSimple: false,
//             }
//         ),
//         new Root3D({
//             vector: new Point3D(
//                 1,1,0
//             ),
//             isSimple: false,
//             }
//         ),
//         new Root3D({
//             vector: new Point3D(
//                 1,0,1
//             ),
//             isSimple: false,
//             }
//         ),
//     ]
// )
var B3 = new RootSystem3D_1["default"](RootSystems3D.B3, [1, 4, 2, 4, 1, 3, 2, 3, 1], [new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](0, 0, 1),
        isSimple: true
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](0, 1, -1),
        isSimple: true
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](1, -1, 0),
        isSimple: true
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](1, 0, 0),
        isSimple: false
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](0, 1, 0),
        isSimple: false
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](1, 1, 0),
        isSimple: false
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](0, 1, 1),
        isSimple: false
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](1, 0, 1),
        isSimple: false
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](1, 0, -1),
        isSimple: false
    }),
]);
var C3 = new RootSystem3D_1["default"](RootSystems3D.C3, [1, 4, 2, 4, 1, 3, 2, 3, 1], [
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](1, -1, 0),
        isSimple: true
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](0, 1, -1),
        isSimple: true
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](0, 0, 2),
        isSimple: true
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](1, 1, 0),
        isSimple: false
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](0, 1, 1),
        isSimple: false
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](1, 0, 1),
        isSimple: false
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](1, 0, -1),
        isSimple: false
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](2, 0, 0),
        isSimple: false
    }),
    new RootSystem3D_1.Root3D({
        vector: new Point3D_1["default"](0, 2, 0),
        isSimple: false
    }),
]);
exports.rootSystems3D = {
    A3: A3,
    B3: B3,
    C3: C3
};
