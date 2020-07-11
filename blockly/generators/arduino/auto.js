'use strict';

goog.provide('Blockly.Arduino.auto');

goog.require('Blockly.Arduino');

var AUTO_buzzer_PIN = 2;

var AUTO_uss_Trig = 9;
var AUTO_uss_Echo = 10;

var AUTO_lcd_MaxX = 15; // 0-15
var AUTO_lcd_MaxY = 1; // 0-1

var AUTO_led_BL = '0, 0';
var AUTO_led_BR = '1, 1';
var AUTO_led_TL = '2, 2';
var AUTO_led_TR = '3, 3';
var AUTO_led_FLG = '4, 4';
var AUTO_led_FLY = '5, 5';
var AUTO_led_FRY = '6, 6';
var AUTO_led_FRG = '7, 7';

var AUTO_motor_BL = 1;
var AUTO_motor_FL = 2;
var AUTO_motor_BR = 3;
var AUTO_motor_FR = 4;

//
// Control blocks
//

Blockly.Arduino['auto_led'] = function(block) {
    var dropdown_value = this.getFieldValue('VALUE');
    var dropdown_led = this.getFieldValue('LED');

    var code = "";

    Blockly.Arduino.definitions_['define_led_control'] = '#include <HT16K33.h>\n';
    Blockly.Arduino.definitions_['var_leds'] = 'HT16K33 leds = HT16K33();\n';

    Blockly.Arduino.setups_['setup_leds_1'] = 'leds.init(0x70);';
    Blockly.Arduino.setups_['setup_leds_2'] = 'delay(1000);';
    Blockly.Arduino.setups_['setup_leds_3'] = 'leds.setBrightness(15);';

    if (dropdown_led === "ledB") {
        Blockly.Arduino.definitions_['func_ledB'] = 'void ledsBack(int onoff)\n' +
            '{\n' +
            '   leds.setPixel( ' + AUTO_led_BL + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_BR + ', onoff );\n' +
            '   leds.write();\n' +
            '}\n';
        code = 'ledsBack( ' + dropdown_value + ' );\n';
    }
    if (dropdown_led === "ledT") {
        Blockly.Arduino.definitions_['func_ledT'] = 'void ledsTop(int onoff)\n' +
            '{\n' +
            '   leds.setPixel( ' + AUTO_led_TL + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_TR + ', onoff );\n' +
            '   leds.write();\n' +
            '}\n';
        code = 'ledsTop( ' + dropdown_value + ' );\n';
    }
    if (dropdown_led === "ledF") {
        Blockly.Arduino.definitions_['func_ledF'] = 'void ledsFront(int onoff)\n' +
            '{\n' +
            '   leds.setPixel( ' + AUTO_led_FLG + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_FRG + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_FLY + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_FRY + ', onoff );\n' +
            '   leds.write();\n' +
            '}\n';
        code = 'ledsFront( ' + dropdown_value + ' );\n';
    }
    if (dropdown_led === "ledL") {
        Blockly.Arduino.definitions_['func_ledL'] = 'void ledsLeft(int onoff)\n' +
            '{\n' +
            '   leds.setPixel( ' + AUTO_led_BL + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_TL + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_FLG + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_FLY + ', onoff );\n' +
            '   leds.write();\n' +
            '}\n';
        code = 'ledsLeft( ' + dropdown_value + ' );\n';
    }
    if (dropdown_led === "ledR") {
        Blockly.Arduino.definitions_['func_ledR'] = 'void ledsRight(int onoff)\n' +
            '{\n' +
            '   leds.setPixel( ' + AUTO_led_BR + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_TR + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_FRG + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_FRY + ', onoff );\n' +
            '   leds.write();\n' +
            '}\n';
        code = 'ledsRight( ' + dropdown_value + ' );\n';
    }
    if (dropdown_led === "ledA") {
        Blockly.Arduino.definitions_['func_ledA'] = 'void ledsAll(int onoff)\n' +
            '{\n' +
            '   leds.setPixel( ' + AUTO_led_BL + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_BR + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_TL + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_TR + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_FLG + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_FRG + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_FLY + ', onoff );\n' +
            '   leds.setPixel( ' + AUTO_led_FRY + ', onoff );\n' +
            '   leds.write();\n' +
            '}\n';
        code = 'ledsAll( ' + dropdown_value + ' );\n';
    }
    if (dropdown_led === "ledBL") {
        Blockly.Arduino.definitions_['func_ledBL'] = 'void ledsBL(int onoff)\n' +
            '{\n' +
            '   leds.setPixel( ' + AUTO_led_BL + ', onoff );\n' +
            '   leds.write();\n' +
            '}\n';
        code = 'ledsBL( ' + dropdown_value + ' );\n';
    }
    if (dropdown_led === "ledBR") {
        Blockly.Arduino.definitions_['func_ledBR'] = 'void ledsBR(int onoff)\n' +
            '{\n' +
            '   leds.setPixel( ' + AUTO_led_BR + ', onoff );\n' +
            '   leds.write();\n' +
            '}\n';
        code = 'ledsBR( ' + dropdown_value + ' );\n';
    }
    if (dropdown_led === "ledTL") {
        Blockly.Arduino.definitions_['func_ledTL'] = 'void ledsTL(int onoff)\n' +
            '{\n' +
            '   leds.setPixel( ' + AUTO_led_TL + ', onoff );\n' +
            '   leds.write();\n' +
            '}\n';
        code = 'ledsTL( ' + dropdown_value + ' );\n';
    }
    if (dropdown_led === "ledTR") {
        Blockly.Arduino.definitions_['func_ledTR'] = 'void ledsTR(int onoff)\n' +
            '{\n' +
            '   leds.setPixel( ' + AUTO_led_TR + ', onoff );\n' +
            '   leds.write();\n' +
            '}\n';
        code = 'ledsTR( ' + dropdown_value + ' );\n';
    }
    if (dropdown_led === "ledFLG") {
        Blockly.Arduino.definitions_['func_ledFLG'] = 'void ledsFLG(int onoff)\n' +
            '{\n' +
            '   leds.setPixel( ' + AUTO_led_FLG + ', onoff );\n' +
            '   leds.write();\n' +
            '}\n';
        code = 'ledsFLG( ' + dropdown_value + ' );\n';
    }
    if (dropdown_led === "ledFRG") {
        Blockly.Arduino.definitions_['func_ledFRG'] = 'void ledsFRG(int onoff)\n' +
            '{\n' +
            '   leds.setPixel( ' + AUTO_led_FRG + ', onoff );\n' +
            '   leds.write();\n' +
            '}\n';
        code = 'ledsFRG( ' + dropdown_value + ' );\n';
    }
    if (dropdown_led === "ledFLY") {
        Blockly.Arduino.definitions_['func_ledFLY'] = 'void ledsFLY(int onoff)\n' +
            '{\n' +
            '   leds.setPixel( ' + AUTO_led_FLY + ', onoff );\n' +
            '   leds.write();\n' +
            '}\n';
        code = 'ledsFLY( ' + dropdown_value + ' );\n';
    }
    if (dropdown_led === "ledFRY") {
        Blockly.Arduino.definitions_['func_ledFRY'] = 'void ledsFRY(int onoff)\n' +
            '{\n' +
            '   leds.setPixel( ' + AUTO_led_FRY + ', onoff );\n' +
            '   leds.write();\n' +
            '}\n';
        code = 'ledsFRY( ' + dropdown_value + ' );\n';
    }

    return code;
};

