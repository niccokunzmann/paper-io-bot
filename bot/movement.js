
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
var _botMovementPromiseResolve;
var _botMovementPromise;
function continueExecutionAfterWaitingForMovement() {
  oldPromiseResolve = _botMovementPromiseResolve;
  _botMovementPromise = new Promise(function(resolve){
    _botMovementPromiseResolve = resolve;
  });
  oldPromiseResolve(botCurrentDirection);
}

async function awaitMovement() {
  var direction = await _botMovementPromise();
}



/* Initialize the movement once.
 * 
 */
function botInitilizeMovementGlobally() {
  var x0 = p1_x;
  var y0 = p1_y;
  var id = setInterval(function() {
    if (p1_x == x0 && p1_y == y0) {
      return; // not moved
    }
    if (p1_y - 1 == y0) {
      botCurrentDirection = "north";
    } else if (p1_y + 1 == y0) {
      botCurrentDirection = "south";
    } else if (p1_x - 1 == x0) {
      botCurrentDirection = "west";
    } else if (p1_x + 1 == x0) {
      botCurrentDirection = "east";
    } else {
      return;
    }
    continueExecutionAfterWaitingForMovement();
  }, 5);
}

// char codes from https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
var directionToCharCode = {
  north: 38,
  south: 40,
  east: 39,
  west: 37,
}

/* Turns the player in a direction if possible.
 * Called by the bot_turn block.
 * direction is "north", "south", "east", "west", "left", "right"
 *
 */
function botMoveInto(direction) {
  // TODO: add left and right
  var charCode = directionToCharCode[direction];
  // trigger keydown event from https://stackoverflow.com/a/5920206
  if ($) {
    $.event.trigger({ type : 'keydown', which : charCode });
  } else {
    console.log("test mode: " + direction)
  }
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


