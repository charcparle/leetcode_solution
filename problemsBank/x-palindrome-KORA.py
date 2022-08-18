""" 
A palindrome is a sequence of numbers or letters that is the same if read both forward and backward (i.e. abcba, abccba).

Given an array of letters as input, write an algorithm that returns the number of contiguous subsequence palindromes.

Example: [a, a, b, b, a] as input would return 8.  The possible palindromes are a, a, b, b, a, aa, bb, abba (you don’t need to return this). 
"""
def flip(str):
    new_str=""
    for c in str:
        new_str = c+new_str
    return new_str

def count_palindrome(input):
    count = 0
    inputStr="".join(input)
    # Iterate through the input 
    for i in range(len(inputStr)):
        # For each character, iterate all accumulating substrings
        for j in range(i+1):
            # for each substring, reverse to generate rev-substring
            flipped = flip(inputStr[j:i+1])
            # print(flipped)
            # for each rev-substring, check if it is the substring beginning at the cooresponding location
            if flipped==inputStr[j:i+1]: 
                count+=1
                print(flipped)
    return count

test = ['a', 'a', 'b', 'b', 'a'] #8
test = ["a", "a", "b", "b", "a", "a"] #11
print(count_palindrome(test))