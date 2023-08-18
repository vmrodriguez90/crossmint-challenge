
const MatrixUtils = {
    generateCharacterMatrix(size) {
        const matrix = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push("SPACE");
            }
            matrix.push(row);
        }
        return matrix;
    },
    getMatrixPadding: (matrix) => {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if(matrix[i][j] !== "SPACE") {
                    return i;
                }
            }
        }
        return -1;
    },
    getDiagonalIndexes: (matrixSize, padding = 0) => {
        const reducedMatrixSize = matrixSize - 2 * padding;
        const result = MatrixUtils.calculateMatrixDiagonals(reducedMatrixSize);
        return {
            mainDiagonal: result.mainDiagonal.map((xy) => xy.map((v) => v + padding)),
            secondaryDiagonal: result.secondaryDiagonal.map((xy) => xy.map((v) => v + padding))
        }
    },
    calculateMatrixDiagonals:(matrixSize) => {
        const mainDiagonal = [];
        const secondaryDiagonal = [];
    
        for (let i = 0; i < matrixSize; i++) {
            mainDiagonal.push([i, i]);
            secondaryDiagonal.push([i, matrixSize - i - 1]);
        }
    
        return {
            mainDiagonal,
            secondaryDiagonal,
        };
    },
    FIRST_CHALLENGE: JSON.parse(process.env.REACT_APP_FIRST_CHALLENGE) || [],
    SECOND_CHALLENGE: JSON.parse(process.env.REACT_APP_SECOND_CHALLENGE) || [],
};

export default MatrixUtils;