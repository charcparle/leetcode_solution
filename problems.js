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

// 4. Median of Two Sorted Arrays
// https://leetcode.com/problems/median-of-two-sorted-arrays/
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var findMedianSortedArrays = function(nums1, nums2) {
    let merged = [...nums1].concat([...nums2]);
    merged = merged.sort((a,b)=>(a-b))
    console.log(merged)
    if ((nums1.length+nums2.length)%2==1){
        return merged[(nums1.length+nums2.length-1)/2]
    } else {
        return (merged[(nums1.length+nums2.length)/2] + merged[(nums1.length+nums2.length)/2-1])/2
    }
};
let t1 = [1,2,9]
let t2 = [5,13,19]
let a = performance.now()
console.log(findMedianSortedArrays(t1,t2))
let b = performance.now()
console.log(`It took ${b-a} ms`)

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

// 11. Container With Most Water
// https://leetcode.com/problems/container-with-most-water/
/**
 * @param {number[]} height
 * @return {number}
 */
/* test case
 * 
*/
/*
let testCase = []
for (let x=0;x<10**5;x++){
    testCase.push(Math.floor(Math.random()*(10**4)))
}
let testCase1 = [4,3,2,1,4]
console.log(testCase)
console.log(testCase.length)
let a = performance.now()
console.log(maxArea(testCase))
let b = performance.now()
console.log(`It took ${b-a} ms`)
testCase=[];
*/
/*    
 var maxArea = function(height) {
    let max = 0;
    for (let i=0;i<height.length;i++){
        for (let j=i+1;j<height.length;j++){
            let dist = j-i;
            let area = (height[i]>height[j]?height[j]:height[i])*dist;
            if (area>max) max=area;
        }
    }
    return max;
};
*/
/*
//attempting Greedy
var maxArea = function(height) {
    let gMax=0;
    let gMin=height.length;
    let area=0;
    let collection={};
    for (let i=0;i<height.length;i++){
        if (collection[height[i]]===undefined){
            collection[height[i]]={max:i,min:i};
        } else if (i>collection[height[i]].max){
            collection[height[i]].max=i;
        } else if (i<collection[height[i]].min){
            collection[height[i]].min=i;
        }
    }
    let sorted = Object.keys(collection).sort((a,b)=>(b-a));
    console.log(collection);
    console.log(sorted);
    for (let j=0;j<sorted.length;j++){
        if (gMax<=collection[sorted[j]].max) gMax=collection[sorted[j]].max
        if (gMin>=collection[sorted[j]].min) gMin=collection[sorted[j]].min
        //console.log(`gMax: ${gMax}, gMin: ${gMin}`)
        if (area<=sorted[j]*(gMax-gMin)) area = sorted[j]*(gMax-gMin)
        
    }
    
    return area;
};
*/

/*
//attempting Greedy #2
var maxArea = function(height) {
    let gMax=0;
    let gMin=height.length;
    let area=0;
    let collection={};
    let keys=[];
    for (let i=0;i<height.length;i++){
        if (collection[height[i]]===undefined){
            collection[height[i]]={max:i,min:i};
            keys.push(height[i]);
            //keys = keys.sort((a,b)=>(b-a))
        } else if (i>collection[height[i]].max){
            collection[height[i]].max=i;
        } else if (i<collection[height[i]].min){
            collection[height[i]].min=i;
        }
        // for this to work, the range of x coresponding to the range of y (larger than current y) has to be identified
        // first by filtering the elements of "keys" with values larger than current y
        // then the corresponing min and max will be compared to find out the applicable gMin and gMax --> no, the big O will become n^2
        //let fH = keys.filter(x=>x>i)

        // The max area is found by the lowest  and higest x of the heights (>=currentH)
        // The question is HOW to get the range of x, because the lowest and highest xs may not come from the same height
        // in this case, how to obtain the relevant list
        // or just keep the lowest bound whatever its available:
        // for each H, go through [heights] to see if the height is larger than currentH; 
        // the highest x is the current i...?

        // or, just do it with 1st principle
        area = height[i] * (gMax-gMin);
    }
    return area;
};
*/

