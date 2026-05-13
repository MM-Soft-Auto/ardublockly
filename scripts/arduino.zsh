#!/bin/zsh

/Applications/Arduino.app/Contents/MacOS/Arduino ArdublocklySketch.ino --verify --board arduino:avr:uno

# Find the process PID holding port 8088
lsoff -i :8088