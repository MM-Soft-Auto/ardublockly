'use strict';

goog.provide('Blockly.Blocks.smars');

goog.require('Blockly.Blocks');

/**
 * Common HSV hue for all blocks in this category.
 */

var SMARS_ctrlBlock_HUE = 100;

//
// Control blocks
//

Blockly.Blocks['smars_led'] = {
    init: function() {
        this.jsonInit({
            "type": "smars_led",
            "message0": "Set LED %1",
            "args0": [{
                "type": "field_dropdown",
                "name": "VALUE",
                "options": [
                    ["On", "HIGH"],
                    ["Off", "LOW"]
                ]
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": SMARS_ctrlBlock_HUE,
            "tooltip": "LED signaling output",
            "helpUrl": "https://www.thingiverse.com/thing:2662828"
        });
    }
};

Blockly.Blocks['smars_buzzer'] = {
    init: function() {
        this.jsonInit({
            "type": "smars_buzzer",
            "message0": "Buzzer set %1",
            "args0": [{
                "type": "field_dropdown",
                "name": "VALUE",
                "options": [
                    ["On", "HIGH"],
                    ["Off", "LOW"]
                ]
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": SMARS_ctrlBlock_HUE,
            "tooltip": "Buzzer signal generator",
            "helpUrl": "https://www.thingiverse.com/thing:2662828"
        });
    }
};

Blockly.Blocks['smars_motor'] = {
    init: function() {
        this.jsonInit({
            "type": "smars_motor",
            "message0": "Motor %1 %2 speed %3",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "MOTOR",
                    "options": [
                        ["A", "motorA"],
                        ["B", "motorB"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "FUNCTION",
                    "options": [
                        ["Forward", "forward"],
                        ["Backward", "backward"]
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
            "colour": SMARS_ctrlBlock_HUE + 50,
            "tooltip": "DC motor forward/backward action",
            "helpUrl": "https://www.thingiverse.com/thing:2662828"
        });
    }
};

Blockly.Blocks['smars_motor_stop'] = {
    init: function() {
        this.jsonInit({
            "type": "smars_motor",
            "message0": "Motor %1 STOP",
            "args0": [{
                "type": "field_dropdown",
                "name": "MOTOR",
                "options": [
                    ["A", "motorA"],
                    ["B", "motorB"]
                ]
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": SMARS_ctrlBlock_HUE + 50,
            "tooltip": "DC motor stop action",
            "helpUrl": "https://www.thingiverse.com/thing:2662828"
        });
    }
};

Blockly.Blocks['smars_led_display'] = {
    init: function() {
        this.jsonInit({
            "type": "smars_led_display",
            "message0": "LED Display show value %1",
            "args0": [{
                "type": "input_value",
                "name": "VALUE",
                "check": Blockly.Types.NUMBER.checkList
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": SMARS_ctrlBlock_HUE + 100,
            "tooltip": "7-segments LED numeric display",
            "helpUrl": "https://www.thingiverse.com/thing:2662828"
        });
    }
};

Blockly.Blocks['smars_ultrasonic'] = {
    init: function() {
        this.setColour(SMARS_ctrlBlock_HUE + 150);
        this.appendDummyInput()
            .appendField("Ultrasonic Sensor distance")
            .appendField(new Blockly.FieldDropdown([
                ["cm", "cm"],
                ["inch", "inch"]
            ]), "UNIT");
        this.setOutput(true, Blockly.Types.NUMBER.output);
        this.setTooltip('Non-contact Ultrasonic distance measurement module');
    },
    getBlockType: function() {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['smars_ir'] = {
    init: function() {
        this.setColour(SMARS_ctrlBlock_HUE + 150);
        this.appendDummyInput()
            .appendField("IR Sensor active");
        this.setOutput(true, Blockly.Types.BOOLEAN.output);
        this.setTooltip('Non-contact IR obstacle detection module');
    },
    getBlockType: function() {
        return Blockly.Types.BOOLEAN;
    }
};

Blockly.Blocks['smars_bt_command'] = {
    init: function() {
        this.jsonInit({
            "type": "smars_bt_command",
            "message0": "BT command %1",
            "args0": [{
                "type": "input_value",
                "name": "CMD",
                "check": Blockly.Types.TEXT.checkList.concat('Array')
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": SMARS_ctrlBlock_HUE - 50,
            "tooltip": "HC-06 Bluetooth command handler",
            "helpUrl": "http://arduinolearning.com/learning/arduino-and-hc-06-bluetooth-example.php"
        });
        this.appendStatementInput('DO').appendField('do');
    }
};

Blockly.Blocks['smars_timer_cyclic'] = {
    init: function() {
        this.jsonInit({
            "type": "smars_timer_cyclic",
            "message0": "On every %1 ms",
            "args0": [{
                "type": "input_value",
                "name": "TIME",
                "check": Blockly.Types.NUMBER.checkList
            }],
            "inputsInline": true,
            // "previousStatement": null,
            // "nextStatement": null,
            "colour": SMARS_ctrlBlock_HUE - 30,
            "tooltip": "Cyclic Timer handler",
            "helpUrl": "https://github.com/nettigo/Timers"
        });
        this.appendStatementInput('DO').appendField('do');
    }
};

Blockly.Blocks['smars_timer_once'] = {
    init: function() {
        this.jsonInit({
            "type": "smars_timer_once",
            "message0": "In %1 ms",
            "args0": [{
                "type": "input_value",
                "name": "TIME",
                "check": Blockly.Types.NUMBER.checkList
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": SMARS_ctrlBlock_HUE - 20,
            "tooltip": "One shoot Timer handler",
            "helpUrl": "https://github.com/nettigo/Timers"
        });
        this.appendStatementInput('DO').appendField('do');
    }
};