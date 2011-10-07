/**
 * Created by louxiaojian.
 * User: Sean Lou
 * Date: 11-10-03
 * Time: 下午12:37
 * Mail: louxiaojian@gmail.com
 * To change this template use File | Settings | File Templates.
 */
 (function(S){
	
	        function createXHR(){
            if (typeof XMLHttpRequest != "undefined"){
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined"){
                if (typeof arguments.callee.activeXString != "string"){
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                                    "MSXML2.XMLHttp"];
            
                    for (var i=0,len=versions.length; i < len; i++){
                        try {
                            var xhr = new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            return xhr;
                        } catch (ex){
                            //skip
                        }
                    }
                }
            
                return new ActiveXObject(arguments.callee.activeXString);
            } else {
                throw new Error("No XHR object available.");
            }
        }

	function ajax(url,options){
		var set=options;
		var xmlhttp;
		try{
			xmlhttp= new ActiveXObject('Msxml2.XMLHTTP');
		}catch(e){
			try{
				xmlhttp= new ActiveXObject('Microsoft.XMLHTTP');
			}catch(e){
				try{
					xmlhttp= new XMLHttpRequest();
				}catch(e){}
			}
		}
		//XMLHttpRequest
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(window.location.href.indexOf("http")==-1 || xmlhttp.status==200){
				  options.loadFun(xmlhttp)
				}else{
				  options.defeateFun();
				}
			}
		}
		xmlhttp.open(options.method,url);
		xmlhttp.setRequestHeader("If-Modified-Since","0");//清除缓存
		xmlhttp.send(null);
	}
	S.ajax=ajax;
 })(QIE);