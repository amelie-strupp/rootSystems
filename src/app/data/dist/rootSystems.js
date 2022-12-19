"use strict";
exports.__esModule = true;
exports.rootSystems = exports.RootSystems2D = void 0;
var RootSystem_1 = require("../logic/maths/2D/RootSystem");
var MatrixND_1 = require("../logic/maths/nD/MatrixND");
var RootSystems2D;
(function (RootSystems2D) {
    RootSystems2D["A1"] = "A1";
    // A1_A1 = "A1_A1",
    // D2 = "D2",
    RootSystems2D["A2"] = "A2";
    RootSystems2D["B2"] = "B2";
    RootSystems2D["G2"] = "G2";
    // C2 = "C2"
})(RootSystems2D = exports.RootSystems2D || (exports.RootSystems2D = {}));
var A1 = new RootSystem_1["default"](RootSystems2D.A1, 2, [
    new MatrixND_1["default"]([
        [1, 0],
        [0, 1]
    ]),
    new MatrixND_1["default"]([
        [-1, 0],
        [0, 1]
    ]),
], [1], [
    new RootSystem_1.Root({
        angle: 0,
        length: 1,
        isSimple: true
    }),
], Math.PI);
// const A1_A1 = new RootSystem2D(
//     RootSystems2D.A1_A1,
//     [1,2,2,1],
//   [
//     new Root({
//       angle: 0,
//       length: 1,
//       isSimple: true,
//     }),
//     new Root({
//       angle: Math.PI / 2,
//       length: 1,
//       isSimple: true,
//     }),
//   ],
//   Math.PI / 2
// );
// const D2 = new RootSystem2D(
//     RootSystems2D.D2,
//     [1,2,2,1],
//     [
//       new Root({
//         angle: Math.PI/4,
//         length: 1,
//         isSimple: true,
//       }),
//       new Root({
//         angle: Math.PI / 2 + Math.PI/4,
//         length: 1,
//         isSimple: true,
//       }),
//     ],
//     Math.PI / 2
//   );
var A2 = new RootSystem_1["default"](RootSystems2D.A2, 6, [new MatrixND_1["default"]([
        [1, 0],
        [0, 1],
    ]),
    new MatrixND_1["default"]([
        [-1, 0],
        [0, 1],
    ]),
    new MatrixND_1["default"]([
        [0.5, 0.86602539],
        [0.86602539, -0.5],
    ]),
    new MatrixND_1["default"]([
        [0.5, -0.8660254],
        [-0.8660254, -0.5],
    ]),
    new MatrixND_1["default"]([
        [0.5, -0.8660254],
        [-0.8660254, -0.5],
    ]).multiply(new MatrixND_1["default"]([
        [0.5, 0.86602539],
        [0.86602539, -0.5],
    ])),
    new MatrixND_1["default"]([
        [-1, 0],
        [0, 1],
    ]).multiply(new MatrixND_1["default"]([
        [0.5, 0.86602539],
        [0.86602539, -0.5],
    ])),
], 
// [new MatrixND([
//       [1, 0],
//       [0, 1],
//     ]),
//     new MatrixND([
//       [1, 0],
//       [0, -1],
//     ]),
//     new MatrixND([
//       [-0.5, 0.86602539],
//       [ 0.86602539 , 0.5],
//     ]),
//     new MatrixND([
//       [-0.5, -0.86602539],
//       [  -0.8660254  , 0.5],
//     ]),
//     new MatrixND([
//       [1, 0],
//       [0, -1],
//     ]).multiply(new MatrixND([
//       [-0.5, 0.86602539],
//       [ 0.86602539 , 0.5],
//     ])),
//     new MatrixND([
//       [-0.5, -0.86602539],
//       [  -0.8660254  , 0.5],
//     ]).multiply(
//     new MatrixND([
//       [-0.5, 0.86602539],
//       [ 0.86602539 , 0.5],
//     ]),)
//   ],
[1, 3, 3, 1], [
    new RootSystem_1.Root({
        angle: Math.PI / 2 + Math.PI / 6,
        length: 1,
        isSimple: true
    }),
    new RootSystem_1.Root({
        angle: Math.PI / 2 + Math.PI / 3 + Math.PI + Math.PI / 6,
        length: 1,
        isSimple: true
    }),
    new RootSystem_1.Root({
        angle: Math.PI / 2 - Math.PI / 3 + Math.PI / 6,
        length: 1,
        isSimple: false,
        isHighestRoot: true
    }),
], Math.PI / 3);
var B2 = new RootSystem_1["default"](RootSystems2D.B2, 8, [new MatrixND_1["default"]([
        [1, 0],
        [0, 1],
    ]),
    new MatrixND_1["default"]([
        [0, -1],
        [-1, 0],
    ]),
    new MatrixND_1["default"]([
        [1, 0],
        [0, -1],
    ]),
    new MatrixND_1["default"]([
        [0, 1],
        [-1, 0],
    ]),
    new MatrixND_1["default"]([
        [0, 1],
        [1, 0],
    ]),
    new MatrixND_1["default"]([
        [-1, 0],
        [0, -1],
    ]),
    new MatrixND_1["default"]([
        [0, -1],
        [1, 0],
    ]),
    new MatrixND_1["default"]([
        [-1, 0],
        [0, 1],
    ]),
], [1, 4, 4, 1], [
    new RootSystem_1.Root({
        angle: 0,
        length: 1,
        isSimple: true
    }),
    new RootSystem_1.Root({
        angle: Math.PI / 4,
        length: Math.sqrt(2),
        isSimple: false
    }),
    new RootSystem_1.Root({
        angle: Math.PI / 2,
        length: 1,
        isSimple: false,
        isHighestRoot: true
    }),
    new RootSystem_1.Root({
        angle: (3 * Math.PI) / 4,
        length: Math.sqrt(2),
        isSimple: true
    }),
], Math.PI / 4);
// const C2 = new RootSystem2D(
//     RootSystems2D.C2,
//     [1,4,4,1],
//     [
//       new Root({
//         angle: 0,
//         length: 1,
//         isSimple: true,
//       }),
//       new Root({
//         angle: Math.PI / 4,
//         length: 1/Math.sqrt(2),
//         isSimple: false,
//         isHighestRoot: true
//       }),
//       new Root({
//         angle: Math.PI / 2,
//         length: 1,
//         isSimple: false,
//       }),
//       new Root({
//         angle: (3 * Math.PI) / 4,
//         length: 1/Math.sqrt(2),
//         isSimple: true,
//       }),
//     ],
//     Math.PI / 4
//   );
var G2 = new RootSystem_1["default"](RootSystems2D.G2, 12, [], [1, 6, 6, 1], [
    new RootSystem_1.Root({
        angle: 0,
        length: 1,
        isSimple: true
    }),
    new RootSystem_1.Root({
        angle: Math.PI / 6,
        length: Math.sqrt(3),
        isSimple: false
    }),
    new RootSystem_1.Root({
        angle: 2 * Math.PI / 6,
        length: 1,
        isSimple: false,
        isHighestRoot: true
    }),
    new RootSystem_1.Root({
        angle: Math.PI / 2,
        length: Math.sqrt(3),
        isSimple: false
    }),
    new RootSystem_1.Root({
        angle: Math.PI / 6 + Math.PI / 2,
        length: 1,
        isSimple: false
    }),
    new RootSystem_1.Root({
        angle: 2 * Math.PI / 6 + Math.PI / 2,
        length: Math.sqrt(3),
        isSimple: true
    }),
], Math.PI / 6);
exports.rootSystems = {
    A1: A1,
    // A1_A1: A1_A1,
    A2: A2,
    B2: B2,
    // C2: C2,
    G2: G2
};
