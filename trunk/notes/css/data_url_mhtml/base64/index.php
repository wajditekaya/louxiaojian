<?php  

if($_GET['act']=='base64'){
	//fileupload
	$filetype=$_FILES ["file"] ["type"];
	$filesize=$_FILES ["file"] ["size"];
	$filename=$_FILES ["file"] ["name"];

	if ((($filetype == "image/gif") || ($filetype == "image/jpeg") || ($filetype == "image/jpg") || ($filetype == "image/png") || ($filetype == "image/pjpeg")) && ($filesize < 2000000)) {   
		if ($_FILES ["file"] ["error"] > 0) {   
			echo "Return Code: " . $_FILES ["file"] ["error"] . "<br />";   
		} else {   
			//echo "Upload: " . $_FILES ["file"] ["name"] . "<br />";   
			//echo "Type: " . $_FILES ["file"] ["type"] . "<br />";   
			//echo "Size: " . ($_FILES ["file"] ["size"] / 1024) . " Kb<br />";   
			//echo "Temp file: " . $_FILES ["file"] ["tmp_name"] . "<br />";  

			date_default_timezone_set(PRC);
			$showtime=date("Ymd_His");
			$fileExtensionPos=strrpos($filename,".");
            $fileExtension=substr($filename,$fileExtensionPos+1);
			$basename = $showtime.'.'.$fileExtension;
			move_uploaded_file ( $_FILES ["file"] ["tmp_name"], "upload/" .$basename );   
			//echo "Stored in: " . "upload/" . $_FILES ["file"] ["name"];  
			

		}   
	} else {   
		echo "Invalid file";   
	}
	//$imgbase64Url="upload/" . $_FILES ["file"] ["name"];
	$imgbase64Url="upload/" . $basename;
}
//fileupload


//base64
$imgbase64=base64_encode(file_get_contents("$imgbase64Url"));
//base64

?>

<!doctype html>
<html>
<head>
    <meta charset="gbk"/>
    <title>base64</title>
</head>
<body>

<div style="margin-bottom:20px">
	<form action="index.php?act=base64" method="post" enctype="multipart/form-data">   
		<input type="file" name="file" id="file" />    
		<br />  
		<input type="submit" name="submit" value="×ª»»Îªbase64" />  
	</form> 
</div>
<?php if($imgbase64){?>
<textarea name="" rows="" cols="" style="width:100%;height:200px"><?=$imgbase64;?></textarea>
<p>Í¼Æ¬Â·¾¶£º<?=$imgbase64Url;?></p>
<p><img src="data:image/gif;base64,<?=$imgbase64;?>" /></p>

<p style="height:500px;background:url(data:image/gif;base64,<?=$imgbase64;?>) no-repeat"><img src="data:image/gif;base64,<?=$imgbase64;?>" /></p>
<?php }?>

</body>
</html>

