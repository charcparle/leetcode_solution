// https://leetcode.com/problems/merge-intervals/
/* 
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

 

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 

Constraints:

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104
*/

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

// Passed on 15 Jun 2022
// Runtime: 1378 ms, faster than 5.01% of JavaScript online submissions for Merge Intervals.
// Memory Usage: 54.3 MB, less than 5.05% of JavaScript online submissions for Merge Intervals.
/* var merge = function (intervals) {
  let mem = {};
  const merging = (intervals) => {
    console.log(intervals);
    let result = [intervals[0]];
    for (let interval of intervals) {
      let overlapped = 0;
      mem[interval] = 0;
      for (let i = 0; i < result.length; i++) {
        let l = result[i][0];
        let r = result[i][1];
        if (!(interval[1] < l || interval[0] > r)) {
          overlapped += 1;
          mem[result[i]] = 0;
          if (interval[0] < l) result[i][0] = interval[0];
          if (interval[1] > r) result[i][1] = interval[1];
          mem[result[i]] = 1;
        }
      }
      console.log(overlapped);
      if (overlapped === 0) {
        result.push(interval);
        mem[interval] = 1;
      } else if (overlapped > 1) {
        result = merging(result);
        // console.log(result);
      }
    }
    result = Object.keys(mem)
      .filter((x) => mem[x] === 1)
      .map((x) => x.split(",").map((s) => parseInt(s)));
    return result;
  };
  return merging(intervals);
}; */

const merge = (intervals)=>{
    let mem={}
    const merging = (intervals)=>{
        for (let interval of intervals){
            let l=interval[0]
            let r=interval[1]
            
        }
    }
    return merging(intervals)
}

let test = [
  [2, 3],
  [4, 6],
  [5, 7],
  [3, 4],
]; // [[2,7]]
console.log(merge(test));
console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ])
); // [[1,6],[8,10],[15,18]]
