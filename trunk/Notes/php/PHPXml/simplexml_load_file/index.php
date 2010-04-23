<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>PHPXml</title>
</head>

<body>
<br />我们打算从上面的 XML 文件输出元素的名称和数据。

<br />这是需要做的事情：

<br />加载 XML 文件 
<br />取得第一个元素的名称 
<br />使用 children() 函数创建在每个子节点上触发的循环 
<br />输出每个子节点的元素名称和数据 

<?php
$xml = simplexml_load_file("test.xml");

echo $xml->getName() . "<br />";

foreach($xml->children() as $child)
  {
  echo $child->getName() . ": " . $child . "<br />";
  }
?>
</body>
</html>