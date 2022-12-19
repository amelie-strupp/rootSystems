import RootSystem2D, { Root } from '../logic/maths/2D/RootSystem';
import MatrixND from '../logic/maths/nD/MatrixND';
import Point from '../logic/maths_objects/2D/Point';

export enum RootSystems2D{
    A1 = "A1",
    // A1_A1 = "A1_A1",
    // D2 = "D2",
    A2 = "A2",
    B2 = "B2",
    G2 = "G2",
    // C2 = "C2"
}

const A1 = new RootSystem2D(
    RootSystems2D.A1,

    2,
    [
    new MatrixND([
      [1, 0],
      [0, 1]]),
      new MatrixND([
        [-1, 0],
        [0, 1]]),
    ],
    [new Point(1,0)],
    [1],

  [
    new Root({
      angle: 0,
      length: 1,
      isSimple: true,
    }),
  ],
  Math.PI
);
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
const A2 = new RootSystem2D(
    RootSystems2D.A2,
    6,
    [new MatrixND([
      [1, 0],
      [0, 1],
    ]),
    new MatrixND([
      [-1, 0],
      [0, 1],
    ]),
    new MatrixND([
      [0.5,  0.86602539 ],
      [0.86602539, -0.5],
    ]),
    new MatrixND([
      [ 0.5 ,  -0.8660254],
      [-0.8660254,-0.5],
    ]),
    new MatrixND([
      [ 0.5 ,  -0.8660254  	],
      [-0.8660254,-0.5],
    ]).multiply(new MatrixND([
      [0.5,  0.86602539 ],
      [0.86602539, -0.5],
    ])),
    new MatrixND([
      [-1, 0],
      [0, 1],
    ]).multiply(new MatrixND([
      [0.5,  0.86602539 ],
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
  [new Point(0, 0.58), new Point(-0.8660254037844388, -0.4999999999999997).normalized().multiply(0.575)],

    [1,3,3,1],
  [
    new Root({
      angle: Math.PI / 2 + Math.PI/6,
      length: 1,
      isSimple: true,
    }),

    new Root({
      angle: Math.PI / 2 + Math.PI / 3 + Math.PI+ Math.PI/6,
      length: 1,
      isSimple: true,
    }),
    new Root({
      angle: Math.PI / 2 - Math.PI / 3+ Math.PI/6,
      length: 1,
      isSimple: false,
      isHighestRoot: true
    }),
  ],
  Math.PI / 3
);
const B2 = new RootSystem2D(
    RootSystems2D.B2,
    8,
    [new MatrixND([
      [1, 0],
      [0, 1],
    ]),
    new MatrixND([
      [0, -1],
      [-1, 0],
    ]),
    new MatrixND([
      [1, 0],
      [0, -1],
    ]),
    new MatrixND([
      [0, 1],
      [-1, 0],
    ]),
    new MatrixND([
      [0, 1],
      [1, 0],
    ]),
    new MatrixND([
      [-1, 0],
      [0, -1],
    ]),
    new MatrixND([
      [0, -1],
      [1, 0],
    ]),
    new MatrixND([
      [-1, 0],
      [0, 1],
    ]),
  ],
  [new Point(1, 0), new Point(1/2, 1/2)],

    [1,4,4,1],
    [
      new Root({
        angle: 0,
        length: 1,
        isSimple: true,
      }),
      new Root({
        angle: Math.PI / 4,
        length: Math.sqrt(2),
        isSimple: false,

      }),
      new Root({
        angle: Math.PI / 2,
        length: 1,
        isSimple: false,
        isHighestRoot: true
      }),
      new Root({
        angle: (3 * Math.PI) / 4,
        length: Math.sqrt(2),
        isSimple: true,
      }),
    ],
    Math.PI / 4
  );
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
const G2 = new RootSystem2D(
    RootSystems2D.G2,
    12,
    [
      new MatrixND([[-1,0], [0,1]]),
      new MatrixND([[-0.5, -0.8660254], [ -0.8660254 ,0.5]]),
      new MatrixND([[0.5, -0.8660254], [ -0.8660254 ,-0.5]]),
      new MatrixND([[1, 0], [0,-1]]),
      new MatrixND([[0.5, 0.8660254], [ 0.8660254 ,-0.5]]),
      new MatrixND([[-0.5, 0.8660254], [ 0.8660254 ,0.5]]),

    ],
    [new Point(0, 989/571), new Point(0.5, 0.8660254)],
    [1,6,6,1],
    [
    new Root({
        angle: 0,
        length: 1,
        isSimple: true,
      }),
    new Root({
        angle: Math.PI/6,
        length: Math.sqrt(3),
        isSimple: false,
    }),
    new Root({
        angle: 2*Math.PI/6,
        length: 1,
        isSimple: false,
        isHighestRoot: true
    }),
    new Root({
        angle: Math.PI/2,
        length: Math.sqrt(3),
        isSimple: false,
    }),
    new Root({
        angle: Math.PI/6 + Math.PI/2,
        length: 1,
        isSimple: false,
    }),
    new Root({
        angle: 2*Math.PI/6 + Math.PI/2,
        length: Math.sqrt(3),
        isSimple: true,
    }),
],
Math.PI/6)
export const rootSystems = {
  A1: A1,
  // A1_A1: A1_A1,
  A2: A2,
  B2: B2,
  // C2: C2,
  G2: G2,
  // D2: D2
}
