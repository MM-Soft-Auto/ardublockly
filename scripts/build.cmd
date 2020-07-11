@echo off

cd ../blockly
python ./build.py
cd ..

python3 ./package/build_pyinstaller.py

cd ./package/electron
call npm install
call npm run release
cd ../../

python ./package/pack_ardublockly.py
