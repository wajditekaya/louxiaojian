var play=function(){
	return {
		 domReady:function(fn){
			   var self=this;
			   if(!+'\v1'){
				  (function(){
					  try{
						  document.documentElement.doScroll('left');
					  } catch (error){
						  setTimeout(arguments.callee, 0);
						  return;
					  };
					  fn.call(window,self);
				  })();
			   }else{
				   document.addEventListener('DOMContentLoaded', function(){fn.call(window,self)}, false);
			   }
		},
		cre:function (obj) {return document.createElement(obj)},
		$:function(id) {return "string" == typeof id ? document.getElementById(id) : id;},
		isIE:(document.all) ? true : false,
		isIE6 :this.isIE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6),
		hasClass: function(elem, className){
			var has = new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)");
			return has.test(elem.className);
		},
		addClass: function(elem, className){
			if (play.hasClass(elem, className)) {
				return;
			}
			elem.className = [elem.className, className].join(" ");
		},
		removeClass: function(elem, className){
			var replace = new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)", "g");
			if (!play.hasClass(elem, className)) {
				return;
			}
			var o = elem.className;
			elem.className = o.replace(replace, " ");
			if (play.hasClass(elem, className)) {
				play.removeClass(elem, className);
			}
		},
		stopEvent:function(evt){
		    var evt = evt || window.event;
			this.stopPropagation(evt);
			this.preventDefault(evt);
		},
		stopPropagation:function(evt){
			if (evt.stopPropagation) {
				evt.stopPropagation();
			}
			else {
				evt.cancelBubble = true;
			}
		},
		pDefault:function(evt){
			if (evt.preventDefault) {
				evt.preventDefault();
			}
			else {
				evt.returnValue = false;
			}
		},
		addEvent:function (node, type, listener) {
			if(!(node = play.$(node))) return false;
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
		removeEvent:function (node, type, listener ) {
			if(!(node = play.$(node))) return false;
			if (node.removeEventListener) {
				node.removeEventListener( type, listener, false );
				return true;
			} else if (node.detachEvent) {
				node.detachEvent( 'on'+type, node[type+listener] );
				node[type+listener] = null;
				return true;
			}
			return false;
		}
	}
}();

function jsload(file,callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file);
    head.appendChild(script);
    if (!document.all) {
        script.onload = function () {
            callback();
        }
    } else {
        script.onreadystatechange = function () {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                 callback();
            }
        }
    };
    return false;
};

(function(){
    function G(a) {
        return document.getElementById(a)
    }
    var Slider = (function() {
        var m = 12;
        var q = 12;
        var d = 211;
        var n = false;
        var p;
        var k = 0;
        var b = null;
        var h = false;
        var i = G("holder");
        var f = G("gscroll");
        f.scrollLeft = i.scrollWidth;
        i.innerHTML += i.innerHTML;
        function j() {
            clearInterval(b);
            b = setInterval(function() {
                c();
                a()
            },
            3000)
        }
        function g() {
            clearInterval(b)
        }
        function r() {
            if (n) {
                return
            }
            clearInterval(b);
            n = true;
            p = setInterval(function() {
                e()
            },
            m)
        }
        function o() {
            if (h) {}
            clearInterval(p);
            if (f.scrollLeft % d != 0) {
                k = -(f.scrollLeft % d);
                s()
            } else {
                n = false
            }
            j()
        }
        function e() {
            if (f.scrollLeft <= 0) {
                f.scrollLeft = i.offsetWidth/2
            }
            f.scrollLeft -= q
        }
        function c() {
            clearInterval(p);
            if (n) {
                return
            }
            clearInterval(b);
            n = true;
            t();
            p = setInterval(function() {
                t()
            },
            m)
        }
        function a() {
            if (h) {}
            clearInterval(p);
            if (f.scrollLeft % d != 0) {
                k = d - f.scrollLeft % d;
                s()
            } else {
                n = false
            }
            j()
        }
        function t() {
            if (f.scrollLeft >= i.scrollWidth/2) {
                f.scrollLeft = 0
            }
            f.scrollLeft += q
        }
        function s() {
            if (k == 0) {
                n = false;
                h = false;
                return
            }
            var u;
            var v = m,
            w = q;
            if (Math.abs(k) < d / 5) {
                w = Math.round(Math.abs(k / 5));
                if (w < 1) {
                    w = 1
                }
            }
            if (k < 0) {
                if (k < -w) {
                    k += w;
                    u = w
                } else {
                    u = -k;
                    k = 0
                }
                f.scrollLeft -= u;
                setTimeout(function() {
                    s()
                },
                v)
            } else {
                if (k > w) {
                    k -= w;
                    u = w
                } else {
                    u = k;
                    k = 0
                }
                f.scrollLeft += u;
                setTimeout(function() {
                    s()
                },
                v)
            }
        }
        function l() {
            var w = G("gscroll");
            w.onmouseover = function() {
                Slider.stop()
            };
            w.onmouseout = function() {
                Slider.play()
            };
            var u = G("slide_left"),
            v = G("slide_right");
            u.onmousedown = function() {
                Slider.up()
            };
            v.onmousedown = function() {
                Slider.down()
            };
            u.onmouseup = u.onmouseout = function() {
                Slider.stopUp()
            };
            v.onmouseup = v.onmouseout = function() {
                Slider.stopDown()
            };
            j()
        }
        return {
            init: l,
            play: j,
            stop: g,
            up: r,
            stopUp: o,
            down: c,
            stopDown: a
        }
    })();
    Slider.init();
})()


