import { Point } from '@svgdotjs/svg.js';
import RootSystem2D, { Root } from '../logic/maths/2D/RootSystem';

export enum RootSystems2D{
    A1 = "A1",
    A1_A1 = "A1_A1",
    D2 = "D2",
    A2 = "A2",
    B2 = "B2",
    G2 = "G2",
    C2 = "C2"
}

const A1 = new RootSystem2D(
    RootSystems2D.A1,
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
const A1_A1 = new RootSystem2D(
    RootSystems2D.A1_A1,
    [1,2,2,1],
  [
    new Root({
      angle: 0,
      length: 1,
      isSimple: true,
    }),
    new Root({
      angle: Math.PI / 2,
      length: 1,
      isSimple: true,
    }),
  ],
  Math.PI / 2
);
const D2 = new RootSystem2D(
    RootSystems2D.D2,
    [1,2,2,1],
    [
      new Root({
        angle: Math.PI/4,
        length: 1,
        isSimple: true,
      }),
      new Root({
        angle: Math.PI / 2 + Math.PI/4,
        length: 1,
        isSimple: true,
      }),
    ],
    Math.PI / 2
  );
const A2 = new RootSystem2D(
    RootSystems2D.A2,
    [1,3,3,1],
  [
    new Root({
      angle: Math.PI / 2 + Math.PI/6,
      length: 1,
      isSimple: true,
    }),
    new Root({
      angle: Math.PI / 2 - Math.PI / 3+ Math.PI/6,
      length: 1,
      isSimple: false,
      isHighestRoot: true
    }),
    new Root({
      angle: Math.PI / 2 + Math.PI / 3 + Math.PI+ Math.PI/6,
      length: 1,
      isSimple: true,
    }),
  ],
  Math.PI / 3
);
const B2 = new RootSystem2D(
    RootSystems2D.B2,
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
const C2 = new RootSystem2D(
    RootSystems2D.C2,
    [1,4,4,1],
    [
      new Root({
        angle: 0,
        length: 1,
        isSimple: true,
      }),
      new Root({
        angle: Math.PI / 4,
        length: 1/Math.sqrt(2),
        isSimple: false,
        isHighestRoot: true
      }),
      new Root({
        angle: Math.PI / 2,
        length: 1,
        isSimple: false,
      }),
      new Root({
        angle: (3 * Math.PI) / 4,
        length: 1/Math.sqrt(2),
        isSimple: true,
      }),
    ],
    Math.PI / 4
  );
const G2 = new RootSystem2D(
    RootSystems2D.G2,
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
  A1_A1: A1_A1,
  A2: A2,
  B2: B2,
  C2: C2,
  G2: G2,
  D2: D2
}
