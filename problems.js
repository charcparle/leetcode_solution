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

// 149. Max Points on a Line
// https://leetcode.com/problems/max-points-on-a-line/
/**
 * @param {number[][]} points
 * @return {number}
 */
//let testCase = [[0,1],[0,0],[0,4],[0,-2],[0,-1],[0,3],[0,-4]]
//console.log(maxPoints(testCase))
 var maxPoints = function(points) {
    // forming a line means that the points can be fitted with the same gradient
    // and sharing the same y-intercept
    let maxPt = 1;
    for (let i=0;i<points.length;i++){
    	let lines={};
        for (let j=i+1;j<points.length;j++){        	
           let m = (points[i][1]-points[j][1])/(points[i][0]-points[j][0])
           if (m===-Infinity) m=Infinity
           if (lines[m]==undefined) {
               lines[m] = 2
           } else {
               lines[m]+=1;
           }
           if (lines[m]>maxPt) {
               maxPt = lines[m]
           }
        }
    }
    return maxPt
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

// 1108. Defanging an IP Address
// https://leetcode.com/problems/defanging-an-ip-address/
/**
 * @param {string} address
 * @return {string}
 */
 var defangIPaddr = function(address) {
    let target = /\./g
    return address.replace(target,"[.]")
};


// 1865. Finding Pairs With a Certain Sum
// https://leetcode.com/problems/finding-pairs-with-a-certain-sum/
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 */
 var FindSumPairs = function(nums1, nums2) {
    this.nums1 = nums1;
    this.nums2 = nums2;
    let countNums1={};
    let countNums2={};
    for (let i=0;i<nums1.length;i++){
        if(countNums1[nums1[i]]!=undefined){
            countNums1[nums1[i]]+=1;
        } else {
            countNums1[nums1[i]]=1;
        }
    }
    this.countNums1=countNums1
    
    this.keys1 = Object.keys(this.countNums1);
    //console.log(this.keys1);
    
    for (let j=0;j<nums2.length;j++){
        if(countNums2[nums2[j]]!=undefined){
            countNums2[nums2[j]]+=1;
        } else {
            countNums2[nums2[j]]=1;
        }
    }
    this.countNums2=countNums2
    //console.log(this.countNums2)
};
/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
FindSumPairs.prototype.add = function(index, val) {
    //console.log(`adding ${val} to index ${index}`)
    // refresh the hashTable for nums2
    this.countNums2[this.nums2[index]]-=1 //assume all val are valid
    if (this.countNums2[this.nums2[index]]==0) delete this.countNums2[this.nums2[index]]
    // update value in nums2
    this.nums2[index]+=val;
    // update the counts in countNums2
    if (this.countNums2[this.nums2[index]]!=undefined){
        this.countNums2[this.nums2[index]]+=1;
    } else {
        this.countNums2[this.nums2[index]]=1;
    }
    //console.log(this.countNums2)
};
/** 
 * @param {number} tot
 * @return {number}
 */
FindSumPairs.prototype.count = function(tot) {
    let cnt=0;
    /*
    for (let i=0;i<this.nums1.length;i++){
        for(let j=0;j<this.nums2.length;j++){
            if (this.nums2[j]==(tot-this.nums1[i])) cnt+=1
        }   
    }
    */
    //console.log("counting")
    //console.log(this.countNums2)
    /*
    for(let j=0;j<this.nums2.length;j++){
        if (this.countNums1[tot-this.nums2[j]]!=undefined) cnt+=this.countNums1[tot-this.nums2[j]]
    }
    */
    
    cnt = this.keys1.reduce((acc,cur)=>{
        //console.log(cur)
        //console.log(this.countNums1[cur])
        if(this.countNums2[tot-cur]!=undefined) {
            acc = acc+(this.countNums2[tot-cur]*this.countNums1[cur]);
            //console.log(acc)
        }
        
        return acc;
    },0)
    return cnt;
};
/** 
 * Your FindSumPairs object will be instantiated and called as such:
 * var obj = new FindSumPairs(nums1, nums2)
 * obj.add(index,val)
 * var param_2 = obj.count(tot)
 */


