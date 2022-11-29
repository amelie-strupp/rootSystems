import RootSystem3D, { Root3D } from "../logic/maths/3D/RootSystem3D"
import Point3D from "../logic/maths_objects/3D/Point3D"

export enum RootSystems3D{
    A3 = "A3",
    B3 = "B3",
    C3 = "C3",
    D3 = "D3"
}
const A3 = new RootSystem3D(
    RootSystems3D.A3,
    [1,3,2,3,1,3,2,3,1],
    [
        
        new Root3D({
            vector: new Point3D(
                0,1,-1
            ),
            isSimple: true,
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
                0,1,1
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
                1,1,0
            ),
            isSimple: false,
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
        1,3,2,3,1,3,2,3,1
    ],
    [
        new Root3D({
            vector: new Point3D(
                0,1,-1
            ),
            isSimple: true,
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
                0,1,1
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
                1,1,0
            ),
            isSimple: false,
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
    [1,4,2,4,1,3,2,3,1],
    [new Root3D({
                    vector: new Point3D(
                        0,0,1
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
                        1,-1,0
                    ),
                    isSimple: true,
                    }
                ),
                
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
    [1,4,2,4,1,3,2,3,1],
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
                0,1,-1
            ),
            isSimple: true,
            }
        ),
        new Root3D({
            vector: new Point3D(
                0,0,2
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
                
            ]
)
export const rootSystems3D = {
    A3: A3,
    B3: B3,
    C3: C3,
    D3: D3
}