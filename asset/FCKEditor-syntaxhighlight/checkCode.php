<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
 <head>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
     <title>SyntaxHighlighter Build Test Page</title>
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
     </head>
 <body>
     <div id="content">
     <?
     echo stripslashes($_POST['textarea']); //去除转义符（因为 PHP 会自动转义）
     ?>
    </div>
</body>
</html>