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