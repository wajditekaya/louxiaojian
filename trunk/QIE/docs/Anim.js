	/*http://myfocus-js.googlecode.com/svn/trunk/myfocus-1.1.0.full.js
	http://myfocus-js.googlecode.com/svn/trunk/
	*/
	
	Anim={
		animate:function(obj,attr,val,dur,type,fn){
			var opa=attr==='opacity'?true:false,opacity=this.setOpa,am=typeof val==='string',st=(new Date).getTime();
			if(opa&&this.style(obj,'display')==='none') obj.style.display='block',opacity(obj,0);
			var os=this.style(obj,attr),b=isNaN(os)?1:os,c=am?val/1:val-b,d=dur||800,e=this.easing[type||'easeOut'],m=c>0?'ceil':'floor';
			if(obj[attr+'Timer']) clearInterval(obj[attr+'Timer']);
			obj[attr+'Timer']=setInterval(function(){
				var t=(new Date).getTime()-st;
				if(t<d){opa?opacity(obj,Math[m](e(t,b*100,c*100,d))):obj.style[attr]=Math[m](e(t,b,c,d))+'px';}
				else{
					clearInterval(obj[attr+'Timer']),opa?opacity(obj,(c+b)*100):obj.style[attr]=c+b+'px',
					opa&&val===0&&(obj.style.display='none'),fn&&fn.call(obj);
				}
			},13);return this;
		},
		fadeIn:function(obj,duration,fn){this.animate(obj,'opacity',1,duration==undefined?400:duration,'linear',fn);return this;},
		fadeOut:function(obj,duration,fn){this.animate(obj,'opacity',0,duration==undefined?400:duration,'linear',fn);return this;},
		slide:function(obj,params,duration,easing,fn){for(var p in params) this.animate(obj,p,params[p],duration,easing,fn);return this;},
		stop:function(obj){for(var p in obj) if(p.indexOf('Timer')!==-1) clearInterval(obj[p]);return this;},//鍋滄鎵€鏈夎繍鍔�
		easing:{
			linear:function(t,b,c,d){return c*t/d + b;},
			swing:function(t,b,c,d) {return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;},
			easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t + b;},
			easeOut:function(t,b,c,d){return -c*((t=t/d-1)*t*t*t - 1) + b;},
			easeInOut:function(t,b,c,d){return ((t/=d/2) < 1)?(c/2*t*t*t*t + b):(-c/2*((t-=2)*t*t*t - 2) + b);}
		}
	}