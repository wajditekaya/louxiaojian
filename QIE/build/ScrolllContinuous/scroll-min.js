(function(b){function a(i,l){var h=l.speed||15,c=l.space||1,d=b.$(i),e=b.$(l.wrap),j=l.mode||"level",k={vertical:["offsetHeight","top"],level:["offsetWidth","left"]}[j];function g(m){return Object.prototype.toString.call(m)=="[object Function]"}function f(){var m=this;if(!(m instanceof f)){return new f()}this.init()}f.prototype={init:function(){if(!e||!d||(d[k[0]]<=e[k[0]]&&d[k[0]]!=0)){return false}d.innerHTML+=d.innerHTML;this.ss=Math.floor(d[k[0]]/2);this.d=0;this.event();this.begin()},cycle:function(){var m=this;(this.ss==0)&&(this.ss=Math.floor(d[k[0]]/2));var n=Math.abs(this.d)-this.ss;d.style[k[1]]=(n>=0?(0-n):(this.d=this.d-c))+"px";n>=0&&(this.d=0);this.cycleTime=setTimeout(function(){m.cycle()},g(h)?(h.call(this,d,c,k[1])||h):h)},stop:function(){this.cycleTime&&clearInterval(this.cycleTime)},begin:function(){this.cycle()},event:function(){var m=this;d.onmouseover=function(){m.stop()};d.onmouseout=function(){m.begin()}}};return f()}b.scroll=a})(window.PPS||this);