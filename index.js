
function fillCode() {
  var element = document.getElementById("source");
  var location = "" + document.location;
  element.innerText = 
    "window.botRoot = \"" + location + "\"; \n" + 
    "var script = document.createElement(\"script\"); \n" + 
    "script.src = botRoot + \"load-bot.js\" + \"?version=\" + new Date().getTime(); \n" + 
    "document.head.appendChild(script);";
}

window.addEventListener("load", fillCode)

