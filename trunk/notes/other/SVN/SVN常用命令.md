#SVN常用命令

## 查看修改的文件记录

- svn cat -- 显示特定版本的某文件内容。
- svn list -- 显示一个目录或某一版本存在的文件列表。
- svn log -- 显示svn 的版本log，含作者、日期、路径等。
- svn diff -- 显示特定修改的行级详细信息。

### list示例：

> svn list http://www.codesvn.com/pps/app    #查看目录中的文件。

> svn list -v http://www.codesvn.com/pps/app  #查看详细的目录的信息(修订人,版本号,文件大小等)。

> svn list [-v]                        #查看当前当前工作拷贝的版本库URL。


### cat示例：

> svn cat -r 4 test.c  #查看版本4中的文件test.c的内容,不进行比较。


### diff示例：


> svn diff               #什么都不加，会坚持本地代码和缓存在本地.svn目录下的信息的不同;信息太多，没啥用处。

> svn diff -r 3          #比较你的本地代码和版本号为3的所有文件的不同。

> svn diff -r 3 text.c   #比较你的本地代码和版本号为3的text.c文件的不同。

> svn diff -r 5:6        #比较版本5和版本6之间所有文件的不同。

> svn diff -r 5:6 text.c #比较版本5和版本6之间的text.c文件的变化。

> svn diff -c 6 test.c    #比较版本5和版本6之间的text.c文件的变化。


### log示例：

目录既可以是本地的副本文件E:/app 也可以是svn版本库目录 http://www.codesvn.com/pps/app

> svn log E:/app       #什么都不加会显示所有版本commit的日志信息:版本、作者、日期、comment。

> svn log -r 4:20 http://www.codesvn.com/pps/app #只看版本4到版本20的日志信息，顺序显示。

> svn log -r 20:5 http://www.codesvn.com/pps/app #显示版本20到4之间的日志信息，逆序显示。

> svn log test.c E:/app #查看文件test.c的日志修改信息。

> svn log -r 8 -v E:/app #显示版本8的详细修改日志，包括修改的所有文件列表信息。

> svn log -r 8 -v -q  E:/app #显示版本8的详细提交日志，不包括comment。

> svn log -v -r 88:866 E:/app #显示从版本88到版本866之间，当前代码目录下所有变更的详细信息 。

> svn log -v E:/app  #查看目录的日志修改信息,需要加v。

> svn log http://foo.com/svn/trunk/code/  #显示代码目录的日志信息。`


## 常用命令

+ svn add file|dir -- 添加文件或整个目录
+ svn checkout -- 获取svn代码
+ svn commit  -- 提交本地修改代码
+ svn status    -- 查看本地修改代码情况：修改的或本地独有的文件详细信息
+ svn merge   -- 合并svn和本地代码
+ svn revert   -- 撤销本地修改代码
+ svn resolve -- 合并冲突代码
+ svn help [command] -- 查看svn帮助，或特定命令帮助


## SVN diff个性化定制

svn配置文件: ~/.subversion/config

修改~/.subversion/config，找到如下配置行：

\# diff-cmd = diff_program (diff, gdiff, etc.)
将上面那个脚本的路径添加进去就行，修改为

diff-cmd = /usr/local/bin/diffwrap.sh  #绝对路径
这样svn diff命令就会默认使用vimdiff比较文件。

**diffwrap.sh文件**

> \#! /bin/bash

> \# for svn diff: 修改~/.subversion/config，找到如下配置行：
> \# diff-cmd = diff_program (diff, gdiff, etc.)
> \# diff-cmd = ~/bin/diffwrap.sh

> \# 参数大于5时，去掉前5个参数；参数小于5，失败，什么也不做
shift 5

> \# 使用vimdiff比较
vimdiff "$@"


## SVN 常用命令一览表

<table style="background:#EEEEEE; border-collapse: collapse;" border="1" cellspacing="0" cellpadding="5"><colgroup span="1"><col style="width: 

69pt; mso-width-source: userset; mso-width-alt: 2944;" span="1" width="92"><col style="width: 200pt; mso-width-source: userset; mso-width-alt: 

7968;" span="1" width="280"><col style="width: 412pt; mso-width-source: userset; mso-width-alt: 17568;" span="1" 

width="549"></colgroup><tbody><tr border="1" style="height: 21.75pt; mso-height-source: userset;" height="29"><td class="xl65" border="1" 

style="background-color: #9dd3a2; width: 69pt; height: 21.75pt; " width="92" height="29"><strong><span style="font-size:12px;">命令

