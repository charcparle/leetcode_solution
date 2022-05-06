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