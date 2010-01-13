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
// Created by Administrator 2009-8-6
// $Id: m_server.php,v 1.1 2009/08/18 03:22:43 xltxlm Exp $
$m= new m_server;
include "header.php";
ini_set("display_errors", 0);
$m-> $_GET['act']();
class m_server
{
	/**
	 * ajax方式输出结果[是菜单的结果]
	 *	Created on 2009-8-12 by Administrator
	 *
	 */
	function resource_ajax()
	{
		include "db_locahost_mysql.php";
		$_GET['wd']= mysql_real_escape_string(de(trim($_GET['wd'])));
		if($_GET['wd'])
		{
			$stmt= mysql_query("select t.* from m_resource t where r_menu='Y' and ".
			" ( r_name LIKE '%{$_GET['wd']}%' OR r_url LIKE '%{$_GET['wd']}%' ) and r_url!=''   order by r_fav desc limit 10 ");
		}
		else
		{
			$stmt= mysql_query("select t.* from m_resource t where r_menu='Y'  and r_url!='' order by r_fav desc limit 10 ");
		}
		$tmp= array();
		while($row= mysql_fetch_assoc($stmt))
		{
			$row['r_url']=array_shift(explode("'",$row['r_url']));
			$row['r_name']=htmlspecialchars($row['r_name']);
			$tmp[]= "'{$row['r_name']}','{$row['r_url']}'";
		}
		echo join(",", $tmp);
		die;
	}
	/**
	 * 输出帐户下面全部的会员,多个role_id就读取多次再合并
	 *	Created on 2009-8-10 by Administrator
	 *
	 */
	function role_user()
	{
		if(!$_GET['role_id'])
			die;
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select mu.* from  m_role_user mru,m_user mu  where mru.role_id=:role_id and mru.user_id=mu.user_id ");
		$all_data= array();
		while($row= mysql_fetch_assoc($stmt))
			$all_data[]= $row;
		echo serialize($all_data);
		die;
	}

	/**
	 * 根据帐户名称查找该帐户拥有的角色
	 *	Created on 2009-8-6 by Administrator
	 *
	 */
	function user_name_role()
	{
		$_GET['user_name']= trim($_GET['user_name']);
		if(!$_GET['user_name'])
			die;
		include "db_locahost_mysql.php";
		$_GET['user_name']= mysql_real_escape_string($_GET['user_name']);
		$stmt= mysql_query("select mr.*  from m_role_user mru ,m_role mr,m_user mu  ".
		" where mu.user_id=mru.user_id and  mru.role_id=mr.role_id  and  mu.user_name = '{$_GET['user_name']}'  ");
		$all_data= array();
		while($row= mysql_fetch_assoc($stmt))
			$all_data[$row['role_id']]= $row;
		echo serialize($all_data);
		die;
	}

	/**
	 * 根据帐户+资源,查看是否有这个权限
	 *	Created on 2009-8-6 by Administrator
	 *
	 */
	function user_name_resource()
	{
		$_GET['user_name']= trim($_GET['user_name']);
		$_GET['r_url']= trim($_GET['r_url']);
		if(!$_GET['user_name'] || !$_GET['r_url'])
			die;
		include "db_locahost_mysql.php";
		$_GET['user_name']= mysql_real_escape_string($_GET['user_name']);
		$_GET['r_url']= mysql_real_escape_string($_GET['r_url']);
		//不区分大小写
		$stmt= mysql_query($sql= "select mrr2.*  from m_user mu, m_role_user mru ,m_role_resource mrr ,m_resource mrr2  ".
		" where  user_name = '{$_GET['user_name']}' and  mrr2.r_url='{$_GET['r_url']}' ".
		" and  mru.user_id=mu.user_id and mru.role_id=mrr.role_id and mrr2.r_id=mrr.r_id ");
		$all_data= array();
		while($row= mysql_fetch_assoc($stmt))
			$all_data[]= $row;
		echo serialize($all_data);
		die;
	}
	/**
	 * cookie存在的,再次验证
	 *	Created on 2009-8-6 by Administrator
	 *
	 */
	function user_name_pass_md5()
	{
		$_GET['user_name']= trim($_GET['user_name']);
		$_GET['user_pass']= trim($_GET['user_pass']);
		if(!$_GET['user_name'] || !$_GET['user_pass'])
			die;
		include "db_locahost_mysql.php";
		$_GET['user_name']= mysql_real_escape_string($_GET['user_name']);
		$_GET['user_pass']= mysql_real_escape_string($_GET['user_pass']);
		$row= mysql_fetch_assoc(mysql_query($sql= "select * from m_user where user_name='{$_GET['user_name']}' and user_pass='{$_GET['user_pass']}' limit 1 "));
		echo serialize($row);
		die;
	}
	/**
	 * 明文验证
	 *	Created on 2009-8-6 by Administrator
	 *
	 */
	function user_name_pass()
	{
		$_GET['user_name']= trim($_GET['user_name']);
		$_GET['user_pass']= trim($_GET['user_pass']);
		if(!$_GET['user_name'] || !$_GET['user_pass'])
			die;
		$_GET['user_pass']= md5($_GET['user_pass']);
		$this->user_name_pass_md5();
	}

};
function de($str)
{
	$ret= '';
	$len= strlen($str);
	for($i= 0; $i < $len; $i++)
	{
		if(($str[$i] == '\\' && $str[$i +1] == 'u') || $str[$i] == '%' && $str[$i +1] == 'u')
		{
			$val= hexdec(substr($str, $i +2, 4));
			if($val < 0x7f)
				$ret .= chr($val);
			else
				if($val < 0x800)
					$ret .= chr(0xc0 |($val >> 6)).chr(0x80 |($val & 0x3f));
				else
					$ret .= chr(0xe0 |($val >> 12)).chr(0x80 |(($val >> 6) & 0x3f)).chr(0x80 |($val & 0x3f));
			$i += 5;
		}
		else
			if($str[$i] == '%')
			{
				$ret .= urldecode(substr($str, $i, 3));
				$i += 2;
			}
			else
				$ret .= $str[$i];
	}
	return iconv('UTF-8', 'GBK', $ret);
};