</span></strong></td><td class="xl65" border="1" style="background-color: #9dd3a2; width: 200pt;" width="280"><strong><span style="font-

size:12px;">功能</span></strong></td><td class="xl65" border="1" style="background-color: #9dd3a2; width: 412pt;" width="549"><strong><span 

style="font-size:12px;">使用格式</span></strong></td></tr><tr border="1" style="height: 21pt; mso-height-source: userset;" height="28"><td 

class="xl66" border="1" style="background-color: transparent; width: 69pt; height: 21pt;" width="92" height="28"><strong><span style="color: 

#ff0000;font-size:12px;">checkout</span></strong></td><td class="xl67" style="background-color: transparent; width: 200pt;" width="280"><span 

style="font-size:12px;">检出</span></td><td class="xl68" style="background-color: transparent; width: 412pt;" width="549"><strong><span style=" 

style=" color:="" ff0000="" font-size:12px="" up="" span="" strong="" size:12px="">svn&nbsp;&nbsp;co&nbsp;&nbsp;URL</span></strong></td></tr><tr 

style="height: 14.25pt; mso-height-source: userset;" height="19"><td class="xl66" style="background-color: transparent; width: 69pt; height: 

23.25pt;" rowspan="2" width="92" height="31"><strong><span style="color: #ff0000;font-size:12px;">up</span></strong></td><td class="xl67" 

style="background-color: transparent; width: 200pt;" rowspan="2" width="249"><span style="font-size:12px;">更新到当前URL的末端</span></td><td 

class="xl68" style="background-color: transparent; width: 412pt;" rowspan="2" width="549"><strong><span style="font-

size:12px;">svn&nbsp;&nbsp;up</span></strong></td></tr><tr style="height: 8.25pt; mso-height-source: userset;" height="11"></tr><tr 

style="height: 19.5pt; mso-height-source: userset;" height="26"><td class="xl66" style="background-color: transparent; width: 69pt; height: 

23.25pt;" rowspan="1" width="92" height="31"><strong><span style="color: #ff0000;font-size:12px;">switch</span></strong></td><td class="xl67" 

style="background-color: transparent; width: 187pt; height: 19.5pt;" width="249" height="26"><span style="font-size:12px;">更新到某一

tag/branch</span></td><td class="xl68" style="background-color: transparent; width: 412pt;" width="549"><strong><span style="font-

size:12px;">svn&nbsp;&nbsp;switch&nbsp;&nbsp;(tag/分支)URL</span></strong></td></tr><tr style="height: 14.25pt; mso-height-source: userset;" 

height="19"><td class="xl66" style="background-color: transparent; width: 69pt; height: 21.75pt; " rowspan="2" width="92" 

height="29"><strong><span style="color: #ff0000;font-size:12px;">add</span></strong></td><td class="xl67" style="background-color: transparent; 

width: 200pt;" rowspan="2" width="249"><span style="font-size:12px;">增加</span></td><td class="xl68" style="background-color: transparent; 

width: 412pt;" rowspan="2" width="549"><strong><span style="font-size:12px;">svn&nbsp;&nbsp;add&nbsp;&nbsp;文件名</span></strong></td></tr><tr 

style="height: 7.5pt; mso-height-source: userset;" height="10"></tr><tr style="height: 23.25pt; mso-height-source: userset;" height="31"><td 

class="xl66" style="background-color: transparent; width: 69pt; height: 23.25pt;" rowspan="2" width="92" height="31"><strong><span style="color: 

#ff0000;font-size:12px;">rm</span></strong></td><td class="xl67" style=" background-color: transparent; width: 187pt;" width="249"><span 

style="font-size:12px;">删除文件</span></td><td class="xl68" style="background-color: transparent; width: 412pt;" width="549"><strong><span 

style="font-size:12px;">svn<span style="mso-spacerun: yes;">&nbsp; </span>rm&nbsp;<span class="font7" style="font-family: 宋体;">文件名

</span></span></strong></td></tr><tr style="height: 22.5pt; mso-height-source: userset;" height="30"><td class="xl67" style="background-color: 

transparent; width: 187pt; height: 22.5pt;" width="249" height="30"><span style="font-size:12px;">删除目录</span></td><td class="xl68" 

style="background-color: transparent; width: 412pt;" width="549"><strong><span style="font-size:12px;">svn&nbsp;&nbsp;rm&nbsp;目录名

