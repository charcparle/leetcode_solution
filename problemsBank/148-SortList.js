/* 
https://leetcode.com/problems/sort-list/
148. Sort List
Given the head of a linked list, return the list after sorting it in ascending order.

 

Example 1:


Input: head = [4,2,1,3]
Output: [1,2,3,4]
Example 2:


Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
Example 3:

Input: head = []
Output: []
 

Constraints:

The number of nodes in the list is in the range [0, 5 * 104].
-105 <= Node.val <= 105
 

Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// Submitted on 26 Jun 2022, time limit exceeded with test case: https://leetcode.com/submissions/detail/732253005/testcase/
// Submitted on 26 Hun 2022, time limit exceeded with test case: https://leetcode.com/submissions/detail/732261296/testcase/
 var sortList = function(head) {
    let list = []
    let cur=head
    while(cur!==null){
        list=[...list,cur.val]
        cur = cur.next
    }
    list.sort((a,b)=>(a-b))
    console.log(list)
    cur=head
    for (let num of list){
        cur.val=num
        cur=cur.next
    }
    return head

};