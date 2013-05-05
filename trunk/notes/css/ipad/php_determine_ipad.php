<?php
if(strstr($_SERVER['HTTP_USER_AGENT'],'iPhone')) {
	echo "你当前使用iPhone浏览网页";
	exit();
}

if(strstr($_SERVER['HTTP_USER_AGENT'],'iPad')) {
	echo "你当前使用ipad浏览网页";
	exit();
}

if(strstr($_SERVER['HTTP_USER_AGENT'],'Android')) {
	echo "你当前使用Android浏览网页";
	exit();
}
?>
