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
        function play() {
            clearInterval(b);
            b = setInterval(function() {
                down();
                stopDown();
            },
            3000)
        }
        function stop() {
            clearInterval(b)
        }
        function up() {
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
        function stopUp() {
            if (h) {}
            clearInterval(p);
            if (f.scrollLeft % d != 0) {
                k = -(f.scrollLeft % d);
                s()
            } else {
                n = false
            }
            play()
        }
        function e() {
            if (f.scrollLeft <= 0) {
                f.scrollLeft = i.offsetWidth/2
            }
            f.scrollLeft -= q
        }
        function down() {
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
        function stopDown() {
            if (h) {}
            clearInterval(p);
            if (f.scrollLeft % d != 0) {
                k = d - f.scrollLeft % d;
                s()
            } else {
                n = false
            }
            play()
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
        function init() {
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
            play()
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
})();

