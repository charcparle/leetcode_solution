// 805. Split Array With Same Average
// https://leetcode.com/problems/split-array-with-same-average/

/*
You are given an integer array nums.

You should move each element of nums into one of the two arrays A and B such that A and B are non-empty, and average(A) == average(B).

Return true if it is possible to achieve that and false otherwise.

Note that for an array arr, average(arr) is the sum of all the elements of arr over the length of arr.

 

Example 1:

Input: nums = [1,2,3,4,5,6,7,8]
Output: true
Explanation: We can split the array into [1,4,5,8] and [2,3,6,7], and both of them have an average of 4.5.
Example 2:

Input: nums = [3,1]
Output: false
 

Constraints:

1 <= nums.length <= 30
0 <= nums[i] <= 10^4
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// Runtime error on 7 May 2022
var splitArraySameAverage = function (nums) {
    /*
    note that average(A)*A.length + average(B)*B.length = sum of nums = avg(A+B)*(A+B).length
    If avgA===avgB, then avgA*(A.length+B.length)=sum of nums => avgA = avgB = avg(A+B)

    memoize the sum of combination, hash table to record it
    look up difference of current value and target sum
    */

    // Reject obvious case
    if (nums.length === 1) return false
    if (nums.length === 2 && nums[0] !== nums[1]) return false

    let avgBank = {}
    let sameAverage = false
    const average = (arr) => {
        let sum = 0
        for (let num of arr) {
            sum += num
        }
        return (sum / arr.length)
    }
    const target = average(nums)
    console.log(`target: ${target}`)
    console.log(`total: ${target * nums.length}`)
    const genAllCombinations = (arr) => {
        // recursion for getting all combination in an array
        // @return an array, containing all combinations, e.g. [[a],[b],[c],[a,b],[a,c],[b,c],[a,b,c] ] for [a,b,c]
        let comboAll = []
        let others = []
        if (arr.length === 1) {
            return [arr]
        }
        for (let i = 0; i < arr.length; i++) {
            others = [...arr.slice(0, i), ...arr.slice(i + 1, arr.length)]
            if (!avgBank[others]) {
                if (others.length > 1) { comboAll = [...comboAll, others] }
                avgBank[others] = average(others)
                if (avgBank[others] === target) {
                    sameAverage = true
                    console.log(`array: ${others}`)
                    return comboAll
                }
                comboAll = [...comboAll, ...genAllCombinations(others)]
            }
            if (sameAverage) return comboAll
        }
        return comboAll
    }
    console.time("gen")
    genAllCombinations(nums)
    console.timeEnd("gen")
    return sameAverage
};

