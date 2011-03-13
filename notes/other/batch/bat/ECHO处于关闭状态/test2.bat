@echo off
set var=abc
for /l %%i in (1 1 10) do (
set var=%%i
echo %var%
)
pause & exit