var MiniSite = {};

MiniSite.Browser = {
	ie: /msie/.test(window.navigator.userAgent.toLowerCase()),
	moz: /gecko/.test(window.navigator.userAgent.toLowerCase()),
	opera: /opera/.test(window.navigator.userAgent.toLowerCase())
};

MiniSite.$ = function(s)
{
	return (typeof s == 'object') ? s: document.getElementById(s);
};
MiniSite.Cookie = {
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
var sportHtml='<span class="nike"></span><span class="tiyu">'+cots[3][0]+'</span>';
var menuAs=$("iNav").getElementsByTagName("li");
var MC = MiniSite.Cookie;
//cookie style:MiniLocl=1-2-3-4;
function loadCookie()
{
    var miniLocl=MC.get("MiniLocl");
    if(miniLocl!=null)
    {
        var a=miniLocl.split("-"),b=pageSeq.sort(),c=[0],p=0,v;
        
        if(a.length!=4) return;
        b=b.remove(0);
        
        for(var i=0;i<4;i++)
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
        if(menuAs[i].lang != 0) c.push(menuAs[i].lang);
        if(c.length>=4) break;
    }
    
    MC.set("MiniLocl",c.join("-"),new Date(new Date().getTime() + 24*3600*1000*365));
}

function preload()
{
    for(var i=0;i<cots.length;++i)
    {
        cots[i].push($("nrong"+i).innerHTML);
    }
}

function initTab()
{
if(stop==4){
 var miniLocl=MC.get("MiniLocl");
	if(miniLocl!=null){
	doit(0);
	n=0;
    menuAs[0].className = "s";
	}else{
	 n=5;
   menuAs[4].className = "s";
  doit(4);
  afterall(cots[4][0]);
	}
}else{
doit(0);
	n=0;
    menuAs[0].className = "s";
}

for(var i=0;i<4;++i)
    {
        var pos=pageSeq[curSeq+i];
        menuAs[i].innerHTML="<span style='cursor:hand'>"+cots[pos][0]+"</span>";
        menuAs[i].href=cots[pos][2];
		menuAs[i].target = "_blank"; 
        menuAs[i].lang=pos;
        menuAs[i].id=(pos==3?"nike":"");
        menuAs[i].onfocus=function(){this.blur()};      
menuAs[i].onmouseover = function(){
    alert();
	doit(this.lang);clearAuto();
			if(this.lang==0){

				$("tishi").style.display = "none";

				return false;
			}else{
			$("tishi").style.display = "block";
			$("tishi").style.left = this.offsetLeft+42 +"px";

			}
		}
	menuAs[i].onmouseout = function(){

		$("tishi").style.display = "none";

		return false;
	}
    }

}

function changePos(t,o)
{
    var p1=pageSeq.find(t.lang),
        p2=pageSeq.find(o.lang);
    pageSeq[p1]=o.lang;
    pageSeq[p2]=t.lang;
    
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
        var yTop=getObjPos($("iNav")).y;
           
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
            $("shadow").children[0].lang = obj.lang;
            
            document.onmouseup = function (e){ 
            	obj.style.cursor=oldCursor;   
                
                document.onmousemove = null;    
                document.onmouseup = null;              
                //放置位置检查开始    
                var nPos = getCurPos(e); 
                
                if(obj.lang != 0)
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
                            //doit(obj.lang);
                        }
                }
                self.dragFlag = false;                     
            }; 
              
            document.onmousemove = function (e)    
            {    
                if (obj && self.dragFlag)    
                {    
                    if(obj.lang!=0)
                    {
                        var Pos = getCurPos(e),p1=getObjPos($("iNav")),p2=Pos.x - cPos.x + oPos.x;  
                        if(Pos.x<orgPos.x+5 && Pos.x > orgPos.x-5) return ;
                        var o = $("shadow");                     
                        o.style.display = 'block';
                        o.style.position = 'absolute';    
                  
                        if(p2<p1.x) p2=p1.x;
                        if(p2>p1.x+$('iNav').offsetWidth-$("shadow").offsetWidth) p2=p1.x+$('iNav').offsetWidth-$("shadow").offsetWidth;
                        o.style.left = p2 + 'px';    
                        //o.style.left = Pos.x - cPos.x + oPos.x + 'px';    
                        //o.style.top = Pos.y - cPos.y + oPos.y + 'px';
                        o.style.top=yTop;
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
                        	if(tg.lang==0)
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
                        	obj.style.cursor=(obj.lang==0?"not-allowed":"move");
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
            o1.lang=o2.lang;
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

preload();
loadCookie();
initTab();
//enable drag and drop
for(var i=0;i<4;++i)
{
    DD.enableDrag(menuAs[i]);
    DD.addCons(menuAs[i]);
}
setAuto();
}

//页卡点击函数 
function doit(v){
if(typeof(IC)=="object" && typeof(IC.rpt) == "function") IC.rpt(v);  
for(var i=0;i<4;i++){
if(v==$('iNav').getElementsByTagName("li")[i].lang){
							
							window.setTimeout(function(){
							$('iMain').innerHTML = cots[v][3];sl(cots[v][0]);if(cots[v][0]=="财经"){getzhishu()};afterall(cots[v][0]);
							 },2)
							 if($('iNav').getElementsByTagName("li")[i].lang==3){
							$('iNav').getElementsByTagName("a")[i].id= "nikehover";
							}
							$('iNav').getElementsByTagName("a")[i].className="s"
							
						}else{
								if($('iNav').getElementsByTagName("li")[i].lang==3){
								$('iNav').getElementsByTagName("a")[i].id= "nike";
								}
								$('iNav').getElementsByTagName("a")[i].className="nos";
								
							}
}

var MC = MiniSite.Cookie;
var miniLocl=MC.get("MiniLocl");
if(miniLocl!=null){
stop = 0
if(n==stop&&mark==1){
		clearAuto();
	}
}else{
if(n==stop&&mark==1){
		clearAuto();
	}
}
}
//********************自动播放***************************//
var n=0;
var mark = null;
function clearAuto(){clearInterval(autoStart)}
function setAuto(){autoStart=setInterval("auto(n)", 5000);}
function auto(){
	n++;
	if(n>4){n=0;mark+=1;}
	doit($('iNav').getElementsByTagName("li")[n].lang);

}  




