(function(S,under){
    if(window[S] === under){
        window[S]={};
        S = window[S];
    };
    S.ready = function(fn){
            var self=this;
            if(!+'\v1'){
                (function(){
                    try{
                        document.documentElement.doScroll('left');
                    } catch (error){
                        setTimeout(arguments.callee, 0);
                        return;
                    };
                    fn.call(window,self);
                })();
                /*					  try{
                 document.documentElement.doScroll('left');
                 } catch (error){
                 setTimeout(arguments.callee, 0);
                 return;
                 };
                 alert('')
                 fn.call(window,self);*/

            }else{
                document.addEventListener('DOMContentLoaded', function(){fn.call(window,self)}, false);
            }
    };
	S.$ = function(elem){
	   if(typeof elem === "string"){
	     var id = elem.match(/^#([a-z][\w\d-_]*)/i),cla = elem.match(/^\.([a-z][\w\d-_]*)/i);
	     if(id){
		   return document.getElementById(id[1]);
		 }
	   }else{
	     return elem;
	   }
	};
	S.$$ = function(node, name, type) {
		var r = [], re = new RegExp("(^|\\s)" + name + "(\\s|$)"), e = (node || document).getElementsByTagName(type || "*");
		for ( var i = 0,len=e.length; i < len; i++ ) {
			if(re.test(e[i].className) )
				r.push(e[i]);
		}
		return r;
	};
    S.each = function(arr,fn){

	  for(var i=0,ien=arr.length;i<ien;i++){

          if(fn.call(arr[i],arr[i],i) === false){
             break;
		  }
	  }
	};

	S.add = function(o,fn){
		  if(typeof o != "string") return false;
		  var st = o.toString().split('.'),stLength = st.length,d=S;
		  S.each(st,function(v,i){
			 if(!d[this]){
			   d[this] = i == (stLength-1) ? fn : {};
			 };
			 d = d[this]; 
		  })
		 return d;
	};

	S.use = function(o,fn){
         S.add(o,fn)();
	};

    S.parse_config = function(str){
        var pa={};
        str.replace(/[?&]*((?:(?!=).)*)=*((?:(?!&)(?!\?).)*)/ig,function(k0,k1,k2){
            if(k1){
                pa[k1] = k2;
            }
        });
        return pa;
    };

})("QIE");

QIE.add("Rotation",function(s){
  function Rotation(a){this.set(a);this.aNtag=this.s.nTag;this.aMtag=this.s.mTag;this.aText=this.s.text;this.dis=Math.abs(this.s.slider.dis);this.sbj=this.s.slider.obj;this.dir=this.s.slider.dir||this.s.dir;this.Tween=this.s.slider.Tween||this.s.Tween;this.de=this.s.index;this.start=this.s.start;this.callBack=this.s.callBack;this.panelClass=this.s.panelClass;this.key=true;this.eType=["click","mouseover"];this.run()}Rotation.prototype={version:4.01,B:function(c,a){var b=Array.prototype.slice.call(arguments).slice(2);return function(){return a.apply(c,b)}},G:function(a){return document.getElementById(a)},E:function(a,c){for(var b in c){a[b]=c[b]}},pre:function(a){if(a.preventDefault){a.preventDefault()}else{a.returnValue=false}},aE:function(b,c,a){if(b.addEventListener){b.addEventListener(c,a,false)}else{if(b.attachEvent){b.attachEvent("on"+c,a)}else{b["on"+c]=a}}},set:function(a){this.s={evt:0,index:0,auto:[0,2000],cur:"cur",panelClass:"",intTabTime:50,interval:500,nTag:[],mTag:[],text:[],slider:{obj:null,dis:0},dir:"top",Tween:function(f,e,h,g){return -h*((f=f/g-1)*f*f*f-1)+e},start:function(){},callBack:function(){}};this.E(this.s,a||{})},action:function(a){this.start();if(!this.key){return false}this.TabLi(a);this.TabText(a);this.dis?this.slider(a):this.TabChange(a);this.callBack()},autoplay:function(a){var b=this.aMtag.length||this.aNtag.length;if(a){this.de=(this.de<b-1)?this.de+1:0}else{this.de=(this.de!=0)?this.de-1:b-1}this.action(this.de)},autoFun:function(){this.clearAuto();this.intAuto=setInterval(this.B(this,this.autoplay,1),this.s.auto[1])},clearAuto:function(){if(this.intAuto){clearInterval(this.intAuto)}},TabLi:function(f){if(this.aNtag!=""){var b=this.aNtag[f],e="className",d=this.s.cur;if(this.lLi){this.lLi[e]=this.lLi[e].replace(d,"");this.lLi.key=0}if(b[e].indexOf(d)==-1){b[e]+=" "+d;b.key=1}this.lLi=b}},TabText:function(a){if(this.aText!=""){this.lText&&(this.lText.style.display="none");this.aText[a].style.display="block";this.lText=this.aText[a]}},TabChange:function(c){var b=this.s.panelClass;if(this.aMtag!=""){var a=this.aMtag[c];if(b){if(this.lDiv&&this.lDiv!=a){(this.lDiv.className.indexOf(b)==-1)&&(this.lDiv.className+=" "+b)}(this.aMtag[c].className.indexOf(b)!=-1)&&(this.aMtag[c].className=this.aMtag[c].className.replace(new RegExp("\\s*"+b,"g"),""))}else{if(this.lDiv&&this.lDiv!=a){this.lDiv.style.display="none"}a.style.display="block"}this.lDiv=a}},slider:function(a){var j=this.sbj,f=this.dir,e=this.dis,g,l;if(e&&!this.sliderInit){j.style.position="absolute";j.style[f]=-this.de*this.dis+"px";this.sliderInit=true}var m=0,k=parseInt(this.sbj.style[f]),i=-a*e-k,h=this.s.interval;l=i>0?"ceil":"floor";this.Move=function(){m=new Date().getTime()-g;if(!i){return false}if(this.moveTime){clearTimeout(this.moveTime)}if(m<h){j.style[f]=Math[l](this.Tween(m,k,i,h))+"px";this.moveTime=setTimeout(this.B(this,this.Move),10)}else{j.style[f]=k+i+"px"}};g=new Date().getTime();this.Move()},clearintTab:function(){if(this.intTab){clearTimeout(this.intTab)}},aNtagAct:function(a){if(this.lLi==a){return false}this.clearintTab();this.clearAuto();this.intTab=setTimeout(this.B(this,function(){this.de=a.cNub;this.action(a.cNub)}),this.s.intTabTime);return this},run:function(){if(this.aNtag!=""){for(var g=0,b=this.aNtag.length;g<b;g++){var f=this.aNtag[g],c=f.getElementsByTagName("a")[0]||f.tagName.toLocaleLowerCase()=="a"&&f;if(!f.cNub){f.cNub=g}if(c){this.aE(c,"focus",this.B(this,function(h){h.blur()},c));if(this.s.evt==0){this.aE(c,"click",this.pre)}}this.aE(f,this.eType[this.s.evt],this.B(this,function(h){this.aNtagAct(h)},f));if(this.s.auto[0]==1){this.aE(f,"mouseover",this.B(this,function(h){if(!h.key){return}this.clearAuto()},f));this.aE(f,"mouseout",this.B(this,function(h){if(!h.key){return}this.autoFun();this.clearintTab()},f))}else{this.aE(f,"mouseout",this.B(this,this.clearintTab))}}}this.action(this.de);if(this.s.auto[0]==1){this.autoFun();var d=this.aMtag;if(d!=""){for(var a=0,e=d.length;a<e;a++){this.aE(d[a],"mouseover",this.B(this,this.clearAuto));this.aE(d[a],"mouseout",this.B(this,this.autoFun))}}}}};
  return new Rotation(s);
})

QIE.add("RotationInit",function(){
       var S = QIE;
	   S.initFun = function(str){
		   var str = new String(str),strTOa = str.split('.'),curContent = window;
		   for(var i = 0;i<strTOa.length;i++){
			  if(!curContent[strTOa[i]]){
				curContent = false;
				break;
			  }
			  curContent = curContent[strTOa[i]];
		   };
		   return curContent;
	   };

		S.Rotation.rotationLayout = {
				  trigger :function(plugRotation,mTag){
							var items = mTag,
								trigger_before = '<ul class="rotation-trigger">',
								trigger_after = '</ul>',
								trigger_item_befor = '<li class="trigger-item"><span class="sp"><a href="{{href}}">',
								trigger_item_after = '</a></span></li>',
								div = document.createElement('div'),
								elemStr =[trigger_before];
							for(var i=0,ien = items.length;i<ien;i++){
								var item=items[i],
									alink=item.getElementsByTagName('a')[0],
									title=alink.title,
									href=alink.href;
									elemStr.push((trigger_item_befor+(i+1)+trigger_item_after).replace(/\s*\{\{href\}\}\s*/,href));
							};
							elemStr.push(trigger_after);
							div.innerHTML = elemStr.join('');
							plugRotation.appendChild(div.firstChild);
							return S.$$(plugRotation,'trigger-item','*');
						},
				  text : function(plugRotation,mTag){
							var items = mTag,
								text_before='<ul class="text-trigger">',
								text_after = '</ul>',
								text_item_befor = '<li class="tt-item"><a href="{{href}}">',
								text_item_after = '</a></li>',
								textStr=[text_before],
								div = document.createElement('div');
							for(var i=0,ien = items.length;i<ien;i++){
								var item=items[i],
									alink=item.getElementsByTagName('a')[0],
									title=alink.title,
									href=alink.href;
									textStr.push((text_item_befor+title+text_item_after).replace(/\s*\{\{href\}\}\s*/,href));
							};
							textStr.push(text_after);
							div.innerHTML = textStr.join('');
							plugRotation.appendChild(div.firstChild);
							return S.$$(plugRotation,'tt-item','*');
						 }
		};

		/**
		 *选项卡根据html中包含类名plug-tab进行统一初始化，初始化时参数由html自定义属性data-tab-config设置，传递的参数类型为url传参数类型
		 * 实例：data-rotation-config = 'evt=1&auto=3000&dis=235&dir=left&rotationInitBack=lxj';
		 * @auto 整数 选项卡自动播放时的时间间隔
		 * @dis 整数 选项卡每次滑动效果时的滑动距离.
		 * @dir left or top 水平滑动或是垂直滑动.
		 * @rotationInitBack 初始化选项卡之前执行的函数(用来动态创建选项卡所需要的结构如：触发按钮或是显示文字)
		 */
		
		S.Rotation.rotationInit = function(){
			var plugRotations= S.$$(document,'plug-rotation','*');
			if(plugRotations.length == 0){
				return false;
			};
			for(var i= 0,ien=plugRotations.length;i<ien;i++){
				var plugRotation=plugRotations[i],
					data_rotation_config=plugRotation.getAttribute('data-rotation-config'),
					config=data_rotation_config ? S.parse_config(data_rotation_config) : {},
					rotation_panels = S.$$(plugRotation,'rotation-panel','*'),
					rotation_panel = rotation_panels[0],
					nTag,
					text;
					mTag = S.$$(plugRotation,'rp-item','*');
					mTag.length > 0 && (config.mTag =  mTag);

				  nTag = S.$$(plugRotation,'trigger-item','*');
				  if(nTag.length == 0){
					 config.trigger && (nTag = typeof S.initFun(config.trigger) == "function" ?  S.initFun(config.trigger)(plugRotation,mTag) : S.Rotation.rotationLayout.trigger(plugRotation,mTag));
				  }
				  config.nTag = nTag && nTag.length > 0 && (config.nTag = nTag);


				  text = S.$$(plugRotation,'tt-item','*');
				  if(text.length == 0){
					 config.text && (text = typeof S.initFun(config.text) == "function" ?  S.initFun(config.text)(plugRotation,mTag) : S.Rotation.rotationLayout.text(plugRotation,mTag));
				  }
				  config.text = text && text.length > 0 && (config.text = text);

				if(config.dis){
				  config.slider={};
				  config.slider.dis = config.dis;
				  config.slider.dir = config.dir;
				  config.slider.obj = rotation_panel;
				};
				config.auto && (config.auto = [1,config.auto]);
				var nr = S.Rotation(config);
				config.rotationInitBack && S.initFun(config.rotationInitBack).call(nr,config);
			}
		}();
});

QIE.ready(function(S){
   S.RotationInit();
});