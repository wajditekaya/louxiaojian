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
// $Id: my_user.php,v 1.27 2009/12/07 01:59:54 xltxlm Exp $
include "header.php";
//管理员验证
$my_admin= new my_admin();
$my_admin-> $_GET['act']();
class my_admin
{
	//为会员添加积分
	function user_add_jifen()
	{
		//帐户之前的积分数据
		include "db_locahost_mysql.php";
		$_REQUEST['user_name']= mysql_real_escape_string(trim($_REQUEST['user_name']));
		//订单的相关信息
		$this->yuding_info=mysql_fetch_assoc(mysql_query("select * from yiliao_user_yuding  where id='{$_GET[id]}'"));
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from  yiliao_user_jifen where user_name='{$_REQUEST['user_name']}' "));
		$this->pageObj= new page($page['c'],4);
		$stmt= mysql_query("select * from yiliao_user_jifen  where user_name='{$_REQUEST['user_name']}' order by id desc ".
		"  limit {$this->pageObj->limit_1},{$this->pageObj->limit_2}");
		$this->all_data= array();
		while($row= mysql_fetch_assoc($stmt))
		{
			$this->all_data[]= $row;
		}
		include "my_user/user_add_jifen.html";
	}
	//将提交的数据写入数据库
	function user_add_jifen_do()
	{
		include "db_locahost_mysql.php";
		$_REQUEST['jifen']=(int)$_REQUEST['jifen'];
		$_REQUEST['user_name']= mysql_real_escape_string(trim($_REQUEST['user_name']));
		if($_REQUEST['id'])
		{
			$yuding_info=mysql_fetch_assoc(mysql_query("select * from yiliao_user_yuding  where id='{$_REQUEST['id']}'"));
			$_REQUEST['j_id']=$yuding_info['j_id'];
			$_REQUEST['j_name']=$yuding_info['j_name'];
		}
		mysql_query("insert into yiliao_user_jifen  ".
		"(user_name,add_time,j_id,j_name,jifen,yuding_id) values ".
		"('{$_REQUEST['user_name']}',now(),'{$_REQUEST['j_id']}','{$_REQUEST['j_name']}','{$_REQUEST['jifen']}','{$_REQUEST['id']}') ");
		//同时修改会员积分数据
		mysql_query($sql="update yiliao_user  set user_jifen=user_jifen+{$_REQUEST['jifen']} where user_name='{$_REQUEST['user_name']}' ");
		header("location: {$_SERVER['HTTP_REFERER']}");
	}

	//会员的积分记录,历史原因,为什么会有这个积分数据
	function jifen_log()
	{
		include "db_locahost_mysql.php";
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from  yiliao_user_jifen "));
		$this->pageObj= new page($page['c']);
		$stmt= mysql_query("select * from yiliao_user_jifen  order by id desc ".
		"limit {$this->pageObj->limit_1},{$this->pageObj->limit_2}  ");
		$this->all_data= array();
		while($row= mysql_fetch_assoc($stmt))
		{
			$this->all_data[]= $row;
		}
		include "my_user/jifen_log.html";
	}
	//显示登陆页面
	function login()
	{
		define("__NAVI__", "首页");
		include "my_user/login.html";
	}
	//验证登陆帐户,密码
	function login_do()
	{
		include "db_locahost_mysql.php";
		$user_name= mysql_real_escape_string($_POST['user_name']);
		$user_pass= md5(trim($_POST['user_pass']));
		$row= mysql_fetch_assoc(mysql_query("select * from yiliao_user  where user_name='{$user_name}' and user_pass='{$user_pass}' "));
		if($row)
		{
			$user_location= mysql_real_escape_string(trim(file_get_contents("http://{$_SERVER['__DOMAIN__']}/ip_server.php?ip=".$_SERVER['USER_IP'])));
			mysql_query("update  yiliao_user  set user_location='{$user_location}' where user_id={$row['user_id']} ");
			$_COOKIE['user_id']= $row['user_id'];
			$_COOKIE['user_name']= $row['user_name'];
			$_COOKIE['user_jifen']= $row['user_jifen'];
			include "_user_cookie_login.php";
			if($_REQUEST['go_url'])
				return header("location: ".$_REQUEST['go_url']);
			else
				return header("location: /my_user.php?act=login_success");
		}
		else
			$this->login();
	}
	function login_success()
	{
		define("__NAVI__", "首页");
		include "my_user/login_success.html";
	}
	function regist()
	{
		define("__NAVI__", "首页");
		include "my_user/regist.html";
	}

