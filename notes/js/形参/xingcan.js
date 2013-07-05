;(function(S){
	 if (window[S] === undefined) window[S] = {};
		  S = window[S];
		 // --- 设置cookie
/*		 S.setCookie=function(name,value,days){
			if (days) {
			  var date = new Date();
			  date.setTime(date.getTime()+(days*24*60*60*1000));
			  var expires = "; expires="+date.toGMTString();
			}
			else expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		 };*/
		//--- 获取cookie
/*		S.getCookie=function(name) {
		  var nameEQ = name + "=";
		  var ca = document.cookie.split(';');
		  for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		  }
		  return null;
		}*/
		
/*	 S={
		 setCookie:function(name,value,days){
			if (days) {
			  var date = new Date();
			  date.setTime(date.getTime()+(days*24*60*60*1000));
			  var expires = "; expires="+date.toGMTString();
			}
			else expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		 },
		getCookie:function(name) {
		  var nameEQ = name + "=";
		  var ca = document.cookie.split(';');
		  for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		  }
		  return null;
		}
	 };这样添加方法竟然不行*/
	 
})('QIE');