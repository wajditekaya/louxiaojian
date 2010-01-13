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
// Created by Administrator 2009-9-8
// $Id: image_server.php,v 1.36 2009/11/23 07:42:48 xltxlm Exp $
include "header.php";
$image_server= new image_server();
$image_server-> $_GET['act']();
class image_server
{
	//广告显示框架
	function show_frame()
	{
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select * from  home_image ");
		$this->all_data= array();
		while($row= mysql_fetch_assoc($stmt))
			$this->all_data[]= $row;
		include "petkang/guanggao.html";
	}
	//显示上传的界面
	function upload()
	{
		include "image_server/upload.html";
	}
	//执行上传动作
	function upload_do()
	{
		if($_FILES['imgFile']['tmp_name'])
		{
			$new_name= md5($_FILES['imgFile']['tmp_name'].rand(time())).".jpg";
			move_uploaded_file($_FILES['imgFile']['tmp_name'], "image_server_dir/{$new_name}");
			$file_url= "/image_server_dir/".$new_name;

			//插入图片，关闭层
			echo '<html>';
			echo '<head>';
			echo '<title>Insert Image</title>';
			echo '<meta http-equiv="content-type" content="text/html; charset=utf-8">';
			echo '</head>';
			echo '<body>';
			echo '<script type="text/javascript">parent.KE.plugin["image"].insert("'.$_POST['id'].'", "'.$file_url.'","'.$_POST['imgTitle'].'","'.$_POST['imgWidth'].'","'.$_POST['imgHeight'].'","'.$_POST['imgBorder'].'");</script>';
			echo '</body>';
			echo '</html>';
		}
	}

	//首页的几张图片轮换(上传管理)
	function home_image()
	{
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select * from home_image  ");
		$this->all_data= array();
		while($row= mysql_fetch_assoc($stmt))
			$this->all_data[]= $row;
		include "image_server/home_image.html";
	}
	//执行上传动作
	function home_image_do()
	{
		$file_name= md5($_FILES['file']['tmp_name'].time()).".jpg";
		if($_FILES['file']['tmp_name'])
		{
			move_uploaded_file($_FILES['file']['tmp_name'], "image_server_dir/{$file_name}");
			include "db_locahost_mysql.php";
			mysql_query("insert into  home_image  ".
			"(image_src,add_time,url) values ".
			"('/image_server_dir/{$file_name}',now(),'{$_POST['url']}') ");
		}
		header("location:{$_SERVER['HTTP_REFERER']}");
	}
	//执行删除动作
	function home_image_delete_do()
	{
		include "db_locahost_mysql.php";
		$row= mysql_fetch_assoc(mysql_query("select * from  home_image where  id='{$_GET['id']}' "));
		mysql_query("delete from  home_image where id='{$_GET['id']}'");
		unlink($row['image_src']);
		header("location:{$_SERVER['HTTP_REFERER']}");
	}
};