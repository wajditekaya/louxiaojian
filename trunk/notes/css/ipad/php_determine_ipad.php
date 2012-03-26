<?php
if(strstr($_SERVER['HTTP_USER_AGENT'],'iPhone') || strstr($_SERVER['HTTP_USER_AGENT'],'iPad')) {
	echo "你当前使用ipad浏览网页";
	exit();
}
?>