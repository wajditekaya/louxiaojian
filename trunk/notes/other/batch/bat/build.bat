@echo off
setlocal EnableDelayedExpansion
REM 一定要加上上面这句，下面的echo !RESULT_FILE!才有效

color B
::设置YUI Compressor启动目录
title CSS,JS文件统一压缩发布
SET YUIFOLDER=D:\yuicompressor
::设置你的JS和CSS根目录，脚本会自动按树层次查找和压缩所有的JS和CSS
SET FOLDER=F:\batch\bat\src
echo 正在查找 JavaScript, CSS ...
chdir /d %FOLDER%

for /r . %%a in (*.source.css *.source.js) do (

REM 获取压缩后的文件名，规则为：
REM 1. 文件名有.source时: filename.source.js -> filename.js
REM 2. 其它情况：filename.js -> filename-min.js
set RESULT_FILE=%%~na-min%%~xa
dir /b "%%~fa" | find ".source." > nul
if %ERRORLEVEL% == 0 (
    for %%w in ("%%~na") do (
        REM echo %%~nw%%~xa
        set RESULT_FILE=%%~nw%%~xa
    )
)
REM echo !RESULT_FILE!


REM echo 盘符：%%~da
REM echo %%~pa
REM echo 文件的名字：%%~na
REM echo 文件的后缀名：%%~xa
REM echo 文件的大小：%%~za

@java -jar %YUIFOLDER%\yuicompressor.jar --charset GB2312 "%%~fa" -o "%%~da%%~pa!RESULT_FILE!"
@echo compressed %%~xa file done %%~a ...压缩为!RESULT_FILE!

set /a filenub=filenub+1
REM ren "%%~fa123" "waitan-!a!%%~xa"
REM echo 合成的路径为：%%~da%%~pa%%~na

)
REM echo %RESULT_FILE%
echo 压缩完成了%filenub%个文件
pause & exit