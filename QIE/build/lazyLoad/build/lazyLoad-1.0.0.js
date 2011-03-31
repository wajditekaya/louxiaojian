;(function(S){
	var d=new Date().getTime()
	var clientHeight=document.documentElement.clientHeight;
	document.getElementById('time').innerHTML=new Date().getTime()-d;
})('QIE');

(function(S){
   if (window[S] === undefined) window[S] = {};
	S = window[S];
	S.ready = !+'\v1' ? function(fn){(function(){
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
	S.getStyle=function(elem,atrr){
		var r;
		function camelize(s) {
			return s.replace(/-(\w)/g, function (strMatch, p1){
				return p1.toUpperCase();
			});
		}
		if(!+'\v1'){
			if(atrr.indexOf('-')!=-1) atrr=camelize(atrr);
			r=elem.currentStyle[atrr]
		}else{
			r=document.defaultView.getComputedStyle(elem, null).getPropertyValue(atrr);
		}
		return r
	};
	S.getObjPos=function(obj){    
		var x = y = 0;    
		if (obj.getBoundingClientRect){
			//for IE,FF3.0+,Opera9.5+ ,google  
			var box = obj.getBoundingClientRect();
			var D = document.documentElement;    
			x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;    
			y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop;         
		}    
		else   
		{    //个别低版本不支持getBoundingClientRect的浏览器
			for(; obj != document.body; x += obj.offsetLeft, y += obj.offsetTop, obj = obj.offsetParent );    
		}    
		return {'x':x, 'y':y};    
	};
	/*===lazyLoad===*/
	function lazyLoad(s){
        var self = this;
        if (!(self instanceof lazyLoad)) {
            return new lazyLoad(s);
        }
		this.init(s);
		this._filterImg();
		this.complete();
		this.lazyTime=setInterval(function(){self.loadLazy()},100);
		window.onresize=function(){self._containerInfo()};
		//window.onscroll=function(){}
	};
	lazyLoad.version=1.00;
	lazyLoad.prototype={
	  init:function(s){
		 /*
		  @param lazyTag:延迟加载的标签，默认为img
		  @param container:容器
		  @param mode:加载的模式（垂直或水平）
		  @param start:加载开始函数
		  @param loading:加载ing函数
		  @param callback:回调函数
		*/
		this.lazyTag=s.lazyTag || "img";
		this.container=s.container || window;//容器
		this.mode=s.mode || "vertical"//垂直模式 horizontal(水平模式)
		this.placeholder=s.placeholder || 'placeholder.png';//占位图片
		this.start=s.start || function(){};
		this.loading=s.loading || function(){};
		this.callback=s.callback || function(){};
		
		var isWindow=this.container===window || (/^(?:body|html)$/i).test(this.container.tagName);
		if(isWindow){this._containerInfo();}

		this.lazylength;
		this.lazy=[];//存放需要延时加载的图片
	  },
	  _containerInfo:function(){
			var webkit=/applewebkit/.test(window.navigator.userAgent.toLowerCase()),d=document,db=d.body,dd=d.documentElement;//webkit内核浏览器
			this.dd=d.compatMode==="CSS1Compat" && !webkit ? dd : db;
			this.clientHeight=this.mode==='vertical' ? dd.clientHeight : dd.clientWidth;
			return this.clientHeight;
	  },
	  _getPos:function(o){
		  if(S.getObjPos(o)){
		     return this.mode==='vertical' ? S.getObjPos(o).y : S.getObjPos(o).x;
		  }else{
			 return 0
		  }
	  },
	  _filterImg:function(){
			var img=document.getElementsByTagName(this.lazyTag);
			for(var i=0,len=img.length;i<len;i++){
				if(img[i].getAttribute("lazy_src")){
					var lobj={},pos;
					!img[i].src && (img[i].src=this.placeholder);
					pos=this._getPos(img[i])
					lobj.o=img[i];
					
					/*==过滤隐藏的图片(隐的图片的S.getObjPos(img[i])值不存在)，对于隐藏图片不进行pos赋值===*/
					if(pos>=0 && !this.isHidden(img[i])){
					  lobj.pos=pos;
					}
					this.lazy.push(lobj);
				}
			}
			this.lazylength=this.lazy.length;
			this.start();
	   },
	   isHidden:function(elem){
	     return ((elem.offsetWidth===0 && elem.offsetHeight===0) || S.getStyle(elem,'display')==='none') ? true :false;
	   },
	   /*==loadLazy==*/
	   loadLazy:function(){
		   
		    this.complete();
			this.loading();
			
			for(var i=0;i<this.lazylength;i++){
				var ly=this.lazy[i];
				if(ly.pos && (ly.pos-this.dd.scrollTop)<this.clientHeight &&!this.isHidden(ly.o)){
					ly.o.src=ly.o.getAttribute("lazy_src");
					ly.o.setAttribute("lazy_src",'');
					ly.o.removeAttribute("lazy_src");
					this.lazy.splice(i,1);
					this.lazylength--;
				}
				if(!ly.pos){
					ly.pos=this._getPos(ly.o)
				}
			};
	   },
	  /*==/loadLazy==*/ 
	  complete:function(){
		  if(this.lazylength===0) {clearInterval(this.lazyTime);this.callback();return true;};
		  return false
	  }
	   
	};
	/*===/lazyLoad===*/
	
	S.lazyLoad=lazyLoad;
	
})('QIE');

QIE.ready(function(){
	var S=QIE;
	QIE.lazyLoad(
				 {
				   start:function(){
					   document.getElementById('lxj2').value="总共有"+this.lazy.length+"张图片需要延迟加载";
				   },
				   loading:function(){
					   document.getElementById('lxj').value='还有'+this.lazylength+'张图未加载';
				   },
				   callback:function(){
					   document.getElementById('lxj').value='延迟加载完毕';
				   }
				}
	);
})
