function aFousePic(c,e,b,a,d){if(!document.getElementById(c)){return false}if(!document.getElementById(c).getElementsByTagName(e)){return false}if(document.getElementById(c).getElementsByTagName(e).length<=1){return false}this.set(d);this.oMain=document.getElementById(c);this.aMainTag=this.oMain.getElementsByTagName(e);this.final_x=b;this.final_y=a;this.eventType=["click","mouseover"];if(this.sets.nId&&this.sets.nTag){this.aNavTag=document.getElementById(this.sets.nId).getElementsByTagName(this.sets.nTag)}if(this.sets.textDes&&this.sets.textDesTag){this.aTextDes=document.getElementById(this.sets.textDes).getElementsByTagName(this.sets.textDesTag)}this.aMtag=[];this.run()}aFousePic.prototype={Bind:function(c,a){var b=Array.prototype.slice.call(arguments).slice(2);return function(){return a.apply(c,b)}},Extend:function(a,c){for(var b in c){a[b]=c[b]}},preventDefault:function(a){if(a.preventDefault){a.preventDefault()}else{a.returnValue=false}},addEventHandler:function(b,c,a){if(b.addEventListener){b.addEventListener(c,a,false)}else{if(b.attachEvent){b.attachEvent("on"+c,a)}else{b["on"+c]=a}}},set:function(a){this.sets={evt:0,indexNub:0,auto:[0,2000],curClass:"cur",intTabTime:50,interval:5,nId:false,nTag:false,textDes:false,textDesTag:false,callBack:function(){}};this.Extend(this.sets,a||{})},tabAction:function(a){if(this.lastLi&&this.aNtag[a]){this.lastLi.className=this.lastLi.className.replace(this.sets.curClass,"");if(this.aNtag[a].className.indexOf(this.sets.curClass)==-1){this.aNtag[a].className+=" "+this.sets.curClass}this.lastLi=this.aNtag[a]}if(this.aTextDes){this.lastTextDes.style.display="none";this.aTextDes[a].style.display="block";this.lastTextDes=this.aTextDes[a]}this.moveElementFun(a*this.final_x,a*this.final_y,this.sets.interval);this.sets.callBack()},autoplay:function(a){if(a){this.sets.indexNub=(this.sets.indexNub<this.aMtag.length-1)?this.sets.indexNub+1:0}else{this.sets.indexNub=(this.sets.indexNub!=0)?this.sets.indexNub-1:this.aMtag.length-1}this.tabAction(this.sets.indexNub)},autoFun:function(){if(this.intAuto){clearInterval(this.intAuto)}this.intAuto=setInterval(this.Bind(this,this.autoplay,1),this.sets.auto[1]);this.key=0},clearAuto:function(){clearInterval(this.intAuto);this.key=1},autoKey:function(){this.autoFun();for(var a=0;a<this.aMtag.length;a++){if(this.intAuto){if(this.aNtag){if(this.sets.evt==0){this.addEventHandler(this.aNtag[a],"mouseover",this.Bind(this,function(b){if(b.className.indexOf(this.sets.curClass)!=-1&&this.key==0){this.clearAuto()}},this.aNtag[a]))}this.addEventHandler(this.aNtag[a],"mouseout",this.Bind(this,function(){if(this.key==1){this.autoFun()}if(this.intTab){clearTimeout(this.intTab)}}))}this.addEventHandler(this.aMtag[a],"mouseover",this.Bind(this,function(){this.clearAuto()}));this.addEventHandler(this.aMtag[a],"mouseout",this.Bind(this,function(){this.autoFun()}))}}},moveElement:function(d,c,b){if(!this.oMain.style.left){this.oMain.style.left="0px"}if(!this.oMain.style.top){this.oMain.style.top="0px"}var a=parseInt(this.oMain.style.left);var f=parseInt(this.oMain.style.top);if(a==d&&f==c){if(this.moveTime){clearInterval(this.moveTime)}return true}if(a<d){var e=Math.ceil((d-a)/10);a=a+e}if(a>d){var e=Math.ceil((a-d)/10);a=a-e}if(f<c){var e=Math.ceil((c-f)/10);f=f+e}if(f>c){var e=Math.ceil((f-c)/10);f=f-e}this.oMain.style.left=a+"px";this.oMain.style.top=f+"px"},moveElementFun:function(c,b,a){if(this.moveTime){clearInterval(this.moveTime)}this.moveTime=setInterval(this.Bind(this,function(){this.moveElement(c,b,a)}),5)},aNtagAct:function(a){if(this.lastLi==a){return false}if(this.intTab){clearTimeout(this.intTab)}this.intTab=setTimeout(this.Bind(this,function(){if(this.intAuto){this.clearAuto()}this.sets.indexNub=a.cNub;this.tabAction(a.cNub)}),this.sets.intTabTime);return false},run:function(){for(var c=0;c<this.aMainTag.length;c++){if(this.aMainTag[c].parentNode==this.oMain){this.aMtag.push(this.aMainTag[c])}}if(this.aNavTag){this.aNtag=[];for(var b=0;b<this.aNavTag.length;b++){if(!this.aNavTag[b].getAttribute("lang")){this.aNtag.push(this.aNavTag[b])}}if(this.aMtag.length!=this.aNtag.length){alert("\u9009\u9879\u5361\u5bfc\u822a\u548c\u4e3b\u4f53\u7684\u6570\u91cf\u4e0d\u4e00\u6837");return false}if(this.aNtag[this.sets.indexNub].className.indexOf(this.sets.curClass)==-1){this.aNtag[this.sets.indexNub].className+=" "+this.sets.curClass}this.lastLi=this.aNtag[this.sets.indexNub]}else{this.aNtag=null}if(this.aTextDes){this.lastTextDes=this.aTextDes[this.sets.indexNub];this.lastTextDes.style.display="block"}this.oMain.style.top=this.sets.indexNub*this.final_y+"px";this.oMain.style.left=this.sets.indexNub*this.final_x+"px";if(this.aNtag){for(var d=0;d<this.aNtag.length;d++){this.aNtag[d].cNub=d;var a=this.aNtag[d].getElementsByTagName("a")[0];if(a){this.addEventHandler(a,"focus",this.Bind(this,function(e){e.blur()},a));if(this.sets.evt==0){this.addEventHandler(a,"click",this.preventDefault)}}if(this.aNtag[d].tagName.toLocaleLowerCase()=="a"){this.addEventHandler(this.aNtag[d],"focus",this.Bind(this,function(e){e.blur()},this.aNtag[d]));if(this.sets.evt==0){this.addEventHandler(this.aNtag[d],"click",this.preventDefault)}}this.addEventHandler(this.aNtag[d],this.eventType[this.sets.evt],this.Bind(this,function(e){this.aNtagAct(e)},this.aNtag[d]));if(this.sets.auto[0]!=1){this.addEventHandler(this.aNtag[d],"mouseout",this.Bind(this,function(){if(this.intTab){clearTimeout(this.intTab)}}))}}}if(this.sets.auto[0]==1){this.autoKey()}}};