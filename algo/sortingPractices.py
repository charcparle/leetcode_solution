""" 
Insertion Sort
"""

import random
import sys


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
    new_list = []
    while len(list)>0:
        to_insert = list.pop()
        new_list = insertion(new_list,to_insert)
    return new_list

test = [int(1000*random.random()) for i in range(10)]
print(test)
print(insert_sort(test))