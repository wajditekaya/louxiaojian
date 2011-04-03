var $ = function (id) {return "string" == typeof id ? document.getElementById(id) : id;};
var Class = {
	create: function() {
		return function() { this.initialize.apply(this, arguments); }
	}
}
var Extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
}
var Bind = function(object, fun) {
	return function() {
		return fun.apply(object, arguments);
	}
}
var marque=Class.create();
marque.prototype={
	initialize:function(mp,set){
		if(!$(mp)) return false;
		if(!$(mp).parentNode) return false;
		this.marquePic = $(mp);
		this.demo =this.marquePic.parentNode;
		this.sp=1;
		this.sets(set);
		this.aLi=this.marquePic.getElementsByTagName(this.setOption.aTag);
		if(this.setOption.aTagWidth){this.marquePicWidth=this.setOption.aTagWidth*this.aLi.length;}
		else
		{
			for(var i=0;i<this.aLi.length;i++)
			{this.marquePicWidth+=this.aLi[i].offsetWidth;}
		}
		this.marquePic.style.width=2*this.marquePicWidth+"px";
		if(this.aLi.length>this.setOption.aTagNub){
		this.marquePic.innerHTML+=this.marquePic.innerHTML; 
		if(this.setOption.moren){
				this.MyMar=setInterval(Bind(this,this.Marquee),this.setOption.speed)
				this.demo.onmouseover=Bind(this,function(){clearInterval(this.MyMar)});
				this.demo.onmouseout=Bind(this,function(){this.MyMar=setInterval(Bind(this,this.Marquee),this.setOption.speed)});
		   }
		}
		else{
		  if(this.setOption.goLeft&&$(this.setOption.goLeft)){$(this.setOption.goLeft).style.display="none";};
		  if(this.setOption.goRight&&$(this.setOption.goRight)){$(this.setOption.goRight).style.display="none"};
		};
		if(this.setOption.goLeft&&$(this.setOption.goLeft)){
			with($(this.setOption.goLeft)){
				onmouseover=Bind(this,function(){this.setOption.LorR=1;});
				onmousedown=Bind(this,function(){this.spd(this.setOption.speed,4)});
				onmouseup=Bind(this,function(){this.spd(this.setOption.speed,1)});
				if(!this.setOption.moren){onmouseout=Bind(this,function(){clearInterval(this.MyMar)});}
			}
		  };
		if(this.setOption.goRight&&$(this.setOption.goRight)){
			with($(this.setOption.goRight)){
				onmouseover=Bind(this,function(){this.setOption.LorR=0;});
				onmousedown=Bind(this,function(){this.spd(this.setOption.speed,4)});
				onmouseup=Bind(this,function(){this.spd(this.setOption.speed,1)});
				if(!this.setOption.moren){onmouseout=Bind(this,function(){clearInterval(this.MyMar)});}
			}
		};
	},
	sets:function(obj){
		this.setOption={
			LorR:1,//值为1时向左滚动，0时就向右滚动
			speed:20,
			goLeft:"",
			goRight:"",
			aTagNub:4,
			aTag:"li",
			aTagWidth:"",
			moren:1//值为1时图片默认就是滚动的，0时图片默认就是静止的
		}
	    Extend(this.setOption, obj || {});
	},
	spd:function(n,s){
		this.sp=s;
		this.setOption.speed=n;
		clearInterval(this.MyMar);
		this.MyMar=setInterval(Bind(this,this.Marquee),this.setOption.speed); 
	},
	Marquee:function(){if(!this.setOption.LorR){this.MarqueeRight()}else{this.MarqueeLeft()}},
	MarqueeLeft:function(){
		with (this.demo) {
			if(scrollLeft>=this.marquePic.scrollWidth/2){ 
				scrollLeft=0;
			}else{ 
				scrollLeft+=this.sp;
			}
		}
	},
	MarqueeRight:function (){
		with (this.demo) {
			if(scrollLeft<=0){ 
				scrollLeft=this.marquePic.scrollWidth/2;
			}else{ 
				scrollLeft-=this.sp;
			}
		}
	} 	
		
}