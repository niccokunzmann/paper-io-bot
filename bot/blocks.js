/* alert block */
Blockly.Blocks['bot_log'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck(null)
        .appendField("log");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("%{BKY_TEXTS_HUE}");
 this.setTooltip("Gibt den Text auf der Konsole aus.");
 this.setHelpUrl("https://stackoverflow.com/questions/4539253/what-is-console-log");
  }
};

Blockly.JavaScript['bot_log'] = function(block) {
  var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'console.log(' + text + ');\n';
  return code;
};

