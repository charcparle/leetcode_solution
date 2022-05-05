/*
https://code.quora.com/Python-problem-There-are-3-children-their-names-are-A-B-C-A-has-50-candies-B-has-43-candies-C-has-13-candies-Now-t

Python problem

There are 3 children(their names are A,B,C). 
A has 50 candies, B has 43 candies, C has 13 candies. 
Now they want to play a game.Start from A, each person break all his candies (so far he holds) into 3 parts, 
keeping one part for hisself and give other two parts to others, 
He eat the reminder candies. 
In this way, at the end of the game. 
How many candies A, B and C has?
*/

// let A = 50, B = 43, C = 13
let candies = {
    A: 50,
    B: 43,
    C: 13
}
let eatenTotal = {}
let history = {}

const shareCandies = (giver, candies) => {
    let children = Object.keys(candies)
    let share = children.length
    let receivers = children.filter(child => child !== giver)
    console.log("++++++++++++++++++++++++")
    console.log(`giver: ${giver}, receivers: ${receivers}`)

    let start = candies[giver]
    if (start < share) {
        return candies
    }
    let roundStart = children.map(child => (candies[child]))
    let remainder = start % share
    console.log('candies start with')
    console.log(candies)
    if (eatenTotal[giver]) {
        eatenTotal[giver] += remainder
    } else {
        eatenTotal[giver] = remainder
    }
    candies[giver] = (start - remainder) / share
    receivers.forEach(receiver => {
        // roundStart.push(candies[receiver])
        candies[receiver] += (start - remainder) / share
        // roundEnd.push(candies[receiver])
    })
    let roundEnd = children.map(child => (candies[child]))
    console.log(`eatenTotal:`)
    console.log(eatenTotal)
    console.log(`candies:`)
    console.log(candies)
    // record the transaction
    if (history[roundStart]) {
        return candies
    } else {
        history[roundStart] = roundEnd
    }
    console.log(history)
    const nextGiver = (child) => {
        let current = children.indexOf(child)
        if (current + 1 === children.length) {
            return children[0]
        } else {
            return children[current + 1]
        }
    }
    return shareCandies(nextGiver(giver), candies)
}
candies = {
    A: 61,
    B: 61,
    C: 61,
    D: 61,
    E: 61,
    F: 61,
    G: 61,
}
candies = shareCandies("A", candies)
console.log(candies)