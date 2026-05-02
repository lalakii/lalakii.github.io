@echo off
rd /s /q .git
git init
git remote add origin https://github.com/lalakii/lalakii.github.io
git add .
git commit -m ":rocket: clean all."
git push -f origin master
clear