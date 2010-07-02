<?php
  function generateCSS($http,$css_name)
  {
	  $fp=fopen($css_name,'w');
	  if($fp)
	  {
		  $css=file_get_contents($http);
		  if($css)
			  fwrite($fp,$css);
		  else
			  echo '读取不到网页内容';
		  fclose($fp);
	  }else
	  {
		  echo '要写入的文件路径不可写';
	  }
  };
  generateCSS('http://10.11.2.49/PPSProject/PPS/Tags/v9.5/html/pps.php?list=movie&&v=123','css2.css');
?>