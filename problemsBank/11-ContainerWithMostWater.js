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