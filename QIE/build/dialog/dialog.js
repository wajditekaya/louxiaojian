/**
 * Created by JetBrains WebStorm.
 * User: LXJ
 * Date: 11-8-3 ÉÏÎç8:23
 * Mail: louxiaojian@gmail.com
 */
function dialog(s){
	var self = this;
	//alert(arguments[0].id)
		//alert(arguments[0].width)
	if (!(self instanceof dialog)) {
		return new dialog(s);
	}
	this.init(s)
};
dialog.close=function(elem,s){
	var elem=elem || 'v-dialog',s=s || 'dialog-close-handle',closebut=this.getECN(this.$(elem),s,'*');
    closebut.length!=0 && closebut[0].onclick();
}
dialog.$=function(id){
	return "string" == typeof id ? document.getElementById(id) : id;
}
dialog.getECN=function(node, name, type){
        var r = [], re = new RegExp("(^|\\s)" + name + "(\\s|$)"), e = (node || document).getElementsByTagName(type || "*");
        for ( var i = 0,len=e.length; i < len; i++ ) {
            if(re.test(e[i].className) )
                r.push(e[i]);
        }
        return r;
}
dialog.isIE6=function(){
	return document.all && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6);
}
dialog.prototype={
    init:function(s,undef){
        var _this=this;
		this.s=s;
        this.openBack=s.openBack;
        this.closeBack=s.closeBack;
        this.top=s.top;
        this.left=s.left;
        this.height=s.height;
        this.width=s.width;
		this.title=s.title;
		this.type=s.type || 'default';
        this.closeName=s.closeName || 'dialog-close-handle';
        this.Layer=s.Layer===undef ? 1 : s.Layer;
        this.fix=s.fix;
        this.opacity=s.opacity || 0.5;
        this.d=document;
        this.db=this.d.body;
        this.dd=this.d.documentElement;
        this.dialogInit();
        this.open();
        window.onresize=function(){_this.setPosition.call(_this)};
    },
    shadingLayer:function(){
		var layDic,iframe;
        if(!dialog.$('layDic')){
            var DocumentFragment=document.createDocumentFragment();
            layDic=document.createElement("div");
            layDic.setAttribute('id','layDic');
            iframe=document.createElement("iframe");
            iframe.setAttribute('id','layDic-iframe');
            iframe.setAttribute('frameborder','0');
            iframe.setAttribute('marginheight','0');
            iframe.setAttribute('marginwidth','0');
            layDic.style.cssText="opacity:0.5;background:#000;position:absolute;top:0;left:0;z-index:9998;display:none";
            iframe.style.cssText="opacity:0;-moz-opacity:0;filter:alpha(opacity=0);background:#000;position:absolute;top:0;left:0;z-index:9997;display:none";
            DocumentFragment.appendChild(layDic);
            DocumentFragment.appendChild(iframe);
            document.body.appendChild(DocumentFragment);
        }
		layDic=this.layDic=dialog.$('layDic');
		iframe=this.iframe=dialog.$('layDic-iframe');
		layDic.style.filter = "alpha(opacity=" + this.opacity*100 + ")";
		layDic.style.opacity = this.opacity;
    },
    dialogInit:function(){
        var closebut,_this=this,elem,elemmain,elembd,elemhd,title=this.title,id=this.s.id;
		if(this.type==='duli'){
           elem=this.dialog=dialog.$(id);
		}else{
			if(!dialog.$('v-dialog')){
				var html,div;
				html='<div id="v-dialog" class="dialog dialog-b"><div class="dialog-hd dialog-bk"><span class="dhd-1"><span class="dhd-2"></span></span><b></b><s></s></div><div class="dialog-bd"><div class="dialog-wrap"><div class="dialog-main"><div class="dialog-mbd"></div><div onclick="dialog.close()" class="dialog2-close" style="padding-left:10px"><span class="code">dialog.close()</span></div></div></div><div class="dialog-lf"></div><div class="dialog-rg"></div></div><div class="dialog-close"><a href="#" class="dialog-close-handle" title="¹Ø±Õ">¹Ø±Õ</a></div><b class="jt" style="left:30px"></b><div class="dialog-ft dialog-bk"><span class="dhd-1"><span class="dhd-2"></span></span><b></b><s></s></div></div>';
				div=document.createElement('div');
				div.innerHTML=html;
				document.body.appendChild(div.firstChild)
			}
			elem=this.dialog=dialog.$('v-dialog');
			elemmain=dialog.getECN(elem,'dialog-main','div')[0];
			elembd=dialog.getECN(elem,'dialog-mbd','div')[0];
			elemhd=dialog.getECN(elem,'dialog-mhd','div')[0];
			elembd.innerHTML='';
			if(title){
               !elemhd && (function(){
				   var tmp,hdhtml;
					hdhtml='<div class="dialog-mhd"></div>';
					tmp=document.createElement('div');
					tmp.innerHTML=hdhtml;
					elemhd=tmp.firstChild;
					elemmain.insertBefore(tmp.firstChild,elembd);
				})();
				elemhd.innerHTML=title;
			}else{
               elemhd && elemhd.parentNode.removeChild(elemhd);
			}
			if(dialog.$(id)){
			   dialog.$(id).style.display="block"
               elembd.appendChild(dialog.$(id));
			}else{
               elembd.innerHTML=id;
			}
		}
		elem.style.display="block";
        this.pHeight=this.height ?  parseInt(this.height) : elem.offsetHeight;
        this.pWidth=parseInt(this.width);
        elem.style.width=this.pWidth+"px";
        elem.style.zIndex=9999;
        elem.style.display="none";
        closebut=dialog.getECN(elem,this.closeName,'*');
        for(var i=0,len=closebut.length;i<len;i++){
            closebut[i].onclick=function(){_this.close.call(_this);return false;
            }
        }
    },
    fixed:function(undef){
		var elem=this.dialog;
        if(dialog.isIE6()){
            var top=this.top!==undef ? parseInt(this.top) : this.cTop;
            var expression=";top:expression(documentElement.scrollTop+"+top+");)"
            elem.style.position='absolute';
            elem.style.cssText+=expression;
            document.body.style.cssText+=';background:url(about:blank) fixed';
        }else{
            elem.style.position='fixed';
            elem.style.top=this.top!==undef ? (parseInt(this.top)+'px') : this.cTop+"px";
        }
        return this;
    },
    unfixed:function(undef){
        this.dialog.style.position="absolute";
        this.dialog.style.top=this.top!==undef ? (parseInt(this.top)+'px') : (Math.max(this.dd.scrollTop, this.db.scrollTop)+this.cTop+"px");
    },
    setPosition:function(undef){
		var elem=this.dialog,layDic=this.layDic,iframe=this.iframe,sw=this.db.scrollWidth,sh=this.db.scrollHeight;
        if(this.Layer){
            layDic.style.width=iframe.style.width = sw+"px";
            layDic.style.height=iframe.style.height = sh+"px";
        }
        this.cTop=(this.dd.clientHeight-this.pHeight)*0.382;
        if(this.cTop<0) this.cTop=0;
        this.fix ? this.fixed() : this.unfixed();
        elem.style.left=this.left!==undef ? (parseInt(this.left)+'px') : ((this.dd.clientWidth-this.pWidth)/2+"px");
    },
    open:function(){
        if(this.Layer){
            this.shadingLayer();
            this.layDic.style.display="block";
            this.iframe.style.display="block"
        };
        this.setPosition();
        this.dialog.style.display="block";
        Object.prototype.toString.call(this.openBack)==='[object Function]' && this.openBack();
    },
    close:function(){
		var elem=this.dialog,layDic=this.layDic,iframe=this.iframe;
        if(this.Layer){
            layDic.style.display="none";
            iframe.style.display="none";
        }
        elem.style.display="none";
		if(this.type!=='duli' && dialog.$(this.s.id)){
			dialog.$(this.s.id).style.display="none";
            document.body.appendChild(dialog.$(this.s.id));
		}
        Object.prototype.toString.call(this.closeBack)==='[object Function]' && this.closeBack();
    }
};