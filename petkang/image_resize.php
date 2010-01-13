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
// Created by Administrator 2009-7-26
// $Id: image_resize.php,v 1.1 2009/08/18 03:22:43 xltxlm Exp $

/**
 * 对一张图片压缩到指定的宽度大小
 *	Created on 2009-7-26 by Administrator
 *
 */
ini_set("display_errors",0);
include "code/_cookie_auth.php";
$width= (int) $_GET['width'];
$height_d= (int) $_GET['height'];
if(!$_GET['src'] || !$width)
	die;
if(!$_GET['dec'])
	$_GET['dec']= $_GET['src'];
//判断文件的类型
$type= array_pop(explode(".", strtolower($_GET['src'])));
//只处理的图片类型
if(!in_array($type, explode("|", "jpg|gif|png")))
	die;

//判断是不是图片
if(!getimagesize($_GET['src']))
	die;
//开始进行处理
if($type == 'jpg')
	$id= imagecreatefromjpeg($_GET['src']);
if($type == 'gif')
	$id= imagecreatefromgif($_GET['src']);
if($type == 'png')
	$id= imagecreatefrompng($_GET['src']);
if(!is_resource($id))
	die;
$x= imagesx($id);
$y= imagesy($id);

//根据百分比来进行图片大小调整
$height= $y * $width / $x;
//预备一块新的图片来进行重新调整大小
$newimg= imagecreatetruecolor($width, $height);
if(!is_resource($newimg))
	die;
//背景填充成白色
$background_color= imagecolorallocate($newimg, 255, 255, 255);
imagefilledrectangle($newimg, 0, 0, $width, $height, $background_color);
//截取原来图片，并且开始调整大小
imagecopyresampled($newimg, $id, 0, 0, 0, 0, $width, $height, $x, $y);
imagedestroy($id);
//输出文件

//还需要强行压缩下比例高度
if($height_d && $height_d < $height)
{
	$newimg2= imagecreatetruecolor($width, $height_d);
	//背景填充成白色
	$background_color= imagecolorallocate($newimg2, 255, 255, 255);
	imagefilledrectangle($newimg2, 0, 0, $width, $height_d, $background_color);
	//截取原来图片，并且开始调整大小
	imagecopyresampled($newimg2, $newimg, 0, 0, 0,($height - $height_d) / 2, $width, $height, $width, $height);
	imagedestroy($newimg);
	$bool= imagejpeg($newimg2, $_GET['dec']);
}
else
	$bool= imagejpeg($newimg, $_GET['dec']);
if($bool)
	echo "OK";
;