function Rotation(a,c,b){if(!this.G(a)){return false}if(!this.G(a).getElementsByTagName(c)){return false}if(this.G(a).getElementsByTagName(c).length<=1){return false}this.set(b);this.roll=Math.abs(this.s.rollDis);this.oMain=this.G(a);this.aMainTag=this.oMain.getElementsByTagName(c);this.eventType=["click","mouseover"];if(this.s.nId&&this.s.nTag){this.aNavTag=this.G(this.s.nId).getElementsByTagName(this.s.nTag)}if(this.s.text&&this.s.textTag){this.aText=this.G(this.s.text).getElementsByTagName(this.s.textTag)}this.aMtag=[];this.run()}Rotation.prototype={B:function(c,a){var b=Array.prototype.slice.call(arguments).slice(2);return function(){return a.apply(c,b)}},G:function(a){return document.getElementById(a)},E:function(a,c){for(var b in c){a[b]=c[b]}},pre:function(a){if(a.preventDefault){a.preventDefault()}else{a.returnValue=false}},aE:function(b,c,a){if(b.addEventListener){b.addEventListener(c,a,false)}else{if(b.attachEvent){b.attachEvent("on"+c,a)}else{b["on"+c]=a}}},set:function(a){this.s={evt:0,index:0,auto:[0,2000],cur:"cur",intTabTime:50,interval:50,dis:["top"],nId:false,rollDis:0,nTag:false,text:false,textTag:false,Tween:function(f,e,h,g){return -h*((f=f/g-1)*f*f*f-1)+e},callBack:function(){}};this.E(this.s,a||{})},action:function(a){this.TabLi(a);this.TabText(a);if(this.roll){this.n=a;this.t=0;this.b=parseInt(this.oMain.style[this.s.dis]);this.c=-this.n*this.roll-this.b;this.Move()}this.TabChange(a);this.s.callBack()},autoplay:function(a){if(a){this.s.index=(this.s.index<this.aMtag.length-1)?this.s.index+1:0}else{this.s.index=(this.s.index!=0)?this.s.index-1:this.aMtag.length-1}this.action(this.s.index)},autoFun:function(){if(this.intAuto){clearInterval(this.intAuto)}this.intAuto=setInterval(this.B(this,this.autoplay,1),this.s.auto[1]);this.key=0},clearAuto:function(){clearInterval(this.intAuto);this.key=1},autoKey:function(){this.autoFun();for(var a=0;a<this.aMtag.length;a++){if(this.intAuto){if(this.aNtag){if(this.s.evt==0){this.aE(this.aNtag[a],"mouseover",this.B(this,function(b){if(b.className.indexOf(this.s.cur)!=-1&&this.key==0){this.clearAuto()}},this.aNtag[a]))}this.aE(this.aNtag[a],"mouseout",this.B(this,function(){if(this.key==1){this.autoFun()}if(this.intTab){clearTimeout(this.intTab)}}))}this.aE(this.aMtag[a],"mouseover",this.B(this,function(){this.clearAuto()}));this.aE(this.aMtag[a],"mouseout",this.B(this,function(){this.autoFun()}))}}},TabLi:function(a){if(this.lLi&&this.aNtag[a]){this.lLi.className=this.lLi.className.replace(this.s.cur,"");if(this.aNtag[a].className.indexOf(this.s.cur)==-1){this.aNtag[a].className+=" "+this.s.cur}this.lLi=this.aNtag[a]}},TabText:function(a){if(this.aText){this.lText.style.display="none";this.aText[a].style.display="block";this.lText=this.aText[a]}},TabChange:function(a){if(!this.roll){if(this.lDiv&&this.lDiv!=this.aMtag[a]){this.lDiv.style.display="none"}this.aMtag[a].style.display="block";this.lDiv=this.aMtag[a]}},Move:function(){if(!this.roll||!this.c){return false}if(this.moveTime){clearTimeout(this.moveTime)}this.oMain.style[this.s.dis]=Math.round(this.s.Tween(this.t,this.b,this.c,this.s.interval))+"px";if(this.t<this.s.interval){this.t++;this.moveTime=setTimeout(this.B(this,this.Move),10)}},aNtagAct:function(a){if(this.lLi==a){return false}if(this.intTab){clearTimeout(this.intTab)}this.intTab=setTimeout(this.B(this,function(){if(this.intAuto){this.clearAuto()}this.s.index=a.cNub;this.action(a.cNub)}),this.s.intTabTime);return false},run:function(){for(var c=0;c<this.aMainTag.length;c++){if(this.aMainTag[c].parentNode==this.oMain&&!this.aMainTag[c].getAttribute("lang")){this.aMtag.push(this.aMainTag[c])}}if(this.aNavTag){this.aNtag=[];for(var b=0;b<this.aNavTag.length;b++){if(!this.aNavTag[b].getAttribute("lang")){this.aNtag.push(this.aNavTag[b])}}if(this.aMtag.length!=this.aNtag.length){alert("\u9009\u9879\u5361\u5bfc\u822a\u548c\u4e3b\u4f53\u7684\u6570\u91cf\u4e0d\u4e00\u6837");return false}if(this.aNtag[this.s.index].className.indexOf(this.s.cur)==-1){this.aNtag[this.s.index].className+=" "+this.s.cur}this.lLi=this.aNtag[this.s.index]}else{this.aNtag=null}this.lDiv=this.aMtag[this.s.index];if(this.aText){this.lText=this.aText[this.s.index];this.lText.style.display="block"}if(this.roll){this.oMain.style[this.s.dis]=-this.s.index*this.roll+"px"}if(this.aNtag){for(var d=0;d<this.aNtag.length;d++){this.aNtag[d].cNub=d;var a=this.aNtag[d].getElementsByTagName("a")[0];if(a){this.aE(a,"focus",this.B(this,function(e){e.blur()},a));if(this.s.evt==0){this.aE(a,"click",this.pre)}}if(this.aNtag[d].tagName.toLocaleLowerCase()=="a"){this.aE(this.aNtag[d],"focus",this.B(this,function(e){e.blur()},this.aNtag[d]));if(this.s.evt==0){this.aE(this.aNtag[d],"click",this.pre)}}this.aE(this.aNtag[d],this.eventType[this.s.evt],this.B(this,function(e){this.aNtagAct(e)},this.aNtag[d]));if(this.s.auto[0]!=1){this.aE(this.aNtag[d],"mouseout",this.B(this,function(){if(this.intTab){clearTimeout(this.intTab)}}))}}}if(this.s.auto[0]==1){this.autoKey()}}};