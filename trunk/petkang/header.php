<?php


/* Eclipse: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
//
// +----------------------------------------------------------------------+
// | PHP Version 4                                                        |
// +----------------------------------------------------------------------+
// | Copyright (c) 2005-2006    All rights reserved.                      |
// +----------------------------------------------------------------------+
// | This source file is not free   GBK   Encoding!                       |
// +----------------------------------------------------------------------+
// | Authors: xltxlm <xltxlm@163.com>                                     |
// +----------------------------------------------------------------------+
//
// Created by Administrator 2009-6-29
// $Id: header.php,v 1.9 2009/09/08 15:05:02 xltxlm Exp $
ini_set("display_errors", 0);
header('HTTP/1.0 200 OK');
header('Status: 200 OK');
header('X-Powered-By: PHP1.0/special;Welcome to petkang.com');
header('Content-Type: text/html;charset=gb2312');
header("Pragma:No-cache");
header("Cache-Control:no-cache");
header("Expires:0");

/**
 * 过滤掉一些非法提交的破坏页面的数据,POST,GET
 * Created on 2009-6-24 by Administrator
 *
 */
$get_magic_quotes_gpc= get_magic_quotes_gpc();
//$replace_array= explode("|", 'ducoment|cookie|script|location|href|alert');
settype($_POST, "array");
settype($_GET, "array");
foreach($_POST as $k => $v)
	if(is_string($v))
	{
		$_POST[$k]= $v= str_replace($replace_array, NULL, $v);
		if($get_magic_quotes_gpc)
			$_POST[$k]= stripslashes($v);
	}
foreach($_GET as $k => $v)
	if(is_string($v))
	{
		$_GET[$k]= $v= str_replace($replace_array, NULL, $v);
		if($get_magic_quotes_gpc)
			$_GET[$k]= stripslashes($v);
	}
foreach($_SERVER as $k => $v)
	if(is_string($v))
	{
		$_SERVER[$k]= $v= str_replace($replace_array, NULL, $v);
		if($get_magic_quotes_gpc)
			$_SERVER[$k]= stripslashes($v);
	}
$_REQUEST= $_POST + $_GET;

$_SERVER['__DOMAIN__']= "www.petkang.com";
$_SERVER['USER_IP']= $_SERVER['HTTP_X_REAL_IP'] ? $_SERVER['HTTP_X_REAL_IP'] :($_SERVER['HTTP_X_FORWARDED_FOR'] ? array_shift(explode(",", $_SERVER['HTTP_X_FORWARDED_FOR'])) : $_SERVER['REMOTE_ADDR']);

//DOS方式下的运行
if($_SERVER['argv'] && !$_SERVER['HTTP_HOST'])
{
	$str_array= array();
	$str= join('&', $_SERVER['argv']);
	parse_str($str, $str_array);
	settype($str_array, 'array');
	settype($_GET, 'array');
	$_GET= $str_array + $_GET;
}
/**
 * 分页计算
 * Created on 2008-10-24 by Administrator
 *
 */
class page
{
	var $limit_1= 0;
	var $limit_2= 0;
	/**
	 * @since version - 2008-10-24
	 */
	function page($total= 0, $everpage= 10, $query= array())
	{
		$this->total= $total;
		$this->everpage= $everpage;
		$this->pages= max(1, @ abs(@ ceil(($total / $everpage))));
		$this->currentPage= max(1, min((int) $_GET['pageID'], $this->pages));
		$num= @ ceil(7 / 2);
		$this->max= MIN(MAX($this->currentPage + $num, 7), $this->pages);
		$this->min= MAX(MIN($this->currentPage - $num, $this->pages - 7), 1);

		$this->limit_1=($this->currentPage - 1) * $this->everpage;
		$this->limit_2= $this->everpage;
		$this->limit_3= $this->currentPage * $this->everpage;

		$this->query_string= "";
		if(!$query)
			$query= $_REQUEST;
		//
		unset($query['pageID']);
		settype($query, 'array');
		$this->query= array();
		foreach($query as $k => $v)
			$this->query[]= $k.'='.urldecode($v);
		$this->query_string= join('&', $this->query);
	}
	/**
	 * @since version - 2008-10-24
	 */
	function show($tp= 'm/page.standard.html')
	{
		include $tp;
	}
};
;