Blockly.Arduino['auto_buzzer'] = function(block) {
    var dropdown_value = this.getFieldValue('VALUE');
    Blockly.Arduino.setups_['setup_buzzer_1' + AUTO_buzzer_PIN] = 'pinMode(' + AUTO_buzzer_PIN + ', OUTPUT);';
    Blockly.Arduino.setups_['setup_buzzer_2' + AUTO_buzzer_PIN] = 'digitalWrite(' + AUTO_buzzer_PIN + ', HIGH);';
    var code = 'digitalWrite(' + AUTO_buzzer_PIN + ',' + dropdown_value + ');\n'
    return code;
};

Blockly.Arduino['auto_motor'] = function(block) {
    var dropdown_function = this.getFieldValue('FUNCTION');
    var dropdown_motor = this.getFieldValue('MOTOR');
    var speed = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '127';

    var code = "";

    Blockly.Arduino.definitions_['define_motor_control'] = '#include <AFMotor.h>\n';

    if (dropdown_motor === "motorALL") {
        Blockly.Arduino.definitions_['var_motorFR'] = 'AF_DCMotor motorFR(' + AUTO_motor_FR + ');\n';
        Blockly.Arduino.definitions_['var_motorBR'] = 'AF_DCMotor motorBR(' + AUTO_motor_BR + ');\n';
        Blockly.Arduino.definitions_['var_motorFL'] = 'AF_DCMotor motorFL(' + AUTO_motor_FL + ');\n';
        Blockly.Arduino.definitions_['var_motorBL'] = 'AF_DCMotor motorBL(' + AUTO_motor_BL + ');\n';
        Blockly.Arduino.setups_["setup_motorFR"] = "motorFR.run(RELEASE); // Motor FR\n";
        Blockly.Arduino.setups_["setup_motorBR"] = "motorBR.run(RELEASE); // Motor BR\n";
        Blockly.Arduino.setups_["setup_motorFL"] = "motorFL.run(RELEASE); // Motor FL\n";
        Blockly.Arduino.setups_["setup_motorBL"] = "motorBL.run(RELEASE); // Motor BL\n";
        if (dropdown_function === "backward") {
            code = "motorFR.run(FORWARD);\n" +
                "motorFR.setSpeed(" + speed + ");\n" +
                "motorBR.run(FORWARD);\n" +
                "motorBR.setSpeed(" + speed + ");\n" +
                "motorFL.run(FORWARD);\n" +
                "motorFL.setSpeed(" + speed + ");\n" +
                "motorBL.run(FORWARD);\n" +
                "motorBL.setSpeed(" + speed + ");\n";
        }
        if (dropdown_function === "forward") {
            code = "motorFR.run(BACKWARD);\n" +
                "motorFR.setSpeed(" + speed + ");\n" +
                "motorBR.run(BACKWARD);\n" +
                "motorBR.setSpeed(" + speed + ");\n" +
                "motorFL.run(BACKWARD);\n" +
                "motorFL.setSpeed(" + speed + ");\n" +
                "motorBL.run(BACKWARD);\n" +
                "motorBL.setSpeed(" + speed + ");\n";
        }
    }
    if (dropdown_motor === "motorR") {
        Blockly.Arduino.definitions_['var_motorFR'] = 'AF_DCMotor motorFR(' + AUTO_motor_FR + ');\n';
        Blockly.Arduino.definitions_['var_motorBR'] = 'AF_DCMotor motorBR(' + AUTO_motor_BR + ');\n';
        Blockly.Arduino.setups_["setup_motorFR"] = "motorFR.run(RELEASE); // Motor FR\n";
        Blockly.Arduino.setups_["setup_motorBR"] = "motorBR.run(RELEASE); // Motor BR\n";
        if (dropdown_function === "backward") {
            code = "motorFR.run(FORWARD);\n" +
                "motorFR.setSpeed(" + speed + ");\n" +
                "motorBR.run(FORWARD);\n" +
                "motorBR.setSpeed(" + speed + ");\n";
        }
        if (dropdown_function === "forward") {
            code = "motorFR.run(BACKWARD);\n" +
                "motorFR.setSpeed(" + speed + ");\n" +
                "motorBR.run(BACKWARD);\n" +
                "motorBR.setSpeed(" + speed + ");\n";
        }
    }
    if (dropdown_motor === "motorL") {
        Blockly.Arduino.definitions_['var_motorFL'] = 'AF_DCMotor motorFL(' + AUTO_motor_FL + ');\n';
        Blockly.Arduino.definitions_['var_motorBL'] = 'AF_DCMotor motorBL(' + AUTO_motor_BL + ');\n';
        Blockly.Arduino.setups_["setup_motorFL"] = "motorFL.run(RELEASE); // Motor FL\n";
        Blockly.Arduino.setups_["setup_motorBL"] = "motorBL.run(RELEASE); // Motor BL\n";
        if (dropdown_function === "backward") {
            code = "motorFL.run(FORWARD);\n" +
                "motorFL.setSpeed(" + speed + ");\n" +
                "motorBL.run(FORWARD);\n" +
                "motorBL.setSpeed(" + speed + ");\n";
        }
        if (dropdown_function === "forward") {
            code = "motorFL.run(BACKWARD);\n" +
                "motorFL.setSpeed(" + speed + ");\n" +
                "motorBL.run(BACKWARD);\n" +
                "motorBL.setSpeed(" + speed + ");\n";
        }
    }
    if (dropdown_motor === "motorFR") {
        Blockly.Arduino.definitions_['var_motorFR'] = 'AF_DCMotor motorFR(' + AUTO_motor_FR + ');\n';
        Blockly.Arduino.setups_["setup_motorFR"] = "motorFR.run(RELEASE); // Motor FR\n";
        if (dropdown_function === "backward") {
            code = "motorFR.run(FORWARD);\n" +
                "motorFR.setSpeed(" + speed + ");\n";
        }
        if (dropdown_function === "forward") {
            code = "motorFR.run(BACKWARD);\n" +
                "motorFR.setSpeed(" + speed + ");\n";
        }
    }
    if (dropdown_motor === "motorFL") {
        Blockly.Arduino.definitions_['var_motorFL'] = 'AF_DCMotor motorFL(' + AUTO_motor_FL + ');\n';
        Blockly.Arduino.setups_["setup_motorFL"] = "motorFL.run(RELEASE); // Motor FL\n";
        if (dropdown_function === "backward") {
            code = "motorFL.run(FORWARD);\n" +
                "motorFL.setSpeed(" + speed + ");\n";
        }
        if (dropdown_function === "forward") {
            code = "motorFL.run(BACKWARD);\n" +
                "motorFL.setSpeed(" + speed + ");\n";
        }
    }
    if (dropdown_motor === "motorBR") {
        Blockly.Arduino.definitions_['var_motorBR'] = 'AF_DCMotor motorBR(' + AUTO_motor_BR + ');\n';
        Blockly.Arduino.setups_["setup_motorBR"] = "motorBR.run(RELEASE); // Motor BR\n";
        if (dropdown_function === "backward") {
            code = "motorBR.run(FORWARD);\n" +
                "motorBR.setSpeed(" + speed + ");\n";
        }
        if (dropdown_function === "forward") {
            code = "motorBR.run(BACKWARD);\n" +
                "motorBR.setSpeed(" + speed + ");\n";
        }
    }
    if (dropdown_motor === "motorBL") {
        Blockly.Arduino.definitions_['var_motorBL'] = 'AF_DCMotor motorBL(' + AUTO_motor_BL + ');\n';
        Blockly.Arduino.setups_["setup_motorBL"] = "motorBL.run(RELEASE); // Motor BL\n";
        if (dropdown_function === "backward") {
            code = "motorBL.run(FORWARD);\n" +
                "motorBL.setSpeed(" + speed + ");\n";
        }
        if (dropdown_function === "forward") {
            code = "motorBL.run(BACKWARD);\n" +
                "motorBL.setSpeed(" + speed + ");\n";
        }
    }
    return code;
};

