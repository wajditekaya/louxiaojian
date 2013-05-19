@echo off

SET SVN="D:/Program Files/Subversion/bin/svn.exe"

SET DIR="E:/app"

(call svn update %DIR% --username lxj --password louxiaojian --non-interactive)

exit