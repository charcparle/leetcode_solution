/* 
The question is one of the challenges in the CodeSignal pratice assessment
Presented on 2022-05-28
I didn't finish this question
*/

/* 
Given a two-dimensional array: segments[[a,b],[c,d],[f,g],..]
each segment [a,b] represents a segment from a to b (both integers)
Find out the minimum number of points such that all segments contain at least one point
"Contain x" meaning a<x<b
*/

const solution = (segments) => {
  //  At most we need one point for each segment
  let count = segments.length;

  // Min. number of points = min no. of overlapped segments
  let l = segments[0][0];
  let r = segments[0][1];
  let points = { 0: [l, r] };
  const overlapped = (s1, s2) => {
    // if max(l1,l2)>=min(r1,r2) then no overlap
    if (Math.max(s1[0], s2[0]) >= Math.min(s1[1], s2[1])) return false;
    else return true;
  };
  for (let i = 1; i < segments.length; i++) {
    let seg = segments[i];
    let addPt = true;
    for (let pt of Object.keys(points)) {
      if (overlapped(seg, points[pt])) {
        l = Math.max(seg[0], points[pt][0]);
        r = Math.min(seg[1], points[pt][1]);
        points[pt] = [l, r];
        addPt = false;
      }
    }
    if (addPt) points[i] = seg;
    console.log(points);
  }
  count = Object.keys(points).length;
  return count;
};
let test = [
  [1, 5],
  [4, 7],
  [15, 20],
  [13, 17],
  [21, 25],
  [12, 18],
];

test = [
    [1, 5],
    [4, 7],
    [15, 20],
    [13, 17],
    [2, 25],
    [1, 18],
  ];

test = [
    [1,20],
    [3,8],
    [9,14],
    [5,12]
]

console.log(solution(test));
/* 
1234567890
----------
1---5
+++++
   *
   4--7
   ++++
              15--20
              ++++++
              *
            13-17
            +++++   
           12---18
           +++++++
                    21-25
                    +++++
                    *

*/

/* 
for (l1,r1) and (l2,r2)
l1<l2<r1 or l1<r2<r1 => overlapped

if l1>l2 && l1<r2 then overlapped
if l1===l2, then must be overlapped
if l1<l2, r1>l2, then must be overlapped

if max(l1,l2)>=min(r1,r2) then no overlap
*/
