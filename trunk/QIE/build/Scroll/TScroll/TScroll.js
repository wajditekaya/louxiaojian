/*===
t: current time（当前时间）；
b: beginning value（初始值）；
c: change in value（变化量）；单位像素
d: duration（持续时间）。
ps：Elastic和Back有其他可选参数，里面都有说明。
=====*/
var Tween = {
	Quad: {
		easeIn: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		}
	}
} 
function $(o){return typeof(o)=='string' ? document.getElementById(o) : o}

/*===将英文单词第一个字母转为大写字母*/
 function replaceReg(str){ 
  reg = /\b(\w)|\s(\w)/g;
  str = str.toLowerCase(); 
  return str.replace(reg,function(m){return m.toUpperCase()}) 
 }  
/*===将英文单词第一个字母转为大写字母*/


function uncamelize(s, sep) {
	sep = sep || '-';
	return s.replace(/([a-z])([A-Z])/g, function (strMatch, p1, p2){
		return p1 + sep + p2.toLowerCase();
	});
};
function camelize(s) {
	return s.replace(/-(\w)/g, function (strMatch, p1){
		return p1.toUpperCase();
	});
}
function addEvent( node, type, listener ) {
	if(!(node = $(node))) return false;
    if (node.addEventListener) {
        node.addEventListener( type, listener, false );
        return true;
    } else if(node.attachEvent) {
        node['e'+type+listener] = listener;
        node[type+listener] = function(){node['e'+type+listener]( window.event );}
        node.attachEvent( 'on'+type, node[type+listener] );
        return true;
    }
    return false;
};
function setStyle(element, styles) {
	// Retrieve an object reference
	if(!(element = $(element))) return false;
	// Loop through  the styles object an apply each property
	for (property in styles) {
		if(!styles.hasOwnProperty(property)) continue;
		if(element.style.setProperty) {
			//DOM2 Style method
			element.style.setProperty(
			uncamelize(property,'-'),styles[property],null);
		} else {
			//Alternative method
			element.style[camelize(property)] = styles[property];
		}
	}
	return true;
};

