var ZBrowser=ZBrowser || {};
function G($) {
    return typeof $ == "string" ? document.getElementById($) : $;
};
function C($) {
    return document.createElement($)
};
function Ci(_, A) {
    var $ = C("input");
    $.name = _;
    $.value = A;
    $.type = "hidden";
    return $
};
function trim($) {
    $ = $.replace(/(^\u3000+)|(\u3000+$)/g, "");
    $ = $.replace(/(^ +)|( +$)/g, "");
    return $
};
function addEvent( node, type, listener ) {
	if(!(node = G(node))) return false;
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
};
function removeEvent(node, type, listener ) {
    if(!(node = G(node))) return false;
    if (node.removeEventListener) {
        node.removeEventListener( type, listener, false );
        return true;
    } else if (node.detachEvent) {
        node.detachEvent( 'on'+type, node[type+listener] );
        node[type+listener] = null;
        return true;
    }
    return false;
};
function stopPropagation(evt){
    evt = evt || window.event;
    if(evt.stopPropagation) {
        evt.stopPropagation();
    } else {
        evt.cancelBubble = true;
    }
}
function preventDefault(evt){
	  var evt=evt || window.event;
	  if (evt.preventDefault) {
		  evt.preventDefault();
	  }
	  else {
		  evt.returnValue = false;
	  }
}
ZBrowser.mouseup={/*name:function(){},name2:function(){},name3:function(){}*/};//定义document.onmouseup要执行的函数集

ZBrowser.trim=function(str,undef){
   var EMPTY = '',
	_trim = String.prototype.trim,
	RE_TRIM = /^\s+|\s+$/g,
	strtrim=_trim ?  ((str == undef) ? EMPTY : _trim.call(str)) : ((str == undef) ? EMPTY : str.toString().replace(RE_TRIM, EMPTY));
	return strtrim;
};
ZBrowser.animate=function(elem,props,d,easing,callback){
		   /*
		    c:滚动的距离
			d:滚动的时间
			b:滚动时的初始距离
		   */
		   var Tween=easing || function(t,b,c,d){
			  if ((t/=d/2) < 1) return c/2*t*t + b;
			  return -c/2 * ((--t)*(t-2) - 1) + b;
		   },t=0,pos=props.toString().split(':'),c=parseInt(pos[1]) || 0,b=parseInt(elem.style[pos[0]]);
		   
		   if(elem.time) clearTimeout(elem.time);
		   new function(){
			 elem.style[pos[0]] =Math.ceil(Tween(t,b,c,d))+'px';
			 if(t==d){callback &&Object.prototype.toString.call(callback)=='[object Function]' && callback()}
			 if(t<d){t++;elem.time=setTimeout(arguments.callee,10)}  
		   };
};
ZBrowser.cleanWhitespace=function(oEelement){
	 for(var i=0;i<oEelement.childNodes.length;i++){
	  var node=oEelement.childNodes[i];
	  if(node.nodeType==3 && !/\S/.test(node.nodeValue)){node.parentNode.removeChild(node)}
	  }
};
ZBrowser.getObjPos=function(obj){
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
}