Blockly.Arduino['auto_motor_stop'] = function(block) {
    var dropdown_motor = this.getFieldValue('MOTOR');

    var code = "";

    Blockly.Arduino.definitions_['define_motor_control'] = '#include <AFMotor.h>\n';

    if (dropdown_motor === "motorALL") {
        Blockly.Arduino.definitions_['var_motorFR'] = 'AF_DCMotor motorFR(' + AUTO_motor_FR + ');\n';
        Blockly.Arduino.definitions_['var_motorBR'] = 'AF_DCMotor motorBR(' + AUTO_motor_BR + ');\n';
        Blockly.Arduino.definitions_['var_motorFL'] = 'AF_DCMotor motorFL(' + AUTO_motor_FL + ');\n';
        Blockly.Arduino.definitions_['var_motorBL'] = 'AF_DCMotor motorBL(' + AUTO_motor_BL + ');\n';
        Blockly.Arduino.setups_["setup_motorFR"] = "motorFR.run(RELEASE); // Motor FR\n";
        Blockly.Arduino.setups_["setup_motorBR"] = "motorBR.run(RELEASE); // Motor BR\n";
        Blockly.Arduino.setups_["setup_motorFL"] = "motorFL.run(RELEASE); // Motor FL\n";
        Blockly.Arduino.setups_["setup_motorBL"] = "motorBL.run(RELEASE); // Motor BL\n";

        code = "motorFR.run(BRAKE);\n" +
            "motorFR.setSpeed(0);\n" +
            "motorFR.run(RELEASE);\n" +
            "motorBR.run(BRAKE);\n" +
            "motorBR.setSpeed(0);\n" +
            "motorBR.run(RELEASE);\n" +
            "motorFL.run(BRAKE);\n" +
            "motorFL.setSpeed(0);\n" +
            "motorFL.run(RELEASE);\n" +
            "motorBL.run(BRAKE);\n" +
            "motorBL.setSpeed(0);\n" +
            "motorBL.run(RELEASE);\n";
    }
    if (dropdown_motor === "motorR") {
        Blockly.Arduino.definitions_['var_motorFR'] = 'AF_DCMotor motorFR(' + AUTO_motor_FR + ');\n';
        Blockly.Arduino.definitions_['var_motorBR'] = 'AF_DCMotor motorBR(' + AUTO_motor_BR + ');\n';
        Blockly.Arduino.setups_["setup_motorFR"] = "motorFR.run(RELEASE); // Motor FR\n";
        Blockly.Arduino.setups_["setup_motorBR"] = "motorBR.run(RELEASE); // Motor BR\n";

        code = "motorFR.run(BRAKE);\n" +
            "motorFR.setSpeed(0);\n" +
            "motorFR.run(RELEASE);\n" +
            "motorBR.run(BRAKE);\n" +
            "motorBR.setSpeed(0);\n" +
            "motorBR.run(RELEASE);\n";
    }
    if (dropdown_motor === "motorL") {
        Blockly.Arduino.definitions_['var_motorFL'] = 'AF_DCMotor motorFL(' + AUTO_motor_FL + ');\n';
        Blockly.Arduino.definitions_['var_motorBL'] = 'AF_DCMotor motorBL(' + AUTO_motor_BL + ');\n';
        Blockly.Arduino.setups_["setup_motorFL"] = "motorFL.run(RELEASE); // Motor FL\n";
        Blockly.Arduino.setups_["setup_motorBL"] = "motorBL.run(RELEASE); // Motor BL\n";

        code = "motorFL.run(BRAKE);\n" +
            "motorFL.setSpeed(0);\n" +
            "motorFL.run(RELEASE);\n" +
            "motorBL.run(BRAKE);\n" +
            "motorBL.setSpeed(0);\n" +
            "motorBL.run(RELEASE);\n";
    }
    if (dropdown_motor === "motorFR") {
        Blockly.Arduino.definitions_['var_motorFR'] = 'AF_DCMotor motorFR(' + AUTO_motor_FR + ');\n';
        Blockly.Arduino.setups_["setup_motorFR"] = "motorFR.run(RELEASE); // Motor FR\n";

        code = "motorFR.run(BRAKE);\n" +
            "motorFR.setSpeed(0);\n" +
            "motorFR.run(RELEASE);\n";
    }
    if (dropdown_motor === "motorFL") {
        Blockly.Arduino.definitions_['var_motorFL'] = 'AF_DCMotor motorFL(' + AUTO_motor_FL + ');\n';
        Blockly.Arduino.setups_["setup_motorFL"] = "motorFL.run(RELEASE); // Motor FL\n";

        code = "motorFL.run(BRAKE);\n" +
            "motorFL.setSpeed(0);\n" +
            "motorFL.run(RELEASE);\n";
    }
    if (dropdown_motor === "motorBR") {
        Blockly.Arduino.definitions_['var_motorBR'] = 'AF_DCMotor motorBR(' + AUTO_motor_BR + ');\n';
        Blockly.Arduino.setups_["setup_motorBR"] = "motorBR.run(RELEASE); // Motor BR\n";

        code = "motorBR.run(BRAKE);\n" +
            "motorBR.setSpeed(0);\n" +
            "motorBR.run(RELEASE);\n";
    }
    if (dropdown_motor === "motorBL") {
        Blockly.Arduino.definitions_['var_motorBL'] = 'AF_DCMotor motorBL(' + AUTO_motor_BL + ');\n';
        Blockly.Arduino.setups_["setup_motorBL"] = "motorBL.run(RELEASE); // Motor BL\n";

        code = "motorBL.run(BRAKE);\n" +
            "motorBL.setSpeed(0);\n" +
            "motorBL.run(RELEASE);\n";
    }
    return code;
};

