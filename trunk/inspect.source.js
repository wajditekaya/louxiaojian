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
function cssValue(o,s){
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
};
function cleanWhitespace(oEelement)
	{
	 for(var i=0;i<oEelement.childNodes.length;i++){
	  var node=oEelement.childNodes[i];
	  if(node.nodeType==3 && !/\S/.test(node.nodeValue)){node.parentNode.removeChild(node)}
	  }
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
function dialog(set){
	  this.sets(set);
	  this.dialog=this.$(this.boxSet.id);
	  this.openBack=this.boxSet.openBack;
	  this.closeBack=this.boxSet.closeBack;
	  this.top=parseInt(this.boxSet.top);
	  this.left=parseInt(this.boxSet.left);
	  this.Layer=this.boxSet.Layer
	  this.fix=this.boxSet.fix;
	  this.dialogInit();
	  this.open();
	  window.onresize=this.B(this,this.setPosition);
};
dialog.close=function(){
	        var layDic=document.getElementById('layDic'),dialog=document.getElementById('dialog');
			if(layDic){layDic.style.display="none";layDic.parentNode.removeChild(layDic)}
			dialog.style.display="none";
			if(document.all && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6)){
				selects = document.getElementsByTagName("select");
				for(i = 0; i < selects.length; i++) {selects[i].style.visibility = 'visible';}
			}
}
dialog.prototype={
	  $:function(id){return "string" == typeof id ? document.getElementById(id) : id;},
	  isIE6:document.all && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6),
	  B:function(object, fun) {
		var args = Array.prototype.slice.call(arguments).slice(2);
		return function() {
			return fun.apply(object, args);
		}
	   },
	  Extend:function(destination, source) {
		  for (var property in source) {
			  destination[property] = source[property];
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
	  sets:function(s){
		  this.boxSet={
			  Layer:1,
			  width:"",
			  height:"",
			  left:'undefind',
			  top:'undefind',
			  fix:0,
			  openBack:function(){},
			  closeBack:function(){},
			  closeName:'p_close'
		  };
		  this.Extend(this.boxSet, s || {});
	  },
	  shadingLayer:function(){
		      if(!document.getElementById('layDic')){
				  this.layDic=document.createElement("div");
				  this.layDic.setAttribute('id','layDic');
				  this.layDic.style.cssText="opacity:0.5;-moz-opacity:0.5;filter:alpha(opacity=50);background:#000;position:absolute;top:0;left:0;z-index:9998;display:none";
				  document.body.appendChild(this.layDic);
			  }else{
				  this.layDic=document.getElementById('layDic');
			  }
	  },
	  hideSelects: function(v){
			if(this.isIE6){
				selects = document.getElementsByTagName("select");
				for(i = 0; i < selects.length; i++) {selects[i].style.visibility = v;}
			}
	  },
	  dialogInit:function(){
			var closebut,_this=this;
			this.dialog.style.display="block";
			this.pHeight=this.boxSet.height ?  parseInt(this.boxSet.height) : this.dialog.offsetHeight;
			this.pWidth=parseInt(this.boxSet.width);
			this.dialog.style.width=this.pWidth+"px";
			this.dialog.style.zIndex=9999;
			this.dialog.style.display="none";
			closebut=this.getECN(this.dialog,this.boxSet.closeName,'*');
			for(var i=0,len=closebut.length;i<len;i++){
				closebut[i].onclick=function(){_this.close.call(_this);return false;
				}
			}
	  },
	  fixed:function(){
		  var d=document,db=d.body,dd=d.documentElement;
		  if(this.isIE6){
			var top=this.top ? this.top : this.cTop;
			var expression=";top:expression(documentElement.scrollTop+"+top+");)"
			this.dialog.style.position='absolute';
			this.dialog.style.cssText+=expression;
			document.body.style.cssText+=';background:url(about:blank) fixed';
		  }else{
			this.dialog.style.position='fixed';
			this.dialog.style.top=this.top ? (this.top+'px') : this.cTop+"px";
		  }
		  return this;
	  },
	  unfixed:function(){
		  var d=document,db=d.body,dd=d.documentElement;
		  this.dialog.style.position="absolute";
		  this.dialog.style.top=this.top ? (this.top+'px') : (dd.scrollTop+this.cTop+"px");
	  },
	  setPosition:function(){
		  var d=document,db=d.body,dd=d.documentElement;
		  this.layDic.style.width = Math.max(db.scrollWidth, db.clientWidth) + dd.scrollLeft+"px";
		  this.layDic.style.height = Math.max(dd.scrollHeight, dd.clientHeight) + dd.scrollTop+"px";
		  this.cTop=(dd.clientHeight-this.pHeight)*0.382;
		  if(this.cTop<0) this.cTop=0;
          this.fix ? this.fixed() : this.unfixed();
		  this.dialog.style.left=this.left ? (this.left+'px') : ((dd.clientWidth-this.pWidth)/2+"px");
		  
	  },
	  open:function(){
		  if(this.Layer){this.shadingLayer();this.layDic.style.display="block";this.hideSelects("hidden")};
		  this.setPosition();
		  this.dialog.style.display="block";
		  this.openBack();
	  },
	  close:function(){
		if(this.Layer){this.layDic.style.display="none";this.layDic.parentNode.removeChild(this.layDic);this.hideSelects("visible")}
		this.dialog.style.display="none";
		this.closeBack();
	  }


};

/*===iframeLoad===*/
function iframeLoad(frame,callback){
	    var _this=this;
		this.frame = frame;
		this.setIframeHeight=function(){
				this.newHeight=this.frame.Document ? (this.frame.Document.body.scrollHeight+"px") : (this.frame.contentDocument.documentElement.offsetHeight+"px");
				this.iframeTitle=this.frame.Document ? this.frame.Document.title : this.frame.contentDocument.title;
				//alert(this.frame.contentWindow.name)
				//alert(this.frame.contentDocument.documentElement.scrollHeight)
		}
		if (this.frame.attachEvent){
			 this.frame.attachEvent("onload", function(){
			    _this.setIframeHeight();callback.call(_this)
			  });
		} else {
			this.frame.onload = function(){
				_this.setIframeHeight();callback.call(_this)
			};
	   }

}
/*===/iframeLoad===*/	

function newdialog(s){
	   var d=document,db=d.body,c='createElement',title=s.title,dialogDiv,iframe_height;
	   s.closeName='d-close';
	   s.id='dialog';
	   type=s.type || 'com'
	   if(!db.dialogDiv){
		  var dialogDiv=d[c]('div'),
		  dialog_hd=d[c]('div'),
		  dialog_h2=d[c]('h2'),
		  dialog_close=d[c]('a'),
		  dialog_bd=d[c]('div');
		  dialogDiv.className='dialog';
		  db.appendChild(dialogDiv);
		  dialog_hd.appendChild(dialog_h2);
		  dialog_hd.appendChild(dialog_close);
		  dialogDiv.appendChild(dialog_hd)
		  dialogDiv.appendChild(dialog_bd)
		  dialogDiv.setAttribute('id','dialog');
		  dialog_hd.className='dialog-hd';
		  dialog_bd.className='dialog-bd';
		  dialog_close.className='close d-close';
		  dialog_close.setAttribute('title','关闭');
		  dialog_close.innerHTML='×';
		  db.dialogDiv=dialogDiv;
		  db.dialog_bd=dialog_bd;
		  db.dialog_h2=dialog_h2;
	   }
	  db.dialog_bd.innerHTML='<div style="text-align:center" id="dialog-loading">正在加载,请稍后...</div>'
	  /*==iframe类型===*/
	  if(s.src){
		  if(!$('dialog_iframe')){
		      db.dialog_bd.innerHTML='<div style="text-align:center" id="dialog-loading">正在加载,请稍后...</div><iframe id="dialog_iframe" name="dialog_iframe" title="'+title+'" class="iframe-hidden" name="dialog_iframe" width="100%" frameborder="no" scrolling="no" ></iframe>';
		  }
		  iframe_f=$('dialog_iframe');
		  if(iframe_f.className.indexOf('iframe-hidden')==-1){iframe_f.className+=' iframe-hidden'}
		  db.dialog_h2.innerHTML=title;
		  $('dialog-loading').style.display="block";
		  new dialog(s);
		  new iframeLoad(iframe_f,function(){
			  iframe_f.style.height=this.newHeight;
			  iframe_f.className=iframe_f.className.replace('iframe-hidden','');
			  db.dialog_h2.innerHTML=this.iframeTitle;
			  $('dialog-loading').style.display="none";
			  new dialog(s);
		});
		iframe_f.src=s.src;
	}
    /*==/iframe类型===*/
	else{
		var btndiv=s.back ? '<div class="btnb"><input type="button" class="cbtn d-close" value="确定"><input type="button" class="cbtn d-close" value="返回" onclick="history.go(-1)"></div>' :'<div class="btnb"><input type="button" class="cbtn d-close" value="确定" name="确定"></div>';
	    h={'warn':'<div class="ico"><img width="46" height="33" src="../inspect/img/warn.png"></div><div class="mBx"><div class="box" id="msg_wrong">'+s.html+'</div>'+btndiv+'</div>','right':'<div class="ico"><img src="../inspect/img/right.png" width="46" height="33" /></div><div class="mBx"><div id="msg_success" class="box">'+s.html+'</div>'+btndiv+'</div></div>','com':s.html};
		db.dialog_h2.innerHTML=title;
		db.dialog_bd.innerHTML=h[type] || h['com'];
		new dialog(s);
	}
}
//new dialog({id:'playHistory_float',width:178})
//dialog end
function sc_slider(o){
		 this.b=parseInt(o.b) || 0;
		 this.c=parseInt(o.c) || 0;
		 this.d=o.interval || 15;
		 this.id=o.id;
		 this.dis=o.dis || 'width';
		 this.start= o.start || function(){};
		 this.end= o.end || function(){};
		 this.t=0;
		 this.Tween=o.Tween || function(t,b,c,d){return c*(t/=d)*t + b;}
		 this.start();
		 if(!this.id) return false;
		 if(this.timer){clearTimeout(this.timer)}
		 function sMove(){
			 this.id.style[this.dis]=Math.ceil(this.Tween(this.t,this.b,this.c,this.d)) + "px";
			 if(this.t<this.d){
				 this.t++;this.timer=setTimeout(Bind(this,sMove), 15);
			 }else{
			   this.t=0;
			   this.end();
			 };
		 };
		sMove.call(this);
};


domReady(function(){
  (function(){
	  if(!$('screen-ss')) return false;
	  addEvent($('screen-ss'),'click',
				function(){
					 var _this=this;
					 new sc_slider({
							   id:$('screenControl'),
							   dis:'left',
							   c:'-201px',
							   b:'0',
							   interval:15,
							   start:function(){
								  if(this.b>=0){$('new-i-col1-1').style.marginLeft='0px';}
								  if(parseInt(cssValue(this.id,'left'))!=parseInt(this.b)){
									  this.b=parseInt(cssValue(this.id,'left')),this.c=-parseInt(this.c);
								  }
							   },
							   end:function(){
								   if(this.b>=0){_this.className='screen-shrinking';}
								   if(this.b<0){
									  $('new-i-col1-1').style.marginLeft='205px';
									  _this.className='screen-shrinking-b';
								   }
							   }
							})
					 }
	  );
  })();
  /*==两列等高处理==*/
  var colHigh=function(){
	  var i_col2=$('screenControl'),i_col1_1=getECN(document,'i-col1-1','div')[0],header=$('header');
	  if(!i_col2 || !i_col1_1 || !header) return false;
	  r=Math.max(i_col2.offsetHeight,i_col1_1.offsetHeight);
	  rmax=document.documentElement.clientHeight-header.offsetHeight-parseInt(cssValue(header,'margin-bottom'));
	  if(r<rmax){r=rmax}
	  i_col1_1.style.height=(r-parseInt(cssValue(i_col1_1,'border-top-width')))+'px';
	  i_col2.style.height=(r-parseInt(cssValue(i_col2,'border-top-width')))+'px';
  }(),
  /*==两列等高处理==*/
  
 /*===左侧搜索菜单===*/
  allExpandContraction=function(){
	  if(!$('jk-menu')) return false;
	  var ali=$('jk-menu').getElementsByTagName('li'),bd_m=[],bd_n=[];
	  for(var i=0,len=ali.length;i<len;i++){
		  if(ali[i].className.indexOf('ms')!=-1){
			  bd_m.push(ali[i].getElementsByTagName('ul')[0]);
			  bd_n.push(ali[i])
			  addEvent(ali[i].getElementsByTagName('ul')[0],'click',function(event){stopPropagation(event)});
		  }
	  }
	  if(bd_m.length!=bd_n.length) return false;
	  new ExpandContraction({hd:bd_n,bd:bd_m,c:'select',cs:1,cl:0})
  }(),
  /*===/左侧搜索菜单===*/

  
  /*===表格hover变色===*/
  tablehover=function(){
	  var t=new Date().getTime()
	  var table=getECN(document,'tabc','table');
	  if(table.length==0) return false
	  for(var i=0,len=table.length;i<len;i++){
		  var tr=table[i].getElementsByTagName('tr');
		  for(var j=0,jen=tr.length;j<jen;j++){
			  if(tr[j].parentNode.tagName.toLocaleLowerCase()=='tbody'){
				  addEvent(tr[j],'mouseover',function(){if(this.className.indexOf('cur')==-1){this.className+=' cur'}})
				  addEvent(tr[j],'mouseout',function(){if(this.className.indexOf('cur')!=-1){this.className=this.className.replace('cur','')}})
			  }
			  
		  }
	  }
  }()
  /*===表格hover变色===*/
})