/* 
The question is one of the challenges in the CodeSignal pratice assessment
Presented on 2022-05-28
I didn't finish this question
*/

/* 
Mine Sweeper, 
given a field and the coordinates of a cell being clicked, to return the field after clicked
Input - 
field: e.g.
[[false, true, true],
[true, false, false],
[true, true, false]]
where true indicates the presence of mine in that cell

x: row index (0-base)
y: col index (0-base)

If a cell remains concealed after the click, it should be given a value of -1
If there is no mine around the clicked cell, the value of neighbouring cells should be revealed too
*/

const solution = (field, x, y) => {
  let mem = {};
  // Assume all cells will remain concealed after the click
  let result = field;
  result = result.map((row) => row.map((cell) => -1));
  const countNearCell = (x, y) => {
    // The click will reveal the value at cell(x,y)
    result[x][y] = 0;
    // count the mines around cell (x,y)
    let nearbyCells = [];
    for (let i = x - 1; i <= x + 1; i++) {
      if (i >= 0 && i < field.length) {
        for (let j = y - 1; j <= y + 1; j++) {
          if (j >= 0 && j < field[i].length) {
            if (result[i][j] === -1) {
              nearbyCells.push([i, j]);
            } 
            if (field[i][j] === true){
                result[x][y] += 1;
            }
          }
        }
      }
    }
    // if cell(x,y) is 0, the neighbouring cells will be shown (as if being clicked)
    if (result[x][y] === 0) {
      for (let cell of nearbyCells) {
        countNearCell(cell[0], cell[1]);
      }
    }
  };
  countNearCell(x, y);
  // The neighbouring cells will show -1
  return result;
};

let test = [
  [false, true, true],
  [true, false, false],
  [true, true, false],
];
test = [
  [false, false, true, false],
  [false, false, false, true],
  [false, false, false, false],
];
console.log(solution(test, 2, 1));
