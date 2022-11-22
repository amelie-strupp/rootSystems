import RootSystem3D, { Root3D } from "../logic/maths/3D/RootSystem3D"
import Point3D from "../logic/maths_objects/3D/Point3D"

export enum RootSystems3D{
    A3 = "A3",
    B3 = "B3",
    C3 = "C3",
    D3 = "D3"
}
// const A3 = new RootSystem3D(
//     RootSystems3D.A3,
//     [
//         new Root3D({
//             direction: new Point3D(1,-1,0),
//             length: 1,
//             isSimple: true,
//             }
//         ),
//         new Root3D({
//             direction: new Point3D(0,1,-1),
//             length: 1,
//             isSimple: true,
//             }
//         ),
//         new Root3D({
//             direction: new Point3D(0,1,1),
//             length: 1,
//             isSimple: true,
//             }
//         ),

//     ]

// )
// const B3 = new RootSystem3D(
//     RootSystems3D.A3,
//     [
//         new Root3D({
//             direction: new Point3D(0,0,1),
//             length: 1,
//             isSimple: true,
//             }
//         ),
//         new Root3D({
//             direction: new Point3D(
//                 0,
//                 Math.sin((135/360)*Math.PI*2),
//                 Math.cos((135/360)*Math.PI*2)),
//             length: 1/Math.sqrt(2),
//             isSimple: true,
//             }
//         ),
//         new Root3D({
//             direction: new Point3D(Math.sin((240/360)*Math.PI*2),0,Math.cos((240/360)*Math.PI*2)),
//             length: 1,
//             isSimple: true,
//             }
//         ),

//     ]

// )
const A3 = new RootSystem3D(
    RootSystems3D.A3,
    [
        new Root3D({
            vector: new Point3D(
                1,-1,0
            ),
            isSimple: true,
            }
        ),
        new Root3D({
            vector: new Point3D(
                1,0,-1
            ),
            isSimple: false,
            }
        ),
        new Root3D({
            vector: new Point3D(
                0,1,-1
            ),
            isSimple: true,
            }
        ),
        new Root3D({
            vector: new Point3D(
                1,1,0
            ),
            isSimple: false,
            }
        ),
        new Root3D({
            vector: new Point3D(
                0,1,1
            ),
            isSimple: true,
            }
        ),
        new Root3D({
            vector: new Point3D(
                1,0,1
            ),
            isSimple: false,
            }
        ),
    ]
)
const D3 = new RootSystem3D(
    RootSystems3D.D3,
    [
        new Root3D({
            vector: new Point3D(
                1,-1,0
            ),
            isSimple: true,
            }
        ),
        new Root3D({
            vector: new Point3D(
                1,0,-1
            ),
            isSimple: false,
            }
        ),
        new Root3D({
            vector: new Point3D(
                0,1,-1
            ),
            isSimple: true,
            }
        ),
        new Root3D({
            vector: new Point3D(
                1,1,0
            ),
            isSimple: false,
            }
        ),
        new Root3D({
            vector: new Point3D(
                0,1,1
            ),
            isSimple: true,
            }
        ),
        new Root3D({
            vector: new Point3D(
                1,0,1
            ),
            isSimple: false,
            }
        ),
    ]
)

const B3 = new RootSystem3D(
    RootSystems3D.B3,
    [
                new Root3D({
                    vector: new Point3D(
                        1,0,0
                    ),
                    isSimple: false,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        0,1,0
                    ),
                    isSimple: false,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        0,0,1
                    ),
                    isSimple: true,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        1,1,0
                    ),
                    isSimple: false,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        0,1,1
                    ),
                    isSimple: false,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        1,-1,0
                    ),
                    isSimple: true,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        0,1,-1
                    ),
                    isSimple: true,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        1,0,1
                    ),
                    isSimple: false,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        1,0,-1
                    ),
                    isSimple: false,
                    }
                ),
            ]
)

const C3 = new RootSystem3D(
    RootSystems3D.C3,
    [

                new Root3D({
                    vector: new Point3D(
                        1,1,0
                    ),
                    isSimple: false,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        0,1,1
                    ),
                    isSimple: false,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        1,-1,0
                    ),
                    isSimple: true,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        0,1,-1
                    ),
                    isSimple: true,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        1,0,1
                    ),
                    isSimple: false,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        1,0,-1
                    ),
                    isSimple: false,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        2,0,0
                    ),
                    isSimple: false,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        0,2,0
                    ),
                    isSimple: false,
                    }
                ),
                new Root3D({
                    vector: new Point3D(
                        0,0,2
                    ),
                    isSimple: true,
                    }
                ),
            ]
)
export const rootSystems3D = {
    A3: A3,
    B3: B3,
    C3: C3,
    D3: D3
}