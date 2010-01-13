<?php


/* Eclipse */
//
// +----------------------------------------------------------------------+
// | PHP Version 4                                                        |
// +----------------------------------------------------------------------+
// | Copyright (c) 2005-2006    All rights reserved.                      |
// +----------------------------------------------------------------------+
// | This source file is not free     GBK Encoding!                       |
// +----------------------------------------------------------------------+
// | Authors: xltxlm <xltxlm@163.com>                                     |
// +----------------------------------------------------------------------+
//
// Created by Administrator at 2006-10-28 下午04:15:02
// $Id: t_navi_role.php,v 1.1 2009/08/18 03:22:43 xltxlm Exp $
include_once "t.class.php";
/**
 * Created on 2006-11-21 by Administrator
 *
 */
class t_navi_role extends t
{
	var $deepth= 0;

	/**
	 * Created on 2006-10-30 下午08:28:04 by Administrator
	 *
	 */
	function _subStart($noteInfo)
	{
		echo "\t<ul id='sub{$noteInfo['r_id']}' >\n";
	}
	/**
	 * Created on 2006-10-30 下午08:23:49 by Administrator
	 *
	 */
	function _noteStart($noteInfo)
	{
		$pad= $this->deepth * 20;
		echo "<li  style='padding-left: {$pad}px;'  >";
	}

	/**
	 * Created on 2006-10-30 下午08:23:49 by Administrator
	 *
	 */
	function _noteEnd($noteInfo)
	{
		echo "</li>\n";
	}

	/**
	 * Created on 2006-10-30 下午08:23:57 by Administrator
	 *
	 */
	function _note($noteInfo)
	{
		if($_SERVER['role_list'][$noteInfo['r_id']])
		{
			$color= "style='color:red'";
			$checked= "checked=true";
		}
		echo "<label for='r_id_{$noteInfo['r_id']}' $color>[{$noteInfo['r_id']}]{$noteInfo['r_name']}</label><input type=\"checkbox\" $checked name=\"r_id[]\" id='r_id_{$noteInfo['r_id']}' value=\"{$noteInfo['r_id']}\" onclick='new checkTree().checkChildCheckBox(this)' /> <font color='green'>{$noteInfo['r_url']}</font>\n";
	}
};