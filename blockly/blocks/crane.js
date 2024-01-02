'use strict';

goog.provide('Blockly.Blocks.crane');

goog.require('Blockly.Blocks');

/**
 * Common HSV hue for all blocks in this category.
 */

var CRANE_ctrlBlock_HUE = 50;

//
// Control blocks
//

Blockly.Blocks['crane_lcd_display'] = {
    init: function () {
        this.jsonInit({
            "type": "crane_lcd_display",
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
            "colour": CRANE_ctrlBlock_HUE + 100,
            "tooltip": Blockly.Msg.AUTO_LCD_TIP,
            "helpUrl": "https://www.thingiverse.com/thing:1015238"
        });
    }
};

Blockly.Blocks['crane_joystick'] = {
    init: function () {
        this.setColour(CRANE_ctrlBlock_HUE + 150);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CRANE_JOY_MESSAGE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.CRANE_JOY_LEFT, "1"],
                [Blockly.Msg.CRANE_JOY_RIGHT, "0"]
            ]), "TYPE")
            .appendField(Blockly.Msg.CRANE_JOY_XY)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.CRANE_JOY_X, "0"],
                [Blockly.Msg.CRANE_JOY_Y, "1"]
            ]), "XY");
        this.setOutput(true, Blockly.Types.NUMBER.output);
        this.setTooltip(Blockly.Msg.CRANE_JOY_TIP);
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['crane_joystick_sw'] = {
    init: function () {
        this.setColour(CRANE_ctrlBlock_HUE + 150);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CRANE_JOY_SW_MESSAGE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.CRANE_JOY_LEFT, "1"],
                [Blockly.Msg.CRANE_JOY_RIGHT, "0"]
            ]), "TYPE");
        this.setOutput(true, Blockly.Types.BOOLEAN.output);
        this.setTooltip(Blockly.Msg.CRANE_JOY_SW_TIP);
    },
    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};

// Motor (servo):

Blockly.Types.MOTOR_TYPE = new Blockly.Type({
    typeId: 'Number',
    typeMsgName: 'CRANE_MOTOR_TYPE',
    compatibleTypes: [
        Blockly.Types.NUMBER
    ]
});

Blockly.Blocks['crane_motor_type'] = {
    init: function () {
        this.setColour(CRANE_ctrlBlock_HUE + 120);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CRANE_MOTOR)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.CRANE_MOTOR_HANDLE, "0"],
                [Blockly.Msg.CRANE_MOTOR_VERTICAL, "1"],
                [Blockly.Msg.CRANE_MOTOR_HORIZONTAL, "2"],
                [Blockly.Msg.CRANE_MOTOR_DEPTH, "3"]
            ]), "TYPE");
        this.setOutput(true, Blockly.Types.MOTOR_TYPE.output);
        this.setTooltip(Blockly.Msg.CRANE_MOTOR_TYPE_TIP);
        this.setHelpUrl("https://www.thingiverse.com/thing:1015238");
    }
};

Blockly.Types.MOTOR_DIR = new Blockly.Type({
    typeId: 'Number',
    typeMsgName: 'CRANE_MOTOR_DIR',
    compatibleTypes: [
        Blockly.Types.NUMBER
    ]
});

Blockly.Blocks['crane_motor_dir'] = {
    init: function () {
        this.setColour(CRANE_ctrlBlock_HUE + 120);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CRANE_MOTOR_MOVE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.CRANE_MOTOR_FORWARD, "1"],
                [Blockly.Msg.CRANE_MOTOR_STOP, "0"],
                [Blockly.Msg.CRANE_MOTOR_BACKWARD, "-1"]
            ]), "DIR");
        this.setOutput(true, Blockly.Types.MOTOR_DIR.output);
        this.setTooltip(Blockly.Msg.CRANE_MOTOR_DIR_TIP);
        this.setHelpUrl("https://www.thingiverse.com/thing:1015238");
    }
};

Blockly.Types.MOTOR_ANGLE = new Blockly.Type({
    typeId: 'Number',
    typeMsgName: 'CRANE_MOTOR_ANGLE_TYPE',
    compatibleTypes: [
        Blockly.Types.NUMBER
    ]
});

Blockly.Blocks['crane_motor_angle'] = {
    init: function () {
        Blockly.FieldAngle.WRAP = 180;
        Blockly.FieldAngle.OFFSET = 90;
        this.setColour(CRANE_ctrlBlock_HUE + 120);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CRANE_MOTOR_ANGLE)
            .appendField(new Blockly.FieldAngle('0', this.validate.bind(this)), 'ANGLE');
        this.setOutput(true, Blockly.Types.MOTOR_ANGLE.output);
        this.setTooltip(Blockly.Msg.CRANE_MOTOR_ANGLE_TIP);
        this.setHelpUrl("https://www.thingiverse.com/thing:1015238");
        this.validate(this.getFieldValue('ANGLE'));
    },
    validate: function (value) {
        if (value > 90) {
            return 90;
        }
        if (value < -90) {
            return -90;
        }
        return value;
    }
};

