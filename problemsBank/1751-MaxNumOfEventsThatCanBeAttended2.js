// 1751. Maximum Number of Events That Can Be Attended II
// https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended-ii/
/**
 * @param {number[][]} events
 * @param {number} k
 * @return {number}
 */

 var maxValue = function(events, k) {
    let total1 = 0;
    let total2 = 0;
    // Greedy:
    // 1. Value Density
    // 2. Value
    // (3. duration)
    let vds = {}; // hash for val den, {vd:[[start1,end1,value1], [start2,end2,value2],...]}
    let vals = {}; // hash for val den, {vd:[[start1,end1], [start2,end2],...]}
    // Allocate based on max value density
    // Value density = Value / (stop - start)
    let vd = 0;
    let val = 0;
    for (let i=0;i<events.length;i++){
        vd = events[i][2]/(events[i][1]-events[i][0]);
        if (vds[vd]!=undefined){
            vds[vd].push(events[i]);
            console.log("repeated");
        } else {
            console.log(`vd: ${vd}`);
            vds[vd]=[events[i]];
        }
        val = events[i][2];
        if (vals[val]!=undefined){
            vals[val].push(events[i]);
            console.log("repeated");
        } else {
            console.log(`val: ${val}`);
            vals[val]=[events[i]];
        }
    }
    
    let days = []; // occupied days - [start1, end1, start2, end2,...]
    const updateDays = (globalDays,start,end)=>{
        let newDays = [...globalDays];
        if (newDays.length==0){ // when this is the first event
            newDays.push(start,end)
            console.log(`flag1, newDays:${newDays}`)
            return newDays;
        } else { // determine whether the current event clashed with any existing events
            // //vds[vdKeys[j][x][0]]
            for (let e=0;e<newDays.length/2;e++){
                eStart = newDays[2*e]; // current start
                eEnd = newDays[2*e+1]; // current end
				console.log(`start,end,eStart,eEnd: ${start}, ${end}, ${eStart}, ${eEnd}`)
                if ((start>=eStart && start<=eEnd) || (end>=eStart && end<=eEnd)){ // new start falls into current event or new end falls into current event
                    console.log(`flag2a, newDays:${newDays}`)
                    return newDays
                } else if ((start<=eStart && end>=eEnd)){ // new Event spread longer than the current Event 
                    console.log(`flag2b, newDays:${newDays}`)
                    return newDays
                } else if (start<eStart && end<eStart) { // insert before current event
                    newDays = newDays.slice(0,2*e).concat(start,end).concat(newDays.slice(2*e))
                    console.log(`flag3, newDays:${newDays}`)
                    return newDays
                }
            }
            newDays.push(start,end) // later than all occupied days, to be added at the end of the array
            console.log(`flag4, newDays:${newDays}`)
            return newDays;
        }
    }
    const sumValue = (k,vHash,globalDays,sortFn)=>{
        let eventCount = 0;
        let result = 0;
        let vkeys = Object.keys(vHash).sort((a,b)=>(b-a));
        let subDays = [...globalDays]
        for (let j=0;j<vkeys.length;j++){
            vHash[vkeys[j]] = vHash[vkeys[j]].sort(sortFn) // sort each event array by decreasing value
            let newDays = [];
            for (let x=0;x<vHash[vkeys[j]].length;x++){
                if (eventCount<k){
                    console.log(`days before: ${subDays}`)
                    newDays = updateDays(subDays,vHash[vkeys[j]][x][0],vHash[vkeys[j]][x][1])
                    console.log(`days after: ${subDays}`)
                    console.log(`newDays: ${newDays}`)
                    if (subDays.length<newDays.length){
                        subDays = newDays;
                        result += vHash[vkeys[j]][x][2]*1;
                        eventCount++;
                    }
                } else {
                    return result //break iteration and return result
                }
            }
        }
        return result
    }
    
    total1 = sumValue(k, vds, days, ((a,b)=>(b[2]-a[2])));
    total2 = sumValue(k, vals, days, ((a,b)=>(a[1]-a[0]-b[1]+b[0])));
    console.log(`total1:${total1}, total2:${total2}`)
    return Math.max(total1, total2);
};

 var maxValue1 = function(events, k) {
    let total = 0;
    // Greedy:
    // 1. Value Density
    // 2. Value
    // (3. duration)
    let vds = {}; // hash for val den, {vd:[[start1,end1,value1], [start2,end2,value2],...]}
    // Allocate based on max value density
    // Value density = Value / (stop - start)
    let vd = 0;
    for (let i=0;i<events.length;i++){
        vd = events[i][2]/(events[i][1]-events[i][0]);
        if (vds[vd]!=undefined){
            vds[vd].push(events[i]);
            console.log("repeated");
        } else {
            console.log(`vd: ${vd}`);
            vds[vd]=[events[i]];
        }
    }
    let vdKeys = Object.keys(vds).sort((a,b)=>(b-a));
    let eventCount = 0;
    let days = []; // occupied days - [start1, end1, start2, end2,...]
    const updateDays = (globalDays,start,end)=>{
        let newDays = [...globalDays];
        if (newDays.length==0){ // when this is the first event
            newDays.push(start,end)
            console.log(`flag1, newDays:${newDays}`)
            return newDays;
        } else { // determine whether the current event clashed with any existing events
            // //vds[vdKeys[j][x][0]]
            for (let e=0;e<newDays.length/2;e++){
                eStart = newDays[2*e]; // current start
                eEnd = newDays[2*e+1]; // current end
				console.log(`start,end,eStart,eEnd: ${start}, ${end}, ${eStart}, ${eEnd}`)
                if ((start>=eStart && start<=eEnd) || (end>=eStart && end<=eEnd)){ // new start falls into current event or new end falls into current event
                    console.log(`flag2, newDays:${newDays}`)
                    return newDays
                } else if (start<eStart && end<eStart) { // insert before current event
                    newDays = newDays.slice(0,2*e).concat(start,end).concat(newDays.slice(2*e))
                    console.log(`flag3, newDays:${newDays}`)
                    return newDays
                }
            }
            newDays.push(start,end) // later than all occupied days, to be added at the end of the array
            console.log(`flag4, newDays:${newDays}`)
            return newDays;
        }
    }
    for (let j=0;j<vdKeys.length;j++){
        vds[vdKeys[j]] = vds[vdKeys[j]].sort((a,b)=>(b[2]-a[2])) // sort each event array by decreading value
        let newDays = [];
        for (let x=0;x<vds[vdKeys[j]].length;x++){
            if (eventCount<k){
                console.log(`days before: ${days}`)
                newDays = updateDays(days,vds[vdKeys[j]][x][0],vds[vdKeys[j]][x][1])
                console.log(`days after: ${days}`)
                console.log(`newDays: ${newDays}`)
                if (days.length<newDays.length){
                    days = newDays;
                    total += vds[vdKeys[j]][x][2]*1;
                    eventCount++;
                }
            } else {
                return total //break iteration and return total
            }
        }
    }
    return total
};


 var maxValue2 = function(events, k) {
    let total = 0;
    // Greedy:
    // 1. Value
    // 2. Value density
    // (3. duration)
    let vals = {}; // hash for val den, {vd:[[start1,end1], [start2,end2],...]}
    // Allocate based on max value 
    // Value density = Value / (stop - start)
    let val = 0;
    for (let i=0;i<events.length;i++){
        val = events[i][2];
        if (vals[val]!=undefined){
            vals[val].push([events[i][0],events[i][1]]);
            console.log("repeated");
        } else {
            console.log(`val: ${val}`);
            vals[val]=[[events[i][0],events[i][1]]];
        }
    }
    let valKeys = Object.keys(vals).sort((a,b)=>(b-a));
    let eventCount = 0;
    let days = []; // occupied days - [start1, end1, start2, end2,...]
    const updateDays = (globalDays,start,end)=>{
        let newDays = [...globalDays];
        if (newDays.length==0){ // when this is the first event
            newDays.push(start,end)
            console.log(`flag1, newDays:${newDays}`)
            return newDays;
        } else { // determine whether the current event clashed with any existing events
            for (let e=0;e<newDays.length/2;e++){
                eStart = newDays[2*e]; // current start
                eEnd = newDays[2*e+1]; // current end
				console.log(`start,end,eStart,eEnd: ${start}, ${end}, ${eStart}, ${eEnd}`)
                if ((start>=eStart && start<=eEnd) || (end>=eStart && end<=eEnd)){ // new start falls into current event or new end falls into current event
                    console.log(`flag2a, newDays:${newDays}`)
                    return newDays
                } else if ((start<=eStart && end>=eEnd)){ // new Event spread longer than the current Event 
                    console.log(`flag2b, newDays:${newDays}`)
                    return newDays
                } else if (start<eStart && end<eStart) { // insert before current event
                    newDays = newDays.slice(0,2*e).concat(start,end).concat(newDays.slice(2*e))
                    console.log(`flag3, newDays:${newDays}`)
                    return newDays
                }
            }
            newDays.push(start,end) // later than all occupied days, to be added at the end of the array
            console.log(`flag4, newDays:${newDays}`)
            return newDays;
        }
    }
    for (let j=0;j<valKeys.length;j++){
        vals[valKeys[j]] = vals[valKeys[j]].sort((a,b)=>(a[1]-a[0]-b[1]+b[0])) // sort each event array by increasing duration
        let newDays = [];
        for (let x=0;x<vals[valKeys[j]].length;x++){
            if (eventCount<k){
                console.log(`days before: ${days}`)
                newDays = updateDays(days,vals[valKeys[j]][x][0],vals[valKeys[j]][x][1])
                console.log(`days after: ${days}`)
                console.log(`newDays: ${newDays}`)
                if (days.length<newDays.length){
                    days = newDays;
                    total += valKeys[j]*1;
                    eventCount++;
                }
            } else {
                return total //break iteration and return total
            }
        }
    }
    return total
};

