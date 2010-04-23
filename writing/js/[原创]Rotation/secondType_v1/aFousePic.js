/*=======Author:louxiaojian=========*/
/*===========Version:2.0===========*/
/*===E-mail:louxiaojian@gmail.com===*/
function aFousePic(nId,nTag,mId,mTag,textDes,final_x,final_y){
 if(!document.getElementById(nId)||!document.getElementById(mId)) return false;
 this.aNavTag=document.getElementById(nId).getElementsByTagName(nTag);
 this.oMain=document.getElementById(mId);
 this.aMainTag=this.oMain.getElementsByTagName(mTag);
 this.final_x=final_x;
 this.final_y=final_y;
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
}
aFousePic.prototype={
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
			   this.moveElementFun(obj.cNub*this.final_x,obj.cNub*this.final_y,this.sets.interval);
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
	moveElement:function(final_x,final_y,interval) {
	  if (!this.oMain.style.left) {
		this.oMain.style.left = "0px";
	  }
	  if (!this.oMain.style.top) {
		this.oMain.style.top = "0px";
	  }
	  var xpos = parseInt(this.oMain.style.left);
	  var ypos = parseInt(this.oMain.style.top);
	  if (xpos == final_x && ypos == final_y) {
	   if(this.moveTime){clearInterval(this.moveTime)};return true;
	  }
	  if (xpos < final_x) {
		var dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
	  }
	  if (xpos > final_x) {
		var dist = Math.ceil((xpos - final_x)/10);
		xpos = xpos - dist;
	  }
	  if (ypos < final_y) {
		var dist = Math.ceil((final_y - ypos)/10);
		ypos = ypos + dist;
	  }
	  if (ypos > final_y) {
		var dist = Math.ceil((ypos - final_y)/10);
		ypos = ypos - dist;
	  }
	  this.oMain.style.left = xpos + "px";
	  this.oMain.style.top = ypos + "px";
	},
	moveElementFun:function(final_x,final_y,interval){
	 if(this.moveTime){clearInterval(this.moveTime)}
	 this.moveTime=setInterval(this.Bind(this,function(){this.moveElement(final_x,final_y,interval)}),5)
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
		  this.oMain.style.top=this.sets.indexNub*this.final_y+"px";
		  this.oMain.style.left=this.sets.indexNub*this.final_x+"px";
		  for(var n=0;n<this.aNtag.length;n++){
				this.aNtag[n].cNub=n;
				if(this.aNtag[n].getElementsByTagName("a")[0]){
					this.aNtag[n].getElementsByTagName("a")[0].onfocus=function(){this.blur()};
				    if(this.sets.evt==0){this.aNtag[n].getElementsByTagName("a")[0].onclick=function(){return false};}
				}
				if(this.aNtag[n].tagName.toLocaleLowerCase()=="a"){this.aNtag[n].onfocus=function(){this.blur()};};
				this.aNtag[n][this.eventType[this.sets.evt]]=function(){
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