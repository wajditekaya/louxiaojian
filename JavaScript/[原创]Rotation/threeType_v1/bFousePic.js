/*=======Author:louxiaojian=========*/
/*===========Version:2.0===========*/
/*===E-mail:louxiaojian@gmail.com===*/
function bFousePic(nId,nTag,mId,mTag,textDes){
 if(!document.getElementById(nId)||!document.getElementById(mId)) return false;
 this.aNavTag=document.getElementById(nId).getElementsByTagName(nTag);
 this.oMain=document.getElementById(mId);
 this.aMainTag=this.oMain.getElementsByTagName(mTag);
 this.eventType=["onclick","onmouseover"];
 this.sets={
	  evt:0,
	  indexNub:0,
	  auto:[0,2000],
	  curClass:"cur",
	  intTabTime:50,
	  interval:5,
	  textDesTag:"li"
	  }
 this.aTextDes=document.getElementById(textDes).getElementsByTagName(this.sets.textDesTag);
 this.aNtag=[];this.aMtag=[];
 this.sz=0;
}
bFousePic.prototype={
    Bind:function(object, fun) {
	  var args = Array.prototype.slice.call(arguments).slice(2);
	  return function() {
		  return fun.apply(object, args);
	  }
     },
	tabAction:function(obj){
		if(obj!=this.lastLi){
			 this.lastLi.className=this.lastLi.className.replace(this.sets.curClass,"");
			 if(obj.className.indexOf(this.sets.curClass)==-1){obj.className+=" "+this.sets.curClass;}
			 this.lastLi=obj;
			 this.lastTextDes.style.display="none";
			 this.aTextDes[obj.cNub].style.display="block";
			 this.lastTextDes=this.aTextDes[obj.cNub];
			 this.lastDiv.style.zIndex=100;
			 this.curDiv=this.aMtag[obj.cNub];
			 this.curDiv.style.display="block";
			 this.alphaIni(this.curDiv);
			 this.alphaFun(this.curDiv,this.lastDiv,1);
			 this.lastDiv=this.curDiv;
			 }
		 },
   autoplay:function(m)
         {
		  if(m){this.sets.indexNub = (this.sets.indexNub<this.aNtag.length-1) ? this.sets.indexNub+1 :0;}
		  else{this.sets.indexNub = (this.sets.indexNub!=0) ? this.sets.indexNub-1 :this.aNtag.length-1;}
		  this.tabAction(this.aNtag[this.sets.indexNub]);
          },
   autoFun:function(){if(this.intAuto){clearInterval(this.intAuto)};this.intAuto=setInterval(this.Bind(this,this.autoplay,1),this.sets.auto[1]);this.key=0;},
   clearAuto:function(){clearInterval(this.intAuto);this.key=1;},
   autoKey:function(){
	var _this=this;
    this.autoFun();
    for(var m=0;m<this.aNtag.length;m++){
	if(this.intAuto){
		if(this.sets.evt==0){
			this.aNtag[m].onmouseover=function(){
				if(this.className.indexOf(_this.sets.curClass)!=-1&&_this.key==0){
					_this.clearAuto();
					}
		     }
		}
		this.aNtag[m].onmouseout=this.Bind(this,function(){if(this.key==1){this.autoFun();};if(this.intTab){clearTimeout(this.intTab)};})
		this.aMtag[m].onmouseover=this.Bind(this,function(){this.clearAuto()});this.aMtag[m].onmouseout=this.Bind(this,function(){this.autoFun();})}
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
   run:function(){
	      var _this=this;
		  for(var i=0;i<this.aMainTag.length;i++){if(this.aMainTag[i].parentNode==this.oMain){this.aMtag.push(this.aMainTag[i]);}}
		  for(var j=0;j<this.aNavTag.length;j++){if(!this.aNavTag[j].getAttribute("lang")){this.aNtag.push(this.aNavTag[j]);}}
		  if(this.aMtag.length!=this.aNtag.length){alert("选项卡导航和主体的数量不一样");}
		  if(this.aNtag[this.sets.indexNub].className.indexOf(this.sets.curClass)==-1){this.aNtag[this.sets.indexNub].className+=" "+this.sets.curClass;}
		  this.lastLi=this.aNtag[this.sets.indexNub];
		  this.lastTextDes=this.aTextDes[this.sets.indexNub];
		  this.lastTextDes.style.display="block";
		  this.lastDiv=this.aMtag[this.sets.indexNub];
		  for(var n=0;n<this.aNtag.length;n++){
			    if(n!=this.sets.indexNub){this.aMtag[n].style.display="none"}
				this.aNtag[n].cNub=n;
				if(this.aNtag[n].getElementsByTagName("a")[0]){
					this.aNtag[n].getElementsByTagName("a")[0].onfocus=function(){this.blur()};
				    if(this.sets.evt==0){this.aNtag[n].getElementsByTagName("a")[0].onclick=function(){return false};}
				}
				if(this.aNtag[n].tagName.toLocaleLowerCase()=="a"){this.aNtag[n].onfocus=function(){this.blur()};};
				this.aNtag[n][this.eventType[this.sets.evt]]=function(){
				if(_this.sz!=0){return false}
				var othis=this;
				if(_this.intTab){clearTimeout(_this.intTab)}
				_this.intTab=setTimeout(function(){
				   if(_this.intAuto){_this.clearAuto()};
				   _this.tabAction(othis);
				   _this.sets.indexNub=othis.cNub;},_this.sets.intTabTime);
				   return false;
				  }
			   if(this.sets.auto[0]!=1){this.aNtag[n].onmouseout=this.Bind(this,function(){if(this.intTab){clearTimeout(this.intTab)}})
			   };
			 }
			if(this.sets.auto[0]==1){this.autoKey();}

                }
 
}