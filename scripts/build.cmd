@echo off

cd ..

del /F /S /Q .\arduexec

cd .\blockly
c:\python27\python .\build.py
cd ..

python .\package\build_pyinstaller.py

cd .\package\electron

del /F /S /Q .\dist

npm install && npm run build && cd ..\..\
