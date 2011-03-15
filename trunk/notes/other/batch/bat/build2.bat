@echo off
setlocal EnableDelayedExpansion

color B
title CSS,JS文件统一压缩发布
SET CurrentDirectory="%~dp0"
::设置YUI Compressor启动目录
SET YUIFOLDER="D:\TBCompressor"

REM 获取相对路径
set layers=0
set "cur_dir=%cd%\"
:get_cd_layers
set "cur_dir=%cur_dir:*\=%"
if not "%cur_dir%"=="" set /a layers+=1&goto get_cd_layers
REM 获取相对路径结束

::设置你的JS和CSS根目录，脚本会自动按树层次查找和压缩所有的JS和CSS
SET FOLDER=%CurrentDirectory%src
echo 开始压缩 JavaScript, CSS ...
chdir /d %FOLDER%

for /r . %%a in (*.source.css *.source.js) do (

REM 获取压缩后的文件名，规则为：
REM 1. 文件名有.source时: filename.source.js -> filename.js
REM 2. 其它情况：filename.js -> filename-min.js

set RESULT_FILE=%%~na-min%%~xa
dir /b "%%~a" | find ".source." > nul
if %ERRORLEVEL% == 0 (
    for %%w in ("%%~na") do (
        REM echo %%~nw%%~xa
        set RESULT_FILE=%%~nw%%~xa
    )
)

@java -jar %YUIFOLDER%\yuicompressor.jar --charset GB2312 "%%~fa" -o "%%~da%%~pa!RESULT_FILE!"
REM @echo compressed %%~xa file done %%~fa 压缩为!RESULT_FILE!

set /a filenub=filenub+1

REM 获取相对路径(这里传入了三个参数)
call :intercept "%%~dpnxa"  "%%~xa"  "to !RESULT_FILE!"
REM 获取相对路径结束

)

echo 压缩完成了%filenub%个文件
pause & exit

REM 获取相对路径
:intercept
set num=0
set sub_path=%1
set sub_path=%sub_path:~1,-1%

REM 接受call传来的第二个参数(删除引号后的)
set type=%~2%
REM 接受call传来的第三个参数(删除引号后的)
REM %~3%中间的~表示去除参数中的引号
set ll=%~3%

:loop
set sub_path=%sub_path:*\=%
if not %num% equ %layers% set /a num+=1&goto loop
echo compressed %type% file: %sub_path% %ll%
goto :eof
REM 获取相对路径结束

