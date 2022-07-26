/* 
https://pvs-studio.com/en/blog/posts/0952/

Sort an array of strings such that A1A1, A1A2, ..A1B1.. A10A1 ... A11A1 ... Z12E5

Array members look like A1A1 , A1A2, ...A12B2 ... Z12E5

The expression pattern looks like this: [A-Z][0-9][0-9?][A-E][1-5]

Bonus points given for not writing your own sort. Use libraries.

*/

const solution = (input) => {
  input.sort((a, b) => {
      console.log(a,b)
      return a.charCodeAt(0)-b.charCodeAt(0)
  });
// input.sort()
  console.log(input[0].charCodeAt(0))
  console.log(input[3].charCodeAt(0))
  return input;
};

console.log(solution(["Z12E5", "Z12E4", "Z2E1", "A1B1", "A1A1", "A2B1", "A1B2"]));
// ["A1A1", "A1B1", "A1B2", "A2B1", "Z2E1", "Z12E4", "Z12E5"]
