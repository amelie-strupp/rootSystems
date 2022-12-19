import { RootSystems2D } from 'src/app/data/rootSystems';
import { Matrix3, Vector3 } from 'three';
import Point from '../../maths_objects/2D/Point';
import MatrixND from '../nD/MatrixND';
import PointND from '../nD/PointND';
import { Hyperplane } from './Hyperplane';
import { WeylChamber } from './WeylChamber';
let classifyPoint = require('robust-point-in-polygon');
export class Root {
  angle: number;
  length: number;
  isSimple: boolean = false;
  isPositive: boolean = true;
  isHighestRoot: boolean = false;
  constructor(d: {
    angle: number;
    length: number;
    isSimple: boolean;
    isPositive?: boolean;
    isHighestRoot?: boolean;
  }) {
    this.angle = d.angle;
    this.length = d.length;
    this.isSimple = d.isSimple;
    this.isPositive = d.isPositive != null ? d.isPositive : true;
    this.isHighestRoot = d.isHighestRoot != null ? d.isHighestRoot : false;
  }
  equal(other: Root) {
    return other.getVector().equal(this.getVector());
  }
  getNegative() {
    return new Root({
      angle: this.angle + Math.PI,
      length: this.length,
      isSimple: false,
      isPositive: false,
    });
  }
  getVector() {
    return new Point(
      Math.cos(this.angle) * this.length,
      Math.sin(this.angle) * this.length
    );
  }
  getVectorUnderTransformation(matrix: Matrix3) {
    const vector = this.getVector();
    const vector3 = new Vector3(vector.x, vector.y, 0);
    const transformedVector = vector3.applyMatrix3(matrix);
    return new Point(transformedVector.x, transformedVector.y);
  }
  get name() {
    let vector = this.getVector();
    return `(${Math.round(vector.x)} ${Math.round(vector.y)})`;
  }
  getHyperplane() {
    return new Hyperplane(this.angle + Math.PI / 2);
  }

  getDual() {
    let vector = this.getVector();
    let dotProduct = vector.dot(vector);
    return new Point(
      (2 * vector.x * 1) / dotProduct,
      (2 * vector.y * 1) / dotProduct
    );
  }
}

export default class RootSystem2D {
  type: RootSystems2D;
  private _positiveRoots: Array<Root> = [];
  // The minimum angle occuring in this root system
  private _minimumAngle: number;
  weylGroup: Array<MatrixND> = [];
  orderOfWeylGroup: number = 0;
  fundamentalWeights: Array<Point> = [];
  coxeterMatrix: Array<number> = [];
  constructor(
    type: RootSystems2D,
    orderOfWeylGroup: number,
    weylGroup: Array<MatrixND>,
    fundamentalWeights: Array<Point>,
    coxeterMatrix: Array<number>,
    simpleRoots: Array<Root>,
    minimumAngle: number
  ) {
    this.type = type;
    this.orderOfWeylGroup = orderOfWeylGroup;
    this.coxeterMatrix = coxeterMatrix;
    this._positiveRoots = simpleRoots;
    this._minimumAngle = minimumAngle;
    this.weylGroup = weylGroup;
    this.fundamentalWeights = fundamentalWeights;
  }
  getAllRoots() {
    const allRoots = [...this._positiveRoots];
    this._positiveRoots.forEach((root: Root) => {
      allRoots.push(root.getNegative());
    });
    return allRoots;
  }
  getCoxeterMatrix() {
    return this.coxeterMatrix;
  }
  hasHighestRoot() {
    return this._positiveRoots.some((root) => root.isHighestRoot);
  }
  getHighestRoot() {
    return this._positiveRoots.find((root) => root.isHighestRoot);
  }
  getAffineReflectionBase() {
    if (this.hasHighestRoot()) {
      let highestRoot = this.getHighestRoot()!;
      let affineReflectionBase = [
        ...this.getBase().map((root) => {
          return { root: root, hyperplane: root.getHyperplane() };
        }),
        {
          root: highestRoot,
          hyperplane: highestRoot
            .getHyperplane()
            .moveBy(highestRoot.getVector()),
        },
      ];
      return affineReflectionBase;
    }
    return [
      ...this.getBase().map((root) => {
        return { root: root, hyperplane: root.getHyperplane() };
      }),
    ];
  }
  getWeightsToHighestWeight(highestWeight: PointND) {
    let weylGroup = this.weylGroup;

    let expandPoint = (p: PointND) => {
      let l = p.length();
      p = p.normalized().stretchedBy(l+0.4)

      return p
    }
    let convexHull = weylGroup.map((w) =>
      highestWeight.multiplyOnLeftWithMatrix(w)
    );
    let convexHullExpanded = weylGroup.map((w) =>
    expandPoint(highestWeight.multiplyOnLeftWithMatrix(w))
  );
    let less = (a: Point, b: Point) =>
    {
      let center = new Point(0,0)
        if (a.x - center.x >= 0 && b.x - center.x < 0)
            return true;
        if (a.x - center.x < 0 && b.x - center.x >= 0)
            return false;
        if (a.x - center.x == 0 && b.x - center.x == 0) {
            if (a.y - center.y >= 0 || b.y - center.y >= 0)
                return a.y > b.y;
            return b.y > a.y;
        }

        // compute the cross product of vectors (center -> a) x (center -> b)
        let det = (a.x - center.x) * (b.y - center.y) - (b.x - center.x) * (a.y - center.y);
        if (det < 0)
            return true;
        if (det > 0)
            return false;

        // points a and b are on the same line from the center
        // check which point is closer to the center
        let d1 = (a.x - center.x) * (a.x - center.x) + (a.y - center.y) * (a.y - center.y);
        let d2 = (b.x - center.x) * (b.x - center.x) + (b.y - center.y) * (b.y - center.y);
        return d1 > d2;
    }
    convexHullExpanded.sort((a,b) => less(new Point(a.get(0),a.get(1)), new Point(b.get(0),b.get(1))) ? 1 : -1)

    let convexHullCoordinates = convexHullExpanded.map((p) => p.components);

    let weights: Array<PointND> = [highestWeight];
    let rootPoints = this.getAllRoots().map(
      (r) => new PointND([r.getVector().x, r.getVector().y])
    );

    // console.log("rootPoints", rootPoints);
    // console.log("Convex Hull", convexHullCoordinates);
    const inConvexHull = (point: PointND) => {
      let classification = classifyPoint(
        convexHullCoordinates,
        point.components
      );
      return classification == 1 ? false : true;
    };
    function inside(point: Array<number>, vs: Array<Array<number>>) {
      // ray-casting algorithm based on
      // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

      var x = point[0], y = point[1];

      var inside = false;
      for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          var xi = vs[i][0], yi = vs[i][1];
          var xj = vs[j][0], yj = vs[j][1];

          var intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }

      return inside;
  };
    const rootTraversalAlgorithm = (currentElement: PointND, root: PointND) => {
      let newElement = currentElement.add(root);
      // console.log("In Hull: ", inConvexHull(newElement));
      // console.log("New element", newElement)
      let inArray = weights.filter((w) => w.equal(newElement));

      if (inArray.length<=2 && inConvexHull(newElement)) {
        // console.log(newElement);
        weights.push(newElement);
        for (let root of rootPoints) {
          rootTraversalAlgorithm(newElement, root);
        }
      }
      return;
    };

