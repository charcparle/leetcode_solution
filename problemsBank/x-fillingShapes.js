/* 
Defined set of shapes, like tetris, of type x, y, z...

Given a canvas of size n*m, and an array figures=[x,y,z..]
Return the resultant canvas with all the shapes placed in the order of figures
*/

/* 
1: @
2: @@@
3: @@
   @@
4: @
   @@
   @
5:  @ 
   @@@
*/

const solution = (n, m, figures) => {
  const shape = (n, v) => {
    switch (n) {
      case 1:
        return [[v]];
      case 2:
        return [[v, v, v]];
      case 3:
        return [
          [v, v],
          [v, v],
        ];
      case 4:
        return [
          [v, 0],
          [v, v],
          [v, 0],
        ];
      case 5:
        return [
          [0, v, 0],
          [v, v, v],
        ];
      default:
        return [error];
    }
  };
  const checkOK = (row, col, shapeNum, order) => {
    const shapeArr = shape(shapeNum, order);
    for (let i = 0; i < shapeArr.length; i++) {
      if (row + i >= result.length) return false;
      for (let j = 0; j < shapeArr[i].length; j++) {
        if (col + j >= result[i].length) return false;
        if (result[row + i][col + j] !== 0 && shapeArr[i][j] !== 0)
          return false;
      }
    }
    for (let i = 0; i < shapeArr.length; i++) {
      for (let j = 0; j < shapeArr[i].length; j++) {
        result[row + i][col + j] += shapeArr[i][j];
      }
    }
    return true;
  };
  const placeShape = (shapeNum, order) => {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (checkOK(i, j, shapeNum, order)) return;
      }
    }
    console.log(`Error - cannot place shape ${shapeNum} at no.${order}`);
    return;
  };
  const printCanvas = (arr) => {
    for (let row of arr) {
      let line = "";
      for (let cell of row) {
        line =
          line +
          "(" +
          cell.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }) +
          ")";
      }
      console.log(line);
    }
  };
  // Initialize the canvas
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push([]);
    for (let j = 0; j < m; j++) {
      result[i].push(0);
    }
  }

  for (let order = 1; order <= figures.length; order++) {
    placeShape(figures[order - 1], order);
  }
  printCanvas(result);
  return result;
};

const n = 4,
  m = 7;
let test = [4, 4, 5, 1, 2, 5, 1, 1, 1, 1];

console.log(solution(n, m, test));