	function regist_success()
	{
		define("__NAVI__", "首页");
		include "my_user/regist_success.html";
	}
	function logout()
	{
		include "_cookie_delete.php";
		header("location: /petkang.php");
	}
	function shenfen()
	{
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select * from yiliao_user_shenfen   order by name  ");
		$this->all_data= array();
		while($row= mysql_fetch_assoc($stmt))
			$this->all_data[]= $row;
		include "my_user/shenfen.html";
	}
	function shenfen_ajax()
	{
		header('Content-Type: text/html;charset=gb2312');
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select * from yiliao_user_shenfen   order by name  limit 50 ");
		$all_data= array();
		while($row= mysql_fetch_assoc($stmt))
			$all_data[]= "'{$row['name']}','{$row['pinyin']}'";
		echo join(",", $all_data);
	}
	function shenfen_delete_do()
	{
		if(!$_GET['name'])
			die("内容不能为空");
		include "db_locahost_mysql.php";
		mysql_query("delete from yiliao_user_shenfen   where name='{$_GET['name']}'  ");
		header("location: my_user.php?act=shenfen");
	}
	function shenfen_add_do()
	{
		if(!$_POST['name'])
			die("内容不能为空");
		include "db_locahost_mysql.php";
		$_POST['name']= mysql_real_escape_string(trim($_POST['name']));
		$pinyin= file_get_contents("http://{$_SERVER['__DOMAIN__']}/pinyin.php?wd=".urlencode($_POST['name']));
		mysql_query("insert into yiliao_user_shenfen   (name,pinyin) values ('{$_POST['name']}','{$pinyin}') ");
		header("location: my_user.php?act=shenfen");
	}
	function jigou_index()
	{
		include "db_locahost_mysql.php";
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from  yiliao_user"));
		$this->pageObj= new page($page['c']);
		$stmt= mysql_query("select * from  yiliao_user   order by user_id desc  limit {$this->pageObj->limit_1},{$this->pageObj->limit_2}   ");
		$this->jigou_data= array();
		while($row= mysql_fetch_assoc($stmt))
			$this->jigou_data[]= $row;
		include "my_user/jigou_index.html";
	}

	function jigou_search_do()
	{
		include "db_locahost_mysql.php";
		if(!$_POST['j_name'])
			return $this->jigou_index();
		$_POST['j_name']= mysql_real_escape_string(trim($_POST['j_name']));
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from  yiliao_user where instr(j_name,'{$_POST['j_name']}')>0 "));
		$this->pageObj= new page($page['c']);
		$stmt= mysql_query("select * from  yiliao_user where instr(j_name,'{$_POST['j_name']}')>0 order by j_id desc  limit {$this->pageObj->limit_1},{$this->pageObj->limit_2}   ");
		$this->jigou_data= array();
		while($row= mysql_fetch_assoc($stmt))
			$this->jigou_data[]= $row;
		include "my_user/jigou_index.html";
	}
	//添加新帐户
	function jigou_add_do()
	{
		include "db_locahost_mysql.php";
		$user_name= mysql_real_escape_string(trim($_POST['user_name']));
		$user_pass= mysql_real_escape_string(trim($_POST['user_pass']));
		$user_pass2= mysql_real_escape_string(trim($_POST['user_pass2']));
		$user_email= mysql_real_escape_string(trim($_POST['user_email']));
		$user_location= mysql_real_escape_string(trim(file_get_contents("http://{$_SERVER['__DOMAIN__']}/ip_server.php?ip=".$_SERVER['USER_IP'])));
		if($user_name && $user_pass == $user_pass2 && $user_pass && $user_email)
		{
			$user_pass= md5($_POST['user_pass']);
			mysql_query("insert into yiliao_user   ".
			"(user_name,user_pass,user_time,user_last_ip,user_last_time,user_location,user_email) values ".
			"('{$user_name}','{$user_pass}',now(),'{$_SERVER['USER_IP']}',now(),'{$user_location}','{$user_email}' ) ");
			if($this->error= mysql_error())
			{
				return $this->regist();
			}
			else
			{
				$_COOKIE['user_id']= mysql_insert_id();
				$_COOKIE['user_name']= $_POST['user_name'];
				include "_user_cookie_login.php";
				return header("location: my_user.php?act=regist_success");
			}
		}
		else
		{
			$this->regist();
		}
	}
	//
	function jigou_edit_do()
	{
		$_GET['user_id']= (int) $_GET['user_id'];
		if(!$_GET['user_id'])
			die;
		include "db_locahost_mysql.php";
		$_POST['user_shenfen']= mysql_real_escape_string(trim($_POST['user_shenfen']));
		$_POST['user_jifen']= mysql_real_escape_string(trim($_POST['user_jifen']));
		mysql_query("update  yiliao_user   set user_shenfen='{$_POST['user_shenfen']}',user_jifen='{$_POST['user_jifen']}'".
		"  where user_id='{$_GET['user_id']}' ");
		header("location: my_user.php?act=jigou_index");
	}

