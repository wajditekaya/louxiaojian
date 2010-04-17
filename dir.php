<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>dir</title>
<style type="text/css">

</style>
</head>

<body>
<div id="dir" style="display:none">
<ol>
<?php
 $dir=glob("html/*");
 foreach($dir as $color){?>
	<li><?=$color?></li>
 <? };
?>
</ol>
</div>
  <input type="button" id="button" onclick="opena()" value="打开所有页面" />
  <input type="button" id="button2" onclick="opena('safe')" value="打开安全中心页面" />
  <script type="text/javascript">
    var Apache=window.location.href.replace('dir.php',''),dir=document.getElementById('dir').getElementsByTagName('li');
    function opena(a){
      for(var i=0;i<dir.length;i++){
		if(dir[i].innerHTML.indexOf('module')!=-1) continue;
		if(a && dir[i].innerHTML.indexOf(a)!=-1){window.open(Apache+dir[i].innerHTML);}
		if(!a){window.open(Apache+dir[i].innerHTML);}
      }
    }
   document.getElementById('button').value='打开所有'+dir.length+'个页面';
  </script>
  

<div style="display:none">
<?  print_r(glob("html/*"));?>
</div>

</body>
</html>