play.domReady(function(S){
					   
	var copyUrl=function(){
		  if(!S.$('copyAddress')){return false}
		  S.addEvent(S.$('copyAddress'),'click',function(){
		  if(!S.isIE){alert('请在IE浏览器下复制')};
		  var clipBoardContent=window.location.href; 
		  window.clipboardData.setData("Text",clipBoardContent); 
		  alert("复制成功!赶快粘贴给QQ/MSN/论坛上的好友吧！");					  
	  })
	}(),
   /*===初始化PPS播放器===*/
   PPS_paly=function(){
	      if(!document.getElementById('installpps')) return false
		  var PPS_load=function(){
						installed_pps=null;
						ppspowerplayer.setclient('kan.pps.tv');
						ppspowerplayer.pps_width = 480;
						ppspowerplayer.pps_height = 387;
						ppspowerplayer.pps_autostart = 1;
						ppspowerplayer.pps_showcontrol=0;
						ppspowerplayer.setsrc('pps://oumzcogqeb33virr2aqa.pps/地心历险记.700k.rmvb');
						ppspowerplayer.callback_installpps=function(){
							try
							{
								document.getElementById("installpps").innerHTML = "<div class=\"showplayerimg\"><a href='http://download.ppstream.com/ppstreamsetup.exe' target='_blank'><img src='http://image1.webscache.com/kan/images/install.gif'  /></a></div>";	
								installed_pps=true;				
							}
							catch(e){}
						};
						ppspowerplayer.show=function()
						{
							try
							{
								if(!__isIE)
								{
									ff_alert_str = "<div class='no_ie' style='background:#ffc;height:25px;font-size:12px;color:#111;line-height:25px;text-align:center;border-bottom:1px solid #aaa;position:relative'><span>您的浏览器暂不支持PPS网页播放器，建议您使用IE内核的浏览器观看，或者直接打开PPS客户端观看。</span><div class='close' style='position:absolute;top:0;right:5px;'><a onclick=\"document.getElementById('browser_note').style.display='none';return false\" href='#' style='color:#111;text-decoration:none'>关闭</a></div></div>"
									var divContent = document.createElement("div");
									divContent.id='browser_note';
									divContent.innerHTML=ff_alert_str;
									document.body.insertBefore(divContent,document.body.firstChild);
								}
							
								if(!this.__isshow)
								{
									this._cexist();
									this._formatppsstr();
									document.getElementById('installpps').innerHTML=this.__ppsstr
									//document.write(this.__ppsstr);		
									//this.pps_obj=this._getobj();
									this.__isshow=true;
									this._isinstall();
									//window.attachEvent('onload',new Function(this._ppsinit(this)));//IE中
								}
							}
							catch(e)
							{
							}
						};
						ppspowerplayer.show();
						var timer=null;
						function play_next(url){
							ppspowerplayer.setsrc(url);
							ppspowerplayer.play();
						}
						play_next('pps://oumzcogqeb33virr2aqa.pps/地心历险记.700k.rmvb');
						window['play_pps']=play_next;
			};
			jsload('http://www.pps.tv/install_alert/pps.js',PPS_load);
   }();
   /*===初始化PPS播放器===*/
});

