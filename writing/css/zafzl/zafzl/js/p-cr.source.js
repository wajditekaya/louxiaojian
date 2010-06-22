function $(id) {return "string" == typeof id ? document.getElementById(id) : id;};
domReady = !+'\v1' ? function(fn){(function(){
	try{
		document.documentElement.doScroll('left');
	} catch (error){
		setTimeout(arguments.callee, 0);
		return;
	};
	fn();
})();
} : function(fn){
document.addEventListener('DOMContentLoaded', fn, false);
};
function Bind(object, fun) {
  var args = Array.prototype.slice.call(arguments).slice(2);
  return function() {
	  return fun.apply(object, args);
  }
 };
function getECN(node, name, type) {
		var r = [], re = new RegExp("(^|\\s)" + name + "(\\s|$)"), e = (node || document).getElementsByTagName(type || "*");
		for ( var i = 0,len=e.length; i < len; i++ ) {
			if(re.test(e[i].className) )
				r.push(e[i]);
		}
		return r;
};
function cleanWhitespace(oEelement)
	{
	 for(var i=0;i<oEelement.childNodes.length;i++){
	  var node=oEelement.childNodes[i];
	  if(node.nodeType==3 && !/\S/.test(node.nodeValue)){node.parentNode.removeChild(node)}
	  }
}
// --- 设置cookie
function setCookie(name,value,days) {
  if (days) {
	var date = new Date();
	date.setTime(date.getTime()+(days*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}
//--- 获取cookie
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
	var c = ca[i];
	while (c.charAt(0)==' ') c = c.substring(1,c.length);
	if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
};
function stopPropagation(evt){
	var evt = evt || window.event;
	if (evt.stopPropagation) {
		evt.stopPropagation();
	}
	else {
		evt.cancelBubble = true;
	}
};
function preventDefault(evt){
	var evt = evt || window.event;
	if (evt.preventDefault) {
		evt.preventDefault();
	}
	else {
		evt.returnValue = false;
	}
};
function addEvent( node, type, listener ) {
	if(!(node = $(node))) return false;
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
function ExpandContraction(s){
	  this.sets(s);
	  this.h=this.set.hd;
	  this.m=this.set.bd;
	  this.e=this.set.evt;
	  this.cur=this.set.c;
	  this.eCur=this.set.e;
	  this.cs=this.set.cs;
	  this.cl=this.set.cl;
	  this.index=(this.set.index<this.h.length && this.set.index) || 0;
	  if(!this.h || !this.m || this.h.length==0 || this.m.length==0 || this.h.length!=this.m.length){return false}
	  this.run();
}
ExpandContraction.prototype={
	  E:function(destination, source) {
			  for (var property in source) {
				destination[property] = source[property];
			  }
	  },
	  sets:function(s){
		  this.set={
			  hd:[],
			  bd:[],
			  c:'',//关闭时的class
			  e:'',//展开时的class
			  index:0,
			  evt:'click',
			  cs:1,//自己展开时再点击自己时是否需要关闭自己
			  cl:1 //是否要关闭上一个展开，1要关闭，0不关闭
		  }
		 this.E(this.set,s||{})
	  },
	  ec:function(n){
		 var h=this.h[n],c='className',a=this.m[n],d=a.style,
			 ec=this.eCur,cu=this.cur,
			 dk=(d.display=='none' || a.offsetHeight==0),//判断是否隐藏或使用display:none
			 hc=h[c].indexOf(cu)!=-1,//判断是否有关闭时的cur样式
			 hec=h[c].indexOf(ec)!=-1;//判断是否有展开时的eCur样式
			 //init=this.cl ? true : false;//判断是否是第一次执行
			 
		 if(this.cl && !this.lh) {this.lh=h}
		 if(this.cl && !this.lm) {this.lm=a}
		   
		 /*==是否要关闭上一个展开==*/
		 
		 if(this.cl && this.lh!=h){
			 
			 /*关闭上一个展开*/
			 if(ec && this.lh[c].indexOf(ec)!=-1){this.lh[c]=this.lh[c].replace(ec,'')};
			 if(this.cur && this.lh[c].indexOf(cu)==-1){this.lh[c]+=' '+cu};
			 this.lm!=a && (this.lm.style.display='none')
			 /*关闭上一个展开*/
			 
			 if(ec && h[c].indexOf(ec)==-1 && dk){h[c]+=' '+ec};
			 if(cu && h[c].indexOf(cu)!=-1 && dk){h[c]=h[c].replace(cu,'')};
			 d.display='block';
			 
		 }

		 /*==是否要关闭上一个展开==*/
		 
		 
		 /*==自己展开时再点击自己时需要关闭自己==*/
		 
		 if(this.cs && !this.cl){this.lh=h;this.lm=a;this.frist=true} //点击自己关闭自己 但不关闭上一个展开的 情况下
		 
		 if(this.cs && this.lh==h && this.frist) {
			 
			 if(dk){
				 
				   if(cu && h[c].indexOf(cu)!=-1){h[c]=h[c].replace(cu,'')};
				   if(ec && h[c].indexOf(ec)==-1){h[c]+=' '+ec};

				 }else{
					 
				   if(ec && h[c].indexOf(ec)!=-1){h[c]=h[c].replace(ec,'')};
				   if(this.cur && h[c].indexOf(cu)==-1){h[c]+=' '+cu};

				 
			 }
			 
			 d.display=dk ? 'block' : 'none';
			 
		}
		/*==自己展开时再点击自己时是否需要关闭自己==*/
		  
		 this.lh=h;
		 this.lm=a;
		 this.frist=true
		 
	  },
	  run:function(){
		  
			for(var i=0,len=this.h.length;i<len;i++){
				
				var h=this.h[i],m=this.m[i],c='className',md=m.style,he=h[c].indexOf(this.eCur)!=-1,hy=h[c].indexOf(this.cur)!=-1;
				
				if(this.cl){
					
					  if(i!=this.index){
						  
						  if(this.eCur && he) h[c]=h[c].replace(this.eCur,'');
						  if(this.cur && !hy)h[c]+=' '+this.cur
						  md.display='none';
					  }
					  
					  if(i==this.index){
						  
						  if(this.cur && hy) h[c]=this.h[i].replace(this.cur,'');
						  if(this.eCur && !he) h[c]+=' '+this.eCur
						  md.display='block';
						  
					  }
				
				};
				
				
				h.n=i;
				addEvent(h,this.e,Bind(this,this.ec,h.n))
				
			}
			
			if(this.cl) this.ec(this.index);
		  
	  }
	  
};
function Dropsub(s){
		this.h=s.handle;
		this.m=s.submore;
		this.sn=s.className;
		this.hTime=s.hTime || 200;
		this.oTime=s.oTime || 200;
		if(!this.h || !this.m || this.h.length==0 || this.m.length==0 || this.h.length!=this.m.length){return false}
		var c='className';
		this.hover=function(o){
			 if(this.ht){clearTimeout(this.ht)}
			 this.ht=setTimeout(
				Bind(this,function(){
				if(o[c].indexOf(this.sn)==-1){o[c]+=' '+this.sn;}
				this.m[o.n].style.visibility='visible'	
				}),this.hTime)
		};
		this.out=function(o,t){
			 if(this.ht){clearTimeout(this.ht)}
			 if(this.ot){clearTimeout(this.ot)}
			 this.ot=setTimeout(
				Bind(this,function(){
				if(o[c].indexOf(this.sn)!=-1){o[c]=o[c].replace(' '+this.sn,"")}						
				this.m[o.n].style.visibility='hidden'	;
			  }),this.oTime)
		}
		for(var i=0,len=this.h.length;i<len;i++){
			   var h=this.h[i],m=this.m[i];
			   h.n=i;
			   addEvent(h,'mouseover',Bind(this,this.hover,h))
			   addEvent(h,'mouseout',Bind(this,this.out,h))
			   addEvent(m,'mouseover',Bind(this,function(){if(this.ot){clearTimeout(this.ot)}}))
			   addEvent(m,'mouseout',Bind(this,this.out,h))
		}

};