/* 
Given a 2-D Integer Array `area`, find the fewest steps to travel from top left to the cell labelled '9'
Some cells are not accessible (no roads) and are labelled as '0'
Other celles are labelled as '1'
This is a simulation of an Amazon delivery truck sending goods to the destination.
*/

/* 
This problem is presented as one of the questions in the Online Assessment for SDE role in Amazon 
(attempted on 2022-08-10)
Tried recursive approach with memoization but failed at exceeding call stack
because the first approach will loop between steps forever.
*/

/* 
Input: 2-D Integer Array `area`
Output: Integer (no. of steps)
*/

const pathSteps = (area) => {
  let done = false;
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  let dist = new Array(area.length).fill(Array(area[0].length))
  console.log(dist)
  let cur = [0, 0];
  let mem = { [cur]: 0 };
  let checked = {}
  let next = []
  while (!done) {
    console.log(`cur: ${cur}`)
    if (!(cur in checked)){
        for (let dir of dirs) {
            const [dR,dC]=dir
            const adj = [cur[0]+dR, cur[1]+dC]
            const [r,c] = adj
            if (r>=0 && r<area.length && c>=0 && c<area[0].length) {
                if (!(adj in checked)){
                    if (!(adj in mem)) mem[adj]=Infinity
                    console.log(`pre-check mem[adj] (${adj}): ${mem[adj]}`)
                    if (area[r][c]!==0) {
                        mem[adj] = Math.min(mem[adj],mem[cur]+1)
                    }else {
                        mem[adj]=Infinity
                    }
                    console.log(`post-check mem[adj] (${adj}): ${mem[adj]}`)
                    next.push(adj)
                }
            }
            console.log(next)
        }
        checked[cur]=1
        if (area[cur[0]][cur[1]] === 9) done = true;
        else cur = next.shift()
    }
    console.log(checked)
    console.log(mem)
  }
  return mem[cur]
};

const area = [
  [1, 0, 9],
  [1, 1, 1],
  [1, 0, 1],
];

console.log(pathSteps(area))
