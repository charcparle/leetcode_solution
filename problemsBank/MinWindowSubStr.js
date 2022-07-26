/* 
https://coderbyte.com/results/charcparle:Min%20Window%20Substring:JavaScript
Min Window Substring
Have the function MinWindowSubstring(strArr) take the array of strings stored in strArr, which will contain only two strings, the first parameter being the string N and the second parameter being a string K of some characters, and your goal is to determine the smallest substring of N that contains all the characters in K. For example: if strArr is ["aaabaaddae", "aed"] then the smallest substring of N that contains the characters a, e, and d is "dae" located at the end of the string. So for this example your program should return the string dae.

Another example: if strArr is ["aabdccdbcacd", "aad"] then the smallest substring of N that contains all of the characters in K is "aabd" which is located at the beginning of the string. Both parameters will be strings ranging in length from 1 to 50 characters and all of K's characters will exist somewhere in the string N. Both strings will only contains lowercase alphabetic characters.

*/

/* 
1. For input ["aabdccdbcacd", "aad"] the output was incorrect. The correct output is aabd

2. For input ["aaffsfsfasfasfasfasfasfacasfafe", "fafsf"] the output was incorrect. The correct output is affsf

3. For input ["vvavereveaevafefaef", "vvev"] the output was incorrect. The correct output is vvave
*/

/* const MinWindowSubstring=(strArr)=> {
  // code goes here
  // string K can contain repeated characters
  // Build hash table of string K characters key=char, val=count
  const memK = {};
  for (let k of strArr[1].split("")) {
    if (k in memK) memK[k] += 1;
    else memK[k] = 1;
  }
  // Build hash table of string N
  const memN = {};
  for (let n of strArr[0].split("")) {
    if (n in memN) memN[n] += 1;
    else memN[n] = 1;
  }
  // left pointer moving rightwards - reduce character count,
  // if reduced to below hash K value, then stop at previous
  // right pointer moving leftwards - reduce character count,
  // if reduced to below hash K value, then stop at previous

  // return the substring starting with left pointer and ending at right pointer
  const ArrN = strArr[0].split("");
  let left = 0;
  let right = ArrN.length - 1;
  let foundLeft = (foundRight = null);

  while (foundLeft === null || foundRight === null) {
    if (memN[ArrN[left]] - 1 < memK[ArrN[left]]) {
      foundLeft = left;
    } else {
      memN[ArrN[left]] -= 1;
      left++;
    }
    if (memN[ArrN[right]] - 1 < memK[ArrN[right]]) {
      foundRight = right;
    } else {
      memN[ArrN[right]] -= 1;
      right--;
    }
  }

  return strArr[0].substring(foundLeft, foundRight + 1);
} */

/* const MinWindowSubstring = (strArr) => {
  // code goes here
  // string K can contain repeated characters
  // Build hash table of string K characters key=char, val=count
  let memK = {};
  for (let k of strArr[1].split("")) {
    if (k in memK) memK[k] += 1;
    else memK[k] = 1;
  }
  const arrK = Object.keys(memK);

  // Build hash table of string N
  let memN = {};
  for (let n of strArr[0].split("")) {
    if (n in memN) memN[n] += 1;
    else memN[n] = 1;
  }

  let hash = {};

  // Recursive approach:
  // For given string N, check leftSubstr and rightSubstr
  // return the shorter string of leftSubStr and rightSubStr
  // if both are null, return string N
  const checkSubstring = (str, strMem) => {
    if (str in hash) return hash[str];
    if (str.length < strArr[1].length) {
      hash[str] = null;
      return null;
    }
    for (let k of arrK) {
      if (k in strMem) {
        if (strMem[k] - memK[k] < 0) {
          hash[str] = null;
          return null;
        }
      } else {
        hash[str] = null;
        return null;
      }
    }
    // console.log(`str ${str} itself not null`);
    // console.log(strMem);
    const leftSubstr = checkSubstring(str.substring(0, str.length - 1), {
      ...strMem,
      [str[str.length - 1]]: strMem[str[str.length - 1]] - 1,
    });
    const rightSubstr = checkSubstring(str.substring(1), {
      ...strMem,
      [str[0]]: strMem[str[0]] - 1,
    });
    if (leftSubstr === null && rightSubstr === null) {
      hash[str] = str;
      return str;
    } else if (leftSubstr === null) {
      hash[str] = rightSubstr;
      return rightSubstr;
    } else if (rightSubstr === null) {
      hash[str] = leftSubstr;
      return leftSubstr;
    } else {
      hash[str] =
        leftSubstr.length <= rightSubstr.length ? leftSubstr : rightSubstr;
      return leftSubstr.length <= rightSubstr.length ? leftSubstr : rightSubstr;
    }
  };

  return checkSubstring(strArr[0], memN);
}; */

const MinWindowSubstring = (strArr) => {
  // code goes here
  // string K can contain repeated characters
  // Build hash table of string K characters key=char, val=count
  let memK = {};
  for (let k of strArr[1].split("")) {
    if (k in memK) memK[k] += 1;
    else memK[k] = 1;
  }
  console.log(memK)
  const arrK = Object.keys(memK);

  // Build hash table of string N
  let memN = {};
  // for (let n of strArr[0].split("")) {
  //   if (n in memN) memN[n] += 1;
  //   else memN[n] = 1;
  // }

  let hash = {};

  // Pointer approach:
  // Loop through String N - if stringN[i] hits memK, the corresponding count of key in memK decreases
  let bingoIdx = [];
  let left = "";
  let countdown = strArr[1].length;
  let min = strArr[0]
  const arrN = strArr[0].split("");
  for (let i = 0; i < arrN.length; i++) {
    if (arrN[i] in memK) {
      // The earliest hit is saved as "left", the index of character hitting memK to be saved as an array "bingoIdx", countdown decreases
      if (bingoIdx.length === 0) {
        left = arrN[i];
      }
      bingoIdx = [...bingoIdx, i];
      if (memK[arrN[i]] >= 1) {
        memK[arrN[i]] -= 1;
        countdown -=1
        // bingoIdx = [...bingoIdx, i];
      } else if (arrN[i] === left) {
        // If the corresponding count at memK becomes zero but there's another hit, it should remain zero, index still saved to bingoIdx, countdown remains unchanged
        //  but if that coincides with "left", "left" should be updated as the next element in "bingoIdx"
        bingoIdx.shift();
        left = arrN[bingoIdx[0]];
        // bingoIdx = [...bingoIdx, i];
      }
      // console.log(left)
    }
    console.log(bingoIdx)
    if (countdown===0){
      if(min.length>strArr[0].substring(bingoIdx[0],i+1).length){
        min = strArr[0].substring(bingoIdx[0],i+1)
      } 
    }
    console.log(min)
  }
  // the rolling "min window" is defined by "left" and the last hit when countdown is zero

  return min
};

console.log(MinWindowSubstring(["aabdccdbcacd", "aad"])); //aabd
console.log(MinWindowSubstring(["aaffsfsfasfasfasfasfasfacasfafe", "fafsf"])); //affsf
console.log(MinWindowSubstring(["vvavereveaevafefaef", "vvev"])); //vvave
console.log(MinWindowSubstring(["abcccccccddddab", "dab"])); //dab
console.log(MinWindowSubstring(["abcccccccdbbbac", "dab"])); //dbbba
