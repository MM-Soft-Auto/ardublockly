#!/bin/bash

ROOT=`pwd`

cd ..

cd blockly
./build.py
cd ..

python3 ./package/build_pyinstaller.py

cd ./package/electron
npm install
npm run release
cd ../../

python package/pack_ardublockly.py

cd $ROOT
