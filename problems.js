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


// 8. String to Integer (atoi) 
// https://leetcode.com/problems/string-to-integer-atoi/
/**
 * @param {string} s
 * @return {number}
 */
 var myAtoi = function(s) {
    //let nd=/\D/
    let bag='';
    //let sign=0;
    const outFn = (bag)=>{
        //console.log(`bag: ${bag}`)
        //console.log(`inside OutFn, sign:${sign}`)
        //if (sign==0) sign=1;
        let output=bag*1;
        if (!output) output=0;
        if (output<-(2**31)) {
            output = -(2**31)
        } else if (output>(2**31-1)) {
            output = 2**31-1
        }
        //console.log(output)
        return output
    }
    let r=/^\s*[\+\-]?\d*/g
    bag = s.match(r)[0].trim();
    //console.log(bag)
    return outFn(bag)
    /*
    for (let i=0;i<s.length;i++){
        console.log(`i: ${i}`)
        if (bag.length==0 && sign==0 && s[i]==' '){ //determine whether space is leading
            
        } else if (s[i]=='+' || s[i]=='-'){
            if (sign==0 && bag.length==0){
                if(s[i]=='+') sign=1;
                if(s[i]=='-') sign=-1;
            } else {
                return outFn(bag,sign)
            }
        } else if (nd.test(s[i])){ //when current character is non-digit
            // stop loop
            return outFn(bag, sign)
        } else {
            //if (bag.length!=0 || s[i]!="0") 
            bag= bag.concat(s[i])
        }

    }

    return outFn(bag,sign)
    */
};


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