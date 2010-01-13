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
// $Id: _cookie_delete.php,v 1.1 2009/08/18 03:22:43 xltxlm Exp $

//注销掉他之前的全部验证cookie
setcookie('user_name', NULL, time() - 1, '/', $_SERVER['__DOMAIN__']);
setcookie('user_id', NULL, time() - 1, '/', $_SERVER['__DOMAIN__']);
setcookie('user_role', NULL, time() - 1, '/', $_SERVER['__DOMAIN__']);
setcookie('COOKIE_Authentication', NULL, time() - 1, '/', $_SERVER['__DOMAIN__']);
;