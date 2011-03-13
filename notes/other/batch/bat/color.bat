@echo off 
title 变色小玩

echo 选择两个选项就可以改变背景和文字的颜色。
echo.
echo.
echo.
echo      ******************************** 
echo.
echo         0 = 黑色       8 = 灰色
echo         1 = 蓝色       9 = 淡蓝色
echo         2 = 绿色       A = 淡绿色
echo         3 = 湖蓝色     B = 淡浅绿色
echo         4 = 红色       C = 淡红色
echo         5 = 紫色       D = 淡紫色
echo         6 = 黄色       E = 淡黄色
echo         7 = 白色       F = 亮白色
echo.
echo      ********************************
echo.
echo.
echo.
:start
set num=
set /p num=输入上述选项中的任意两个颜色值: 
if %num%=="0" goto bianse
:bianse
echo.
echo    开始变色了......
echo.
color %num%
echo    变色结束，请重新选择：
echo.
goto start