ZBrowser.newListTab=function(S,addLast){
	  if(!G('nTab')) return false;
	  if(G('nTab').getElementsByTagName('li').length==0) return false;
	  
	  var ul=G('nTab'),li=ul.getElementsByTagName('li'),
	      previousBut=G('news-previous'),
		  nextBut=G('news-next'),
		  ullength=0,
		  time,
		  previous,
		  previousTime,
		  next,
		  nextTime,
		  par_lt,/*nTab父层左上角的x坐标*/
		  par_w,/*nTab父层的宽度*/
		  par_rt,/*nTab父层右上角的x坐标*/
		  newadd;/*新添加进来的关键词参数*/
		  
	  for(var i=0,len=li.length;i<len;i++){
		  li[i].n=i;
		  ullength+=li[i].offsetWidth;
	  }
	  newadd=li[li.length-1];
	  ul.style.width=ullength+'px';
	  if(ullength>ul.parentNode.offsetWidth){ul.parentNode.parentNode.className+=' nlist-hd2'}
	  
	  if(!ul.style.left){ul.style.left=0}
      S.cleanWhitespace(ul);
	  par_lt=S.getObjPos(ul.parentNode).x;/*nTab父层左上角的x坐标*/
	  par_w=ul.parentNode.offsetWidth;/*nTab父层的宽度*/
	  par_rt=par_lt+par_w;/*nTab父层右上角的x坐标*/

	  /*===获取上一个滚动对象和下一个滚动对象===*/
	  function getNP(a){
		  var o;
		  for(var j=0,jen=li.length;j<jen;j++){
			       
				   var oli=li[j],
				   li_x=S.getObjPos(oli).x;
				   
				   if(a=='next' && (li_x+oli.offsetWidth-par_rt)>0){
					   o=oli;
					   break;
				   }
				   
				   if(a=='previous' && (li_x-par_lt)<0){
					   o=oli;
				   };

		  };
		  return o;
	 };
	  /*===获取上一个滚动对象和下一个滚动对象===*/

	  addEvent(previousBut,'click',function(){	
			previous=getNP('previous');
			if(previousTime) clearInterval(previousTime);
			if(nextTime) clearInterval(nextTime);
			previousTime=setInterval(function(){
					if(previous){
						var previous_x=S.getObjPos(previous).x;
						if((previous_x-par_lt)<=0){
							var c=par_lt-(previous_x)
					   };
					   c && S.animate(ul,'left:'+c,20,'',function(){
								if(!previous.previousSibling) clearInterval(previousTime);
								previous=previous.previousSibling
					   });
					}
			
		   },1000);
			
	  });
	  
	  addEvent(previousBut,'mouseout',function(){
			if(previousTime) clearInterval(previousTime);
	  });
	  
	  addEvent(nextBut,'click',function(){					
            next=getNP('next');
			if(previousTime) clearInterval(previousTime);
			if(nextTime) clearInterval(nextTime);
			nextTime=setInterval(function(){
				   if(next){				
					 var next_x=S.getObjPos(next).x,c;
					 if((c=(next_x+next.offsetWidth-par_rt))>=0){
						 c=-c;
					 }
					 c && S.animate(ul,'left:'+c,20,'',function(){
							if(!next.nextSibling){clearInterval(nextTime);}
							next=next.nextSibling;
					 });
					 
				   }
		   },1000)
			  
	  });
	  
	  addEvent(nextBut,'mouseout',function(){
			if(nextTime) clearInterval(nextTime); 
	  });
		  
	 /*===滚动到新添加的关键词位置===*/
	 if(addLast){
		 
		 if((S.getObjPos(newadd).x+newadd.offsetWidth-par_rt)>0){
			 nc=par_rt-S.getObjPos(newadd).x-newadd.offsetWidth
		     S.animate(ul,'left:'+nc,20);
		 }
	 }
	 /*===滚动到新添加的关键词位置==*/
   
};
ZBrowser.newListTab(ZBrowser);
ZBrowser.add_keywords=(function(S){
			if(!G('add-keywords')) return ;
			var bx=G('add-keywords-bx'),input=G('new-keywords-input'),but=G('add-keywords-but');
			addEvent(G('add-keywords'),'click',function(){
				  var hkey=bx.style.display==='none' || bx.offsetHeight===0
				  if(hkey){
					  bx.style.display='block';
					  input.focus();
				  }else{
					  bx.style.display='none';
				  }							   
			});
			function closeBx(){
				if(!bx) return ;
				bx.style.display='none';
				input.value='';
			};
			
			function AddWord(){
					  var value=S.trim(input.value),li;
					  if(value==''){alert('\u8bf7\u8f93\u5165\u65b0\u95fb\u5173\u952e\u5b57');return false};
					  //if(value.length>6){alert('\u65b0\u95fb\u5173\u952e\u5b57\u4e0d\u80fd\u5927\u4e8e6\u4e2a\u5b57\u7b26');return false};
					  G('nTab').appendChild(li=document.createElement('li'));
					  li.innerHTML=value;
					  closeBx();
					  S.newListTab(ZBrowser,1);
			};
			
			function hotkey(evt) { 
				var evt= evt ? evt :window.event
				if(evt.keyCode==13) {AddWord(evt);} 
			};
			document.onkeydown =function(event){ hotkey(event);}
			addEvent(but,'click',AddWord);
			
			addEvent(bx,'mouseup',function(event){stopPropagation(event);});
			
			S.mouseup.add_keywordscloseBx=closeBx;

})(ZBrowser);

addEvent(document,'mouseup',function(){
	  for(var p in ZBrowser.mouseup){
		  if(Object.prototype.toString.call(ZBrowser.mouseup[p])=='[object Function]'){ZBrowser.mouseup[p]()}
	  }
});

