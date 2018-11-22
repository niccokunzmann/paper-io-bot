/*
 * This file loads all scripts necessary to execute the Paper-IO-Bot.
 *
 * Expectations:
 * `botRoot` must be the location of the root directory of this repository.
 */

// for loading checks
var Blockly;
var toolbox;
var botInitilizeMovement;
var BotWorkspaceLoaded;
var botSenseAnyAt;

(function () {
  var scripts = [];
  function loadScript(name, scriptHasLoaded) {
    scripts.push({name:name, scriptHasLoaded:scriptHasLoaded});
  }
  
  function loadScriptNamed(name, cache) {
    var script = document.createElement("script");
    script.src = botRoot + name;
    document.head.appendChild(script);
    console.log("loadScript", name);
  };

  function loadStyle(name) {
    var link = document.createElement("link");
    // loading a style sheet from JS
    // see http://stackoverflow.com/questions/574944/ddg#577002
    link.id   = name;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = botRoot + name;
    link.media = 'all';
    document.head.appendChild(link);
    console.log("loadStyle", name);
  };

  // use version parameter to prevent caching
  // see https://stackoverflow.com/a/7413243
  var nocache = "?version=" + new Date().getTime();

  // load as described here:
  // https://developers.google.com/blockly/guides/configure/web/fixed-size
  loadScript("blockly/blockly_compressed.js", function(){return Blockly;});
  loadScript("blockly/msg/js/en.js", function(){return Blockly.Msg.ADD_COMMENT;});
  loadScript("blockly/blocks_compressed.js", function(){return Blockly.Blocks.colour;});
  loadScript("blockly/javascript_compressed.js", function(){return Blockly.JavaScript;});
  // load our own code
  loadScript("bot/toolbox.js" + nocache, function(){return toolbox;});
  loadScript("bot/blocks.js" + nocache, function(){return Blockly.Blocks['bot_move'];});
  loadScript("bot/movement.js" + nocache,  function(){return botInitilizeMovement;});
  loadScript("bot/workspace.js" + nocache, function(){return BotWorkspaceLoaded;});
  loadScript("bot/sensing.js" + nocache, function(){return botSenseAnyAt;});
  loadStyle("bot/workspace.css" + nocache);
  
  // load scripts in order
  loadScriptNamed(scripts[0].name);
  var intervalId = setInterval(function() {
    if (scripts.length > 0) {
      if (scripts[0].scriptHasLoaded()) {
        scripts.shift();
        if (scripts.length > 0) {
          if (scripts[0].scriptHasLoaded()) {
            console.log("WARNING: test for script " + scripts[0].name + " was true from the start.");
          }
          loadScriptNamed(scripts[0].name);
        }
      }
    } else {
      clearInterval(intervalId);
    }
  }, 10);
})();

