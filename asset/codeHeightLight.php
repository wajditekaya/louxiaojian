<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
     <title>SyntaxHighlighter Build Test Page</title>
  <!--jQuery + UI-->
     <script type="text/javascript" src="jQuery/jquery-1.4.2.min.js"></script>
     <script type="text/javascript" src="jQuery/mess_load_help_min.js"></script>
     <link type="text/css" rel="stylesheet" href="jQuerycssbase/common.css"/>
    <link type="text/css" rel="stylesheet" href="jQuerycssbase/jquery.ui.all.css"/>
 <!---FCKeditor-->
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
/*     $(function(){
15         //加载编辑器
16          var oFCKeditor = new FCKeditor('textarea', 700, 350, 'Basic');
17         oFCKeditor.ReplaceTextarea();
18         //进行处理
19          $dialogdiv = $("#dialogdiv");
20         $myform = $("#myform");
21         $dialogdiv.dialog({
22             title: "代码高亮生成器",
23             height: 467,
24             width: 740,
25             autoOpen: true,
26             resizable: false,
27             modal: true,
28             buttons: {
29                 '生成高亮代码': function(){
30                     $myform.submit();
31                     $(this).dialog('close');
32                 },
33                 '关闭窗口': function(){
34                     window.self.close();
35                     //关闭浏览器窗口
36                 }
37             }
38         });
39     });*/
     </script>
     <input type="submit" value="提交">
     <!--<textarea id="textarea" name="textarea"></textarea>-->
     
     </form>
    </div>

 </body>
 </html>