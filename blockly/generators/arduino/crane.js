'use strict';

goog.provide('Blockly.Arduino.crane');

goog.require('Blockly.Arduino');

const CRANE_motors = [
    0, 1, 2, 3, 4, 5, 6, 7
];

const CRANE_joy_pins = [
    ['A1', 'A0'],         // Left [X, Y]
    ['A3', 'A2'],         // Right [X, Y]
]

const CRANE_joy_sw_pins = [
    '3',         // Left SW pin
    '2',         // Right SW pin
]

//
// Control blocks
//

// JOY:

Blockly.Arduino['crane_joystick'] = function (block) {
    var dropdown_type = this.getFieldValue('TYPE');
    var dropdown_xy = this.getFieldValue('XY');
    var joy_pin = CRANE_joy_pins[dropdown_type][dropdown_xy];
    Blockly.Arduino.setups_['setup_joy_' + dropdown_type + dropdown_xy] = 'pinMode(' + joy_pin + ', INPUT);';
    var code = 'analogRead(' + joy_pin + ')'
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['crane_joystick_sw'] = function (block) {
    var dropdown_type = this.getFieldValue('TYPE');
    var joy_sw_pin = CRANE_joy_sw_pins[dropdown_type];
    Blockly.Arduino.setups_['setup_joy_sw_' + dropdown_type] = 'pinMode(' + joy_sw_pin + ', INPUT_PULLUP);';
    var code = 'digitalRead(' + joy_sw_pin + ')'
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// LCD display:

Blockly.Arduino['crane_lcd_display'] = function (block) {
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

// Motors:

Blockly.Arduino['crane_motor_type'] = function (block) {
    var velue = this.getFieldValue('TYPE');
    var code = velue;
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['crane_motor_dir'] = function (block) {
    var velue = this.getFieldValue('DIR');
    var code = velue;
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['crane_motor_angle'] = function (block) {
    var velue = this.getFieldValue('ANGLE');
    var code = velue;
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['crane_setup_motors'] = function (motor) {

    if ( !CRANE_motors.includes(+motor) ) {
        return true;
    }

    var motor_id = "motor_" + motor;
    var motor_position = motor_id + "_position";
    var motor_position_min = motor_id + "_position_min";
    var motor_position_max = motor_id + "_position_max";
    var motor_step = motor_id + "_step";
    var motor_speed = motor_id + "_speed";
    var motor_task = motor_id + "_Task";

    Blockly.Arduino.definitions_['define_pca9685_control'] = '#include "PCA9685.h"\n';
    Blockly.Arduino.definitions_['define_wire_control'] = '#include <Wire.h>\n';

    Blockly.Arduino.variables_['pca9685_variables'] =
        'static PCA9685 driver_PCA9685;\n' +
        "static PCA9685_ServoEval servo_PCA9685(102, 512); // (-90deg, +90deg)\n";

    Blockly.Arduino.variables_['pca9685_variables_' + motor_id] =
        'static int ' + motor_position + ' = 0;  // Servo motor position (-90/90)\n' +
        'static int ' + motor_position_min + ' = -90;  // Servo motor position (-90/90)\n' +
        'static int ' + motor_position_max + ' = 90;  // Servo motor position (-90/90)\n' +
        'static int ' + motor_step + ' = 0;  // Servo motor step (-1/0/1)\n' +
        'static int ' + motor_speed + ' = 10;  // Servomotor move speed (ms/stopień)\n';

    Blockly.Arduino.userFunctions_["function_servo_control"] =
        "static int servoControlTask ( int chnl, int * position, int min, int max, int step )\n" +
        "{\n" +
        "  int newposition = *position + step;\n" +
        "  if ( (newposition <= max) && (newposition >= min) )\n" +
        "  {\n" +
        "    *position = newposition;\n" +
        "    driver_PCA9685.setChannelPWM(chnl, servo_PCA9685.pwmForAngle(newposition));\n" +
        "    return 1;\n" +
        "  }\n" +
        "  return 0;\n" +
        "}\n";

    Blockly.Arduino.userFunctions_["function_servo_move_" + motor_id] =
        "static int " + motor_id + "_servoMove ( int step, int speed )\n" +
        "{\n" +
        "  " + motor_step + " = step;\n" +
        "  if ( " + motor_speed + " != speed )\n" +
        "  {\n" +
        "    " + motor_speed + " = speed;\n" +
        "    " + motor_task + ".setPeriodMs ( speed );\n" +
        "  }\n" +
        "}\n";

    var servoMove = "static int servoMove ( int motor, int step, int speed )\n" +
        "{\n";
        for (var id of CRANE_motors) {
            for (var name in Blockly.Arduino.userFunctions_) {
                if (name.startsWith("function_servo_move_motor_" + id)) {
                    servoMove += "  if ( motor == " + id + " )\n" +
                    "  {\n" +
                    "    motor_" + id + "_servoMove ( step, speed );\n" +
                    "  }\n";        
                }
            }    
        }
        servoMove += "}\n";
    Blockly.Arduino.userFunctions_["function_servo_move"] = servoMove;

    Blockly.Arduino.userFunctions_["function_servo_position_" + motor_id] =
        "static int " + motor_id + "_servoPosition ( int position )\n" +
        "{\n" +
        "  " + motor_step + " = 0;\n" +
        "  " + motor_position + " = position;\n" +
        "}\n";

    var servoPosition = "static int servoPosition ( int motor, int position )\n" +
        "{\n";
        for (var id of CRANE_motors) {
            for (var name in Blockly.Arduino.userFunctions_) {
                if (name.startsWith("function_servo_position_motor_" + id)) {
                    servoPosition += "  if ( motor == " + id + " )\n" +
                    "  {\n" +
                    "    motor_" + id + "_servoPosition ( position );\n" +
                    "  }\n";        
                }
            }    
        }
        servoPosition += "}\n";
    Blockly.Arduino.userFunctions_["function_servo_position"] = servoPosition;
        
    Blockly.Arduino.userFunctions_["function_servo_setup_" + motor_id] =
        "static int " + motor_id + "_servoSetup ( int min, int max )\n" +
        "{\n" +
        "  " + motor_position_min + " = min;\n" +
        "  " + motor_position_max + " = max;\n" +
        "}\n";

    var servoSetup = "static int servoSetup ( int motor, int min, int max )\n" +
        "{\n";
        for (var id of CRANE_motors) {
            for (var name in Blockly.Arduino.userFunctions_) {
                if (name.startsWith("function_servo_setup_motor_" + id)) {
                    servoSetup += "  if ( motor == " + id + " )\n" +
                    "  {\n" +
                    "    motor_" + id + "_servoSetup ( min, max );\n" +
                    "  }\n";        
                }
            }    
        }
        servoSetup += "}\n";
    Blockly.Arduino.userFunctions_["function_servo_setup"] = servoSetup;

    Blockly.Arduino.setups_["setup_wire"] = "Wire.begin();  // Wire must be started first\n" +
        "  Wire.setClock(400000);  // Supported baud rates are 100kHz, 400kHz, and 1000kHz\n";

    Blockly.Arduino.setups_["setup_pca9685"] = "driver_PCA9685.resetDevices();  // Software resets all PCA9685 devices on Wire line\n" +
        "  driver_PCA9685.init();  // Address pins A5-A0 set to B000000\n" +
        "  driver_PCA9685.setPWMFrequency(50); // Set frequency to 50Hz\n";

    Blockly.Arduino.variables_['softtimer_variables_' + motor_id] = "static void " + motor_id + "_CyclicRun ( Task * self );\n" +
        'static Task ' + motor_task + ' ( ' + motor_speed + ', ' + motor_id + '_CyclicRun );\n';
    Blockly.Arduino.setups_['softtimer_setup_' + motor_id] = 'SoftTimer.add( &' + motor_task + ' );\n';

    Blockly.Arduino.handlers_['softtimer_cb_' + motor_id] =
        "static void " + motor_id + "_CyclicRun ( Task * self )\n" +
        "{\n" +
        "  servoControlTask ( " + motor + ", &" + motor_position + ", " + motor_position_min + ", " + motor_position_max + ", " + motor_step + " );\n" +
        "}\n";

    return true;
}

Blockly.Arduino['crane_motor'] = function (block) {
    var dropdown_function = Blockly.Arduino.valueToCode(this, 'FUNCTION', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var dropdown_motor = Blockly.Arduino.valueToCode(this, 'MOTOR', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var speed = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '10';

    var code = "";
    if ( Blockly.Arduino['crane_setup_motors'](dropdown_motor) ) {
        code = 'servoMove ( ' + dropdown_motor + ', ' + dropdown_function + ', ' + speed + ' );\n';
    }

    return code;
};

Blockly.Arduino['crane_motor_position'] = function (block) {
    var dropdown_motor = Blockly.Arduino.valueToCode(this, 'MOTOR', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var angle = Blockly.Arduino.valueToCode(this, 'ANGLE', Blockly.Arduino.ORDER_ATOMIC) || '0';

    var code = "";
    if ( Blockly.Arduino['crane_setup_motors'](dropdown_motor) ) {
        code = 'servoPosition ( ' + dropdown_motor + ', ' + angle + ' );\n';
    }

    return code;
}

Blockly.Arduino['crane_motor_position_get'] = function (block) {
    var dropdown_motor = Blockly.Arduino.valueToCode(this, 'MOTOR', Blockly.Arduino.ORDER_ATOMIC) || '0';

    var motor_id = "motor_" + dropdown_motor;
    var motor_position = motor_id + "_position";

    var code = "";
    if ( Blockly.Arduino['crane_setup_motors'](dropdown_motor) ) {
        code = motor_position;
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino['crane_motor_setup'] = function (block) {
    var dropdown_motor = Blockly.Arduino.valueToCode(this, 'MOTOR', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var min = Blockly.Arduino.valueToCode(this, 'MIN', Blockly.Arduino.ORDER_ATOMIC) || '-90';
    var max = Blockly.Arduino.valueToCode(this, 'MAX', Blockly.Arduino.ORDER_ATOMIC) || '90';

    Blockly.Arduino['crane_setup_motors'](dropdown_motor);

    var code = "";
    code = 'servoSetup ( ' + dropdown_motor + ', ' + min + ', ' + max + ' );\n';

    return code;
}

// Timer handler:

var crane_tm_id = 1000;
Blockly.Arduino.crane_timer_cyclic = function () {
    var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    Blockly.Arduino.handlers_['softtimer_cb_' + crane_tm_id] =
        "void t" + crane_tm_id + "_CyclicRun(Task * self)\n" +
        "{\n" +
        branch +
        "}\n";
    Blockly.Arduino.setups_['softtimer_def_' + crane_tm_id] = 'static Task t' + crane_tm_id + '( ' + time + ', t' + crane_tm_id + '_CyclicRun );';
    Blockly.Arduino.setups_['softtimer_setup_' + crane_tm_id] = 'SoftTimer.add( &t' + crane_tm_id + ' );\n';
    var code = "";
    crane_tm_id = crane_tm_id + 1;
    return code;
};

Blockly.Arduino.crane_timer_once = function () {
    var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    Blockly.Arduino.definitions_['delayrun_include'] = '#include <DelayRun.h>\n';
    Blockly.Arduino.handlers_['delayrun_cb_' + crane_tm_id] =
        "boolean t" + crane_tm_id + "_DelayedRun(Task * self)\n" +
        "{\n" +
        branch +
        "  return false;\n" +
        "}\n";
    var code =
        "static DelayRun t" + crane_tm_id + "( " + time + ", t" + crane_tm_id + "_DelayedRun );\n" +
        "t" + crane_tm_id + ".startDelayed();\n";
    crane_tm_id = crane_tm_id + 1;
    return code;
};