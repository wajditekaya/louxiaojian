<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>上传文件</title>
</head>

<body>
<?php   
if ((($_FILES ["file"] ["type"] == "image/gif") || ($_FILES ["file"] ["type"] == "image/jpeg") || ($_FILES ["file"] ["type"] == "image/pjpeg")) && ($_FILES ["file"] ["size"] < 200000)) {   
    if ($_FILES ["file"] ["error"] > 0) {   
        echo "Return Code: " . $_FILES ["file"] ["error"] . "<br />";   
    } else {   
        echo "Upload: " . $_FILES ["file"] ["name"] . "<br />";   
        echo "Type: " . $_FILES ["file"] ["type"] . "<br />";   
        echo "Size: " . ($_FILES ["file"] ["size"] / 1024) . " Kb<br />";   
        echo "Temp file: " . $_FILES ["file"] ["tmp_name"] . "<br />";   
           
        if (file_exists ( "upload/" . $_FILES ["file"] ["name"] )) {   
            echo $_FILES ["file"] ["name"] . " already exists. ";   
        } else {   
            move_uploaded_file ( $_FILES ["file"] ["tmp_name"], "upload/" . $_FILES ["file"] ["name"] );   
            echo "Stored in: " . "upload/" . $_FILES ["file"] ["name"];   
        }   
    }   
} else {   
    echo "Invalid file";   
}   
?>  
</body>
</html>