
var BotImportExportLoaded = true;

var BOT_DEFAULT_WORKSPACE = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="controls_whileUntil" x="108" y="102"><field name="MODE">WHILE</field><value name="BOOL"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></value><statement name="DO"><block type="bot_move_turn"><field name="DIRECTION">botMoveInto(leftOf(botCurrentDirection))</field></block></statement></block></xml>'

function botLoadDefaultWorkspace() {
  var workspace = Blockly.getMainWorkspace();
  var xml = Blockly.Xml.textToDom(BOT_DEFAULT_WORKSPACE);
  Blockly.Xml.domToWorkspace(xml, workspace);
}

(function() {
  BlocklyStorage.restoreBlocks();
  BlocklyStorage.backupOnUnload();
  if (botGetWorkspaceForToolbox() == "") {
    botLoadDefaultWorkspace();
  }
})();

