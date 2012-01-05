(function($) {
    var toString=Object.prototype.toString,
        win=window,
        doc=document,
        db=doc.body,
        dd=doc.documentElement,
		$win=$(win),
		$doc=$(doc),
        $db=$(db),
        $dd=$(dd);
    function dialog(elem,s){
        var self = this;
        if (!(self instanceof dialog)) {
            return new dialog(elem,s);
        }
        this.init(elem,s);
        $(window).bind('resize',this.resize=function(){
            self.position();
            self.maskShow();
        });
    };
    $.extend(dialog,{
        close:function(){
            $('#v-dialog .dialog-close-handle').first().click();
        }
    });
    $.extend(dialog.prototype,{
        init:function(elem,s){
            this.elem=$(elem);
            this.elem.string=elem;
            this.width=parseInt(s.width || 360);
            this.title=s.title;
			this.dragKey=s.dragKey;
			this.closeBack=s.closeBack || function(){};
            this.layoutInit();
			if(this.dragKey) this.drag(this.dragTrigger,this.dialog);
        },
        maskShow:function(){
            var w = Math.max(document.body.scrollWidth,document.documentElement.scrollWidth), 
				h = $(document).height(),
				mask=$('#v-mask'),
				mask_iframe=$('#v-mask-iframe');
            if(!mask[0]){
                mask_iframe=$('<iframe id="v-mask-iframe" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" src="about:blank" style="z-index:9997;position:absolute;top:0;left:0;"></iframe>').appendTo('body');
                mask=$('<div id="v-mask" style="opacity:0.3;-moz-opacity:0.3;filter:alpha(opacity=30);background:#000;position:absolute;top:0;left:0;z-index:9998;display:none"></div>').appendTo('body');
            }
            mask_iframe.css({'width':w+'px','height':h+'px','display':'block','opacity':'0'});
            mask_iframe.show();
            mask.css({'width':w+'px','height':h+'px','display':'block'})
            mask.show();
            this.mask=mask;
            this.mask_iframe=mask_iframe;
        },
        maskClose:function(){
            this.mask.fadeOut(200);
            this.mask_iframe.hide();
        },
        layoutInit:function(){
            var self=this,dialog,dialoghd;
			dialog=$('#v-dialog');
            if(!dialog[0]){
                dialog=$('<div id="v-dialog" class="dialog dialog-b"><div class="dialog-hd dialog-bk"><span class="dhd-1"><span class="dhd-2"></span></span><b></b><s></s></div><div class="dialog-bd"><div class="dialog-wrap"><div class="dialog-main"><div class="dialog-mbd"></div></div></div><div class="dialog-lf"></div><div class="dialog-rg"></div></div><div class="dialog-close"><a href="#" class="dialog-close-handle" title="关闭">×</a></div><b class="jt" style="left:30px"></b><div class="dialog-ft dialog-bk"><span class="dhd-1"><span class="dhd-2"></span></span><b></b><s></s></div></div>').appendTo('body');
            };
			this.maskShow();
            this.dialogIn=$('#v-dialog div.dialog-mbd');
			dialoghd=$('#v-dialog div.dialog-mhd').eq(0);
			if(this.title){
			   if(!dialoghd[0]){
			     dialoghd=$('<div class="dialog-mhd"></div>').prependTo('#v-dialog div.dialog-main');
			   }
			   dialoghd.html(this.title);
			}else{
			   if(dialoghd[0]){
			     dialoghd.remove();
			   }
			}
            dialog.css({'width':this.width+'px','position':'absolute','display':'block','z-index':'99999'});
            this.dialogIn.html('');
            if(this.isDom(this.elem)){
                this.elem.show();
                this.dialogIn.append(this.elem);
            }else{
                this.dialogIn.html(this.elem.string);
            }
			this.dialog=dialog;
			this.dragTrigger=dialoghd;
			this.closeHandle=$('#v-dialog .dialog-close-handle');
			this.position();
			(this.dragKey && this.dragTrigger) ? this.dragTrigger.css({"cursor":"move"}) : this.dragTrigger.css({"cursor":""});
            this.closeHandle.bind('click',function(){
                self.close();
                return false
            });
        },
        position:function(){
            var w = $win.width(), h = $win.height(), st = $win.scrollTop();
            this.dialog.css({'left':(w-this.dialog.width())/2+'px','top':(h-this.dialog.height())*0.382+st+'px'})
        },
        isDom:function(elem){
            return elem[0] && elem[0].nodeType && elem[0].nodeType==1;
        },
        close:function(){
            var self=this;
			if(toString.call(this.closeBack)==='[object Function]' && this.closeBack()!==false){
				this.dialog.fadeOut(200,
					function(){
						if(self.isDom(self.elem)){
							self.elem.hide();
							self.elem.appendTo('body')
						};
					});
				this.maskClose();
				this.closeHandle.unbind('click');
				$win.unbind('resize', this.resize);
				this.dragKey && this.dragTrigger && this.dragTrigger.unbind('mousedown',this.mousedown);
			}
        },
        drag:function(trigger,panel){
            if(!trigger) return false;
            var dragYz,zj_x,zj_y,dragTrigger=trigger,dialogPanel=panel || trigger ,mx,my;
            function mousedown(e){
                mx=e.clientX-dialogPanel.offset().left;
                my=e.clientY+$win.scrollTop()-dialogPanel.offset().top;
                dragYz=$("<div></div>");
                dragYz.css({width:dialogPanel.width()-4+'px',height:dialogPanel.height()-4+'px',position:'absolute',top:dialogPanel.offset().top+'px',left:dialogPanel.offset().left+'px',border:'2px dashed #333','z-index':999999});
				dragYz.appendTo('body');
                $db.css({'cursor':'move'});
                if($.browser.msie){
                    //焦点丢失
                    dragYz.bind("losecapture", stop);
                    //设置鼠标捕获
                    dragYz[0].setCapture();
                }else{
                    //焦点丢失
                    $win.bind("blur", stop);
                    //阻止默认动作
                    e.preventDefault();
                };
                $doc.bind('mousemove',move);
                $doc.bind('mouseup',stop);
            }
            function move(e){
                var cw=$win.width(),
                    ch=$win.height(),
                    st=$win.scrollTop(),
					dragYzWidth=dragYz.outerWidth(),
					dragYzHeight=dragYz.outerHeight();
                //清除选择
                win.getSelection ? win.getSelection().removeAllRanges() : doc.selection.empty();
                zj_x=e.clientX-mx;
                zj_y=e.clientY+st-my;
                if(zj_x<0){
                    zj_x=0;
                }
                if(zj_x+dragYzWidth>cw){
                    zj_x=cw-dragYzWidth;
                }
                if(zj_y<st){
                    zj_y=st;
                }
                if(zj_y-st+dragYzHeight>ch){
                    zj_y=st+ch-dragYzHeight;
                }
                dragYz.css({top:zj_y+'px',left:zj_x+'px'})
            };
            function stop(){
                if($.browser.msie){
                    dragYz.unbind("losecapture", stop);
                    dragYz[0].releaseCapture();
                }else{
                    $win.unbind("blur", stop);
                };
                dragYz && dragYz.remove();
                dialogPanel.css({position:'absolute',top:zj_y+'px',left:zj_x+'px'})
                $db.css({"cursor":'auto'});
                $doc.unbind('mousemove',move);
                $doc.unbind('mouseup',stop);
            };
            dragTrigger.bind('mousedown',this.mousedown=mousedown);
        }
    })
    $.dialog=dialog;
    $.fn.dialog=function(s){dialog(this,s)};
})(jQuery);