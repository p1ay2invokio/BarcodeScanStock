@echo off
start "" cmd /k "cd client && npm install --force && exit"
start "" cmd /k "cd scanner-backend && npm install && exit"