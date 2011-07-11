;(function(S){
    var d=new Date().getTime()
    var clientHeight=document.documentElement.clientHeight;
    document.getElementById('time').innerHTML=new Date().getTime()-d;
})(QIE);
QIE.plugins={};
QIE.plugins.lazyLoad=(function(S){
    var DOM=S.DOM,event=S.event;
    /*===lazyLoad===*/
    function lazyLoad(s){
        var self = this;
        if (!(self instanceof lazyLoad)) {
            return new lazyLoad(s);
        }
        this.init(s);
        //this.init.apply(this,arguments);
        this._filterImg();
        this.complete();
        this.loadLazy();
        DOM.on(window,'resize',this.resize=function(){
            if(self.resizeTime) clearTimeout(self.resizeTime);
            self.resizeTime=setTimeout(function(){self._containerInfo()},100);
        }
                );
    };
    lazyLoad.version=1.01;
    lazyLoad.prototype={
        init:function(s){
            /*
             @param lazyTag:延迟加载的标签，默认为img
             @param container:容器
             @param mode:加载的模式（垂直或水平）
             @param start:加载开始函数
             @param loading:加载ing函数
             @param callback:回调函数
             */
            this.lazyTag=s.lazyTag || "img";
            this.container=s.container || window;//容器
            this.mode=s.mode || "vertical"//垂直模式 horizontal(水平模式)
            this.placeholder=s.placeholder || 'placeholder.png';//占位图片
            this.start=s.start || function(){};
            this.loading=s.loading || function(){};
            this.callback=s.callback || function(){};

            var isWindow=this.container===window || (/^(?:body|html)$/i).test(this.container.tagName);
            if(isWindow){this._containerInfo();}

            this.lazylength;
            this.lazy=[];//存放需要延时加载的图片
        },
        _containerInfo:function(){
            var webkit=/applewebkit/.test(window.navigator.userAgent.toLowerCase()),d=document,db=d.body,dd=d.documentElement;//webkit内核浏览器
            this.dd=d.compatMode==="CSS1Compat" && !webkit ? dd : db;
            this.clientHeight=this.mode==='vertical' ? dd.clientHeight : dd.clientWidth;
            return this.clientHeight;
        },
        _getPos:function(o){
            if(DOM.getObjPos(o)){
                return this.mode==='vertical' ? DOM.getObjPos(o).y : DOM.getObjPos(o).x;
            }else{
                return 0
            }
        },
        _filterImg:function(){
            var img=document.getElementsByTagName(this.lazyTag);
            for(var i=0,len=img.length;i<len;i++){
                if(img[i].getAttribute("lazy_src")){
                    !img[i].src && (img[i].src=this.placeholder);
                    this.lazy.push(img[i]);
                }
            }
            this.lazylength=this.lazy.length;
            this.start.call(this,this);
        },
        _filterImg2:function(){
            var img=document.getElementsByTagName(this.lazyTag);
            for(var i=0,len=img.length;i<len;i++){
                if(img[i].getAttribute("lazy_src")){
                    var lobj={},pos;
                    !img[i].src && (img[i].src=this.placeholder);
                    pos=this._getPos(img[i])
                    lobj.o=img[i];

                    /*==过滤隐藏的图片(隐的图片的S.getObjPos(img[i])值不存在)，对于隐藏图片不进行pos赋值===*/
                    if(pos>=0 && !this.isHidden(img[i])){
                        lobj.pos=pos;
                    }
                    this.lazy.push(lobj);
                }
            }
            this.lazylength=this.lazy.length;
            this.start.call(this,this);
        },
        isHidden:function(elem){
            return ((elem.offsetWidth===0 && elem.offsetHeight===0) || DOM.getStyle(elem,'display')==='none') ? true :false;
        },
        /*==loadLazy==*/
        loadLazy:function(){
            var self=this;
            this.complete();
            this.loading.call(this,this);

            for(var i=0;i<this.lazylength;i++){
                var elem=this.lazy[i];
                if((this._getPos(elem)-this.dd.scrollTop)<this.clientHeight &&!this.isHidden(elem)){
                    elem.src=elem.getAttribute("lazy_src");
                    elem.setAttribute("lazy_src",'');
                    elem.removeAttribute("lazy_src");
                    this.lazy.splice(i--,1);
                    this.lazylength--;
                }
            };

            this.lazyTime=setTimeout(function(){self.loadLazy()},100);
        },
        /*==loadLazy2==*/
        loadLazy2:function(){
            var self=this;
            this.complete();
            this.loading.call(this,this);

            for(var i=0;i<this.lazylength;i++){
                var ly=this.lazy[i];
                if(ly.pos && (ly.pos-this.dd.scrollTop)<this.clientHeight &&!this.isHidden(ly.o)){
                    ly.o.src=ly.o.getAttribute("lazy_src");
                    ly.o.setAttribute("lazy_src",'');
                    ly.o.removeAttribute("lazy_src");
                    this.lazy.splice(i--,1);
                    this.lazylength--;
                }
                if(!ly.pos){
                    ly.pos=this._getPos(ly.o)
                }
            };

            this.lazyTime=setTimeout(function(){self.loadLazy2()},100);
        },
        /*==/loadLazy==*/
        complete:function(){
            if(this.lazylength===0) {
                clearTimeout(this.lazyTime);
                event.removeEvent(window,'resize',this.resize);
                this.callback.call(this,this);
                this.lazy=null;
                return true;
            };
            return false
        }

    };
    /*===/lazyLoad===*/

    S.lazyLoad=lazyLoad;

})(QIE);

QIE.ready(function(S){
    S.lazyLoad(
    {
        start:function(){
            S.$('lxj2')[0].value="总共有"+this.lazy.length+"张图片需要延迟加载";
        },
        loading:function(){
            S.$('lxj')[0].value='还有'+this.lazylength+'张图未加载';
        },
        callback:function(){
            S.$('lxj')[0].value='延迟加载完毕';
        }
    }
            );
})
