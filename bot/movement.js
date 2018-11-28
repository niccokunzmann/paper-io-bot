
var botCurrentDirection; // direction of the player


/* Called when the game starts. Initializes the directions and movement.
 *
 */ 
function botInitilizeMovement() {
  botCurrentDirection = "north";
  botInitilizeMovementGlobally();
  botInitilizeMovementGlobally = function() {
    console.log("botInitilizeMovementGlobally() already intialized.")
  };
}


/* After one is waiting for the movement, the promise is resolved.
 * This function is not threadsafe and should only be used within the
 * globally started movement thread.
 */
var _botMovementPromiseResolve = function(){};
var _botMovementPromise;
function continueExecutionAfterWaitingForMovement() {
  oldPromiseResolve = _botMovementPromiseResolve;
  _botMovementPromise = new Promise(function(resolve){
    _botMovementPromiseResolve = resolve;
    oldPromiseResolve(botCurrentDirection);
  });
}

async function awaitMovement() {
  var direction = await _botMovementPromise;
}



/* Initialize the movement once.
 * 
 */
function botInitilizeMovementGlobally() {
  var x0 = p1_x;
  var y0 = p1_y;
  continueExecutionAfterWaitingForMovement();
  var id = setInterval(function() {
    if (p1_x == x0 && p1_y == y0) {
      return; // not moved
    }
    if (p1_y < y0) {
      botCurrentDirection = "north";
    } else if (p1_y > y0) {
      botCurrentDirection = "south";
    } else if (p1_x < x0) {
      botCurrentDirection = "west";
    } else if (p1_x > x0) {
      botCurrentDirection = "east";
    } else {
      console.log("movement.js: player movement started.");
    }
    continueExecutionAfterWaitingForMovement();
    x0 = p1_x;
    y0 = p1_y;
  }, 5);
}

// char codes from https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
var directionToCharCode = {
  north: 38,
  south: 40,
  east: 39,
  west: 37,
}

function leftOf(direction) {
  if (direction == "north") {
    return "west";
  } else if (direction == "west") {
    return "south";
  } else if (direction == "south") {
    return "east";
  } else {
    return "north";
  }
}

function rightOf(direction) {
  return leftOf(leftOf(leftOf(direction)));
}

function oppositeOf(direction) {
  return leftOf(leftOf(direction));
}

/* Turns the player in a direction if possible.
 * Called by the bot_turn block.
 * direction is "north", "south", "east", "west"
 *
 */
function botMoveInto(direction) {
  var charCode = directionToCharCode[direction];
  // trigger keydown event from https://stackoverflow.com/a/5920206
  if (window["$"] == undefined) {
    console.log("test mode: " + direction);
    return;
  }
  $.event.trigger({ type : 'keydown', which : charCode });
}

/* Waits for the player to move one step.
 *
 */
async function botWaitForMove() {
  var startId = botTurn;
  await awaitMovement();
  if (startId != botTurn) {
    throw "WaitMoveStop " + startId;
  }
}

function getCurrentPosition() {
  return {x:p1_x, y:p1_y};
}

function positionInDirection(direction) {
  var here = getCurrentPosition();
  if (direction == "west") {
    return {x: here.x - 1, y: here.y};
  } else if (direction == "south") {
    return {x: here.x, y: here.y + 1};
  } else if (direction == "east") {
    return {x: here.x + 1, y: here.y};
  } else /* north */ {
    return {x: here.x, y: here.y - 1};
  }
}
