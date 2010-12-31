<?php
header("Content-type:text/css");
//header("Content-type:application/x-javascript");
?>
@charset "gb2312";
*{margin:0;padding:0}
body{font:14px/2 "宋体";}

#page{width:800px;margin:0 auto;background:#<?=$_GET['background'];?>}

#content{padding:20px}

a{color:#<?=$_GET['link'];?>}