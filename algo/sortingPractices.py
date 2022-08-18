""" 
Insertion Sort
"""

import random
import sys
import time


def insertion(list, to_insert):
    check_location = len(list)-1
    insert_location = 0
    while(check_location>=0):
        if (to_insert>list[check_location]):
            insert_location = check_location + 1
            check_location = -1
        check_location -= 1
    list.insert(insert_location, to_insert)
    return (list)
def insert_sort(list):
    old_list = list[:]
    new_list = []
    while len(old_list)>0:
        to_insert = old_list.pop()
        new_list = insertion(new_list,to_insert)
    return new_list

def bubble_sort(list):
    new_list = list[:]
    for i in range(len(new_list)):
        for j in range(len(new_list)-i-1):
            if new_list[j]>new_list[j+1]:
                temp = new_list[j]
                new_list[j]=new_list[j+1]
                new_list[j+1]=temp
    return new_list

def merge_sort(list):
    # print(list)
    if len(list)==1: return list[:]
    mid = (len(list))//2
    left = merge_sort(list[:mid:])
    right = merge_sort(list[mid::])
    new = []
    while len(left)>0 and len(right)>0:
        if left[0]<=right[0]:
            new.append(left.pop(0))
        else:
            new.append(right.pop(0))
    # Loop ends when one of the arrays becomes []
    if len(left)==0:
        new+=right
    else:
        new+=left
    return new


test = [int(1000*random.random()) for i in range(2000)]
# print(test)
# """  """
# print('Insertion Sort: ')
time_insert = time.time()
print(insert_sort(test))
print(f'Insertion Sort takes {time.time()-time_insert}')
"""  """
# print(test)
print('Bubble Sort: ')
time_bubble = time.time()
print(bubble_sort(test))
print(f'Bubble Sort takes {time.time()-time_bubble}')
"""  """
# print(test)
print('Merge Sort: ')
time_merge = time.time()
print(merge_sort(test))
print(f'Merge Sort takes {time.time()-time_merge}')
# print('original list:')
print(test)