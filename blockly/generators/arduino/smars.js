'use strict';

goog.provide('Blockly.Arduino.smars');

goog.require('Blockly.Arduino');

var SMARS_led_PIN = 13;
var SMARS_buzzer_PIN = 4;

//
// Control blocks
//

Blockly.Arduino['smars_led'] = function(block) {
    var dropdown_value = this.getFieldValue('VALUE');
    Blockly.Arduino.setups_['setup_led_' + SMARS_led_PIN] = 'pinMode(' + SMARS_led_PIN + ', OUTPUT);';
    var code = 'digitalWrite(' + SMARS_led_PIN + ',' + dropdown_value + ');\n'
    return code;
};

Blockly.Arduino['smars_buzzer'] = function(block) {
    var dropdown_value = this.getFieldValue('VALUE');
    Blockly.Arduino.setups_['setup_buzzer_' + SMARS_buzzer_PIN] = 'pinMode(' + SMARS_buzzer_PIN + ', OUTPUT);';
    var code = 'digitalWrite(' + SMARS_buzzer_PIN + ',' + dropdown_value + ');\n'
    return code;
};

Blockly.Arduino['smars_motor'] = function(block) {
    var dropdown_function = this.getFieldValue('FUNCTION');
    var dropdown_motor = this.getFieldValue('MOTOR');
    var speed = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '127';

    var code = "";

    if (dropdown_motor === "motorA") {
        Blockly.Arduino.setups_["setup_motorA"] = "pinMode(12,OUTPUT); // Motor A\n";
        if (dropdown_function === "forward") {
            Blockly.Arduino.definitions_['define_forwardA'] = "void forwardA(int speed)\n" +
                "{\n" +
                "  digitalWrite(12,LOW); // Motor A forward\n" +
                "  analogWrite(10,speed); // Motor A speed\n" +
                "}\n";
            code = "forwardA(" + speed + ");\n";
        }
        if (dropdown_function === "backward") {
            Blockly.Arduino.definitions_['define_backwardA'] = "void backwardA(int speed)\n" +
                "{\n" +
                "  digitalWrite(12,HIGH); // Motor A backward\n" +
                "  analogWrite(10,speed); // Motor A speed\n" +
                "}\n";
            code = "backwardA(" + speed + ");\n";
        }
    }
    if (dropdown_motor === "motorB") {
        Blockly.Arduino.setups_["setup_motorB"] = "pinMode(13,OUTPUT); // Motor B\n";
        if (dropdown_function === "forward") {
            Blockly.Arduino.definitions_['define_forwardB'] = "void forwardB(int speed)\n" +
                "{\n" +
                "  digitalWrite(13,HIGH);  // Motor B forward\n" +
                "  analogWrite(11,speed); // Motor B speed\n" +
                "}\n";
            code = "forwardB(" + speed + ");\n";
        }
        if (dropdown_function === "backward") {
            Blockly.Arduino.definitions_['define_backwardB'] = "void backwardB(int speed)\n" +
                "{\n" +
                "  digitalWrite(13,LOW); // Motor B backward\n" +
                "  analogWrite(11,speed); // Motor B speed\n" +
                "}\n";
            code = "backwardB(" + speed + ");\n";
        }
    }
    return code;
};

Blockly.Arduino['smars_motor_stop'] = function(block) {
    var dropdown_motor = this.getFieldValue('MOTOR');

    var code = "";

    if (dropdown_motor === "motorA") {
        Blockly.Arduino.setups_["setup_motorA"] = "pinMode(12,OUTPUT); // Motor A\n";
        Blockly.Arduino.definitions_['define_stopA'] = "void stopA()\n" +
            "{\n" +
            "  analogWrite(10,0); // Motor A stop\n" +
            "}\n";
        code = "stopA();\n";
    }
    if (dropdown_motor === "motorB") {
        Blockly.Arduino.setups_["setup_motorB"] = "pinMode(13,OUTPUT); // Motor B\n";
        Blockly.Arduino.definitions_['define_stopB'] = "void stopB()\n" +
            "{\n" +
            "  analogWrite(11,0); // Motor B stop\n" +
            "}\n";
        code = "stopB();\n";
    }
    return code;
};