// LCD display:

Blockly.Arduino['auto_lcd_display'] = function(block) {
    var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var x = Blockly.Arduino.valueToCode(this, 'POSX', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var y = Blockly.Arduino.valueToCode(this, 'POSY', Blockly.Arduino.ORDER_ATOMIC) || '0';

    var code = '// LCD Incorrect parameters!!!';

    if (x <= AUTO_lcd_MaxX && y <= AUTO_lcd_MaxY) {
        Blockly.Arduino.definitions_['define_lcd_display'] = '#include <LiquidCrystal_I2C.h>\n';
        Blockly.Arduino.definitions_['var_lcd_display'] = 'LiquidCrystal_I2C lcd(0x27,16,2);\n';
        Blockly.Arduino.definitions_['define_lcd_display_setup'] = "void lcd_setup()\n" +
            "{\n" +
            "   lcd.init();\n" +
            "   lcd.backlight();\n" +
            "   lcd.setCursor(0,0);\n" +
            "   lcd.print(\" -- ARDUINO --\");\n" +
            "   lcd.setCursor(0,1);\n" +
            "   lcd.print(\" Bluetooth Auto\");\n" +
            "}\n";
        Blockly.Arduino.setups_['setup_lcd_display'] = 'lcd_setup();\n';
        code = 'lcd.setCursor(' + x + ',' + y + ');\n' +
            'lcd.print(' + value + ');\n';
    }

    return code;
};

// // Ultrasonic driver:
// // https://github.com/ErickSimoes/Ultrasonic

// Blockly.Arduino.auto_ultrasonic = function() {
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

Blockly.Arduino.auto_ultrasonic = function() {
    var pin_trig = AUTO_uss_Trig; // Trig pin
    var pin_echo = AUTO_uss_Echo; // Echo pin
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

Blockly.Arduino.auto_ir = function() {
    var pin_ir = '2'; // IR input pin
    Blockly.Arduino.setups_['setup_ir_' + pin_ir] = 'pinMode(' + pin_ir + ', INPUT);';
    var code = 'digitalRead(' + pin_ir + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Bluetooth command handler:

Blockly.Arduino.auto_bt_command = function() {
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

// Bluetooth message handler:

Blockly.Arduino.auto_bt_message = function() {
    var command = Blockly.Arduino.valueToCode(this, 'CMD', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup_bt'] = 'Serial.begin(9600);\n';
    return "Serial.println( " + command + " );";
};

// Timer handler:
var tm_id = 1;
Blockly.Arduino.auto_timer_cyclic = function() {
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

Blockly.Arduino.auto_timer_once = function() {
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