import * as math from "mathjs";

export default class MatrixND{
    components: Array<Array<number>> = [];
    constructor(components: Array<Array<number>>){
        this.components = components;
    }
    static identity(dim: number){
        let components: Array<Array<number>> = [];
        for(let i = 0; i < dim; ++i){
            let column = [];
            for(let j = 0; j < dim; ++j){
                if(j == i){
                    column.push(1)
                }
                else{
                    column.push(0);
                }
            }
            components.push(column);
        }
        return new MatrixND(components)
    }
    invert(){
      return new MatrixND(math.inv(this.components));
    }
    multiply(other: MatrixND) {
        let a = this.components
        let b = other.components;
        let aNumRows = a.length, aNumCols = a[0].length
        let bNumRows = b.length, bNumCols = b[0].length,
        m = new Array(aNumRows);  // initialize array of rows
        for (var r = 0; r < aNumRows; ++r) {
          m[r] = new Array(bNumCols); // initialize the current row
          for (var c = 0; c < bNumCols; ++c) {
            m[r][c] = 0;             // initialize the current cell
            for (var i = 0; i < aNumCols; ++i) {
              m[r][c] += a[r][i] * b[i][c];
            }
          }
        }
        return new MatrixND(m);
      }
    add(other: MatrixND){
        let newComponents: Array<Array<number>> = [];
        let rowIndex = 0;
        let columnIndex = 0;
        for(let row of this.components){
            let column = [];
            for(let element of row){
                column.push(element + other.components[rowIndex][columnIndex])
                columnIndex += 1;
            }
            newComponents.push(column);
            rowIndex+= 1;
            columnIndex = 0;
        }
        return new MatrixND(newComponents);
    }
    scalarMultiply(scalar: number){
        let newComponents: Array<Array<number>> = [];
        let rowIndex = 0;
        let columnIndex = 0;
        for(let row of this.components){
            let column = [];
            for(let element of row){
                column.push(element * scalar )
                columnIndex += 1;
            }
            newComponents.push(column);
            rowIndex+= 1;
            columnIndex = 0;
        }
        return new MatrixND(newComponents)
    }
    transpose(){
        let numberOfRows = this.components.length;
        let numberOfColumns = this.components[0].length;
        let newMatrixComponents: Array<Array<number>> = [];
        for(let i = 0; i < numberOfColumns; i++){
            newMatrixComponents.push([]);
        }

        for(let i = 0; i < numberOfColumns; i++){
            for(let j = 0; j < numberOfRows; j++){
                newMatrixComponents[i].push(this.components[j][i])
            }
        }
        return new MatrixND(newMatrixComponents);
    }
    static basicRotationMatrix(dim: number, base1: number, base2: number, angle: number){
        let identity = MatrixND.identity(dim);
        identity.components[base1][base1] = Math.cos(angle)
        identity.components[base2][base1] = -Math.sin(angle)
        identity.components[base2][base2] = Math.cos(angle)
        identity.components[base1][base2] = Math.sin(angle);
        return identity;
    }
}
