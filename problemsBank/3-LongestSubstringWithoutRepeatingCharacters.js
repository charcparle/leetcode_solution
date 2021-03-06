// https://leetcode.com/problems/longest-substring-without-repeating-characters/
/**
 * @param {string} s; 0 <= s.length <= 5 * 104
 * @return {number}
 */

// s = "abcabcbb" => abc (3)
// s = "bbbbb" => b (1)
// s = "pwwbbew" => wke (3)
// Passed: 150ms, 50MB used. 3 May 2022
var lengthOfLongestSubstring = function (s) {
  let currentBank = {};
  let currentSubStr = "";
  let longest = "";
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    if (currentBank[s[i]] === undefined || currentBank[s[i]] === null) {
      currentBank[s[i]] = i;
      if (currentSubStr.length == 0) {
        start = i;
      }
      currentSubStr = currentSubStr.concat(s[i]);
      console.log(`new char added, currentSubStr: ${currentSubStr}`);
    } else if (currentBank[s[i]] >= 0) {
      console.log(`repeated! currentSubStr: ${currentSubStr}, ${s[i]}`);
      console.log(`start: ${start}`);
      // Extract the substring from currentSubStr
      // Cut from 0 to x, where x=index of repeated char in currentSubStr = currentBank[s[i]]-start
      let removed = currentSubStr.slice(0, currentBank[s[i]] - start + 1);
      console.log(`removed: ${removed}`);
      currentSubStr = currentSubStr
        .slice(currentBank[s[i]] - start + 1)
        .concat(s[i]);
      for (let j = 0; j < removed.length; j++) {
        currentBank[removed[j]] = null;
      }
      currentBank[s[i]] = i;
      start = currentBank[currentSubStr[0]];
      console.log(`trimmed, currentSubStr: ${currentSubStr}`);
    } else {
      console.log(`odd case: ${i}, ${s[i]}`);
      console.log(i, currentBank, currentSubStr);
    }
    if (currentSubStr.length > longest.length) {
      longest = currentSubStr;
    }
  }
  console.log(currentBank);
  console.log(`longest = ${longest}, (${longest.length})`);
  return longest.length;
};

// alternative approach:
// Compare starting index of currentSubStr to determine whether the current char exists in currentSubStr
// Passed: 180ms, 52MB used, 3 May 2022
var lengthOfLongestSubstring2 = function (s) {
  let bank = {};
  let currentSubStr = "";
  let longest = "";
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    if (bank[s[i]] === undefined || bank[s[i]] === null || bank[s[i]] < start) {
      bank[s[i]] = i;
      if (currentSubStr.length == 0) {
        start = i;
      }
      currentSubStr = currentSubStr.concat(s[i]);
      console.log(`new char added, currentSubStr: ${currentSubStr}`);
    } else if (bank[s[i]] >= start) {
      console.log(`repeated! currentSubStr: ${currentSubStr}, ${s[i]}`);
      console.log(`start: ${start}`);
      // Extract the substring from currentSubStr
      // Cut from 0 to x, where x=index of repeated char in currentSubStr = currentBank[s[i]]-start
      let removed = currentSubStr.slice(0, bank[s[i]] - start + 1);
      console.log(`removed: ${removed}`);
      currentSubStr = currentSubStr.slice(bank[s[i]] - start + 1).concat(s[i]);

      bank[s[i]] = i;
      start = bank[currentSubStr[0]];
      console.log(`trimmed, currentSubStr: ${currentSubStr}`);
    } else {
      console.log(`odd case: ${i}, ${s[i]}`);
      console.log(i, bank, currentSubStr);
    }
    if (currentSubStr.length > longest.length) {
      longest = currentSubStr;
    }
  }
  console.log(bank);
  console.log(`longest = ${longest}, (${longest.length})`);
  return longest.length;
};
let testStr = "pwwwkewp";
// testStr = "pwwwwpppkkkeee234356ppwaksivpwrng468011kkscikaaa";
// testStr = "aabcdefghiajklmnopqrstuvabcdef123";
lengthOfLongestSubstring2(testStr);
