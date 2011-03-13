@echo off
setlocal EnableDelayedExpansion
set var=abc
for /l %%i in (1 1 10) do (
set var=%%i
echo %var%
echo !var!
)
pause & exit