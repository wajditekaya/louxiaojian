<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
     <title>SyntaxHighlighter Build Test Page</title>
     <script type="text/javascript" src="fckeditor/fckeditor.js"></script>
     <!--SyntaxHighlighter-->
     <script type="text/javascript" src="syntaxhighlighter/scripts/shCore.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushBash.js"></script>
    <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushCpp.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushCSharp.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushCss.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushDelphi.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushDiff.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushGroovy.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushJava.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushJScript.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushPhp.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushPlain.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushPython.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushRuby.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushScala.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushSql.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushVb.js"></script>
     <script type="text/javascript" src="syntaxhighlighter/scripts/shBrushXml.js"></script>
     <link type="text/css" rel="stylesheet" href="syntaxhighlighter/styles/shCore.css"/>
     <link type="text/css" rel="stylesheet" href="syntaxhighlighter/styles/shThemeDefault.css"/>
     <script type="text/javascript">
        SyntaxHighlighter.config.clipboardSwf = 'syntaxhighlighter/scripts/clipboard.swf';
        SyntaxHighlighter.all();
     </script>
     <style>
	  /*======================================
	  author:	lou xiao jian<jxsr_lxj@163.com>
	  ======================================*/
	  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{margin:0;padding:0;-webkit-text-size-adjust:none}
	  body{font:12px/22px Tahoma,"\5B8B\4F53";word-break:break-all;text-align:center;color:#383838}
	  #page{padding-bottom:15px}
	  fieldset,img{border:none 0;} 
	  table {border-collapse:collapse;border-spacing:0;} 
	  ol,li,ul{list-style:none;} 
	  address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:normal;}
	  caption,th{text-align:left;} 
	  h1,h2,h3,h4,h5,h6{font-size:100%;} 
	  q:before,q:after{content:'';}
	  abbr,acronym{border:0;font-variant:normal;}
	  sup{vertical-align:text-top;}
	  sub{vertical-align:text-bottom;}
	  input,select,textarea{font:normal normal 12px "Verdana";outline:none;/*去除Opera浏览器这些标签的默认样式*/}
	  textarea,input[type|="text"],input[type|="password"]{-webkit-appearance:none/*去除webkit浏览器这些标签的默认样式*/}
	  input,textarea,select{*font-size:100%;}
	  /* 字体属性 [定义规则，小写f加属性名称] */
	  .fB{font-weight:bold;}
	  .fI{font-style:italic;}
	  /* 字体大小*/
	  .fs12{font-size:12px;}
	  .fs14{font-size:14px;}
	  .mr10{margin-right:10px}
	  .ml10{margin-left:10px}
	  /* 浮动*/
	  .fl{float:left;}
	  .fr{float:right}
	  /* 其它属性*/
	  .hide{display:none}
	  /*lrBx*/
	  .lrBx,.lrBx .rbx{overflow:hidden;zoom:1}
	  .lrBx .lbx{float:left;_margin-right:-3px}
	  .lrBx .lbx img{vertical-align:top}
	  /*.lrBx .rbx{padding-left:10px}*/
	  /*==clear==*/
	  .clear{overflow:hidden;zoom:1}
	  .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden;}
	  * html>body .clearfix {display: inline-block;width:100%;}
	  * html .clearfix{/* Hides from IE-mac \*/height: 1%;/* End hide from IE-mac */}
	  /* ie7 hack*/
	  *+html .clearfix {min-height:1%;}
	  .stress{color:#f00}
	  .ignore{color:#909090}
	  
	  #content{width:950px; margin:0 auto; text-align:left;font-size:14px}
	 </style>
     </head>
 
<body>
<div id="content">
    <pre class="brush: jscript;" title="code">
    FCKConfig.ToolbarSets[&quot;SyntaxDemo&quot;] = [
        ['Source', '-', 'Cut', 'Copy', 'PasteText', 'SelectAll', 'SyntaxHighLight', 'About']
    ];
    
    FCKConfig.ToolbarSets[&quot;Syntax2Demo&quot;] = [
        ['Source', '-', 'Cut', 'Copy', 'PasteText', 'SelectAll', 'SyntaxHighLight2', 'About']
    ];
    </pre>
    将上面的代码加到fckeditor/fckconfig.js文件中FCKConfig.ToolbarSets["Basic"]的后面，增加ToolbarSet类型。
     <div id="dialogdiv">
     <form id="myform" action="checkCode.php" method="post">
      <script>
            var oFCKeditor = new FCKeditor('textarea');//传入参数为表单元素（由FCKeditor生成的input或textarea）的name
            oFCKeditor.BasePath='fckeditor/';//指定FCKeditor根路径，也就是fckeditor.js所在的路径
            oFCKeditor.Height='500px';
            oFCKeditor.ToolbarSet='Syntax2Demo';//‘Default’指定工具栏
            oFCKeditor.Value="";//默认值
            oFCKeditor.Create();
     </script>
     <input type="submit" value="提交" style="width:55px; height:30px">
     </form>
    </div>

</div>
</body>
</html>