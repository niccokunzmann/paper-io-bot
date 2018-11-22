/*
 * Load the workspace.
 */
 
var game_start_original; // global variable for loading the bot scripts several times.
var botTurn; // currently running number
var botStop; // function to stop the bot
var LoopTrap; // count to break infinite loops

setTimeout(function () {
  var workspaceElement;
  var workspace;

  function createBlocklyArea() {
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
    workspace = Blockly.inject(blocklyDiv,
      {toolbox: toolbox} // from toolbox.js
    );
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
    openClose.classList.add("floatingButton");
    openClose.innerText = "Bot";
    document.body.appendChild(openClose);

    openClose.onclick = function () {
      workspaceElement.classList.toggle("hidden");
      openClose.classList.toggle("selected");
    }
  }
  
  function runCode() {
    // see https://developers.google.com/blockly/guides/app-integration/running-javascript

    // highlight the currently executing block
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');
    function highlightBlock(id) {
      workspace.highlightBlock(id);
    }
    // avoid infinite loops
    LoopTrap = 100000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(window.botTurn != ' + botTurn + ') throw "Stop Bot ' + botTurn + '";\nif(--window.LoopTrap == 0) throw "Infinite loop.";\n';
    // generate the code
    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    console.log(code);
    try {
      eval(code);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }
  
  function startNewRound() {
    botTurn = botTurn ? botTurn + 1 : 1;
  }
  
  function startBot() {
    startNewRound();
    botInitilizeMovement();
    runCode();
  }
  
  function waitForStart() {
    if (!game_start_original) {
      game_start_original = game_start;
    }
    window.game_start = start = function () {
      game_start_original();
      startBot();
      console.log("game starts");
    }
  }
  
  botStop = function () {
    startNewRound();
  }
  
  function createControls() {
    var startButton = document.createElement("a");
    startButton.id = "startButton";
    startButton.classList.add("floatingButton");
    startButton.innerText = "Start";
    document.body.appendChild(startButton);

    startButton.onclick = function () {
      startBot();
    }
  }
  
  createBlocklyArea();
  createOpenAndClose();
  waitForStart();
  createControls();

}, 100);

