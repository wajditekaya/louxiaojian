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
function SliderLayer(s){
	 this.SetOptions(s);
	 if(!this.options.handle || !this.options.handleBx || this.options.handle.length!=this.options.handleBx.length) return false;
	 this.handle=this.options.handle;
	 this.handleBx=this.options.handleBx;
	 this.interval=this.options.interval;
	 this.Tween=this.options.Tween;
	 this.evt=this.options.evt;
	 this.start=this.B(this,this.options.start);
	 this.end=this.B(this,this.options.end);
	 this.rKey=true;//控制是否执行展开函数
	 this.run();
}
SliderLayer.prototype={
      $:function(o){return typeof(o)=='string' ? document.getElementById(o) : o},
	  on:function (node,type,listener) {
			if(!(node = this.$(node))) return false;
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
	  B:function(object, fun) {
		var args = Array.prototype.slice.call(arguments).slice(2);
		return function() {
			return fun.apply(object, args);
		}
	   },
	  E:function(destination, source) {
		for (var property in source) {
		  destination[property] = source[property];
		}
	  },
	  uncamelize:function(s, sep) {
		  sep = sep || '-';
		  return s.replace(/([a-z])([A-Z])/g, function (strMatch, p1, p2){
			  return p1 + sep + p2.toLowerCase();
		  });
	  },
	  camelize:function(s) {
		  return s.replace(/-(\w)/g, function (strMatch, p1){
			  return p1.toUpperCase();
		  });
	  },
	  setStyle:function(element, styles) {
		  if(!(element = this.$(element))) return false;
		  for (property in styles) {
			  if(!styles.hasOwnProperty(property)) continue;
			  if(element.style.setProperty) {
				  element.style.setProperty(
				  this.uncamelize(property,'-'),styles[property],null);
			  } else {
				  element.style[this.camelize(property)] = styles[property];
			  }
		  }
		  return true;
	  },
	  getEle:function(o){
		  var obj=this.$(o),w=obj.offsetWidth,h=obj.offsetHeight;
		  if(w==0 || h==0){
			  this.setStyle(obj,{'position':'absolute','display':'block','visibility':'hidden'})
			  w=obj.offsetWidth;
			  h=obj.offsetHeight;
			  this.setStyle(obj,{'position':'static','display':'none','visibility':'visible'})
		  }
		  return {
			  'w':w,
			  'h':h
		  }
	  },
	 SetOptions:function(s){
		this.options={
			handle:function(){},
			handleBx:function(){},
			evt:'click',//触发菜单的方式
			eKey:0,//0为收缩状态，1为展开状态
			interval:40,//下拉缓动的时间
			showDelay:10,//下拉延时时间
			hideDelay:300,//收缩延时时间
			dis:['height'],
	        Tween:function(t,b,c,d){return c*(t/=d)*t + b;},
			start:function(){},
			end:function(){}
		  };
		  this.E(this.options,s||{})
	  },
	 slider:function(o,hb){
		 
		 var n=this.index=o.nub,hb=this.handleBx[n],b=0,c=this.getEle(hb).h,d=this.interval,t=0;
		 if(!hb.style.overflow) hb.style.overflow='hidden';
		 if(this.timer) clearTimeout(this.timer);
		 
		 this.sMove=function(){
			 this.setStyle(hb,{'height': (o.mKey ? (Math.ceil(this.Tween(t,b,c,d)) + "px") : (c-Math.ceil(this.Tween(t,b,c,d)) + "px"))})
			 if(t<d){
				 t++;this.timer=setTimeout(this.B(this,this.sMove), 10);
			 }else{
			   if(!o.mKey) this.setStyle(hb,{'display':'none'});
			   this.setStyle(hb,{'height':'auto'});
			   this.rKey=true;
			   t=0;
			   this.end();
			 };
		 };
		 this.sMove();
		 
	 },
	 act:function(o){
			if(!this.rKey){return false}
			var n=this.index=o.nub,hb=this.handleBx[n];
			if(this.sTime) clearTimeout(this.sTime);
			this.sTime=setTimeout(this.B(this,function(){
				  this.rKey=false;
				  o.mKey=(hb.style.display=='none' ||  hb.offsetHeight==0 ) ? 1 : 0;
				  if(hb.style.display && hb.style.display=='none'){hb.style.display='block'};
				  this.start();									   
				  this.slider(o,hb);									   
			}),this.interval) 
	 },
	 
	 run:function(){
		  if(this.handle.length!=this.handleBx.length) return false;
		  for(var i=0,len=this.handle.length;i<len;i++){
			  this.handle[i].nub=i;
			  this.on(this.handle[i],this.evt,this.B(this,this.act,this.handle[i]));
		  }
	 }
	  
};

function getCN(node, name, type) {
	  if (node.getElementsByClassName)
		  return node.getElementsByClassName(name);
		  else {
		  var r = [], re = new RegExp("(^|\\s)" + name + "(\\s|$)"), e = (node || document).getElementsByTagName(type || "*");
		  for ( var i = 0; i < e.length; i++ ) {
			  if( re.test(e[i].className) )
				  r.push(e[i]);
		  }
		  return r;
	  }
};
domReady(function(){
	  var tvguide=function(){
			var h=getCN(document,'SliderHandle','div'),hb=getCN(document,'SliderBx','div');
			new SliderLayer({
							'handle':h,
							'handleBx':hb,
							'end':function(){},
							'start':function(){this.handle[this.index].innerHTML=this.handle[this.index].mKey ? '收缩' : '展开'},
							'evt':'click',
							'Tween':function(t,b,c,d){
								if ((t/=d/2) < 1) return c/2*t*t + b;
								return -c/2 * ((--t)*(t-2) - 1) + b;
							}
			})
	  }();
})