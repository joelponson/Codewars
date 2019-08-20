/**
* Function return an array of all combination's sum by calling
* recursively the function 'comb'. We have initialized a function and 
* assign it to a variable, its not executing the function and assigning the result.
* When 'comb' equal 0 (size of array equal comb), it sum value of array, and push it
* in arrayComb
* @param k
* @param newArray
* @return {array}
*/
function findCombinations(newArray, k) {
    let arrLength = newArray.length;
    let array = [];
    let cbn = [];
    let combinations = function(start, comb) {
      if (comb === 0) {
        array.push(sumCombinations(cbn));
      } else {
        for (let index = start; index <= arrLength - comb; ++index) {
          cbn.push(newArray[index]);
          combinations(index + 1, comb - 1);
          cbn.pop();
        }
      }
    }
    combinations(0, k);
    return array.sort(function (a, b) {
      return a - b;
    });
  }
  
  /**
  * Function check of data in the given array and delete date if
  * is not a number or equal 0
  * @param arr
  * @return {array}
  */
  function checkArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 0 || Number.isNaN(arr[i])) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }
  
  /**
  * Function make the sum of values of the array
  * @param arr
  * @return {number}
  */
  function sumCombinations(arr) {
    let sum = 0;
    arr.forEach(element => {
      sum += element;
    });
    return sum;
  }
  
  /**
  * Function that return the best sum combination
  * @param t
  * @param k
  * @param ls
  * @return {number}
  */
  function chooseBestSum(t, k, ls) {
    let answer = null;
    checkArray(ls);
    if (ls.length === 0 || ls.length < k) {
      return null;
    } else {
      let arrayComb = findCombinations(ls, k);
      arrayComb.forEach(element => {
        if (element <= t) {
          answer = element;
        }
      });
      return answer;
    }
  }