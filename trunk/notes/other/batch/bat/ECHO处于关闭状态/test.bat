@echo off
for /l %%i in (1 1 10) do (
set var=%%i
echo %var%
)
pause & exit