Blockly.Blocks['crane_motor_position_get'] = {
    init: function () {
        this.setColour(CRANE_ctrlBlock_HUE + 150);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CRANE_MOTOR_POSITION_GET);
        this.appendValueInput('MOTOR')
            .setCheck(Blockly.Types.MOTOR_TYPE.checkList)
        this.setOutput(true, Blockly.Types.MOTOR_ANGLE.output);
        this.setTooltip(Blockly.Msg.CRANE_MOTOR_POSITION_GET_TIP);
        this.setInputsInline(true);
    },
    getBlockType: function () {
        return Blockly.Types.MOTOR_ANGLE;
    }
};

Blockly.Blocks['crane_motor_setup'] = {
    init: function () {
        Blockly.FieldAngle.WRAP = 180;
        Blockly.FieldAngle.OFFSET = 90;
        this.setColour(CRANE_ctrlBlock_HUE - 20);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CRANE_MOTOR_SETUP_1);
        this.appendValueInput('MOTOR')
            .setCheck(Blockly.Types.MOTOR_TYPE.checkList)
        this.appendDummyInput()
            .appendField(Blockly.Msg.CRANE_MOTOR_SETUP_2);
        this.appendValueInput('MIN')
            .setCheck(Blockly.Types.MOTOR_ANGLE.checkList);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CRANE_MOTOR_SETUP_3);
        this.appendValueInput('MAX')
            .setCheck(Blockly.Types.MOTOR_ANGLE.checkList);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.CRANE_MOTOR_SETUP_TIP);
        this.setHelpUrl("https://www.thingiverse.com/thing:1015238");
    }
};

Blockly.Blocks['crane_motor'] = {
    init: function () {
        this.jsonInit({
            "type": "crane_motor",
            "message0": Blockly.Msg.CRANE_MOTOR_SET,
            "args0": [{
                "type": "input_value",
                "name": "MOTOR",
                "check": Blockly.Types.MOTOR_TYPE.checkList
            },
            {
                "type": "input_value",
                "name": "FUNCTION",
                "check": Blockly.Types.MOTOR_DIR.checkList
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
            "colour": CRANE_ctrlBlock_HUE + 50,
            "tooltip": Blockly.Msg.CRANE_MOTOR_TIP,
            "helpUrl": "https://www.thingiverse.com/thing:1015238"
        });
    }
};

Blockly.Blocks['crane_motor_position'] = {
    init: function () {
        Blockly.FieldAngle.WRAP = 180;
        Blockly.FieldAngle.OFFSET = 90;
        this.setColour(CRANE_ctrlBlock_HUE + 50);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CRANE_MOTOR_POSITION_1);
        this.appendValueInput('MOTOR')
            .setCheck(Blockly.Types.MOTOR_TYPE.checkList)
        this.appendDummyInput()
            .appendField(Blockly.Msg.CRANE_MOTOR_POSITION_2);
        this.appendValueInput('ANGLE')
            .setCheck(Blockly.Types.MOTOR_ANGLE.checkList);
        // this.appendDummyInput()
        //     .appendField(Blockly.Msg.CRANE_MOTOR_POSITION_3);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.CRANE_MOTOR_POSITION_TIP);
        this.setHelpUrl("https://www.thingiverse.com/thing:1015238");
    }
};

Blockly.Blocks['crane_timer_cyclic'] = {
    init: function () {
        this.jsonInit({
            "type": "crane_timer_cyclic",
            "message0": Blockly.Msg.AUTO_CYCLIC_MESSAGE,
            "args0": [{
                "type": "input_value",
                "name": "TIME",
                "check": Blockly.Types.NUMBER.checkList
            }],
            "inputsInline": true,
            // "previousStatement": null,
            // "nextStatement": null,
            "colour": CRANE_ctrlBlock_HUE - 30,
            "tooltip": Blockly.Msg.AUTO_CYCLIC_TIP,
            "helpUrl": "https://github.com/nettigo/Timers"
        });
        this.appendStatementInput('DO').appendField(Blockly.Msg.AUTO_CYCLIC_DO);
    }
};

Blockly.Blocks['crane_timer_once'] = {
    init: function () {
        this.jsonInit({
            "type": "crane_timer_once",
            "message0": Blockly.Msg.AUTO_ONCE_MESSAGE,
            "args0": [{
                "type": "input_value",
                "name": "TIME",
                "check": Blockly.Types.NUMBER.checkList
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": CRANE_ctrlBlock_HUE - 20,
            "tooltip": Blockly.Msg.AUTO_ONCE_TIP,
            "helpUrl": "https://github.com/nettigo/Timers"
        });
        this.appendStatementInput('DO').appendField(Blockly.Msg.AUTO_ONCE_DO);
    }
};