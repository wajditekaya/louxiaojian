/**
 * Created by JetBrains WebStorm.
 * User: LXJ
 * Date: 11-8-3 上午8:23
 * 2011-10-01修改重构
 * Mail: louxiaojian@gmail.com
 */
(function(S){
	function dialog(elem,s){
		var self = this;
		//alert(arguments[0].id)
			//alert(arguments[0].width)
		if (!(self instanceof dialog)) {
			return new dialog(elem,s);
		}
		this.init(elem,s)
	};
	S.$=function(id) {
            var elem="string" == typeof id ? document.getElementById(id) : id;
            return elem;
    };
	dialog.close=function(elem,s){
		var elem=elem || 'v-dialog',s=s || 'dialog-close-handle',closebut=S.getECN(S.$(elem),s,'*');
		closebut.length!=0 && closebut[0].onclick();
	}
	dialog.uio=function(text,s){
		var butText=s.text || '确定',butText2=s.text2 || '取消',html='<p>'+text+'</p><div class="tal"><input class="jfk-button jfk-button-action" value="'+butText+'" type="button" /><input class="gac_bt" value="'+butText2+'" type="button" /></div>';
		dialog(html,s);
		S.on(S.getECN(S.$('v-dialog'),'jfk-button-action','input')[0],'click',function(){
			s.textback && s.textback();
            dialog.close();
		})
		S.on(S.getECN(S.$('v-dialog'),'gac_bt','input')[0],'click',function(){
			s.textback2 && s.textback2();
            dialog.close();
		})
	}
	dialog.prototype={
		init:function(elem,s,undef){
			var _this=this;
			this.elem=elem;
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
			if(!S.$('layDic')){
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
			layDic=this.layDic=S.$('layDic');
			iframe=this.iframe=S.$('layDic-iframe');
			layDic.style.filter = "alpha(opacity=" + this.opacity*100 + ")";
			layDic.style.opacity = this.opacity;
		},
		dialogInit:function(){
			var closebut,
				_this=this,
				dialogPanel,
				elemmain,
				elembd,
				elemhd,
				title=this.title,
				elem=S.$(this.elem);
			if(this.type==='duli'){
			   dialogPanel=this.dialog=S.$(this.elem);
			}else{
				if(!S.$('v-dialog')){
					var html,div;
					html='<div id="v-dialog" class="dialog dialog-b"><div class="dialog-hd dialog-bk"><span class="dhd-1"><span class="dhd-2"></span></span><b></b><s></s></div><div class="dialog-bd"><div class="dialog-wrap"><div class="dialog-main"><div class="dialog-mbd"></div><div onclick="QIE.dialog.close()" class="dialog2-close" style="padding-left:10px"><span class="code">dialog.close()</span></div></div></div><div class="dialog-lf"></div><div class="dialog-rg"></div></div><div class="dialog-close"><a href="#" class="dialog-close-handle" title="关闭">关闭</a></div><b class="jt" style="left:30px"></b><div class="dialog-ft dialog-bk"><span class="dhd-1"><span class="dhd-2"></span></span><b></b><s></s></div></div>';
					div=document.createElement('div');
					div.innerHTML=html;
					document.body.appendChild(div.firstChild)
				}
				dialogPanel=this.dialog=S.$('v-dialog');
				dialogmain=S.getECN(dialogPanel,'dialog-main','div')[0];
				dialogbd=S.getECN(dialogPanel,'dialog-mbd','div')[0];
				dialoghd=S.getECN(dialogPanel,'dialog-mhd','div')[0];
				dialogbd.innerHTML='';
				if(title){
				   !dialoghd && (function(){
					   var tmp,hdhtml;
						hdhtml='<div class="dialog-mhd"></div>';
						tmp=document.createElement('div');
						tmp.innerHTML=hdhtml;
						dialoghd=tmp.firstChild;
						dialogmain.insertBefore(tmp.firstChild,dialogbd);
					})();
					dialoghd.innerHTML=title;
				}else{
				   dialoghd && dialoghd.parentNode.removeChild(dialoghd);
				}
				if(elem){
				   elem.style.display="block"
				   dialogbd.appendChild(elem);
				}else{
				   dialogbd.innerHTML=this.elem;
				}
			}
			dialogPanel.style.display="block";
			this.pHeight=this.height ?  parseInt(this.height) : dialogPanel.offsetHeight;
			this.pWidth=parseInt(this.width);
			S.setStyle(dialogPanel,{'width':this.pWidth+"px",'z-index':'9999','display':'none'});
			closebut=S.getECN(dialogPanel,this.closeName,'*');
			for(var i=0,len=closebut.length;i<len;i++){
				closebut[i].onclick=function(){_this.close.call(_this);return false;
				}
			}
		},
		fixed:function(undef){
			var dialogPanel=this.dialog;
			if(S.Browser.isIE6){
				var top=this.top!==undef ? parseInt(this.top) : this.cTop;
				var expression=";top:expression(documentElement.scrollTop+"+top+");)"
				dialogPanel.style.position='absolute';
				dialogPanel.style.cssText+=expression;
				document.body.style.cssText+=';background:url(about:blank) fixed';
			}else{
                S.setStyle(dialogPanel,{'position':"fixed",'top':this.top!==undef ? (parseInt(this.top)+'px') : this.cTop+"px"});
			}
			return this;
		},
		unfixed:function(undef){
			var dialogPanel=this.dialog;
			S.setStyle(dialogPanel,{'position':"absolute",'top':this.top!==undef ? (parseInt(this.top)+'px') : (Math.max(this.dd.scrollTop, this.db.scrollTop)+this.cTop+"px")});
		},
		setPosition:function(undef){
			var dialogPanel=this.dialog,layDic=this.layDic,iframe=this.iframe,sw=this.db.scrollWidth,sh=this.db.scrollHeight;
			if(this.Layer){
				layDic.style.width=iframe.style.width = sw+"px";
				layDic.style.height=iframe.style.height = sh+"px";
			}
			this.cTop=(this.dd.clientHeight-this.pHeight)*0.382;
			if(this.cTop<0) this.cTop=0;
			this.fix ? this.fixed() : this.unfixed();
			dialogPanel.style.left=this.left!==undef ? (parseInt(this.left)+'px') : ((this.dd.clientWidth-this.pWidth)/2+"px");
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
			var dialogPanel=this.dialog,
				layDic=this.layDic,
				iframe=this.iframe,
				elem=S.$(this.elem);
			if(this.Layer){
				layDic.style.display="none";
				iframe.style.display="none";
			}
			dialogPanel.style.display="none";
			if(this.type!=='duli' && elem){
				elem.style.display="none";
				document.body.appendChild(elem);
			}
			Object.prototype.toString.call(this.closeBack)==='[object Function]' && this.closeBack();
		}
	};
	S.dialog=dialog;
})(QIE)
