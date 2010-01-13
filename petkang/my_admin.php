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
// $Id: my_admin.php,v 1.123 2009/12/02 05:28:23 xltxlm Exp $
include "header.php";
//ini_set("display_errors",1);
//管理员验证
$my_admin= new my_admin();
$my_admin-> $_GET['act'] ();
class my_admin
{
	//机构,更多点评页面
	function jigou_dianpin()
	{
		define("__NAVI__", "中心");
		include "db_locahost_mysql.php";
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from yiliao_jigou_dianpin  where j_id='{$_GET['j_id']}' "));
		$this->pageObj= new page($page['c'], 10);
		//医院基本信息
		$this->row= mysql_fetch_assoc(mysql_query("select * from  yiliao_jigou where j_id='{$_GET['j_id']}'"));
		//点评数据
		$stmt= mysql_query("select * from yiliao_jigou_dianpin  where j_id='{$_GET['j_id']}' order by add_time desc " .
		"limit {$this->pageObj->limit_1},{$this->pageObj->limit_2}  ");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_dianpin[]= $row;
		include "my_admin/jogou_dianpin.html";
	}
	/**
	 * 全国pet/ct中心,地图形式
	 *	Created on 2009-8-24 by Administrator
	 *
	 */
	function jigou_map()
	{
		define("__NAVI__", "中心");
		include ("my_admin/jigou_map.shtml");
	}
	//默认列表页面(列表形式)
	function jigou_list()
	{
		define("__NAVI__", "中心");
		include "db_locahost_mysql.php";
		$_GET['pageID']= max(1, $_GET['pageID']);
		$page= $stmt= mysql_fetch_assoc(mysql_query("select count(*) c from yiliao_jigou   "));
		$this->pageObj= new page($page['c'], 10);
		if ($_GET['pageID'] == 1)
			$stmt= mysql_query("select * from yiliao_jigou where  home_page>0 order by home_page asc  limit 10  ");
		else
			$stmt= mysql_query("select * from yiliao_jigou order  by   j_star  desc limit {$this->pageObj->limit_1}, {$this->pageObj->limit_2} ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data["中心"][]= $row;
		include "my_admin/jigou_list.shtml";
	}
	//搜索结果列表
	function jigou_search()
	{
		define("__NAVI__", "中心");
		include "db_locahost_mysql.php";
		$_REQUEST['wd']= mysql_real_escape_string(trim($_REQUEST['wd']));
		$wd= NULL;
		if ($_REQUEST['wd'])
			$wd= " and j_shenfen   LIKE  '%{$_REQUEST['wd']}%' ";
		$name= NULL;
		if ($_REQUEST['name'])
			$name= " and j_name   LIKE  '%{$_REQUEST['name']}%' ";
		$j_jibie=NULL;
		if ($_REQUEST['j_jibie'])
			$j_jibie= " and j_jibie ='{$_REQUEST['j_jibie']}' ";
		if ($_REQUEST['price1'])
			$j_jiage= " and j_jiage >={$_REQUEST['price1']} ";
		if ($_REQUEST['price2'])
			$j_jiage_2= " and j_jiage <={$_REQUEST['price2']} ";

		$page= mysql_fetch_assoc(mysql_query($sql="select count(*) c  from   yiliao_jigou  where 1 {$wd} {$name} {$j_jibie} {$j_jiage} {$j_jiage_2} "));
		$this->pageObj= new page($page['c'], 10);
		//查找出中心数据
		$stmt= mysql_query("select * from yiliao_jigou where 1 {$wd} {$name} {$j_jibie}  {$j_jiage} {$j_jiage_2} order by j_star  desc ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data["中心"][]= $row;
		include "my_admin/jigou_list.shtml";
	}
	//详细介绍页面
	function jogou_info()
	{
		define("__NAVI__", "中心");
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		mysql_query("update yiliao_jigou set click=click+1  where j_id='{$_GET['j_id']}' ");
		//医院基本信息
		$this->row= mysql_fetch_assoc(mysql_query("select * from  yiliao_jigou where j_id='{$_GET['j_id']}'"));
		//点评人数
		$this->dianpin_count= mysql_fetch_assoc(mysql_query("select count(*) c from yiliao_jigou_dianpin  where j_id='{$_GET['j_id']}'  "));
		//点评数据
		$stmt= mysql_query("select * from yiliao_jigou_dianpin  where j_id='{$_GET['j_id']}' order by add_time desc  ");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_dianpin[]= $row;
		//小图片
		$this->all_image= array ();
		if ($this->row['j_image_count'] > 0)
		{
			$stmt= mysql_query("select * from yiliao_jigou_image  where j_id='{$_GET['j_id']}' order by i_time  desc  ");
			while ($row= mysql_fetch_assoc($stmt))
				$this->all_image[]= $row;
		}
		include "my_admin/jogou_info.html";
	}
	//医院点评
	function jogou_dianpin_do()
	{
		//会员验证
		include_once "_user_cookie_auth.php";
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		$_COOKIE['user_name']= mysql_real_escape_string(trim($_COOKIE['user_name']));
		$_POST['content']= mysql_real_escape_string(trim($_POST['content']));
		$_POST['star']= (int) mysql_real_escape_string(trim($_POST['star']));
		$row= mysql_fetch_assoc(mysql_query($sql= "select * from  yiliao_jigou where j_id='{$_GET['j_id']}' "));

		mysql_query($sql= "insert into yiliao_jigou_dianpin " .
		"(j_id,user_name,add_time,star,content,ip,j_name) values " .
		"('{$_GET['j_id']}','{$_COOKIE['user_name']}',now(),'{$_POST['star']}','{$_POST['content']}','{$_SERVER['USER_IP']}','{$row['j_name']}')");
		header("location: /my_admin.php?act=jogou_dianpin_seccess&j_id={$_GET['j_id']}");
	}
	//点评成功页面
	function jogou_dianpin_seccess()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query($sql= "select * from  yiliao_jigou where j_id='{$_GET['j_id']}' "));
		include "my_admin/jogou_dianpin_seccess.html";
	}

