// https://leetcode.com/problems/search-a-2d-matrix/

/*
Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

Integers in each row are sorted from left to right.
The first integer of each row is greater than the last integer of the previous row.
*/

/*
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
----------
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
*/

/*
Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 100
-10^4 <= matrix[i][j], target <= 10^4
*/

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

// Passed: 87ms, 42.1MB used. 5 May 2022
var searchMatrix = function (matrix, target) {
    const searchRow = (row, target) => {
        console.log(row)
        if (row.length <= 1) {
            console.log("row.length<=1")
            if (row[0] === target) {
                return true
            } else {
                return false
            }
        }
        let mid = Math.floor(row.length / 2)
        console.log(`mid: ${mid}`)
        if (row[mid] === target) {
            return true
        } else if (row[mid] > target) {
            return searchRow(row.slice(0, mid), target)
        } else {
            return searchRow(row.slice(mid, row.length), target)
        }
    }

    for (row of matrix) {
        console.log(row)
        if (target >= row[0] && target <= row[row.length - 1]) {
            // search target within row
            return searchRow(row, target)
        } else if (row[0] > target) { // passed the target
            return false
        }
    }
    return false
}

let test = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]
console.log(searchMatrix(test, 30))
