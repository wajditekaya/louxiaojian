<?php
if($_POST['background']){
    $background=$_POST['background'];
}else{
	$background=$_GET['background'];
};

if($_POST['link']){
    $link=$_POST['link'];
}else{
	$link=$_GET['link'];
};

if($_POST['alert']){
    $alert=$_POST['alert'];
}else{
	$alert=$_GET['alert'];
};

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link href="skincss.php?background=<?=$background;?>&link=<?=$link;?>" type="text/css" rel="stylesheet" />
<title>PHP定义文件类型</title>
</head>

<body>
<div id="page">
  <div id="content">
    <a href="index.php?background=f00000&alert=louxiaojian&link=fff">
    背景颜色为：#<?=$background;?><br />
    弹出文字为:<?=$alert;?><br />
    链接颜色为:<?=$link;?>
    <br />test.php?background=f00000&alert=louxiaojian&link=fff
    </a>
    <div id="lxj"></div>
    <form method="post" action="index.php">
     背景颜色为:<input value="<?=$background;?>" name="background" id="background" onfocus="picker(this,this.id)" />
     <br />链接颜色为:<input value="<?=$link;?>" name="link" id="link" onfocus="picker(this,this.id)"  />
     <br />弹出文字为:<input value="<?=$alert;?>" name="alert" id="alert" value="louxiaojian"/>
     <br /><input type="submit" value="提交" />
    </form>
  </div>
</div>
<div id="picker_container" style="position:absolute;height:264px;width:251px;display:none">
<!--    <object height="264" width="251" type="application/x-shockwave-flash" data="ColorPicker.swf" id="color_picker">
      <param name="quality" value="high">
      <param name="movie" value="ColorPicker.swf" />
      <param name="allowScriptAccess" value="always">
      <param name="wmode" value="Opaque">
      <param name="allowFullscreen" value="true">
      <param name="flashvars" value="callback=pickerback&amp;color=rgb(255, 0, 0)&amp;who=background">
    </object>-->
</div>
<script type="text/javascript">
(function(){
	var color=[],picker_container=document.getElementById('picker_container');
	function pickerback(_e, _who){
		color[_who]=_e;
		document.getElementById(_who).value=color[_who];
		picker_container.style.display='none';
	};
	function picker(o,s){
		picker_container.style.top=o.offsetTop+'px';
		picker_container.style.left=o.offsetLeft+o.offsetWidth+'px';
		picker_container.style.display='block';
		picker_container.innerHTML='<object height="264" width="251" type="application/x-shockwave-flash" data="ColorPicker.swf" id="color_picker" style="visibility: visible;"><param name="quality" value="high"><param name="movie" value="ColorPicker.swf" /><param name="allowScriptAccess" value="always"><param name="wmode" value="Opaque"><param name="allowFullscreen" value="true"><param name="flashvars" value="callback=pickerback&amp;color=rgb(255, 0, 0)&amp;who='+s+'"></object>'
	};
	window['picker']=picker;
	window['pickerback']=pickerback;
})();
</script>
</body>
<?php $lxj='asdsadsadsad'; ?>
<script src="js.php?alert=<?=$alert;?>" type="text/javascript"></script>
</html>
