<?php


/* Eclipse: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
//
// +----------------------------------------------------------------------+
// | PHP Version 4-5                                                        |
// +----------------------------------------------------------------------+
// | Copyright (c) 2005-2009    All rights reserved.                      |
// +----------------------------------------------------------------------+
// | This source file is not free   GBK   Encoding!                       |
// +----------------------------------------------------------------------+
// | Authors: xltxlm <xltxlm@qq.com>                                     |
// +----------------------------------------------------------------------+
//
// Created by Administrator 2009-9-10
// $Id: my_link.php,v 1.7 2009/09/10 08:18:40 xltxlm Exp $
include "header.php";
$my_link= new my_link();
$my_link-> $_GET['act'] ();
class my_link
{
	//后台管理列表
	function alist()
	{
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select * from  link  order by orderby asc ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data[]= $row;
		include "my_link/alist.html";
	}
	//执行添加动作
	function link_add_do()
	{
		include "db_locahost_mysql.php";
		mysql_query("insert into link " .
		"(name,url,orderby) values " .
		"('{$_POST['name']}','{$_POST['url']}','{$_POST['orderby']}') ");
		header("location: {$_SERVER['HTTP_REFERER']}");
	}
	//删除数据执行
	function link_delete_do()
	{
		include "db_locahost_mysql.php";
		mysql_query("delete from link where id='{$_GET['id']}' ");
		header("location: {$_SERVER['HTTP_REFERER']}");
	}

	//显示编辑页面
	function edit()
	{
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select * from  link where id='{$_GET['id']}' "));
		include "my_link/edit.html";
	}
	function edit_do()
	{
		include "db_locahost_mysql.php";
		mysql_query("update link set name='{$_POST['name']}',url='{$_POST['url']}',orderby='{$_POST['orderby']}' where id='{$_GET['id']}' ");
		echo "<script>parent.lightBox1.closeFun();parent.location.reload();</script>";
	}

};