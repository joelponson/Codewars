const vowels = ["a", "e", "i", "o", "u"];

/**
 * Count the number of vowels in given sting
 * @param str
 * @return {number}
 */
function getCount(str) {
    var vowelsCount = 0;
    var isValid = checkIsValid(str);
    var isString = checkIsString(str);
    
    if (isValid && isString) {
        cleanGarbage([isValid, isString]);
        for (var letter of str.toLowerCase()){
            if (vowels.includes(letter)) {
                vowelsCount++
            }
        }
        return vowelsCount;
    } else {
        cleanGarbage([isValid, isString]);
        return "Not valid";
    }
}

/**
 * Check if the value given is a string
 * @param value 
 * @return {boolean}
 */
function checkIsString(value) {
    if (typeof value == 'string' || value instanceof String) {
        return true;
    }
    return false;
}

/**
 * Check if the value given is not empty, null, undefined or zero
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
 * Cleans up unwanted variables and frees memory
 * @param garbage
 * @return {null}
 */
function cleanGarbage(garbages) {
    for(var i= 0; i < garbages.length; i++) {
        garbages[i] = null;
    }
}