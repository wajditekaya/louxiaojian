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
// $Id: t_navi_move.php,v 1.1 2009/08/18 03:22:43 xltxlm Exp $
include_once "t.class.php";
/**
 * Created on 2006-11-21 by Administrator
 *
 */
class t_navi_move extends t
{
	var $deepth= 0;
	var $disable= array();

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
		if($_GET['r_id'] == $noteInfo['r_parent_id'] || $_GET['r_id'] == $noteInfo['r_id'] || in_array($noteInfo['r_parent_id'], $this->disable))
		{
			$this->disable[$noteInfo['r_id']]= $noteInfo['r_id'];
			return null;
		}
		$pad= $this->deepth * 15;
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
		if($_GET['r_id'] == $noteInfo['r_parent_id'] || $_GET['r_id'] == $noteInfo['r_id'] || in_array($noteInfo['r_parent_id'], $this->disable))
		{
			$this->disable[$noteInfo['r_id']]= $noteInfo['r_id'];
			return null;
		}

		echo "<span>{$noteInfo['r_name']} <font color='green'>{$noteInfo['r_url']}</font> ".
		"<a href='m.php?act=resource_move_do&r_id={$noteInfo['r_id']}&or_id={$_GET['r_id']}'>移动到此节点下面</a>";
	}
};