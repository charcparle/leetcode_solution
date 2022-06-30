""" Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

 

Example 1:

Input: s = "anagram", t = "nagaram"
Output: true
Example 2:

Input: s = "rat", t = "car"
Output: false
 

Constraints:

1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.
 

Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case? """

# Passed on 2022-06-18, runtime beats 5.63%, memory beats 34.75%
# class Solution:
#     def isAnagram(self, s: str, t: str) -> bool:
#         s_dict={}
#         t_dict={}
#         for char in s:
#             if char in s_dict:
#                 s_dict[char]+=1
#             else: s_dict[char]=1
#         for char in t:
#             if char in t_dict:
#                 t_dict[char]+=1
#             else: t_dict[char]=1
#         if s_dict==t_dict:
#             return True
#         else: 
#             return False


# Passed on 2022-06-19, runtime beats 85.56%, memory beats 11.52%
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        # print(s,t)
        s_list = sorted(list(s))
        t_list = sorted(list(t))
        # print(s_list)
        # print(t_list)
        if s_list==t_list:
            return True
        else:
            return False
print(Solution.isAnagram(Solution,'anagram','nagaram'))
print(Solution.isAnagram(Solution,'rat','car'))


