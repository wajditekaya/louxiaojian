<?php
if(strstr($_SERVER['HTTP_USER_AGENT'],'iPhone') || strstr($_SERVER['HTTP_USER_AGENT'],'iPad')) {
	header('Location: http://ipad.www.opensoce.com');
	exit();
}
?>