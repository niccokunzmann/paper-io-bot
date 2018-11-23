// from blockly/demos/toolbox/index.html


/*
 * Embed the xml retrieved by botGetWorkspaceForToolbox()
 * into the toolbox.
 */
function botAddWorkspaceExample(name, xml) {
  return '<category name="' + name + '">' + xml + '</category>';
}

function botGetWorkspace() {
  var workspace = Blockly.getMainWorkspace();
  var xml = Blockly.Xml.workspaceToDom(workspace, true);
  return Blockly.Xml.domToText(xml);
}

/*
 * Return the workspace so it can be embedded into the toolbox below.
 */ 
function botGetWorkspaceForToolbox() {
  return botMakeXMLReadyForToolbox(botGetWorkspace());
}

function botMakeXMLReadyForToolbox(xml) {
  return xml
    .replace(/^<[^>]+>/, "") // xml at start
    .replace(/<[^>]+>$/, "") // xml at the end
  ;
}

var toolbox = 
'<xml id="toolbox" style="display: none">' + 
'  <category name="Navigation" colour="45">' + 
'    <block type="bot_move">' + 
'    </block>' + 
'    <block type="bot_turn">' + 
'    </block>' + 
'    <block type="bot_sense_direction">' + 
'    </block>' + 
'    <block type="bot_sense_absolute">' + 
'      <value name="X">' +
'        <block type="bot_player_XY">' +
'          <field name="ATTR">x</field>' + 
'        </block>' +
'      </value>' +
'      <value name="Y">' +
'        <block type="bot_player_XY">' +
'          <field name="ATTR">y</field>' + 
'        </block>' +
'      </value>' +
'    </block>' + 
'    <block type="bot_player_XY">' + 
'    </block>' + 
'  </category>' +
'  <category name="Text" colour="%{BKY_TEXTS_HUE}">' + 
'    <block type="text_print">' + 
'      <value name="TEXT">' + 
'        <block type="text">' + 
'          <field name="TEXT"></field>' + 
'        </block>' + 
'      </value>' + 
'    </block>' + 
'    <block type="bot_log">' + 
'      <value name="TEXT">' + 
'        <block type="text">' + 
'          <field name="TEXT">a: </field>' + 
'        </block>' + 
'      </value>' + 
'    </block>' + 
'    <block type="text_join">' + 
'    </block>' + 
'  </category>' + 
'  <category name="Logic" colour="%{BKY_LOGIC_HUE}">' + 
'    <block type="controls_if"></block>' + 
'    <block type="controls_if">' + 
'      <mutation else="1"></mutation>' + 
'    </block>' + 
'    <block type="controls_if">' + 
'      <mutation elseif="1" else="1"></mutation>' + 
'    </block>' + 
'    <block type="logic_compare"></block>' + 
'    <block type="logic_operation"></block>' + 
'    <block type="logic_negate"></block>' + 
'    <block type="logic_boolean"></block>' + 
'    <block type="logic_null"></block>' + 
'    <block type="logic_ternary"></block>' + 
'  </category>' + 
'  <category name="Loops" colour="%{BKY_LOOPS_HUE}">' + 
'    <block type="controls_repeat_ext">' + 
'      <value name="TIMES">' + 
'        <block type="math_number">' + 
'          <field name="NUM">10</field>' + 
'        </block>' + 
'      </value>' + 
'    </block>' + 
'    <block type="controls_whileUntil">' +
'      <value name="BOOL">' + // https://github.com/google/blockly/blob/master/blocks/loops.js#L104
'        <block type="logic_boolean"></block>' +
'      </value>' +
'    </block>' + 
'    <block type="controls_for">' + 
'      <field name="VAR">i</field>' + 
'      <value name="FROM">' + 
'        <block type="math_number">' + 
'          <field name="NUM">1</field>' + 
'        </block>' + 
'      </value>' + 
'      <value name="TO">' + 
'        <block type="math_number">' + 
'          <field name="NUM">10</field>' + 
'        </block>' + 
'      </value>' + 
'      <value name="BY">' + 
'        <block type="math_number">' + 
'          <field name="NUM">1</field>' + 
'        </block>' + 
'      </value>' + 
'    </block>' + 
'    <block type="controls_forEach"></block>' + 
'    <block type="controls_flow_statements"></block>' + 
'  </category>' + 
'  <category name="Math" colour="%{BKY_MATH_HUE}">' + 
'    <block type="math_number">' + 
'      <field name="NUM">123</field>' + 
'    </block>' + 
'    <block type="math_arithmetic"></block>' + 
'    <block type="math_single"></block>' + 
'    <block type="math_trig"></block>' + 
'    <block type="math_constant"></block>' + 
'    <block type="math_number_property"></block>' + 
'    <block type="math_round"></block>' + 
'    <block type="math_on_list"></block>' + 
'    <block type="math_modulo"></block>' + 
'    <block type="math_constrain">' + 
'      <value name="LOW">' + 
'        <block type="math_number">' + 
'          <field name="NUM">1</field>' + 
'        </block>' + 
'      </value>' + 
'      <value name="HIGH">' + 
'        <block type="math_number">' + 
'          <field name="NUM">100</field>' + 
'        </block>' + 
'      </value>' + 
'    </block>' + 
'    <block type="math_random_int">' + 
'      <value name="FROM">' + 
'        <block type="math_number">' + 
'          <field name="NUM">1</field>' + 
'        </block>' + 
'      </value>' + 
'      <value name="TO">' + 
'        <block type="math_number">' + 
'          <field name="NUM">100</field>' + 
'        </block>' + 
'      </value>' + 
'    </block>' + 
'    <block type="math_random_float"></block>' + 
'    <block type="math_atan2"></block>' + 
'  </category>' + 
'  <category name="Lists" colour="%{BKY_LISTS_HUE}">' + 
'    <block type="lists_create_empty"></block>' + 
'    <block type="lists_create_with"></block>' + 
'    <block type="lists_repeat">' + 
'      <value name="NUM">' + 
'        <block type="math_number">' + 
'          <field name="NUM">5</field>' + 
'        </block>' + 
'      </value>' + 
'    </block>' + 
'    <block type="lists_length"></block>' + 
'    <block type="lists_isEmpty"></block>' + 
'    <block type="lists_indexOf"></block>' + 
'    <block type="lists_getIndex"></block>' + 
'    <block type="lists_setIndex"></block>' + 
'  </category>' + 
'  <sep></sep>' + 
'  <category name="Variables" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">' + 
'  </category>' + 
'  <category name="Functions" custom="PROCEDURE" colour="%{BKY_PROCEDURES_HUE}">' + 
'  </category>' + 
'  <sep></sep>' + 
'  <category name="Library" expanded="true">' + 
'    <category name="Randomize">' + 
'      <block type="procedures_defnoreturn">' + 
'        <mutation>' + 
'          <arg name="list"></arg>' + 
'        </mutation>' + 
'        <field name="NAME">randomize</field>' + 
'        <statement name="STACK">' + 
'          <block type="controls_for" inline="true">' + 
'            <field name="VAR">x</field>' + 
'            <value name="FROM">' + 
'              <block type="math_number">' + 
'                <field name="NUM">1</field>' + 
'              </block>' + 
'            </value>' + 
'            <value name="TO">' + 
'              <block type="lists_length" inline="false">' + 
'                <value name="VALUE">' + 
'                  <block type="variables_get">' + 
'                    <field name="VAR">list</field>' + 
'                  </block>' + 
'                </value>' + 
'              </block>' + 
'            </value>' + 
'            <value name="BY">' + 
'              <block type="math_number">' + 
'                <field name="NUM">1</field>' + 
'              </block>' + 
'            </value>' + 
'            <statement name="DO">' + 
'              <block type="variables_set" inline="false">' + 
'                <field name="VAR">y</field>' + 
'                <value name="VALUE">' + 
'                  <block type="math_random_int" inline="true">' + 
'                    <value name="FROM">' + 
'                      <block type="math_number">' + 
'                        <field name="NUM">1</field>' + 
'                      </block>' + 
'                    </value>' + 
'                    <value name="TO">' + 
'                      <block type="lists_length" inline="false">' + 
'                        <value name="VALUE">' + 
'                          <block type="variables_get">' + 
'                            <field name="VAR">list</field>' + 
'                          </block>' + 
'                        </value>' + 
'                      </block>' + 
'                    </value>' + 
'                  </block>' + 
'                </value>' + 
'                <next>' + 
'                  <block type="variables_set" inline="false">' + 
'                    <field name="VAR">temp</field>' + 
'                    <value name="VALUE">' + 
'                      <block type="lists_getIndex" inline="true">' + 
'                        <mutation statement="false" at="true"></mutation>' + 
'                        <field name="MODE">GET</field>' + 
'                        <field name="WHERE">FROM_START</field>' + 
'                        <value name="AT">' + 
'                          <block type="variables_get">' + 
'                            <field name="VAR">y</field>' + 
'                          </block>' + 
'                        </value>' + 
'                        <value name="VALUE">' + 
'                          <block type="variables_get">' + 
'                            <field name="VAR">list</field>' + 
'                          </block>' + 
'                        </value>' + 
'                      </block>' + 
'                    </value>' + 
'                    <next>' + 
'                      <block type="lists_setIndex" inline="false">' + 
'                        <value name="AT">' + 
'                          <block type="variables_get">' + 
'                            <field name="VAR">y</field>' + 
'                          </block>' + 
'                        </value>' + 
'                        <value name="LIST">' + 
'                          <block type="variables_get">' + 
'                            <field name="VAR">list</field>' + 
'                          </block>' + 
'                        </value>' + 
'                        <value name="TO">' + 
'                          <block type="lists_getIndex" inline="true">' + 
'                            <mutation statement="false" at="true"></mutation>' + 
'                            <field name="MODE">GET</field>' + 
'                            <field name="WHERE">FROM_START</field>' + 
'                            <value name="AT">' + 
'                              <block type="variables_get">' + 
'                                <field name="VAR">x</field>' + 
'                              </block>' + 
'                            </value>' + 
'                            <value name="VALUE">' + 
'                              <block type="variables_get">' + 
'                                <field name="VAR">list</field>' + 
'                              </block>' + 
'                            </value>' + 
'                          </block>' + 
'                        </value>' + 
'                        <next>' + 
'                          <block type="lists_setIndex" inline="false">' + 
'                            <value name="AT">' + 
'                              <block type="variables_get">' + 
'                                <field name="VAR">x</field>' + 
'                              </block>' + 
'                            </value>' + 
'                            <value name="LIST">' + 
'                              <block type="variables_get">' + 
'                                <field name="VAR">list</field>' + 
'                              </block>' + 
'                            </value>' + 
'                            <value name="TO">' + 
'                              <block type="variables_get">' + 
'                                <field name="VAR">temp</field>' + 
'                              </block>' + 
'                            </value>' + 
'                          </block>' + 
'                        </next>' + 
'                      </block>' + 
'                    </next>' + 
'                  </block>' + 
'                </next>' + 
'              </block>' + 
'            </statement>' + 
'          </block>' + 
'        </statement>' + 
'      </block>' + 
'    </category>' + 
botAddWorkspaceExample("Distance to Players", '<variables><variable type="" id="B6vSD7n[_BbTq:QIr5Hg">x</variable><variable type="" id="0oh/=.RCpwc/3l~A]7XS">y</variable></variables><block type="procedures_defreturn" x="19" y="14"><mutation statements="false"><arg name="x" varid="B6vSD7n[_BbTq:QIr5Hg"></arg><arg name="y" varid="0oh/=.RCpwc/3l~A]7XS"></arg></mutation><field name="NAME">distanceToPlayer</field><comment pinned="false" h="80" w="160">Gibt die Distanz zu einem Spieler zurück und 1000, wenn der Spieler nicht spielt.</comment><value name="RETURN"><block type="logic_ternary"><value name="IF"><block type="logic_operation"><field name="OP">AND</field><value name="A"><block type="logic_compare"><field name="OP">LTE</field><value name="A"><block type="variables_get"><field name="VAR" id="B6vSD7n[_BbTq:QIr5Hg" variabletype="">x</field></block></value><value name="B"><block type="math_number"><field name="NUM">0</field></block></value></block></value><value name="B"><block type="logic_compare"><field name="OP">LTE</field><value name="A"><block type="variables_get"><field name="VAR" id="0oh/=.RCpwc/3l~A]7XS" variabletype="">y</field></block></value><value name="B"><block type="math_number"><field name="NUM">0</field></block></value></block></value></block></value><value name="THEN"><block type="math_number"><field name="NUM">1000</field></block></value><value name="ELSE"><block type="math_arithmetic"><field name="OP">ADD</field><value name="A"><block type="math_single"><field name="OP">ABS</field><value name="NUM"><block type="math_arithmetic"><field name="OP">MINUS</field><value name="A"><block type="bot_player_XY"><field name="PLAYER">p1</field><field name="ATTR">x</field></block></value><value name="B"><block type="variables_get"><field name="VAR" id="B6vSD7n[_BbTq:QIr5Hg" variabletype="">x</field></block></value></block></value></block></value><value name="B"><block type="math_single"><field name="OP">ABS</field><value name="NUM"><block type="math_arithmetic"><field name="OP">MINUS</field><value name="A"><block type="bot_player_XY"><field name="PLAYER">p1</field><field name="ATTR">y</field></block></value><value name="B"><block type="variables_get"><field name="VAR" id="0oh/=.RCpwc/3l~A]7XS" variabletype="">y</field></block></value></block></value></block></value></block></value></block></value></block><block type="procedures_defreturn" x="19" y="168"><mutation statements="false"></mutation><field name="NAME">distanceToClosestPlayer</field><comment pinned="false" h="80" w="160">Gibt die Distanz zu dem Spieler zurück, der am nächsten an einem dran ist.</comment><value name="RETURN"><block type="math_on_list"><mutation op="MIN"></mutation><field name="OP">MIN</field><value name="LIST"><block type="lists_create_with"><mutation items="8"></mutation><value name="ADD0"><block type="procedures_callreturn"><mutation name="distanceToPlayer"><arg name="x"></arg><arg name="y"></arg></mutation><value name="ARG0"><block type="bot_player_XY"><field name="PLAYER">p2</field><field name="ATTR">x</field></block></value><value name="ARG1"><block type="bot_player_XY"><field name="PLAYER">p2</field><field name="ATTR">y</field></block></value></block></value><value name="ADD1"><block type="procedures_callreturn"><mutation name="distanceToPlayer"><arg name="x"></arg><arg name="y"></arg></mutation><value name="ARG0"><block type="bot_player_XY"><field name="PLAYER">p3</field><field name="ATTR">x</field></block></value><value name="ARG1"><block type="bot_player_XY"><field name="PLAYER">p3</field><field name="ATTR">y</field></block></value></block></value><value name="ADD2"><block type="procedures_callreturn"><mutation name="distanceToPlayer"><arg name="x"></arg><arg name="y"></arg></mutation><value name="ARG0"><block type="bot_player_XY"><field name="PLAYER">p4</field><field name="ATTR">x</field></block></value><value name="ARG1"><block type="bot_player_XY"><field name="PLAYER">p4</field><field name="ATTR">y</field></block></value></block></value><value name="ADD3"><block type="procedures_callreturn"><mutation name="distanceToPlayer"><arg name="x"></arg><arg name="y"></arg></mutation><value name="ARG0"><block type="bot_player_XY"><field name="PLAYER">p5</field><field name="ATTR">x</field></block></value><value name="ARG1"><block type="bot_player_XY"><field name="PLAYER">p5</field><field name="ATTR">y</field></block></value></block></value><value name="ADD4"><block type="procedures_callreturn"><mutation name="distanceToPlayer"><arg name="x"></arg><arg name="y"></arg></mutation><value name="ARG0"><block type="bot_player_XY"><field name="PLAYER">p6</field><field name="ATTR">x</field></block></value><value name="ARG1"><block type="bot_player_XY"><field name="PLAYER">p6</field><field name="ATTR">y</field></block></value></block></value><value name="ADD5"><block type="procedures_callreturn"><mutation name="distanceToPlayer"><arg name="x"></arg><arg name="y"></arg></mutation><value name="ARG0"><block type="bot_player_XY"><field name="PLAYER">p7</field><field name="ATTR">x</field></block></value><value name="ARG1"><block type="bot_player_XY"><field name="PLAYER">p7</field><field name="ATTR">y</field></block></value></block></value><value name="ADD6"><block type="procedures_callreturn"><mutation name="distanceToPlayer"><arg name="x"></arg><arg name="y"></arg></mutation><value name="ARG0"><block type="bot_player_XY"><field name="PLAYER">p8</field><field name="ATTR">x</field></block></value><value name="ARG1"><block type="bot_player_XY"><field name="PLAYER">p8</field><field name="ATTR">y</field></block></value></block></value><value name="ADD7"><block type="procedures_callreturn"><mutation name="distanceToPlayer"><arg name="x"></arg><arg name="y"></arg></mutation><value name="ARG0"><block type="bot_player_XY"><field name="PLAYER">p9</field><field name="ATTR">x</field></block></value><value name="ARG1"><block type="bot_player_XY"><field name="PLAYER">p9</field><field name="ATTR">y</field></block></value></block></value></block></value></block></value></block>') +
'  </category>' + 
'</xml>';
