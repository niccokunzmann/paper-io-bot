
function fillCode() {
  var element = document.getElementById("source");
  var location = "" + document.location;
  element.innerText = "var window.botRoot = \"" + location + "\"; \nvar script = document.createElement(\"script\"); \nscript.src = location + \"load-bot.js\"; \ndocument.head.appendChild(script);";
}

window.addEventListener("load", fillCode)

