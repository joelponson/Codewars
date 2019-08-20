/**
 * Find the outlier in the array
 * @param array
 * @return {number}
 */
function findOutlier(array) {
    if (checkIsValidArray(array)) {
        var parity = firstThreeParity(array);
        for (var i = 0; i < array.length; i++) {
            if (checkIsValid(array[i]) && checkIsNumber(array[i]) && checkIsInteger(array[i])) {
              if (array[i] % 2 === parity) {
                return array[i];
              }
            }
        }
        return "Not valid";
    }
    return "Not valid";
}

/**
 * Takes the first three numbers of the array to find out if we are looking for an odd or even number
 * @param array 
 * @return {boolean} return 1 if the outlier is odd, and 0 if is even
 */
function firstThreeParity(array) {
    return (Math.abs(array[0]%2) + Math.abs(array[1]%2) + Math.abs(array[2]%2)) < 2 ? 1 : 0;
}

/**
 * Check if the array given is an array : not empty, null or undefined
 * @param array 
 * @return {boolean}
 */
function checkIsValidArray(array) {
    if (Array.isArray(array) && array && array.length && array.length >= 3){
        return true;
    }
    return false;
}

/**
 * Check if the value given is not empty, null or undefined
 * @param value 
 * @return {boolean}
 */
function checkIsValid(value) {
    if (value || value === 0){
        return true;
    }
    return false;
}

/**
 * Check if the value given is a number
 * @param value 
 * @return {boolean}
 */
function checkIsNumber(value) {
    return !Number.isNaN(value);
}

/**
 * Check if the value given is an integer
 * @param value
 * @return {boolean}
 */
function checkIsInteger(value) {
    return Number.isInteger(value);
}