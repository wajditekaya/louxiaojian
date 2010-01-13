<?php


/* Eclipse: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
//
// +----------------------------------------------------------------------+
// | PHP Version 4                                                        |
// +----------------------------------------------------------------------+
// | Copyright (c) 2005-2006    All rights reserved.                      |
// +----------------------------------------------------------------------+
// | This source file is not free   GBK   Encoding!                       |
// +----------------------------------------------------------------------+
// | Authors: xltxlm <xltxlm@163.com>                                     |
// +----------------------------------------------------------------------+
//
// Created by Administrator 2009-7-1
// $Id: _cookie_auth.php,v 1.1 2009/08/18 03:22:43 xltxlm Exp $
//本机地址不予验证
if (!$_SERVER['REMOTE_ADDR'] || $_SERVER['REMOTE_ADDR'] == '127.0.0.1')
	return NULL;
include_once "md5_sign.php";
//主要是验证不通过就跳转到 登陆页面
if (!md5_cookie(true, 3600 * 24 * 3) || !$_COOKIE['user_role'])
{
	include_once "_cookie_delete.php";
	header("location: m.php?act=login&go_url=" . urlencode("http://{$_SERVER['__DOMAIN__']}{$_SERVER['REQUEST_URI']}"));
	die;
};