const findCombo = (eventArr, target) => {  // for verifying the answer in the test
    /*
    // use recursion to find which combo sums up to be the "target"
    if (target<0){
        return undefined
    } else {
        for (let i=eventArr.length-1;i>=0;i++){
            if (eventArr[i])
        } 
    }
    */
   // dynamic programming, store sum as hash
    let sumList = {};    // {sum1:[val1,val2,...], sum2:[val1,val4,...],...}
    let sumKeys = [];
    for (let i=0;i<eventArr.length;i++){
        let val = eventArr[i][2]*1;
        if (val==target) return [val];
        if (sumList[target-val]!=undefined){
            return sumList[target-val].concat(val)
        } else {
            sumKeys = Object.keys(sumList);
            let valX = 0
            for (let x=0;x<sumKeys.length;x++){
                valX = sumKeys[x]*1;
                console.log(target)
                if ((val+valX)==target){
                    return sumList[valX].concat(val)
                } else if ((val+valX)<target) {
                    sumList[val+valX] = sumList[valX].concat(val)
                }
                console.log(sumList)
            }
        }
        sumList[val] = [val]
    }
    return [];

    
}

var maxValue3 = function(events, k) { // using time sequence approach
    // 1. either attend this event and take the value
    // 2. or skip this event, keep total value unchanged and consider the next immediate event
    let eventHash = {};
    let sortFn = (a,b)=>{
        if (a[0]!=b[0]){
            return (a[0]*1-b[0]*1)
        } else {
            return (a[1]*1-b[1]*1)
        }
    }
    let e = events.sort((sortFn)) // sort event list in ascending start time
    console.log(e);
    const nextEvent = (currentEvent)=>{
        const biFindNext = (targetDate, start, end)=>{ //targetdate being the end date of that event
            if (start==end) {
                if (start==e.length-1) return [] // not found
                console.log(`e[start]:${e[start]}`)
                return e[start]
            }
            let n = Math.floor((start+end)/2)
            // 1, 2, 5, 6, 7, 10, 34, 35, 35, 36 #35
            if (e[n][0]>targetDate){ 
                return biFindNext(targetDate,start,n)
            } else {
                return biFindNext(targetDate,n+1,end)
            }
        }
        return biFindNext(currentEvent[1],0,e.length-1)
        // return []
    }
    const altEvent = (currentEvent)=>{
        let n = e.indexOf(currentEvent)*1
        console.log(`alt - n:${n}`)
        if (n>=0 && n<(e.length*1-1)) {
            return e[n+1]
        }
        return []
    }
    const solve = (cur,count)=>{ //input: event, output: value
        // find out the value of the chain of choice starting from this current event
        if (eventHash[cur.concat(count)]!=undefined){
            return eventHash[cur.concat(count)].value
        }
        if (cur.length==0 || count<=0) return 0
        let next = nextEvent(cur);
        let alt = altEvent(cur);
        if (eventHash[next.concat(count-1)]===undefined) {
            eventHash[next.concat(count-1)].value = solve(next,count-1)
            // eventHash[next.concat(count-1)][chain] = cur.concat(next)
        }
        if (eventHash[alt.concat(count)]===undefined) {
            eventHash[alt.concat(count)].value = solve(alt,count)
            // eventHash[alt.concat(count)][chain] = alt
        }
        if (eventHash[next.concat(count-1)].value>=eventHash[alt.concat(count)].value){
            eventHash[cur.concat(count)].chain = eventHash[next.concat(count-1)].chain.concat(cur)
            console.log(eventHash)
            return eventHash[next.concat(count-1)].value
        } else {
            eventHash[cur.concat(count)].chain = eventHash[alt.concat(count)].chain
            console.log(eventHash)
            return eventHash[alt.concat(count)].value
        }
        // return Math.max(cur[2]+eventHash[next.concat(count-1)], eventHash[alt.concat(count)])
    }
    return Math.max(solve(e[0],k),solve(altEvent(e[0]),k))
}