	/**
	 * 管理员审核点评数据
	 *	Created on 2009-8-27 by Administrator
	 *
	 */
	function admin_jogou_dianpin()
	{
		//管理员验证
		include_once "_cookie_auth.php";
		include "db_locahost_mysql.php";
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from yiliao_jigou_dianpin "));
		$this->pageObj= new page($page['c'], 20);
		$stmt= mysql_query("select * from yiliao_jigou_dianpin  order by add_time desc limit {$this->pageObj->limit_1},{$this->pageObj->limit_2} ");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_dianpin[]= $row;
		include "my_admin/admin_jogou_dianpin.html";
	}
	/**
	 * 删除掉点评数据
	 *	Created on 2009-8-27 by Administrator
	 *
	 */
	function admin_jogou_dianpin_delete_do()
	{
		//管理员验证
		include_once "_cookie_auth.php";
		include "db_locahost_mysql.php";
		mysql_query("delete from yiliao_jigou_dianpin  where id='{$_GET['id']}'");
		header("location: {$_SERVER['HTTP_REFERER']}");
	}
	//预约订单管理
	function jigou_yuding_list()
	{
		//管理员验证
		include_once "_cookie_auth.php";
		include "db_locahost_mysql.php";
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from  yiliao_user_yuding  	"));
		$this->pageObj= new page($page['c']);
		$stmt= mysql_query("select * from yiliao_user_yuding  order by id desc limit {$this->pageObj->limit_1},{$this->pageObj->limit_2}");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
		{
			$this->all_data[]= $row;
		}
		include "my_admin/jigou_yuding_list.html";
	}
	//修改预定单子的状态
	function jigou_yuding_ok()
	{
		//管理员验证
		include_once "_cookie_auth.php";
		include "db_locahost_mysql.php";
		$_GET['stat']= mysql_real_escape_string(trim($_GET['stat']));
		$_GET['id']= mysql_real_escape_string(trim($_GET['id']));
		mysql_query("update yiliao_user_yuding set stat='{$_GET['stat']}' where id='{$_GET['id']}'");
		header("location: {$_SERVER['HTTP_REFERER']}");
	}
	//预定页面
	function jigou_yuding()
	{
		define("__NAVI__", "中心");
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		//机构的基本数据
		$this->row= mysql_fetch_assoc(mysql_query("select * from  yiliao_jigou where j_id='{$_GET['j_id']}'"));
		//已经设置不能预约的时间段(默认是明天的)
		$j_date= date("Y-m-d", strtotime("+1 day"));
		$stmt= mysql_query("select * from yiliao_jigou_timer where j_date='$j_date' and j_id='{$_GET['j_id']}' ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data[$row['j_hour']]= $row;
		//帐户的基本数据
		$_COOKIE['user_name']= mysql_real_escape_string(trim($_COOKIE['user_name']));
		$this->user_info= mysql_fetch_assoc(mysql_query("select * from yiliao_user  where user_name='{$_COOKIE['user_name']}' limit 1 "));
		//验证来源
		include_once "md5_sign.php";
		include "my_admin/jigou_yuding.html";
	}
	//机构预定时间表设置
	function jigou_yuding_timer()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select * from yiliao_jigou_timer where j_date='{$_GET['j_date']}' and j_id='{$_GET['j_id']}' ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data[$row['j_hour']]= $row;
		include "my_admin/jigou_yuding_timer.html";
	}
	//执行预约动作
	function jigou_yuding_do()
	{
		//验证来源
		include_once "md5_sign.php";
		if (!md5_sign($_POST['md5_sign']))
			die("非法来源");
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select * from  yiliao_jigou where j_id='{$_GET['j_id']}'"));
		$j_name= mysql_real_escape_string(trim($this->row['j_name']));
		$_COOKIE['user_name']= mysql_real_escape_string(trim($_COOKIE['user_name']));
		$_POST['user_realname']= mysql_real_escape_string(trim($_POST['user_realname']));
		$_POST['user_contact']= mysql_real_escape_string(trim($_POST['user_contact']));
		$_POST['user_tel']= mysql_real_escape_string(trim($_POST['user_tel']));
		$_POST['user_binshi']= mysql_real_escape_string(trim($_POST['user_binshi']));
		$_POST['post_date']= mysql_real_escape_string(trim($_POST['post_date']));
		$_POST['post_hour']= mysql_real_escape_string(trim($_POST['post_hour']));
		$_POST['user_sex']= mysql_real_escape_string(trim($_POST['user_sex']));
		$_POST['body_part']= mysql_real_escape_string(trim($_POST['body_part']));
		$user_location= mysql_real_escape_string(trim(file_get_contents("http://{$_SERVER['__DOMAIN__']}/ip_server.php?ip=" . $_SERVER['USER_IP'])));
		mysql_query("insert into   yiliao_user_yuding " .
		"(body_part,ip,ip_local,user_sex,add_time,user_binshi,user_tel,user_realname,j_id,j_name,user_name,user_contact,post_date,post_hour) values " .
		"('{$_POST['body_part']}','{$_SERVER['USER_IP']}','{$user_location}','{$_POST['user_sex']}',now(),'{$_POST['user_binshi']}','{$_POST['user_tel']}','{$_POST['user_realname']}','{$this->row['j_id']}','{$j_name}','{$_COOKIE['user_name']}','{$_POST['user_contact']}','{$_POST['post_date']}','{$_POST['post_hour']}')");
		$id= mysql_insert_id();
		header("location: /my_admin.php?act=jigou_yuding_seccess&id=" . $id);
	}
	function jigou_yuding_seccess()
	{
		$_GET['id']= (int) $_GET['id'];
		if (!$_GET['id'])
			die;
		define("__NAVI__", "中心");
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select * from  yiliao_user_yuding  where id='{$_GET['id']}'"));
		include "my_admin/jigou_yuding_seccess.html";
	}

