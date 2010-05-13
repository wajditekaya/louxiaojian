//by louxiaojian
function $(d){return document.getElementById(d);}
function focusPic(bigPic,smallPicList,qian,hou,smallPicNub,indexNub,cur){
	this.bigPicId=$(bigPic);
	this.smallPicListId=$(smallPicList);
	this.qianId=$(qian);
	this.houId=$(hou);
	this.smallPicNub=smallPicNub;
	this.indexNub=indexNub;
	this.cur=cur;
	this.picInfo=[];
	this.aLi=[];
	this.LOR=1;
	this.yu=0;
	_this=this;
}
focusPic.prototype.createhtml=function(){
 this.img_link=document.createElement("a");
 this.text_link=document.createElement("a");
 this.bigImg=document.createElement("img");
 var p=document.createElement("p");
 this.img_link.setAttribute("href",this.picInfo[this.indexNub].pHref);
 this.img_link.setAttribute("target","_blank");
 this.text_link.setAttribute("href",this.picInfo[this.indexNub].pHref);
 this.text_link.setAttribute("target","_blank");
 this.bigImg.setAttribute("src",this.picInfo[this.indexNub].pSrc);
 this.bigImg.setAttribute("alt","");
 this.img_link.appendChild(this.bigImg);
 this.picText=document.createTextNode(this.picInfo[this.indexNub].pText);
 this.text_link.appendChild(this.picText);
 p.appendChild(this.text_link);
 this.bigPicId.appendChild(this.img_link);
 this.bigPicId.appendChild(p);
 var oFragmen=document.createDocumentFragment();
 var _li,_liImg,_liWidth;
 for(var i=0;i<this.picInfo.length;i++){
  _li=document.createElement("li");
  _liImg=document.createElement("img");
  if(i==this.indexNub){_li.className+=" "+this.cur;this.indexCur=_li;}
  _liImg.setAttribute("src",this.picInfo[i].pSrc);
  _li.appendChild(_liImg);
  this.aLi.push(_li);
  _li.ui=i;
  _li.onclick=function(){clearInterval(_this.oAutoPlay);_this.change(this,this.ui);_this.clickNub=this.ui;}
  _li.onmouseover=function(){if(this.className.indexOf(_this.cur)!=-1){clearInterval(_this.oAutoPlay);}}
  _li.onmouseout=function(){if(this.className.indexOf(_this.cur)!=-1){_this.oAutoPlay=setInterval(_this.auto,3000);}}
  oFragmen.appendChild(_li);
 }
 this.smallPicListId.appendChild(oFragmen);
 this.smallPicListId.style.width=this.aLi[0].offsetWidth*(this.picInfo.length)+"px";
}
focusPic.prototype.marquee=function(){
  $("smallPic").scrollLeft=$("smallPic").scrollLeft+(_this.aLi[0].offsetWidth*(parseInt(_this.smallPicNub)-1)*_this.LOR/19);
  _this.yu++;
  if(_this.yu==19||$("smallPic").scrollLeft>=$("smallPic").scrollWidth){_this.yu=0;clearInterval(_this.marqueed)}
}
focusPic.prototype.l_r_click=function(){
 this.houId.onclick=function(){
	 _this.LOR=1;
	  clearInterval(_this.marqueed);
	 _this.marqueed=setInterval(_this.marquee,1);
	 }
 this.qianId.onclick=function(){
	 _this.LOR=-1;
	  clearInterval(_this.marqueed);
	 _this.marqueed=setInterval(_this.marquee,1);
	 }
}
focusPic.prototype.change=function(obj,nub){
  if(this.indexCur!=obj){this.indexCur.className=this.indexCur.className.replace(this.cur,"")}
  if(obj.className.indexOf(this.cur)==-1){obj.className+=" "+_this.cur;}
  this.indexCur=obj;
  if(nub!=0&&nub%(parseInt(this.smallPicNub)-1)==0){this.marqueed=setInterval(this.marquee,1);}
  if(nub==(parseInt(this.picInfo.length)-1)){setTimeout(function(){$("smallPic").scrollLeft=0},3000)}
  this.img_link.setAttribute("href",this.picInfo[nub].pHref);
  this.bigImg.setAttribute("src",this.picInfo[nub].pSrc);
  this.text_link.setAttribute("href",this.picInfo[nub].pHref);
  this.text_link.innerHTML=this.picInfo[nub].pText;
}
focusPic.prototype.autoPlay=function(){
 var j=parseInt(this.indexNub)+1;
 this.auto=function(){
 if(_this.clickNub!=null){
	 if(_this.clickNub==_this.aLi.length-1){j=0}else{j=_this.clickNub+1;}
	  _this.clickNub=null;
                          }
 _this.change(_this.aLi[j],j);
 j = (j<_this.picInfo.length-1) ? j+1 :0;
 }
 this.oAutoPlay=setInterval(this.auto,3000);
 this.bigPicId.onmouseover=function(){clearInterval(_this.oAutoPlay);}
 this.bigPicId.onmouseout=function(){_this.oAutoPlay=setInterval(_this.auto,3000);}
}
focusPic.prototype.pAction=function(){
  this.createhtml();
  this.autoPlay();
  this.l_r_click();
  }
