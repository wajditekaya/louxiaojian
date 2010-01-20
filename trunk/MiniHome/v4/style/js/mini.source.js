function $(v){return document.getElementById(v)};
var MiniTab = {};
MiniTab.Cookie = {
	set: function(name, value, expires, path, domain)
	{
		if (typeof expires == "undefined")
		{
			expires = new Date(new Date().getTime() + 24*3600*100);//过期
		}

		document.cookie = name + "=" + escape(value) +
			((expires) ? "; expires=" + expires.toGMTString() : "") +
			((path) ? "; path=" + path : "; path=/") +
			((domain) ? "; domain=" + domain : "");
	},

	get: function(name)
	{
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));

		if (arr != null)
		{
			return unescape(arr[2]);
		
		}

		return null;
	},

	clear: function(name, path, domain)
	{
		if (this.get(name))
		{
			document.cookie = name + "=" +
				((path) ? "; path=" + path : "; path=/") +
				((domain) ? "; domain=" + domain : "") +
				";expires=Fri, 02-Jan-1970 00:00:00 GMT";
		}
	}
};

Array.prototype.find=function(v)
{
    for(var i=0;i<this.length;i++)
    {
        if(this[i]==v) return i;
    }
    return -1;
}
Array.prototype.remove = function(n){
	if(n < 0) return this;
	else return this.slice(0, n).concat(this.slice(n + 1, this.length));
}
//安装函数
function ints(){
var pageNum=cots.length,curSeq=0,step=1,pageSeq = [0,1,2,3,4,5,6,7,8,9];
var menuAs=$('iNav').getElementsByTagName('a');
var MC = MiniTab.Cookie;
//cookie style:MiniLocl=1-2-3-4;
function loadCookie()
{
    var miniLocl=MC.get("MiniLocl");
    if(miniLocl!=null)
    {
        var a=miniLocl.split("-"),b=pageSeq.sort(),c=[0],p=0,v;
        
        if(a.length!=(m-1)) return;
        b=b.remove(0);
        for(var i=0;i<(m-1);i++)
        {
			
            v=parseInt(a[i]);
            p=b.find(v);
            if(p==-1) return;
            b=b.remove(p);
            c.push(v);
        }
        pageSeq=c.concat(b);
    }
}

function saveCookie()
{
    var c=[];
    for(var i=0;i<menuAs.length;++i)
    {
        if(menuAs[i].name != 0) c.push(menuAs[i].name);
        if(c.length>=4) break;
    }
    
    MC.set("MiniLocl",c.join("-"),new Date(new Date().getTime() + 24*3600*1000*365));
}

function initTab()
{
  if(stop==4){
      var miniLocl=MC.get("MiniLocl");
	  if(miniLocl!=null){
		  doit(0);
		  n=0;
		  menuAs[0].className = "cur";
	  }else{
		n=5;
		 menuAs[4].className = "cur";
		doit(4);
	  }
	  }else{
		  doit(0);
		  n=0;
		  menuAs[0].className = "cur";
	  }
   for(var i=0;i<m;++i)
    {
        var pos=pageSeq[curSeq+i];
        menuAs[i].innerHTML="<span style='cursor:hand'>"+cots[pos][0]+"</span>";
		menuAs[i].target = "_blank"; 
        menuAs[i].name=pos;
        menuAs[i].onfocus=function(){this.blur()};
        
menuAs[i].onmouseover = function(){
	        doit(this.name);
			clearAuto();
			if(this.name==0){$("tishi").style.display = "none";
			 return false;
			}else{
			$("tishi").style.display = "block";
			$("tishi").style.left = this.offsetLeft+15 +"px";

			}
		}
	menuAs[i].onclick=function(){return false}
	menuAs[i].onmouseout = function(){
		$("tishi").style.display = "none";
		return false;
	   }
    }

}

function changePos(t,o)
{
    var p1=pageSeq.find(t.name),
        p2=pageSeq.find(o.name);
    pageSeq[p1]=o.name;
    pageSeq[p2]=t.name;
    
}

var DD={
    dragFlag:false,
    cons:[],
    
    addCons:function(obj)
    {
        this.cons.push(obj);
    },
    
    enableDrag:function(obj)
    {
        var self=this,oldCursor=obj.style.cursor; 
        var yTop=getObjPos($('iNav')).y;
           
        obj.onmousedown = function (e)    
        {    
            //obj.style.cursor="move";
            if (!document.all) e.preventDefault();    
            var oPos = getObjPos(obj);    
            var cPos = getCurPos(e);
            var lastObj=obj;
            var orgPos=getCurPos2(e);
            
            self.dragFlag = true;  
            $("shadow").innerHTML = obj.outerHTML;
            $("shadow").children[0].name = obj.name;
            
            document.onmouseup = function (e){ 
            	obj.style.cursor=oldCursor;   
                
                document.onmousemove = null;    
                document.onmouseup = null;              
                //放置位置检查开始    
                var nPos = getCurPos(e); 
                
                if(obj.name != noDrag)
                {         
                    if(lastObj.innerHTML=="")
                    {
                        set(lastObj,$("shadow").children[0]);
                        
                        saveCookie();
                    }
                    
                }   
                var o = $("shadow");
                o.style.display="none";
                //放置位置检查结束
                if(self.dragFlag && obj && obj==lastObj)
                {
                        var nPos = getCurPos2(e); 
                        var tPos = getObjPos(obj);    
                        var tg_w = obj.offsetWidth;    
                        var tg_h = obj.offsetHeight;  
                          
                        if ((nPos.x > tPos.x) && (nPos.y >= tPos.y) && (nPos.x < tPos.x + tg_w) && (nPos.y <= tPos.y + tg_h))    
                        { 
                            //obj.click();
                            //doit(obj.name);
                        }
                }
                self.dragFlag = false;                     
            }; 
              
            document.onmousemove = function (e)    
            {    
                if (obj && self.dragFlag)    
                {    
                    if(obj.name!=noDrag)
                    {
                        var Pos = getCurPos(e),p1=getObjPos($('iNav')),p2=Pos.x - cPos.x + oPos.x;  
                        if(Pos.x<orgPos.x+5 && Pos.x > orgPos.x-5) return ;
                        var o = $("shadow");                     
                        o.style.display = 'block';
                        o.style.position = 'absolute';    
                  
                        if(p2<p1.x) p2=p1.x;
                        if(p2>p1.x+$('iNav').offsetWidth-$("shadow").offsetWidth) p2=p1.x+$('iNav').offsetWidth-$("shadow").offsetWidth;
                        o.style.left = p2 + 'px';
                        o.style.top=yTop-1+ 'px';
                    }
                    else
                    {
                        obj.style.cursor="not-allowed"; 
                        return;
                    }
                                       
                    for(var i=0;i<self.cons.length;++i)
                    {
                        var tg = self.cons[i];
                        var nPos = getCurPos(e); 
                        var tPos = getObjPos(tg);    
                        var tg_w = tg.offsetWidth;    
                        var tg_h = tg.offsetHeight;  
                          
                        if ((nPos.x > tPos.x) && (nPos.y >= tPos.y) && (nPos.x < tPos.x + tg_w) && (nPos.y <= tPos.y + tg_h))    
                        {                            
                        	if(tg.name==noDrag)
                        	{
                            	obj.style.cursor="not-allowed"; 
                            	break;
                        	}                                                        
                            if(lastObj != tg)
                            {
                                changePos($("shadow").children[0],tg);                                  
                                set(lastObj,tg);                          
                                lastObj=tg;                                
                            }
                            tg.className="mb";
                            tg.innerHTML="";
                            tg.id="";
                            break;
                        }
                        else
                        {
                        	obj.style.cursor=(obj.name==noDrag?"not-allowed":"move");
                        }
                    }
                }    
                return false;    
            }    
        }   
        
        function set(o1,o2)
        {
            o1.innerHTML=o2.innerHTML;
            o1.className=o2.className;
            o1.name=o2.name;
            o1.id=o2.id;
			o1.href=o2.href;
        }
        
        function getObjPos(obj)    
        {    
            var x = y = 0;    
            if (obj.getBoundingClientRect)    
            {    
                var box = obj.getBoundingClientRect();    
                var D = document.documentElement;    
                x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;    
                y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop;         
            }    
            else   
            {    
                for(; obj != document.body; x += obj.offsetLeft, y += obj.offsetTop, obj = obj.offsetParent );    
            }    
            return {'x':x, 'y':y};    
        }    
           
        function getCurPos(e)    
        {    
            e = e || window.event;    
            var D = document.documentElement;    
            if (e.pageX) return {x: e.pageX, y: e.pageY};    
            return {    
                x: e.clientX + D.scrollLeft - D.clientLeft,    
                //y: e.clientY + D.scrollTop - D.clientTop        
                y: yTop        
            };    
        } 
        
        function getCurPos2(e)    
        {    
            e = e || window.event;    
            var D = document.documentElement;    
            if (e.pageX) return {x: e.pageX, y: e.pageY};    
            return {    
                x: e.clientX + D.scrollLeft - D.clientLeft,    
                y: e.clientY + D.scrollTop - D.clientTop                            
            };    
        }
    
    }
    
};
loadCookie();
initTab();
//enable drag and drop

for(var i=0;i<m;++i)
{
    DD.enableDrag(menuAs[i]);
    DD.addCons(menuAs[i]);
}

setAuto()

}
var PreviousDiv='';
//页卡点击函数 
function doit(v){
if(typeof(IC)=="object" && typeof(IC.rpt) == "function") IC.rpt(v);  
for(var i=0;i<m;i++){
       if(v==$('iNav').getElementsByTagName('a')[i].name){
			window.setTimeout(function(){
									if(PreviousDiv){PreviousDiv.style.display='none';}
									$(content[v]).style.display='block';
									$('game').style.display=v==1 ? 'none': 'block';
									PreviousDiv=$(content[v]);
							  },2)
			$('iNav').getElementsByTagName('a')[i].className="cur";
		}else{$('iNav').getElementsByTagName('a')[i].className="";}
}

var MC = MiniTab.Cookie;
var miniLocl=MC.get("MiniLocl");
  if(miniLocl!=null){
	  stop = 0
	  if(n==stop&&mark==1){clearAuto()}
  }else{
	  if(n==stop&&mark==1){clearAuto()}
  }
}
//********************自动播放***************************//
var n=0;
var mark = null;
function clearAuto(){clearInterval(autoStart)}
function setAuto(){autoStart=setInterval("auto(n)", 5000);}
function auto(){
	n++;
	if(n>m-1){n=0;mark+=1;}
	doit($('iNav').getElementsByTagName('a')[n].name);

};
/*==可拖动Tab结束==*/
(function(){	   
 var rankover={
	  getElementsByClassName:function(node, name, type){
			if (node.getElementsByClassName)
				return node.getElementsByClassName(name);
				else {
				var r = [], re = new RegExp("(^|\\s)" + name + "(\\s|$)"), e = (node || document).getElementsByTagName(type || "*");
				for ( var i = 0; i < e.length; i++ ) {
					if( re.test(e[i].className) )
						r.push(e[i]);
				}
				return r;
			}
	  },
	  set:{cn:'rank',cTag:'dt',index:[1,1,1,1],cName:['selected'],cType:'onmouseover'},
	  run:function(){
		  var self=this,
		  aRank=this.getElementsByClassName(document,this.set.cn,'div');
		  if(aRank.length==0){return false}
		  for(var i=0;i<aRank.length;i++){
			  (function(){
				var last={},dt=aRank[i].getElementsByTagName(self.set.cTag),d='',className='',sTime='';
				d=self.set.index[i] ? (self.set.index[i]-1) : 0;
				className=self.set.cName.join(' ')+(' sr'+(d+1));
				if(dt[d] && dt[d].parentNode.className.indexOf(className)==-1){dt[d].parentNode.className+=' '+className;}
				last.o=dt[d];
				last.cn=className;
				for(var j=0;j<dt.length;j++){
					dt[j].curNub=j;
					dt[j][self.set.cType]=function(){
						 if(sTime){clearTimeout(sTime)}
						 if(last.o==this) return false;
						 var dself=this;
						 sTime=setTimeout(function(){
							 var sr=[];
							 sr.push('sr'+(dself.curNub+1));
							 className=self.set.cName.concat(sr).join(' ');
							 if(last.o && last.o!=dself){last.o.parentNode.className=last.o.parentNode.className.replace(last.cn,'')}
							 if(dself.parentNode.className.indexOf(className)==-1){dself.parentNode.className+=' '+className;}
							 last.o=dself;
							 last.cn=className;
						},200);
				   };
				   dt[j].onmouseout=function(){clearTimeout(sTime)}
				};
			 })();
		  };  
	  }	
	};
  rankover.run();
})();
function Rotation(a,c,b){if(!this.G(a)){return false}if(!this.G(a).getElementsByTagName(c)){return false}if(this.G(a).getElementsByTagName(c).length<=1){return false}this.set(b);this.oMain=this.G(a);this.aMainTag=this.oMain.getElementsByTagName(c);this.eventType=["click","mouseover"];if(this.s.nId&&this.s.nTag){this.aNavTag=this.G(this.s.nId).getElementsByTagName(this.s.nTag)}this.aMtag=[];this.run()}Rotation.prototype={B:function(c,a){var b=Array.prototype.slice.call(arguments).slice(2);return function(){return a.apply(c,b)}},G:function(a){return document.getElementById(a)},E:function(c,a){for(var b in a){c[b]=a[b]}},pre:function(a){if(a.preventDefault){a.preventDefault()}else{a.returnValue=false}},aE:function(c,a,b){if(c.addEventListener){c.addEventListener(a,b,false)}else{if(c.attachEvent){c.attachEvent("on"+a,b)}else{c["on"+a]=b}}},set:function(a){this.s={evt:0,index:0,cur:"cur",nId:false,nTag:false,callBack:function(){}};this.E(this.s,a||{})},action:function(a){this.s.callBack();this.TabLi(a);this.TabChange(a)},TabLi:function(a){this.lLi.className=this.lLi.className.replace(this.s.cur,"");if(this.aNtag[a].className.indexOf(this.s.cur)==-1){this.aNtag[a].className+=" "+this.s.cur}this.lLi=this.aNtag[a]},TabChange:function(a){if(this.lDiv&&this.lDiv!=this.aMtag[a]){this.lDiv.style.display="none"}this.aMtag[a].style.display="block";this.lDiv=this.aMtag[a]},aNtagAct:function(a){if(this.lLi==a){return false}if(this.intTab){clearTimeout(this.intTab)}this.intTab=setTimeout(this.B(this,function(){this.s.index=a.cNub;this.action(a.cNub)}),this.s.intTabTime);return false},run:function(){for(var c=0;c<this.aMainTag.length;c++){if(this.aMainTag[c].parentNode==this.oMain){this.aMtag.push(this.aMainTag[c])}}this.aNtag=[];for(var b=0;b<this.aNavTag.length;b++){if(!this.aNavTag[b].getAttribute("lang")){this.aNtag.push(this.aNavTag[b])}}if(this.aNtag[this.s.index].className.indexOf(this.s.cur)==-1){this.aNtag[this.s.index].className+=" "+this.s.cur}this.lLi=this.aNtag[this.s.index];this.lDiv=this.aMtag[this.s.index];for(var d=0;d<this.aNtag.length;d++){this.aNtag[d].cNub=d;var a=this.aNtag[d].getElementsByTagName("a")[0];if(a){this.aE(a,"focus",this.B(this,function(e){e.blur()},a));if(this.s.evt==0){this.aE(a,"click",this.pre)}}if(this.aNtag[d].tagName.toLocaleLowerCase()=="a"){this.aE(this.aNtag[d],"focus",this.B(this,function(e){e.blur()},this.aNtag[d]));if(this.s.evt==0){this.aE(this.aNtag[d],"click",this.pre)}}this.aE(this.aNtag[d],this.eventType[this.s.evt],this.B(this,function(e){this.aNtagAct(e)},this.aNtag[d]))}}};
var nList=new Rotation('favRankBody','div',{nId:'ysMenu',nTag:'li',evt:1});
(function(){
 if(!$('s')){return false}
 var s=$('s');
 s.defaultValue="电影/电视剧"
 s.onfocus=function(){
	 if(this.value==this.defaultValue){this.value=''}
  }
 s.onblur=function(){
	 if(this.value==''){this.value=this.defaultValue}
  }
})()