	function jigou_timer()
	{
		if (!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select * from  yiliao_jigou  where j_id='{$_GET['j_id']}'"));
		$_REQUEST['j_date']= $_REQUEST['j_date'] ? $_REQUEST['j_date'] : date("Y-m-d", strtotime("+1 day"));
		$_REQUEST['j_date']= mysql_real_escape_string(trim($_REQUEST['j_date']));
		$j_date= null;
		$j_date= " and j_date='{$_REQUEST['j_date']}' ";
		//已经存在的时间表
		$stmt= mysql_query("select * from  yiliao_jigou_timer  where j_id='{$_GET['j_id']}'  {$j_date} ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data[$row['j_hour']]= $row['j_hour'];

		include "my_admin/jigou_timer.html";
	}

	function jigou_timer_do()
	{
		if (!$_GET['j_id'] || !$_REQUEST['j_date'])
			die;
		include "db_locahost_mysql.php";
		$j_date= " and j_date='{$_REQUEST['j_date']}' ";
		$this->row= mysql_fetch_assoc(mysql_query("select * from  yiliao_jigou  where j_id='{$_GET['j_id']}'"));

		//已经存在的时间表
		$stmt= mysql_query("select * from  yiliao_jigou_timer  where j_id='{$_GET['j_id']}'  {$j_date} ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data[$row['j_hour']]= $row['j_hour'];
		$add= array_diff($_POST['j_hour'], $this->all_data);
		foreach ($add as $v)
			mysql_query("insert into  yiliao_jigou_timer " .
			"(j_id,j_name,j_date,j_hour) values " .
			"('{$_GET['j_id']}','{$this->row['j_name']}', '{$_REQUEST['j_date']}','{$v}' ) ");
		settype($_POST['j_hour'], "array");
		$delete= array_diff($this->all_data, $_POST['j_hour']);
		foreach ($delete as $v)
		{
			mysql_query("delete from yiliao_jigou_timer  where j_id='{$_GET['j_id']}'  {$j_date} and j_hour='{$v}' ");
		}
		header("location: {$_SERVER['HTTP_REFERER']}");
	}
	function jigou_detail()
	{
		if (!$_GET)
			include "my_admin/jigou_detail.html";
	}

	function shenfen()
	{
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select * from yiliao_shenfen  order by name  ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data[]= $row;
		include "my_admin/shenfen.html";
	}
	function shenfen_ajax()
	{
		header('Content-Type: text/html;charset=gb2312');
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select * from yiliao_shenfen  order by name  limit 50 ");
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
		$_POST['name']= mysql_real_escape_string(trim($_POST['name']));
		mysql_query("delete from yiliao_shenfen  where name='{$_GET['name']}'  ");
		header("location: my_admin.php?act=shenfen");
	}
	function shenfen_add_do()
	{
		if (!$_POST['name'])
			die("内容不能为空");
		include "db_locahost_mysql.php";
		$_POST['name']= mysql_real_escape_string(trim($_POST['name']));
		$pinyin= file_get_contents("http://{$_SERVER['__DOMAIN__']}/pinyin.php?wd=" . urlencode($_POST['name']));
		mysql_query("replace into yiliao_shenfen  (name,pinyin,home,orderby) values ('{$_POST['name']}','{$pinyin}','{$_POST['home']}','{$_POST['orderby']}') ");
		header("location: my_admin.php?act=shenfen");
	}
	function jigou_index()
	{
		include "db_locahost_mysql.php";
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from  yiliao_jigou  "));
		$this->pageObj= new page($page['c']);
		$stmt= mysql_query("select * from  yiliao_jigou  where 1 {$j_shenfen}  order by j_id desc  limit {$this->pageObj->limit_1},{$this->pageObj->limit_2}   ");
		$this->jigou_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->jigou_data[]= $row;
		include "my_admin/jigou_index.html";
	}
	function jigou_search_do()
	{
		include "db_locahost_mysql.php";
		if (!$_POST['j_name'] && !$_POST['j_shenfen'])
			return $this->jigou_index();
		$j_name= NULL;

		$_POST['j_name']= mysql_real_escape_string(trim($_POST['j_name']));
		$_POST['j_shenfen']= mysql_real_escape_string(trim($_POST['j_shenfen']));
		$j_name= NULL;
		if ($_POST['j_name'])
			$j_name= " and j_name LIKE '%{$_POST['j_name']}%'  ";
		$j_shenfen= NULL;
		if ($_POST['j_shenfen'])
			$j_shenfen= " and j_shenfen  LIKE '%{$_POST['j_shenfen']}%' ";

		$page= mysql_fetch_assoc(mysql_query("select count(*) c from  yiliao_jigou where 1 {$j_name}  {$j_shenfen}"));
		$this->pageObj= new page($page['c']);
		$stmt= mysql_query("select * from  yiliao_jigou where 1 {$j_name} {$j_shenfen} order by j_id desc  limit {$this->pageObj->limit_1},{$this->pageObj->limit_2}   ");
		$this->jigou_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->jigou_data[]= $row;
		include "my_admin/jigou_index.html";
	}
	function jigou_add_do()
	{
		include "db_locahost_mysql.php";
		ini_set("display_errors", true);
		$_POST['j_name']= mysql_real_escape_string($_POST['j_name']);
		$_POST['j_shenfen']= mysql_real_escape_string($_POST['j_shenfen']);
		$_POST['j_jiage']= mysql_real_escape_string($_POST['j_jiage']);
		$_POST['j_jibie']= mysql_real_escape_string($_POST['j_jibie']);
		$_POST['j_content']= mysql_real_escape_string($_POST['j_content']);
		$_COOKIE['user_name']= mysql_real_escape_string($_COOKIE['user_name']);
		$_POST['j_star']= (int) mysql_real_escape_string($_POST['j_star']);
		$_POST['home_page']= (int) mysql_real_escape_string($_POST['home_page']);
		$_POST['google_map']= mysql_real_escape_string($_POST['google_map']);
		$_POST['j_weizi']= mysql_real_escape_string($_POST['j_weizi']);
		$_POST['j_zhuanjia']= mysql_real_escape_string($_POST['j_zhuanjia']);

		mysql_query($sql= "insert into yiliao_jigou  " .
		"(j_name,j_shenfen,j_jiage,j_jibie,j_time,j_ip,j_content,user_name,j_star,home_page,google_map,j_weizi,j_zhuanjia) values " .
		"('{$_POST['j_name']}','{$_POST['j_shenfen']}','{$_POST['j_jiage']}','{$_POST['j_jibie']}'," .
		"now(),'{$_SERVER['USER_IP']}','{$_POST['j_content']}','{$_COOKIE['user_name']}','{$_POST['j_star']}'," .
		"'{$_POST['home_page']}','{$_POST['google_map']}','{$_POST['j_weizi']}','{$_POST['j_zhuanjia']}' ) ");
		$id= mysql_insert_id();
		if ($_FILES['file']['tmp_name'])
		{
			move_uploaded_file($_FILES['file']['tmp_name'], "my_admin_image/{$id}.jpg");
			file_get_contents("http://{$_SERVER['__DOMAIN__']}/image_resize.php?src=my_admin_image/{$id}.jpg&dec=my_admin_image/{$id}.jpgsmall.jpg&width=100&height=70");
		}
		header("location: my_admin.php?act=jigou_index");
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
		$_POST['j_star']= (int) mysql_real_escape_string($_POST['j_star']);
		$_POST['home_page']= (int) mysql_real_escape_string($_POST['home_page']);
		$_POST['google_map']= mysql_real_escape_string($_POST['google_map']);
		$_POST['j_weizi']= mysql_real_escape_string($_POST['j_weizi']);
		$_POST['j_zhuanjia']= mysql_real_escape_string($_POST['j_zhuanjia']);

		mysql_query($sql= "update  yiliao_jigou   set j_weizi='{$_POST['j_weizi']}', google_map='{$_POST['google_map']}', home_page='{$_POST['home_page']}', j_star='{$_POST['j_star']}', j_name='{$_POST['j_name']}',j_shenfen='{$_POST['j_shenfen']}',j_jibie='{$_POST['j_jibie']}', " .
		"  j_content='{$_POST['j_content']}',j_jiage='{$_POST['j_jiage']}',j_zhuanjia='{$_POST['j_zhuanjia']}'  where j_id='{$_GET['j_id']}' ");
		if ($_FILES['file']['tmp_name'])
		{
			move_uploaded_file($_FILES['file']['tmp_name'], "my_admin_image/{$_GET['j_id']}.jpg");
			file_get_contents("http://{$_SERVER['__DOMAIN__']}/image_resize.php?src=my_admin_image/{$_GET['j_id']}.jpg&dec=my_admin_image/{$_GET['j_id']}.jpgsmall.jpg&width=100&height=70");
		}
		header("location: my_admin.php?act=jigou_index");
	}

	function jigou_delete_do()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		mysql_query("delete from yiliao_jigou where j_id='{$_GET['j_id']}' limit 1 ");
		@ unlink("my_admin_image/{$_GET['j_id']}.jpg");

		//更多的图片
		$stmt= mysql_query("select * from  yiliao_jigou_image  where j_id='{$_GET['j_id']}' ");
		while ($row= mysql_fetch_assoc($stmt))
			@ unlink("my_admin_image/" .
			$row['i_name']);

		header("location: my_admin.php?act=jigou_index");
	}
	function jigou_edit()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		header('Content-Type: text/html;charset=gb2312');
		include "db_locahost_mysql.php";
		//省份数据
		$stmt= mysql_query("select * from yiliao_shenfen  order by name    ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data[]= $row;
		$this->row= mysql_fetch_assoc(mysql_query("select * from yiliao_jigou   where j_id='{$_GET['j_id']}' limit 1 "));
		include "my_admin/jigou_edit.html";
	}
	function jigou_image_index()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		if (!$_GET['j_id'])
			die;
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select * from  yiliao_jigou  where j_id='{$_GET['j_id']}' limit 1"));
		$stmt= mysql_query("select * from yiliao_jigou_image  where j_id='{$_GET['j_id']}' order by i_id desc ");
		$this->all_image= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_image[]= $row;
		include "my_admin/jigou_image.html";
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
			move_uploaded_file($_FILES['file']['tmp_name'], "my_admin_image/$i_name");
			mysql_query("insert into  yiliao_jigou_image  " .
			"(j_id,i_name,i_time,user_name,j_ip)  values " .
			"('{$_GET['j_id']}','{$i_name}',now(),'{$_COOKIE['user_name']}','{$_SERVER['USER_IP']}')");
			//更新图片的张数
			$this->_jigou_image_count($_GET['j_id']);
			file_get_contents("http://{$_SERVER['__DOMAIN__']}/image_resize.php?src=my_admin_image/{$i_name}&dec=my_admin_image/{$i_name}small.jpg&width=100&height=70");
		}
		header("location: my_admin.php?act=jigou_image_index&j_id={$_GET['j_id']}");
	}
	function jigou_image_delete_do()
	{
		$_GET['j_id']= (int) $_GET['j_id'];
		$_GET['i_id']= (int) $_GET['i_id'];
		if (!$_GET['j_id'] || !$_GET['i_id'])
			die;
		include "db_locahost_mysql.php";
		$row= mysql_fetch_assoc(mysql_query("select *  from yiliao_jigou_image where i_id='{$_GET['i_id']}'"));
		mysql_query("delete from yiliao_jigou_image where i_id='{$_GET['i_id']}'");
		@ unlink("my_admin_image/{$row['i_name']}");
		@ unlink("my_admin_image/{$row['i_name']}small.jpg");
		//更新图片的张数
		$this->_jigou_image_count($_GET['j_id']);
		header("location: my_admin.php?act=jigou_image_index&j_id={$_GET['j_id']}");
	}
	function _jigou_image_count($j_id)
	{
		$count= mysql_fetch_assoc(mysql_query("select count(*) c from  yiliao_jigou_image where j_id='{$j_id}' "));
		mysql_query("update yiliao_jigou  set j_image_count='{$count['c']}' where j_id='{$j_id}' ");
	}
	function tongji()
	{
		include "my_admin/tongji.html";
	}
};