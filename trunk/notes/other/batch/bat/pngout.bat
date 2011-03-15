
@echo off 
::设置YUI Compressor启动目录 
SET YUIFOLDER=D:\yuicompressor

::设置你的JS和CSS根目录，脚本会自动按树层次查找和压缩所有的JS和CSS 
SET INFOLDER=E:\WebCode\googlecode\louxiaojian\trunk\notes\other\batch\bat\png 

echo 正在查找 JavaScript, CSS ... 
chdir /d %INFOLDER% 


for /r . %%c in (*.png) do ( 
@echo 正在查找 png...

cd E:\WebCode\googlecode\louxiaojian\trunk\notes\other\batch\bat

pngout.exe %%~fc /c3 /f0 /d8
 
) 

@echo png压缩完成! 

pause & exit 