function TScroll(s){
        var self = this;
        if (!(self instanceof TScroll)){
            return new TScroll(s);
        }
	    this.init(s);
}
TScroll.prototype={
		/*初始化函数*/
		init:function(s){
		   var width,self=this;
		   this.content=$(s.content);
		   this.c=s.c || 180;
		   this.d=s.d || 20;
		   this.tagName=s.tagName || 'li';
		   this.oPrevious=$(s.previous);
		   this.oNext=$(s.next);
		   this.direction=s.direction || 'left';
		   this.auto=s.auto;//是否自动滚动
		   this.cycle=s.cycle;//是否循环滚动
		   this.related={'previous':1,'next':-1,'left':'width','top':'height'}
		   getBx=this.getBx();
		   this.maxScroll=getBx-this.content.parentNode['offset'+replaceReg(this.related[this.direction])]; //能滚动的总路程
		   this.content.style[this.related[this.direction]]=getBx+'px';
		   this.judgePageStyle();
		   
		   //@问题一，怎么区别click和mousedown时间触发区别
		   addEvent(this.oPrevious,'click',function(){self.goScroll('previous')})
		   addEvent(this.oPrevious,'mousedown',function(){
						self.mdm=setTimeout(function(){self.DS=true;self.goScrollDown('previous')},200)
					})
		   addEvent(this.oPrevious,'mouseup',function(){
						//@判断是否执行过self.goScrollDown函数
						if(self.DS){
							self.DownStop=true;
							self.DS=false
						}
						//@判断是否执行过self.goScrollDown函数
						if(self.mdm){clearTimeout(self.mdm);self.mdm=null}
						//if(self.mdTime){clearInterval(self.mdTime);self.mdTime=null}
					})
		   
		   addEvent(this.oNext,'click',function(){self.goScroll('next')})
		   addEvent(this.oNext,'mousedown',function(){
					 self.mdm=setTimeout(function(){self.DS=true;self.goScrollDown('next')},200)
					})
		   addEvent(this.oNext,'mouseup',function(){
						
						//@判断是否执行过self.goScrollDown函数
						if(self.DS){
							self.DownStop=true;
							self.DS=false
						}
						//@判断是否执行过self.goScrollDown函数
						
						if(self.mdm){clearTimeout(self.mdm);self.mdm=null}
						//if(self.mdTime){clearInterval(self.mdTime);self.mdTime=null}
					})
		   
		   this.IntermittentScroll();
		},
		/*获取滚动内容的宽度*/
		getBx:function(a){
			var subTags=this.content.getElementsByTagName(this.tagName),w=0;
			if(a){//对于等宽的，可以直接设置宽度
				w=subTags.length*a
			}else{//自动获取宽度
			  for(var i=0,j=subTags.length;i<j;i++){
					w+=subTags[i]['client'+replaceReg(this.related[this.direction])] > subTags[i]['offset'+replaceReg(this.related[this.direction])] ? subTags[i]['client'+replaceReg(this.related[this.direction])] : subTags[i]['offset'+replaceReg(this.related[this.direction])];
			  }
			}
			return w;
		},
		/*上一页和下一页的样式*/
		judgePageStyle:function(){
		   var l=this.content.style[this.direction];
		   parseInt(l)==0 || !l ? setStyle(this.oPrevious,{color:'#ccc',cursor:'text'}) : setStyle(this.oPrevious,{color:'#000',cursor:'pointer'})
		   Math.abs(parseInt(l))===this.maxScroll ? setStyle(this.oNext,{color:'#ccc',cursor:'text'}) : setStyle(this.oNext,{color:'#000',cursor:'pointer'});
		},
		/*滚动函数*/
		goto:function(c,d,callback){
		  if(this.timeid){clearTimeout(this.timeid);this.timeid=null};
		  var b=parseInt(this.content.style[this.direction]) || 0,abs_b=Math.abs(b),t=0,self=this,tm;
		  
		  //不自动循环滚动
		  if(c<0){
				if((this.maxScroll-abs_b)<Math.abs(c)){c=abs_b-this.maxScroll}//纠正移动路程
				if(abs_b===this.maxScroll){
					this.stopScroll();return false
				}
		  }else{
				if(abs_b<c && abs_b!==this.maxScroll){c=abs_b}//纠正移动路程
				if(abs_b==0){this.stopScroll();return true}
		  }
		  //不自动循环滚动
		  tm=c>0 ? 'ceil' : 'floor'
		  new function(){
			  self.content.style[self.direction] = Math[tm](Tween.Quad.easeIn(t,b,c,d)) + "px";
			  self.judgePageStyle();
			  if(t<d){
				  t++; self.timeid=setTimeout(arguments.callee, 10);
			  }else{
				  self.content.style[self.direction]=b+c+'px';
				  callback && callback()
			      t=d;
			  }
		  };
		  
		},
		goScroll:function(n){
		   this.stopScroll();
		   this.goto(this.c*this.related[n],this.d);
		},
		goScrollDown:function(n){
		   this.stopScroll();
		   var d=15,self=this;
		   if(this.mdTime){clearInterval(this.mdTime);this.mdTime=null}
		   this.mdTime=setInterval(function(){
							
							self.goto(
									  self.c*self.related[n],
									  d,
									  function(){
										if(self.DownStop){clearInterval(self.mdTime);self.DownStop=false;return false} 								
									  }
							);
					   },30)
		},
		//mousedown快速滚动后，确保滚动后的位置是步长的整数倍
		correctPosition:function(){
			var zuobiao=parseInt(this.content.style[this.direction]);
			this.goto(this.c*this.related[n],this.d);
		},
		/*自动匀速地滚动*/
		autoScroll:function(){
		   var self=this;
		   this.stopScroll();
		   var c=-2,t=d=1;
		   this.autoTime=setInterval(function(){
										 self.goto(-self.c,self.d)
									 },
									 1000)
		},
		stopScroll:function(){
			if(this.autoTime){clearTimeout(this.autoTime);this.autoTime=null}
		},
		IntermittentScroll:function(){
		   if(!this.auto) return false;
		   var self=this;
		   this.stopScroll();
		   this.autoTime=setInterval(function(){
										 self.goto(-self.c,self.d)
									 },
									 1000)
		}
}