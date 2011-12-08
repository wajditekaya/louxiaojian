/**
 * Created by JetBrains WebStorm.
 * User: LXJ
 * Date: 11-8-3 上午8:23
 * 2011-10-01修改重构
 * Mail: louxiaojian@gmail.com
 * 解决IE6下dialog.ajax和dialog.img不能关闭的bug(2011-10-08)
 */
(function(S){
    var toString=Object.prototype.toString,
        win=window,
        doc=document,
        db=doc.body,
        dd=doc.documentElement;
    function show(elem){
        elem.style.display='block';
    }
    function hide(elem){
        elem.style.display='none';
    }
    function dialog(elem,s){
        var self = this;
        if (!(self instanceof dialog)) {
            return new dialog(elem,s);
        }
        this.init(elem,s)
    };
    S.mix(dialog,{
        close:function(elem,s){
            S.$(elem || 'v-dialog').close();
        },
        remind:function(text,s){
            s.btnSl=1;
            this.prompt(text,s);
        },
        prompt:function(text,s){
            var butText=s.text || '确定',
                butText2=s.text2 || '取消',
                html='<p>'+text+'</p><div class="tal"><input class="btn primary" value="'+butText+'" type="button" />',
                textback=s.textback || function(){},
                textback2=s.textback2 || function(){},
                d,
                vd,
                btnSl=s.btnSl || 2;
            if(btnSl==2){
                html+='<input class="btn secondary" value="'+butText2+'" type="button" />'
            }
            html+='</div>';
            d=dialog(html,s);
            vd=S.$('v-dialog');
            S.on(S.getECN(vd,'primary','input')[0],'click',function(){
                textback.call(d)!==false && dialog.close();
            })
            if(btnSl==2){
                S.on(S.getECN(vd,'secondary','input')[0],'click',function(){
                    textback2.call(d)!==false && dialog.close();
                })
            }
        },
        ajax:function(url,s){
            if(!S.ajax){alert('缺少ajax模块');return false}
            dialog(s.ajaxLoading || 'ajax页面正在加载中',s);
            S.ajax(url,{
                'method':'get',
                'loadFun':function(t){
                    dialog.close();
                    dialog(t.responseText,s);
                }
            })
        },
        iframe:function(url,s){
            if(!S.iframeLoad){alert('缺少iframeLoad模块');return false}
            var d=dialog('<p id="dialog-iframe-loading">加载中.....</p><iframe id="dialog_iframe" src="'+url+'" name="dialog_iframe" class="iframe-hidden" name="dialog_iframe" width="100%" frameborder="no" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"></iframe>',s),iframe=S.$('dialog_iframe');
            S.iframeLoad(iframe,function(){
                iframe.style.height=this.newHeight;
                S.$('dialog-iframe-loading').style.display='none';
                d.setPosition();
            })
            iframe.src=url
        },
        img:function(url,s){
            dialog(s.imgLoading || '图片正在加载中',s);
            var img=new Image();
            img.onload=function(){
                //在这种情况下（img图片还没有dom结构）img.offsetWidth的值为0，此时图片的宽度也该用img.width来获取
                //s.width=this.offsetHeight+52;
                !s.width && (s.width=this.width+52);
                dialog.close();
                dialog('<img src="'+url+'" alt="" style="width:'+(s.width-52)+'px" />',s);
            }
            img.src=url;
        }
    })

    dialog.prototype={
        init:function(elem,s,undef){
            var _this=this;
            this.elem=elem;
            this.openBack=s.openBack;
            this.closeBack=s.closeBack || function(){};
            this.top=s.top;
            this.left=s.left;
            this.height=s.height;
            this.width=parseInt(s.width);
            this.title=s.title;
            this.type=s.type || 'default';
            this.closeName=s.closeName || 'dialog-close-handle';
            this.Layer=s.Layer===undef ? 1 : s.Layer;
            this.fix=s.fix;
            this.opacity=s.opacity || 0.5;
            this.autoClose=s.autoClose;//自动几秒后关闭功能
            this.dragKey=s.dragKey;
            this.dragTrigger=s.dragTrigger;
            this.dialogInit();
            this.open();
            if(this.dragKey) this.drag(this.dragTrigger,this.dialog);
            S.on(win,'resize',this.resize=function(){_this.setPosition.call(_this)})
        },
        shadingLayer:function(){
            var layDic,iframe;
            if(!S.$('layDic')){
                var DocumentFragment=doc.createDocumentFragment();
                layDic=doc.createElement("div");
                layDic.setAttribute('id','layDic');
                iframe=doc.createElement("iframe");
                iframe.setAttribute('id','layDic-iframe');
                iframe.setAttribute('frameborder','0');
                iframe.setAttribute('marginheight','0');
                iframe.setAttribute('marginwidth','0');
                layDic.style.cssText="opacity:0.5;background:#000;position:absolute;top:0;left:0;z-index:9998;display:none";
                iframe.style.cssText="opacity:0;-moz-opacity:0;filter:alpha(opacity=0);background:#000;position:absolute;top:0;left:0;z-index:9997;display:none";
                DocumentFragment.appendChild(layDic);
                DocumentFragment.appendChild(iframe);
                db.appendChild(DocumentFragment);
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
                title=this.title,
                elem=S.$(this.elem);
            if(this.type==='duli'){
                dialogPanel=this.dialog=S.$(this.elem);
            }else{
                if(!S.$('v-dialog')){
                    var html,div;
                    html='<div id="v-dialog" class="dialog dialog-b"><div class="dialog-hd dialog-bk"><span class="dhd-1"><span class="dhd-2"></span></span><b></b><s></s></div><div class="dialog-bd"><div class="dialog-wrap"><div class="dialog-main"><div class="dialog-mbd"></div></div></div><div class="dialog-lf"></div><div class="dialog-rg"></div></div><div class="dialog-close"><a href="#" class="dialog-close-handle" title="关闭">&times;</a></div><b class="jt" style="left:30px"></b><div class="dialog-ft dialog-bk"><span class="dhd-1"><span class="dhd-2"></span></span><b></b><s></s></div></div>';
                    div=doc.createElement('div');
                    div.innerHTML=html;
                    doc.body.appendChild(div.firstChild)
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
                        tmp=doc.createElement('div');
                        tmp.innerHTML=hdhtml;
                        dialoghd=tmp.firstChild;
                        dialogmain.insertBefore(tmp.firstChild,dialogbd);
                    })();
                    dialoghd.innerHTML=title;
                    this.dragTrigger=dialoghd;
                }else{
                    dialoghd && dialoghd.parentNode.removeChild(dialoghd);
                }
                if(elem){
                    show(elem);
                    dialogbd.appendChild(elem);
                }else{
                    dialogbd.innerHTML=this.elem;
                }
            }
            this.dragKey ? (this.dragTrigger && (this.dragTrigger.style.cursor='move')) : (this.dragTrigger && (this.dragTrigger.style.cursor=''));
            S.setStyle(dialogPanel,{'width':this.width+"px",'z-index':'9999','display':'none'});
            closebut=S.getECN(dialogPanel,this.closeName,'*');
            this.dialog.close=function(){
                _this.close.call(_this);
                return false;
            }
            S.each(closebut,function(val){
                val.onclick=function(){
                    _this.dialog.close();
                    return false;
                }
                S.on(val,'mousedown',function(){S.getEvent().stopPropagation()})
                S.on(val,'mouseup',function(){S.getEvent().stopPropagation()})

            });
        },
        fixed:function(undef){
            var dialogPanel=this.dialog;
            if(S.Browser.isIE6){
                var top=this.top!==undef ? parseInt(this.top) : this.cTop;
                var expression=";top:expression(documentElement.scrollTop+"+top+");)"
                dialogPanel.style.position='absolute';
                dialogPanel.style.cssText+=expression;
                db.style.cssText+=';background:url(about:blank) fixed';
            }else{
                S.setStyle(dialogPanel,{'position':"fixed",'top':this.top!==undef ? (parseInt(this.top)+'px') : this.cTop+"px"});
            }
            return this;
        },
        unfixed:function(undef){
            var dialogPanel=this.dialog;
            S.setStyle(dialogPanel,{'position':"absolute",'top':this.top!==undef ? (parseInt(this.top)+'px') : (Math.max(dd.scrollTop,db.scrollTop)+this.cTop+"px")});
        },
        setPosition:function(undef){
            var dialogPanel=this.dialog,layDic,iframe,sw=db.scrollWidth,sh=db.scrollHeight;
            if(this.Layer){
                this.shadingLayer();
                layDic=this.layDic;
                iframe=this.iframe;
                layDic.style.width=iframe.style.width = sw+"px";
                layDic.style.height=iframe.style.height = sh+"px";
                show(layDic);
                show(iframe);
            }
            show(this.dialog);
            this.pHeight=this.height ?  parseInt(this.height) : dialogPanel.offsetHeight;
            this.cTop=(dd.clientHeight-this.pHeight)*0.382;
            if(this.cTop<0) this.cTop=0;
            this.fix ? this.fixed() : this.unfixed();
            dialogPanel.style.left=this.left!==undef ? (parseInt(this.left)+'px') : ((dd.clientWidth-this.width)/2+"px");
        },
        open:function(){
            var self=this;
            this.setPosition();
            if(this.autoClose){
                this.autoCloseTime && clearTimeout(this.autoCloseTime);
                this.autoCloseTime=setTimeout(
                    function(){
                        self.close()
                    },
                    this.autoClose
                )
            }
            toString.call(this.openBack)==='[object Function]' && this.openBack();
        },
        close:function(){
            if(toString.call(this.closeBack)==='[object Function]' && this.closeBack()!==false){
                var dialogPanel=this.dialog,
                    layDic=this.layDic,
                    iframe=this.iframe,
                    elem=S.$(this.elem);
                if(this.Layer){
                    hide(layDic);
                    hide(iframe);
                }
                hide(dialogPanel);
                if(this.type!=='duli' && elem){
                    hide(elem);
                    doc.body.appendChild(elem);
                }
                S.removeEvent(win,'resize',this.resize);
                this.dragKey && this.dragTrigger && S.removeEvent(this.dragTrigger,'mousedown',this.mousedown);
                this.autoClose && this.autoCloseTime && clearTimeout(this.autoCloseTime);
            }
        },
        drag:function(trigger,panel){
            if(!trigger) return false;
            var dragYz,zj_x,zj_y,dragTrigger=trigger,dialogPanel=panel || trigger ,mx,my;
            function mousedown(){
                var e=S.getEvent();
                mx=e.clientX-S.offset(dialogPanel).left;
                my=e.clientY+Math.max(db.scrollTop,dd.scrollTop)-S.offset(dialogPanel).top;
                dragYz=doc.createElement('div');
                S.setStyle(dragYz,{width:dialogPanel.offsetWidth-4+'px',height:dialogPanel.offsetHeight-4+'px',position:'absolute',top:S.offset(dialogPanel).top+'px',left:S.offset(dialogPanel).left+'px',border:'2px dashed #333','z-index':999999});
                db.appendChild(dragYz);
                db.style.cursor='move';
                if(S.Browser.isIE){
                    //焦点丢失
                    S.on(dragYz, "losecapture", stop);
                    //设置鼠标捕获
                    dragYz.setCapture();
                }else{
                    //焦点丢失
                    S.on(window, "blur", stop);
                    //阻止默认动作
                    e.preventDefault();
                };
                S.on(doc,'mousemove',move);
                S.on(doc,'mouseup',stop);
            }
            function move(){
                var e=S.getEvent(),
                    cw=Math.min(dd.clientWidth,db.clientWidth),
                    ch=dd.clientHeight,
                    st=Math.max(db.scrollTop,dd.scrollTop);
                //清除选择
                win.getSelection ? win.getSelection().removeAllRanges() : doc.selection.empty();
                zj_x=e.clientX-mx;
                zj_y=e.clientY+st-my;
                if(zj_x<0){
                    zj_x=0;
                }
                if(zj_x+dragYz.offsetWidth>cw){
                    zj_x=cw-dragYz.offsetWidth;
                }
                if(zj_y<st){
                    zj_y=st;
                }
                if(zj_y-st+dragYz.offsetHeight>ch){
                    zj_y=st+ch-dragYz.offsetHeight;
                }
                S.setStyle(dragYz,{top:zj_y+'px',left:zj_x+'px'})
            };
            function stop(){
                if(S.Browser.isIE){
                    S.removeEvent(dragYz, "losecapture", stop);
                    dragYz.releaseCapture();
                }else{
                    S.removeEvent(window, "blur", stop);
                };
                dragYz && dragYz.parentNode && dragYz.parentNode.removeChild(dragYz);
                S.setStyle(dialogPanel,{position:'absolute',top:zj_y+'px',left:zj_x+'px'})
                db.style.cursor='auto';
                S.removeEvent(doc,'mousemove',move);
                S.removeEvent(doc,'mouseup',stop);
            };
            S.on(dragTrigger,'mousedown',this.mousedown=mousedown);
        }
    };
    S.dialog=dialog;
})(QIE)
