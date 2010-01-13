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
// Created by Administrator 2009-7-25
// $Id: pinyin.php,v 1.1 2009/08/18 03:22:43 xltxlm Exp $
/**
 * 提供拼音服务的接口 file_get_contents仍过来分析
 *	Created on 2009-7-23 by Administrator
 *
 */
if(!$_GET['wd'])
	die;
$pinyin= include '_pingyin_gbk.php';
$str= preg_replace("/(|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\+|\=|\{|\}|\[|\]|\||\\|\:|\;|\"|\'|\<|\,|\>|\.|\?|\/)/is", null, $_GET['wd']);

$py= "";
$l= 0;
$last_si_gb= true;
$strlen= strlen($str);
for($i= 0; $i < $strlen; $i++)
{
	$k= $str[$i];
	if(ord($k) > 128)
	{
		$k= substr($str, $i, 2);
		if(isset($pinyin[$k]))
		{
			if(!$last_si_gb)
				$py .= " ";
			$py .= $pinyin[$k]." ";
		}
		$i++;
	}
	else
	{
		$py .= $k;
		$last_si_gb= false;
	}
	$last_si_gb= false;
}
$py=preg_replace("/[ ]{2,}/i"," ",$py);
print($py);
;