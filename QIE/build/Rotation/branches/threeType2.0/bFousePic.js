/*=======Author:louxiaojian=========*/
/*===========Version:2.1===========*/
/*===E-mail:louxiaojian@gmail.com===*/
function bFousePic(mId,mTag,set){
 if(!document.getElementById(mId)) return false;
 if(!document.getElementById(mId).getElementsByTagName(mTag)) return false;
 if(document.getElementById(mId).getElementsByTagName(mTag).length<=1) return false;
 this.set(set);
 this.oMain=document.getElementById(mId);
 this.aMainTag=this.oMain.getElementsByTagName(mTag);
 this.eventType=["click","mouseover"];
 if(this.sets.nId&&this.sets.nTag){this.aNavTag=document.getElementById(this.sets.nId).getElementsByTagName(this.sets.nTag);}
 if(this.sets.textDes&&this.sets.textDesTag){this.aTextDes=document.getElementById(this.sets.textDes).getElementsByTagName(this.sets.textDesTag);}
 this.aMtag=[];
 this.sz=0;
 this.run();
}
bFousePic.prototype={
    Bind:function(object, fun) {
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
	preventDefault:function(evt){
		if (evt.preventDefault) {
			evt.preventDefault();
		}
		else {
			evt.returnValue = false;
		}
	},  
    addEventHandler:function(oTarget, sEventType, fnHandler) {
	  if (oTarget.addEventListener) {
		  oTarget.addEventListener(sEventType, fnHandler, false);
	  } else if (oTarget.attachEvent) {
		  oTarget.attachEvent("on" + sEventType, fnHandler);
	  } else {
		  oTarget["on" + sEventType] = fnHandler;
	  }
    },
    set:function(s){
	  this.sets={
		  evt:0,
		  indexNub:0,
		  auto:[0,2000],
		  curClass:"cur",
		  intTabTime:50,
		  interval:5,
		  nId:false,
		  nTag:false,
		  textDes:false,
		  textDesTag:false,
		  callBack:function(){}
	    }
		this.Extend(this.sets,s||{})
	},
	tabAction:function(n){
		   if(this.lastLi&&this.aNtag){
			   this.lastLi.className=this.lastLi.className.replace(this.sets.curClass,"");
			   if(this.aNtag[n].className.indexOf(this.sets.curClass)==-1){this.aNtag[n].className+=" "+this.sets.curClass;}
			   this.lastLi=this.aNtag[n];
			 }
			if(this.aTextDes){
				 this.lastTextDes.style.display="none";
				 this.aTextDes[n].style.display="block";
				 this.lastTextDes=this.aTextDes[n];
			 };
			 this.lastDiv.style.zIndex=100;
			 this.curDiv=this.aMtag[n];
			 this.curDiv.style.display="block";
			 this.alphaIni(this.curDiv);
			 this.alphaFun(this.curDiv,this.lastDiv,1);
			 this.lastDiv=this.curDiv;
			 this.sets.callBack();
		 },
   autoplay:function(m)
         {
		  if(m){this.sets.indexNub = (this.sets.indexNub<this.aMtag.length-1) ? this.sets.indexNub+1 :0;}
		  else{this.sets.indexNub = (this.sets.indexNub!=0) ? this.sets.indexNub-1 :this.aMtag.length-1;}
		  this.tabAction(this.sets.indexNub);
   },
   autoFun:function(){if(this.intAuto){clearInterval(this.intAuto)};this.intAuto=setInterval(this.Bind(this,this.autoplay,1),this.sets.auto[1]);this.key=0;},
   clearAuto:function(){clearInterval(this.intAuto);this.key=1;},
   autoKey:function(){
    this.autoFun();
    for(var m=0;m<this.aMtag.length;m++){
	if(this.intAuto){
	    if(this.aNtag){
    		if(this.sets.evt==0){
				this.addEventHandler(this.aNtag[m],"mouseover",this.Bind(this,function(o){
    				if(o.className.indexOf(this.sets.curClass)!=-1&&this.key==0){this.clearAuto()};
    		     },this.aNtag[m]));
    		};
			this.addEventHandler(this.aNtag[m],"mouseout",this.Bind(this,function(){if(this.key==1){this.autoFun();};if(this.intTab){clearTimeout(this.intTab)};}));
		};
		this.addEventHandler(this.aMtag[m],"mouseover",this.Bind(this,function(){this.clearAuto()}));
		this.addEventHandler(this.aMtag[m],"mouseout",this.Bind(this,function(){this.autoFun()}));
       }
	  }
    },
   alpha:function(cur,pre,j){
	 this.sz=this.sz+2*j;
	 cur.style.filter="alpha(opacity="+this.sz+")";
	 cur.style.MozOpacity=this.sz/100;
	 cur.style.opacity=this.sz/100;
	 this.szo=100-this.sz;
	 pre.style.filter="alpha(opacity="+this.szo+")";
	 pre.style.MozOpacity=this.szo/100;
	 pre.style.opacity=this.szo/100;
	 if(this.sz==100){if(this.alphaTime){clearInterval(this.alphaTime)};pre.style.display="none";pre.style.zIndex=0;cur.style.zIndex=100;this.sz=0;return false;}
	},
	alphaIni:function(obj){
	 obj.style.filter="alpha(opacity=0)";
	 obj.style.MozOpacity=0;
	 obj.style.opacity=0;
	},
 	alphaFun:function(cur,pre,j){
	 if(this.alphaTime){clearInterval(this.alphaTime);}
	 this.alphaTime=setInterval(this.Bind(this,this.alpha,cur,pre,j),5)
	},
  aNtagAct:function(o){
	    if(this.lastLi==o){return false}
		if(this.intTab){clearTimeout(this.intTab)}
		this.intTab=setTimeout(this.Bind(this,function(){
		  if(this.intAuto){this.clearAuto()};
		  this.sets.indexNub=o.cNub;
		  this.tabAction(o.cNub);
		}),
		this.sets.intTabTime);
		return false;
   },
   run:function(){
		  for(var i=0;i<this.aMainTag.length;i++){if(this.aMainTag[i].parentNode==this.oMain){this.aMtag.push(this.aMainTag[i]);}}
		  if(this.aNavTag){
			this.aNtag=[]
		    for(var j=0;j<this.aNavTag.length;j++){if(!this.aNavTag[j].getAttribute("lang")){this.aNtag.push(this.aNavTag[j]);}}
		    if(this.aMtag.length!=this.aNtag.length){alert("选项卡导航和主体的数量不一样");return false}
			if(this.aNtag[this.sets.indexNub].className.indexOf(this.sets.curClass)==-1){this.aNtag[this.sets.indexNub].className+=" "+this.sets.curClass;}
			this.lastLi=this.aNtag[this.sets.indexNub];
		  }else{this.aNtag=null};
		  if(this.aTextDes){
		     this.lastTextDes=this.aTextDes[this.sets.indexNub];
		     this.lastTextDes.style.display="block";
		  };
		  this.lastDiv=this.aMtag[this.sets.indexNub];
		  if(this.aNtag){
			  for(var n=0;n<this.aNtag.length;n++){
					if(n!=this.sets.indexNub){this.aMtag[n].style.display="none"}
					this.aNtag[n].cNub=n;
					var aTag=this.aNtag[n].getElementsByTagName("a")[0];
					if(aTag){
						this.addEventHandler(aTag,"focus",this.Bind(this,function(p){p.blur()},aTag));
						if(this.sets.evt==0){this.addEventHandler(aTag,"click",this.preventDefault);}
					};
					if(this.aNtag[n].tagName.toLocaleLowerCase()=="a"){
						this.addEventHandler(this.aNtag[n],"focus",this.Bind(this,function(q){q.blur()},this.aNtag[n]));
						if(this.sets.evt==0){this.addEventHandler(this.aNtag[n],"click",this.preventDefault)}
					};
				   this.addEventHandler(this.aNtag[n],this.eventType[this.sets.evt],this.Bind(this,function(o){this.aNtagAct(o)},this.aNtag[n]))
				   if(this.sets.auto[0]!=1){
				   this.addEventHandler(this.aNtag[n],"mouseout",this.Bind(this,function(){if(this.intTab){clearTimeout(this.intTab)}}));
				   };
				   
				 }
		  };
		if(this.sets.auto[0]==1){this.autoKey();}

   }
 
}