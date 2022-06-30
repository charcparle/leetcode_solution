const solution = (n, m) => {
  // console.log(m.toString(2));
  // console.log((-n).toString(2));
  // console.log((-m).toString(2));
  // console.log((n ^ m).toString(2));
  // console.log(n ^ m);
  // console.log((-(n ^ m)).toString(2));
  // console.log(-(n ^ m));
  // console.log(((n ^ m) & -(n ^ m)).toString(2));
  console.log("n");
  console.log(full32UInt(n));
  console.log("m");
  console.log(full32UInt(m));
  console.log("-n");
  console.log(full32UInt(-n));
  console.log("-m");
  console.log(full32UInt(-m));
  console.log("n^m");
  console.log(full32UInt(n ^ m));
  console.log("-(n^m)");
  console.log(full32UInt(-(n ^ m)));
  console.log("(n ^ m) & -(n ^ m)");
  console.log(full32UInt((n ^ m) & -(n ^ m)));
  //   console.log("n&m");
  //   console.log(full32UInt(n & m));
  console.log("~m");
  console.log(full32UInt(~m));
  console.log("n^~m");
  console.log(full32UInt(n ^ ~m));
  console.log("-(n^~m)");
  console.log(full32UInt(-(n ^ ~m)));
  console.log("(n^~m)&-(n^~m)"); // this one finds out the position of first equal bit
  console.log(full32UInt((n ^ ~m) & -(n ^ ~m)));
  console.log("(n^~m)>>1");
  console.log(full32UInt((n ^ ~m) >> 1));
  console.log("(n^~m)&((n^~m)>>1)"); // this one finds out the position of first consecutive two equal bits
  console.log(full32UInt((n ^ ~m) & ((n ^ ~m) >> 1)));
  console.log("-((n^~m)&((n^~m)>>1))");
  console.log(full32UInt(-((n ^ ~m) & ((n ^ ~m) >> 1))));
};
const full32UInt = (n) => {
  let full = "";
  if (n < 0) {
    const fullArr = (-n - 1).toString(2).split("");
    for (let bit of fullArr) {
      full = full + (bit === "1" ? "0" : "1");
    }
  } else {
    full = Math.abs(n).toString(2);
  }
  len = full.length;
  for (let i = 1; i < 32 - len; i++) {
    full = (n < 0 ? "1" : "0") + full;
  }
  return full;
};

// solution(9,15)
// solution(13,15)
// solution(1, -1);
// solution(parseInt("10101", 2), parseInt("10111", 2));
solution(895, 928);
// console.log((-14).toString(2))
