/*
 * Load the workspace.
 */

(function () {
  var openClose = document.createElement("a");
  openClose.id = "openClose";
  openClose.innerText = "Bot";
  document.body.appendChild(openClose);
  
  var workspaceElement = document.createElement("div");
  workspaceElement.id = "blocklyWorkspace";
  document.body.appendChild(workspaceElement);

  openClose.onclick = function () {
    workspaceElement.classList.toggle("hidden");
    openClose.classList.toggle("selected");
  }
})();