    for (let root of rootPoints) rootTraversalAlgorithm(highestWeight, root);
    return [...convexHull, ...weights];
  }

  getHyperplanes() {
    const hyperplanes: Array<Hyperplane> = [];
    for (let root of this._positiveRoots) {
      hyperplanes.push(new Hyperplane(root.angle + Math.PI / 2));
    }
    hyperplanes.sort((a, b) => {
      if (a.angle < b.angle) {
        return -1;
      } else if (a.angle === b.angle) {
        return 0;
      }
      return 1;
    });
    return hyperplanes;
  }
  getPositiveRoots() {
    return this._positiveRoots;
  }
  getAllWeylChambers() {
    const weylChambers: Array<WeylChamber> = [];
    const hyperplanes = this.getHyperplanes();
    for (let hyperplane of hyperplanes) {
      // Add two weyl chambers - one for every side of the hyperplane
      const weylChamber1 = new WeylChamber(
        hyperplane.angle,
        this._minimumAngle
      );
      const weylChamber2 = new WeylChamber(
        hyperplane.angle + Math.PI,
        this._minimumAngle
      );
      weylChambers.push(weylChamber1);
      weylChambers.push(weylChamber2);
    }
    console.log(weylChambers);
    weylChambers.sort((a, b) => {
      if (a.startAngle < b.startAngle) {
        return -1;
      } else if (a.startAngle === b.startAngle) {
        return 0;
      }
      return 1;
    });
    return weylChambers;
  }
  getFundamentalWeylChamber(): WeylChamber {
    const fundamentalWeylChamber = this.getAllWeylChambers().filter(
      (chamber) => {
        let base = this.getBase();
        let nonNegativeDotProductToEveryBaseVector = base.every(
          (baseElement) => {
            return (
              baseElement.getVector().dot(chamber.getStartBoundingVector()) >=
              -0.01
            );
          }
        );
        return nonNegativeDotProductToEveryBaseVector;
      }
    );
    return fundamentalWeylChamber[0];
  }

  getBase() {
    return this.getPositiveRoots().filter((root) => root.isSimple);
  }
  getLengthOfTransformation(transformation: Matrix3) {
    let positiveRoots = this.getPositiveRoots();
    let transformedVectors = positiveRoots.map((root) => {
      return root.getVectorUnderTransformation(transformation);
    });
    const rootsThatChangedToNegative = transformedVectors.filter(
      (transformedVector) =>
        positiveRoots.every(
          (root) => !root.getVector().equal(transformedVector)
        )
    );
    return rootsThatChangedToNegative.length;
  }
}
