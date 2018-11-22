/*
 * This should be copied from the index.html file.
 */

window.botRoot = document.location.toString().split("/").slice(0, -1).join("/") + "/"; 
var script = document.createElement("script"); 
script.src = botRoot + "load-bot.js"; 
document.head.appendChild(script);

/*
 * Interface for the test platform.
 */

function game_start() {
  console.log("test: game_start");
}

