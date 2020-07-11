'use strict';

goog.provide('Blockly.Blocks.auto');

goog.require('Blockly.Blocks');

/**
 * Common HSV hue for all blocks in this category.
 */

var AUTO_ctrlBlock_HUE = 100;

//
// Control blocks
//

Blockly.Blocks['auto_led'] = {
    init: function() {
        this.jsonInit({
            "type": "auto_led",
            "message0": Blockly.Msg.AUTO_LED_MESSAGE,
            "args0": [{
                "type": "field_dropdown",
                "name": "LED",
                "options": [
                    [Blockly.Msg.AUTO_LED_BACK, "ledB"],
                    [Blockly.Msg.AUTO_LED_FRONT, "ledF"],
                    [Blockly.Msg.AUTO_LED_TOP, "ledT"],
                    [Blockly.Msg.AUTO_LED_LEFT, "ledL"],
                    [Blockly.Msg.AUTO_LED_RIGHT, "ledR"],
                    [Blockly.Msg.AUTO_LED_ALL, "ledA"],
                    [Blockly.Msg.AUTO_LED_BACKLEFT, "ledBL"],
                    [Blockly.Msg.AUTO_LED_BACKRIGHT, "ledBR"],
                    [Blockly.Msg.AUTO_LED_TOPLEFT, "ledTL"],
                    [Blockly.Msg.AUTO_LED_TOPRIGHT, "ledTR"],
                    [Blockly.Msg.AUTO_LED_FRONTLEFTG, "ledFLG"],
                    [Blockly.Msg.AUTO_LED_FRONTRIGHTG, "ledFRG"],
                    [Blockly.Msg.AUTO_LED_FRONTLEFTY, "ledFLY"],
                    [Blockly.Msg.AUTO_LED_FRONTRIGHTY, "ledFRY"]
                ]
            }, {
                "type": "field_dropdown",
                "name": "VALUE",
                "options": [
                    [Blockly.Msg.AUTO_LED_ON, "1"],
                    [Blockly.Msg.AUTO_LED_OFF, "0"]
                ]
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": AUTO_ctrlBlock_HUE + 70,
            "tooltip": Blockly.Msg.AUTO_LED_TIP,
            "helpUrl": "https://www.thingiverse.com/thing:2662828"
        });
    }
};

Blockly.Blocks['auto_buzzer'] = {
    init: function() {
        this.jsonInit({
            "type": "auto_buzzer",
            "message0": Blockly.Msg.AUTO_BUZZER_MESSAGE,
            "args0": [{
                "type": "field_dropdown",
                "name": "VALUE",
                "options": [
                    [Blockly.Msg.AUTO_BUZZER_ON, "LOW"],
                    [Blockly.Msg.AUTO_BUZZER_OFF, "HIGH"]
                ]
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": AUTO_ctrlBlock_HUE,
            "tooltip": Blockly.Msg.AUTO_BUZZER_TIP,
            "helpUrl": "https://www.thingiverse.com/thing:2662828"
        });
    }
};

Blockly.Blocks['auto_motor'] = {
    init: function() {
        this.jsonInit({
            "type": "auto_motor",
            "message0": Blockly.Msg.AUTO_MOTOR_MESSAGE,
            "args0": [{
                    "type": "field_dropdown",
                    "name": "MOTOR",
                    "options": [
                        [Blockly.Msg.AUTO_MOTOR_RIGHT, "motorR"],
                        [Blockly.Msg.AUTO_MOTOR_LEFT, "motorL"],
                        [Blockly.Msg.AUTO_MOTOR_ALL, "motorALL"],
                        [Blockly.Msg.AUTO_MOTOR_FRONTRIGHT, "motorFR"],
                        [Blockly.Msg.AUTO_MOTOR_FRONTLEFT, "motorFL"],
                        [Blockly.Msg.AUTO_MOTOR_BACKRIGHT, "motorBR"],
                        [Blockly.Msg.AUTO_MOTOR_BACKLEFT, "motorBL"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "FUNCTION",
                    "options": [
                        [Blockly.Msg.AUTO_MOTOR_FORWARD, "forward"],
                        [Blockly.Msg.AUTO_MOTOR_BACKWARD, "backward"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "SPEED",
                    "check": Blockly.Types.NUMBER.checkList
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": AUTO_ctrlBlock_HUE + 50,
            "tooltip": Blockly.Msg.AUTO_MOTOR_TIP,
            "helpUrl": "https://www.thingiverse.com/thing:2662828"
        });
    }
};

Blockly.Blocks['auto_motor_stop'] = {
    init: function() {
        this.jsonInit({
            "type": "auto_motor",
            "message0": Blockly.Msg.AUTO_MOTOR_STOP_MESSAGE,
            "args0": [{
                "type": "field_dropdown",
                "name": "MOTOR",
                "options": [
                    [Blockly.Msg.AUTO_MOTOR_RIGHT, "motorR"],
                    [Blockly.Msg.AUTO_MOTOR_LEFT, "motorL"],
                    [Blockly.Msg.AUTO_MOTOR_ALL, "motorALL"],
                    [Blockly.Msg.AUTO_MOTOR_FRONTRIGHT, "motorFR"],
                    [Blockly.Msg.AUTO_MOTOR_FRONTLEFT, "motorFL"],
                    [Blockly.Msg.AUTO_MOTOR_BACKRIGHT, "motorBR"],
                    [Blockly.Msg.AUTO_MOTOR_BACKLEFT, "motorBL"]
                ]
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": AUTO_ctrlBlock_HUE + 50,
            "tooltip": Blockly.Msg.AUTO_MOTOR_STOP_TIP,
            "helpUrl": "https://www.thingiverse.com/thing:2662828"
        });
    }
};

Blockly.Blocks['auto_lcd_display'] = {
    init: function() {
        this.jsonInit({
            "type": "auto_lcd_display",
            "message0": Blockly.Msg.AUTO_LCD_MESSAGE,
            "args0": [{
                    "type": "input_value",
                    "name": "POSX",
                    "check": Blockly.Types.NUMBER.checkList
                },
                {
                    "type": "input_value",
                    "name": "POSY",
                    "check": Blockly.Types.NUMBER.checkList
                },
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": Blockly.Types.TEXT.checkList.concat('Array')
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": AUTO_ctrlBlock_HUE + 100,
            "tooltip": Blockly.Msg.AUTO_LCD_TIP,
            "helpUrl": "https://www.thingiverse.com/thing:2662828"
        });
    }
};

Blockly.Blocks['auto_ultrasonic'] = {
    init: function() {
        this.setColour(AUTO_ctrlBlock_HUE + 150);
        this.appendDummyInput()
            .appendField(Blockly.Msg.AUTO_USS_MESSAGE)
            .appendField(new Blockly.FieldDropdown([
                ["cm", "cm"],
                ["inch", "inch"]
            ]), "UNIT");
        this.setOutput(true, Blockly.Types.NUMBER.output);
        this.setTooltip(Blockly.Msg.AUTO_USS_TIP);
    },
    getBlockType: function() {
        return Blockly.Types.NUMBER;
    }
};

// Blockly.Blocks['auto_ir'] = {
//     init: function() {
//         this.setColour(AUTO_ctrlBlock_HUE + 150);
//         this.appendDummyInput()
//             .appendField("IR Sensor active");
//         this.setOutput(true, Blockly.Types.BOOLEAN.output);
//         this.setTooltip('Non-contact IR obstacle detection module');
//     },
//     getBlockType: function() {
//         return Blockly.Types.BOOLEAN;
//     }
// };

Blockly.Blocks['auto_bt_command'] = {
    init: function() {
        this.jsonInit({
            "type": "auto_bt_command",
            "message0": Blockly.Msg.AUTO_BT_CMD,
            "args0": [{
                "type": "input_value",
                "name": "CMD",
                "check": Blockly.Types.TEXT.checkList.concat('Array')
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": AUTO_ctrlBlock_HUE - 50,
            "tooltip": Blockly.Msg.AUTO_BT_TIP1,
            "helpUrl": "http://arduinolearning.com/learning/arduino-and-hc-06-bluetooth-example.php"
        });
        this.appendStatementInput('DO').appendField(Blockly.Msg.AUTO_BT_DO);
    }
};

Blockly.Blocks['auto_bt_message'] = {
    init: function() {
        this.jsonInit({
            "type": "auto_bt_message",
            "message0": Blockly.Msg.AUTO_BT_MSG,
            "args0": [{
                "type": "input_value",
                "name": "CMD",
                "check": Blockly.Types.TEXT.checkList.concat('Array')
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": AUTO_ctrlBlock_HUE - 50,
            "tooltip": Blockly.Msg.AUTO_BT_TIP2,
            "helpUrl": "http://arduinolearning.com/learning/arduino-and-hc-06-bluetooth-example.php"
        });
    }
};

Blockly.Blocks['auto_timer_cyclic'] = {
    init: function() {
        this.jsonInit({
            "type": "auto_timer_cyclic",
            "message0": Blockly.Msg.AUTO_CYCLIC_MESSAGE,
            "args0": [{
                "type": "input_value",
                "name": "TIME",
                "check": Blockly.Types.NUMBER.checkList
            }],
            "inputsInline": true,
            // "previousStatement": null,
            // "nextStatement": null,
            "colour": AUTO_ctrlBlock_HUE - 30,
            "tooltip": Blockly.Msg.AUTO_CYCLIC_TIP,
            "helpUrl": "https://github.com/nettigo/Timers"
        });
        this.appendStatementInput('DO').appendField(Blockly.Msg.AUTO_CYCLIC_DO);
    }
};

Blockly.Blocks['auto_timer_once'] = {
    init: function() {
        this.jsonInit({
            "type": "auto_timer_once",
            "message0": Blockly.Msg.AUTO_ONCE_MESSAGE,
            "args0": [{
                "type": "input_value",
                "name": "TIME",
                "check": Blockly.Types.NUMBER.checkList
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": AUTO_ctrlBlock_HUE - 20,
            "tooltip": Blockly.Msg.AUTO_ONCE_TIP,
            "helpUrl": "https://github.com/nettigo/Timers"
        });
        this.appendStatementInput('DO').appendField(Blockly.Msg.AUTO_ONCE_DO);
    }
};