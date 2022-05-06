// 149. Max Points on a Line
// https://leetcode.com/problems/max-points-on-a-line/
/**
 * @param {number[][]} points
 * @return {number}
 */
//let testCase = [[0,1],[0,0],[0,4],[0,-2],[0,-1],[0,3],[0,-4]]
//console.log(maxPoints(testCase))
var maxPoints = function(points) {
    // forming a line means that the points can be fitted with the same gradient
    // and sharing the same y-intercept
    let maxPt = 1;
    for (let i=0;i<points.length;i++){
    	let lines={};
        for (let j=i+1;j<points.length;j++){        	
           let m = (points[i][1]-points[j][1])/(points[i][0]-points[j][0])
           if (m===-Infinity) m=Infinity
           if (lines[m]==undefined) {
               lines[m] = 2
           } else {
               lines[m]+=1;
           }
           if (lines[m]>maxPt) {
               maxPt = lines[m]
           }
        }
    }
    return maxPt
};