</span></strong></td></tr><tr style="height: 21pt; mso-height-source: userset;" height="28"><td class="xl66" style="background-color: 

transparent; width: 69pt; height: 90.75pt;" rowspan="4" width="92" height="121"><strong><span style="color: #ff0000;font-

size:12px;">diff</span></strong></td><td class="xl67" style="background-color: transparent; width: 280pt;" width="280"><span style="font-

size:12px;">与base版本（最后检出或者更新到的版本）对比</span></td><td class="xl68" style="background-color: transparent; width: 412pt;" 

width="549"><strong><span style="font-size:12px;">svn<span style="mso-spacerun: yes;">&nbsp; </span>diff</span></strong></td></tr><tr 

style="height: 21.75pt; mso-height-source: userset;" height="29"><td class="xl67" style="background-color: transparent; width: 200pt; height: 

21.75pt;" width="249" height="29"><span style="font-size:12px;">与版本库中最新版本对比</span></td><td class="xl68" style="background-color: 

transparent; width: 412pt;" width="549"><strong><span style="font-size:12px;">svn&nbsp;&nbsp;diff&nbsp;&nbsp;-

r&nbsp;&nbsp;head</span></strong></td></tr><tr style="height: 24pt; mso-height-source: userset;" height="32"><td class="xl67" style="background-

color: transparent; width: 187pt; height: 24pt;" width="249" height="32"><span style="font-size:12px;">当前工作副本，两个版本之间对比

</span></td><td class="xl68" style=" background-color: transparent; width: 412pt; " width="549"><strong><span style="font-

size:12px;">svn&nbsp;&nbsp;diff&nbsp;&nbsp;-r&nbsp;&nbsp;reversion1:reversion2</span></strong></td></tr><tr style="height: 24pt; mso-height-

source: userset;" height="32"><td class="xl67" style="background-color: transparent; width: 187pt; height: 24pt;" width="249" height="32"><span 

style="font-size:12px;">版本库中任意两个tag做对比</span></td><td class="xl68" style="background-color: transparent; width: 412pt;" 

width="549"><strong><span style="font-size:12px;">svn&nbsp;&nbsp;&nbsp;diff&nbsp;&nbsp;&nbsp;&nbsp;(tag1)URL&nbsp;&nbsp;&nbsp;&nbsp;(tag2)

URL</span></strong></td></tr><tr style="height: 21.75pt; mso-height-source: userset;" height="29"><td class="xl66" style="background-color: 

transparent; width: 69pt; height: 21.75pt;" width="92" height="29"><strong><span style="color: #ff0000;font-

size:12px;">ci</span></strong></td><td class="xl67" style="background-color: transparent; width: 187pt;" width="249"><span style="font-

size:12px;">提交</span></td><td class="xl68" style="background-color: transparent; width: 412pt;" width="549"><strong><span style="font-

size:12px;">svn ci -m "commit log"</span></strong></td></tr><tr style="height: 13.5pt;" height="18"><td class="xl66" style="background-color: 

transparent; width: 69pt; height: 42.75pt;" rowspan="5" width="92" height="57"><strong><span style="color: #ff0000;font-

size:12px;">log</span></strong></td><td class="xl67" style="background-color: transparent; width: 187pt;" rowspan="2" width="249"><span 

style="font-size:12px;">查看当前工作副本log</span></td><td class="xl68" style="background-color: transparent; width: 412pt;" rowspan="2" 

width="549"><strong><span style="font-size:12px;">svn<span style="mso-spacerun: yes;">&nbsp; </span>log</span></strong></td></tr><tr 

style="height: 10.5pt; mso-height-source: userset;" height="14"></tr><tr style="height: 18.75pt; mso-height-source: userset;" height="25"><td 

class="xl67" style="background-color: transparent; width: 187pt; height: 18.75pt;" width="249" height="25"><span style="font-size:12px;">只查看指

定版本的log</span></td><td class="xl68" style="background-color: transparent; width: 412pt;" width="549"><strong><span style="font-

size:12px;">svn&nbsp;&nbsp;log&nbsp;&nbsp;-r</span></strong></td></tr><tr style="height: 21pt; mso-height-source: userset;" height="28"><td 

class="xl67" style="background-color: transparent; width: 187pt; height: 21pt;" width="249" height="28"><span style="font-size:12px;">打印log所有

附加信息</span></td><td class="xl68" style="background-color: transparent; width: 412pt;" width="549"><strong><span style="font-

