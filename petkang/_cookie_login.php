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
// $Id: _cookie_login.php,v 1.1 2009/08/18 03:22:43 xltxlm Exp $

//注销掉他之前的全部验证cookie
//设置验证数据
include_once "md5_sign.php";
setcookie("user_name", $_COOKIE['user_name'], time() + 3600 * 24 * 3, '/', $_SERVER['__DOMAIN__']);
setcookie("user_id", $_COOKIE['user_id'], time() + 3600 * 24 * 3, '/', $_SERVER['__DOMAIN__']);
setcookie("user_role", $_COOKIE['user_role'], time() + 3600 * 24 * 3, '/', $_SERVER['__DOMAIN__']);
setcookie("COOKIE_Authentication", md5_cookie(), time() + 3600 * 24 * 3, '/', $_SERVER['__DOMAIN__']);
;