	  var Tween = {
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
	  };
	  
			
	  var animate2=function(jsdiv,elem,props,d,easing,callback){
		   /*
		    @param elem:滚动的对象
			@param props:滚动的样式
			@param d:滚动的时间
			@param easing:滚动时的缓冲模式
			@param callback:回调函数
		   */
		   /*
		    @param c:滚动的距离
			@param d:滚动的时间
			@param b:滚动时的初始距离
		   */
		   var tw=easing || function(t,b,c,d){
			  if ((t/=d/2) < 1) return c/2*t*t + b;
			  return -c/2 * ((--t)*(t-2) - 1) + b;
		   },
		   t=0,
		   pos=props.toString().split(':'),
		   b=parseInt(elem.style[pos[0]]) || 0,//初始位置
		   c=parseInt(pos[1])-b;//滚动的距离
		   if(c===0) return false;
		   if(elem.time) clearTimeout(elem.time);
		   var js=new Date().getTime();
		   new function(){
			 elem.style[pos[0]] =Math.ceil(tw(t,b,c,d))+'px';
			 if(t<d){
				 t++;
				 elem.time=setTimeout(arguments.callee,10);
			   }else{
				 jsdiv.innerHTML=new Date().getTime()-js;
				 callback &&Object.prototype.toString.call(callback)=='[object Function]' && callback()
			 }
		   };
	  };