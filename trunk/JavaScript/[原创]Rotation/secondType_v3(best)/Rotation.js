/*=======Author:louxiaojian=========*/
/*===========Version:3.0===========*/
/*===E-mail:louxiaojian@gmail.com===*/
function Rotation(mId,mTag,set){
 if(!this.G(mId)) return false;
 if(!this.G(mId).getElementsByTagName(mTag)) return false;
 if(this.G(mId).getElementsByTagName(mTag).length<=1) return false;
 this.set(set);
 this.roll=Math.abs(this.s.rollDis);
 this.oMain=this.G(mId);
 this.aMainTag=this.oMain.getElementsByTagName(mTag);
 this.eventType=['click','mouseover'];
 if(this.s.nId&&this.s.nTag){this.aNavTag=this.G(this.s.nId).getElementsByTagName(this.s.nTag);}
 if(this.s.text&&this.s.textTag){this.aText=this.G(this.s.text).getElementsByTagName(this.s.textTag);}
 this.aMtag=[];
 this.run();
}
Rotation.prototype={
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
		  interval:50,
		  dis:['top'],
		  nId:false,
		  rollDis:0,
		  nTag:false,
		  text:false,
		  textTag:false,
		  Tween:function(t,b,c,d){return -c * ((t=t/d-1)*t*t*t - 1) + b},
		  callBack:function(){}
	    }
		this.E(this.s,s||{})
	},
   action:function(n){
            this.TabLi(n);
			this.TabText(n);
			if(this.roll){
				this.n=n;
				this.t=0;
				this.b=parseInt(this.oMain.style[this.s.dis]);
				this.c=-this.n*this.roll-this.b;
				this.Move();
			}
			this.TabChange(n);
			this.s.callBack();
	},
   autoplay:function(m)
         {
		  if(m){this.s.index = (this.s.index<this.aMtag.length-1) ? this.s.index+1 :0;}
		  else{this.s.index = (this.s.index!=0) ? this.s.index-1 :this.aMtag.length-1;}
		  this.action(this.s.index);
    },
   autoFun:function(){if(this.intAuto){clearInterval(this.intAuto)};this.intAuto=setInterval(this.B(this,this.autoplay,1),this.s.auto[1]);this.key=0;},
   clearAuto:function(){clearInterval(this.intAuto);this.key=1;},
   autoKey:function(){
    this.autoFun();
    for(var m=0;m<this.aMtag.length;m++){
	if(this.intAuto){
	    if(this.aNtag){
    		if(this.s.evt==0){
				this.aE(this.aNtag[m],'mouseover',this.B(this,function(o){
    				if(o.className.indexOf(this.s.cur)!=-1&&this.key==0){this.clearAuto()};
    		     },this.aNtag[m]));
    		};
			this.aE(this.aNtag[m],"mouseout",this.B(this,function(){if(this.key==1){this.autoFun();};if(this.intTab){clearTimeout(this.intTab)};}));
		};
		this.aE(this.aMtag[m],'mouseover',this.B(this,function(){this.clearAuto()}));
		this.aE(this.aMtag[m],"mouseout",this.B(this,function(){this.autoFun()}));
       }
	  }
    },
  TabLi:function(n){
	   if(this.lLi&&this.aNtag[n]){
		   this.lLi.className=this.lLi.className.replace(this.s.cur,"");
		   if(this.aNtag[n].className.indexOf(this.s.cur)==-1){this.aNtag[n].className+=" "+this.s.cur;}
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
	     if(!this.roll){
			 if(this.lDiv&&this.lDiv!=this.aMtag[n]){this.lDiv.style.display="none"}
			 this.aMtag[n].style.display="block";
			 this.lDiv=this.aMtag[n];
		 }
  },
  Move:function(){
		if(!this.roll || !this.c){return false}
		if(this.moveTime){clearTimeout(this.moveTime)}
		this.oMain.style[this.s.dis]=Math.round(this.s.Tween(this.t,this.b,this.c,this.s.interval))+"px";
		if(this.t<this.s.interval){this.t++;this.moveTime=setTimeout(this.B(this,this.Move),10)}
    },
  aNtagAct:function(o){
	  	if(this.lLi==o){return false}
		if(this.intTab){clearTimeout(this.intTab)}
		this.intTab=setTimeout(this.B(this,function(){
		  if(this.intAuto){this.clearAuto()};
		  this.s.index=o.cNub;
		  this.action(o.cNub);
		}),
		this.s.intTabTime);
		return false;
   },
   run:function(){
		  for(var i=0;i<this.aMainTag.length;i++){if(this.aMainTag[i].parentNode==this.oMain && !this.aMainTag[i].getAttribute("lang")){this.aMtag.push(this.aMainTag[i]);}}
		  if(this.aNavTag){
			this.aNtag=[]
		    for(var j=0;j<this.aNavTag.length;j++){if(!this.aNavTag[j].getAttribute("lang")){this.aNtag.push(this.aNavTag[j]);}}
		    if(this.aMtag.length!=this.aNtag.length){alert("选项卡导航和主体的数量不一样");return false}
			if(this.aNtag[this.s.index].className.indexOf(this.s.cur)==-1){this.aNtag[this.s.index].className+=" "+this.s.cur;}
			this.lLi=this.aNtag[this.s.index];
		  }else{this.aNtag=null};
		  this.lDiv=this.aMtag[this.s.index];
		  if(this.aText){
		     this.lText=this.aText[this.s.index];
		     this.lText.style.display="block";
		  };
		  if(this.roll){this.oMain.style[this.s.dis]=-this.s.index*this.roll+"px";}
		  if(this.aNtag){
    		  for(var n=0;n<this.aNtag.length;n++){
    				this.aNtag[n].cNub=n;
					var aTag=this.aNtag[n].getElementsByTagName("a")[0];
    				if(aTag){
    					this.aE(aTag,"focus",this.B(this,function(p){p.blur()},aTag));
						if(this.s.evt==0){this.aE(aTag,'click',this.pre);}
    				};
    				if(this.aNtag[n].tagName.toLocaleLowerCase()=="a"){
						this.aE(this.aNtag[n],"focus",this.B(this,function(q){q.blur()},this.aNtag[n]));
						if(this.s.evt==0){this.aE(this.aNtag[n],'click',this.pre)}
						};
    			   this.aE(this.aNtag[n],this.eventType[this.s.evt],this.B(this,function(o){this.aNtagAct(o)},this.aNtag[n]))
    			   if(this.s.auto[0]!=1){
    			     this.aE(this.aNtag[n],"mouseout",this.B(this,function(){if(this.intTab){clearTimeout(this.intTab)}}));
    			   };
    			 }
			}; 
			if(this.s.auto[0]==1){this.autoKey();}
    }
 
}
