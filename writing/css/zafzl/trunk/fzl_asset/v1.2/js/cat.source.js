function $(id) {return "string" == typeof id ? document.getElementById(id) : id;};
domReady = !+'\v1' ? function(fn){(function(){
    try{
        document.documentElement.doScroll('left');
    } catch (error){
        setTimeout(arguments.callee, 0);
        return;
    };
    fn();
})();
} : function(fn){
    document.addEventListener('DOMContentLoaded', fn, false);
};
(function(){
    function Rotation(a){this.set(a);this.aNtag=this.s.nTag();this.aMtag=this.s.mTag();this.aText=this.s.text();this.dis=Math.abs(this.s.slider.dis);this.sbj=this.s.slider.obj;if(this.sbj){this.sbj.key=1}this.dir=this.s.slider.dir||this.s.dir;this.Tween=this.s.slider.Tween||this.s.Tween;this.de=this.s.index;this.start=this.B(this,this.s.start);this.callBack=this.B(this,this.s.callBack);this.eType=["click","mouseover"];this.run()}Rotation.prototype={B:function(c,a){var b=Array.prototype.slice.call(arguments).slice(2);return function(){return a.apply(c,b)}},G:function(a){return document.getElementById(a)},E:function(a,c){for(var b in c){a[b]=c[b]}},pre:function(a){if(a.preventDefault){a.preventDefault()}else{a.returnValue=false}},aE:function(b,c,a){if(b.addEventListener){b.addEventListener(c,a,false)}else{if(b.attachEvent){b.attachEvent("on"+c,a)}else{b["on"+c]=a}}},set:function(a){this.s={evt:0,index:0,auto:[0,2000],cur:"cur",intTabTime:50,interval:50,nTag:function(){},mTag:function(){},text:function(){},slider:{obj:null,dis:0},dir:"top",Tween:function(f,e,h,g){return -h*((f=f/g-1)*f*f*f-1)+e},start:function(){},callBack:function(){}};this.E(this.s,a||{})},action:function(a){this.start();this.TabLi(a);this.TabText(a);this.dis?this.slider(a):this.TabChange(a);this.callBack()},autoplay:function(a){if(a){this.de=(this.de<this.aMtag.length-1)?this.de+1:0}else{this.de=(this.de!=0)?this.de-1:this.aMtag.length-1}this.action(this.de)},autoFun:function(){this.clearAuto();this.intAuto=setInterval(this.B(this,this.autoplay,1),this.s.auto[1])},clearAuto:function(){if(this.intAuto){clearInterval(this.intAuto)}},TabLi:function(a){if(this.aNtag){if(this.lLi){this.lLi.className=this.lLi.className.replace(this.s.cur,"");this.lLi.key=0}if(this.aNtag[a].className.indexOf(this.s.cur)==-1){this.aNtag[a].className+=" "+this.s.cur;this.aNtag[a].key=1}this.lLi=this.aNtag[a]}},TabText:function(a){if(this.aText){this.lText&&(this.lText.style.display="none");this.aText[a].style.display="block";this.lText=this.aText[a]}},TabChange:function(a){if(this.lDiv&&this.lDiv!=this.aMtag[a]){this.lDiv.style.display="none"}this.aMtag[a].style.display="block";this.lDiv=this.aMtag[a]},slider:function(f){if(this.dis&&!this.sliderInit){this.sbj.style.position="absolute";this.sbj.style[this.dir]=-this.de*this.dis+"px";this.sliderInit=true}var d=0,a=parseInt(this.sbj.style[this.dir]),e=-f*this.dis-a;this.Move=function(){if(!e){return false}if(this.moveTime){clearTimeout(this.moveTime)}this.sbj.style[this.dir]=Math.round(this.Tween(d,a,e,this.s.interval))+"px";if(d<this.s.interval){d++;this.moveTime=setTimeout(this.B(this,this.Move),10)}};this.Move()},clearintTab:function(){if(this.intTab){clearTimeout(this.intTab)}},aNtagAct:function(a){if(this.lLi==a){return false}this.clearintTab();this.clearAuto();this.intTab=setTimeout(this.B(this,function(){this.de=a.cNub;this.action(a.cNub)}),this.s.intTabTime);return this},run:function(){if(this.aNtag){for(var g=0,b=this.aNtag.length;g<b;g++){var f=this.aNtag[g],c=f.getElementsByTagName("a")[0]||f.tagName.toLocaleLowerCase()=="a"&&f;f.cNub=g;if(c){this.aE(c,"focus",this.B(this,function(h){h.blur()},c));if(this.s.evt==0){this.aE(c,"click",this.pre)}}this.aE(f,this.eType[this.s.evt],this.B(this,function(h){this.aNtagAct(h)},f));if(this.s.auto[0]==1){this.aE(f,"mouseover",this.B(this,function(h){if(!h.key){return}this.clearAuto()},f));this.aE(f,"mouseout",this.B(this,function(h){if(!h.key){return}this.autoFun();this.clearintTab()},f))}else{this.aE(f,"mouseout",this.B(this,this.clearintTab))}}}this.action(this.de);if(this.s.auto[0]==1){this.autoFun();for(var a=0,e=this.aMtag.length;a<e;a++){var d=this.aMtag[a];this.aE(d,"mouseover",this.B(this,this.clearAuto));this.aE(d,"mouseout",this.B(this,this.autoFun))}}}};
    domReady(function(){
        var tag='getElementsByTagName',
            focus_cat=function(){
                if(!$('focus')) return false
                new Rotation(
                    {
                        nTag:function(){return $('J_focus-trigger')[tag]('li')},
                        mTag:function(){return $('J_focus-panel')[tag]('li')},
                        index:0,
                        slider:{obj:$('J_focus-panel'),dis:300},
                        auto:["1","5000"],
                        cur:'select'
                    }
                );
            }()
    })

})()