<?php

if($_GET['act']=='base64'){
    $uploadFiles = array();
    function singleFile($filename,$tmp_name,$filetype,$filesize,$error){
        if ((($filetype == "image/gif") || ($filetype == "image/jpeg") || ($filetype == "image/jpg") || ($filetype == "image/png") || ($filetype == "image/pjpeg")) && ($filesize < 2000000)) {
            if ($error > 0) {
                echo "Return Code: " .$error. "<br />";
            } else {
                //echo "Upload: " . $_FILES ["file"] ["name"] . "<br />";
                //echo "Type: " . $_FILES ["file"] ["type"] . "<br />";
                //echo "Size: " . ($_FILES ["file"] ["size"] / 1024) . " Kb<br />";
                //echo "Temp file: " . $_FILES ["file"] ["tmp_name"] . "<br />";
                //date_default_timezone_set(PRC);
                $showtime=date("Ymd_His").'_'.md5(uniqid());
                $fileExtensionPos=strrpos($filename,".");
                $fileExtension=substr($filename,$fileExtensionPos+1);
                $basename = $showtime.'.'.$fileExtension;
                move_uploaded_file ($tmp_name, "upload/" .$basename );
                //echo "Stored in: " . "upload/" . $_FILES ["file"] ["name"];
            }
        } else {
            echo "Invalid file";
        }
        //$imgbase64Url="upload/" . $_FILES ["file"] ["name"];
        $imgbase64Url="upload/" . $basename;

        //fileupload
        //echo '<pre>'.print_r($_FILES ["file"]).'</pre>';

        //base64
        $imgbase64='data:'.$filetype.';base64,'.base64_encode(file_get_contents("$imgbase64Url"));

        return array(
            'base64'=>$imgbase64,
            'newfilename'=>$imgbase64Url,
            'filename'=>$filename
        );
    };

    //echo '<pre>'.print_r($_FILES).'</pre>';

    foreach($_FILES['file'] as $key=>$fileSingle){
        if($key==="name"){
            foreach($fileSingle as $nub=>$single){
                $uploadFiles[] = singleFile($_FILES['file']['name'][$nub],$_FILES['file']['tmp_name'][$nub],$_FILES['file']['type'][$nub],$_FILES['file']['size'][$nub],$_FILES['file']['error'][$nub]);
            }
        };
    };

}

?>

<!doctype html>
<html>
<head>
    <meta charset="gbk"/>
    <title>base64</title>
</head>
<body>

<div id="page" style="margin-bottom:20px">
    <form action="index.php?act=base64" method="post" enctype="multipart/form-data">
        <input type="file" name="file[]" multiple="true" id="file" />
        <input type="submit" name="submit" value="转换为base64" />
    </form>
</div>
<div id="files-list">

</div>
<script>
    var browe,version;
    if(browe = navigator.userAgent.match(/msie\s*(\d+?\.*\d+?)\s*;/i)){
        version = browe[1];
        version = parseFloat(version);
        document.getElementById('page').innerHTML="<p style='text-align:center;padding:20px;font-size:20px'>请用高级浏览器</p>";
    }
    function funGetFiles(e) {
        // 获取文件列表对象
        var files = e.target.files || e.dataTransfer.files;
        console.log(files);
        if(files.length > 0){
            document.getElementById('files-list').innerHTML='';
            for(var i=0,ien=files.length;i<ien;i++){
                var p = document.createElement('p');
                p.innerHTML = '文件名：'+files[i].name + '&nbsp;&nbsp;&nbsp;&nbsp;大小：'+files[i].size/1000 +'kb';
                document.getElementById('files-list').appendChild(p)
            }
        }
        //继续添加文件
        //this.fileFilter = this.fileFilter.concat(this.filter(files));
        //this.funDealFiles();
        return this;
    };
    document.getElementById('file').onchange=function(e){
        funGetFiles(e);
    }
</script>

<?php if($uploadFiles && $_GET['act']){?>

    <?php foreach($uploadFiles as $nub=>$uploadFilesItem){ ?>
        <div class="fileItem" style="position:relative;overflow:hidden;*zoom:1">
            <div style="float:left;padding-right:10px">
                <?=$nub+1;?>
                <p style="background:url(<?=$uploadFilesItem['base64'];?>) no-repeat"><img src="<?=$uploadFilesItem['base64'];?>" /></p>
                <?=$uploadFilesItem['filename'];?>
            </div>
            <div style="width:500px;float:left">
                <textarea name="" rows="" cols="" style="width:100%;height:200px;border:0"><?=$uploadFilesItem['base64'];?></textarea>
            </div>
        </div>
    <?php }?>

<?php }?>

</body>
</html>

