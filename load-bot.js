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

  // load as described here:
  // https://developers.google.com/blockly/guides/configure/web/fixed-size
  loadScript("blockly/blockly_compressed.js");
  loadScript("blockly/blocks_compressed.js");
  loadScript("blockly/msg/js/en.js");
  // load our own code
  loadScript("bot/workspace.js");
})();

