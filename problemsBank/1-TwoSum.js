// 1. Two Sum
// https://leetcode.com/problems/two-sum/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
    let hash = {};
    let key="";
    let seek="";
    let ans=[];
    for (let i=0;i<nums.length;i++){
        seek = target-nums[i];
        if (hash[seek]!=undefined && hash[seek]!=i) {
            return [hash[seek],i]
            //i>hash[seek] ? [hash[seek],i] : [i,hash[seek]]
            //return ans
        }
        key = nums[i]; 
        hash[key] = i; 
    }
}