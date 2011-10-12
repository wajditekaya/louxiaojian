<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link href="http://10.1.3.17/PPSProject/inspect/trunk/inspect/css/inspect.css" rel="stylesheet" type="text/css"  />
<title>getimagesize</title>
</head>
<body>
<?php 
print_r(getimagesize('http://pic.yupoo.com/ucdcn_v/Br4qtQkC/metal.jpg'));
echo '<p><img src="http://pic.yupoo.com/ucdcn_v/Br4qtQkC/metal.jpg" /></p>';

print_r(getimagesize('http://ww1.sinaimg.cn/mw205/79656651tw1dlzmdhmkwuj.jpg'));
echo '<p><img src="http://ww1.sinaimg.cn/mw205/79656651tw1dlzmdhmkwuj.jpg" /></p>';

print_r(getimagesize('http://ww3.sinaimg.cn/mw205/81fc193agw1dlzmagiuhmj.jpg'));
echo '<p><img src="http://ww3.sinaimg.cn/mw205/81fc193agw1dlzmagiuhmj.jpg" /></p>';

print_r(getimagesize('http://ww1.sinaimg.cn/mw205/7179ed7cgw1dlzlrlxu7fj.jpg'));
echo '<p><img src="http://ww1.sinaimg.cn/mw205/7179ed7cgw1dlzlrlxu7fj.jpg" /></p>';
?>
</body>
</html>
