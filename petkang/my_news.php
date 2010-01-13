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
// Created by Administrator 2009-8-5
// $Id: my_news.php,v 1.9 2009/09/29 03:30:28 xltxlm Exp $
include "header.php";

$my_admin= new my_admin();
$my_admin-> $_GET['act'] ();
class my_admin
{

	/**
	 * 文章的详细介绍页面
	 *	Created on 2009-8-28 by Administrator
	 *
	 */
	function jigou_intro()
	{
		define("__NAVI__", "新闻");
		include "db_locahost_mysql.php";
		mysql_query("update wenzhang_news set click=click+1  where j_id='{$_GET['j_id']}' ");
		$this->row= mysql_fetch_assoc(mysql_query("select * from wenzhang_news  where j_id='{$_GET['j_id']}'"));
		include "my_news/jigou_intro.html";
	}
	function shenfen()
	{
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select * from wenzhang_shenfen  order by name  ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data[]= $row;
		include "my_news/shenfen.html";
	}
	function shenfen_ajax()
	{
		header('Content-Type: text/html;charset=gb2312');
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select * from wenzhang_shenfen  order by name  limit 50 ");
		$all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$all_data[]= "'{$row['name']}','{$row['pinyin']}'";
		echo join(",", $all_data);
	}
	function shenfen_delete_do()
	{
		if (!$_GET['name'])
			die("内容不能为空");
		include "db_locahost_mysql.php";
		mysql_query("delete from wenzhang_shenfen  where name='{$_GET['name']}'  ");
		header("location: my_news.php?act=shenfen");
	}
	function shenfen_add_do()
	{
		if (!$_POST['name'])
			die("内容不能为空");
		include "db_locahost_mysql.php";
		$_POST['name']= mysql_real_escape_string(trim($_POST['name']));
		$pinyin= file_get_contents("http://{$_SERVER['__DOMAIN__']}/pinyin.php?wd=" . urlencode($_POST['name']));
		mysql_query("insert into wenzhang_shenfen  (name,pinyin) values ('{$_POST['name']}','{$pinyin}') ");
		header("location: my_news.php?act=shenfen");
	}
	function jigou_index()
	{
		include "db_locahost_mysql.php";
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from  wenzhang_news"));
		$this->pageObj= new page($page['c']);
		$stmt= mysql_query("select * from  wenzhang_news   order by j_id desc  limit {$this->pageObj->limit_1},{$this->pageObj->limit_2}   ");
		$this->jigou_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->jigou_data[]= $row;
		include "my_news/jigou_index.html";
	}
	function jigou_search_do()
	{
		include "db_locahost_mysql.php";
		if (!$_POST['j_name'])
			return $this->jigou_index();
		$_POST['j_name']= mysql_real_escape_string(trim($_POST['j_name']));
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from  wenzhang_news where instr(j_name,'{$_POST['j_name']}')>0 "));
		$this->pageObj= new page($page['c']);
		$stmt= mysql_query("select * from  wenzhang_news where instr(j_name,'{$_POST['j_name']}')>0 order by j_id desc  limit {$this->pageObj->limit_1},{$this->pageObj->limit_2}   ");
		$this->jigou_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->jigou_data[]= $row;
		include "my_news/jigou_index.html";
	}
	function jigou_add_do()
	{
		include "db_locahost_mysql.php";
		$_POST['j_name']= mysql_real_escape_string($_POST['j_name']);
		$_POST['j_shenfen']= mysql_real_escape_string($_POST['j_shenfen']);
		$_POST['j_jiage']= mysql_real_escape_string($_POST['j_jiage']);
		$_POST['j_jibie']= mysql_real_escape_string($_POST['j_jibie']);
		$_POST['j_content']= mysql_real_escape_string($_POST['j_content']);

		$_COOKIE['user_name']= mysql_real_escape_string($_COOKIE['user_name']);

		mysql_query("insert into wenzhang_news  " .
		"(j_name,j_shenfen,j_jiage,j_jibie,j_time,j_ip,j_content,user_name) values " .
		"('{$_POST['j_name']}','{$_POST['j_shenfen']}','{$_POST['j_jiage']}','{$_POST['j_jibie']}',now(),'{$_SERVER['USER_IP']}','{$_POST['j_content']}','{$_COOKIE['user_name']}') ");
		$id= mysql_insert_id();
		if ($_FILES['file']['tmp_name'])
			move_uploaded_file($_FILES['file']['tmp_name'], "my_article_image/{$id}.jpg");
		header("location: my_news.php?act=jigou_index");
	}
	function jigou_edit_do()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		$_POST['j_name']= mysql_real_escape_string($_POST['j_name']);
		$_POST['j_shenfen']= mysql_real_escape_string($_POST['j_shenfen']);
		$_POST['j_jiage']= mysql_real_escape_string($_POST['j_jiage']);
		$_POST['j_jibie']= mysql_real_escape_string($_POST['j_jibie']);
		$_POST['j_content']= mysql_real_escape_string($_POST['j_content']);

