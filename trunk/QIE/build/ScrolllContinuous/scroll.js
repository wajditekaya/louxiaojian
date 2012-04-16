/**
 * Created by JetBrains WebStorm.
 * User: LXJ
 * Date: 11-8-8 下午4:57
 * Mail: louxiaojian@gmail.com
 */
;(function(S) {
    function scroll(elem,s){
        /*
         *参数设置
         */
        var speed = s.speed || 15,//滚动的间隔
            space = s.space || 1,//滚动的间距
            panel = S.$(elem),
            wrap=S.$(s.wrap),
            mode=s.mode || 'level',//vertical垂直和level水平
            d=0,
            css={'vertical':['offsetHeight','top'],'level':['offsetWidth','left']}[mode];

        function isFunction(ar){
          return Object.prototype.toString.call(ar)=="[object Function]";
		};

        function scrollBase(){
            var self = this;
            if (!(self instanceof scrollBase)) {
                return new scrollBase();
            };
            this.init();
        };
        scrollBase.prototype={
            init:function(){
                if(!wrap || !panel || (panel[css[0]] <= wrap[css[0]] && panel[css[0]]!=0)){
                    return false;
                };
                panel.innerHTML += panel.innerHTML;
                this.ss=Math.floor(panel[css[0]] / 2);
                this.event();
            },
            cycle:function(){
                (this.ss==0)  && (this.ss=Math.floor(panel[css[0]] / 2));//避免在隐藏状态下 获取的值为0，导致滚动不正常bug
                var p=Math.abs(d)-this.ss;
                panel.style[css[1]] = ( p>=0 ? (0-p)  : (d=d-space) ) +'px';
                p>=0 && (d=0);
            },
            event:function(){
                var self = this,cycleTime = setInterval(function(){self.cycle()}, speed)
                panel.onmouseover = function(){
                    clearInterval(cycleTime);
                };
                panel.onmouseout = function(){
                    cycleTime = setInterval(function(){self.cycle()}, speed);
                };
            }
        };
        return scrollBase();
    }
    S.scroll = scroll;

    /*
     *S.scroll('J_scroll_panel',{wrap:'J_scroll_wrap',speed:20});
     *S.scroll('J_scroll_panel2',{wrap:'J_scroll_wrap2',mode:'vertical'});
     *解决当此模块的父层是一个隐藏层时，此时offsetWidth或offsetHeight值为0，scroll停止运行bug(2011-12-31);
     */
})(window.PPS || this);
