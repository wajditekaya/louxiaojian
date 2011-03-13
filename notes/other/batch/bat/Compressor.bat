
@echo off 
::设置YUI Compressor启动目录 
SET YUIFOLDER=D:\yuicompressor

::设置你的JS和CSS根目录，脚本会自动按树层次查找和压缩所有的JS和CSS 
SET INFOLDER=F:\batch\bat\t 
SET OUTFOLDER=F:\batch\bat\src
echo 正在查找 JavaScript, CSS ... 
chdir /d %INFOLDER% 

for /r . %%a in (*.source.css *.source.js) do ( 
copy %%a "%OUTFOLDER%\" && echo 复制%%~fa成功 || echo 复制%%~fa失败,请检查文件是否存在! 
@echo 正在压缩 %%~a ... 
@java -jar %YUIFOLDER%\yuicompressor.jar --charset GB2312 %%~fa -o %%~fa 
) 
@echo CSS JS压缩完成! 

for /r . %%b in (*.gif) do ( 
@echo 正在查找 gif... 
@pngout %%~fb /kp 
del /q/f %%~fb 
) 

@echo gif转换完成! 

for /r . %%c in (*.png) do ( 
@echo 正在查找 png... 
@pngout %%~fc 
) 

@echo png压缩完成! 

pause & exit 