		mysql_query("update  wenzhang_news   set j_name='{$_POST['j_name']}',j_shenfen='{$_POST['j_shenfen']}',j_jibie='{$_POST['j_jibie']}', " .
		"  j_content='{$_POST['j_content']}',j_jiage='{$_POST['j_jiage']}'  where j_id='{$_GET['j_id']}' ");
		if ($_FILES['file']['tmp_name'])
			move_uploaded_file($_FILES['file']['tmp_name'], "my_article_image/{$_GET['j_id']}.jpg");
		echo "<script>parent.lightBox1.closeFun();parent.location.reload();</script>";
	}

	function jigou_delete_do()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		mysql_query("delete from wenzhang_news where j_id='{$_GET['j_id']}' limit 1 ");
		@ unlink("my_article_image/{$_GET['j_id']}.jpg");

		//更多的图片
		$stmt= mysql_query("select * from  wenzhang_news_image  where j_id='{$_GET['j_id']}' ");
		while ($row= mysql_fetch_assoc($stmt))
			@ unlink("my_article_image/" .
			$row['i_name']);

		header("location: my_news.php?act=jigou_index");
	}
	function jigou_edit()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		header('Content-Type: text/html;charset=gb2312');
		include "db_locahost_mysql.php";
		//省份数据
		$stmt= mysql_query("select * from wenzhang_shenfen  order by name    ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data[]= $row;
		$this->row= mysql_fetch_assoc(mysql_query("select * from wenzhang_news   where j_id='{$_GET['j_id']}' limit 1 "));
		include "my_news/jigou_edit.html";
	}
	function jigou_image_index()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select * from  wenzhang_news  where j_id='{$_GET['j_id']}' limit 1"));
		$stmt= mysql_query("select * from wenzhang_news_image  where j_id='{$_GET['j_id']}' order by i_id desc ");
		$this->all_image= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_image[]= $row;
		include "my_news/jigou_image.html";
	}
	function jigou_image_add_do()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		//管理员验证
		include_once "_cookie_auth.php";
		include "db_locahost_mysql.php";
		if ($_FILES['file']['tmp_name'])
		{
			$i_name= md5(time() . rand(1, 10000)) . ".jpg";
			move_uploaded_file($_FILES['file']['tmp_name'], "my_article_image/$i_name");
			mysql_query("insert into  wenzhang_news_image  " .
			"(j_id,i_name,i_time,user_name,j_ip)  values " .
			"('{$_GET['j_id']}','{$i_name}',now(),'{$_COOKIE['user_name']}','{$_SERVER['USER_IP']}')");
			//更新图片的张数
			$this->_jigou_image_count($_GET['j_id']);
		}
		header("location: my_news.php?act=jigou_image_index&j_id={$_GET['j_id']}");
	}
	function jigou_image_delete_do()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		$_GET['i_id']= (int) $_GET['i_id'];
		if (!$_GET['j_id'] || !$_GET['i_id'])
			die;
		include "db_locahost_mysql.php";
		$row= mysql_fetch_assoc(mysql_query("select *  from wenzhang_news_image where i_id='{$_GET['i_id']}'"));
		mysql_query("delete from wenzhang_news_image where i_id='{$_GET['i_id']}'");
		@ unlink("my_article_image/{$row['i_name']}");
		//更新图片的张数
		$this->_jigou_image_count($_GET['j_id']);
		header("location: my_news.php?act=jigou_image_index&j_id={$_GET['j_id']}");
	}
	function _jigou_image_count($j_id)
	{
		$count= mysql_fetch_assoc(mysql_query("select count(*) c from  wenzhang_news_image where j_id='{$j_id}' "));
		mysql_query("update wenzhang_news  set j_image_count='{$count['c']}' where j_id='{$j_id}' ");
	}
};