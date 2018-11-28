/*
 * Load the workspace.
 */
 
var game_start_original; // global variable for loading the bot scripts several times.
var botTurn; // currently running number
var botStop; // function to stop the bot
var LoopTrap; // count to break infinite loops

(function () {
  var workspaceElement;
  var workspace;
  
  var controlsContainer = document.createElement("div");
  controlsContainer.id = "controlsContainer";
  document.body.appendChild(controlsContainer);

  function createBlocklyArea() {
    // create the elements we use to show blockly
    workspaceElement = document.createElement("div");
    workspaceElement.id = "blocklyWorkspace";
    workspaceElement.classList.add("botElement");
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
  
  var openWorkspace;

  function createOpenAndClose() {
    var openClose = document.createElement("a");
    openClose.classList.add("botButton");
    controlsContainer.appendChild(openClose);

    function adjustText() {
      openClose.innerText = document.body.classList.contains("hideBotElements") ?
        "Show Bot" : "Hide Bot";
    }

    openClose.onclick = function () {
      document.body.classList.toggle("hideBotElements");
      adjustText();
    }
    
    openWorkspace = function() {
      document.body.classList.remove("hideBotElements");
      openClose.classList.add("selected");
    }
    
    adjustText();
  }
  
  async function runCode() {
    // see https://developers.google.com/blockly/guides/app-integration/running-javascript

    // highlight the currently executing block
    Blockly.JavaScript.STATEMENT_PREFIX = 'executingBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('executingBlock');
    Blockly.JavaScript.addReservedWords('botTurn');
    Blockly.JavaScript.addReservedWords('window');
    var thisBotTurn = botTurn;
    function executingBlock(id) {
      if (botTurn != thisBotTurn) {
        throw "Stop Bot Execution number " + thisBotTurn;
      }
      workspace.highlightBlock(id);
    }
    // generate the code
    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    code =
      'async function runCode() {\n' +
      '  try {\n' + 
          code +
      '  } catch (e) {\n' +
      '    console.log(e);\n' +
      '    //alert(e);\n' +
      '  }\n' + 
      '  executingBlock(null);\n' +
      '}\n' +
      'runCode();'
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
    openWorkspace();
  }
  
  function waitForStart() {
    if (!game_start_original) {
      if (window["game_start"] == undefined) {
        // party mode
        game_start_original = paperio_play
      } else {
        // normal mode
        game_start_original = game_start;
      }
    }
    window.game_start = start = function (arg) {
      startBot();
      console.log("game starts");
      game_start_original(arg);
    }
  }
  
  botStop = function () {
    startNewRound();
  }
  
  function createControls() {
    var loadButton = document.createElement("a");
    loadButton.classList.add("botButton");
    loadButton.classList.add("botElement");
    loadButton.innerText = "Load Code";
    loadButton.onclick = startBot;
    controlsContainer.appendChild(loadButton);

    var startButton = document.createElement("a");
    startButton.classList.add("botButton");
    startButton.classList.add("botElement");
    startButton.innerText = "Play";
    startButton.onclick = function () {
      window.game_start();
    };
    controlsContainer.appendChild(startButton);
  }
  
  createBlocklyArea();
  createOpenAndClose();
  waitForStart();
  createControls();

})();

var BotWorkspaceLoaded = true;

