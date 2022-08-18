# https://leetcode.com/problems/house-robber-ii/
""" 
213. House Robber II
Medium
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. 
All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. 
Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.
Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

Example 1:
    Input: nums = [2,3,2]
    Output: 3
    Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
Example 2:
    Input: nums = [1,2,3,1]
    Output: 4
    Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
    Total amount you can rob = 1 + 3 = 4.
Example 3:
    Input: nums = [1,2,3]
    Output: 3
 
Constraints:
1 <= nums.length <= 100
0 <= nums[i] <= 1000
"""
class Solution:
    def robRow(self, nums) -> int:
        # Handling one row of house only (not circular)
        """ 
        # Recursive approach
        if len(nums)==0: return 0
        max_amt = max(nums[-1]+self.robRow(nums[:-2]), self.robRow(nums[:-1]))
        # print(nums,max_amt)
        """
        
        """ 
        # Iterative approach
        mem={}
        mem[0] = 0  # max_amt=0 if there is no house
        mem[1] = nums[0] # max_amt=val of the only house
        for i in range(1,len(nums)):
            mem[i+1]=max(nums[i]+mem[i-1],mem[i])
        print(mem)
        max_amt = mem[len(nums)]
        """
        # Iterative approach + N-variable
        val1=0
        val2=nums[0]
        for i,val in enumerate(nums):
            if i>0: 
                temp = val1
                val1 = val2
                val2 = max(val+temp,val1)
            print(val1, val2)
        max_amt = val2
       
        return max_amt
    def rob(self, nums) -> int:
        # After the first robbery, the problem is similar to robbing a single row of houses (non-circular)
        max_val=0
        for i in range(len(nums)):
            if i==0: newNums = nums[2:-1]
            elif i==len(nums)-1: newNums = nums[1:-2]
            else: newNums = nums[i+2:]+nums[:i-1]
            max_val = max(self.robRow(newNums)+nums[i],max_val)
        return max_val

test = [1,2,3]
test = [1,2,3,1]
test = [1,2,3,4,5]
# test = [0,0,0,0,0,0,1,1,0]
solve = Solution()
print(solve.robRow(test))
print(solve.rob(test))
print(test)
        