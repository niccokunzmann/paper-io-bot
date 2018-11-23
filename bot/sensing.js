/*
 * Functions called by the sensing block.
 */

function botSenseAnyAt(owners, fieldAtIsFunctions, positions) {
  /*
   * Example: botCheckPath({x: 1, y: 2}, botClassifyMy)
   */
  return positions.some(function(position){
    return fieldAtIsFunctions.some(function(fieldAtIs) {
      return owners.some(function(owner) {
        return fieldAtIs(position, owner);
      });
    });
  });
}

/* Check the boundaries of the playground */
function isInside(position) {
  return 0 <= position.x && position.x < playground.length && 0 <= position.y && position.y < playground[0].length;    
}

/* Check the existence of a certain player it a position. */
function botCheckPath(position, check) {
  if (!isInside(position)) {
    return false;
  }
  var owner = playpaths[position.x][position.y];
  return check(owner);
}
function botCheckArea(position, check) {
  if (!isInside(position)) {
    return false;
  }
  var owner = playground[position.x][position.y];
  return check(owner);
}
function botCheckWall(position, check) {
  return !isInside(position);
}

/* Classify the player. */
function botClassifyMy(owner) {
  return owner == "p1";
}
function botClassifyEnemy(owner) {
  return owner != "p1" && owner != 0;
}
function botClassifyNone(owner) {
  return owner == 0;
}

/* player names */
function botGetPlayerNames() {
  var names = [];
  var i = 1; // seems like p0 is always absent
  var playerExists = false;
  while (names.length == 0 || playerExists) {
    var playerName = "p" + i;
    playerExists = window[playerName + "_x"] != undefined;
    if (playerExists) {
      names.push(playerName);
    }
    i++;
  }
  return names;
}

