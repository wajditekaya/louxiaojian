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
function SliderLayer(s){
	 this.SetOptions(s);
	 if(!this.options.handle || !this.options.handleBx || this.options.handle.length!=this.options.handleBx.length) return false;
	 this.handle=this.options.handle;
	 this.handleBx=this.options.handleBx;
	 this.y=this.interval=this.options.interval;
	 this.delay=this.options.delay;
	 this.Tween=this.options.Tween;
	 this.evt=this.options.evt;
	 this.cl=this.options.cl;
	 this.cs=this.options.cs;
	 this.index=this.options.index;
	 this.key=true;//控制是否展开的开关
	 this.start=this.options.start;
	 this.end=this.options.end;
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
			handle:[],
			handleBx:[],
			evt:'click',//触发菜单的方式
			eKey:0,//0为收缩状态，1为展开状态
			interval:40,//下拉缓动的时间
			delay:10,//下拉延时时间
			cl:0,//关闭上一个展开的(1:要关闭；0：不关闭)
			cs:1,//关闭自己(1:要关闭；0：不关闭)
			index:'',
			dis:['height'],
	        Tween:function(t,b,c,d){return c*(t/=d)*t + b;},
			start:function(){},
			end:function(){}
		  };
		  this.E(this.options,s||{})
	  },
	 slider:function(o,hb){
			 var b=0,c=this.getEle(hb).h,d=this.interval,t=0;
			 if(!hb.style.overflow) hb.style.overflow='hidden';
			 if(o.timer) clearTimeout(o.timer);
		     this.y=0;
			 function sMove(){
				 this.setStyle(hb,{'height': (o.mKey ? (Math.ceil(this.Tween(t,b,c,d)) + "px") : (c-Math.ceil(this.Tween(t,b,c,d)) + "px"))})
				 if(t<d){
					 t++;o.timer=setTimeout(this.B(this,sMove), 10);
				 }else{
				   this.y=t;
				   if(!o.mKey) this.setStyle(hb,{'display':'none'});
				   this.setStyle(hb,{'height':'auto'});
				   t=0;
				   o.mKey=o.mKey ? 0 : 1
				   this.end();
				   if(this.lm!=hb && this.ln!=o) this.lm=hb;this.ln=o
				 };
			 };
			 
			 sMove.call(this);
		 
	 },
	 act:function(o){
			if(!this.cs && this.ln==o) return false;//要关闭上一个展开的情况下，再点击自己不收起或展开
			if(this.y!=this.interval) return false;//一个正在展开或收起时不展开另外一个.
			var n=this.index=o.nub,hb=this.handleBx[n];
			if(this.sTime) clearTimeout(this.sTime);
			this.sTime=setTimeout(this.B(this,function(){
				  o.mKey=(cssValue(hb,'display')=='none' ||  hb.offsetHeight==0 ) ? 1 : 0;
				  if(cssValue(hb,'display')=='none' || cssValue(hb,'visibility')=='hidden'){hb.style.display='block';hb.style.visibility='visible'};
				  this.start();	
				  if(!this.key) return false;
				  if(this.cl){
					  if(!this.lm && !this.ln){
						  this.lm=hb;this.ln=o
						  }else{
						  if(!this.ln.mKey && this.ln!=o) {this.slider(this.ln,this.lm)}
					  }
				  };
				  this.slider(o,hb);
				  
			}),this.delay) 
	 },
	 
	 run:function(){
		  if(this.handle.length!=this.handleBx.length) return false;
		  for(var i=0,len=this.handle.length;i<len;i++){
			  this.handle[i].nub=i;
			  this.on(this.handle[i],this.evt,this.B(this,this.act,this.handle[i]));
			  if(this.evt=='mouseover') this.on(this.handle[i],'mouseout',this.B(this,function(){if(this.sTime) clearTimeout(this.sTime);}));
		  }
		  if(this.index>=0 && this.cl) {this.act(this.handle[this.index]);}
	 }
	  
};

function getCN(node, name, type) {
	  if (node.getElementsByClassName)
		  return node.getElementsByClassName(name);
		  else {
		  var r = [], re = new RegExp("(^|\\s)" + name + "(\\s|$)"), e = (node || document).getElementsByTagName(type || "*");
		  for ( var i = 0,len=e.length; i < len; i++ ) {
			  if( re.test(e[i].className) )
				  r.push(e[i]);
		  }
		  return r;
	  }
};
domReady(function(){
	  var d=new Date().getTime();
	  var tvguide=function(){
			var h=getCN($('exp1'),'SliderHandle','div'),hb=getCN($('exp1'),'SliderBx','div');
			new SliderLayer({
							'handle':h,
							'handleBx':hb,
							'end':function(){},
							'start':function(){this.handle[this.index].innerHTML=this.handle[this.index].mKey ? '收缩' : '展开'},
							'evt':'click',
							'cl':0,
							'Tween':function(t,b,c,d){
								if ((t/=d/2) < 1) return c/2*t*t + b;
								return -c/2 * ((--t)*(t-2) - 1) + b;
							}
			})
	  }();
	  
	  var tvguide2=function(){
			var h=getCN($('exp2'),'SliderHandle','div'),hb=getCN($('exp2'),'SliderBx','div');
			new SliderLayer({
							'handle':h,
							'handleBx':hb,
							'end':function(){},
							'start':function(){
								if(this.ln) this.ln.innerHTML=this.ln.mKey ? '收缩' : '展开';
								this.handle[this.index].innerHTML=this.handle[this.index].mKey ? '收缩' : '展开'
							 },
							'evt':'mouseover',
							'cl':1,
							'index':0,
							'interval':40,
							'cs':0,
							'delay':50,
							'Tween':function(t,b,c,d){
								if ((t/=d/2) < 1) return c/2*t*t + b;
								return -c/2 * ((--t)*(t-2) - 1) + b;
							}
			})
	  }();
	 // alert(new Date().getTime()-d)
	  
})