let tEvents = [[1,2,4],[3,4,3],[2,3,1]] //2, 7
tEvents = [[1,1,1],[2,2,2],[3,3,3],[4,4,4]] //3, 9
tEvents = [[30,40,34],[6,11,6],[60,81,36]] //1, 36
tEvents = [[69,83,61],[44,90,19],[26,87,9]] //3, 61
tEvents = [[31,57,53],[5,63,29],[54,57,32],[55,83,28],[25,64,5],[5,33,33],[32,68,27],[30,99,54]] //4, 65
tEvents = [[3,68,97],[12,46,13],[21,24,75],[64,85,74],[10,98,15],[23,84,62],[87,96,29],[80,85,39],[52,89,77],[31,63,91],[29,40,48],[30,96,42],[69,81,68],[52,58,65],[41,52,37]]
// 10, 291, [97, 13, 75, 15, 62, 29]
// cf 256 [13, 75, 62, 29, 77]
// cf 262 [97, 15, 13, 75, 62]
// [[3, 68, 97], [10, 98, 15], [12, 46, 13], [21, 24, 75], [23, 84, 62], [29, 40, 48], [30, 96, 42], [31, 63, 91], [41, 52, 37], [52, 58, 65], [52, 89, 77], [64, 85, 74], [69, 81, 68], [80, 85, 39], [87, 96, 29]]




let tk = 3
tk=4
let a = performance.now();
console.log(maxValue(tEvents,tk));
let b = performance.now();
console.log(`It took ${b-a} ms`);