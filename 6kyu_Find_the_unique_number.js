/**
 * Function return the unique different number in an array
 * Sort the array, compare first and second element : if first element is different from the second
 * return this element, else return the last element of array
 * @param {Array} arr 
 */
function findUniq(arr) {
    arr.sort();
    return (arr[0] !== arr[1]) ?  arr[0] : arr.pop();
}