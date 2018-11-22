/*
 * This file contains the custom blocks.
 * If you want to add blocks to the workspace, see toolbox.js.
 *
 * You can design new blocks using the Blockly Developer Tools
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
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
        .appendField(new Blockly.FieldDropdown([
            ["left","'left'"],
            ["right","'right'"],
            ["north","'north'"],
            ["east","'east'"],
            ["south","'south'"],
            ["west","'west'"],
          ]), "DIRECTION");
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

/* move the bot */
Blockly.Blocks['bot_move'] = {
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

Blockly.JavaScript['bot_move'] = function(block) {
  var code = 'await botWaitForMove();\n';
  return code;
};

/* sensing */
Blockly.Blocks['bot_sense_direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["my","[botClassifyMy]"], ["any","[botClassifyMy, botClassifyEnemy]"], ["enemy","[botClassifyEnemy]"]]), "OWNER")
        .appendField(new Blockly.FieldDropdown([["path","[botCheckPath]"], ["area","[botCheckArea]"], ["path or wall","[botCheckPath, botCheckWall]"], ["wall","[botCheckWall]"]]), "TYPE")
        .appendField("is")
        .appendField(new Blockly.FieldDropdown([["ahead","[positionInDirection(botCurrentDirection)]"], ["left","[positionInDirection(leftOf(botCurrentDirection))]"], ["right","[positionInDirection(rightOf(botCurrentDirection))]"], ["behind","[positionInDirection(oppositeOf(botCurrentDirection))]"], ["north","[positionInDirection(\"north\")]"], ["west","[positionInDirection(\"west\")]"], ["south","[positionInDirection(\"south\")]"], ["east","[positionInDirection(\"east\")]"]]), "DIRECTION");
    this.setOutput(true, "Boolean");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['bot_sense_direction'] = function(block) {
  var dropdown_owner = block.getFieldValue('OWNER');
  var dropdown_type = block.getFieldValue('TYPE');
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var code = 'botSenseAnyAt(' + dropdown_owner + ', ' + dropdown_type + ', ' + dropdown_direction + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
