/**
 * Created by JetBrains WebStorm.
 * User: LXJ
 * Date: 11-8-3 ÉÏÎç8:23
 * Mail: louxiaojian@gmail.com
 */
function dialog(s){
	var self = this;
	if (!(self instanceof dialog)) {
		return new dialog(s);
	}
	this.init(s)

};
dialog.close=function(elem,s){
	var s=s || 'dialog-close-handle',closebut=this.getECN(this.$(elem),s,'*');
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
        this.dialog=dialog.$(s.id);
        this.openBack=s.openBack;
        this.closeBack=s.closeBack;
        this.top=s.top;
        this.left=s.left;
        this.height=s.height;
        this.width=s.width;
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
        if(!dialog.$('layDic')){
            var DocumentFragment=document.createDocumentFragment();
            this.layDic=document.createElement("div");
            this.layDic.setAttribute('id','layDic');
            this.iframe=document.createElement("iframe");
            this.iframe.setAttribute('id','layDic-iframe');
            this.iframe.setAttribute('frameborder','0');
            this.iframe.setAttribute('marginheight','0');
            this.iframe.setAttribute('marginwidth','0');
            this.layDic.style.cssText="opacity:"+this.opacity+";-moz-opacity:"+this.opacity+";filter:alpha(opacity="+this.opacity*100+");background:#000;position:absolute;top:0;left:0;z-index:9998;display:none";
            this.iframe.style.cssText="opacity:0;-moz-opacity:0;filter:alpha(opacity=0);background:#000;position:absolute;top:0;left:0;z-index:9997;display:none";
            DocumentFragment.appendChild(this.layDic);
            DocumentFragment.appendChild(this.iframe);
            document.body.appendChild(DocumentFragment);
        }else{
            this.layDic=dialog.$('layDic');
            this.iframe=dialog.$('layDic-iframe');
        }
    },
    dialogInit:function(){
        var closebut,_this=this;
        this.dialog.style.display="block";
        this.pHeight=this.height ?  parseInt(this.height) : this.dialog.offsetHeight;
        this.pWidth=parseInt(this.width);
        this.dialog.style.width=this.pWidth+"px";
        this.dialog.style.zIndex=9999;
        this.dialog.style.display="none";
        closebut=dialog.getECN(this.dialog,this.closeName,'*');
        for(var i=0,len=closebut.length;i<len;i++){
            closebut[i].onclick=function(){_this.close.call(_this);return false;
            }
        }
    },
    fixed:function(undef){
        if(dialog.isIE6()){
            var top=this.top!==undef ? parseInt(this.top) : this.cTop;
            var expression=";top:expression(documentElement.scrollTop+"+top+");)"
            this.dialog.style.position='absolute';
            this.dialog.style.cssText+=expression;
            document.body.style.cssText+=';background:url(about:blank) fixed';
        }else{
            this.dialog.style.position='fixed';
            this.dialog.style.top=this.top!==undef ? (parseInt(this.top)+'px') : this.cTop+"px";
        }
        return this;
    },
    unfixed:function(undef){
        this.dialog.style.position="absolute";
        this.dialog.style.top=this.top!==undef ? (parseInt(this.top)+'px') : (Math.max(this.dd.scrollTop, this.db.scrollTop)+this.cTop+"px");
    },
    setPosition:function(undef){
        if(this.Layer){
            this.layDic.style.width = this.db.scrollWidth+"px";
            this.layDic.style.height = this.db.scrollHeight+"px";
            this.iframe.style.width = this.db.scrollWidth+"px";
            this.iframe.style.height = this.db.scrollHeight+"px";
        }
        this.cTop=(this.dd.clientHeight-this.pHeight)*0.382;
        if(this.cTop<0) this.cTop=0;
        this.fix ? this.fixed() : this.unfixed();
        this.dialog.style.left=this.left!==undef ? (parseInt(this.left)+'px') : ((this.dd.clientWidth-this.pWidth)/2+"px");
    },
    open:function(){
        if(this.Layer){
            this.shadingLayer();
            this.layDic.style.display="block";
            this.iframe.style.display="block"
        };
        this.setPosition();
        this.dialog.style.display="block";
        Object.prototype.toString.call(this.openBack)==='[Array Function]' && this.openBack();
    },
    close:function(){
        if(this.Layer){
            this.layDic.style.display="none";
            this.iframe.style.display="none";
            this.layDic.parentNode.removeChild(this.layDic);
            this.iframe.parentNode.removeChild(this.iframe);
        }
        this.dialog.style.display="none";
        Object.prototype.toString.call(this.closeBack)==='[Array Function]' && this.closeBack();
    }
};
//new dialog({id:'playHistory_float',width:178})

