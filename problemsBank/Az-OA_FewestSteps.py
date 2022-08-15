""" Given a 2-D Integer Array `area`, find the fewest steps to travel from top left to the cell labelled '9'
Some cells are not accessible (no roads) and are labelled as '0'
Other celles are labelled as '1'
This is a simulation of an Amazon delivery truck sending goods to the destination. """

""" This problem is presented as one of the questions in the Online Assessment for SDE role in Amazon 
(attempted on 2022-08-10)
Tried recursive approach with memoization but failed at exceeding call stack
because the first approach will loop between steps forever. """

""" Input: 2-D Integer Array `area`
Output: Integer (no. of steps) """

import math

test_area = [
    [1, 0, 9],
    [1, 1, 1],
    [1, 0, 1],
]

test_area = [
    [1,0,1,1,1,1,1],
    [1,0,1,1,0,1,1],
    [1,1,1,0,0,1,0],
    [0,0,0,9,1,1,0]
]

def pathSteps(area):
    # Collect all cells into the "unvisited list"
    # The distance to all cells will be set to Infinity except that of the starting cell, which is zero
    unvisited = {}
    dist = {}
    for r_idx,row in enumerate(area):
        for c_idx,val in enumerate(row):
            unvisited[str([r_idx,c_idx])]= math.inf
            if val==9: destination = [r_idx,c_idx]
        unvisited[str([0,0])]=0
    print(unvisited)

    # Set starting cell as current cell
    cur = [0,0]
    while str(destination) in unvisited:
        if unvisited[str(cur)]==math.inf: 
            print(dist)
            return 'destination inaccessible'
        # Past the current cell distance to the 'dist' set
        dist[str(cur)] = unvisited[str(cur)]
        # Go through each connecting cell to determine their distances
        dirs = [[0,1],[1,0],[0,-1],[-1,0]] # Right, Down, Left Up
        for dir in dirs:
            adj = [cur[0]+dir[0],cur[1]+dir[1]]
            if (str(adj) in unvisited):
                if area[adj[0]][adj[1]]!=0:
                    unvisited[str(adj)] = min(unvisited[(str(adj))], dist[str(cur)]+1)
        # All connecting cells are visited, so current cell can be removed from unvisited
        del unvisited[str(cur)]
        # Identify the cell with shortest distance as the next current cell
        next = min(unvisited, key=unvisited.get)
        cur = [int(next[1:next.find(',')]), int(next[next.find(',')+1:-1])]

    print(dist)
    return dist[str(destination)]

print(pathSteps(test_area))