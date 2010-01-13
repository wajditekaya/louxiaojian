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
// Created by Administrator 2009-6-30
// $Id: load_thread_wanging.php,v 1.1 2009/08/18 03:22:43 xltxlm Exp $
//本机地址不予验证
if (!$_SERVER['REMOTE_ADDR'] || $_SERVER['REMOTE_ADDR'] == '127.0.0.1' || strpos($_SERVER['REMOTE_ADDR'], '192.') !== false || strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'bot') !== false || strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'spider') !== false)
	return NULL;
//
preg_match("#load average:([ |0-9|\.]+),#is", file_get_contents("uptime.txt"), $out);
if (($out[1] > 6 || file_get_contents("aux.txt") > 300) && strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'bot') !== false && strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'spider') !== false)
	die(date("Y-m-d H:i:s") . "Too many connections.[当前连接数目过多,请稍后]");
;