/*
20101122
*/
(function(S){
   if (window[S] === undefined) window[S] = {};
	S = window[S];
	// Copies all the properties of s to r
	mix = function(r, s, ov, wl) {
		if (!s || !r) return r;
		if (ov === undefined) ov = true;
		var i, p, l;

		if (wl && (l = wl.length)) {
			for (i = 0; i < l; i++) {
				p = wl[i];
				if (p in s) {
					if (ov || !(p in r)) {
						r[p] = s[p];
					}
				}
			}
		} else {
			for (p in s) {
				if (ov || !(p in r)) {
					r[p] = s[p];
				}
			}
		}
		return r;
	};
	mix(S,{
			  domReady:function(fn){
				   var self=this;
				   if(!+'\v1'){
					  (function(){
						  try{
							  document.documentElement.doScroll('left');
						  } catch (error){
							  setTimeout(arguments.callee, 0);
							  return;
						  };
						  fn.call(window,self);
					  })();
/*					  try{
						  document.documentElement.doScroll('left');
					  } catch (error){
						  setTimeout(arguments.callee, 0);
						  return;
					  };
					  alert('')
					  fn.call(window,self);*/
					  
				   }else{
					   document.addEventListener('DOMContentLoaded', function(){fn.call(window,self)}, false);
				   }
			  },
			  $:function(id) {return "string" == typeof id ? document.getElementById(id) : id;},
			  Bind:function(object, fun) {
				var args = Array.prototype.slice.call(arguments).slice(2);
				return function() {
					return fun.apply(object, args);
				}
			   },
			  getECN:function(node, name, type) {
					  var r = [], re = new RegExp("(^|\\s)" + name + "(\\s|$)"), e = (node || document).getElementsByTagName(type || "*");
					  for ( var i = 0,len=e.length; i < len; i++ ) {
						  if(re.test(e[i].className) )
							  r.push(e[i]);
					  }
					  return r;
			  },
			  removeClass:function(elem,c){
				  if(!elem || !elem.className) return false;
				  if(elem.className.indexOf(c)!=-1) {elem.className=elem.className.replace(c,'');}
			  },
			  addClass:function(elem,c){
				  if(!elem) return false;
				  var elemClass = elem.className;
				  if (!elemClass) {
					  elem.className = c;
				  }else{
					if(elem.className.indexOf(c)==-1) elem.className+=' '+c;
				  }
			  },
			  cssValue:function(o,s){
				  var r;
				  function camelize(s) {
					  return s.replace(/-(\w)/g, function (strMatch, p1){
						  return p1.toUpperCase();
					  });
				  }
				  if(!+'\v1'){
					  if(s.indexOf('-')!=-1) s=camelize(s);
					  r=o.currentStyle[s]
				  }else{
					  r=document.defaultView.getComputedStyle(o, null).getPropertyValue(s);
				  }
				  return r
			  },
			  cleanWhitespace:function(oEelement)
				  {
				   for(var i=0;i<oEelement.childNodes.length;i++){
					var node=oEelement.childNodes[i];
					if(node.nodeType==3 && !/\S/.test(node.nodeValue)){node.parentNode.removeChild(node)}
					}
			  },
			  stopPropagation:function(evt){
				  var evt = evt || window.event;
				  if (evt.stopPropagation) {
					  evt.stopPropagation();
				  }
				  else {
					  evt.cancelBubble = true;
				  }
			  },
			  preventDefault:function(evt){
				  var evt = evt || window.event;
				  if (evt.preventDefault) {
					  evt.preventDefault();
				  }
				  else {
					  evt.returnValue = false;
				  }
			  },
			  getObjPos:function(obj){    
				  var x = y = 0;    
				  if (obj.getBoundingClientRect)    
				  {    
					  var box = obj.getBoundingClientRect();
					  if(box.left == 0 && box.top == 0)
					  {
						  return;
					  }
					  var D = document.documentElement;    
					  x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;    
					  y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop;         
				  }    
				  else   
				  {    
					  for(; obj != document.body; x += obj.offsetLeft, y += obj.offsetTop, obj = obj.offsetParent );    
				  }    
				  return {'x':x, 'y':y};    
			  },
			 on:function( node, type, listener ) {
				  if(!(node = S.$(node))) return false;
				  if (node.addEventListener) {
					  node.addEventListener( type, listener, false );
					  return true;
				  } else if(node.attachEvent) {
					  node['e'+type+listener] = listener;
					  node[type+listener] = function(){node['e'+type+listener]( window.event );}
					  node.attachEvent( 'on'+type, node[type+listener] );
					  return true;
				  }
				  return false;
			 },
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
			},
			Browser:{
				ie: /msie/.test(window.navigator.userAgent.toLowerCase()),
				isIE6:document.all && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6),
				moz: /gecko/.test(window.navigator.userAgent.toLowerCase()),
				opera: /opera/.test(window.navigator.userAgent.toLowerCase())
           }
		
	})
	
})('QIE');