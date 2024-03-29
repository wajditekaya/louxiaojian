function $(id) {return "string" == typeof id ? document.getElementById(id) : id;};
domReady = !+'\v1' ? function(fn){(function(){
    try{
        document.documentElement.doScroll('left');
    } catch (error){
        setTimeout(arguments.callee, 0);
        return;
    };
    fn();
})();
} : function(fn){
    document.addEventListener('DOMContentLoaded', fn, false);
};
function cssValue(o,s){
    var r;
    function camelize(s) {
        return s.replace(/-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
    }
    if(!+'\v1'){
        if(s.indexOf('-')!=-1) s=camelize(s);
        r=o.currentStyle[s]
    }else{
        r=document.defaultView.getComputedStyle(o, null).getPropertyValue(s);
    }
    return r
};
function SliderLayer(s){
    this.SetOptions(s);
    if(!this.options.handle || !this.options.handleBx || this.options.handle.length!=this.options.handleBx.length) return false;
    this.handle=this.options.handle;
    this.handleBx=this.options.handleBx;
    this.y=this.interval=this.options.interval;
    this.delay=this.options.delay;
    this.Tween=this.options.Tween;
    this.evt=this.options.evt;
    this.cl=this.options.cl;
    this.cs=this.options.cs;
    this.index=this.options.index;
    this.key=true;//控制是否展开的开关
    this.start=this.options.start;
    this.end=this.options.end;
    this.firstInit=this.options.firstInit || 'yes';//是否初始化展开
    this.run();
}
SliderLayer.prototype={
    $:function(o){return typeof(o)=='string' ? document.getElementById(o) : o},
    on:function (node,type,listener) {
        if(!(node = this.$(node))) return false;
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
    },
    B:function(object, fun) {
        var args = Array.prototype.slice.call(arguments).slice(2);
        return function() {
            return fun.apply(object, args);
        }
    },
    E:function(destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
    },
    uncamelize:function(s, sep) {
        sep = sep || '-';
        return s.replace(/([a-z])([A-Z])/g, function (strMatch, p1, p2){
            return p1 + sep + p2.toLowerCase();
        });
    },
    camelize:function(s) {
        return s.replace(/-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
    },
    setStyle:function(element, styles) {
        if(!(element = this.$(element))) return false;
        for (var property in styles) {
            if(!styles.hasOwnProperty(property)) continue;
            if(element.style.setProperty) {
                element.style.setProperty(
                    this.uncamelize(property,'-'),styles[property],null);
            } else {
                element.style[this.camelize(property)] = styles[property];
            }
        }
        return true;
    },
    getEle:function(o){
        var obj=this.$(o),w=obj.offsetWidth,h=obj.offsetHeight;
        if(w==0 || h==0){
            this.setStyle(obj,{'position':'absolute','display':'block','visibility':'hidden'})
            w=obj.offsetWidth;
            h=obj.offsetHeight;
            this.setStyle(obj,{'position':'static','display':'none','visibility':'visible'})
        }
        return {
            'w':w,
            'h':h
        }
    },
    SetOptions:function(s){
        this.options={
            handle:[],
            handleBx:[],
            evt:'click',//触发菜单的方式
            eKey:0,//0为收缩状态，1为展开状态
            interval:40,//下拉缓动的时间
            delay:10,//下拉延时时间
            cl:0,//关闭上一个展开的(1:要关闭；0：不关闭)
            cs:1,//关闭自己(1:要关闭；0：不关闭)
            index:'',
            dis:['height'],
            Tween:function(t,b,c,d){return c*(t/=d)*t + b;},
            start:function(){},
            end:function(){}
        };
        this.E(this.options,s||{})
    },
    slider:function(o,hb,k){
        var b=0,c=this.getEle(hb).h,d=this.interval,t=0;
        if(!hb.style.overflow) hb.style.overflow='hidden';
        if(o.timer) clearTimeout(o.timer);
        this.y=0;
        function sMove(){
            if(t<d){
                t++;
                var m=Math.ceil(this.Tween(t,b,c,d));
                this.setStyle(hb,{'height': (o.mKey ? (m + "px") : (c-m + "px"))});
                !o.mKey && (c-m)==0 && this.setStyle(hb,{'display':'none'});
                o.timer=setTimeout(this.B(this,sMove), 10);
            }else{
                this.y=t;
                if(!o.mKey) this.setStyle(hb,{'display':'none'});
                this.setStyle(hb,{'height':'auto'});
                t=0;
                o.mKey=o.mKey ? 0 : 1
                this.end();
                if(this.lm!=hb && this.ln!=o && !k){
                    this.lm=hb;
                    this.ln=o;
                };
            };
        };

        sMove.call(this);

    },
    act:function(o){
        if(!this.cs && this.ln==o) return false;//要关闭上一个展开的情况下，再点击自己不收起或展开
        if(this.y!=this.interval) return false;//一个正在展开或收起时不展开另外一个.
        var n=this.index=o.nub,hb=this.handleBx[n];
        if(this.sTime) clearTimeout(this.sTime);
        this.sTime=setTimeout(this.B(this,function(){
            o.mKey=(cssValue(hb,'display')=='none' ||  hb.offsetHeight==0 ) ? 1 : 0;
            if(cssValue(hb,'display')=='none' || cssValue(hb,'visibility')=='hidden'){hb.style.display='block';hb.style.visibility='visible'};
            this.start();
            if(!this.key) return false;
            if(this.cl){
                if(!this.lm && !this.ln){
                    this.lm=hb;this.ln=o
                }else{
                    if(!this.ln.mKey && this.ln!=o) {this.slider(this.ln,this.lm,1)}//此处传入参数1是为了确保当关闭上一个比展开当前慢时，this.lm和this.ln赋值错误bug
                }
            };
            this.slider(o,hb);

        }),this.delay)
    },

    run:function(){
        if(this.handle.length!=this.handleBx.length) return false;
        for(var i=0,len=this.handle.length;i<len;i++){
            this.handle[i].nub=i;
            this.on(this.handle[i],this.evt,this.B(this,this.act,this.handle[i]));
            if(this.evt=='mouseover') this.on(this.handle[i],'mouseout',this.B(this,function(){if(this.sTime) clearTimeout(this.sTime);}));
        }
        if(this.index>=0 && this.cl && this.firstInit==='yes'){
            this.act(this.handle[this.index]);
        }else{
            this.lm=this.handleBx[this.index];
            this.ln=this.handle[this.index];
        };
    }

};