// LED display:
// https://github.com/avishorp/TM1637

Blockly.Arduino['smars_led_display'] = function(block) {
    var pin_clk = '5'; // CLK pin
    var pin_dio = '6'; // DIO pin
    var pin_gnd = '3'; // GND pin
    var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['define_led_display'] = '#include <TM1637Display.h>\n';
    Blockly.Arduino.definitions_['var_led_display'] = 'TM1637Display display(' + pin_clk + ',' + pin_dio + ');\n';
    Blockly.Arduino.definitions_['define_led_display_print'] = "void ledDisplayPrint(int val)\n" +
        "{\n" +
        "  if ( val <= 9999 )\n" +
        "  {\n" +
        "    uint8_t data[] = { 0, 0, 0, 0 };\n" +
        "    int k;\n" +
        "    for(k = 3; k >= 0; k--) {\n" +
        "      uint8_t v = val % 10;\n" +
        "      data[k] = display.encodeDigit(v);\n" +
        "      val = val / 10;\n" +
        "      if ( val == 0 )\n" +
        "      {\n" +
        "        break;\n" +
        "      }\n" +
        "    }\n" +
        "    display.setSegments(data, 4, 0);\n" +
        "  }\n" +
        "  else\n" +
        "  {\n" +
        "    uint8_t data[] = { SEG_G, SEG_G, SEG_G, SEG_G };\n" +
        "    display.setSegments(data, 4, 0);\n" +
        "  }\n" +
        "}\n";
    Blockly.Arduino.setups_['setup_led_display1'] = 'display.setBrightness(0x0f);\n';
    Blockly.Arduino.setups_['setup_led_display2'] = 'pinMode(' + pin_gnd + ', OUTPUT);\n';
    Blockly.Arduino.setups_['setup_led_display3'] = 'digitalWrite(' + pin_gnd + ', LOW);\n';
    var code = 'ledDisplayPrint(' + value + ');\n';
    return code;
};

// // Ultrasonic driver:
// // https://github.com/ErickSimoes/Ultrasonic

// Blockly.Arduino.smars_ultrasonic = function() {
//     var pin_trig = '7'; // Trig pin
//     var pin_echo = '8'; // Echo pin
//     var dropdown_unit = this.getFieldValue('UNIT');
//     Blockly.Arduino.definitions_['define_ultrasonic'] = '#include <Ultrasonic.h>\n';
//     Blockly.Arduino.definitions_['var_ultrasonic'] = 'Ultrasonic ultrasonic(' + pin_trig + ',' + pin_echo + ');\n';
//     var code;
//     if (dropdown_unit === "cm") {
//         code = 'ultrasonic.distanceRead(CM)';
//     } else {
//         code = 'ultrasonic.distanceRead(INC)';
//     }
//     return [code, Blockly.Arduino.ORDER_ATOMIC];
// };

// Ultrasonic driver (NewPing):
// https://bitbucket.org/teckel12/arduino-new-ping/wiki/Home