	function jigou_delete_do()
	{
		$_GET['user_id']= (int) $_GET['user_id'];
		if(!$_GET['user_id'])
			die;
		include "db_locahost_mysql.php";
		mysql_query("delete from yiliao_user where user_id='{$_GET['user_id']}' limit 1 ");
		header("location: my_user.php?act=jigou_index");
	}
	function jigou_edit()
	{
		$_GET['user_id']= (int) $_GET['user_id'];
		if(!$_GET['user_id'])
			die;
		header('Content-Type: text/html;charset=gb2312');
		include "db_locahost_mysql.php"; //省份数据
		$stmt= mysql_query("select * from yiliao_user_shenfen   order by user_id    ");
		$this->all_data= array();
		while($row= mysql_fetch_assoc($stmt))
			$this->all_data[]= $row;
		$this->row= mysql_fetch_assoc(mysql_query("select * from yiliao_user   where user_id='{$_GET['user_id']}' limit 1 "));
		include "my_user/jigou_edit.html";
	}
	function jigou_image_index()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		if(!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select * from  yiliao_user  where j_id='{$_GET['j_id']}' limit 1"));
		$stmt= mysql_query("select * from yiliao_user_image  where j_id='{$_GET['j_id']}' order by i_id desc ");
		$this->all_image= array();
		while($row= mysql_fetch_assoc($stmt))
			$this->all_image[]= $row;
		include "my_user/jigou_image.html";
	}
	function jigou_image_add_do()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		if(!$_GET['j_id'])
			die; //管理员验证
		include_once "_cookie_auth.php";
		include "db_locahost_mysql.php";
		if($_FILES['file']['tmp_name'])
		{
			$i_name= md5(time().rand(1, 10000)).".jpg";
			move_uploaded_file($_FILES['file']['tmp_name'], "my_user_image/$i_name");
			mysql_query("insert into  yiliao_user_image  ".
			"(j_id,i_name,i_time,user_name,j_ip)  values ".
			"('{$_GET['j_id']}','{$i_name}',now(),'{$_COOKIE['user_name']}','{$_SERVER['USER_IP']}')"); //更新图片的张数
			$this->_jigou_image_count($_GET['j_id']);
		}
		header("location: my_user.php?act=jigou_image_index&j_id={$_GET['j_id']}");
	}
	function jigou_image_delete_do()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		$_GET['i_id']= (int) $_GET['i_id'];
		if(!$_GET['j_id'] || !$_GET['i_id'])
			die;
		include "db_locahost_mysql.php";
		$row= mysql_fetch_assoc(mysql_query("select *  from yiliao_user_image where i_id='{$_GET['i_id']}'"));
		mysql_query("delete from yiliao_user_image where i_id='{$_GET['i_id']}'");
		@ unlink("my_user_image/{$row['i_name']}"); //更新图片的张数
		$this->_jigou_image_count($_GET['j_id']);
		header("location: my_user.php?act=jigou_image_index&j_id={$_GET['j_id']}");
	}
	function _jigou_image_count($j_id)
	{
		$count= mysql_fetch_assoc(mysql_query("select count(*) c from  yiliao_user_image where j_id='{$j_id}' "));
		mysql_query("update yiliao_user  set j_image_count='{$count['c']}' where j_id='{$j_id}' ");
	}
};