/**
 * Say if the number given is even or odd
 * @param number
 * @return {string} 
 */
function evenOrOdd(number) {
    var isValid = checkIsValid(number);
    var isNumber = checkIsNumber(number);
    var isInteger = checkIsInteger(number);
    var isEven = checkIsEven(number);
  
    if (isValid && isNumber && isInteger) {
        cleanGarbage([isValid, isNumber, isInteger]);
        if (isEven) {
            cleanGarbage([isEven]);
            return "Even";
        }
        else {
            return "Odd";
        }
    } 
    else {
        return "Not valid";
    }
}

/**
 * Check if the value given is not empty, null or undefined
 * @param value 
 * @return {boolean}
 */
function checkIsValid(value) {
    if (!value){
        return false;
    }
    return true;
}

/**
 * Check if the value given is a number
 * @param value 
 * @return {boolean}
 */
function checkIsNumber(value) {
    return Number.isNaN(value);
}

/**
 * Check if the value given is an integer
 * @param value
 * @return {boolean}
 */
function checkIsInteger(value) {
    return Number.isInteger(value);
}

/**
 * Check if the number given is even
 * @param number
 * @return {boolean}
 */
function checkIsEven(number) {
    return Math.abs(number % 2) === 0;
}

/**
 * Cleans up unwanted variables and frees memory
 * @param garbage
 * @return {null}
 */
function cleanGarbage(garbages) {
    for(var i= 0; i < garbages.length; i++) {
        garbages[i] = null;
    }
}