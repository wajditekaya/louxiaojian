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
// $Id: t_navi.php,v 1.1 2009/08/18 03:22:43 xltxlm Exp $
include_once "t.class.php";
/**
 * Created on 2006-11-21 by Administrator
 *
 */
class t_navi extends t
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
		$pad= $this->deepth * 10;
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
		if ($noteInfo["r_url"])
			echo "<span><a href='{$noteInfo['r_url']}' target='mainFrame' id='note{$noteInfo['r_id']}'>{$noteInfo['r_name']}</a></span>";
		else
			if ($this->deepth == 0)
				echo "<div style='background-image: url(/style/admin_img/8.gif);width:100%;line-height:30px;height:30px;font-weight:bold;padding-left:10px'  >{$noteInfo['r_name']}</div>\n";
			else
				echo "<span>{$noteInfo['r_name']}</span>\n";
	}
};