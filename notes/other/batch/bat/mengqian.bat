@echo off 
set a=99
setlocal EnableDelayedExpansion 
for %%n in (*.jpg) do ( 
set /A a+=1 
ren "%%n" "waitan-!a!.jpg" 
)
echo 处理完成
echo. & pause