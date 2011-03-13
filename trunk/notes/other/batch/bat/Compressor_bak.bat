
@echo off 
::设置YUI Compressor启动目录 
SET YUIFOLDER=D:\yuicompressor-2.4.2\build\ 

::设置你的JS和CSS根目录，脚本会自动按树层次查找和压缩所有的JS和CSS 
SET INFOLDER=D:\jscss\src 
SET OUTFOLDER=D:\jscss\build 
echo 正在查找 JavaScript, CSS ... 
chdir /d %INFOLDER% 

for /r . %%a in (*.js *.css) do ( 
copy %%a "%OUTFOLDER%\" && echo 复制%%~fa成功 || echo 复制%%~fa失败,请检查文件是否存在! 
@echo 正在压缩 %%~a ... 
@java -jar %YUIFOLDER%\yuicompressor-2.4.2.jar --charset UTF-8 %%~fa -o %%~fa 
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