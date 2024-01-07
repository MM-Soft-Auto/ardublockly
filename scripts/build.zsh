#!/bin/zsh

ROOT=`pwd`

cd ..

rm -rf ./arduexec

cd blockly
python ./build.py
cd ..

python3 ./package/build_pyinstaller.py mac

cd ./package/electron

rm -rf ./dist

npm install
npm run build
cd ../../

cd $ROOT
