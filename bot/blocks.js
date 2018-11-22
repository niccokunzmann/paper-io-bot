/*
 * This file contains the custom blocks.
 */

var COLOR_MOVEMENT = 45;

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

/* --------- Movement --------- */
/* Turning into a direction. */
Blockly.Blocks['bot_turn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("turn")
        .appendField(new Blockly.FieldDropdown([["north","north"], ["east","east"], ["south","south"], ["west","west"], ["left","left"], ["right","right"]]), "DIRECTION");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR_MOVEMENT);
    this.setTooltip("Dreht den Spieler in die Richtung.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['bot_turn'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var code = 'botMoveInto(' + dropdown_direction + ');\n';
  return code;
};

Blockly.Blocks['bot_turn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("move one step");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR_MOVEMENT);
    this.setTooltip("Wartet, bis der Spieler einen Schritt gemacht hat.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['bot_turn'] = function(block) {
  var code = 'await botWaitForMove();\n';
  return code;
};

