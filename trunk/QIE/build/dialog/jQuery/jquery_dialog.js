(function($) {
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
            this.title=s.width || '提示';
            this.type=s.type || 'a';
            this.layoutInit();
        },
        maskShow:function(){
            var w = Math.max(document.body.scrollWidth,document.documentElement.scrollWidth), h = $(document).height();
            if($('#v-mask').length==0){
                $('<iframe id="v-mask-iframe" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" src="about:blank" style="z-index:9997;position:absolute;top:0;left:0;"></iframe>').appendTo('body');
                $('<div id="v-mask" style="opacity:0.3;-moz-opacity:0.3;filter:alpha(opacity=30);background:#000;position:absolute;top:0;left:0;z-index:9998;display:none"></div>').appendTo('body');
            }
            this.mask=$('#v-mask');
            this.mask_iframe=$('#v-mask-iframe');
            this.mask_iframe.css({'width':w+'px','height':h+'px','display':'block','opacity':'0'});
            this.mask_iframe.show();
            this.mask.css({'width':w+'px','height':h+'px','display':'block'})
            this.mask.show();
        },
        maskClose:function(){
            this.mask.fadeOut(200);
            this.mask_iframe.hide()
        },
        layoutInit:function(){
            var self=this;
            if($('#v-dialog').length==0){
                if(this.type==='b'){
                    $('<div id="v-dialog" class="dialog dialog-b"><div class="dialog-hd dialog-bk"><span class="dhd-1"><span class="dhd-2"></span></span><b></b><s></s></div><div class="dialog-bd"><div class="dialog-wrap"><div class="dialog-main"><div class="dialog-mhd">'+this.title+'</div><div class="dialog-mbd"></div></div></div><div class="dialog-lf"></div><div class="dialog-rg"></div></div><div class="dialog-close"><a href="#" class="dialog-close-handle" title="关闭">关闭</a></div><b class="jt" style="left:30px"></b><div class="dialog-ft dialog-bk"><span class="dhd-1"><span class="dhd-2"></span></span><b></b><s></s></div></div>').appendTo('body');
                }else{
                    $('<div class="dialog dialog-b" id="v-dialog"><div class="dialog-hd dialog-bk"><span class="dhd-1"><span class="dhd-2"></span></span><b></b><s></s></div><div class="dialog-bd"><div class="dialog-wrap"><div class="dialog-main"></div></div><div class="dialog-lf"></div><div class="dialog-rg"></div></div><div class="dialog-close"><a href="#" title="关闭" class="dialog-close-handle">关闭</a></div><b class="jt" style="left:30px"></b><div class="dialog-ft dialog-bk"><span class="dhd-1"><span class="dhd-2"></span></span><b></b><s></s></div></div>').appendTo('body');
                }
            }
			this.maskShow();
            this.dialog=$('#v-dialog');
            this.dialogIn=$('#v-dialog div.dialog-mbd').length==0 ? $('#v-dialog div.dialog-main') : $('#v-dialog div.dialog-mbd');
//                ($.browser.msie&&($.browser.version == "6.0")) ? 'absolute' : 'fixed'
            this.dialog.css({'width':this.width+'px','position':'absolute','display':'block','z-index':'99999'});
            this.dialogIn.html('');
            if(this.isDom(this.elem)){
                this.elem.show();
                this.dialogIn.append(this.elem);
            }else{
                this.dialogIn.html(this.elem.string);
            }
            this.position();
            $('#v-dialog .dialog-close-handle').click(function(){
                self.close();
                return false
            })
        },
        position:function(){
            var w = $(window).width(), h = $(window).height(), st = $(window).scrollTop();
            this.dialog.css({'left':(w-this.dialog.width())/2+'px','top':(h-this.dialog.height())*0.382+st+'px'})
        },
        isDom:function(elem){
            return elem[0] && elem[0].nodeType && elem[0].nodeType==1;
        },
        close:function(){
            var self=this;
            this.dialog.fadeOut(200,
                function(){
                    if(self.isDom(self.elem)){
                        self.elem.hide();
                        self.elem.appendTo('body')
                    };
                });
            this.maskClose();
            $(window).unbind('resize', this.resize);
        }
    })
    $.dialog=dialog;
    $.fn.dialog=function(s){dialog(this,s)};
})(jQuery);