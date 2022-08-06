/* 
98. Validate Binary Search Tree
https://leetcode.com/problems/validate-binary-search-tree/
Medium

10801

934

Add to List

Share
Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
 

Example 1:


Input: root = [2,1,3]
Output: true
Example 2:


Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
-231 <= Node.val <= 231 - 1
*/

// Submitted on 26 Jul 2022, Runtime: 131 ms, faster than 18.13%, Memory Usage: 46.5 MB, less than 41.43%

var isValidBST = function (root) {
  //     root.val becomes left.max and right.min
  //     root.min becomes left.min
  //     root.max becomes right.max
  const check = (root, min, max) => {
    let checkLeft = false;
    let checkRight = false;
    const leftMin = min; // can be null
    const leftMax = root.val;
    const rightMin = root.val;
    const rightMax = max; // can be null
    if (root.left) {
      if (
        ((leftMin && root.left.val > leftMin) || leftMin === null) &&
        root.left.val < leftMax
      ) {
        checkLeft = check(root.left, leftMin, leftMax);
      } else {
        // console.log('left', root,leftMin, leftMax)
        return false;
      }
    } else {
      checkLeft = true;
    }

    if (root.right) {
      if (
        ((rightMax && root.right.val < rightMax) || rightMax === null) &&
        root.right.val > rightMin
      ) {
        checkRight = check(root.right, rightMin, rightMax);
      } else {
        // console.log('right', root, rightMin, rightMax)
        return false;
      }
    } else {
      checkRight = true;
    }
    // console.log(root, checkLeft, checkRight)
    return checkLeft && checkRight;
  };
  return check(root, null, null);
};
