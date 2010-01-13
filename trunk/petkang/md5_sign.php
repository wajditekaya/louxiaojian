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
// Created by Administrator 2009-6-15
// $Id: md5_sign.php,v 1.1 2009/08/18 03:22:43 xltxlm Exp $

/**
 * MD5签名验证,用于表单,安全验证
 * $max_delay表示,这个验证ID能存活的最大时间.默认是一个小时
 * @since version - 2009-6-14
 */
function md5_sign($md5 = false, $max_delay = 3600)
{
	//随即打乱后面的时间
	$time = 130456712;
	$_SERVER['md5_sign'] = base64_encode(md5($_SERVER['REMOTE_ADDR'] . "EXPO.PPS@TV") . (time() + $time));
	//生成验证码,不需要任何参数
	if (!$md5)
		return $_SERVER['md5_sign'];
	//有参数了,表示提交之后,时间差距的验证,不能超过 $max_delay秒
	if ($md5)
		if ((time() - substr(base64_decode($md5), 32) + $time) > $max_delay)
			return false;
		else
			return substr($_SERVER['md5_sign'], 0, 32) == substr($md5, 0, 32);
}

/**
 * cookie验证数据
 * @since version - 2009-6-30
 */
function md5_cookie($Authentication = false, $max_delay = 3600)
{
	if (!$_COOKIE['user_name'])
		return NULL;
	//随即打乱后面的时间
	$time = 130456762;
	//验证的条件有,帐户,密码,IP,时间
	$md5_cookie = base64_encode(md5($_SERVER['REMOTE_ADDR'] . $_COOKIE['user_name'] . "EXPO.PPS@TV") . (time() + $time));
	//验证帐户是否已经登陆了,但是登陆时间有限制的 
	if ($Authentication)
	{
		$time_Distance = (time() - substr(base64_decode($_COOKIE['COOKIE_Authentication']), 32) + $time);
		return ($time_Distance >= 0 && $time_Distance < $max_delay) && substr($_COOKIE['COOKIE_Authentication'], 0, 32) == substr($md5_cookie, 0, 32);
	}
	if ($_COOKIE['user_name'])
		return $md5_cookie;
};