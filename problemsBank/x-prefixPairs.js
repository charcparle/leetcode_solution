/* 
Example

For strings = ["back", "backdoor", "gammon", "backgammon", "comeback", "come", "door"], the output should be solution(strings) = 3.

The relevant pairs are:

strings[0] = "back" and strings[1] = "backdoor".
strings[0] = "back" and strings[3] = "backgammon".
strings[4] = "comeback" and strings[5] = "come".
For strings = ["abc", "a", "a", "b", "ab", "ac"], the output should be solution(strings) = 8.

The relevant pairs are:

strings[0] = "abc" and strings[1] = "a".
strings[0] = "abc" and strings[2] = "a".
strings[0] = "abc" and strings[4] = "ab".
strings[1] = "a" and strings[2] = "a".
strings[1] = "a" and strings[4] = "ab".
strings[1] = "a" and strings[5] = "ac".
strings[2] = "a" and strings[4] = "ab".
strings[2] = "a" and strings[5] = "ac"
*/

const solution = (strings) => {
  let mem = {};
  for (let i = 0; i < strings.length; i++) {
    let str = strings[i];
    if (mem[str]) mem[str].push(i);
    else mem[str] = [i];
  }
  let pairs = {};
  let count = 0;
  for (let i = 0; i < strings.length; i++) {
    let str = strings[i];
    let subStr = "";
    for (let j = 1; j <= str.length; j++) {
      subStr = str.substring(0, j);
      if (mem[subStr]) {
        count = mem[subStr].length + count;
        for (let num of mem[subStr]) {
            // let key = []
          if (i !== num && !pairs[[Math.min(i, num), Math.max(i, num)]]) pairs[[Math.min(i, num), Math.max(i, num)]]=1;
        }
      }
    }
  }
//   const repeated = Object.keys(mem).filter((item) => mem[item] > 1);
  console.log(mem);
  console.log(pairs);
  return Object.keys(pairs).length
};
let test = ["abc", "a", "a", "b", "ab", "ac"];

console.log(solution(test));
