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
// Created by Administrator 2009-8-3

/**
 * 后台的生成,管理
 *	Created on 2009-8-3 by Administrator
 *
 */
if ($_GET['phpinfo'])
	die(phpinfo());
include "header.php";
$m= new m;
ini_set("display_errors", 0);
$_GET['act']= $_GET['act'] ? $_GET['act'] : "index";
if ($_GET['act'] != 'login' && $_GET['act'] != 'login_do')
	//管理员验证
	include_once "_cookie_auth.php";
$m-> $_GET['act'] ();
class m
{
	/**
	 * 显示登陆页面
	* @since version - 2009-7-1
	*/
	function login()
	{
		include_once "md5_sign.php";
		//主要是验证不通过就跳转到 登陆页面
		if (md5_cookie(true))
		{
			header("location: m.php?act=index");
			die;
		}
		include ("m/home.login.html");
	}
	/**
	 * 登陆验证
	 * @since version - 2009-7-1
	 */
	function login_do()
	{
		$_POST['user_name']=trim($_POST['user_name']);
		$_POST['user_pass']=trim($_POST['user_pass']);
		$user_info= unserialize(file_get_contents($url="http://{$_SERVER['__DOMAIN__']}/m_server.php?act=user_name_pass&user_name={$_POST['user_name']}&user_pass={$_POST['user_pass']}"));
		if ($user_info)
		{
			$_COOKIE['user_name']= $_POST['user_name'];
			$_COOKIE['user_id']= $user_info['user_id'];
			$user_juese= unserialize(file_get_contents($url= "http://{$_SERVER['__DOMAIN__']}/m_server.php?act=user_name_role&user_name={$_POST['user_name']}"));
			//角色
			$js= array ();
			foreach ($user_juese as $v)
				$js[]= $v['role_name'];
			$_COOKIE['user_role']= join(",", $js);

			include_once "_cookie_login.php";
			setcookie('go_url', NULL);
			header("location: m.php?act=index");
			die;
		}
		$this->login();
	}

	/**
	 * 退出登陆状态
	 * @since version - 2009-7-1
	 */
	function un_login()
	{
		ini_set("display_errors", 0);
		include "_cookie_delete.php";
		//管理员验证
		header("location: m.php?act=login");
		die;
	}

