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
		   width=this.getWidth();
		   this.maxScrollWidth=width-this.content.parentNode.offsetWidth; //能滚动的总路程
		   this.content.style.width=width+'px';
		   this.judgePageStyle();
		   addEvent(this.oPrevious,'click',function(){self.previous()})
		   addEvent(this.oNext,'click',function(){self.next()})
		   this.IntermittentScroll();
		},
		/*获取滚动内容的宽度*/
		getWidth:function(a){
			var subTags=this.content.getElementsByTagName(this.tagName),w=0;
			if(a){//对于等宽的，可以直接设置宽度
				w=subTags.length*a
			}else{//自动获取宽度
			  for(var i=0,j=subTags.length;i<j;i++){
					w+=subTags[i].clientWidth > subTags[i].offsetWidth ? subTags[i].clientWidth : subTags[i].offsetWidth;
			  }
			}
			return w;
		},
		/*上一页和下一页的样式*/
		judgePageStyle:function(){
		   var l=this.content.style[this.direction];
		   parseInt(l)==0 || !l ? setStyle(this.oPrevious,{color:'#ccc',cursor:'text'}) : setStyle(this.oPrevious,{color:'#000',cursor:'pointer'})
		   Math.abs(parseInt(l))===this.maxScrollWidth ? setStyle(this.oNext,{color:'#ccc',cursor:'text'}) : setStyle(this.oNext,{color:'#000',cursor:'pointer'});
		},
		/*滚动函数*/
		goto:function(c,d){
		  if(this.timeid){clearTimeout(this.timeid);this.timeid=null};
		  var b=parseInt(this.content.style[this.direction]) || 0,abs_b=Math.abs(b),t=0,self=this;
		  
		  //不自动循环滚动
		  if(c<0){
				if((this.maxScrollWidth-abs_b)<Math.abs(c)){c=abs_b-this.maxScrollWidth}//纠正移动路程
				if(abs_b===this.maxScrollWidth){
					this.stopScroll();return false
				}
		  }else{
				if(abs_b<c && abs_b!==this.maxScrollWidth){c=abs_b}//纠正移动路程
				if(abs_b==0){this.stopScroll();return true}
		  }
		  //不自动循环滚动
		  
		  new function(){
			  self.content.style[self.direction] = Math.ceil(Tween.Quad.easeIn(t,b,c,d)) + "px";
			  self.judgePageStyle();
			  if(t<d){t++; self.timeid=setTimeout(arguments.callee, 10);}else{t=d}
		  };
		  
		},
		previous:function(){
		   this.stopScroll();
		   this.goto(this.c,this.d);
		},
		next:function(){
		   this.stopScroll();
		   this.goto(-this.c,this.d);
		},
		/*自动匀速地滚动*/
		autoScroll:function(){
		   var self=this;
		   this.stopScroll();
		   var c=-2,t=d=1;
		   this.autoTime=setInterval(function(){
										 self.goto(-self.c,self.d)
									 },
									 1000
                            )
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
									 1000
                            )
		}
}

TScroll({'content':'scrollid','c':90,'previous':'previous','next':'next','auto':true})