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
// $Id: my_lipi.php,v 1.27 2009/09/07 16:02:22 xltxlm Exp $
include "header.php";
//管理员验证

$my_lipin= new my_lipin();
$my_lipin-> $_GET['act'] ();
class my_lipin
{
	//后台处理兑换单子
	function duihuan_list()
	{
		//管理员验证
		include_once "_cookie_auth.php";
		include "db_locahost_mysql.php";
		$page= mysql_fetch_assoc(mysql_query("select count(*) c  from lipi_duihuan  "));
		$this->pageObj= new page($page['c']);
		$stmt= mysql_query("select * from lipi_duihuan order by id desc limit {$this->pageObj->limit_1},{$this->pageObj->limit_2} ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data[]= $row;
		include "my_lipi/duihuan_list.html";
	}
	//设置兑换单子的状态情况
	function duihuan_ok()
	{
		//管理员验证
		include_once "_cookie_auth.php";
		include "db_locahost_mysql.php";
		$_GET['stat']= mysql_real_escape_string($_GET['stat']);
		$_GET['id']= (int) mysql_real_escape_string($_GET['id']);
		mysql_query("update  lipi_duihuan  set stat='{$_GET['stat']}' where id='{$_GET['id']}' ");
		header("location: {$_SERVER['HTTP_REFERER']}");
	}
	//显示兑换礼品的页面
	function duihuan()
	{
		//会员验证
		include_once "_user_cookie_auth.php";
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select * from  lipi_jigou  where j_id='{$_GET['j_id']}'"));
		//帐户的基本数据
		$_COOKIE['user_name']= mysql_real_escape_string(trim($_COOKIE['user_name']));
		$this->user_info= mysql_fetch_assoc(mysql_query("select * from yiliao_user  where user_name='{$_COOKIE['user_name']}' limit 1 "));
		include "my_lipi/duihuan.html";
	}

	/**
	 * 执行兑换礼品动作,写入数据库
	 *	Created on 2009-9-4 by Administrator
	 *
	 */
	function duihuan_do()
	{
		//会员验证
		include_once "_user_cookie_auth.php";
		include "db_locahost_mysql.php";
		$_COOKIE['user_name']= mysql_real_escape_string($_COOKIE['user_name']);
		$_POST['j_name']= mysql_real_escape_string($_POST['j_name']);
		$_POST['user_realname']= mysql_real_escape_string($_POST['user_realname']);
		$_POST['user_tel']= mysql_real_escape_string($_POST['user_tel']);
		$_POST['user_address']= mysql_real_escape_string($_POST['user_address']);
		$_GET['j_id']= (int) mysql_real_escape_string($_GET['j_id']);
		$this->user_info = mysql_fetch_assoc(mysql_query("select * from yiliao_user  where  user_name='{$_COOKIE['user_name']}' "));
		$this->row= mysql_fetch_assoc(mysql_query("select * from  lipi_jigou  where j_id='{$_GET['j_id']}'"));
		if($this->user_info['user_jifen']<$this->row['j_jiage'])
		{
			die("<script>alert('您当前的积分不足');window.location.href='{$_SERVER['HTTP_REFERER']}'</script>");
		}

		$stmt= mysql_query("insert into lipi_duihuan  " .
		" (j_id,user_name,j_name,add_time,user_realname,user_tel,user_address) values " .
		" ('{$_GET['j_id']}','{$_COOKIE['user_name']}','{$_POST['j_name']}',now(),'{$_POST['user_realname']}','{$_POST['user_tel']}','{$_POST['user_address']}') ");
		$id= mysql_insert_id();
		//扣除他的积分数据
		mysql_query("update yiliao_user  set user_jifen=user_jifen-'{$this->row['j_jiage']}' where user_name='{$_COOKIE['user_name']}' ");
		header("location: /my_lipi.php?act=duihuan_seccess&id={$id}");
	}
	/**
	 * 提示礼品兑换成功页面
	 *	Created on 2009-9-4 by Administrator
	 *
	 */
	function duihuan_seccess()
	{
		//会员验证
		include_once "_user_cookie_auth.php";
		include "db_locahost_mysql.php";
		$_GET['id']= (int) $_GET['id'];
		$this->row= mysql_fetch_assoc(mysql_query("select * from  lipi_duihuan  where id='{$_GET['id']}'"));
		include "my_lipi/duihuan_seccess.html";
	}
	//礼品的基本信息页面
	function jigou_info()
	{
		include "db_locahost_mysql.php";
		//礼品的基本信息
		$this->row= mysql_fetch_assoc(mysql_query("select * from  lipi_jigou   where j_id='{$_GET['j_id']}'"));
		//帐户的基本数据
		$_COOKIE['user_name']= mysql_real_escape_string(trim($_COOKIE['user_name']));
		$this->user_info= mysql_fetch_assoc(mysql_query("select * from yiliao_user  where user_name='{$_COOKIE['user_name']}' limit 1 "));
		include "my_lipi/jigou_info.html";
	}
	function shenfen()
	{
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select * from lipi_shenfen  order by name  ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data[]= $row;
		include "my_lipi/shenfen.html";
	}
	function shenfen_ajax()
	{
		header('Content-Type: text/html;charset=gb2312');
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select * from lipi_shenfen  order by name  limit 50 ");
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
		mysql_query("delete from lipi_shenfen  where name='{$_GET['name']}'  ");
		header("location: my_lipi.php?act=shenfen");
	}
	function shenfen_add_do()
	{
		if (!$_POST['name'])
			die("内容不能为空");
		include "db_locahost_mysql.php";
		$_POST['name']= mysql_real_escape_string(trim($_POST['name']));
		$pinyin= file_get_contents("http://{$_SERVER['__DOMAIN__']}/pinyin.php?wd=" . urlencode($_POST['name']));
		mysql_query("insert into lipi_shenfen  (name,pinyin) values ('{$_POST['name']}','{$pinyin}') ");
		header("location: my_lipi.php?act=shenfen");
	}
	function jigou_index()
	{
		include "db_locahost_mysql.php";
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from  lipi_jigou"));
		$this->pageObj= new page($page['c']);
		$stmt= mysql_query("select * from  lipi_jigou   order by j_id desc  limit {$this->pageObj->limit_1},{$this->pageObj->limit_2}   ");
		$this->jigou_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->jigou_data[]= $row;
		include "my_lipi/jigou_index.html";
	}
	function jigou_search_do()
	{
		include "db_locahost_mysql.php";
		if (!$_POST['j_name'])
			return $this->jigou_index();
		$_POST['j_name']= mysql_real_escape_string(trim($_POST['j_name']));
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from  lipi_jigou where instr(j_name,'{$_POST['j_name']}')>0 "));
		$this->pageObj= new page($page['c']);
		$stmt= mysql_query("select * from  lipi_jigou where instr(j_name,'{$_POST['j_name']}')>0 order by j_id desc  limit {$this->pageObj->limit_1},{$this->pageObj->limit_2}   ");
		$this->jigou_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->jigou_data[]= $row;
		include "my_lipi/jigou_index.html";
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

		mysql_query("insert into lipi_jigou  " .
		"(j_name,j_shenfen,j_jiage,j_jibie,j_time,j_ip,j_content,user_name) values " .
		"('{$_POST['j_name']}','{$_POST['j_shenfen']}','{$_POST['j_jiage']}','{$_POST['j_jibie']}',now(),'{$_SERVER['USER_IP']}','{$_POST['j_content']}','{$_COOKIE['user_name']}') ");
		$id= mysql_insert_id();
		if ($_FILES['file']['tmp_name'])
			move_uploaded_file($_FILES['file']['tmp_name'], "my_lipi_image/{$id}.jpg");
		header("location: my_lipi.php?act=jigou_index");
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

		mysql_query("update  lipi_jigou   set j_name='{$_POST['j_name']}',j_shenfen='{$_POST['j_shenfen']}',j_jibie='{$_POST['j_jibie']}', " .
		"  j_content='{$_POST['j_content']}',j_jiage='{$_POST['j_jiage']}'  where j_id='{$_GET['j_id']}' ");
		if ($_FILES['file']['tmp_name'])
			move_uploaded_file($_FILES['file']['tmp_name'], "my_lipi_image/{$_GET['j_id']}.jpg");
		header("location: my_lipi.php?act=jigou_index");
	}

	function jigou_delete_do()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		mysql_query("delete from lipi_jigou where j_id='{$_GET['j_id']}' limit 1 ");
		@ unlink("my_lipi_image/{$_GET['j_id']}.jpg");

		//更多的图片
		$stmt= mysql_query("select * from  lipi_jigou_image  where j_id='{$_GET['j_id']}' ");
		while ($row= mysql_fetch_assoc($stmt))
			@ unlink("my_lipi_image/" .
			$row['i_name']);

		header("location: my_lipi.php?act=jigou_index");
	}
	function jigou_edit()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		header('Content-Type: text/html;charset=gb2312');
		include "db_locahost_mysql.php";
		//省份数据
		$stmt= mysql_query("select * from lipi_shenfen  order by name    ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data[]= $row;
		$this->row= mysql_fetch_assoc(mysql_query("select * from lipi_jigou   where j_id='{$_GET['j_id']}' limit 1 "));
		include "my_lipi/jigou_edit.html";
	}
	function jigou_image_index()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select * from  lipi_jigou  where j_id='{$_GET['j_id']}' limit 1"));
		$stmt= mysql_query("select * from lipi_jigou_image  where j_id='{$_GET['j_id']}' order by i_id desc ");
		$this->all_image= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_image[]= $row;
		include "my_lipi/jigou_image.html";
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
			move_uploaded_file($_FILES['file']['tmp_name'], "my_lipi_image/$i_name");
			mysql_query("insert into  lipi_jigou_image  " .
			"(j_id,i_name,i_time,user_name,j_ip)  values " .
			"('{$_GET['j_id']}','{$i_name}',now(),'{$_COOKIE['user_name']}','{$_SERVER['USER_IP']}')");
			//更新图片的张数
			$this->_jigou_image_count($_GET['j_id']);
		}
		header("location: my_lipi.php?act=jigou_image_index&j_id={$_GET['j_id']}");
	}
	function jigou_image_delete_do()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		$_GET['i_id']= (int) $_GET['i_id'];
		if (!$_GET['j_id'] || !$_GET['i_id'])
			die;
		include "db_locahost_mysql.php";
		$row= mysql_fetch_assoc(mysql_query("select *  from lipi_jigou_image where i_id='{$_GET['i_id']}'"));
		mysql_query("delete from lipi_jigou_image where i_id='{$_GET['i_id']}'");
		@ unlink("my_lipi_image/{$row['i_name']}");
		//更新图片的张数
		$this->_jigou_image_count($_GET['j_id']);
		header("location: my_lipi.php?act=jigou_image_index&j_id={$_GET['j_id']}");
	}
	function _jigou_image_count($j_id)
	{
		$count= mysql_fetch_assoc(mysql_query("select count(*) c from  lipi_jigou_image where j_id='{$j_id}' "));
		mysql_query("update lipi_jigou  set j_image_count='{$count['c']}' where j_id='{$j_id}' ");
	}
};