size:12px;">svn&nbsp;&nbsp;log&nbsp;&nbsp;-v</span></strong></td></tr><tr style="height: 21.75pt; mso-height-source: userset;" height="29"><td 

class="xl67" style="background-color: transparent; width: 187pt; height: 21.75pt;" width="249" height="29"><span style="font-size:12px;">查看当前

tag/branch版本详情</span></td><td class="xl68" style="background-color: transparent; width: 412pt;" width="549"><span style="font-

size:12px;"><strong>svn<span style="mso-spacerun: yes;">&nbsp; </span>log --stop-on-copy -v</strong></span></td></tr><tr style="height: 22.5pt; 

mso-height-source: userset;" height="30"><td class="xl66" style="background-color: transparent; width: 69pt; height: 22.5pt;" width="92" 

height="30"><strong><span style="color: #ff0000;font-size:12px;">info</span></strong></td><td class="xl67" style="background-color: transparent; 

width: 187pt;" width="249"><span style="font-size:12px;">查看当前工作副本所在URL</span></td><td class="xl68" style="background-color: 

transparent; width: 412pt;" width="549"><strong><span style="font-size:12px;">svn&nbsp;&nbsp;info</span></strong></td></tr><tr style="height: 

22.5pt; mso-height-source: userset;" height="30"><td class="xl66" style="background-color: transparent; width: 69pt; height: 43.5pt;" rowspan="2" 

width="92" height="58"><strong><span style="color: #ff0000;font-size:12px;">status</span></strong></td><td class="xl67" style="background-color: 

transparent; width: 187pt;" width="249"><span style="font-size:12px;">查看工作副本的状态</span></td><td class="xl68" style="background-color: 

transparent; width: 412pt;" width="549"><strong><span style="font-size:12px;">svn st</span></strong></td></tr><tr style="height: 21pt; mso-

height-source: userset;" height="28"><td class="xl67" style="background-color: transparent; width: 187pt; height: 21pt;" width="249" 

height="28"><span style="font-size:12px;">查看文件的taglist</span></td><td class="xl68" style="background-color: transparent; width: 412pt;" 

width="549"><strong><span style="font-size:12px;">svn命令不支持，可执行cs taglist</span></strong></td></tr><tr style="height: 13.5pt;" 

height="18"><td class="xl66" style="background-color: transparent; width: 69pt; height: 22.5pt;" rowspan="4" width="92" height="30"><strong><span 

style="color: #ff0000;font-size:12px;">tag</span></strong></td><td class="xl67" style="background-color: transparent; width: 187pt;" rowspan="2" 

width="249"><span style="font-size:12px;">新增tag</span></td><td class="xl68" style="background-color: transparent; width: 412pt;" rowspan="2" 

width="549"><strong><span style="font-size:12px;">svn cp .&nbsp;（tag）URL</span></strong></td></tr><tr style="height: 9pt; mso-height-source: 

userset;" height="12"></tr><tr style="height: 24pt; mso-height-source: userset;" height="32"><td class="xl67" style="background-color: 

transparent; width: 187pt; height: 24pt;" width="249" height="32"><span style="font-size:12px;">删除tag</span></td><td class="xl68" 

style="background-color: transparent; width: 412pt;" width="549"><strong><span style="font-size:12px;">svn rm&nbsp;（tag）URL -m "commit 

log"</span></strong></td></tr><tr style="height: 21.75pt; mso-height-source: userset;" height="29"><td class="xl67" style="background-color: 

transparent; width: 187pt; height: 21.75pt;" width="249" height="29"><span style="font-size:12px;">覆盖已经存在的tag</span></td><td class="xl68" 

style="background-color: transparent; width: 412pt;" width="549"><strong><span style="font-size:12px;">不支持</span></strong></td></tr><tr 

style="height: 24pt; mso-height-source: userset;" height="32"><td class="xl66" style="background-color: transparent; width: 69pt; height: 

187.5pt;" rowspan="12" width="92" height="250"><strong><span style="color: #ff0000;font-size:12px;">分支开发</span></strong></td><td class="xl67" 

style="background-color: transparent; width: 187pt;" width="249"><span style="font-size:12px;">创建branch</span></td><td class="xl68" 

style="background-color: transparent; width: 412pt;" width="549"><strong><span style="font-size:12px;">svn&nbsp;&nbsp;cp&nbsp;&nbsp;（基线版本）

URL&nbsp;（分支）URL&nbsp;&nbsp;-m "commit log"</span></strong></td></tr><tr style="height: 21.75pt; mso-height-source: userset;" height="29"><td 

