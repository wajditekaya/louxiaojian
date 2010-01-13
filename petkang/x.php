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
// Created by Administrator 2009-9-10
// $Id: x.php,v 1.2 2009/09/10 08:27:38 xltxlm Exp $

include "header.php";
include "db_locahost_mysql.php";
$stmt= mysql_query("select * from wenzhang_jigou ");
while ($row= mysql_fetch_assoc($stmt))
{
	if (strpos($row['j_content'], "<br") === false)
	{
		$j_content= mysql_real_escape_string(nl2br($row['j_content']));
		mysql_query("update wenzhang_jigou  set j_content ='{$j_content}' where j_id='{$row['j_id']}' ");
		echo "¸üÐÂ:{$row['j_name']}\n";
	}
};
echo "½áÊø";