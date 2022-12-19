"use strict";
exports.__esModule = true;
exports.rootSystemsND = void 0;
var PointND_1 = require("../logic/maths/nD/PointND");
var rootSystems4DPoints = {
    // Only the positive roots of the specified root system
    A4: [
        [1140 / 721, -1 / 3970316, -2 / 3448195, 0],
        [570 / 721, 2718287 / 1985158, -2 / 3448195, 0],
        [-570 / 721, 5436575 / 3970316, 0, 0],
        [570 / 721, 1812191 / 3970316, 4451596 / 3448195, 0],
        [-570 / 721, 1032 / 2261, 4451598 / 3448195, 0],
        [0, -1603 / 1756, 4451598 / 3448195, 0],
        [570 / 721, 1812191 / 3970316, 1112898 / 3448195, 5 / 4],
        [-570 / 721, 1032 / 2261, 620 / 1921, 5 / 4],
        [0, -1603 / 1756, 620 / 1921, 5 / 4],
        [0, 0, -1738 / 1795, 5 / 4],
    ],
    B4: [
        [1, -1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, -1, 0],
        [1, 0, 1, 0],
        [1, 0, 0, -1],
        [1, 0, 0, 1],
        [0, 1, -1, 0],
        [0, 1, 1, 0],
        [0, 1, 0, -1],
        [0, 1, 0, 1],
        [0, 0, 1, -1],
        [0, 0, 1, 1],
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ],
    C4: [
        [1, 1, 0, 0],
        [1, 0, 1, 0],
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [0, 1, 0, 1],
        [0, 0, 1, 1],
        [1, -1, 0, 0],
        [1, 0, -1, 0],
        [0, 1, -1, 0],
        [1, 0, 0, -1],
        [0, 1, 0, -1],
        [0, 0, 1, -1],
        [2, 0, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 2, 0],
        [0, 0, 0, 2],
    ],
    D4: [
        [1, 1, 0, 0],
        [1, 0, 1, 0],
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [0, 1, 0, 1],
        [0, 0, 1, 1],
        [1, -1, 0, 0],
        [1, 0, -1, 0],
        [0, 1, -1, 0],
        [1, 0, 0, -1],
        [0, 1, 0, -1],
        [0, 0, 1, -1],
    ],
    F4: [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
        [1, 1, 0, 0],
        [1, 0, 1, 0],
        [1, 0, 0, 1],
        [0, 1, 1, 0],
        [0, 1, 0, 1],
        [0, 0, 1, 1],
        [1, -1, 0, 0],
        [1, 0, -1, 0],
        [1, 0, 0, -1],
        [0, 1, -1, 0],
        [0, 1, 0, -1],
        [0, 0, 1, -1],
        [1 / 2, 1 / 2, 1 / 2, 1 / 2],
        [1 / 2, 1 / 2, 1 / 2, -1 / 2],
        [1 / 2, 1 / 2, -1 / 2, 1 / 2],
        [1 / 2, 1 / 2, -1 / 2, -1 / 2],
        [1 / 2, -1 / 2, 1 / 2, 1 / 2],
        [1 / 2, -1 / 2, 1 / 2, -1 / 2],
        [1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [1 / 2, -1 / 2, -1 / 2, -1 / 2],
    ]
};
var rootSystems5DPoints = {
    A5: [
        [1055 / 681, 0, 0, -2 / 25979803, 0],
        [1055 / 1362, 915 / 682, 0, -2 / 25979803, 0],
        [-1055 / 1362, 915 / 682, 0, 0, 0],
        [1055 / 1362, 305 / 682, 721 / 570, -2 / 25979803, 0],
        [-1055 / 1362, 305 / 682, 721 / 570, 0, 0],
        [0, -305 / 341, 721 / 570, 0, 0],
        [1055 / 1362, 305 / 682, 721 / 2280, 31818631 / 25979803, 0],
        [-1055 / 1362, 305 / 682, 721 / 2280, 31818633 / 25979803, 0],
        [0, -305 / 341, 721 / 2280, 31818633 / 25979803, 0],
        [0, 0, -721 / 760, 31818633 / 25979803, 0],
        [1055 / 1362, 305 / 682, 721 / 2280, 6363725 / 25979803, 6 / 5],
        [-1055 / 1362, 305 / 682, 721 / 2280, 1273 / 5197, 6 / 5],
        [0, -305 / 341, 721 / 2280, 1273 / 5197, 6 / 5],
        [0, 0, -721 / 760, 1273 / 5197, 6 / 5],
        [0, 0, 0, -4898 / 4999, 6 / 5],
    ],
    B5: [
        [1, -1, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 0, -1, 0, 0],
        [1, 0, 1, 0, 0],
        [1, 0, 0, -1, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 0, -1],
        [1, 0, 0, 0, 1],
        [0, 1, -1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 0, -1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 0, -1],
        [0, 1, 0, 0, 1],
        [0, 0, 1, -1, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, -1],
        [0, 0, 1, 0, 1],
        [0, 0, 0, 1, -1],
        [0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1],
    ],
    C5: [
        [1, 1, 0, 0, 0],
        [1, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 0, 1],
        [0, 0, 1, 0, 1],
        [0, 0, 0, 1, 1],
        [1, -1, 0, 0, 0],
        [1, 0, -1, 0, 0],
        [0, 1, -1, 0, 0],
        [1, 0, 0, -1, 0],
        [0, 1, 0, -1, 0],
        [0, 0, 1, -1, 0],
        [1, 0, 0, 0, -1],
        [0, 1, 0, 0, -1],
        [0, 0, 1, 0, -1],
        [0, 0, 0, 1, -1],
        [2, 0, 0, 0, 0],
        [0, 2, 0, 0, 0],
        [0, 0, 2, 0, 0],
        [0, 0, 0, 2, 0],
        [0, 0, 0, 0, 2],
    ],
    D5: [
        [1, 1, 0, 0, 0],
        [1, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 0, 1],
        [0, 0, 1, 0, 1],
        [0, 0, 0, 1, 1],
        [1, -1, 0, 0, 0],
        [1, 0, -1, 0, 0],
        [0, 1, -1, 0, 0],
        [1, 0, 0, -1, 0],
        [0, 1, 0, -1, 0],
        [0, 0, 1, -1, 0],
        [1, 0, 0, 0, -1],
        [0, 1, 0, 0, -1],
        [0, 0, 1, 0, -1],
        [0, 0, 0, 1, -1],
    ]
};
var rootSystems6DPoints = {
    A6: [
        [333 / 218, 0, -1 / 2172002, 0, -1 / 971256, 0],
        [333 / 436, 2487 / 1880, -1 / 2172002, 0, -1 / 971256, 0],
        [-333 / 436, 2487 / 1880, 0, 0, 0, 0],
        [333 / 436, 829 / 1880, 1354481 / 1086001, 0, -1 / 971256, 0],
        [-333 / 436, 829 / 1880, 2708963 / 2172002, 0, 0, 0],
        [0, -829 / 940, 2708963 / 2172002, 0, 0, 0],
        [333 / 436, 829 / 1880, 338620 / 1086001, 2315 / 1917, -1 / 971256, 0],
        [-333 / 436, 829 / 1880, 729 / 2338, 2315 / 1917, 0, 0],
        [0, -829 / 940, 729 / 2338, 2315 / 1917, 0, 0],
        [0, 0, -869 / 929, 2315 / 1917, 0, 0],
        [333 / 436, 829 / 1880, 338620 / 1086001, 463 / 1917, 2873011 / 2428140, 0],
        [-333 / 436, 829 / 1880, 729 / 2338, 463 / 1917, 5746027 / 4856280, 0],
        [0, -829 / 940, 729 / 2338, 463 / 1917, 5746027 / 4856280, 0],
        [0, 0, -869 / 929, 463 / 1917, 5746027 / 4856280, 0],
        [0, 0, 0, -1852 / 1917, 5746027 / 4856280, 0],
        [
            333 / 436,
            829 / 1880,
            338620 / 1086001,
            463 / 1917,
            957667 / 4856280,
            7 / 6,
        ],
        [-333 / 436, 829 / 1880, 729 / 2338, 463 / 1917, 141 / 715, 7 / 6],
        [0, -829 / 940, 729 / 2338, 463 / 1917, 141 / 715, 7 / 6],
        [0, 0, -869 / 929, 463 / 1917, 141 / 715, 7 / 6],
        [0, 0, 0, -1852 / 1917, 141 / 715, 7 / 6],
        [0, 0, 0, 0, -6697 / 6792, 7 / 6],
    ],
    B6: [
        [1, -1, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0],
        [1, 0, -1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [1, 0, 0, -1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 0, -1, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, -1],
        [1, 0, 0, 0, 0, 1],
        [0, 1, -1, 0, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 1, 0, -1, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, -1, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, -1],
        [0, 1, 0, 0, 0, 1],
        [0, 0, 1, -1, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 1, 0, -1, 0],
        [0, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, -1],
        [0, 0, 1, 0, 0, 1],
        [0, 0, 0, 1, -1, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 0, -1],
        [0, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 1, -1],
        [0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 1],
    ],
    C6: [
        [1, 1, 0, 0, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [1, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 1, 0],
        [1, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 1],
        [0, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 1, 1],
        [1, -1, 0, 0, 0, 0],
        [1, 0, -1, 0, 0, 0],
        [0, 1, -1, 0, 0, 0],
        [1, 0, 0, -1, 0, 0],
        [0, 1, 0, -1, 0, 0],
        [0, 0, 1, -1, 0, 0],
        [1, 0, 0, 0, -1, 0],
        [0, 1, 0, 0, -1, 0],
        [0, 0, 1, 0, -1, 0],
        [0, 0, 0, 1, -1, 0],
        [1, 0, 0, 0, 0, -1],
        [0, 1, 0, 0, 0, -1],
        [0, 0, 1, 0, 0, -1],
        [0, 0, 0, 1, 0, -1],
        [0, 0, 0, 0, 1, -1],
        [2, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0],
        [0, 0, 2, 0, 0, 0],
        [0, 0, 0, 2, 0, 0],
        [0, 0, 0, 0, 2, 0],
        [0, 0, 0, 0, 0, 2],
    ],
    D6: [
        [1, 1, 0, 0, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [1, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 1, 0],
        [1, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 1],
        [0, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 1, 1],
        [1, -1, 0, 0, 0, 0],
        [1, 0, -1, 0, 0, 0],
        [0, 1, -1, 0, 0, 0],
        [1, 0, 0, -1, 0, 0],
        [0, 1, 0, -1, 0, 0],
        [0, 0, 1, -1, 0, 0],
        [1, 0, 0, 0, -1, 0],
        [0, 1, 0, 0, -1, 0],
        [0, 0, 1, 0, -1, 0],
        [0, 0, 0, 1, -1, 0],
        [1, 0, 0, 0, 0, -1],
        [0, 1, 0, 0, 0, -1],
        [0, 0, 1, 0, 0, -1],
        [0, 0, 0, 1, 0, -1],
        [0, 0, 0, 0, 1, -1],
    ],
    E6: [
        [1, 1, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [-1, 1, 0, 0, 0, 0, 0, 0],
        [-1, 0, 1, 0, 0, 0, 0, 0],
        [-1, 0, 0, 1, 0, 0, 0, 0],
        [-1, 0, 0, 0, 1, 0, 0, 0],
        [0, -1, 1, 0, 0, 0, 0, 0],
        [0, -1, 0, 1, 0, 0, 0, 0],
        [0, -1, 0, 0, 1, 0, 0, 0],
        [0, 0, -1, 1, 0, 0, 0, 0],
        [0, 0, -1, 0, 1, 0, 0, 0],
        [0, 0, 0, -1, 1, 0, 0, 0],
        [1 / 2, 1 / 2, 1 / 2, 1 / 2, 1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [1 / 2, 1 / 2, 1 / 2, -1 / 2, -1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [1 / 2, 1 / 2, -1 / 2, 1 / 2, -1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [1 / 2, 1 / 2, -1 / 2, -1 / 2, 1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [1 / 2, -1 / 2, 1 / 2, 1 / 2, -1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [1 / 2, -1 / 2, 1 / 2, -1 / 2, 1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [1 / 2, -1 / 2, -1 / 2, 1 / 2, 1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [1 / 2, -1 / 2, -1 / 2, -1 / 2, -1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [-1 / 2, 1 / 2, 1 / 2, 1 / 2, -1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [-1 / 2, 1 / 2, 1 / 2, -1 / 2, 1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [-1 / 2, 1 / 2, -1 / 2, 1 / 2, 1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [-1 / 2, 1 / 2, -1 / 2, -1 / 2, -1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [-1 / 2, -1 / 2, 1 / 2, 1 / 2, 1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [-1 / 2, -1 / 2, 1 / 2, -1 / 2, -1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [-1 / 2, -1 / 2, -1 / 2, 1 / 2, -1 / 2, -1 / 2, -1 / 2, 1 / 2],
        [-1 / 2, -1 / 2, -1 / 2, -1 / 2, 1 / 2, -1 / 2, -1 / 2, 1 / 2],
    ]
};
exports.rootSystemsND = {
    A4: rootSystems4DPoints.A4.map(function (p) { return new PointND_1["default"](p); }),
    B4: rootSystems4DPoints.B4.map(function (p) { return new PointND_1["default"](p); }),
    C4: rootSystems4DPoints.C4.map(function (p) { return new PointND_1["default"](p); }),
    D4: rootSystems4DPoints.D4.map(function (p) { return new PointND_1["default"](p); }),
    F4: rootSystems4DPoints.F4.map(function (p) { return new PointND_1["default"](p); }),
    A5: rootSystems5DPoints.A5.map(function (p) { return new PointND_1["default"](p); }),
    B5: rootSystems5DPoints.B5.map(function (p) { return new PointND_1["default"](p); }),
    C5: rootSystems5DPoints.C5.map(function (p) { return new PointND_1["default"](p); }),
    D5: rootSystems5DPoints.D5.map(function (p) { return new PointND_1["default"](p); }),
    A6: rootSystems6DPoints.A6.map(function (p) { return new PointND_1["default"](p); }),
    B6: rootSystems6DPoints.B6.map(function (p) { return new PointND_1["default"](p); }),
    C6: rootSystems6DPoints.C6.map(function (p) { return new PointND_1["default"](p); }),
    D6: rootSystems6DPoints.D6.map(function (p) { return new PointND_1["default"](p); }),
    E6: rootSystems6DPoints.E6.map(function (p) { return new PointND_1["default"](p); })
};