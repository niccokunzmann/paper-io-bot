/*
 * Load the workspace.
 */

(function () {
  var workspaceElement;

  function createBlocklyArea() {
    // choose the tools for the bot
    // see 
    var toolbox = '<xml>';
    toolbox += '  <block type="controls_if"></block>';
    toolbox += '  <block type="controls_whileUntil"></block>';
    toolbox += '</xml>';

    // create the elements we use to show blockly
    workspaceElement = document.createElement("div");
    workspaceElement.id = "blocklyWorkspace";
    //workspaceElement.classList.add("workspaceArea");
    document.body.appendChild(workspaceElement);

    workspaceArea = document.createElement("div");
    workspaceArea.id = "blocklyArea";
    workspaceArea.classList.add("workspaceArea");
    document.body.appendChild(workspaceArea);

    // create a resizable blockly area
    // see https://developers.google.com/blockly/guides/configure/web/resizable
    var blocklyArea = workspaceArea;
    var blocklyDiv = workspaceElement;
    var workspace = Blockly.inject(blocklyDiv, {toolbox: toolbox});
    var onresize = function(e) {
      // Compute the absolute coordinates and dimensions of blocklyArea.
      var element = blocklyArea;
      var x = 0;
      var y = 0;
      do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
      } while (element);
      // Position blocklyDiv over blocklyArea.
      blocklyDiv.style.left = x + 'px';
      blocklyDiv.style.top = y + 'px';
      blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
      blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
      Blockly.svgResize(workspace);
    };
    window.addEventListener('resize', onresize, false);
    onresize();
    Blockly.svgResize(workspace);
    setTimeout(onresize, 1);
  }

  function createOpenAndClose() {
    var openClose = document.createElement("a");
    openClose.id = "openClose";
    openClose.innerText = "Bot";
    document.body.appendChild(openClose);

    openClose.onclick = function () {
      workspaceElement.classList.toggle("hidden");
      openClose.classList.toggle("selected");
    }
  }
  
  createBlocklyArea();
  createOpenAndClose();
})();