	function index()
	{
		//读取导航资源
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select r_time r_time_show, t.* from  m_role_user mru,m_role_resource mrr,m_resource t   where " .
		" mru.user_id='{$_COOKIE['user_id']}' and mru.role_id=mrr.role_id and t.r_id=mrr.r_id and r_menu='Y' ");
		$tree= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$tree[]= $row;
		include "m/t_navi.php";
		$this->t_navi_obj= new t_navi($tree);
		$this->allBydown= $this->t_navi_obj->show();
		include "m/home.index.html";
	}
	function resource_index()
	{
		//读取导航资源
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select r_time r_time_show, t.* from m_resource t  ");
		$tree= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$tree[]= $row;
		include "m/t_navi_add.php";
		$this->t_navi_obj= new t_navi($tree);
		include ("m/resource_index.html");
	}

	function ajax_resource_info()
	{
		header('Content-Type: text/html;charset=gb2312');
		$_GET['r_id']= (int) $_GET['r_id'];
		if (!$_GET['r_id'])
			return null;
		include "db_locahost_mysql.php";
		$row= mysql_fetch_assoc(mysql_query("select * from m_resource where  r_id='{$_GET['r_id']}'"));
		echo "<span class='tip'>上级菜单:{$row['r_name']}<input type='hidden' name=r_parent_id value='{$row['r_id']}'></span>";
	}
	function resource_top_add_do()
	{
		include "db_locahost_mysql.php";
		$r_name= mysql_real_escape_string(trim($_POST['r_name']));
		$r_url= mysql_real_escape_string(trim($_POST['r_url']));
		$r_note= mysql_real_escape_string(trim($_POST['r_note']));
		$r_user_name= mysql_real_escape_string(trim($_COOKIE['user_name']));
		$r_menu= mysql_real_escape_string(trim($_POST['r_menu']));
		$r_parent_id= mysql_real_escape_string(trim($_POST['r_parent_id']));
		$r_order= mysql_real_escape_string(trim($_POST['r_order']));

		mysql_query("insert into m_resource " .
		"(r_name,r_url,r_note,r_time,r_user_name,r_ip,r_menu,r_parent_id,r_order) values " .
		"('{$r_name}','{$r_url}','{$r_note}',now(),'{$r_user_name}','{$_SERVER['USER_IP']}','{$r_menu}','{$r_parent_id}','{$r_order}')");
		$this->error= mysql_error();
		if (!$this->error)
			header("location: {$_SERVER['HTTP_REFERER']}");
		else
			$this->resource_index();
	}
	function resource_edit()
	{
		header('Content-Type: text/html;charset=gb2312');
		$_GET['r_id']= (int) $_GET['r_id'];
		if (!$_GET['r_id'])
			return null;
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select * from m_resource where  r_id='{$_GET['r_id']}'"));
		include "m/resource_edit.html";
	}
	function resource_top_edit_do()
	{
		include "db_locahost_mysql.php";
		$r_name= mysql_real_escape_string(trim($_POST['r_name']));
		$r_url= mysql_real_escape_string(trim($_POST['r_url']));
		$r_note= mysql_real_escape_string(trim($_POST['r_note']));
		$r_user_name= mysql_real_escape_string(trim($_COOKIE['user_name']));
		$r_menu= mysql_real_escape_string(trim($_POST['r_menu']));
		$r_id= mysql_real_escape_string(trim($_POST['r_id']));
		$r_order= mysql_real_escape_string(trim($_POST['r_order']));

		mysql_query("update  m_resource  set " .
		" r_order='{$r_order}',r_name='{$r_name}',r_url='{$r_url}',r_note='{$r_note}',r_time=now(),r_user_name='{$r_user_name}',r_ip='{$_SERVER['USER_IP']}',r_menu='{$r_menu}'" .
		" where r_id='{$r_id}'  ");
		$this->error= mysql_error();
		if (!$this->error)
		{
			header("location: {$_SERVER['HTTP_REFERER']}");
		}
		else
			die($this->error);
	}
	function resource_delete_do()
	{
		include "db_locahost_mysql.php";
		$_GET['r_id']= (int) $_GET['r_id'];
		if (!$_GET['r_id'])
			die;
		$this->_resource_delete_do($_GET['r_id']);
		header("location: m.php?act=resource_index");
	}
	function _resource_delete_do($id)
	{
		$stmt= mysql_query("select * from m_resource where r_parent_id='{$id}'");
		while ($row= mysql_fetch_assoc($stmt))
			$this->_resource_delete_do($row['r_id']);
		mysql_query("delete from m_resource where r_id='{$id}'");
		mysql_query("delete from m_role_resource where r_id='{$id}'");
	}
	function resource_move()
	{
		$_GET['r_id']= (int) $_GET['r_id'];
		if (!$_GET['r_id'])
			die;
		//读取导航资源
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select r_time r_time_show, t.* from m_resource t where r_id='{$_GET['r_id']}' "));

		$stmt= mysql_query("select r_time r_time_show, t.* from m_resource t  ");
		$tree= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$tree[]= $row;
		include "m/t_navi_move.php";
		$this->t_navi_obj= new t_navi_move($tree);
		include "m/resource_move.html";
	}
	function resource_move_do()
	{
		//这个判断位置是固定的,最前面
		if ($_GET['r_id'] != 'NONE' && (!$_GET['r_id'] || !$_GET['or_id']))
			die;
		$_GET['r_id']= (int) $_GET['r_id'];
		$_GET['or_id']= (int) $_GET['or_id'];
		//读取导航资源
		include "db_locahost_mysql.php";
		mysql_query($sql= "update m_resource set r_parent_id='{$_GET['r_id']}' where r_id='{$_GET['or_id']}' ");
		header("location: m.php?act=resource_index");
	}

	function role_index()
	{
		include "db_locahost_mysql.php";
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from m_role  "));
		$this->pageObj= new page($page['c'], 30);
		$stmt= mysql_query("select t.role_time role_time_show ,t.* from m_role t limit {$this->pageObj->limit_1},{$this->pageObj->limit_2} ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data['角色'][]= $row;
		include "m/role_index.html";
	}
	function role_add_do()
	{
		include "db_locahost_mysql.php";
		$role_name= mysql_real_escape_string($_POST['role_name']);
		$role_note= mysql_real_escape_string($_POST['role_note']);
		$r_user_name= mysql_real_escape_string($_COOKIE['user_name']);
		mysql_query("insert into m_role  " .
		"(role_name,role_time,role_note,role_ip,user_name) values " .
		"('{$role_name}',now(),'{$role_note}','{$_SERVER['USER_IP']}','{$r_user_name}') ");
		header("location: m.php?act=role_index");
	}
	function role_resource()
	{
		//读取导航资源
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select t.role_time role_time_show , t.* from m_role t where role_id='{$_GET['role_id']}' "));
		//该角色已经拥有的资源
		$stmt= mysql_query("select * from m_role_resource where role_id='{$_GET['role_id']}'");
		$_SERVER['role_list']= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$_SERVER['role_list'][$row['r_id']]= $row['r_id'];

		$stmt= mysql_query("select r_time r_time_show, t.* from m_resource t  ");
		$tree= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$tree[]= $row;
		include "m/t_navi_role.php";
		$this->t_navi_obj= new t_navi_role($tree);
		include "m/role_resource.html";
	}
	function role_resource_do()
	{
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select * from m_role_resource where role_id='{$_GET['role_id']}'");
		$_SERVER['role_list']= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$_SERVER['role_list'][$row['r_id']]= $row['r_id'];
		//查找删除的数据
		$delete= array_diff($_SERVER['role_list'], $_POST['r_id']);
		foreach ($delete as $v)
			mysql_query("delete from m_role_resource where role_id='{$_GET['role_id']}' and  r_id='{$v}' ");
		$add= array_diff($_POST['r_id'], $_SERVER['role_list']);
		foreach ($add as $v)
			mysql_query("insert into  m_role_resource  (r_id,role_id) values  ('{$v}','{$_GET['role_id']}') ");

		$this->_role_resource($_GET['role_id']);
		header("location: m.php?act=role_resource&role_id={$_GET['role_id']}");
	}
	function _role_resource($role_id)
	{
		$count= mysql_fetch_assoc(mysql_query("select count(*) c from m_role_resource where role_id='{$role_id}'"));
		mysql_query("update m_role  set resource_count='{$count['c']}' where role_id='{$role_id}' ");
	}

	function role_user()
	{
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select t.role_time role_time_show , t.* from m_role t where role_id='{$_GET['role_id']}' "));
		//已经关联上的帐户
		$stmt= mysql_query("select * from m_role_user where role_id='{$_GET['role_id']}'");
		$_SERVER['role_list']= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$_SERVER['user_list'][$row['user_id']]= $row['user_id'];

		$page= mysql_fetch_assoc(mysql_query("select count(*) c from m_user  "));
		$this->pageObj= new page($page['c'], 30);
		$stmt= mysql_query("select t.user_last_time  user_last_time_show ,t.* from m_user t limit {$this->pageObj->limit_1},{$this->pageObj->limit_2} ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data['帐户'][]= $row;

		include "m/role_user.html";
	}

	function role_user_do()
	{
		include "db_locahost_mysql.php";

		$stmt= mysql_query("select * from m_role_user where role_id='{$_GET['role_id']}'");
		$_SERVER['user_list']= array ();
		settype($_POST['user_id'], 'array');
		while ($row= mysql_fetch_assoc($stmt))
			$_SERVER['user_list'][$row['user_id']]= $row['user_id'];

		//查找删除的数据
		$delete= array_diff($_SERVER['user_list'], $_POST['user_id']);
		foreach ($delete as $v)
			mysql_query("delete from m_role_user where role_id='{$_GET['role_id']}' and  user_id='{$v}' ");
		$add= array_diff($_POST['user_id'], $_SERVER['user_list']);
		foreach ($add as $v)
			mysql_query("insert into  m_role_user  (user_id,role_id) values  ('{$v}','{$_GET['role_id']}') ");

		$this->_role_user_count($_GET['role_id']);
		header("location: m.php?act=role_user&role_id={$_GET['role_id']}");
	}
	function _role_user_count($role_id)
	{
		$count= mysql_fetch_assoc(mysql_query("select count(*) C from m_role_user where role_id='{$role_id}'"));
		mysql_query("update m_role  set user_count='{$count['C']}' where role_id='{$role_id}' ");
	}
	function role_edit()
	{
		header('Content-Type: text/html;charset=gb2312');
		$_GET['role_id']= (int) $_GET['role_id'];
		if (!$_GET['role_id'])
			die;
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select * from m_role where role_id='{$_GET['role_id']}'"));
		include "m/role_edit.html";
	}
	function role_edit_do()
	{
		$_GET['role_id']= (int) $_GET['role_id'];
		if (!$_GET['role_id'])
			die;
		include "db_locahost_mysql.php";
		$role_name= mysql_real_escape_string($_POST['role_name']);
		$role_note= mysql_real_escape_string($_POST['role_note']);
		mysql_query("update m_role set role_name='{$role_name}',role_note='{$role_note}' where role_id='{$_GET['role_id']}' ");
		header("location: {$_SERVER['HTTP_REFERER']}");
	}

	function role_delete_do()
	{
		$_GET['role_id']= (int) $_GET['role_id'];
		if (!$_GET['role_id'])
			die;
		include "db_locahost_mysql.php";
		mysql_query("delete from m_role where role_id='{$_GET['role_id']}'");
		mysql_query("delete from  m_role_resource  where role_id='{$_GET['role_id']}'");
		mysql_query("delete from  m_role_user  where role_id='{$_GET['role_id']}'");
		header("location: m.php?act=role_index");
	}
	function user_index()
	{
		ini_set("display_errors", 0);
		include "db_locahost_mysql.php";
		$page= mysql_fetch_assoc(mysql_query("select count(*) C from m_user  "));
		$this->pageObj= new page($page['C'], 30);
		$stmt= mysql_query("select t.user_last_time  user_last_time_show ,t.* from m_user t limit {$this->pageObj->limit_1},{$this->pageObj->limit_2} ");
		$this->all_data= array ();
		$i= 1;
		while ($row= mysql_fetch_assoc($stmt))
		{
			$i++;
			$this->all_data['帐户'][$i]= $row;
			$stmt2= mysql_query("select mr.*  from m_role_user mru ,m_role mr  where mru.role_id=mr.role_id  and  user_id='{$row['user_id']}'  ");
			while ($row= mysql_fetch_assoc($stmt2))
				$this->all_data['帐户'][$i]['角色'][]= $row;
			//角色下的帐户
		}
		include "m/user_index.html";
	}

	function user_role()
	{
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select * from m_user where user_id='{$_GET['user_id']}' "));

		$stmt= mysql_query("select * from m_role_user where user_id='{$_GET['user_id']}' ");
		$this->all_role_exist= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_role_exist[$row['role_id']]= $row['role_id'];

		$stmt= mysql_query("select * from m_role ");
		$this->all_role= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_role[]= $row;
		include "m/user_role.html";
	}

	function user_role_do()
	{
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select * from m_role_user where user_id='{$_GET['user_id']}' ");
		$this->all_role_exist= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_role_exist[$row['role_id']]= $row['role_id'];
		$_POST['role_id']= array_diff($_POST['role_id'], array (
			''
		));
		settype($_POST['role_id'], 'array');
		$delete= array_diff($this->all_role_exist, $_POST['role_id']);
		$add= array_diff($_POST['role_id'], $this->all_role_exist);
		foreach ($add as $v)
		{
			if ($v)
			{
				mysql_query($sql= "insert into m_role_user  (user_id,role_id) values ('{$_GET['user_id']}','{$v}')");
				$this->_role_user_count($v);
			}
		}

		foreach ($delete as $v)
		{
			if ($v)
			{
				mysql_query($sql= "delete from  m_role_user  where user_id='{$_GET['user_id']}' and  role_id='{$v}' ");
				$this->_role_user_count($v);
			}
		}

		echo "<script>parent.lightBox1.closeFun();parent.window.location.reload();</script>";
	}
	function user_add_do()
	{
		include "db_locahost_mysql.php";
		if (!$_POST['user_pass'] || $_POST['user_pass'] != $_POST['user_pass2'])
			die("确认下帐户填写了?2次输入密码相同");

		$user_name= mysql_real_escape_string($_POST['user_name']);
		$user_pass= md5($_POST['user_pass']);
		$user_note= mysql_real_escape_string($_POST['user_note']);

		mysql_query("insert into m_user  " .
		"(user_name,user_last_time,user_pass,user_last_ip,user_note) values " .
		"('{$user_name}',now(),'{$user_pass}','{$_SERVER['USER_IP']}','{$user_note}') ");
		header("location: m.php?act=user_index");
	}
	function user_pass_edit()
	{
		header('Content-Type: text/html;charset=gb2312');
		$_GET['user_id']= (int) $_GET['user_id'];
		if (!$_GET['user_id'])
			die;
		include "db_locahost_mysql.php";
		$this->row= mysql_fetch_assoc(mysql_query("select * from m_user where user_id='{$_GET['user_id']}' "));
		include "m/user_pass_edit.html";
	}
	function user_pass_edit_do()
	{
		if ($_POST['new_pass'] && $_POST['new_pass'] == $_POST['new_pass2'] && $_GET['user_id'])
		{
			include "db_locahost_mysql.php";
			$user_pass= md5($_POST['new_pass']);
			mysql_query("update  m_user set user_pass ='{$user_pass}' where user_id='{$_GET['user_id']}' ");
			die(header("location: m.php?act=user_index"));
		}
		die("2次输入密码错误");
	}
	function user_delete_do()
	{
		$_GET['user_id']= (int) $_GET['user_id'];
		if (!$_GET['user_id'])
			die;
		include "db_locahost_mysql.php";
		mysql_query("delete from m_user  where user_id='{$_GET['user_id']}' limit 1 ");
		mysql_query("delete from m_role_user   where user_id='{$_GET['user_id']}' limit 1 ");
		header("location: m.php?act=user_index");
	}
	function user_tree()
	{
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select r_time r_time_show, t.* from  m_role_user mru,m_role_resource mrr,m_resource t   where " .
		" mru.user_id='{$_GET['user_id']}' and mru.role_id=mrr.role_id and t.r_id=mrr.r_id and r_menu='Y' ");
		$tree= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$tree[]= $row;
		include "m/t_navi_pre.php";
		$this->t_navi_obj= new t_navi_pre($tree);
		$this->allBydown= $this->t_navi_obj->show();
		include "m/user_tree.html";
	}

	function user_search_do()
	{
		if (!$_REQUEST['user_name'])
			die("比如输入帐户名");
		ini_set("display_errors", 0);
		include "db_locahost_mysql.php";
		$_REQUEST['user_name']= mysql_real_escape_string($_REQUEST['user_name']);
		$page= mysql_fetch_assoc(mysql_query("select count(*) C from m_user where instr(user_name,'{$_REQUEST['user_name']}')>0   "));
		$this->pageObj= new page($page['C'], 30);
		$stmt= mysql_query("select t.user_last_time  user_last_time_show ,t.* from m_user t " .
		" where instr(user_name,'{$_REQUEST['user_name']}')>0 limit {$this->pageObj->limit_1},{$this->pageObj->limit_2} ");
		$this->all_data= array ();
		$i= 1;
		while ($row= mysql_fetch_assoc($stmt))
		{
			$i++;
			$this->all_data['帐户'][$i]= $row;
			$stmt2= mysql_query("select mr.*  from m_role_user mru ,m_role mr  where mru.role_id=mr.role_id  and  user_id='{$row['user_id']}'  ");
			while ($row= mysql_fetch_assoc($stmt2))
				$this->all_data['帐户'][$i]['角色'][]= $row;
			//角色下的帐户
		}
		include "m/user_search.html";
	}

	function user_jiekou()
	{
		include "m/user_jiekou.html";
	}
};
