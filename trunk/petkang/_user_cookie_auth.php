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
// $Id: _user_cookie_auth.php,v 1.2 2009/08/18 16:55:22 xltxlm Exp $
//本机地址不予验证
if(!$_SERVER['REMOTE_ADDR'] || $_SERVER['REMOTE_ADDR'] == '127.0.0.1')
	return NULL;
include_once "md5_sign.php";
//主要是验证不通过就跳转到 登陆页面
if(!md5_cookie(true, 3600 * 24 * 30))
{
	include_once "_cookie_delete.php";
	header("location: /my_user.php?act=login&go_url=".urlencode("http://{$_SERVER['__DOMAIN__']}{$_SERVER['REQUEST_URI']}"));
	die;
};