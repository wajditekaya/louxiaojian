/**
 * @module animate
 * @author louxiaojian@gmail.com
 * @param elem:滚动的对象
 * function(
			elem,//@param 滚动的对象
			{
			  props:{left:'50px'},//@param 滚动的样式
			  d:800,//@param滚动的时间
			  easing:,//@param滚动时的缓冲模式
			  start:function(){},//@param开始函数
			  animimg:function(){},//@param动画过程中执行的函数
			  callback:function(){},//@param动画结束后执行的函数
           }
    )
 */
var animate=function(elem,s){
			 /*
			  @param c:滚动的距离
			  @param d:滚动的时间
			  @param b:滚动时的初始距离
			 */
			 var self=this;
			 if (!(self instanceof animate)) {
				  return new animate(elem,s);
			 }
			 this.init(elem,s);
};
animate.prototype={
			 init:function(elem,s){
				   var tween=s.easing || this.tween.Quart.easeOut,
				   start=s.start || function(){},
				   animimg=s.animimg || function(){},
				   callback=s.callback  || function(){},
				   props=s.props || {},
				   d=s.d || 800;
				   this.elem=elem;
				   this.tvalue=[];//存放动画过程中样式变化值
				   elem.time=[];//存放各个样式动画setTimeout的id

				   for(var pk in props){
					   this._animate(elem,pk+':'+props[pk],d,start,animimg,callback,tween)
				   }
				   
			 },
			 _animate:function(elem,attr,d,start,animimg,callback,tween){
				   var self=this,
				   css=attr.split(':')[0],
				   cssValue=parseFloat(attr.split(':')[1]),
				   initialvalue=parseFloat(elem.style[css]),
				   opacity=css==='opacity',
				   b=opacity ? ( initialvalue==0 ? 0 : initialvalue || 1 ) : ( initialvalue || 0 ),//初始位置
				   fb=opacity ? ( cssValue==0 ? 0 : cssValue || 1 ) : ( cssValue || 0 ),//最终位置
				   c=fb-b,//滚动的距离
				   t,
				   mm;
				   if(c===0) return false;
				   if(elem.time[css]) clearTimeout(elem.time[css]);
				   mm=c<0 ? 'floor' : 'ceil';
				   start && this.isFunction(start) && start.call(self);
				   var curTime=new Date().getTime();
				   new function(){
					 t=new Date().getTime()-curTime;
					 if(t<d){
						 opacity ? self.setOpacity(elem,self.tvalue[css]=Math[mm](tween(t,b*100,c*100,d))) : (elem.style[css] =(self.tvalue[css]=Math[mm](tween(t,b,c,d)))+'px');
						 animimg && self.isFunction(animimg) && animimg.call(self)
						 elem.time[css]=setTimeout(arguments.callee,10);
					 }else{
						 self.t=t;
						 opacity ? self.setOpacity(elem,fb*100) : (elem.style[css]=fb+'px');
						 if(elem.time[css]) clearTimeout(elem.time[css]);
						 callback && self.isFunction(callback) && callback.call(self);
					 }
					 
				   };
				   
				   
			 },
			 setOpacity:function(elem,z){
					   elem.style.filter = "alpha(opacity=" + z + ")";
					   elem.style.opacity = z/100;
			 },
			 isFunction:function(fn){
				 return Object.prototype.toString.call(fn)=='[object Function]' ? true :false
			 },
			 stop:function(){
				 	for(var timeid in this.elem.time){
						this.elem.time[timeid] && clearTimeout(this.elem.time[timeid]);
					}
			 },
			 tween:{
				  Linear: function(t,b,c,d){ return c*t/d + b; },
				  Quad: {
					  easeIn: function(t,b,c,d){
						  return c*(t/=d)*t + b;
					  },
					  easeOut: function(t,b,c,d){
						  return -c *(t/=d)*(t-2) + b;
					  },
					  easeInOut: function(t,b,c,d){
						  if ((t/=d/2) < 1) return c/2*t*t + b;
						  return -c/2 * ((--t)*(t-2) - 1) + b;
					  }
				  },
				  Cubic: {
					  easeIn: function(t,b,c,d){
						  return c*(t/=d)*t*t + b;
					  },
					  easeOut: function(t,b,c,d){
						  return c*((t=t/d-1)*t*t + 1) + b;
					  },
					  easeInOut: function(t,b,c,d){
						  if ((t/=d/2) < 1) return c/2*t*t*t + b;
						  return c/2*((t-=2)*t*t + 2) + b;
					  }
				  },
				  Quart: {
					  easeIn: function(t,b,c,d){
						  return c*(t/=d)*t*t*t + b;
					  },
					  easeOut: function(t,b,c,d){
						  return -c * ((t=t/d-1)*t*t*t - 1) + b;
					  },
					  easeInOut: function(t,b,c,d){
						  if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
						  return -c/2 * ((t-=2)*t*t*t - 2) + b;
					  }
				  },
				  Quint: {
					  easeIn: function(t,b,c,d){
						  return c*(t/=d)*t*t*t*t + b;
					  },
					  easeOut: function(t,b,c,d){
						  return c*((t=t/d-1)*t*t*t*t + 1) + b;
					  },
					  easeInOut: function(t,b,c,d){
						  if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
						  return c/2*((t-=2)*t*t*t*t + 2) + b;
					  }
				  },
				  Sine: {
					  easeIn: function(t,b,c,d){
						  return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
					  },
					  easeOut: function(t,b,c,d){
						  return c * Math.sin(t/d * (Math.PI/2)) + b;
					  },
					  easeInOut: function(t,b,c,d){
						  return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
					  }
				  },
				  Expo: {
					  easeIn: function(t,b,c,d){
						  return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
					  },
					  easeOut: function(t,b,c,d){
						  return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
					  },
					  easeInOut: function(t,b,c,d){
						  if (t==0) return b;
						  if (t==d) return b+c;
						  if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
						  return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
					  }
				  },
				  Circ: {
					  easeIn: function(t,b,c,d){
						  return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
					  },
					  easeOut: function(t,b,c,d){
						  return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
					  },
					  easeInOut: function(t,b,c,d){
						  if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
						  return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
					  }
				  },
				  Elastic: {
					  easeIn: function(t,b,c,d,a,p){
						  if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
						  if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
						  else var s = p/(2*Math.PI) * Math.asin (c/a);
						  return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
					  },
					  easeOut: function(t,b,c,d,a,p){
						  if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
						  if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
						  else var s = p/(2*Math.PI) * Math.asin (c/a);
						  return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
					  },
					  easeInOut: function(t,b,c,d,a,p){
						  if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
						  if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
						  else var s = p/(2*Math.PI) * Math.asin (c/a);
						  if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
						  return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
					  }
				  },
				  Back: {
					  easeIn: function(t,b,c,d,s){
						  if (s == undefined) s = 1.70158;
						  return c*(t/=d)*t*((s+1)*t - s) + b;
					  },
					  easeOut: function(t,b,c,d,s){
						  if (s == undefined) s = 1.70158;
						  return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
					  },
					  easeInOut: function(t,b,c,d,s){
						  if (s == undefined) s = 1.70158;
						  if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
						  return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
					  }
				  },
				  Bounce: {
					  easeIn: function(t,b,c,d){
						  return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
					  },
					  easeOut: function(t,b,c,d){
						  if ((t/=d) < (1/2.75)) {
							  return c*(7.5625*t*t) + b;
						  } else if (t < (2/2.75)) {
							  return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
						  } else if (t < (2.5/2.75)) {
							  return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
						  } else {
							  return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
						  }
					  },
					  easeInOut: function(t,b,c,d){
						  if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
						  else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
					  }
				  }
			  }
	
}
