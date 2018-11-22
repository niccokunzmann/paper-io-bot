/*
 * This file loads all scripts necessary to execute the Paper-IO-Bot.
 *
 * Expectations:
 * `botRoot` must be the location of the root directory of this repository.
 */
 
(function () {
  function loadScript(name) {
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

  // load as described here:
  // https://developers.google.com/blockly/guides/configure/web/fixed-size
  loadScript("blockly/blockly_compressed.js");
  loadScript("blockly/blocks_compressed.js");
  loadScript("blockly/javascript_compressed.js");
  loadScript("blockly/msg/js/en.js");
  // load our own code
  loadScript("bot/toolbox.js");
  loadScript("bot/blocks.js");
  loadScript("bot/movement.js");
  loadScript("bot/workspace.js");
  loadStyle("bot/workspace.css");
})();