var splitArraySameAverage2 = function (nums) {
    /*
    ??if splitArraySameAverage === true, is the solution unique??
    i.e. if there exists (A,B) such that ([...A,...B]===nums) and avgA===avgB===avgNums, is (A,B) unique? No; Can (A,B) be unique? yes.
    If there exists (A,B), then each elemenet should belong to either A or B
    If splitArraySameAverage===false, (A,B) do not exist (cannot be proved?)
    For all A, avgA
    
    //  say sumN=460, avgNums*N.len=470, then we should look for some array K such that sumN+sumK = avgNums*(N.len+K.len) => sumK = avgNums*K.len + (470-460) => Diff = sumK-avgNums*K.len
    */

    // Reject obvious case
    if (nums.length === 1) return false
    if (nums.length === 2 && nums[0] !== nums[1]) return false
    let sameAverage = false
    const average = (arr) => {
        let sum = 0
        for (let num of arr) {
            sum += num
        }
        return (sum / arr.length)
    }
    const avgNums = average(nums)
    let comboBank = {} // {length: {Diff=sumArray-avgNums*Array.length:[Array]}}
    const genCombo = (arr, len) => {
        let combos = []
        if (len < 1) return [[]]
        for (let i = 0; i < arr.length; i++) {
            let newCombo = []
            let others = [...arr.slice(0, i), ...arr.slice(i + 1, arr.length)]
            for (let subArr of genCombo(others, len - 1)) {
                /*
                let sumSubArr = subArr.reduce((acc, cur) => (acc + cur), 0)
                let targetSum = avgNums * subArr.length
                let key = sumSubArr - avgNums * subArr.length
                comboBank[subArr.length] = {...comboBank[subArr.length], [key]: subArr }
                if (sumSubArr === targetSum || comboBank[subArr.length][targetSum - sumSubArr]) {
                    sameAverage = true
                    console.log(`array: ${subArr}`)
                    console.log(`another array: ${comboBank[subArr.length][targetSum - sumSubArr]}`)
                    console.log(comboBank)
                    return combos
                }
                newCombo = [...newCombo, [arr[i], ...subArr]]
                */
               let newSubArr = [arr[i], ...subArr]
               newCombo = [...newCombo, newSubArr]
               let newSubArr_sum = newSubArr.reduce((acc, cur) => (acc + cur), 0)
               let targetSum = avgNums * newSubArr.length
               let key = newSubArr_sum - targetSum
               comboBank[newSubArr.length] = {...comboBank[newSubArr.length], [key]: newSubArr }
               if (newSubArr_sum === targetSum || comboBank[newSubArr.length][targetSum - newSubArr_sum]) {
                   sameAverage = true
                   console.log(`array: ${newSubArr}`)
                   console.log(`another array: ${comboBank[newSubArr.length][targetSum - newSubArr_sum]}`)
                   console.log(comboBank)
                   return combos
               }
            }
            combos = [...combos, ...newCombo]
            if (sameAverage) return combos
        }

        return combos
    }
    console.time("gen")
    genCombo(nums, Math.floor(nums.length / 2))
    console.log(comboBank)
    console.timeEnd("gen")
    return sameAverage
};

var splitArraySameAverage3 = function (nums) {
    // Reject obvious case
    if (nums.length === 1) return false
    if (nums.length === 2 && nums[0] !== nums[1]) return false

    let bank = {}
    let sameAverage = false
    const average = (arr) => {
        let sum = 0
        for (let num of arr) {
            sum += num
        }
        return (sum / arr.length)
    }
    const target = average(nums)
    const maxSize = Math.floor(nums.length / 2)
    let read = 0
    console.log(`target: ${target}`)
    console.log(`total: ${target * nums.length}`)
    const genAllCombinations = (arr) => {
        // recursion for getting all combination in an array
        // @return an array, containing all combinations, e.g. [[a],[b],[c],[a,b],[a,c],[b,c],[a,b,c] ] for [a,b,c]
        let comboAll = []
        let others = []
        if (arr.length <= maxSize) return []
        if (arr.length === 1) {
            return [arr]
        }
        for (let i = 0; i < arr.length; i++) {
            others = [...arr.slice(0, i), ...arr.slice(i + 1, arr.length)]
            comboAll = [others]
            if (!bank[others]) {
                let avg = average(others)
                if (avg === target) {
                    sameAverage = true
                    console.log(`array: ${others}`)
                }
                comboAll = [...comboAll, ...genAllCombinations(others)]
                bank[others] = comboAll
            } else {
                read += 1
                comboAll = bank[others]
            }
            if (sameAverage) return comboAll //for stopping the loop
        }
        return comboAll
    }
    console.time("gen")
    genAllCombinations(nums)
    console.log(`read: ${read}`)
    console.timeEnd("gen")
    return sameAverage
};
const reducer = (arr) => {
    return arr.reduce((acc, cur) => (acc + cur))
}

let test = [1, 2, 3, 4, 5, 6, 7, 8]
// test = [1, 2, 3]
// test = [1, 4, 9]
test = [84, 44, 32, 42, 26, 26, 87, 65, 12, 95, 68, 41, 6, 72, 8, 15, 66, 55, 71, 79, 6] //expect: false
// test = [84, 44, 32, 42, 26, 26, 87, 65, 12, 95, 68, 41, 6, 72, 8, 15, 66, 55, 71, 85] //expect: true
// test = [10, 29, 13, 53, 33, 48, 76, 70, 5, 5] //expect: true
// console.log(splitArraySameAverage(test))
console.log(splitArraySameAverage2(test))
// console.log(splitArraySameAverage3(test))
// console.log(reducer(test))
