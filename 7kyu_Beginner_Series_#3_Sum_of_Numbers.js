function GetSum(a, b) {
  if (a === b) {
    return a;
  } else if (a < b) {
    let sum = 0;
    for (var i = a; i <= b; i++) {
      sum += i;
    }
    return sum;
  } else {
    let sum = 0;
    for (var i = b; i <= a; i++) {
      sum += i;
    }
    return sum;
  }
}