class="xl67" style="background-color: transparent; width: 187pt; height: 21.75pt;" width="249" height="29"><span style="font-size:12px;">删除

branch</span></td><td class="xl68" style="background-color: transparent; width: 412pt;" width="549"><strong><span style="font-size:12px;">svn 

rm&nbsp;（分支）URL&nbsp;&nbsp;&nbsp;-m "commit log"</span></strong></td></tr><tr style="height: 21.75pt; mso-height-source: userset;" 

height="29"><td class="xl67" style="background-color: transparent; width: 187pt; height: 123pt;" rowspan="5" width="249" height="164"><span 

style="font-size:12px;">同步</span></td><td class="xl68" style="background-color: transparent; width: 412pt; " width="549"><span style="font-

size:12px;"><strong>svn co&nbsp;（主干）URL</strong></span></td></tr><tr style="height: 21.75pt; mso-height-source: userset;" height="29"><td 

class="xl68" style="background-color: transparent; width: 412pt; height: 21.75pt;" width="549" height="29"><span style="font-

size:12px;"><strong>cd ~/wc</strong></span></td></tr><tr style="height: 25.5pt; mso-height-source: userset;" height="34"><td class="xl68" 

style="background-color: transparent; width: 412pt; height: 25.5pt;" width="549" height="34"><span style="font-size:12px;"><strong>svn 

merge&nbsp;（主干）URL&nbsp;（待同步tag）URL</strong></span></td></tr><tr style="height: 25.5pt; mso-height-source: userset;" height="34"><td 

class="xl68" style="background-color: transparent; width: 412pt; height: 25.5pt;" width="549" height="34"><span style="font-

size:12px;"><strong>svn ci -m "commit log"</strong></span></td></tr><tr style="height: 28.5pt; mso-height-source: userset;" height="38"><td 

class="xl68" style="background-color: transparent; width: 412pt; height: 28.5pt;" width="549" height="38"><strong><span style="font-

size:12px;">svn cp&nbsp;<span class="font7" style="font-family: 宋体;">（主干）</span><span class="font6">URL&nbsp;</span><span class="font7" 

style="font-family: 宋体;">（以</span><span class="font6">_PD_BL_MAIN</span><span class="font7" style="font-family: 宋体;">结尾的</span><span 

class="font6">tag</span><span class="font7" style="font-family: 宋体;">）</span><span class="font6">URL -m"commit 

log"</span></span></strong></td></tr><tr style="height: 18.75pt; mso-height-source: userset;" height="25"><td class="xl67" style="background-

color: transparent; width: 187pt; height: 114.75pt;" rowspan="5" width="249" height="153"><span style="font-size:12px;">合并</span></td><td 

class="xl68" style="background-color: transparent; width: 412pt;" width="549"><strong><span style="font-size:12px;">svn co&nbsp;（合并目标）

URL</span></strong></td></tr><tr style="height: 18.75pt; mso-height-source: userset;" height="25"><td class="xl68" style="background-color: 

transparent; width: 412pt; height: 18.75pt;" width="549" height="25"><strong><span style="font-size:12px;">cd ~/wc</span></strong></td></tr><tr 

style="height: 27pt; mso-height-source: userset;" height="36"><td class="xl68" style="background-color: transparent; width: 412pt; height: 27pt;" 

width="549" height="36"><strong><span style="font-size:12px;">svn merge&nbsp;（基线版本tag）URL&nbsp;&nbsp;（上线tag）

URL</span></strong></td></tr><tr style="height: 18.75pt; mso-height-source: userset;" height="25"><td class="xl68" style="background-color: 

transparent; width: 412pt; height: 18.75pt;" width="549" height="25"><strong><span style="font-size:12px;">svn ci -m "commit 

log"</span></strong></td></tr><tr style="height: 31.5pt; mso-height-source: userset;" height="42"><td class="xl68" style="background-color: 

transparent; width: 412pt; height: 31.5pt;" width="549" height="42"><strong><span style="font-size:12px;">svn cp&nbsp;（合并目标）URL&nbsp;（上线

tag_MERGE_的tag对应）URL -m"commit log"</span></strong></td></tr></tbody></table>

## 参考文献

- SVN常用命令: <http://blog.csdn.net/sunboy_2050/article/details/6187464>
- 使用vimdiff作为svn diff的查看代码工具：<http://www.cnblogs.com/xuxm2007/archive/2012/05/11/2496243.html>