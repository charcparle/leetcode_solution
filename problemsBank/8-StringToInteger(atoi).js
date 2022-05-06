// 8. String to Integer (atoi) 
// https://leetcode.com/problems/string-to-integer-atoi/
/**
 * @param {string} s
 * @return {number}
 */
 var myAtoi = function(s) {
    //let nd=/\D/
    let bag='';
    //let sign=0;
    const outFn = (bag)=>{
        //console.log(`bag: ${bag}`)
        //console.log(`inside OutFn, sign:${sign}`)
        //if (sign==0) sign=1;
        let output=bag*1;
        if (!output) output=0;
        if (output<-(2**31)) {
            output = -(2**31)
        } else if (output>(2**31-1)) {
            output = 2**31-1
        }
        //console.log(output)
        return output
    }
    let r=/^\s*[\+\-]?\d*/g
    bag = s.match(r)[0].trim();
    //console.log(bag)
    return outFn(bag)
    /*
    for (let i=0;i<s.length;i++){
        console.log(`i: ${i}`)
        if (bag.length==0 && sign==0 && s[i]==' '){ //determine whether space is leading
            
        } else if (s[i]=='+' || s[i]=='-'){
            if (sign==0 && bag.length==0){
                if(s[i]=='+') sign=1;
                if(s[i]=='-') sign=-1;
            } else {
                return outFn(bag,sign)
            }
        } else if (nd.test(s[i])){ //when current character is non-digit
            // stop loop
            return outFn(bag, sign)
        } else {
            //if (bag.length!=0 || s[i]!="0") 
            bag= bag.concat(s[i])
        }

    }

    return outFn(bag,sign)
    */
};