Blockly.Arduino.smars_ultrasonic = function() {
    var pin_trig = '7'; // Trig pin
    var pin_echo = '8'; // Echo pin
    var max_dist = '300'; // Max distance in cm
    var dropdown_unit = this.getFieldValue('UNIT');
    Blockly.Arduino.definitions_['define_ultrasonic'] = '#include <NewPing.h>\n';
    Blockly.Arduino.definitions_['var_ultrasonic'] = 'NewPing sonar(' + pin_trig + ',' + pin_echo + ',' + max_dist + ');\n';
    Blockly.Arduino.definitions_['define_ultrasonic_read'] = "int sonarRead(int cm)\n" +
        "{\n" +
        "   static int dist = 999;\n" +
        "   int val;\n" +
        "   if( cm )\n" +
        "   {\n" +
        "       val = sonar.convert_cm(sonar.ping_median(3));\n" +
        "   }\n" +
        "   else\n" +
        "   {\n" +
        "       val = sonar.convert_in(sonar.ping_median(3));\n" +
        "   }\n" +
        "   if( val > 0 )\n" +
        "   {\n" +
        "       dist = val;\n" +
        "   }\n" +
        "   return dist;\n" +
        "}\n";
    var code;
    if (dropdown_unit === "cm") {
        code = 'sonarRead(1)';
    } else {
        code = 'sonarRead(0)';
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// IR driver:

Blockly.Arduino.smars_ir = function() {
    var pin_ir = '2'; // IR input pin
    Blockly.Arduino.setups_['setup_ir_' + pin_ir] = 'pinMode(' + pin_ir + ', INPUT);';
    var code = 'digitalRead(' + pin_ir + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Bluetooth command handler:

Blockly.Arduino.smars_bt_command = function() {
    var command = Blockly.Arduino.valueToCode(this, 'CMD', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    Blockly.Arduino.setups_['setup_bt'] = 'Serial.begin(9600);\n';
    Blockly.Arduino.definitions_['define_bt_get'] =
        "#define MAXCHARSEXPECTED  32\n" +
        "int getBTCommand( char * bt_cmd )\n" +
        "{\n" +
        "  static char buffer[MAXCHARSEXPECTED+1] = \"\";\n" +
        "  static int charsRead = 0;\n" +
        "  if (Serial.available())\n" +
        "  {\n" +
        "    char c = Serial.read();\n" +
        "    if(charsRead < MAXCHARSEXPECTED)\n" +
        "    {\n" +
        "      if(c == '.')\n" +
        "      {\n" +
        "        buffer[charsRead] = 0;\n" +
        "        strcpy( bt_cmd, buffer );\n" +
        "        charsRead = 0;\n" +
        "        return 1;\n" +
        "      }\n" +
        "      else\n" +
        "      {\n" +
        "        buffer[charsRead] = c;\n" +
        "        charsRead++;\n" +
        "      }\n" +
        "    }\n" +
        "    else\n" +
        "    {\n" +
        "      charsRead = 0;\n" +
        "    }\n" +
        "  }\n" +
        "  return 0;\n" +
        "}\n";
    Blockly.Arduino.definitions_['define_bt_check'] =
        "int checkBTCommand(const char * cmd)\n" +
        "{\n" +
        "  static char bt_cmd[MAXCHARSEXPECTED+1] = \"\";\n" +
        "  getBTCommand( bt_cmd );\n" +
        "  if(strcmp( bt_cmd, cmd ) == 0)\n" +
        "  {\n" +
        "    bt_cmd[0] = 0;\n" +
        "    return 1;\n" +
        "  }\n" +
        "  return 0;\n" +
        "}\n";
    var code =
        "if( checkBTCommand( " + command + " ) )\n" +
        "{\n" +
        branch +
        "}\n";
    return code;
};

// Timer handler:
var tm_id = 1;
Blockly.Arduino.smars_timer_cyclic = function() {
    var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    Blockly.Arduino.handlers_['softtimer_cb_' + tm_id] =
        "void t" + tm_id + "_CyclicRun(Task * self)\n" +
        "{\n" +
        branch +
        "}\n";
    Blockly.Arduino.setups_['softtimer_def_' + tm_id] = 'static Task t' + tm_id + '( ' + time + ', t' + tm_id + '_CyclicRun );';
    Blockly.Arduino.setups_['softtimer_setup_' + tm_id] = 'SoftTimer.add( &t' + tm_id + ' );\n';
    var code = "";
    tm_id = tm_id + 1;
    return code;
};

Blockly.Arduino.smars_timer_once = function() {
    var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    Blockly.Arduino.definitions_['delayrun_include'] = '#include <DelayRun.h>\n';
    Blockly.Arduino.handlers_['delayrun_cb_' + tm_id] =
        "boolean t" + tm_id + "_DelayedRun(Task * self)\n" +
        "{\n" +
        branch +
        "  return false;\n" +
        "}\n";
    var code =
        "static DelayRun t" + tm_id + "( " + time + ", t" + tm_id + "_DelayedRun );\n" +
        "t" + tm_id + ".startDelayed();\n";
    tm_id = tm_id + 1;
    return code;
};