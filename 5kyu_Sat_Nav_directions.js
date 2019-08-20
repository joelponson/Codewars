//Constant for cardinal direction
const N = "NORTH";
const S = "SOUTH";
const E = "EAST";
const W = "WEST";
//Constant for Left/Right direction
const L = "LEFT";
const R = "RIGHT";

//Regex for Go straight wich not modify the direction of the vector
const regexMeters = /[0-9]{1,3}m/gi;
const regexKilometers = /[0-9]{1}[.][0-9]{1}km/gi;

//Regex for Turn around wich invert the direction of the vector
const regexTurnAround = /around!/gi;

/**
* Function wich return the final coordinates of destination. This function initialize the direction vector, and change this direction
* foreach line. We use The Chasles Relations to get the result.
* @param {Array} directions
* @return {Array}
*/
function satNav(directions) {
  //Always start to coordinates [0, 0]
  xCoordinate = 0;
  yCoordinate = 0;

  //If array directions is empty or just contain cardinal and arrive destination, we don't move, so return start coordinates
  if (directions.length <= 2) {
    return [xCoordinate, yCoordinate];
  }

  //Get the first element of array to initialize the first vector
  initializeDirectionVector(directions.shift());
  //Last value of array is not useful
  directions.pop();

  let arrLength = directions.length;
  for (let index = 0; index < arrLength; ++index) {
    let instructionSplit = directions[index].split(" ");
    let lenghtVector = getLengthVector(instructionSplit);
    move(instructionSplit, lenghtVector);
  }
  return scaleCoordinates(xCoordinate, yCoordinate);
}

/**
 * Function that take the firt command to initialize direction
 * @param {Array} arr 
 */
function initializeDirectionVector(arr) {
  let cardinal = arr.split(" ").last();
  if (cardinal === N) {
    xDirectionVector = 0;
    yDirectionVector = 1;
  } else if (cardinal === S) {
    xDirectionVector = 0;
    yDirectionVector = -1;
  } else if (cardinal === E) {
    xDirectionVector = 1;
    yDirectionVector = 0;
  } else {
    xDirectionVector = -1;
    yDirectionVector = 0;
  }
}

/**
 * Function that returns the length of the vector
 * @param {Array} arr 
 */
function getLengthVector(arr) {
  let lenght;
  let statusBloc = getStatusBloc();
  // LEFT or RIGHT on NEXT
  if (arr.beforeLast() === "NEXT") {
    lenght = statusBloc === 0 ? 1000 : statusBloc;
  }
  // CONTINUE IN METER
  else if (arr.last().match(regexMeters)) {
    lenght = Number(arr.last().substring(0, arr.last().length - 1));
  }
  // CONTINUE IN KM 
  else if (arr.last().match(regexKilometers)) {
    lenght = Number(arr.last().substring(0, arr.last().length - 2)*1000);
  }
  // Turn Around 
  else if (arr.last().match(regexTurnAround)) {
    lenght = 0;
  }
  // LEFT or RIGHT at 2nd,3rd,4th,5th,...
  else {
    let number = Number(arr.beforeLast().substring(0, arr.beforeLast().length - 2)*1000);
    lenght = statusBloc === 0 ? number : (number - 1000 + statusBloc);
  }
  return lenght;
}

/**
* Function return the status bloc : if we are to an intersection, or not, and how many distance is missing to go to the next
* @param {Number} direction
*/
function getStatusBloc() {
  let status = 0;
  if (xDirectionVector === 0) {
    status = getDirection(yDirectionVector, yCoordinate);
  } else {
    status = getDirection(xDirectionVector, xCoordinate);
  }
  return status;
}

/**
 * Function that returns the distance remaining to go to the next intersection (in the corresponding direction)
 * @param {Number} direction 
 * @param {Number} coordinate 
 */
function getDirection(direction, coordinate) {
  let result = 0;
  if (coordinate === 0) {
    result = Math.abs(coordinate)%1000;
  } else if ((direction > 0 && coordinate > 0) || (direction < 0 && coordinate < 0)) {
    result = 1000 - Math.abs(coordinate)%1000;
  } else {
    result = 1000 - (1000 - Math.abs(coordinate)%1000);
  }
  return result;
}

/**
 * Function that deals with the movement according to an orientation, a direction and a length.
 * @param {Array} instruction 
 * @param {Number} lenghtVector 
 */
function move(instruction, lenghtVector) {
  let update = instruction.last();
  if (xDirectionVector === 0) {
    yCoordinate += lenghtVector*yDirectionVector;
  } else {
    xCoordinate += lenghtVector*xDirectionVector;
  }
  updateDirectionVector(xDirectionVector, yDirectionVector, update);
}

/**
 * Function that updates the direction of the vector.
 * We look at the current direction, and if we go to the right or left, we can update the orientation.
 * @param {Number} xVector => yDirectionVector
 * @param {Number} yVector => xDirectionVector
 * @param {String} turn => last word in string, this is the command
 */
function updateDirectionVector(xVector, yVector, turn) {
  //No change direction or Turn Around
  if (turn !== L && turn !== R) {
    if (turn.match(regexTurnAround)) {
      xDirectionVector = -xDirectionVector;
      yDirectionVector = -yDirectionVector;
    }
  }
  //NORTH
  else if (xVector === 0 && yVector === 1) {
    if (turn === L) {
      xDirectionVector = -1;
      yDirectionVector = 0;
    } else {
      xDirectionVector = 1;
      yDirectionVector = 0;
    }
  }
  //SOUTH
  else if (xVector === 0 && yVector === -1) {
    if (turn === L) {
      xDirectionVector = 1;
      yDirectionVector = 0;
    } else {
      xDirectionVector = -1;
      yDirectionVector = 0;
    }
  }
  //WEST
  else if (xVector === -1 && yVector === 0) {
    if (turn === L) {
      xDirectionVector = 0;
      yDirectionVector = -1;
    } else {
      xDirectionVector = 0;
      yDirectionVector = 1;
    }
  }
  //EAST
  else {
    if (turn === L) {
      xDirectionVector = 0;
      yDirectionVector = 1;
    } else {
      xDirectionVector = 0;
      yDirectionVector = -1;
    }
  }
}

/**
* Function that allows to match with the benchmark scale
* Divide by 100 : divide by 1000 to convert meters to kilometers and multiply by 10
* @param {Number} x
* @param {Number} y
*/
function scaleCoordinates(x, y) {
  xCoordinate = x/100;
  yCoordinate = y/100;
  return [xCoordinate, yCoordinate];
}

/**
* Add method to Array to get the last value
*/
Array.prototype.last = function() {
  return this[this.length - 1];
}

/**
* Add methode to Array to get the beforeLast value
*/
Array.prototype.beforeLast = function() {
  return this[this.length - 2];
}