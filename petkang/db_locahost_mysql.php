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
// Created by Administrator 2009-6-24
// $Id: db_locahost_mysql.php,v 1.1 2009/08/18 03:22:43 xltxlm Exp $
$dbh = mysql_connect("localhost", "root", "123456") or die('数据库暂时无法连接，请您稍后再试！');
mysql_query("SET NAMES 'gbk'");
mysql_select_db("petkang");
return $dbh;