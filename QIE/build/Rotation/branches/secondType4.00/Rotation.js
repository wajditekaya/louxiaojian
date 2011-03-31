/*=======Author:louxiaojian=========*/
/*===========Version:4.0===========*/
/*===E-mail:louxiaojian@gmail.com===*/
/*=========date:2010-05-14==========*/
function Rotation(set){
	   this.set(set);
	   this.aNtag=this.s.nTag();//返回数组
	   this.aMtag=this.s.mTag();//返回数组
	   this.aText=this.s.text();//返回数组
	   this.dis=Math.abs(this.s.slider.dis);
	   this.sbj=this.s.slider.obj;
	   if(this.sbj) this.sbj.key=1;
	   this.dir=this.s.slider.dir || this.s.dir;
	   this.Tween=this.s.slider.Tween || this.s.Tween;
	   this.de=this.s.index;
	   this.eType=['click','mouseover'];
	   this.run();
}
Rotation.prototype={
	    version:4.0,
		B:function(object, fun) {
		  var args = Array.prototype.slice.call(arguments).slice(2);
		  return function() {
			  return fun.apply(object, args);
		  }
		 },
		G:function(o){return document.getElementById(o)},
		E:function(destination, source) {
		  for (var property in source) {
			destination[property] = source[property];
		  }
		},
		pre:function(evt){
			if (evt.preventDefault) {
				evt.preventDefault();
			}
			else {
				evt.returnValue = false;
			}
		}, 
		aE:function(oTarget, sEventType, fnHandler) {
		  if (oTarget.addEventListener) {
			  oTarget.addEventListener(sEventType, fnHandler, false);
		  } else if (oTarget.attachEvent) {
			  oTarget.attachEvent("on" + sEventType, fnHandler);
		  } else {
			  oTarget["on" + sEventType] = fnHandler;
		  }
		},
		set:function(s){
		  this.s={
			  evt:0,
			  index:0,
			  auto:[0,2000],
			  cur:"cur",
			  intTabTime:50,
			  interval:500,
			  nTag:function(){},
			  mTag:function(){},
			  text:function(){},//文字数组
			  slider:{obj:null,dis:0},
			  dir:'top',
			  Tween:function(t,b,c,d){return -c * ((t=t/d-1)*t*t*t - 1) + b},
			  callBack:function(){}
			}
			this.E(this.s,s||{})
		},
		action:function(n){
				this.TabLi(n);
				this.TabText(n);
                this.dis ? this.slider(n) : this.TabChange(n);
				this.s.callBack();
		},
		autoplay:function(m){
			  if(m){this.de = (this.de<this.aMtag.length-1) ? this.de+1 :0;}
			  else{this.de = (this.de!=0) ? this.de-1 :this.aMtag.length-1;}
			  this.action(this.de);
		},
		autoFun:function(){this.clearAuto();this.intAuto=setInterval(this.B(this,this.autoplay,1),this.s.auto[1])},
		clearAuto:function(){if(this.intAuto){clearInterval(this.intAuto)}},
		TabLi:function(n){
		   if(this.lLi&&this.aNtag[n]){
			   this.lLi.className=this.lLi.className.replace(this.s.cur,"");
			   this.lLi.key=0;
			   if(this.aNtag[n].className.indexOf(this.s.cur)==-1){this.aNtag[n].className+=" "+this.s.cur;this.aNtag[n].key=1}
			   this.lLi=this.aNtag[n];
		   };
		},
		TabText:function(n){
			if(this.aText){
			   this.lText.style.display="none";
			   this.aText[n].style.display="block";
			   this.lText=this.aText[n];
			 };
		},
		TabChange:function(n){
			 if(this.lDiv&&this.lDiv!=this.aMtag[n]){this.lDiv.style.display="none"}
			 this.aMtag[n].style.display="block";
			 this.lDiv=this.aMtag[n];
		},
		slider:function(n){
			var t=0,b=parseInt(this.sbj.style[this.dir]),c=-n*this.dis-b,beginTime,tm;
			tm=c > 0 ? 'ceil' :'floor';
			this.Move=function(){
				t=new Date().getTime()-beginTime
				if(!c){return false}
				if(this.moveTime){clearTimeout(this.moveTime)}
				
				if(t<this.s.interval){
					this.sbj.style[this.dir]=Math[tm](this.Tween(t,b,c,this.s.interval))+"px";
					this.moveTime=setTimeout(this.B(this,this.Move),10)
				}else{
					this.sbj.style[this.dir]=b+c+'px';//以防计算误差，动画结束后重置位置。
				}
			};
			beginTime=new Date().getTime();
			this.Move();
		},
		clearintTab:function(){if(this.intTab){clearTimeout(this.intTab)}},
		aNtagAct:function(o){
			if(this.lLi==o){return false}
			this.clearintTab();
			this.clearAuto();
			this.intTab=setTimeout(this.B(this,function(){
			  this.de=o.cNub;
			  this.action(o.cNub);
			}),
			this.s.intTabTime);
			return this;
		},
		run:function(){
			  this.lDiv=this.aMtag[this.de];
			  this.lDiv.key=1;
			  if(this.aText){
				 this.lText=this.aText[this.de];
				 this.lText.style.display="block";
			  };
			  if(this.dis){this.sbj.style[this.dir]=-this.de*this.dis+"px";}
			  if(this.aNtag){
				  if(this.aNtag[this.de].className.indexOf(this.s.cur)==-1){this.aNtag[this.de].className+=" "+this.s.cur;this.aNtag[this.de].key=1}
				  this.lLi=this.aNtag[this.de];
				  for(var n=0,len=this.aNtag.length;n<len;n++){
						var tg=this.aNtag[n],aTag=tg.getElementsByTagName("a")[0] || tg.tagName.toLocaleLowerCase()=="a" && tg;
						tg.cNub=n;
						/*去除链接的虚线框和默认行为*/
						if(aTag){
							this.aE(aTag,"focus",this.B(this,function(p){p.blur()},aTag));
							if(this.s.evt==0){this.aE(aTag,'click',this.pre)}
						}
					   /*绑定事件*/
					   this.aE(tg,this.eType[this.s.evt],this.B(this,function(o){this.aNtagAct(o)},tg))
					   
					   if(this.s.auto[0]==1){
						   this.aE(tg,'mouseover',this.B(this,function(o){if(!o.key) return;this.clearAuto()},tg));
						   this.aE(tg,"mouseout",this.B(this,function(o){if(!o.key) return;this.autoFun();this.clearintTab()},tg));
					   }else{
						   this.aE(tg,"mouseout",this.B(this,this.clearintTab));
					   }
					   
					   
					 }
				}; 
			   /*==自动播放==*/
			   if(this.s.auto[0]==1){
				   this.autoFun()
				   for(var m=0,men=this.aMtag.length;m<men;m++){
					 var mg=this.aMtag[m];
					 this.aE(mg,'mouseover',this.B(this,this.clearAuto));
					 this.aE(mg,"mouseout",this.B(this,this.autoFun));
				   }
			  }
			   /*==自动播放==*/ 
				
		}
 
}
