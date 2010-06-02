(function(){
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
				for ( var i = 0; i < e.length; i++ ) {
					if( re.test(e[i].className) )
						r.push(e[i]);
				}
				return r;
		};
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
			  this.cs=this.set.cs;
			  this.cl=this.set.cl;
			  this.index=this.set.index;
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
					  c:"cur",
					  index:0,
					  evt:'click',
					  cs:1,//自己展开时再点击自己时是否需要关闭自己
					  cl:1 //是否要关闭上一个展开，1要关闭，0不关闭
				  }
				 this.E(this.set,s||{})
			  },
			  ec:function(n){
				  
				 var h=this.h[n],c='className',a=this.m[n],d=a.style,
					 dk=(d.display=='none' || a.offsetHeight==0),//判断是否隐藏或使用display:none
					 hc=h[c].indexOf(this.cur)!=-1;//判断是否有cur样式
					 //init=this.cl ? true : false;//判断是否是第一次执行
					 
				 if(!this.lh) {this.lh=h}
				 if(!this.lm) {this.lm=a}
				   
				 /*==是否要关闭上一个展开==*/
				 if(this.cl && this.lh!=h){
					 
					 var lh=this.lh
					 
					 if(this.lh[c].indexOf(this.cur)!=-1){this.lh[c]=this.lh[c].replace(' '+this.cur,'')};
					 
					 this.lm!=a && (this.lm.style.display='none')
					 
					 if(!hc && dk){h[c]+=' '+this.cur;hc=!hc};
					 
					 d.display='block';
				   
				 }

				 /*==是否要关闭上一个展开==*/
				 
				 /*==自己展开时再点击自己时需要关闭自己==*/
				 if(this.cs && this.lh==h) {
					 
					 if(!hc && !dk){
						 
						  h[c]+=' '+this.cur;
						  
						 }else{
							 
						 h[c]=h[c].replace(' '+this.cur,'')
						 
					 }
					 
					 d.display=dk ? 'block' : 'none';
					 
				}
				/*==自己展开时再点击自己时是否需要关闭自己==*/
				  
				 this.lh=h;
				 this.lm=a;
				 
			  },
			  run:function(){
				    for(var i=0,len=this.h.length;i<len;i++){
						this.h[i].n=i;
						addEvent(this.h[i],this.e,Bind(this,this.ec,this.h[i].n))
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
				this.hover=function(o){
					 if(this.ht){clearTimeout(this.ht)}
					 this.ht=setTimeout(
						Bind(this,function(){
						if(o.className.indexOf(this.sn)==-1){o.className+=' '+this.sn;}
						this.m[o.n].style.width=o.offsetWidth-2+'px'
						this.m[o.n].style.visibility='visible'	
						}),this.hTime)
				};
				this.out=function(o,t){
					 if(this.ht){clearTimeout(this.ht)}
					 if(this.ot){clearTimeout(this.ot)}
					 this.ot=setTimeout(
						Bind(this,function(){
						if(o.className.indexOf(this.sn)!=-1){o.className=o.className.replace(' '+this.sn,"")}						
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
	  
		domReady(function(){
		  var d=new Date().getTime();;
		  var allExpandContraction=function(){
			  var content=$('content'),allEsHandle=getECN(content,'EsHandle','div'),allEsmain=getECN(content,'EsMain','*'),es1=[],es2=[],esmain1=[],esmain2=[];
			  for(var i=0,len=allEsHandle.length;i<len;i++){
				  if(allEsHandle[i].parentNode.parentNode.id!='p-dra-version'){
					  es1.push(allEsHandle[i])
					  esmain1.push(allEsmain[i])
				  }else{
					  es2.push(allEsHandle[i]);
					  esmain2.push(allEsmain[i])
				  }
			  }
			  new ExpandContraction({hd:es1,bd:esmain1,c:'Shrink',cs:1,cl:0})
			  new ExpandContraction({hd:es2,bd:esmain2,c:'Shrink',cs:1})
		  }(),
		  closeBut=function(){
			  var closeDiv=getECN(document,'p-close','a').concat(getECN(document,'tb-close','a'));
			  if(closeDiv.length==0){return false}
			  for(var i=0,ten=closeDiv.length;i<ten;i++){
				  addEvent(closeDiv[i],'click',function(event){this.parentNode.style.display='none';preventDefault(event)})
			  }
		  }(),
		  p_drop=function(){
				var drophandle=getECN(document,'drop-handle','*'),submore=getECN(document,'drop-sub-more','*');
				for(var i=0,len=submore.length;i<len;i++){
					var subTag=submore[i].getElementsByTagName('li');
					for(var j=0,le=subTag.length;j<le;j++){
						if(j%2==0){subTag[j].style.backgroundColor='#f0f0f0'}
					}
				}
				new Dropsub({'handle':drophandle,'submore':submore,'className':'drop-select'});
		  }(),
		  /*===========for dark==========*/
		  Dark=function(){
			    if(!$('but-dark')){return false}
				var db=document.body,butDark=$('but-dark');
				function dark(o){
					if(!o.init){
						if(getCookie('dark')==1){
						  db.className='dark';
						  o.innerHTML='开灯';
						}
					   o.init=true;
					}else{
						db.className=db.className=='dark' ? '' : 'dark';
						o.innerHTML=db.className=='dark' ? '开灯' : '关灯';
						db.className=='dark' ? setCookie('dark',1) : setCookie('dark',0); 
					}
				}
				dark(butDark)
				addEvent(butDark,'click',function(event){dark(this);preventDefault(event)})
		  }();
		  /*==========for dark==========*/
		  //alert(new Date().getTime()-d)
		})

})();
