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
// Created by Administrator 2009-9-7
// $Id: my_guangao.php,v 1.2 2009/11/18 12:48:14 xltxlm Exp $
include "header.php";
$my_active= new my_active;
$my_active-> $_GET['act'] ();
class my_active
{
	//后台管理列表
	function jigou_index()
	{
		include "db_locahost_mysql.php";
		$name= NULL;
		if ($_REQUEST['name'])
			$name= " where name like '%{$_REQUEST['name']}%' ";
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from yiliao_guangao  {$name}  "));
		$this->pageObj= new page($page['c'], 10);
		$stmt= mysql_query($sql="select * from yiliao_guangao  {$name}  order by id desc limit {$this->pageObj->limit_1},{$this->pageObj->limit_2} ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
		{
			$this->all_data[]= $row;
		}
		include "my_guangao/jigou_index.html";
	}
	//添加数据
	function jigou_add_do()
	{
		include "db_locahost_mysql.php";
		mysql_query("insert into yiliao_guangao   " .
		"(name,content,add_time) values " .
		"('{$_POST['name']}','{$_POST['content']}',now())");
		header("location: {$_SERVER['HTTP_REFERER']}");
	}
	//删除数据
	function delete_do()
	{
		include "db_locahost_mysql.php";
		mysql_query("delete from yiliao_guangao  where id='{$_GET['id']}' limit 1 ");
		header("location: {$_SERVER['HTTP_REFERER']}");
	}
	//编辑数据页面
	function edit()
	{
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select * from yiliao_guangao   where id='{$_GET['id']}'"));
		include "my_guangao/edit.html";
	}
	//编辑数据,执行动作
	function edit_do()
	{
		include "db_locahost_mysql.php";
		$_POST['name']= mysql_real_escape_string(trim($_POST['name']));
		$_POST['content']= mysql_real_escape_string(trim($_POST['content']));
		mysql_query("update  yiliao_guangao  set name='{$_POST['name']}', content='{$_POST['content']}' where id='{$_GET['id']}' limit 1  ");
		die("<script>alert('编辑成功');parent.location.reload();</script>");
	}
	//前台新闻内容的显示页面
	function info()
	{
		define("__NAVI__", "动态");
		include "db_locahost_mysql.php";
		mysql_query("update yiliao_guangao  set click=click+1  where id='{$_GET['id']}' ");
		$this->row= mysql_fetch_assoc(mysql_query("select * from yiliao_guangao   where id='{$_GET['id']}' "));
		include "my_guangao/info.html";
	}
};