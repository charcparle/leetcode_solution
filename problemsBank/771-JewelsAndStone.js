// 771. Jewels and Stones
// https://leetcode.com/problems/jewels-and-stones/
/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
 var numJewelsInStones = function(jewels, stones) {
    let jewelList={};
    let count=0;
    for (let i=0;i<jewels.length;i++){
        jewelList[jewels[i]]=0;
    }
    for (let j=0;j<stones.length;j++){
        if (jewelList[stones[j]]!=undefined) count+=1
    }
    return count;
};