// attempting two-way pointers
var maxArea = function(height) {
    let left=0;
    let right=height.length;
    let area=0;
    let collection={};
    let keys=[];
    while (left<right) {
        if (area < Math.min(height[left],height[right])*(right-left)) area = Math.min(height[left],height[right])*(right-left)
        if (height[left]<=height[right]) {
            left += 1;
        } else {
            right -= 1;
        }
        console.log(area)
    }
    return area;
};

// 42. Trapping Rain Water
// https://leetcode.com/problems/trapping-rain-water/
/**
 * @param {number[]} height
 * @return {number}
 */
 var trap = function(height) {
     // consider a stack structure - first-in-last-out
     // where the value is decreasing, the higher value will enter the stack
     // the stack shall contain the last peak and the current min

    //let edge=[]; //[[height, index],..]
    // iterate thru the array to id local ponds and stored in pond{L:index,R:index}
    // then find min(L, R) to determine pond surface
    // then loop thru each element < surface level to calculate area

    // find max and min indices of tallest element in the array
    // then split and find max & min indices of tallest element in the sub-array
   const pond = (h,l,r)=>{
        if (h.length<=1 || r<=l) {
            console.log("end")
            return 0;
        }
        let tank = 0;
        let max = 0;
        let left = 0;
        let right = h.length-1;
        for (let i=0;i<h.length;i++){
            if (h[i]>max){
                max = h[i];
                left = i;
                right = i;
            } else if (h[i]==max) {
                right = i;
            }
       }
        if (l===undefined) l = left;
        if (r===undefined) r = right;
        console.log(`max:${max}, l:${l}, r:${r}`);
        for (let j=l;j<=r;j++){
            tank += (max - h[j]);
        }
        console.log(`tank: ${tank}`);
        return (tank + pond(h.slice(0,l),undefined,h.slice(0,l).length-1) + pond(h.slice(r+1,h.length),0))
    }
    return pond(height)
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

// 1751. Maximum Number of Events That Can Be Attended II
// https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended-ii/
/**
 * @param {number[][]} events
 * @param {number} k
 * @return {number}
 */

 var maxValue = function(events, k) {
    let total1 = 0;
    let total2 = 0;
    // Greedy:
    // 1. Value Density
    // 2. Value
    // (3. duration)
    let vds = {}; // hash for val den, {vd:[[start1,end1,value1], [start2,end2,value2],...]}
    let vals = {}; // hash for val den, {vd:[[start1,end1], [start2,end2],...]}
    // Allocate based on max value density
    // Value density = Value / (stop - start)
    let vd = 0;
    let val = 0;
    for (let i=0;i<events.length;i++){
        vd = events[i][2]/(events[i][1]-events[i][0]);
        if (vds[vd]!=undefined){
            vds[vd].push(events[i]);
            console.log("repeated");
        } else {
            console.log(`vd: ${vd}`);
            vds[vd]=[events[i]];
        }
        val = events[i][2];
        if (vals[val]!=undefined){
            vals[val].push(events[i]);
            console.log("repeated");
        } else {
            console.log(`val: ${val}`);
            vals[val]=[events[i]];
        }
    }
    
    let days = []; // occupied days - [start1, end1, start2, end2,...]
    const updateDays = (globalDays,start,end)=>{
        let newDays = [...globalDays];
        if (newDays.length==0){ // when this is the first event
            newDays.push(start,end)
            console.log(`flag1, newDays:${newDays}`)
            return newDays;
        } else { // determine whether the current event clashed with any existing events
            // //vds[vdKeys[j][x][0]]
            for (let e=0;e<newDays.length/2;e++){
                eStart = newDays[2*e]; // current start
                eEnd = newDays[2*e+1]; // current end
				console.log(`start,end,eStart,eEnd: ${start}, ${end}, ${eStart}, ${eEnd}`)
                if ((start>=eStart && start<=eEnd) || (end>=eStart && end<=eEnd)){ // new start falls into current event or new end falls into current event
                    console.log(`flag2a, newDays:${newDays}`)
                    return newDays
                } else if ((start<=eStart && end>=eEnd)){ // new Event spread longer than the current Event 
                    console.log(`flag2b, newDays:${newDays}`)
                    return newDays
                } else if (start<eStart && end<eStart) { // insert before current event
                    newDays = newDays.slice(0,2*e).concat(start,end).concat(newDays.slice(2*e))
                    console.log(`flag3, newDays:${newDays}`)
                    return newDays
                }
            }
            newDays.push(start,end) // later than all occupied days, to be added at the end of the array
            console.log(`flag4, newDays:${newDays}`)
            return newDays;
        }
    }
    const sumValue = (k,vHash,globalDays,sortFn)=>{
        let eventCount = 0;
        let result = 0;
        let vkeys = Object.keys(vHash).sort((a,b)=>(b-a));
        let subDays = [...globalDays]
        for (let j=0;j<vkeys.length;j++){
            vHash[vkeys[j]] = vHash[vkeys[j]].sort(sortFn) // sort each event array by decreasing value
            let newDays = [];
            for (let x=0;x<vHash[vkeys[j]].length;x++){
                if (eventCount<k){
                    console.log(`days before: ${subDays}`)
                    newDays = updateDays(subDays,vHash[vkeys[j]][x][0],vHash[vkeys[j]][x][1])
                    console.log(`days after: ${subDays}`)
                    console.log(`newDays: ${newDays}`)
                    if (subDays.length<newDays.length){
                        subDays = newDays;
                        result += vHash[vkeys[j]][x][2]*1;
                        eventCount++;
                    }
                } else {
                    return result //break iteration and return result
                }
            }
        }
        return result
    }
    
    total1 = sumValue(k, vds, days, ((a,b)=>(b[2]-a[2])));
    total2 = sumValue(k, vals, days, ((a,b)=>(a[1]-a[0]-b[1]+b[0])));
    console.log(`total1:${total1}, total2:${total2}`)
    return Math.max(total1, total2);
};

 var maxValue1 = function(events, k) {
    let total = 0;
    // Greedy:
    // 1. Value Density
    // 2. Value
    // (3. duration)
    let vds = {}; // hash for val den, {vd:[[start1,end1,value1], [start2,end2,value2],...]}
    // Allocate based on max value density
    // Value density = Value / (stop - start)
    let vd = 0;
    for (let i=0;i<events.length;i++){
        vd = events[i][2]/(events[i][1]-events[i][0]);
        if (vds[vd]!=undefined){
            vds[vd].push(events[i]);
            console.log("repeated");
        } else {
            console.log(`vd: ${vd}`);
            vds[vd]=[events[i]];
        }
    }
    let vdKeys = Object.keys(vds).sort((a,b)=>(b-a));
    let eventCount = 0;
    let days = []; // occupied days - [start1, end1, start2, end2,...]
    const updateDays = (globalDays,start,end)=>{
        let newDays = [...globalDays];
        if (newDays.length==0){ // when this is the first event
            newDays.push(start,end)
            console.log(`flag1, newDays:${newDays}`)
            return newDays;
        } else { // determine whether the current event clashed with any existing events
            // //vds[vdKeys[j][x][0]]
            for (let e=0;e<newDays.length/2;e++){
                eStart = newDays[2*e]; // current start
                eEnd = newDays[2*e+1]; // current end
				console.log(`start,end,eStart,eEnd: ${start}, ${end}, ${eStart}, ${eEnd}`)
                if ((start>=eStart && start<=eEnd) || (end>=eStart && end<=eEnd)){ // new start falls into current event or new end falls into current event
                    console.log(`flag2, newDays:${newDays}`)
                    return newDays
                } else if (start<eStart && end<eStart) { // insert before current event
                    newDays = newDays.slice(0,2*e).concat(start,end).concat(newDays.slice(2*e))
                    console.log(`flag3, newDays:${newDays}`)
                    return newDays
                }
            }
            newDays.push(start,end) // later than all occupied days, to be added at the end of the array
            console.log(`flag4, newDays:${newDays}`)
            return newDays;
        }
    }
    for (let j=0;j<vdKeys.length;j++){
        vds[vdKeys[j]] = vds[vdKeys[j]].sort((a,b)=>(b[2]-a[2])) // sort each event array by decreading value
        let newDays = [];
        for (let x=0;x<vds[vdKeys[j]].length;x++){
            if (eventCount<k){
                console.log(`days before: ${days}`)
                newDays = updateDays(days,vds[vdKeys[j]][x][0],vds[vdKeys[j]][x][1])
                console.log(`days after: ${days}`)
                console.log(`newDays: ${newDays}`)
                if (days.length<newDays.length){
                    days = newDays;
                    total += vds[vdKeys[j]][x][2]*1;
                    eventCount++;
                }
            } else {
                return total //break iteration and return total
            }
        }
    }
    return total
};


 var maxValue2 = function(events, k) {
    let total = 0;
    // Greedy:
    // 1. Value
    // 2. Value density
    // (3. duration)
    let vals = {}; // hash for val den, {vd:[[start1,end1], [start2,end2],...]}
    // Allocate based on max value 
    // Value density = Value / (stop - start)
    let val = 0;
    for (let i=0;i<events.length;i++){
        val = events[i][2];
        if (vals[val]!=undefined){
            vals[val].push([events[i][0],events[i][1]]);
            console.log("repeated");
        } else {
            console.log(`val: ${val}`);
            vals[val]=[[events[i][0],events[i][1]]];
        }
    }
    let valKeys = Object.keys(vals).sort((a,b)=>(b-a));
    let eventCount = 0;
    let days = []; // occupied days - [start1, end1, start2, end2,...]
    const updateDays = (globalDays,start,end)=>{
        let newDays = [...globalDays];
        if (newDays.length==0){ // when this is the first event
            newDays.push(start,end)
            console.log(`flag1, newDays:${newDays}`)
            return newDays;
        } else { // determine whether the current event clashed with any existing events
            for (let e=0;e<newDays.length/2;e++){
                eStart = newDays[2*e]; // current start
                eEnd = newDays[2*e+1]; // current end
				console.log(`start,end,eStart,eEnd: ${start}, ${end}, ${eStart}, ${eEnd}`)
                if ((start>=eStart && start<=eEnd) || (end>=eStart && end<=eEnd)){ // new start falls into current event or new end falls into current event
                    console.log(`flag2a, newDays:${newDays}`)
                    return newDays
                } else if ((start<=eStart && end>=eEnd)){ // new Event spread longer than the current Event 
                    console.log(`flag2b, newDays:${newDays}`)
                    return newDays
                } else if (start<eStart && end<eStart) { // insert before current event
                    newDays = newDays.slice(0,2*e).concat(start,end).concat(newDays.slice(2*e))
                    console.log(`flag3, newDays:${newDays}`)
                    return newDays
                }
            }
            newDays.push(start,end) // later than all occupied days, to be added at the end of the array
            console.log(`flag4, newDays:${newDays}`)
            return newDays;
        }
    }
    for (let j=0;j<valKeys.length;j++){
        vals[valKeys[j]] = vals[valKeys[j]].sort((a,b)=>(a[1]-a[0]-b[1]+b[0])) // sort each event array by increasing duration
        let newDays = [];
        for (let x=0;x<vals[valKeys[j]].length;x++){
            if (eventCount<k){
                console.log(`days before: ${days}`)
                newDays = updateDays(days,vals[valKeys[j]][x][0],vals[valKeys[j]][x][1])
                console.log(`days after: ${days}`)
                console.log(`newDays: ${newDays}`)
                if (days.length<newDays.length){
                    days = newDays;
                    total += valKeys[j]*1;
                    eventCount++;
                }
            } else {
                return total //break iteration and return total
            }
        }
    }
    return total
};

const findCombo = (eventArr, target) => {  // for verifying the answer in the test
    /*
    // use recursion to find which combo sums up to be the "target"
    if (target<0){
        return undefined
    } else {
        for (let i=eventArr.length-1;i>=0;i++){
            if (eventArr[i])
        } 
    }
    */
   // dynamic programming, store sum as hash
    let sumList = {};    // {sum1:[val1,val2,...], sum2:[val1,val4,...],...}
    let sumKeys = [];
    for (let i=0;i<eventArr.length;i++){
        let val = eventArr[i][2]*1;
        if (val==target) return [val];
        if (sumList[target-val]!=undefined){
            return sumList[target-val].concat(val)
        } else {
            sumKeys = Object.keys(sumList);
            let valX = 0
            for (let x=0;x<sumKeys.length;x++){
                valX = sumKeys[x]*1;
                console.log(target)
                if ((val+valX)==target){
                    return sumList[valX].concat(val)
                } else if ((val+valX)<target) {
                    sumList[val+valX] = sumList[valX].concat(val)
                }
                console.log(sumList)
            }
        }
        sumList[val] = [val]
    }
    return [];

    
}

var maxValue3 = function(events, k) { // using time sequence approach
    // 1. either attend this event and take the value
    // 2. or skip this event, keep total value unchanged and consider the next immediate event
    let eventHash = {};
    let sortFn = (a,b)=>{
        if (a[0]!=b[0]){
            return (a[0]*1-b[0]*1)
        } else {
            return (a[1]*1-b[1]*1)
        }
    }
    let e = events.sort((sortFn)) // sort event list in ascending start time
    console.log(e);
    const nextEvent = (currentEvent)=>{
        const biFindNext = (targetDate, start, end)=>{ //targetdate being the end date of that event
            if (start==end) {
                if (start==e.length-1) return [] // not found
                console.log(`e[start]:${e[start]}`)
                return e[start]
            }
            let n = Math.floor((start+end)/2)
            // 1, 2, 5, 6, 7, 10, 34, 35, 35, 36 #35
            if (e[n][0]>targetDate){ 
                return biFindNext(targetDate,start,n)
            } else {
                return biFindNext(targetDate,n+1,end)
            }
        }
        return biFindNext(currentEvent[1],0,e.length-1)
        // return []
    }
    const altEvent = (currentEvent)=>{
        let n = e.indexOf(currentEvent)*1
        console.log(`alt - n:${n}`)
        if (n>=0 && n<(e.length*1-1)) {
            return e[n+1]
        }
        return []
    }
    const solve = (cur,count)=>{ //input: event, output: value
        // find out the value of the chain of choice starting from this current event
        if (eventHash[cur.concat(count)]!=undefined){
            return eventHash[cur.concat(count)].value
        }
        if (cur.length==0 || count<=0) return 0
        let next = nextEvent(cur);
        let alt = altEvent(cur);
        if (eventHash[next.concat(count-1)]===undefined) {
            eventHash[next.concat(count-1)].value = solve(next,count-1)
            // eventHash[next.concat(count-1)][chain] = cur.concat(next)
        }
        if (eventHash[alt.concat(count)]===undefined) {
            eventHash[alt.concat(count)].value = solve(alt,count)
            // eventHash[alt.concat(count)][chain] = alt
        }
        if (eventHash[next.concat(count-1)].value>=eventHash[alt.concat(count)].value){
            eventHash[cur.concat(count)].chain = eventHash[next.concat(count-1)].chain.concat(cur)
            console.log(eventHash)
            return eventHash[next.concat(count-1)].value
        } else {
            eventHash[cur.concat(count)].chain = eventHash[alt.concat(count)].chain
            console.log(eventHash)
            return eventHash[alt.concat(count)].value
        }
        // return Math.max(cur[2]+eventHash[next.concat(count-1)], eventHash[alt.concat(count)])
    }
    return Math.max(solve(e[0],k),solve(altEvent(e[0]),k))
}

let tEvents = [[1,2,4],[3,4,3],[2,3,1]] //2, 7
tEvents = [[1,1,1],[2,2,2],[3,3,3],[4,4,4]] //3, 9
tEvents = [[30,40,34],[6,11,6],[60,81,36]] //1, 36
tEvents = [[69,83,61],[44,90,19],[26,87,9]] //3, 61
tEvents = [[31,57,53],[5,63,29],[54,57,32],[55,83,28],[25,64,5],[5,33,33],[32,68,27],[30,99,54]] //4, 65
tEvents = [[3,68,97],[12,46,13],[21,24,75],[64,85,74],[10,98,15],[23,84,62],[87,96,29],[80,85,39],[52,89,77],[31,63,91],[29,40,48],[30,96,42],[69,81,68],[52,58,65],[41,52,37]]
// 10, 291, [97, 13, 75, 15, 62, 29]
// cf 256 [13, 75, 62, 29, 77]
// cf 262 [97, 15, 13, 75, 62]
// [[3, 68, 97], [10, 98, 15], [12, 46, 13], [21, 24, 75], [23, 84, 62], [29, 40, 48], [30, 96, 42], [31, 63, 91], [41, 52, 37], [52, 58, 65], [52, 89, 77], [64, 85, 74], [69, 81, 68], [80, 85, 39], [87, 96, 29]]




let tk = 3
tk=4
let a = performance.now();
console.log(maxValue(tEvents,tk));
let b = performance.now();
console.log(`It took ${b-a} ms`);


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


