import random
def printBoard(b):
    for row in b:
        print(row)

def genBoard(m,n):
    board=[]
    for i in range(m):
        board.append([])
        for j in range(n):
            val = str(int(5*random.random()))
            if len(val)<2: val = ' ' + str(val)
            board[i].append(val)
    printBoard(board)
    return board

def findPeak(board):
    mid = len(board)//2
    max=0
    maxAt=0
    for col in range(len(board[mid])):
        if int(board[mid][col])>max: 
            max=int(board[mid][col])
            maxAt=int(col)
    # when there is only one row left
    if mid==0: return (mid,maxAt)   
    # when there are only two rows
    elif mid==len(board)-1: return (mid,maxAt)
    if int(board[mid-1][maxAt])>=max:
        return findPeak(board[:mid+1])
    elif int(board[mid+1][maxAt])>=max:
        return findPeak(board[mid+1:])
    else:
        return (mid,maxAt)


board = genBoard(2,5)
peak = findPeak(board)
print(peak)