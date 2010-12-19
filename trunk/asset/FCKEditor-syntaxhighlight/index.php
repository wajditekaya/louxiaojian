<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
     <title>SyntaxHighlighter Build Test Page</title>
     <script type="text/javascript" src="fckeditor/fckeditor.js"></script>

     </head>
 
 <body>
     <div id="dialogdiv">
     <form id="myform" action="checkCode.php" method="POST">
      <script>
        //var oFCKeditor = new FCKeditor('textarea', 700, 350, 'Basic');
            var oFCKeditor = new FCKeditor('textarea');//传入参数为表单元素（由FCKeditor生成的input或textarea）的name
            oFCKeditor.BasePath='fckeditor/';//指定FCKeditor根路径，也就是fckeditor.js所在的路径
            oFCKeditor.Height='500px';
           // oFCKeditor.ToolbarSet='Demo';//指定工具栏
            oFCKeditor.Value="默认值默认值默认值";//默认值
            oFCKeditor.Create();
     </script>
     <input type="submit" value="提交">
     </form>
    </div>

 </body>
 </html>