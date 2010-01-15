<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>PHPXml</title>
</head>

<body>
提示和注释
提示：要创建 XML 解析器，请使用 xml_parser_create() 函数。
<?php
//无效的 xml 文件
$xmlfile = 'test.xml';

$xmlparser = xml_parser_create();

// 打开文件并读取数据
$fp = fopen($xmlfile, 'r');
while ($xmldata = fread($fp, 4096)) 
  {
  // parse the data chunk
  if (!xml_parse($xmlparser,$xmldata,feof($fp))) 
    {
    die( print "ERROR: "
    . xml_get_error_code($xmlparser)
    . "<br />"
    . "Line: "
    . xml_get_current_line_number($xmlparser)
    . "<br />"
    . "Column: "
    . xml_get_current_column_number($xmlparser)
    . "<br />");
    }
  }

xml_parser_free($xmlparser);
?>
</body>
</html>