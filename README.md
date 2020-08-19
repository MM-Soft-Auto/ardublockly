# Auto-Blockly

Auto-Blockly is a visual programming editor for Arduino based Auto. Project is forked form the original [Ardublokckly][0] project. It is based on Google's [Blockly][1], which has been forked to generate [Arduino][15] code.

The `ArdublocklyServer` Python package initialises a local server to be able to compile and load the Arduino code using the [Arduino IDE][2].

This is all packaged in a self contained executable desktop application for Windows, Mac OS X, and Linux.

![Ardublockly desktop program screenshot][desktop_screeshot]

## Features

- Generates Arduino-Auto code with visual drag-and-drop blocks
- Uploads the code to an Arduino-Auto Board
- Useful "code block warnings"
- Includes additional components to support Auto platform
- Works on Windows / Linux / Mac OS X

Currently tested under Windows with Python 2.7 and 3.4 and in Linux and MacOS X with Python 2.7.

## Cloning the repository

Please note that there are submodules in the repository that need initialisation. So, to correctly clone the Ardublockly repository:

```
git clone https://github.com/MM-Soft-Auto/ardublockly.git
cd ardublockly
git submodule update --init --recursive
```

## Building

The desktop application is available for Windows/Linux and runs as a stand-alone executable. Final executable package is stored in the `release/` directory.

#### Linux

To build executable for Linux you can use available build scripts.

```
script\build.sh
```

#### Windows

To build executable for Windows you can use available build scripts.

```
script\build.cmd
```

There is also additional installation package project available for Windows platform. This helps to package all required components in one distribution package.

#### "Core version" (Python server only)

If you prefer, the core software can be used by running only the Python server, which loads the web interface on your local browser (Chrome recommended).

Full installation instructions for this version can be found in [this Github repository Wiki][5].

The quick version: Clone this repository, initialise all submodules, and execute:

```
python start.py
```

This will work on Windows, Linux (including ARM) and Mac OS X, with Python >2.7 or >3.4

## Running

1. [Install Ardublockly][5].
2. Install the [Arduino IDE][2] version 1.6.x or higher (latest version is always recommended).
3. Run Ardublockly as defined in your installation method.
4. Configure Ardublockly to locate the Arduino IDE [following these instructions][6].

## Documentation

The documentation, including installation instructions, configuration instructions, and developer information can be found in the [Ardublockly GitHub repository Wiki][7].

To download the documentation you can git clone the wiki data:

```
git clone https://github.com/carlosperate/ardublockly.wiki.git
```

## Extensions

To extend current Arduino-Auto programming system it is possible to define new blocks in Auto toolbox. To do this you have to extend/modify the folowing elements:

1. Define new Blockly block in blockly\blocks\auto.js
2. Define code generator for your new block in blockly\generators\arduino\auto.js
3. Add new block to Auto toolbox defined in ardublockly_toolbox.js
4. Rebuild the project and create new installer (if needed) 

## Credit

This project has been inspired by [Ardublockly][0].

Blockly original source is Copyright of Google Inc. [https://developers.google.com/blockly/][1]. A list of changes to the Blockly fork can be found in the [Blockly subdirectory README][17] file.

## License

License is derived from the original Ardublockly project.

Unless stated otherwise, the source code of this projects is
licensed under the Apache License, Version 2.0 (the "License");
you may not use any of the licensed files within this project
except in compliance with the License.

The full document can be found in the [LICENSE][9] file.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[0]: https://github.com/carlosperate/ardublockly/
[1]: https://developers.google.com/blockly/
[2]: http://www.arduino.cc/en/main/software/
[3]: TODO.md
[4]: https://github.com/carlosperate/ardublockly/releases/
[5]: https://github.com/carlosperate/ardublockly/wiki/Installing-Ardublockly
[6]: https://github.com/carlosperate/ardublockly/wiki/Configure-Ardublockly
[7]: https://github.com/carlosperate/ardublockly/wiki
[8]: https://github.com/carlosperate/ardublockly/compare/blockly-original...master
[9]: https://github.com/carlosperate/ardublockly/blob/master/LICENSE
[10]: http://ardublockly.embeddedlog.com/demo/index.html
[11]: http://ardublockly.embeddedlog.com/demo/classic/index.html
[12]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html?prefix=linux/
[13]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html?prefix=windows/
[14]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html?prefix=mac/
[15]: http://www.arduino.cc
[16]: https://github.com/BlocklyDuino/BlocklyDuino
[17]: blockly/README.md
[desktop_screeshot]: http://carlosperate.github.io/ardublockly/images/screenshot_desktop_1.png
[web_screenshot_responsive]: http://carlosperate.github.io/ardublockly/images/screenshot_material_all_small.jpg
[web_screenshot_classic]: http://carlosperate.github.io/ardublockly/images/screenshot_1.png
