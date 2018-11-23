/*
 * This file contains the custom blocks.
 * If you want to add blocks to the workspace, see toolbox.js.
 *
 * You can design new blocks using the Blockly Developer Tools
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
 */

var COLOR_NAVIGATION = 45;

/* log block */
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
    this.setColour(COLOR_NAVIGATION);
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
    this.setColour(COLOR_NAVIGATION);
    this.setTooltip("Wartet, bis der Spieler einen Schritt gemacht hat.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['bot_move'] = function(block) {
  var code = 'await botWaitForMove();\n';
  return code;
};

var DROPDOWN_OPTIONS_OWNER = [ // see sensing.js
  ["my","[botClassifyMy]"],
  ["an enemy","[botClassifyEnemy]"],
  ["any","[botClassifyMy, botClassifyEnemy]"],
];
var DROPDOWN_OPTIONS_TYPE = [
  ["path","[botCheckPath]"],
  ["area","[botCheckArea]"],
  ["path or wall","[botCheckPath, botCheckWall]"],
  ["wall","[botCheckWall]"],
];
var DROPDOWN_OPTIONS_DIRECTION = [
  ["ahead","[positionInDirection(botCurrentDirection)]"],
  ["left","[positionInDirection(leftOf(botCurrentDirection))]"],
  ["right","[positionInDirection(rightOf(botCurrentDirection))]"],
  ["here","[botCurrentDirection]"],
  ["behind","[positionInDirection(oppositeOf(botCurrentDirection))]"],
  ["north","[positionInDirection(\"north\")]"],
  ["west","[positionInDirection(\"west\")]"],
  ["south","[positionInDirection(\"south\")]"],
  ["east","[positionInDirection(\"east\")]"],
];

/* sensing relative */
Blockly.Blocks['bot_sense_direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(DROPDOWN_OPTIONS_OWNER), "OWNER")
        .appendField(new Blockly.FieldDropdown(DROPDOWN_OPTIONS_TYPE), "TYPE")
        .appendField("is")
        .appendField(new Blockly.FieldDropdown(DROPDOWN_OPTIONS_DIRECTION), "DIRECTION");
    this.setOutput(true, "Boolean");
    this.setColour(COLOR_NAVIGATION);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['bot_sense_direction'] = function(block) {
  var dropdown_owner = block.getFieldValue('OWNER');
  var dropdown_type = block.getFieldValue('TYPE');
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var code = 'botSenseAnyAt(' + dropdown_owner + ', ' + dropdown_type + ', ' + dropdown_direction + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/* sensing absolute */
Blockly.Blocks['bot_sense_absolute'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(DROPDOWN_OPTIONS_OWNER), "OWNER")
        .appendField(new Blockly.FieldDropdown(DROPDOWN_OPTIONS_TYPE), "TYPE")
        .appendField("is at X:");
    this.appendValueInput("X")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("Y:");
    this.appendValueInput("Y")
        .setCheck("Number");
    this.setOutput(true, "Boolean");
    this.setColour(COLOR_NAVIGATION);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['bot_sense_absolute'] = function(block) {
  var dropdown_owner = block.getFieldValue('OWNER');
  var dropdown_type = block.getFieldValue('TYPE');
  var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'botSenseAnyAt(' + dropdown_owner + ', ' + dropdown_type + ', [{x:' + value_x + ', y:' + value_y + '}])';;
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/* positions */
Blockly.Blocks['bot_player_XY'] = {
  init: function() {
    var dropdownNames = botGetPlayerNames().map(function(name){
      return [name.toUpperCase(), name];
    });
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(dropdownNames), "PLAYER")
        .appendField(".")
        .appendField(new Blockly.FieldDropdown([["X","x"], ["Y","y"]]), "ATTR");
    this.setOutput(true, "Number");
    this.setColour(COLOR_NAVIGATION);
    this.setTooltip("X- und Y-Koordinate von Spielern. P1 ist man");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['bot_player_XY'] = function(block) {
  var dropdown_player = block.getFieldValue('PLAYER');
  var dropdown_attr = block.getFieldValue('ATTR');
  var code = dropdown_player + "_" + dropdown_attr;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

