(function() {
    var a = {
        email: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        cnPhone: /^(\d{3,4}-)\d{7,8}(-\d{1,6})?$/,
        mobile: /^1[358]\d{9}$/,
        cnMobile: /^1[358]\d{9}$/,
        date: /^\d{4}\-[01]?\d\-[0-3]?\d$|^[01]\d\/[0-3]\d\/\d{4}$|^\d{4}\u5e74[01]?\d\u6708[0-3]?\d[\u65e5\u53f7]$/,
        string: /\d$/,
        integer: /^[1-9][0-9]*$/,
        number: /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$/,
        numberWithZero: /^[0-9]+$/,
        money: /^\d+(\.\d{0,2})?$/,
        alpha: /^[a-zA-Z]+$/,
        alphaNum: /^[a-zA-Z0-9_]+$/,
        betaNum: /^[a-zA-Z0-9-_]+$/,
        cnID: /^\d{15}$|^\d{17}[0-9a-zA-Z]$/,
        urls: /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        chinese: /^[\u2E80-\uFE4F]+$/,
        postal: /^[0-9]{6}$/,
        mutiYYYMM: /(20[0-1][0-9]((0[1-9])|(1[0-2]))[\,]?)+$/,
        name: /^([\u4e00-\u9fa5|A-Z]+\s*[.\uff0e\ub7]?\s*)+[\u4e00-\u9fa5|A-Z]$/
    },
    b = {
        100 : "%s",
        101 : "\u8bf7\u586b\u5199%s\u3002",
        1011 : "\u8bf7\u9009\u62e9%s\u3002",
        102 : "%s\u957f\u5ea6\u4e0d\u80fd\u8d85\u8fc7%s\u3002",
        103 : "%s\u957f\u5ea6\u4e0d\u80fd\u5c0f\u4e8e%s\u3002",
        104 : "%s\u6570\u503c\u4e0d\u80fd\u5927\u4e8e%s\u3002",
        105 : "%s\u6570\u503c\u4e0d\u80fd\u5c0f\u4e8e%s\u3002",
        106 : "%s\u4e0d\u80fd\u5927\u4e8e%s\u4e2a\u5b57\u7b26\uff0c1\u4e2a\u6c49\u5b57\u63092\u4e2a\u5b57\u7b26\u8ba1\u7b97",
        "not-number": "%s\u4e0d\u80fd\u5168\u4e3a\u6570\u5b57\u3002",
        number: "%s\u5fc5\u987b\u4e3a\u6570\u5b57\u3002",
        betaNum: "%s\u53ea\u80fd\u5305\u542b\u6570\u5b57\u3001\u5b57\u6bcd\u3001\u4e0b\u5212\u7ebf\u548c\u6a2a\u6760\u3002",
        email: "%s\u683c\u5f0f\u4e0d\u6b63\u786e\u3002",
        money: "%s\u5fc5\u987b\u4e3a\u6574\u6570\u6216\u5c0f\u6570\uff0c\u5c0f\u6570\u70b9\u540e\u4e0d\u8d85\u8fc72\u4f4d",
        numberWithZero: "%s\u5fc5\u987b\u4e3a\u6570\u5b57\u3002",
        chinese: "%s\u5fc5\u987b\u4e3a\u6c49\u5b57\u3002",
        cnMobile: "\u624b\u673a\u53f7\u7801\u683c\u5f0f\u6709\u8bef\uff0c\u662f11\u4f4d\u6570\u5b57\uff0c\u4e14\u662f13\uff0c15\uff0c18\u5f00\u5934\u3002",
        name: "%s\u53ea\u80fd\u542b\u6c49\u5b57\u3001\u5927\u5199\u5b57\u6bcd\u3001\u7b26\u53f7\u4e2d\u7684\u7a7a\u683c\u548c\u70b9\uff0c\u4e14\u81f3\u5c11\u4e24\u4e2a\u5b57\u3002"
    };
    AP.widget.Validator = function() {
        this.options = {
            formId: "",
            itemClass: "fm-item",
            notifyClass: "fm-explain",
            errorClass: "fm-error",
            tipsClass: "fm-tips",
            checkOnBlur: true,
            onSubmit: true,
            stopSubmit: false,
            onSuccess: null,
            onFail: null,
            ruleType: "name",
            userValidate: null,
            userDefine: null,
            loadClass: "loading-text",
            checkNull: false,
            unitBytes: false
        };
        this.cache = {
            access: false,
            tipfield: []
        };
        this.options.rules = {};
        this.items = {};
        this.init.apply(this, arguments)
    };
    AP.widget.Validator.prototype = {
        init: function(d) {
            L.augmentObject(this.options, d, true);
            this.setAccess(this.options.onSubmit);
            AP.cache.tester = this.options.rules;
            window.tester = function() {
                for (var e = [], g = 0; g < arguments.length; g++) {
                    var f = arguments[g];
                    if (AP.cache.tester.hasOwnProperty(f)) {
                        delete AP.cache.tester[f];
                        e = e.concat(D.query("*[name=" + f + "]")).concat(D.query("*[id=" + f + "]"))
                    }
                }
                log(e.length + " elements found: ");
                log(e);
                E.removeListener(e)
            };
            this.validate()
        },
        setAccess: function(d) {
            if (d === true) {
                for (var e = 0,
                g = E.getListeners(this.options.formId, "submit"); g && e > -1;) {
                    E.removeListener(this.options.formId, "submit");
                    e++
                }
                E.on(this.options.formId, "submit", this.plugin.stopEvent)
            }
        },
        getExplain: function(d) {
            var e = D.getAncestorByClassName(d, this.options.itemClass);
            return D.query("." + this.options.notifyClass, e)[0] || Element.create("div", {
                "class": this.options.notifyClass,
                appendTo: d.parentNode
            })
        },
        showExplain: function(d, e) {
            var g = e.parentNode;
            D.removeClass(g, "fm-error");
            D.removeClass(g, "fm-hover");
            D.addClass(g, "fm-focus"); ["input", "textarea"].contains(e.tagName.toLowerCase()) && e.select();
            try {
                if (this.getExplain(e).innerHTML.trim().length != 0) {
                    e.getAttribute("data-explain").trim().length == 0 && D.addClass(this.getExplain(e), "fn-hide");
                    this.getExplain(e).innerHTML = e.getAttribute("data-explain")
                }
            } catch(f) {}
        },
        hoverIn: function(d, e) {
            var g = e.parentNode;
            D.hasClass(g, "fm-error") || D.hasClass(g, "fm-focus") || D.addClass(g, "fm-hover")
        },
        hoverOut: function(d, e) {
            D.removeClass(e.parentNode, "fm-hover")
        },
        getError: function(d) {
            var e = 1,
            g = b[d] || b.email;
            if (g != null) {
                for (; arguments[e];) g = g.replace(/%s/, arguments[e++]);
                return g
            }
        },
        showError: function(d) {
            var e = D.query("." + this.options.notifyClass, this.parentNode)[0];
            D.addClass(this.parentNode, this.options.errorClass);
            D.removeClass(e, "fn-hide");
            e.innerHTML = d
        },
        getLength: function(d) {
            return this.options.unitBytes ? d.len() : d.length
        },
        getParentItem: function(d) {
            for (d = d.parentNode; d.nodeType == 1 && d !== document && !D.hasClass(d, this.options.itemClass);) d = d.parentNode;
            return d
        },
        validateProcess: function(d, e) {
            var g = e[0],
            f = this.options.rules[e[0][this.options.ruleType]],
            k = f.type,
            n = f.not || false,
            t = f.error === false ? f.explain || g.getAttribute("data-explain") : f.error,
            p = f.desc,
            r = this.getParentItem(g),
            s = this.getExplain(g) || null,
            v = s ? s.innerHTML: null,
            w = true,
            j = e[2],
            m = this.options.errorTrack === true ? true: false,
            o = f.noTrack && f.noTrack === true ? true: false,
            h = AP.hashExtend({
                SEPARATOR: "|",
                EMPTY: "empty",
                INVALID: "invalid"
            },
            this.options.errorTrackType, true),
            l = false;
            D.removeClass(r, "fm-focus");
            if (! (!f.desc && !f.type && f.error == "undefined")) {
                if (f.beforeValidate && f.beforeValidate.call(this, this, g, f) === false) return false;
                var q = g.value.trim(),
                u = f.relate;
                if (! (u && !D.get(u).checked)) {
                    if (f.trimChar) g.value = q = q.trimChar();
                    if (g.getAttribute("data-tips") && q === g.getAttribute("data-tips")) q = "";
                    if (g.type.toUpperCase() == "RADIO") {
                        var x = D.query("input[type=radio][" + this.options.ruleType + "=" + g.name + "]:checked");
                        v = f.explainEl || D.query(".fm-explain", g.parentNode)[0];
                        if (x.length > 0) {
                            D.removeClass(g.parentNode, "fm-error");
                            D.removeClass(g.parentNode, "fm-hover");
                            D.addClass(v, "fn-hide")
                        } else {
                            v.innerHTML = t || this.getError(101, p);
                            D.removeClass(v, "fn-hide");
                            w = false
                        }
                        E.on(D.query("input[type=radio][" + this.options.ruleType + "=" + g[this.options.ruleType] + "]"), "click",
                        function() {
                            D.removeClass(g.parentNode, "fm-error");
                            D.removeClass(g.parentNode, "fm-hover");
                            D.addClass(v, "fn-hide")
                        },
                        this)
                    }
                    if (q.length == 0 && g.type.toUpperCase() !== "RADIO") {
                        if (!j) return;
                        if (f.required) {
                            if (f.error == false) s.innerHTML = f.explain && f.explain.length > 0 ? f.explain: s.innerHTML || "";
                            else {
                                d = g.tagName.toUpperCase() === "SELECT" ? 1011 : 101;
                                s.innerHTML = this.getError(d, p)
                            }
                            l = h.EMPTY;
                            w = false
                        } else return
                    } else {
                        if (f.isAmount) {
                            __v = Math.round(q * Math.pow(10, 2)) / Math.pow(10, 2);
                            g.value = isNaN(__v) ? q: __v;
                            q = g.value
                        }
                        if (f.validate) {
                            if (f.validate.call(this, g, s) === false) w = false
                        } else {
                            if (n && a[n].test(q)) {
                                s.innerHTML = this.getError("not-" + n, p);
                                w = false
                            }
                            if (k && k.constructor == Array) for (d = 0; d < k.length; d++) if (a[k[d]].test(q)) {
                                w = true;
                                break
                            } else w = false;
                            if (k && !f.numberWithSpace && a[k] && !a[k].test(q) && w) {
                                s.innerHTML = t || this.getError(k, p);
                                w = false
                            } else if (w) {
                                if (f.numberWithSpace) q = q.trimAll();
                                if (f.numberWithSpace && !a.numberWithZero.test(q)) {
                                    s.innerHTML = t || this.getError("number", p);
                                    w = false
                                }
                                if (f.words && q.len() > f.words) {
                                    s.innerHTML = t || this.getError(106, p, f.words);
                                    w = false
                                }
                                if (f.maxLength && this.getLength(q) > f.maxLength) {
                                    s.innerHTML = t || this.getError(102, p, f.maxLength);
                                    w = false
                                }
                                if (f.minLength && this.getLength(q) < f.minLength) {
                                    s.innerHTML = t || this.getError(103, p, f.minLength);
                                    w = false
                                }
                                if (f.maxValue && f.maxValue !== "" && parseFloat(q) > f.maxValue) {
                                    s.innerHTML = t || this.getError(104, p, f.maxValue);
                                    w = false
                                }
                                if (f.minValue && f.minValue !== "" && parseFloat(q) < f.minValue) {
                                    s.innerHTML = t || this.getError(105, p, f.minValue);
                                    w = false
                                }
                                if (f.mask && !f.mask.test(q)) {
                                    s.innerHTML = t;
                                    w = false
                                }
                            }
                        }
                    }
                    if (f.afterValidate && f.afterValidate.call(this, w, this) === false) m = w = false;
                    if (f.except && q === f.except) w = true;
                    D.removeClass(r, "fm-focus");
                    if (!w) {
                        l = l || h.INVALID;
                        if (m && o !== true) try {
                            this.plugin.tracker(g[this.options.ruleType] + h.SEPARATOR + l)
                        } catch(A) {}
                        D.addClass(r, this.options.errorClass);
                        D.removeClass(s, "fn-hide");
                        this.cache.access = false
                    }
                }
            }
        },
        onSubmitProcess: function() {
            this.cache.access = true;
            if (this.options.onBefore && !this.options.onBefore()) return false;
            if (this.options.userValidate && !this.options.userValidate()) this.cache.access = false;
            for (i in this.options.rules) {
                var d = this.options.ruleType === "name" ? D.query("*[name=" + i + "]")[0] : D.get(i);
                if (! (false !== this.options.rules[i].depends && (d == "undefined" || d == null || d.offsetHeight == "undefined" || d.offsetHeight == 0))) {
                    var e = this.options.rules[i].relate || null;
                    e && !D.get(e).checked || this.validateProcess.apply(this, ["", [d, null, true]])
                }
            }
            this.clearFocus.call(this);
            if (this.cache.access) {
                this.options.onSuccess && this.options.onSuccess();
                if (this.options.loadClass) {
                    var g = D.query("." + this.options.loadClass, D.get("this.options.formId"));
                    g.length > 0 && D.removeClass(g[0], "fn-hide")
                }
                var f = D.query(".m-error", D.get(this.options.formId));
                f.length > 0 && D.addClass(f[0], "fn-hide");
                this.cache.tipfield.forEach(function(k) {
                    if (k.value === k.getAttribute("data-tips")) k.value = ""
                });
                if (this.options.userDefine) if (this.options.userDefine(this) == false) return;
                this.options.stopSubmit || D.get(this.options.formId).submit()
            } else this.options.onFail && this.options.onFail.call(this)
        },
        others: function() {},
        clearFocus: function() {
            D.removeClass(D.query(".fm-item", D.get(this.options.formId)), "fm-focus")
        },
        plugin: {
            maxLen: function(d, e) {
                if (e[0].value.length >= _rule.maxLength) e[0].value = e[0].value.substring(0, _rule.maxLength)
            },
            stopEvent: function(d) {
                E.preventDefault(d)
            },
            tracker: function(d) {
                Tracker.click(d)
            }
        },
        validate: function() {
            for (i in this.options.rules) {
                var d = this.options.ruleType === "name" ? D.query("*[name=" + i + "]")[0] : D.get(i),
                e = this.options.rules[i];
                if (! (d == null || d == "undefined")) {
                    d.getAttribute("data-explain") === null && d.setAttribute("data-explain", this.getExplain(d).innerHTML.replace(/(\"|\')/g, "$1"));
                    if (e.tips) {
                        this.cache.tipfield.push(d);
                        if (d.value.trimAll().length === 0) {
                            D.addClass(d, "fn-tips");
                            d.value = e.tips
                        }
                        d.setAttribute("data-tips", e.tips);
                        E.on(d, "focus",
                        function() {
                            D.removeClass(this, "fn-tips");
                            if (this.value === this.getAttribute("data-tips")) this.value = ""
                        },
                        "", d);
                        E.on(d, "blur",
                        function() {
                            if (this.value.trimAll().length === 0) {
                                this.value = this.getAttribute("data-tips");
                                D.addClass(this, "fn-tips")
                            }
                        },
                        "", d)
                    }
                    E.addListener(d, "focus", this.showExplain, d, this);
                    E.addListener(d, "mouseover", this.hoverIn, d, this);
                    E.addListener(d, "mouseout", this.hoverOut, d, this);
                    if (this.options.checkOnBlur) {
                        var g = typeof e.checkNull === "undefined" ? this.options.checkNull: e.checkNull;
                        E.addBlurListener(d, this.validateProcess, [d, null, g], this)
                    }
                    if (d.tagName.toUpperCase() == "TEXTAREA" && (e.isLimit || 0)) {
                        E.on(d, "keydown", this.plugin.maxLen, [d, e], this);
                        E.on(d, "keyup",
                        function(f, k) {
                            try {
                                if (k.value.length >= e.maxLength) k.value = k.value.substring(0, this.options.rules[i].maxLength)
                            } catch(n) {}
                        },
                        d, this)
                    }
                }
            }
            E.on(this.options.formId, "submit", this.onSubmitProcess, this, this)
        }
    }
})(); (function() {
    function a() {
        try {
            setTimeout(function() {
                D.setStyles(D.query("div.cal-calendar"), {
                    display: "none"
                })
            },
            0)
        } catch(d) {}
        AP.cache.xbox.timer && clearInterval(AP.cache.xbox.timer);
        if (AP.cache.xbox.DOMParent) {
            var e = D.get("xbox-mock").firstChild;
            if (D.hasClass(e, "xbox-caption")) e = e.nextSibling;
            AP.cache.xbox.DOMParent.appendChild(e)
        }
        try {
            if (AP.env.browser.msie && AP.env.browser.v < 8 || AP.env.browser.mozilla === true) {
                var g = D.query(".alieditContainer");
                g.length > 0 && AP.cache.hidePWDEdit && g.forEach(function(n) {
                    n.style.visibility = "visible";
                    n.style.opacity = "1";
                    n.style.filter = "alpha(opacity = 100)";
                    AP.cache.hidePWDEdit = true
                })
            }
        } catch(f) {}
        E.removeListener(document, "keyup");
        E.removeListener("xbox-mock");
        E.removeListener("xbox-overlay");
        e = D.get("xbox-mock");
        g = D.get("xbox-overlay");
        e && document.body.removeChild(e);
        g && document.body.removeChild(g);
        try {
            AP.cache.xbox.onHideEvent && AP.cache.xbox.onHideEvent.call()
        } catch(k) {}
        AP.cache.xbox = {}
    }
    AP.cache.xbox = {};
    var b = new AP.Class({
        options: {},
        cfg: {
            MOCK: "xbox-mock",
            MOCK_CLASS: "xbox-mock",
            LOAD: "xbox-load",
            IFRAME: "xbox-iframe",
            IFRAME_FIX: "xbox-hide-select",
            OVERLAY: "xbox-overlay",
            OVERLAY_BG: "xbox-overlay-bg"
        },
        setOptions: function(d) {
            return AP.hashExtend({
                el: "",
                type: "string",
                value: "",
                modal: true,
                width: 600,
                height: "",
                maxWidth: 800,
                maxHeight: 500,
                minHeight: null,
                autoFit: true,
                autoShow: false,
                border: true,
                onShowEvent: false,
                onHideEvent: false,
                noScroll: false,
                fixed: false,
                load: false,
                loadsrc: AP.fn.url.img + "/global/loading.gif"
            },
            d, true)
        },
        initialize: function(d) {
            this.options = this.setOptions(d);
            this._preLoadImg();
            this._bindEvent();
            E.on(document, "keyup",
            function(e) {
                if (E.getCharCode(e || window.event) == 27) {
                    AP.widget.xBox.hide();
                    try {
                        parent.AP.widget.xBox.hide()
                    } catch(g) {}
                }
            });
            if (this.options.onHideEvent) AP.cache.xbox.onHideEvent = this.options.onHideEvent
        },
        _preLoadImg: function() {
            var d = new Image;
            d.src = this.options.loadsrc
        },
        _bindEvent: function() {
            this.options.el !== false && this.options.el !== "" && E.on(this.options.el, "click",
            function(d, e) {
                e.fire.call(e, this, e);
                E.preventDefault(d)
            },
            this);
            E.on(D.query(".xbox-close-link"), "click",
            function(d) {
                AP.widget.xBox.hide();
                E.preventDefault(d)
            })
        },
        _makeValue: function() {
            var d = this.options.value,
            e = this.options.type;
            if (typeof d == "function") return d.call(this, AP.cache.xbox.fireObject);
            return e === "iframe" ? d: /^[a-zA-Z]([^#.\s]*)[a-zA-Z0-9]$/.test(d) ? D.get(d) : /^[a-zA-Z#\.]*(\s?)(.*)[a-zA-Z0-9]$/.test(d) ? D.query(d)[0] : d.toString()
        },
        _fixUrl: function(d) {
            return d + (d.indexOf("?") < 0 ? "?_xbox=true": "&_xbox=true")
        },
        _getType: function(d) {
            var e;
            return ((e = typeof d) == "object" ? d == null && "null" || Object.prototype.toString.call(d).slice(8, -1) : e).toLowerCase()
        },
        _getOptWidth: function() {
            var d;
            d = parent && parent.D.get("xbox-iframe") && parent.D.get("xbox-iframe").getAttribute("auto-width") > 0 ? parent.D.get("xbox-iframe").getAttribute("auto-width") : parseInt(this.options.width, 10);
            return this.options.width = d
        },
        _getOptHeight: function() {
            return parseInt(this.options.height, 10)
        },
        _getType: function(d) {
            var e;
            return ((e = typeof d) == "object" ? d == null && "null" || Object.prototype.toString.call(d).slice(8, -1) : e).toLowerCase()
        },
        _getNiceTop: function(d) {
            var e = D.get(this.cfg.MOCK);
            e = this.options.type.toLowerCase() == "dom" ? e.firstChild: e;
            var g = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop,
            f, k = D.getViewportHeight();
            _mH = d ? parseInt(this._getIFRHeight() || D.getStyle(this.cfg.MOCK, "height"), 10) : this._getWH(e)[1];
            f = k > _mH ? 0.382 * k - _mH / 2 : 50;
            f = Math.max(50, f) + g;
            f = Math.max(50, f);
            return parseInt(f, 10)
        },
        _getNiceLeft: function() {
            var d = D.get(this.cfg.MOCK),
            e = this._getWH(d)[0],
            g = (D.getViewportWidth() - 5 - e) / 2;
            return parseInt(g, 10)
        },
        _getWH: function(d) {
            d = typeof d == "string" ? document.getElementById(d) : d;
            if (d.offsetWidth === 0 || d.offsetHeight === 0) {
                var e = d.style.display || "",
                g = d.style.visibility || "",
                f;
                d.style.visibility = "hidden";
                d.style.display = "block";
                f = document.createElement("div");
                f.style.visibility = "hidden";
                f.appendChild(d.cloneNode(true));
                document.body.appendChild(f);
                d = f.firstChild;
                try {
                    d.style.visibility = g;
                    d.style.display = e;
                    document.body.removeChild(f)
                } catch(k) {}
            }
            return [d.offsetWidth, d.offsetHeight]
        },
        _contentOnLoad: function(d) {
            d.hideLoad.call(d);
            var e = D.get(this.cfg.MOCK);
            e = this.options.type.toLowerCase() === "dom" ? e: e.firstChild;
            e = d._getWH(e);
            D.setStyles(d.cfg.MOCK, {
                width: (d._getOptWidth() || e[0]) + "px"
            });
            D.setStyles(d.cfg.MOCK, {
                top: d._getNiceTop(false) + "px",
                left: d._getNiceLeft() + "px",
                visibility: "visible"
            })
        },
        _iframeOnLoad: function() {
            this.hideLoad();
            this._fitIFR();
            D.setStyle(this._mock, "top", this._getNiceTop(true) + "px");
            D.setStyle(this.cfg.IFRAME, "height", this._getIFRHeight() + "px");
            this.options.autoFit && this._autoFit();
            D.setStyle(this._iframe, "visibility", "visible");
            D.setStyle(this._mock, "visibility", "visible");
            if (AP.env.browser.mozilla && AP.env.browser.v === "1.9.0.15") {
                if (document.location.host.indexOf("cashier") < 1) this.cfg.autoFit = false;
                D.get(this.cfg.IFRAME).style.height = parseInt(D.get(this.cfg.MOCK).style.height, 10) + 1 + "px"
            }
            try {
                E.on(D.query(".xbox-close-link", D.get(this.cfg.IFRAME).contentWindow.document), "click",
                function(e) {
                    AP.widget.xBox.hide();
                    E.preventDefault(e)
                })
            } catch(d) {}
        },
        _fitIFR: function() {
            try {
                D.get(this.cfg.MOCK);
                D.setStyles(this.cfg.MOCK, {
                    width: this._getOptWidth() + "px",
                    height: this._getIFRHeight() + "px",
                    left: (D.getViewportWidth() - this.options.width) / 2 + "px"
                });
                D.setStyle(this.cfg.IFRAME, "width", this._getOptWidth() + "px");
                D.setStyle(this.cfg.IFRAME, "height", this._getIFRHeight() + "px");
                D.getStyle(this.cfg.MOCK, "height") + D.getStyle(this.cfg.MOCK, "top") > D.getViewportHeight() && D.setStyle(this.cfg.MOCK, "top", this._getNiceTop(true) + "px")
            } catch(d) {}
        },
        _autoFit: function() {
            try {
                var d = this;
                AP.cache.xbox.timer && clearInterval(AP.cache.xbox.timer);
                AP.cache.xbox.timer = setInterval(function() {
                    d._fitIFR()
                },
                75)
            } catch(e) {}
        },
        _getIFRHeight: function() {
            var d = D.get(this.cfg.IFRAME);
            try {
                var e = d.contentWindow.document.body.scrollHeight,
                g = d.contentWindow.document.documentElement.scrollHeight,
                f = window.userAgent,
                k = f.indexOf("safari") > -1 || f.indexOf("chrome") > -1 ? Math.min(e, g) : Math.max(e, g);
                if (g - e > 100) k = e;
                if (parseInt(this.options.minHeight, 10) > 0 && this.options.minHeight > k) k = this.options.minHeight;
                return k
            } catch(n) {}
        },
        _makeContent: function() {
            switch (this.options.type.toLowerCase()) {
            case "iframe":
                this.options.load = true;
                this._iframe = Element.create("iframe", {
                    id: this.cfg.IFRAME,
                    name: this.cfg.IFRAME,
                    frameBorder: "no",
                    scrolling: "no",
                    src: this._fixUrl(this._makeValue()),
                    style: {
                        visibility: "hidden",
                        width: this._getOptWidth() + "px"
                    }
                });
                E.on(this._iframe, "load", this._iframeOnLoad, this, true);
                this._mock.appendChild(this._iframe);
                break;
            case "dom":
                var d = this._makeValue();
                AP.cache.xbox.DOMParent = d.parentNode;
                this._mock.appendChild(d);
                E.onContentReady(this.cfg.MOCK, this._contentOnLoad, this, true);
                break;
            case "string":
                this._mock.innerHTML += this._makeValue();
                E.onContentReady(this.cfg.MOCK, this._contentOnLoad, this, true);
                break;
            default:
                break
            }
        },
        renderMock: function() {
            if (!D.get(this.cfg.MOCK)) {
                this._mock = Element.create("div", {
                    id: this.cfg.MOCK,
                    "class": this.cfg.MOCK_CLASS,
                    style: {
                        visibility: "hidden",
                        display: ""
                    },
                    appendTo: document.body
                });
                if (!this.options.border) this._mock.style.border = "none";
                this.options.title && this.options.title !== "" && Element.create("div", {
                    "class": "xbox-caption",
                    innerHTML: this.options.title,
                    appendTo: this._mock
                });
                this._makeContent()
            }
        },
        showMock: function() {
            D.setStyle(this._mock, "visibility", "visible")
        },
        renderOverlay: function() {
            var d = this.cfg.OVERLAY,
            e = document.body.scrollWidth > document.body.offsetWidth ? document.body.scrollWidth: document.body.offsetWidth + 50 + "px",
            g = D.getDocumentHeight();
            if (!D.get(this.cfg.OVERLAY)) this._overlay = Element.create("div", {
                id: this.cfg.OVERLAY,
                "class": this.cfg.OVERLAY_BG,
                style: {
                    height: g + "px",
                    visibility: "hidden",
                    opacity: "0",
                    filter: "alpha(opacity=0)",
                    "-moz-opacity": "0"
                },
                appendTo: document.body
            });
            if (AP.fn.browser.msie6) {
                this.options.noScroll || (e = "100%");
                D.setStyle(this.cfg.OVERLAY, "height", g);
                D.setStyle(this.cfg.OVERLAY, "width", e)
            }
            if (!D.get(this.cfg.IFRAME_FIX)) {
                this._overlay.innerHTML = '<iframe id="' + this.cfg.IFRAME_FIX + '" style="width: ' + e + "px; height:" + g + 'px" src="javascript:\'\'"></iframe>';
                d = this.cfg.IFRAME_FIX
            }
            if (AP.env.browser.msie && AP.env.browser.v < 8 || AP.env.browser.mozilla === true) {
                d = D.query(".alieditContainer");
                d.length > 0 && d.forEach(function(f) {
                    f.style.visibility = "hidden";
                    f.style.opacity = "0";
                    f.style.filter = "alpha(opacity = 0)";
                    AP.cache.hidePWDEdit = true
                })
            }
        },
        showOverlay: function() {
            D.setStyle(this.cfg.OVERLAY, "visibility", "visible");
            var d = new U.Anim(this.cfg.OVERLAY, {
                opacity: {
                    from: 0,
                    to: 0.2
                }
            },
            0.3);
            if (this.options.type.toLowerCase() === "iframe") {
                var e = this;
                d.onStart.subscribe(function() {
                    e.showLoad()
                })
            }
            d.animate()
        },
        hideOverlay: function() {
            E.removeListener(this.cfg.OVERLAY);
            var d = new U.Anim(this.cfg.OVERLAY, {
                opacity: {
                    to: 0
                }
            },
            0.2);
            d.onComplete.subscribe(function() {
                Element.remove(this.cfg.OVERLAY)
            });
            d.animate()
        },
        showLoad: function() {
            if (!D.get(this.cfg.LOAD)) {
                var d = D.getViewportHeight() * 0.382;
                if (AP.fn.browser.msie6) d += document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
                Element.create("div", {
                    id: this.cfg.LOAD,
                    innerHTML: "<img src='" + this.options.loadsrc + "' />",
                    style: {
                        top: d + "px",
                        display: "block"
                    },
                    appendTo: document.body
                })
            }
        },
        hideLoad: function() {
            D.get(this.cfg.LOAD) && Element.remove(this.cfg.LOAD)
        },
        show: function() {
            var d = this;
            this.renderOverlay();
            this.renderMock();
            this.showOverlay.call(d);
            this.options.onShow && this.options.onShow.call(this);
            this.options.onShowEvent && this.options.onShowEvent.call(this);
            d = D.query("#xbox-mock .alieditContainer");
            d.length > 0 && d.forEach(function(e) {
                e.style.visibility = "visible";
                e.style.opacity = "1";
                e.style.filter = "alpha(opacity = 1)"
            })
        },
        hide: a,
        fire: function(d, e) {
            e = e || this;
            AP.cache.xbox.fireObject = d;
            e.show.call(e, d, e);
            d && E.preventDefault(d)
        }
    });
    AP.widget.xBox = b;
    AP.widget.xBox.hide = a
})();
AP.widget.xTab = {
    show: function(a) {
        if (typeof a == "string") a = D.get(a);
        a.style.display = a.$oldDisplay || "block"
    },
    hide: function(a) {
        if (typeof a == "string") a = D.get(a);
        var b = D.getStyle(a, "display");
        if (b != "none") a.$oldDisplay = b;
        a.style.display = "none"
    },
    switchTab: function(a, b, d) {
        if (typeof a == "string") a = D.get(a);
        var e = a.getElementsByTagName("a"),
        g = document.location.hash.indexOf("#") > -1 && document.location.hash.split("#")[1] !== "" ? true: false;
        d = d == "onmouseover" ? "onmouseover": "onclick";
        var f = document.location.hash.split("#")[1] || "",
        k = e[b];
        if (g) try {
            var n = D.query("a[href=#" + f + "]", a);
            if (n.length > 0) {
                k = n[0];
                log(k)
            }
        } catch(t) {
            log(t)
        }
        D.addClass(k.parentNode, "current");
        for (var p = 0; p < e.length; p++) {
            var r = D.get(e[p].hash.replace("#", "")),
            s = e[p].hash.replace("#", "");
            if (g && D.query("a[href=#" + f + "]", a).length > 0) s !== f && AP.widget.xTab.hide(r);
            else p != b && AP.widget.xTab.hide(r);
            e[p][d] = e[p].onfucs = function() {
                if (this != k) {
                    D.addClass(this.parentNode, "current");
                    AP.widget.xTab.show(D.get(this.hash.replace("#", "")));
                    D.removeClass(k.parentNode, "current");
                    AP.widget.xTab.hide(D.get(k.hash.replace("#", "")));
                    k = this;
                    return false
                }
            }
        }
    }
};
Object.extend = function(a, b) {
    for (property in b) a[property] = b[property];
    return a
};
String.prototype.isFloat = function() {
    return /^[\d]+\.[\d]+$/.test(this.toString())
};
String.prototype.isInt = function() {
    return /^[\d]+$/.test(this.toString())
};
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "")
};
Number.prototype.isFloat = function() {
    return /^[\d]+\.[\d]+$/.test(this.toString())
};
Number.prototype.isInt = function() {
    return /^[\d]+$/.test(this.toString())
};
AP.widget.PopBase = function() {
    var a = YAHOO.util.Dom,
    b = {},
    d = function(e) {
        b = Object.extend({
            box_id: "PopPayment",
            box_class: "pop"
        },
        e || {})
    };
    return {
        init: function(e) {
            d(e);
            this.container = null;
            this.makePopup()
        },
        makePopup: function() {
            if (!this.container) {
                var e = '<div class="pop-container" id="PopContainerBody"></div><div class="pop-shadow" style="height:28px"></div><div class="pop-angle"></div>';
                this.container = Element.create("div", {
                    id: b.box_id,
                    "class": "pop pop-square pop-square-cue"
                });
                this.container.innerHTML = e;
                a.addClass(this.container, b.box_class);
                a.setStyles(this.container, {
                    width: "185px"
                });
                this.hidden();
                document.body.appendChild(this.container)
            }
        },
        resetWidth: function(e) {
            a.setStyles(this.container, {
                width: e
            })
        },
        setPosition: function(e) {
            a.setXY(this.container, e)
        },
        show: function() {
            this.container && a.setStyles(this.container, {
                display: "block"
            })
        },
        hidden: function() {
            this.container && a.setStyles(this.container, {
                display: "none"
            })
        },
        buildUI: function(e) {
            this.container.appendChild(e)
        }
    }
} ();
AP.widget.AAPayment = function() {
    var a = YAHOO.util.Dom,
    b = YAHOO.util.Event,
    d = AP.widget.PopBase,
    e = [],
    g,
    f,
    k,
    n,
    t,
    p,
    r = true;
    _getPreviousValue = function(j) {
        j = e.indexOf(j);
        var m = j - 1 >= 0 ? e[j - 1] : null;
        if (m != null) if (!D.hasClass(m.parentNode.parentNode, "fm-error")) return e[j - 1].value;
        return ""
    };
    var s = function(j) {
        _options = Object.extend({
            box_container: "container",
            box_total_money: "totalMoney",
            box_total_person: "totalPerson",
            box_add_person: "addPerson"
        },
        j || {})
    },
    v = function() {
        b.addListener(document.body, "click",
        function() {
            r || d.hidden()
        })
    },
    w = function(j) {
        j = j || window.event;
        if (j.preventDefault) j.preventDefault();
        else j.returnValue = false;
        return false
    };
    return {
        init: function(j) {
            s(j);
            v();
            t = D.get(_options.box_container);
            k = D.get(_options.box_total_person);
            f = D.get(_options.box_total_money);
            _submit_form = D.get("AAPaymentForm");
            b.addListener(f, "focus",
            function() {
                d.hidden();
                this.countTotalMoney();
                f.select();
                var m = f.parentNode.parentNode;
                D.addClass(f.parentNode, "fm-focus");
                D.removeClass(m, "fm-error");
                D.setStyles(n, {
                    display: "none"
                });
                D.query(".fm-explain", m).length && m.removeChild(D.query(".fm-explain", m)[0])
            },
            "", this);
            b.addListener(f, "keydown", this.killEnter, f, this);
            b.addListener(f, "keyup", this.checkTotalMoney, f, this);
            b.addListener(f, "blur",
            function() {
                D.removeClass(f.parentNode, "fm-focus")
            })
        },
        validate: function() {
            if (e.length) e.forEach(function(o) {
                o.value.length || this.showError("\u91d1\u989d\u6216\u516c\u5f0f\u4e0d\u80fd\u4e3a\u7a7a\u3002\u5982\uff1a20\u6216100/5\u3002", o)
            },
            this);
            else if (!D.get("cannotEmpty")) {
                var j = Element.create("li", {
                    appendTo: D.get("payers"),
                    id: "cannotEmpty"
                }),
                m = Element.create("span", {
                    appendTo: j
                });
                D.setStyles(D.get("payers"), {
                    height: "auto"
                });
                m.innerHTML = "\u5fc5\u987b\u6dfb\u52a0\u4e00\u4e2a\u8054\u7cfb\u4eba\u8d26\u53f7\u3002";
                D.addClass(j, "fm-error");
                D.addClass(m, "fm-explain")
            }
        },
        generateData: function() {
            partern = /(.*)\[.*\](.*)/;
            D.query("#payers li").forEach(function(j, m) {
                var o = j.getElementsByTagName("label")[0].getAttribute("rel");
                Element.create("input", {
                    type: "hidden",
                    name: "full_name[]",
                    value: partern.exec(o)[1],
                    appendTo: j
                });
                Element.create("input", {
                    type: "hidden",
                    name: "email[]",
                    value: partern.exec(o)[2].trim(),
                    appendTo: j
                });
                Element.create("input", {
                    type: "hidden",
                    name: "amount[]",
                    value: j.getElementsByTagName("input")[0].value,
                    appendTo: j
                });
                Element.create("input", {
                    type: "hidden",
                    name: "row_no[]",
                    value: m + 1,
                    appendTo: j
                })
            })
        },
        hasPersonAppend: function(j) {
            var m = false;
            e.forEach(function(o) {
                if (o.id == "user_" + j) m = true
            });
            return m
        },
        isFull: function(j, m) {
            if (e.length >= 30) {
                if (m) {
                    D.get("user_" + j.id) && D.get("user_" + j.id).focus();
                    return e.length >= 30
                }
                m = D.getElementsByClassName("contact_" + j.id);
                if (m[0].checked) for (j = 0; j < m.length; j++) {
                    m[j].checked = "";
                    D.removeClass(m[j].parentNode, "current");
                    e.remove(m[j])
                } else {
                    this.deletePerson(null, D.get("user_" + j.id));
                    return true
                }
            }
            return e.length >= 30
        },
        resetPayerStyle: function() {
            var j = D.query("#payers div");
            D.get("cannotEmpty") && D.get("cannotEmpty").parentNode.removeChild(D.get("cannotEmpty"));
            if (e.length >= 6 || j.length >= 4) {
                log(0);
                a.setStyles(D.get("payers"), {
                    height: "230px"
                })
            } else if (D.query("#payers li").length <= 0) {
                log(1);
                a.setStyles(D.get("payers"), {
                    "line-height": "0"
                })
            } else {
                log(2);
                a.setStyles(D.get("payers"), {
                    height: "auto"
                })
            }
        },
        addPerson: function(j, m, o) {
            D.get("customPerson").value = "";
            if (!this.isFull(m, o)) if (this.hasPersonAppend(m.id) && !o) {
                input = D.get("user_" + m.id);
                this.deletePerson(j, input)
            } else {
                if (o) {
                    if (D.get("user_" + m.id)) {
                        D.get("user_" + m.id).focus();
                        return
                    }
                    j = D.getElementsByClassName("contact_" + m.id);
                    if (j.length) for (o = 0; o < j.length; o++) {
                        j[o].checked = "checked";
                        D.addClass(j[o].parentNode, "current")
                    }
                }
                r = true;
                j = Element.create("li");
                o = m.real_name == m.nick_name || m.nick_name == "\u8bf7\u8f93\u5165\u8054\u7cfb\u4eba\u59d3\u540d" || !m.nick_name.trim().length ? Element.create("label", {
                    title: m.real_name + " " + m.account
                }) : Element.create("label", {
                    title: m.real_name + " [" + m.nick_name + "] " + m.account
                });
                o.setAttribute("rel", m.real_name + " [" + m.nick_name + "] " + m.account);
                var h = Element.create("span"),
                l = Element.create("input", {
                    type: "text",
                    id: "user_" + m.id,
                    autocomplete: "off"
                }),
                q = Element.create("a", {
                    title: "\u5220\u9664"
                });
                a.addClass(l, "i-text i-prize");
                a.addClass(q, "ico ico-del");
                real_name = m.real_name.len() > 8 ? m.real_name.brief(8) + "..": m.real_name;
                account = m.account.len() > 16 ? m.account.brief(16) + "..": m.account;
                o.innerHTML = "<em>" + real_name + "</em> (" + account + ")";
                h.innerHTML = "&nbsp;\u5143";
                b.addListener(q, "click", this.deletePerson, l, this);
                h.insertBefore(l, h.firstChild);
                j.appendChild(o);
                j.appendChild(h);
                j.appendChild(q);
                t.appendChild(j);
                l.focus();
                this.updateMoneyInputs(l);
                this.bindEvent(l);
                this.buildPop(l);
                l.value = _getPreviousValue(l);
                this.countTotalMoney(l.value);
                this.countTotalPerson();
                this.resetPayerStyle();
                this.showPop(null, l)
            }
        },
        updateMoneyInputs: function(j) {
            e.push(j)
        },
        getUsersLen: function() {
            return e.length
        },
        deletePerson: function(j, m) {
            e.remove(m);
            m.parentNode.parentNode.parentNode.removeChild(m.parentNode.parentNode);
            this.countTotalMoney(this.fomatValue(m.value));
            this.countTotalPerson();
            this.cannelChoose(m);
            this.resetPayerStyle();
            d.hidden()
        },
        cannelChoose: function(j) {
            j = a.getElementsByClassName("contact_" + j.id.replace("user_", ""));
            for (var m = 0; m < j.length; m++) {
                j[m].checked = "";
                a.removeClass(j[m].parentNode, "current")
            }
        },
        bindEvent: function(j) {
            b.addListener(j, "blur", this.countMoney, j, this);
            b.addListener(j, "focus", this.showPop, j, this);
            b.addListener(j, "focus", this.resetInput, j, this);
            b.addListener(j, "keydown", this.killEnter, j, this)
        },
        resetInput: function(j, m) {
            m.select();
            D.addClass(m.parentNode, "fm-focus");
            this.resetError(m)
        },
        killEnter: function(j) {
            j = window.event || arguments.callee.caller.arguments[0];
            var m = j.keyCode || j.which || j.charCode;
            String.fromCharCode(m);
            if (! (m >= 48 && m <= 57)) if (! (m > 95 && m < 106)) if (! (m == 9 || m == 8 || m == 37 || m == 39 || m == 229)) if (! (m == 191 || m == 190 || m == 111 || m == 144 || m == 110 || m == 46)) {
                if (m == 13) {
                    m = e.indexOf(p) >= e.length - 1 ? 0 : e.indexOf(p) + 1;
                    log(m);
                    e[m].focus()
                }
                w(j)
            }
        },
        buildPop: function(j) {
            if (!d.container) {
                g = Element.create("div");
                g.innerHTML = "\u91d1\u989d\u6216\u516c\u5f0f\u3002\u5982\uff1a20\u6216100/5\u3002";
                if (d.container == null) {
                    d.init();
                    d.buildUI(g)
                }
                document.getElementById("PopContainerBody").appendChild(g);
                this.buildTotalDom();
                this.showPop(null, j)
            }
        },
        buildTotalDom: function() {
            n = Element.create("span");
            _reset_money = Element.create("input", {
                type: "button",
                value: "\u786e\u5b9a"
            });
            _cannel_btn = Element.create("input", {
                type: "button",
                value: "\u6062\u590d"
            });
            D.addClass(_reset_money, "btn-fixed");
            D.addClass(_cannel_btn, "btn-fixed");
            a.setStyles(n, {
                display: "none"
            });
            n.appendChild(_reset_money);
            n.appendChild(_cannel_btn);
            a.getElementsByClassName("com-contacts-sum")[0].appendChild(n);
            b.addListener(_reset_money, "click", this.resetMoney, "", this);
            b.addListener(_cannel_btn, "click",
            function() {
                this.resetError(f);
                this.countTotalMoney();
                D.setStyles(n, {
                    display: "none"
                })
            },
            "", this)
        },
        resetMoney: function() {
            r = false;
            D.setStyles(n, {
                display: "none"
            });
            if (f.value.isInt() || f.value.isFloat()) if (parseFloat(f.value) > parseFloat(e.length) * 2E3) this.showError("\u603b\u91d1\u989d\u4e0d\u80fd\u8d85\u8fc7" + parseFloat(e.length) * 2E3 + "\u3002", f, "span");
            else {
                var j = parseFloat(f.value) / parseFloat(e.length);
                e.forEach(function(m) {
                    m.value = this.fixMoney(j);
                    this.resetError(m)
                },
                this);
                this.countTotalMoney();
                this.resetError(f)
            } else this.showError("\u5fc5\u987b\u8f93\u5165\u6570\u5b57", f, "span")
        },
        innerMoney: function() {},
        showPop: function(j, m) {
            r = true;
            e.length == 1 ? d.show() : d.hidden();
            p = m;
            j = a.getX(m);
            m = a.getY(m) + parseInt(D.getStyle(m, "height").replace("px", "")) + 6;
            d.setPosition([j, m])
        },
        hasBlankInput: function() {
            var j = false,
            m = 0;
            e.forEach(function(o) {
                if (!o.value.trim().length || o.value == _error_info) {
                    m += 1;
                    if (m >= 2) j = true
                }
            });
            return j
        },
        countTotalPerson: function() {
            var j = a.getElementsByClassName("com-contacts-sum")[0];
            e.length ? a.removeClass(j, "fn-hide") : a.addClass(j, "fn-hide");
            k.innerHTML = e.length
        },
        countTotalMoney: function() {
            var j = 0;
            e.forEach(function(m) {
                j += D.hasClass(m.parentNode.parentNode, "fm-error") ? 0 : this.fomatValue(m.value) * 100
            },
            this);
            f.value = this.fixMoney(j / 100)
        },
        checkTotalMoney: function() {
            D.setStyles(n, {
                display: ""
            });
            this.resetError(f, "span")
        },
        fomatValue: function(j) {
            if (j.isInt() || j.isFloat()) return parseFloat(j);
            return 0
        },
        countMoney: function(j, m) {
            D.removeClass(m.parentNode, "fm-focus");
            r = false;
            var o = /^(([\d]+.{0,1}[\d]+)|[\d]+)\/[\d]+$/;
            j = m.value;
            if (o.test(j)) {
                var h = j.split("/")[0];
                o = j.split("/")[1];
                j = parseFloat(h) / parseInt(o);
                j = this.fixMoney(j);
                if (o <= 0) {
                    this.showError("\u516c\u5f0f\u51fa\u9519\uff01\u8bf7\u8f93\u5165\u91d1\u989d\u6216\u516c\u5f0f\u3002\u5982\uff1a20\u6216100/5\u3002", m);
                    return
                }
                if (parseFloat(j) == 0) {
                    m.value = "";
                    return
                }
                if (parseFloat(j) > 2E3) {
                    this.showError("\u91d1\u989d\u4e0d\u80fd\u8d85\u8fc72000\u3002", m);
                    return
                }
                m.value = j;
                this.resetError(m)
            } else if (j.isInt() || j.isFloat()) {
                if (parseFloat(j) == 0) {
                    m.value = "";
                    return
                }
                if (parseFloat(j) > 2E3) {
                    this.showError("\u91d1\u989d\u4e0d\u80fd\u8d85\u8fc72000\u3002", m);
                    return
                }
                m.value = this.fixMoney(new Number(j));
                this.resetError(m)
            } else j.trim().length && this.showError("\u516c\u5f0f\u51fa\u9519\uff01\u8bf7\u8f93\u5165\u91d1\u989d\u6216\u516c\u5f0f\u3002\u5982\uff1a20\u6216100/5\u3002", m);
            this.resetError(f, "span");
            this.countTotalMoney()
        },
        keyupHandle: function(j, m) {
            m.value = m.value.replace(/[^(\d|\.|^\/)]/g, "")
        },
        showError: function(j, m, o) {
            o || (o = "div");
            D.addClass(m.parentNode.parentNode, "fm-error");
            var h = a.getElementsByClassName("fm-explain", o, m.parentNode.parentNode);
            m = h.length ? h[0] : Element.create(o, {
                appendTo: m.parentNode.parentNode
            });
            m.innerHTML = j;
            D.addClass(m, "fm-explain");
            this.resetPayerStyle()
        },
        resetError: function(j, m) {
            m || (m = "div");
            D.removeClass(j.parentNode.parentNode, "fm-error");
            if (a.getElementsByClassName("fm-explain", m, j.parentNode.parentNode).length) {
                var o = a.getElementsByClassName("fm-explain", m, j.parentNode.parentNode)[0].parentNode;
                o.removeChild(a.getElementsByClassName("fm-explain", m, j.parentNode.parentNode)[0])
            }
        },
        fixMoney: function(j) {
            var m = j.toString().split(".");
            if (m.length > 1) if (m[1].length > 2) {
                m = m[0].toString() == "0" ? m[1].charAt(0) + m[1].charAt(1) : m[0].toString() + m[1].charAt(0) + m[1].charAt(1);
                m = parseInt(m) + 1;
                return (m / 100).toFixed(2)
            }
            return j.toFixed(2)
        }
    }
} ();
AP.widget.addContacts = new AP.Class({
    initialize: function() {
        this.target = D.get("addAnthor");
        this.editContent = D.get("editContent");
        this.confirmContent = D.get("confirmContent");
        this.firstPerson = D.get("firstPerson");
        this.items = [this.firstPerson.parentNode.parentNode.parentNode];
        AP.widget.formInputStyle.init(this.firstPerson);
        E.on(this.firstPerson, "blur", this.validateAccount, this.firstPerson, this);
        E.on(this.firstPerson, "focus",
        function(a, b) {
            a = b.parentNode.parentNode.parentNode;
            if (D.query(".fm-explain", a).length) {
                D.removeClass(a, "fm-error");
                a.removeChild(D.query(".fm-explain", a)[0])
            }
        },
        this.firstPerson, "");
        this.togon = false;
        this.validated = true;
        this.up_target = null;
        E.on(this.target, "click", this.addPerson, "", this);
        E.on(this.target, "mouseover",
        function() {
            this.togon = true
        },
        "", this);
        E.on(this.target, "mouseout",
        function() {
            this.togon = false
        },
        "", this)
    },
    addPerson: function() {
        var a = this.getCreateEditItem();
        this.editContent.appendChild(a[0]);
        this.items.push(a[0]);
        this.targgleDEL();
        this.targgleADD();
        E.on(a[1], "click", this.delPerson, a[1], this);
        E.on(a[2], "focus",
        function(b, d) {
            b = d.parentNode.parentNode.parentNode;
            if (D.query(".fm-explain", b).length) {
                D.removeClass(b, "fm-error");
                b.removeChild(D.query(".fm-explain", b)[0])
            }
        },
        a[2], "");
        E.on(a[2], "blur", this.validateAccount, a[2], this);
        AP.widget.formInputStyle.init(a[2]);
        D.addClass(this.confirmContent, "fn-hide");
        D.removeClass(this.editContent, "fn-hide");
        D.removeClass(D.get("submitButtom"), "fn-hide");
        D.addClass(D.get("confirmButtom"), "fn-hide");
        a[2].select();
        if (!this.validated) if (!D.query(".fm-explain", this.up_target).length) {
            this.up_target.appendChild(this.getCreateErrorInfo());
            D.addClass(this.up_target, "fm-error")
        }
    },
    delPerson: function(a, b) {
        a = this.getDelItemIndex(b);
        this.editContent.removeChild(this.items[a]);
        this.items.remove(this.items[a]);
        this.targgleDEL();
        this.targgleADD()
    },
    targgleDEL: function() {
        if (this.items.length <= 1) {
            var a = this.items[0].getElementsByTagName("div")[0],
            b = a.getElementsByTagName("span");
            b.length && a.removeChild(b[0])
        } else {
            a = this.items[0].getElementsByTagName("div");
            b = a[0].getElementsByTagName("span");
            if (!b.length) {
                b = this.getCreateDel();
                Element.create("span", {
                    append: b,
                    appendTo: a[0]
                });
                E.on(b, "click", this.delPerson, b, this)
            }
        }
    },
    targgleADD: function() {
        if (this.items.length >= this.leftcount) {
            D.addClass(this.target, "fn-hide");
            E.removeListener(this.target, "click")
        } else {
            D.removeClass(this.target, "fn-hide");
            E.removeListener(this.target, "click");
            E.on(this.target, "click", this.addPerson, "", this)
        }
    },
    validateAccount: function(a, b) {
        a = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var d = /^1\d{10}$/,
        e = b.parentNode.parentNode.parentNode;
        if (a.test(b.value.trim()) || d.test(b.value.trim()) || b.value.trim().length <= 0) {
            if (D.query(".fm-explain", e).length) {
                e.removeChild(D.query(".fm-explain", e)[0]);
                D.removeClass(e, "fm-error")
            }
            this.validated = true
        } else {
            if (!this.togon) {
                if (D.query(".fm-explain", e).length) return;
                e.appendChild(this.getCreateErrorInfo());
                D.addClass(e, "fm-error");
                return false
            }
            this.validated = false;
            this.up_target = e
        }
    },
    getDelItemIndex: function(a) {
        a = a.parentNode.parentNode.parentNode;
        return this.items.indexOf(a)
    },
    getCreateErrorInfo: function() {
        return Element.create("div", {
            innerHTML: "Email\u5730\u5740\u6216\u8005\u624b\u673a\u53f7\u7801\u683c\u5f0f\u6709\u8bef\u3002",
            "class": "fm-explain"
        })
    },
    getCreateEditItem: function() {
        var a = Element.create("li", {
            "class": "edit"
        }),
        b = Element.create("div", {
            "class": "contacts-item",
            appendTo: a
        }),
        d = this.getCreateInput();
        Element.create("label", {
            append: d,
            appendTo: b
        });
        var e = this.getCreateDel();
        Element.create("span", {
            append: e,
            appendTo: b
        });
        return [a, e, d]
    },
    getCreateInput: function() {
        return Element.create("input", {
            "class": "i-text",
            type: "text"
        })
    },
    getCreateDel: function() {
        return Element.create("a", {
            href: "javascript:void(0)",
            innerHTML: "\u5220\u9664"
        })
    }
});
AP.widget.confirmContacts = AP.widget.addContacts.extend({
    initialize: function(a) {
        this.leftcount = parseInt(a);
        this.parent();
        this.submitBtn = D.get("submitPerson");
        this.confirmBtn = D.get("confirmPerson");
        this.invalidate_users = [];
        this.validate_users = [];
        E.on(this.submitBtn, "click", this.submitConfirm, this.submitBtn, this);
        E.on(this.confirmBtn, "click", this.addContacts, this.confirmBtn, this);
        E.on(D.get("continueAdd"), "click", this.addAgain, "", this)
    },
    addContacts: function() {
        if (this.checkIsAllMobile()) {
            var a = new AP.core.api("user/contacts/addToGroups", {
                onAPISuccess: this.addSuccess,
                method: "POST"
            },
            this),
            b = [],
            d = [];
            this.validate_users.forEach(function(e) {
                b.push(e.logonId)
            });
            D.query("#chooseGroups a").forEach(function(e) {
                D.hasClass(e, "selected") && d.push(e.getAttribute("rel"))
            });
            this.join_groups = d;
            if (this.validate_users.length) a.call({
                logonIds: b.join(","),
                groupIds: d.join(",")
            });
            else {
                D.addClass(D.query(".com-add-contacts")[0], "fn-hide");
                D.removeClass(D.get("addSuccess"), "fn-hide");
                D.get("topTitle").innerHTML = "\u9080\u8bf7\u8054\u7cfb\u4eba";
                D.addClass(D.get("tipInfo"), "fn-hide");
                this.buildInviteDom()
            }
        }
    },
    addAgain: function() {
        this.items = [];
        D.addClass(D.get("addSuccess"), "fn-hide");
        D.addClass(this.confirmContent, "fn-hide");
        D.addClass(D.get("confirmButtom"), "fn-hide");
        D.removeClass(this.editContent, "fn-hide");
        D.removeClass(D.get("submitButtom"), "fn-hide");
        D.get("topTitle").innerHTML = "\u6dfb\u52a0\u8054\u7cfb\u4eba";
        D.removeClass(D.get("tipInfo"), "fn-hide");
        D.removeClass(D.query(".com-add-contacts", D.get("container"))[0], "fn-hide");
        D.get("editContent").innerHTML = "";
        this.addPerson()
    },
    addSuccess: function(a, b) {
        b = b[0];
        D.addClass(D.query(".com-add-contacts")[0], "fn-hide");
        D.removeClass(D.get("addSuccess"), "fn-hide");
        D.get("topTitle").innerHTML = "\u9080\u8bf7\u8054\u7cfb\u4eba";
        D.addClass(D.get("tipInfo"), "fn-hide");
        window.parent.mytip.show(b.msg);
        if (this.invalidate_users.length) {
            var d = 0,
            e = 0;
            this.invalidate_users.forEach(function(g) {
                if (/^1\d{10}$/.test(g.logonId)) d += 1;
                else e += 1
            });
            if (e > 0) this.buildInviteDom();
            else {
                window.parent.location.href = "index.htm";
                self.parent.AP.widget.xBox.hide()
            }
        } else {
            window.parent.location.href = "index.htm";
            self.parent.AP.widget.xBox.hide()
        }
    },
    buildInviteDom: function() {
        D.get("invalidateUserNum").innerHTML = this.invalidate_users.length;
        var a = '<table><thead><tr><th class="first"><span>\u5bf9\u65b9\u540d\u79f0</span></th><th class="last"><span>\u9080\u8bf7\u65b9\u5f0f</span> </th></tr></thead><tbody>{body}</tbody></table>',
        b = "";
        this.invalidate_users.forEach(function(d) {
            if (!/^1\d{10}$/.test(d.logonId)) {
                if (d.logonId.length > 30) {
                    d = d.logonId.split("@");
                    if (d[0].length > 17) d[0] = d[0].substr(0, 14) + "...";
                    if (d[0].length > 12) d[1] = d[0].substr(0, 9) + "...";
                    d = d[0] + "@" + d[1]
                } else d = d.logonId;
                b += "<tr><td>" + d + '</td><td class="last"><a href="javascript:void(0)" class="invite" rel="email" title="' + d + '">\u53d1\u9001\u90ae\u4ef6\u9080\u8bf7</a><span class="m-success fn-hide"></span></td></tr>'
            }
        });
        a = a.replace("{body}", b);
        D.get("invalidateUserBody").innerHTML = a;
        this.sendInvite()
    },
    sendInvite: function() {
        D.query(".invite").forEach(function(a) {
            E.on(a, "click",
            function() {
                var b = new AP.core.api("user/contacts/inviteContact", {
                    onAPISuccess: function(d, e) {
                        D.addClass(a, "fn-hide");
                        d = D.query(".m-success", a.parentNode)[0];
                        d.innerHTML = e[0].msg;
                        D.removeClass(d, "fn-hide")
                    },
                    onAPIFailure: function(d, e) {
                        D.addClass(a, "fn-hide");
                        d = D.query(".m-success", a.parentNode)[0];
                        d.innerHTML = e[0].msg;
                        D.removeClass(d, "m-success");
                        D.removeClass(d, "fn-hide");
                        D.addClass(d, "m-error")
                    },
                    method: "POST"
                });
                b.call({
                    logonId: a.title,
                    type: a.getAttribute("rel"),
                    cgIds: this.join_groups.join(",")
                })
            },
            a, this)
        },
        this)
    },
    submitConfirm: function() {
        if (this.validatorLength()) if (!this.hasError()) {
            this.validateUsers();
            this.showSubmitBtn()
        }
    },
    validatorLength: function() {
        var a = 0;
        this.items.forEach(function(b) {
            if (b.getElementsByTagName("input")[0].value.trim()) a += 1
        });
        return a
    },
    showSubmitBtn: function() {
        if (this.items.length < this.leftcount) {
            D.removeClass(this.target, "fn-hide");
            E.removeListener(this.target, "click");
            E.on(this.target, "click", this.addPerson, "", this)
        }
    },
    showConfirmContent: function() {
        D.addClass(this.editContent, "fn-hide");
        D.addClass(D.get("submitButtom"), "fn-hide");
        D.removeClass(this.confirmContent, "fn-hide");
        D.removeClass(D.get("confirmButtom"), "fn-hide")
    },
    hasError: function() {
        return D.query("#editContent .fm-error").length
    },
    deleteItems: function(a, b) {
        b = this.confirmItems.indexOf(b.parentNode.parentNode.parentNode);
        a = this.confirmItems[b];
        b = this.items[b];
        var d = b.getElementsByTagName("input")[0];
        this.items.remove(b);
        this.confirmItems.remove(a);
        a.parentNode.removeChild(a);
        b.parentNode.removeChild(b);
        this.validate_users.forEach(function(e) {
            e.logonId == d.value && this.validate_users.remove(e)
        },
        this);
        this.invalidate_users.forEach(function(e) {
            e.logonId == d.value && this.invalidate_users.remove(e)
        },
        this);
        this.targgleCDEL();
        this.targgleADD()
    },
    targgleCDEL: function() {
        if (this.confirmItems.length <= 1) {
            var a = this.confirmItems[0].getElementsByTagName("div")[0],
            b = a.getElementsByTagName("span")[0];
            a = D.query(".delete", a);
            a.length && b.removeChild(a[0])
        } else {
            a = this.confirmItems[0].getElementsByTagName("div");
            a[0].getElementsByTagName("span")
        }
    },
    deleteBlankItem: function() {
        for (var a = [], b = 0; b < this.items.length; b++) {
            var d = this.items[b],
            e = d.getElementsByTagName("input")[0];
            if (!e.value.trim().length) {
                this.editContent.removeChild(d);
                a.push(this.items[b])
            }
        }
        a.forEach(function(g) {
            this.items.remove(g)
        },
        this)
    },
    uniqueItems: function() {
        var a = [];
        this.items.forEach(function(k) {
            a.push(k)
        });
        for (var b = 0; b < a.length; b++) for (var d = b + 1; d < a.length; d++) {
            var e = a[d].getElementsByTagName("input")[0].value.trim(),
            g = a[b].getElementsByTagName("input")[0].value.trim();
            if (e == g) try {
                a[d].parentNode.removeChild(a[d]);
                this.items.remove(a[d])
            } catch(f) {}
        }
        this.targgleDEL()
    },
    validateUsers: function() {
        this.uniqueItems();
        this.deleteBlankItem();
        var a = [];
        this.invalidate_users = [];
        this.items.forEach(function(d) {
            a.push(d.getElementsByTagName("input")[0].value)
        });
        var b = new AP.core.api("user/contacts/getValidateUsers", {
            onAPISuccess: this.buildConfirm,
            method: "POST"
        },
        this);
        b.call({
            account: a.join(",")
        })
    },
    buildConfirm: function(a, b) {
        b = b[0];
        if (!this.isValidateFalse(b)) {
            this.showConfirmContent();
            this.confirmContent.innerHTML = "";
            this.confirmItems = [];
            this.users = b.users;
            b.users.forEach(function(d) {
                d = this.getCreateConfirmItem(d);
                this.confirmItems.push(d[0]);
                this.confirmContent.appendChild(d[0]);
                E.on(d[1], "click", this.showEdit, d[1], this);
                E.on(d[2], "click", this.deleteItems, d[2], this)
            },
            this);
            if (this.items.length <= 1) {
                a = D.query(".delete", this.confirmItems[0]);
                b = D.query(".contacts-item", this.confirmItems[0])[0].getElementsByTagName("span")[0];
                a.length && b.removeChild(a[0])
            }
            this.checkIsAllMobile()
        }
    },
    checkIsAllMobile: function() {
        var a = 0,
        b = 0;
        if (this.validate_users.length <= 0) {
            this.invalidate_users.forEach(function(d) {
                if (/^1\d{10}$/.test(d.logonId)) a += 1;
                else b += 1
            });
            if (b == 0 && a > 0) {
                D.removeClass(this.confirmBtn.parentNode, "btn-ok");
                D.addClass(this.confirmBtn.parentNode, "btn-ok-disabled");
                return false
            } else {
                D.addClass(this.confirmBtn.parentNode, "btn-ok");
                D.removeClass(this.confirmBtn.parentNode, "btn-ok-disabled")
            }
        }
        D.addClass(this.confirmBtn.parentNode, "btn-ok");
        D.removeClass(this.confirmBtn.parentNode, "btn-ok-disabled");
        return true
    },
    isValidateFalse: function(a) {
        var b = false;
        a.users.forEach(function(d) {
            if (!d.validateResult) if (d.failedReason == "ERROR.CONTACTS.NOTALLOW_ADD" || d.failedReason == "ERROR.CONTACTS.ADDED" || /^1\d{10}$/.test(d.logonId)) {
                b = true;
                this.items.forEach(function(e) {
                    if (D.query("input", e)[0].value == d.logonId) if (/^1\d{10}$/.test(d.logonId) && d.failedReason != "ERROR.CONTACTS.ADDED") d.failedReason == "ERROR.CONTACTS.NOTALLOW_ADD" ? this.getCreateError(e, d.failedReasonDes) : this.getCreateError(e, "\u5bf9\u65b9\u624b\u673a\u53f7\u4e0d\u662f\u652f\u4ed8\u5b9d\u4f1a\u5458\uff0c\u4e0d\u80fd\u6dfb\u52a0\u3002");
                    else this.getCreateError(e, d.failedReasonDes)
                },
                this)
            }
        },
        this);
        return b
    },
    showEdit: function(a, b) {
        a = this.confirmItems.indexOf(b.parentNode.parentNode.parentNode);
        a = this.items[a].getElementsByTagName("input")[0];
        D.removeClass(this.editContent, "fn-hide");
        D.removeClass(D.get("submitButtom"), "fn-hide");
        D.addClass(this.confirmContent, "fn-hide");
        D.addClass(D.get("confirmButtom"), "fn-hide");
        a.focus()
    },
    getCreateConfirmItem: function(a) {
        var b = Element.create("li"),
        d = Element.create("div", {
            "class": "contacts-item",
            appendTo: b
        });
        if (a.logonId.length > 30) {
            var e = a.logonId.split("@");
            if (e[0].length > 17) e[0] = e[0].substr(0, 14) + "...";
            if (e[0].length > 12) e[1] = e[0].substr(0, 9) + "...";
            e = e[0] + "@" + e[1]
        } else e = a.logonId;
        a.validateResult ? Element.create("label", {
            innerHTML: a.realName + " (" + e + ")",
            appendTo: d,
            title: a.logonId
        }) : Element.create("label", {
            innerHTML: e,
            appendTo: d,
            title: a.logonId
        });
        e = Element.create("span", {
            appendTo: d
        });
        d = Element.create("a", {
            href: "javascript:void(0)",
            appendTo: e,
            innerHTML: "\u4fee\u6539"
        });
        e = Element.create("a", {
            href: "javascript:void(0)",
            appendTo: e,
            innerHTML: "\u5220\u9664",
            "class": "delete"
        });
        if (a.validateResult) this.validate_users.push(a);
        else {
            this.invalidate_users.push(a);
            Element.create("div", {
                innerHTML: a.failedReasonDes,
                appendTo: b,
                "class": "fm-explain"
            });
            D.addClass(b, "fm-message current")
        }
        return [b, d, e]
    },
    getCreateError: function(a, b) {
        b = Element.create("div", {
            innerHTML: b,
            appendTo: a,
            "class": "fm-explain"
        });
        D.addClass(a, "fm-error");
        return b
    },
    newAPI: function(a, b) {
        return new AP.core.api(a, {
            onAPISuccess: b
        })
    }
});
AP.widget.appendToGroup = new AP.Class({
    initialize: function(a) {
        D.query("#chooseGroups a").forEach(function(b) {
            E.on(b, "click", this.changeStatus, b, this)
        },
        this);
        E.on(D.get("createGroupBtn"), "click",
        function(b) {
            D.addClass(D.get("createGroupBtn").parentNode, "fn-hide");
            D.removeClass(D.get("createGroupContainer"), "fn-hide");
            AP.widget.formInputStyle.init(D.get("groupTxt"));
            if (!D.get("groupTxt").value.trim().length) D.get("groupTxt").value = "\u672a\u547d\u540d\u5206\u7ec4";
            D.get("groupTxt").focus();
            D.get("groupTxt").select();
            E.preventDefault(b)
        },
        "", this);
        E.on(D.get("cannelChoose"), "click",
        function(b) {
            D.removeClass(D.get("createGroupBtn").parentNode, "fn-hide");
            D.addClass(D.get("createGroupContainer"), "fn-hide");
            E.preventDefault(b)
        });
        E.on(D.get("createBtn"), "click", this.createGroup, "", this);
        E.on(D.get("groupTxt"), "blur",
        function(b) {
            b = E.getTarget(b);
            if (b.id != "groupTxt") if (!this.value.trim().length) this.value = "\u672a\u547d\u540d\u5206\u7ec4"
        });
        E.on(D.get("groupTxt"), "focus",
        function() {
            var b = D.query(".fm-explain", this.parentNode)[0];
            D.removeClass(this.parentNode, "fm-error");
            b.innerHTML = "\u6700\u591a10\u4e2a\u5b57\u3002"
        });
        this.options = this.setOptions(a);
        this.completeEvent = new U.CustomEvent("completeEvent");
        this.completeEvent.subscribe(this.options.completeEvent, this, true)
    },
    setOptions: function(a) {
        return AP.hashExtend({
            completeEvent: function() {}
        },
        a || {})
    },
    createGroup: function() {
        if (D.get("groupTxt").value.trim().length) {
            var a = new AP.core.api("user/contacts/createGroup", {
                onAPISuccess: this.innerNewTag,
                onAPIFailure: this.createGroupFail,
                method: "POST"
            },
            this);
            a.call({
                groupName: D.get("groupTxt").value
            })
        }
    },
    createGroupFail: function(a, b) {
        a = D.get("groupTxt").parentNode;
        var d = D.query(".fm-explain", a)[0];
        d.innerHTML = b[0].msg;
        D.addClass(a, "fm-error")
    },
    innerNewTag: function(a, b) {
        a = Element.create("a", {
            appendTo: D.get("chooseGroups"),
            "class": "selected",
            rel: b[0].result.id
        });
        Element.create("span", {
            innerHTML: b[0].result.name,
            appendTo: a
        });
        E.on(a, "click", this.changeStatus, a, this);
        D.get("groupTxt").value = "";
        D.removeClass(D.get("createGroupBtn").parentNode, "fn-hide");
        D.addClass(D.get("createGroupContainer"), "fn-hide");
        parseInt(b[0].groupCount) >= 10 && D.addClass(D.query(".p-add-grounp")[0], "fn-hide");
        this.completeEvent.fire(b)
    },
    changeStatus: function(a, b) {
        D.hasClass(b, "selected") ? D.removeClass(b, "selected") : D.addClass(b, "selected");
        E.preventDefault(a)
    }
});
AP.widget.autoMatchContacts = function() {
    var a = D.get("ipt-search-key"),
    b = false;
    E.on(a, "focus",
    function() {
        if (this.value == "\u4ece\u6240\u6709\u8054\u7cfb\u4eba\u4e2d\u641c\u7d22") {
            this.value = "";
            this.select()
        }
        D.removeClass(a, "i-text-gray")
    },
    "", "");
    E.on(a, "blur",
    function(g) {
        E.getTarget(g);
        if (!b) if (! (this.value != "\u4ece\u6240\u6709\u8054\u7cfb\u4eba\u4e2d\u641c\u7d22" && this.value.trim().length)) {
            this.value = "\u4ece\u6240\u6709\u8054\u7cfb\u4eba\u4e2d\u641c\u7d22";
            D.addClass(a, "i-text-gray")
        }
    },
    "", "");
    E.on(D.get("J_SearchResult"), "click",
    function() {
        a.value.trim().length && a.value.trim() != "\u4ece\u6240\u6709\u8054\u7cfb\u4eba\u4e2d\u641c\u7d22" && D.get("search-contact").submit()
    });
    E.on(D.get("autoCompleteContainer"), "mouseover",
    function() {
        b = true
    });
    E.on(D.get("autoCompleteContainer"), "mouseout",
    function() {
        b = false
    });
    E.on(D.get("J_SearchResult"), "mouseover",
    function() {
        b = true
    });
    E.on(D.get("J_SearchResult"), "mouseout",
    function() {
        b = false
    });
    var d = new YAHOO.util.XHRDataSource("/user/contacts/searchResult.json");
    d.responseType = YAHOO.util.XHRDataSource.TYPE_JSON;
    d.connMethodPost = true;
    d.maxCacheEntries = 60;
    d.responseSchema = {
        resultsList: "result",
        fields: ["contactLogonId", "contactNickName", "ownerCardNo", "contactRealName"]
    };
    var e = new YAHOO.widget.AutoComplete("ipt-search-key", "autoCompleteContainer", d);
    e.queryDelay = 0.5;
    e.queryDelay = 0;
    e.resultTypeList = false;
    e.autoHighlight = false;
    e.generateRequest = function(g) {
        return "keyword=" + g
    };
    e.formatResult = function(g) {
        var f = D.query("#autoCompleteContainer ul")[0];
        D.setStyle(f, "width", "174px");
        D.setStyles(f, {
            display: ""
        });
        f = g.contactNickName ? g.contactNickName: "";
        if (g.contactRealName) {
            var k = g.contactRealName;
            k = k.len() > 8 ? k.brief(8) + "..": k
        } else k = "";
        g = g.contactLogonId;
        g = g.len() > 16 ? g.brief(16) + "..": g;
        return '<span title="' + f + '" rel="' + g + '">' + k + "(" + g + ")</span>"
    };
    e.itemSelectEvent.subscribe(function() {
        D.get("search-contact").submit()
    });
    e.dataErrorEvent.subscribe(function() {
        var g = D.query("#autoCompleteContainer ul")[0];
        D.setStyles(g, {
            display: "none"
        })
    });
    return {
        oDS: d,
        oAC: e
    }
};
AP.widget.appendContacts = function() {
    var a = YAHOO.util.Event;
    _target_btn = _require_fields = _request_url = null;
    var b = function() {
        for (var p = _require_fields.length,
        r = 0; r < _require_fields.length; r++) _require_fields[r].checked || p--;
        return p
    },
    d = function() {
        for (var p = "",
        r = 0; r < _require_fields.length; r++) if (_require_fields[r].checked) p += "emails=" + _require_fields[r].value + "&";
        return p
    },
    e = function() {
        var p = b();
        if (p) {
            p = d();
            AP.ajax.asyncRequest("POST", _request_url, k, p)
        }
    },
    g = function() {
        _target_btn.parentNode.setAttribute("onmouseout", "");
        _target_btn.parentNode.setAttribute("onmouseover", "");
        a.removeListener(_target_btn, "mouseout");
        a.removeListener(_target_btn, "mouseover");
        D.removeClass(_target_btn.parentNode, "btn-ok");
        D.addClass(_target_btn.parentNode, "btn-ok-disabled")
    },
    f = function() {
        D.removeClass(_target_btn.parentNode, "btn-ok-disabled");
        D.addClass(_target_btn.parentNode, "btn-ok");
        a.addListener(_target_btn, "mouseout",
        function() {
            this.parentNode.className = "btn btn-ok"
        });
        a.addListener(_target_btn, "mouseover",
        function() {
            this.parentNode.className = "btn btn-ok-hover"
        })
    },
    k = {
        success: function(p) {
            p = p.responseText.split(",");
            try {
                D.get("addWaiting") && D.get("addWaiting").parentNode.removeChild(D.get("addWaiting"));
                D.get("addSuccessBox") && D.removeClass(D.get("addSuccessBox"), "fn-hide");
                if (D.get("addSuccessNum")) D.get("addSuccessNum").innerHTML = p[1]
            } catch(r) {
                log(r)
            }
        }
    },
    n = function() {
        a.addListener(_target_btn, "click", e);
        for (var p = 0; p < _require_fields.length; p++) {
            _require_fields[p].checked = "checked";
            a.addListener(_require_fields[p], "click", t)
        }
    },
    t = function() {
        var p = b();
        p ? f() : g()
    };
    return {
        init: function(p, r, s) {
            _request_url = s;
            _target_btn = p;
            _require_fields = r;
            n()
        }
    }
} ();
AP.widget.choosePerson = function() {
    var a = YAHOO.util.Dom,
    b = YAHOO.util.Event,
    d = null,
    e = null,
    g = null,
    f = null,
    k = null,
    n = null,
    t = null,
    p = null,
    r = function() {
        if (D.hasClass(k.parentNode, "fm-error") && f.innerHTML == "\u5173\u95ed\u8054\u7cfb\u4eba") D.addClass(g, "fn-hide");
        else D.hasClass(g, "fn-hide") ? D.removeClass(g, "fn-hide") : D.addClass(g, "fn-hide");
        D.hasClass(g, "fn-hide") ? (f.innerHTML = "\u4ece\u6211\u7684\u8054\u7cfb\u4eba\u4e2d\u6dfb\u52a0") : (f.innerHTML = "\u5173\u95ed\u8054\u7cfb\u4eba")
    },
    s = function() {
        var l = k.value.trim();
        if (!l.length || D.hasClass(k.parentNode, "fm-error") || f.innerHTML == "\u4ece\u6211\u7684\u8054\u7cfb\u4eba\u4e2d\u6dfb\u52a0") r();
        else {
            if (l == t) m();
            else {
                if (n != null) {
                    n.checked = "";
                    D.removeClass(n.parentNode, "current")
                }
                var q = v(l);
                q ? o(q) : w(l)
            }
            D.hasClass(D.get("personWaiting"), "fn-hide") && D.addClass(g, "fn-hide")
        }
    },
    v = function(l) {
        for (var q = 0; q < _contacts.length; q++) for (var u = 0; u < _contacts[q].users.length; u++) if (l == _contacts[q].users[u].account) return _contacts[q].users[u];
        return false
    },
    w = function(l) {
        l = "email=" + l + "&row_no=1";
        AP.ajax.asyncRequest("POST", p, j, l)
    },
    j = {
        success: function(l) {
            l = l.responseText.split(",");
            l = l[1].length == 0 ? {
                real_name: "",
                account: k.value
            }: {
                real_name: l[1],
                account: k.value
            };
            o(l)
        }
    },
    m = function() {
        a.addClass(d, "fn-hide");
        a.removeClass(d, "fm-error");
        a.removeClass(e, "fn-hide")
    },
    o = function(l) {
        var q = Element.create("span"),
        u = Element.create("a", {
            href: "javascript:void(0);"
        });
        q.innerHTML = "<em>" + l.real_name + "</em> (" + l.account + ")&nbsp;&nbsp;";
        u.innerHTML = "\u91cd\u65b0\u9009\u62e9\u8054\u7cfb\u4eba";
        t = k.value = l.account;
        e.innerHTML = "";
        e.appendChild(q);
        e.appendChild(u);
        b.addListener(u, "click", h, l, this);
        m();
        try {
            D.get("contact_" + l.id).checked = "checked";
            n = D.get("contact_" + l.id);
            D.addClass(n.parentNode, "current")
        } catch(x) {}
        D.hasClass(D.get("personWaiting"), "fn-hide") && D.addClass(g, "fn-hide");
        return [q, u]
    },
    h = function() {
        a.addClass(e, "fn-hide");
        a.removeClass(d, "fn-hide");
        a.removeClass(g, "fn-hide");
        f.innerHTML = "\u5173\u95ed\u8054\u7cfb\u4eba";
        D.removeClass(D.getAncestorByClassName(k, "fm-item"), "fm-error")
    };
    return {
        init: function(l, q) {
            d = D.get("personWaiting");
            e = D.get("personEditing");
            g = D.get("personContact");
            k = D.get("personInput");
            f = D.get("extendContacts");
            p = q;
            _contacts = l;
            b.addListener(D.get("closeContacts"), "click",
            function() {
                f.innerHTML = "\u5173\u95ed\u8054\u7cfb\u4eba";
                s();
                a.addClass(g, "fn-hide")
            });
            b.addListener(f, "click", s)
        },
        addPerson: function(l, q) {
            if (n != null) {
                n.checked = "";
                D.removeClass(n.parentNode, "current")
            }
            o(q);
            a.addClass(g, "fn-hide");
            a.addClass(d, "fn-hide");
            a.removeClass(d, "fm-error");
            a.removeClass(e, "fn-hide")
        }
    }
} ();
AP.widget.buildGroupDom = new AP.Class({
    render: function() {},
    setHTML: function() {
        return html = ""
    },
    getElements: function() {
        this.body = D.query(".c-group-all")[0];
        this.head = D.query(".c-group-select-title")[0]
    },
    show: function() {
        D.removeClass(this.container, "fn-hide")
    },
    hidden: function() {
        D.addClass(this.container, "fn-hide")
    }
});
AP.widget.viewChoosedGroup = AP.widget.buildGroupDom.extend({
    initialize: function(a) {
        this.render();
        this.getElements();
        a.forEach(function(b) {
            E.on(b, "click", this.viewGroup, b, this)
        },
        this);
        this.current_el = null;
        this.tripdown = new AP.widget.tipdone;
        document.body.appendChild(this.container)
    },
    render: function() {
        if (!this.container) {
            this.container = Element.create("div", {
                "class": "c-group-select fn-hide"
            });
            var a = this.setHTML();
            this.container.innerHTML = a;
            document.body.appendChild(this.container)
        }
    },
    setHTML: function() {
        D.addClass(this.container, "view-group-contanier");
        return html = '<div class="c-group-select-container  view-group-contanier"><div class="c-group-select-content"><div class="c-group-all"></div></div><div class="c-group-select-title mid"></div></div>'
    },
    setHead: function() {
        this.head.innerHTML = "\u5206\u7ec4\uff1a";
        var a = Element.create("a", {
            innerHTML: "\u5173\u95ed\u67e5\u770b",
            appendTo: this.head
        });
        E.on(a, "click", this.hidden, a, this);
        E.on(a, "click",
        function() {
            this.showBottomGroup()
        },
        a, this)
    },
    viewGroup: function(a, b) {
        this.current_el != null && this.showBottomGroup();
        this.current_el = b;
        this.setHead();
        this.innerData(b);
        this.show();
        this.position(b);
        this.hiddenBottomGroup(b);
        E.preventDefault(a)
    },
    hiddenBottomGroup: function(a) {
        a = a.parentNode.getElementsByTagName("span")[0];
        D.addClass(a, "fn-hide")
    },
    showBottomGroup: function() {
        var a = this.current_el.parentNode.getElementsByTagName("span")[0];
        D.removeClass(a, "fn-hide")
    },
    innerData: function(a) {
        var b = this.getChoosedData(a);
        this.num = 0;
        this.body.innerHTML = "";
        b.forEach(function(d, e) {
            if (this.num >= 36) this.num = 0;
            var g = d.name.unescapeHTML().length > 10 ? d.name.unescapeHTML().substr(0, 7).escapeHTML() + "...": d.name;
            this.getCreateTag(d);
            this.num += g.unescapeHTML().len();
            if (e < b.length - 1) D.hasClass(a, "view-choose-group") || this.num < 36 && this.getCreateEm()
        },
        this)
    },
    getCreateTag: function(a) {
        var b = a.name.unescapeHTML().length > 10 ? a.name.unescapeHTML().substr(0, 7).escapeHTML() + "..": a.name;
        a = Element.create("a", {
            title: a.name,
            appendTo: this.body,
            rel: a.id,
            href: "index_group.htm?src=contactGroup&groupId=" + a.id
        });
        Element.create("span", {
            innerHTML: b,
            appendTo: a
        });
        return a
    },
    getCreateEm: function() {},
    getChoosedData: function(a) {
        if (a.parentNode.getAttribute("rel")) {
            a = AP.cache.usergroups[a.parentNode.getAttribute("rel")];
            if (a === undefined) a = []
        } else a = [];
        return a
    },
    position: function(a) {
        var b = D.getRegion(this.container);
        b = b.right - b.left - 193;
        b = D.getX(a) - 110 - b;
        a = D.getY(a) + 19;
        D.setXY(this.container, [b, a]);
        this.show()
    },
    show: function() {
        D.removeClass(this.container, "fn-hide");
        D.addClass(D.query(".edit-group-contanier")[0], "fn-hide")
    }
});
AP.widget.tagChooseGroup = AP.widget.viewChoosedGroup.extend({
    initialize: function(a, b) {
        this.groups = b;
        this.parent(a);
        this.body.id = "chooseGroupTag"
    },
    render: function() {
        if (!this.container) {
            this.container = Element.create("div", {
                "class": "c-group-select fn-hide"
            });
            var a = this.setHTML();
            this.container.innerHTML = a;
            document.body.appendChild(this.container)
        }
    },
    getElements: function() {
        this.body = D.query(".edit-group-body")[0];
        this.head = D.query(".edit-group-head")[0];
        E.on(D.query(".new-group-tag")[0], "click",
        function(a) {
            D.addClass(D.get("newGroupAction"), "fn-hide");
            D.removeClass(D.get("newGroupButton"), "fn-hide");
            if (!D.get("groupTxt").value.trim().length) D.get("groupTxt").value = "\u672a\u547d\u540d\u5206\u7ec4";
            D.get("groupTxt").select();
            E.preventDefault(a)
        },
        "", this);
        E.on(D.get("createBtn"), "click", this.createGroup, "", this);
        E.on(D.get("cannelBtn"), "click",
        function(a) {
            D.removeClass(D.get("newGroupAction"), "fn-hide");
            D.addClass(D.get("newGroupButton"), "fn-hide");
            E.preventDefault(a)
        },
        "", this);
        E.on(D.get("saveGroupBtn"), this.save, "", this);
        AP.widget.formInputStyle.init(D.get("groupTxt"));
        D.query(".create-group-btn", this.container).forEach(function(a) {
            E.on(a, "click", this.save, "", this)
        },
        this);
        D.query(".cannel_choose", this.container).forEach(function(a) {
            E.on(a, "click", this.cannelChoose, "", this)
        },
        this);
        E.on(D.get("groupTxt"), "focus",
        function() {
            D.query(".fm-explain", this.parent)[0].innerHTML = "\u6700\u591a10\u4e2a\u5b57\u3002"
        })
    },
    createGroup: function() {
        if (D.get("groupTxt").value.trim().length) {
            var a = new AP.core.api("user/contacts/createGroup", {
                onAPISuccess: this.innerNewTag,
                onAPIFailure: this.createGroupFail,
                method: "POST"
            },
            this);
            a.call({
                groupName: D.get("groupTxt").value
            })
        }
    },
    innerNewTag: function(a, b) {
        this.num += b[0].result.name.unescapeHTML().len();
        if (this.num >= 40) {
            this.getCreateTag(b[0].result, true);
            this.num = 0
        } else {
            this.getCreateEm();
            this.getCreateTag(b[0].result, true)
        }
        parseInt(b[0].groupCount) >= 10 && D.addClass(D.query(".new-group-tag")[0], "fn-hide");
        this.groups.push(b[0].result);
        D.removeClass(D.get("newGroupAction"), "fn-hide");
        D.addClass(D.get("newGroupButton"), "fn-hide");
        D.get("groupTxt").value = ""
    },
    createGroupFail: function(a, b) {
        b = b[0];
        a = D.get("groupTxt").parentNode;
        D.addClass(a, "fm-error");
        a = D.query(".fm-explain", a)[0];
        a.innerHTML = b.msg
    },
    cannelChoose: function() {
        var a = D.query("#chooseGroupTag a");
        a.forEach(function(b) {
            D.removeClass(b, "selected")
        })
    },
    setHTML: function() {
        D.addClass(this.container, "edit-group-contanier");
        var a = this.groups.length >= 10 ? "": '<a class="fn-left new-group-tag" href="#">\u65b0\u5efa\u5206\u7ec4</a>';
        return html = '<div class="c-group-select-container"><div class="c-group-select-title edit-group-head"></div><div class="c-group-select-content"><div class="c-group-all edit-group-body"></div><div class="c-group-select-action ft-right" id="newGroupAction">' + a + '<input value="\u4fdd\u5b58" type="button" class="btn-2cn create-group-btn"> <a href="javascript:void(0)" class="cannel_choose">[\u6e05\u7a7a\u9009\u62e9]</a></div><div class="c-group-select-action fn-hide" id="newGroupButton"><ul id="createGroup" class="fm-input fm-add-group"><li class="fm-item"><input id="groupTxt" class="i-text i-text-s" maxlength="10" value="\u672a\u547d\u540d\u5206\u7ec4"/> <input id="createBtn" class="btn-2cn" type="button" value="\u521b\u5efa"> <a href="#" id="cannelBtn">\u53d6\u6d88</a><div class="fm-explain">\u6700\u591a10\u4e2a\u5b57\u3002</div></li></ul><div class="c-group-save"><input value="\u4fdd\u5b58" type="button" class="btn-2cn create-group-btn"> <a href="javascript:void(0)" class="cannel_choose">[\u6e05\u7a7a\u9009\u62e9]</a></div></div></div></div>'
    },
    setHead: function() {
        this.head.innerHTML = "\u5206\u7ec4\uff1a  ";
        var a = Element.create("a", {
            innerHTML: "\u53d6\u6d88",
            appendTo: this.head
        });
        E.on(a, "click", this.hidden, "", this);
        E.on(a, "click",
        function() {
            this.showBottomGroup()
        },
        "", this)
    },
    save: function() {
        if (D.hasClass(D.get("newGroupButton"), "fn-hide")) this.saveContactHandle();
        else {
            var a = new AP.core.api("user/contacts/createGroup", {
                onAPISuccess: this.groupCreateOk,
                onAPIFailure: this.createGroupFail,
                method: "POST"
            },
            this);
            a.call({
                groupName: D.get("groupTxt").value
            })
        }
    },
    groupCreateOk: function(a, b) {
        this.innerNewTag(a, b);
        this.saveContactHandle()
    },
    saveContactHandle: function() {
        var a = this.getChoosedTags();
        if (D.hasClass(this.current_el, "save-contact")) {
            var b = new AP.core.api("user/contacts/addSingleContact", {
                onAPISuccess: this.saveContactOK,
                onAPIFailure: this.systemException,
                method: "POST"
            },
            this);
            b.call({
                groupIds: a,
                logonId: D.query(".account", this.current_el.parentNode.parentNode)[0].title
            })
        } else {
            b = new AP.core.api("user/contacts/changeUserGroup", {
                onAPISuccess: this.addContactOK,
                method: "POST",
                cache: false
            },
            this);
            b.call({
                groupIds: a,
                logonIds: D.query(".account", this.current_el.parentNode.parentNode)[0].title
            })
        }
        this.hidden()
    },
    systemException: function(a, b) {
        b[0].msg && new AP.widget.errorXbox({
            error_info: b[0].msg,
            url_info: '<a href="/user/contacts/index.htm">\u8fd4\u56de\u6211\u7684\u8054\u7cfb\u4eba </a>'
        })
    },
    saveContactOK: function(a, b) {
        this.showBottomGroup();
        this.changeText(b);
        b = b[0];
        this.current_el.innerHTML = "[\u4fee\u6539]";
        mytip.show(b.msg);
        D.removeClass(this.current_el, "ico-plus");
        D.removeClass(this.current_el, "save-contact");
        a = D.query(".J_item", this.current_el.parentNode.parentNode.parentNode)[0];
        var d = [];
        b.contactGroupList.forEach(function(f) {
            d.push({
                name: f.name.escapeHTML(),
                id: f.id
            })
        });
        var e = "user_" + b.crmUserId;
        this.current_el.parentNode.setAttribute("rel", e);
        AP.cache.usergroups[e] = d;
        a.disabled = "";
        a.id = "contacts_item_" + b.crmUserId;
        D.addClass(a, "J_item");
        b = D.query("label", this.current_el.parentNode.parentNode.parentNode)[0];
        e = D.query(".nickname_edit", this.current_el.parentNode.parentNode.parentNode)[0];
        var g = D.query(".delete", this.current_el.parentNode.parentNode.parentNode)[0];
        b.setAttribute("for", a.id);
        D.removeClass(g, "fn-hide");
        D.removeClass(e, "fn-hide")
    },
    addContactOK: function(a, b) {
        this.showBottomGroup();
        this.changeText(b);
        mytip.show("\u4fee\u6539\u5206\u7ec4\u6210\u529f\u3002")
    },
    changeText: function(a) {
        var b = this.current_el.parentNode.getElementsByTagName("span")[0];
        html = [];
        var d = [];
        a[0].contactGroupList.forEach(function(k) {
            d.push({
                name: k.name.escapeHTML(),
                id: k.id
            })
        });
        var e = this.current_el.parentNode.getAttribute("rel");
        AP.cache.usergroups[e] = d;
        var g = 0,
        f = 0;
        a[0].contactGroupList.forEach(function(k, n) {
            if (g >= 10 || n > 2) return false;
            f = n + 1;
            n = g;
            g += k.name.unescapeHTML().length;
            n = g > 10 ? k.name.unescapeHTML().substring(0, 10 - n).escapeHTML() + "...": k.name;
            html.push('<a href="index_group.htm?src=contactGroup&groupId=' + k.id + '" title="' + k.name + '">' + n + "</a>")
        });
        if (a[0].contactGroupList.length > 3) {
            b.innerHTML = "\u5206\u7ec4\uff1a" + html.join("\uff0c") + " \u7b49" + a[0].contactGroupList.length + "\u4e2a";
            e = D.query(".view-choose-group", this.current_el.parentNode)[0];
            D.removeClass(e, "fn-hide")
        } else if (a[0].contactGroupList.length == 0) {
            e = D.query(".view-choose-group", this.current_el.parentNode)[0];
            b.innerHTML = "\u5206\u7ec4\uff1a\u65e0";
            D.addClass(e, "fn-hide")
        } else {
            e = D.query(".view-choose-group", this.current_el.parentNode)[0];
            if (f < a[0].contactGroupList.length) {
                b.innerHTML = "\u5206\u7ec4\uff1a" + html.join("\uff0c") + " \u7b49" + a[0].contactGroupList.length + "\u4e2a";
                D.removeClass(e, "fn-hide")
            } else {
                b.innerHTML = "\u5206\u7ec4\uff1a" + html.join("\uff0c");
                D.addClass(e, "fn-hide")
            }
        }
    },
    changeStatus: function(a, b) {
        D.hasClass(b, "selected") ? D.removeClass(b, "selected") : D.addClass(b, "selected");
        E.preventDefault(a)
    },
    getChoosedTags: function() {
        var a = D.query("#chooseGroupTag a"),
        b = [];
        a.forEach(function(d) {
            D.hasClass(d, "selected") && b.push(d.getAttribute("rel"))
        });
        return b.join(",")
    },
    innerData: function(a) {
        var b = a.parentNode.getAttribute("rel") == "[]" ? [] : this.getChoosedData(a),
        d = [],
        e = this.groups;
        this.num = 0;
        this.body.innerHTML = "";
        b.forEach(function(g) {
            d.push(g.id.toString())
        });
        e.forEach(function(g, f) {
            if (this.num >= 36) this.num = 0;
            d.has(g.id.toString()) ? this.getCreateTag(g, true) : this.getCreateTag(g);
            this.num += g.name.unescapeHTML().len();
            if (f < e.length - 1) if (D.hasClass(a, "view-choose-group")) this.body.appendChild(document.createTextNode("\uff0c"));
            else this.num < 36 && this.getCreateEm()
        },
        this)
    },
    position: function(a) {
        var b = D.getRegion(a);
        b = b.right - 373;
        a = D.getY(a) + 23;
        D.setXY(this.container, [b, a]);
        this.show()
    },
    getCreateTag: function(a, b) {
        var d = a.name.unescapeHTML().length > 10 ? a.name.unescapeHTML().substr(0, 7).escapeHTML() + "..": a.name;
        d = "<span>" + d + "</span>";
        a = b ? Element.create("a", {
            title: a.name,
            innerHTML: d,
            appendTo: this.body,
            "class": "selected",
            rel: a.id,
            href: "#"
        }) : Element.create("a", {
            title: a.name,
            innerHTML: d,
            appendTo: this.body,
            rel: a.id,
            href: "#"
        });
        E.on(a, "click", this.changeStatus, a, this)
    },
    show: function() {
        D.removeClass(D.get("newGroupAction"), "fn-hide");
        D.addClass(D.get("newGroupButton"), "fn-hide");
        D.removeClass(this.container, "fn-hide");
        D.addClass(D.query(".view-group-contanier")[0], "fn-hide")
    }
});
AP.widget.contactsPayer = function() {
    var a = YAHOO.util.Dom,
    b = YAHOO.util.Event,
    d, e = null,
    g, f = function(h, l) {
        var q = h.real_name == h.nick_name || h.nick_name == "\u8bf7\u8f93\u5165\u8054\u7cfb\u4eba\u59d3\u540d" ? Element.create("li", {
            title: h.real_name + " " + h.account
        }) : Element.create("li", {
            title: h.real_name + " [" + h.nick_name + "] " + h.account
        }),
        u = Element.create("input", {
            type: "checkbox",
            id: "contact_" + h.id + "_" + l,
            value: h.real_name + "|" + h.nick_name + "|" + h.account + "|" + h.id
        });
        D.addClass(u, "contact_" + h.id);
        real_name = h.real_name.len() > 8 ? h.real_name.brief(8) + "..": h.real_name;
        account = h.account.len() > 16 ? h.account.brief(18) + "..": h.account;
        q.innerHTML = '<label for="contact_' + h.id + "_" + l + '"><em>' + real_name + "</em> (" + account + ")</label>";
        q.insertBefore(u, q.firstChild);
        b.addListener(q, "mouseover",
        function() {
            a.addClass(this, "hover")
        });
        b.addListener(q, "mouseout",
        function() {
            a.removeClass(this, "hover")
        });
        b.addListener(u, "click", g.addPerson, h, g);
        b.addListener(u, "click", _changeChooseStatus);
        b.addListener(u, "click",
        function() {
            n(this);
            k()
        });
        return q
    },
    k = function() {
        D.get("customPerson").value = "";
        var h = a.getElementsByClassName("fm-explain", "div", D.get("customAddPerson-error").parentNode)[0];
        h.innerHTML = "\u652f\u4ed8\u5b9d\u8d26\u6237\u540d\u662fEmail\u5730\u5740\u6216\u8005\u624b\u673a\u53f7\u7801\u3002";
        a.removeClass(h.parentNode, "fm-error");
        a.removeClass(D.get("customPerson").parentNode, "fm-hover")
    },
    n = function(h) {
        var l = a.getElementsByClassName(h.className);
        if (h.checked) for (h = 0; h < l.length; h++) {
            a.addClass(l[h].parentNode, "current");
            l[h].checked = "checked"
        } else for (h = 0; h < l.length; h++) {
            a.removeClass(l[h].parentNode, "current");
            l[h].checked = ""
        }
    },
    t = function(h) {
        var l = document.createElement("div"),
        q = document.createElement("ul");
        h.forEach(function(u, x) {
            u = f(u, x);
            q.appendChild(u)
        });
        a.addClass(l, "fn-overflow");
        l.appendChild(q);
        return l
    },
    p = function(h) {
        var l = Element.create("h3");
        l.innerHTML = '<span class="switch">' + h.name + "<em>(" + h.user_num + ")</em></span>";
        return l
    },
    r = function(h) {
        if (d.length) d.forEach(function(l) {
            var q = Element.create("div"),
            u = p(l);
            l = t(l.users);
            D.addClass(q, "com-mycontacts-group");
            q.appendChild(u);
            q.appendChild(l);
            q.appendChild(s());
            h.appendChild(q)
        },
        this);
        else D.get("myContacts").innerHTML = '<div class="com-mycontacts-empty">\u60a8\u8fd8\u6ca1\u6709\u8054\u7cfb\u4eba\uff0c\u8bf7\u76f4\u63a5\u624b\u52a8\u8f93\u5165\u3002</div>'
    };
    _changeChooseStatus = function() {
        var h = this.parentNode.parentNode.parentNode.parentNode,
        l = 0,
        q = h.getElementsByTagName("input");
        h = a.getElementsByClassName("action", "div", h)[0].getElementsByTagName("a")[0];
        for (var u = 0; u < q.length; u++) if (q[u].checked) l += 1;
        if (l == q.length) {
            h.innerHTML = "\u53d6\u6d88\u5168\u9009";
            b.removeListener(h, "click");
            b.addListener(h, "click", w)
        } else {
            h.innerHTML = "\u5168\u9009";
            b.removeListener(h, "click");
            b.addListener(h, "click", v)
        }
    };
    var s = function() {
        var h = Element.create("div"),
        l = Element.create("a", {
            href: "javascript:void(0);"
        });
        l.innerHTML = "\u5168\u9009";
        D.addClass(h, "action");
        b.addListener(l, "click", v);
        h.appendChild(l);
        return h
    },
    v = function() {
        if (D.get("customPerson")) D.get("customPerson").value = "";
        if (! (_payment_obj.getUsersLen() >= 30)) {
            j(this);
            b.removeListener(this, "click");
            b.addListener(this, "click", w);
            for (var h = this.parentNode.parentNode.getElementsByTagName("input"), l = 0; l < h.length; l++) {
                if (_payment_obj.getUsersLen() >= 30) return;
                var q = {
                    real_name: h[l].value.split("|")[0],
                    nick_name: h[l].value.split("|")[1],
                    account: h[l].value.split("|")[2],
                    id: h[l].value.split("|")[3]
                };
                h[l].checked = "checked";
                n(h[l]);
                _payment_obj.addPerson("", q, true)
            }
        }
    },
    w = function(h) {
        j(this);
        b.removeListener(this, "click");
        b.addListener(this, "click", v);
        for (var l = this.parentNode.parentNode.getElementsByTagName("input"), q = 0; q < l.length; q++) if (l[q].checked) {
            var u = D.get("user_" + l[q].value.split("|")[3]);
            _payment_obj.deletePerson(h, u)
        }
    },
    j = function(h) {
        h.innerHTML == "\u5168\u9009" ? (h.innerHTML = "\u53d6\u6d88\u5168\u9009") : (h.innerHTML = "\u5168\u9009")
    },
    m = function() {
        a.getElementsByClassName("tab-node").forEach(function(h) {
            b.addListener(h, "click",
            function() {
                a.hasClass(h, "current") || o(h, "current")
            },
            h)
        })
    },
    o = function(h, l) {
        a.getElementsByClassName("tab-node").forEach(function(q) {
            c = document.getElementById(q.id.replace("Tab", ""));
            a.hasClass(q, l) ? a.removeClass(q, l) : a.addClass(q, l);
            a.hasClass(q, l) ? a.removeClass(c, "fn-hide") : a.addClass(c, "fn-hide")
        })
    };
    return {
        init: function(h) {
            g = h.call_obj;
            m()
        },
        appendContacts: function(h) {
            var l = document.getElementById(h.append_box);
            d = h.contacts;
            h.has_group ? r(l) : l.appendChild(t(d))
        },
        markGiftUser: function() {
            f = function(h) {
                var l = h.real_name == h.nick_name || h.nick_name == "\u8bf7\u8f93\u5165\u8054\u7cfb\u4eba\u59d3\u540d" ? Element.create("li", {
                    title: h.real_name + " " + h.account
                }) : Element.create("li", {
                    title: h.real_name + " [" + h.nick_name + "] " + h.account
                }),
                q = Element.create("input", {
                    type: "radio",
                    id: "contact_" + h.id,
                    name: "contact"
                });
                l.innerHTML = '<label for="contact_' + h.id + '"><em>' + h.real_name + "</em> (" + h.account + ")</label>";
                l.insertBefore(q, l.firstChild);
                b.addListener(q, "click", g.addPerson, h, g);
                b.addListener(l, "mouseover",
                function() {
                    a.addClass(this, "hover")
                });
                b.addListener(l, "mouseout",
                function() {
                    a.removeClass(this, "hover")
                });
                b.addListener(q, "click",
                function() {
                    e != null && a.removeClass(e, "current");
                    a.addClass(this.parentNode, "current");
                    e = this.parentNode
                });
                return l
            };
            r = function(h) {
                d.forEach(function(l) {
                    var q = Element.create("div"),
                    u = p(l);
                    l = t(l.users);
                    D.addClass(q, "com-mycontacts-group");
                    q.appendChild(u);
                    q.appendChild(l);
                    h.appendChild(q)
                },
                this)
            }
        }
    }
} ();
AP.widget.CustomAddPerson = function() {
    var a = YAHOO.util.Dom,
    b = YAHOO.util.Event,
    d = null,
    e = null,
    g = null,
    f = null,
    k = null,
    n = null,
    t = function() {
        var o = D.get("customPerson").value;
        if (o.trim().length) if (f == o) s("\u4e0d\u80fd\u6dfb\u52a0\u81ea\u5df1\u7684\u5e10\u53f7");
        else if (p(o)) _payment_obj.addPerson("", p(o), true);
        else {
            o = "email=" + o + "&row_no=1";
            AP.ajax.asyncRequest("POST", d, r, o)
        }
    },
    p = function(o) {
        for (var h = 0; h < n.length; h++) for (var l = 0; l < n[h].users.length; l++) if (n[h].users[l].account == o) return n[h].users[l];
        return false
    },
    r = {
        success: function(o) {
            o = o.responseText.split(",");
            if (o[1].length == 0) s("\u8f93\u5165\u7684\u7528\u6237\u4e0d\u5b58\u5728");
            else {
                person = {
                    real_name: o[1],
                    id: D.get("customPerson").value,
                    account: D.get("customPerson").value,
                    nick_name: ""
                };
                _payment_obj.addPerson("", person, true);
                D.get("customPerson").value = ""
            }
        }
    },
    s = function(o) {
        var h = a.getElementsByClassName("fm-explain", "div", D.get("customAddPerson-error").parentNode)[0];
        h.innerHTML = o;
        a.addClass(h.parentNode, "fm-error")
    },
    v = function() {
        D.get("customPerson").select();
        var o = a.getElementsByClassName("fm-explain", "div", D.get("customAddPerson-error").parentNode)[0];
        o.innerHTML = "\u652f\u4ed8\u5b9d\u8d26\u6237\u540d\u662fEmail\u5730\u5740\u6216\u8005\u624b\u673a\u53f7\u7801\u3002";
        a.removeClass(o.parentNode, "fm-error");
        a.removeClass(D.get("customPerson").parentNode, "fm-hover");
        a.addClass(D.get("customPerson").parentNode, "fm-focus")
    },
    w = function(o) {
        var h = D.get("autoCompleteContainer");
        h = h.getElementsByTagName("ul")[0].getElementsByTagName("li");
        for (var l = [], q = 0; q < h.length; q++) a.getStyle(h[q], "display") != "none" && l.push(h[q]);
        for (q = 0; q < l.length; q++) if (l[q] == o) return q
    };
    _uniqueResult = function(o) {
        for (var h = 0; h < o.length; h++) for (var l = h + 1; l < o.length; l++) o[h].account == o[l].account && o.remove(o[l]);
        return o
    };
    var j = function(o) {
        o = o || window.event;
        if (o.preventDefault) o.preventDefault();
        else o.returnValue = false;
        return false
    },
    m = function(o) {
        o = window.event || arguments.callee.caller.arguments[0];
        var h = o.keyCode || o.which || o.charCode;
        String.fromCharCode(h);
        h == 13 && j(o)
    };
    return {
        init: function(o) {
            d = o.request_url;
            _payment_obj = o.payment_obj;
            f = o.currentUser;
            n = o.datasource;
            e = D.get(o.require_field);
            this.autoComplete(o.datasource);
            E.on(e, "focus",
            function() {
                D.removeClass(D.getAncestorByClassName(e, "fm-item"), "fm-error")
            });
            if (d != null) {
                g = D.get(o.trigger);
                b.on(g, "click", t, "", this);
                b.on(D.get("customPerson"), "focus", v);
                b.on(D.get("customPerson"), "keydown", m);
                b.on(D.get("customPerson"), "blur",
                function() {
                    D.removeClass(this.parentNode, "fm-focus")
                });
                b.on(D.get("customPerson"), "mouseover",
                function() {
                    D.hasClass(this.parentNode, "fm-focus") || D.addClass(this.parentNode, "fm-hover")
                });
                b.on(D.get("customPerson"), "mouseout",
                function() {
                    D.hasClass(this.parentNode, "fm-focus") || D.removeClass(this.parentNode, "fm-hover")
                })
            }
        },
        buildData: function(o) {
            var h = [];
            o.forEach(function(l) {
                l.users.forEach(function(q) {
                    var u = {};
                    real_name = q.real_name.len() > 8 ? q.real_name.brief(8) + "..": q.real_name;
                    account = q.account.len() > 16 ? q.account.brief(16) + "..": q.account;
                    u.context = real_name + " (" + account + ")";
                    u.id = q.id;
                    u.account = q.account;
                    u.nick_name = q.nick_name;
                    u.real_name = q.real_name;
                    h.push(u)
                })
            });
            return h
        },
        autoComplete: function(o) {
            o = this.buildData(o);
            o = new YAHOO.util.LocalDataSource(o);
            o.responseSchema = {
                fields: ["context", "id", "account", "nick_name", "real_name"]
            };
            YAHOO.widget.AutoComplete.prototype.filterResults = this.filterResults;
            YAHOO.widget.AutoComplete.prototype._onContainerClick = this.onContainerClick;
            YAHOO.widget.AutoComplete.prototype._updateValue = this.enterHandle;
            o = new YAHOO.widget.AutoComplete(e, "autoCompleteContainer", o);
            o.prehighlightClassName = "yui-ac-prehighlight";
            o.useShadow = false;
            o.animVert = false;
            E.on(g, "click",
            function() {
                var h = "\u8bf7\u8f93\u5165\u5bf9\u65b9\u7684\u652f\u4ed8\u5b9d\u8d26\u6237";
                if (this.value == h) this.value = "";
                else AP.fn.regExp.email.test(this.value) || alert("error2")
            })
        },
        enterHandle: function(o) {
            if (!this.suppressInputUpdate) {
                var h = this._elTextbox;
                if (h.type == "textarea") h.scrollTop = h.scrollHeight;
                var l = h.value.length;
                this._selectText(h, l, l);
                this._elCurListItem = o;
                o = w(o);
                o = k[o];
                e.value = "";
                _payment_obj.addPerson("", o, true)
            }
        },
        onContainerClick: function(o, h) {
            if (D.get("customAddPerson-error")) {
                var l = a.getElementsByClassName("fm-explain", "div", D.get("customAddPerson-error").parentNode)[0];
                l.innerHTML = "\u652f\u4ed8\u5b9d\u8d26\u6237\u540d\u662fEmail\u5730\u5740\u6216\u8005\u624b\u673a\u53f7\u7801\u3002";
                a.removeClass(l.parentNode, "fm-error")
            }
            o = YAHOO.util.Event.getTarget(o);
            l = o.nodeName.toLowerCase();
            var q = w(o);
            for (q = k[q]; o && l != "table";) {
                switch (l) {
                case "body":
                    return;
                case "li":
                    h._toggleHighlight(o, "to");
                    h._selectItem(o);
                    e.value = "";
                    _payment_obj.addPerson("", q, true);
                    return;
                default:
                    break
                }
                if (o = o.parentNode) l = o.nodeName.toLowerCase()
            }
        },
        filterResults: function(o, h, l, q) {
            if (o && o !== "") {
                l = YAHOO.widget.AutoComplete._cloneObject(l);
                var u = q.scope,
                x = this;
                h = l.results;
                q = [];
                var A = x.queryMatchCase || u.queryMatchCase;
                u = x.queryMatchContains || u.queryMatchContains;
                for (x = 2; x < this.responseSchema.fields.length; x++) for (var B = h.length - 1; B >= 0; B--) {
                    var z = h[B],
                    y = null;
                    if (YAHOO.lang.isString(z)) y = z;
                    else if (YAHOO.lang.isArray(z)) y = z[0];
                    else if (this.responseSchema.fields) {
                        y = this.responseSchema.fields[x].key || this.responseSchema.fields[x];
                        y = z[y]
                    } else if (this.key) y = z[this.key];
                    if (YAHOO.lang.isString(y)) {
                        y = A ? y.indexOf(decodeURIComponent(o)) : y.toLowerCase().indexOf(decodeURIComponent(o).toLowerCase());
                        if (!u && y === 0 || u && y > -1) q.unshift(z)
                    }
                }
                l.results = _uniqueResult(q);
                k = _uniqueResult(q)
            }
            return l
        }
    }
} ();
AP.widget.nickname = function(a) {
    function b() {
        n.value = n.value.trim();
        showElement([n, t, p], false);
        var j = new AP.core.api("user/contacts/editNickName", {
            onAPISuccess: w,
            onAPIFailure: v,
            method: "POST"
        },
        this),
        m = D.query(".J_item", n.parentNode.parentNode.parentNode)[0].id.replace("contacts_item_", "");
        n.value = n.value.substr(0, 10);
        j.call({
            nickName: n.value,
            crmUserId: m
        });
        showElement(a);
        D.removeClass(a.parentNode, "modify")
    }
    var d = "&nbsp;-&nbsp;",
    e = a.parentNode;
    if (e.nodeName == "SPAN") e = a.parentNode.parentNode;
    var g = D.getElementsBy(function(j) {
        return D.hasClass(j, "truename")
    },
    "span", e)[0],
    f = D.getElementsBy(function(j) {
        return D.hasClass(j, "mark")
    },
    "span", e)[0],
    k = D.getElementsBy(function(j) {
        return D.hasClass(j, "nickname")
    },
    "span", e)[0],
    n = D.getElementsBy(function(j) {
        return D.hasClass(j, "input")
    },
    "", e)[0],
    t = D.getElementsBy(function(j) {
        return D.hasClass(j, "save")
    },
    "", e)[0],
    p = D.getElementsBy(function(j) {
        return D.hasClass(j, "cancel")
    },
    "", e)[0],
    r = D.hasClass(a, "addNickname") ? a: null,
    s = D.hasClass(a, "modifyNickname") ? a: null;
    D.query("#myContacts li").forEach(function(j) {
        E.on(j, "mouseover",
        function(m) {
            target = E.getTarget(m);
            m = D.query("input", j);
            if (m.length) m = D.query("input", j)[0];
            if (D.query(".addNickname", j).length && D.hasClass(m, "fn-hide")) {
                D.removeClass(D.query(".addNickname", j)[0], "fn-hide");
                D.removeClass(D.query(".delete", j)[0], "fn-hide")
            } else D.addClass(D.query(".addNickname", j)[0], "fn-hide");
            if (D.query(".modifyNickname", j).length && D.hasClass(m, "fn-hide")) {
                D.removeClass(D.query(".delete", j)[0], "fn-hide");
                D.removeClass(D.query(".modifyNickname", j)[0], "fn-hide")
            } else D.addClass(D.query(".modifyNickname", j)[0], "fn-hide")
        },
        j, this);
        E.on(j, "mouseout",
        function(m) {
            target = E.getTarget(m);
            if (D.query(".addNickname", j).length) {
                D.addClass(D.query(".delete", j)[0], "fn-hide");
                D.addClass(D.query(".addNickname", j)[0], "fn-hide")
            }
            if (D.query(".modifyNickname", j).length) {
                D.addClass(D.query(".delete", j)[0], "fn-hide");
                D.addClass(D.query(".modifyNickname", j)[0], "fn-hide")
            }
        },
        "", this)
    });
    E.addListener(a, "click",
    function(j) {
        showElement([n, t, p]);
        showElement(a, false);
        D.addClass(a.parentNode, "modify");
        if (k) {
            showElement(k, false);
            showElement(f, false);
            n.value = n.value.trim().length > 10 ? n.value.trim().replace("...", "") : k.innerHTML.trim()
        } else n.value = "";
        D.addClass(n.parentNode, "fm-focus");
        n.select();
        E.preventDefault(j);
        E.stopEvent(j)
    });
    var v = function(j, m) {
        showElement([n, t, p], false);
        showElement(k);
        showElement(f);
        showElement(s ? s: r);
        E.preventDefault(j);
        D.removeClass(p.parentNode, "modify");
        m && new AP.widget.errorXbox({
            error_info: m[0].msg,
            url_info: '<a href="/user/contacts/index.htm">\u8fd4\u56de\u6211\u7684\u8054\u7cfb\u4eba </a>'
        })
    };
    E.addListener(t, "click",
    function() {
        b()
    });
    E.on(n, "keydown",
    function(j) {
        if (j.keyCode == 13) {
            b();
            E.stopEvent(j);
            n.blur()
        }
    });
    var w = function() {
        if (k == null) var j = "";
        else {
            j = k.innerHTML;
            if (n.value == k.innerHTML) j = ""
        }
        if (n.value != "" && n.value != j) {
            if (s) k.innerHTML = n.value.escapeHTML();
            else {
                f = Element.create("span");
                D.addClass(k, "mark");
                f.innerHTML = d;
                D.insertAfter(f, g);
                k = Element.create("span");
                D.addClass(k, "nickname");
                k.innerHTML = n.value.escapeHTML();
                D.insertAfter(k, f);
                s = r;
                r = null;
                D.replaceClass(s, "addNickname", "modifyNickname");
                s.innerHTML = "[\u4fee\u6539\u6635\u79f0]"
            }
            showElement(k);
            showElement(f)
        } else {
            log("1");
            if (s) {
                r = s;
                s = null;
                D.replaceClass(r, "modifyNickname", "addNickname");
                r.innerHTML = "[\u6dfb\u52a0\u6635\u79f0]";
                e.removeChild(k);
                e.removeChild(f);
                f = k = null
            }
            n.value = ""
        }
    };
    E.addListener(p, "click", v)
};
AP.widget.autoScroll = function(a, b, d, e) {
    this.obj = document.getElementById(a);
    this.box = document.getElementById(b);
    this.style = this.obj.style;
    this.defaultHeight = e;
    this.scrollUp = doScrollUp;
    this.stopScroll = false;
    this.obj.innerHTML += this.obj.innerHTML;
    this.curLineHeight = 0;
    this.lineHeight = d;
    this.curStopTime = 0;
    this.stopTime = 300;
    this.speed = 10;
    this.style.marginTop = d + "px";
    this.object = a + "Object";
    eval(this.object + "=this");
    setInterval(this.object + ".scrollUp()", 10);
    this.obj.onmouseover = new Function(this.object + ".stopScroll=true");
    this.obj.onmouseout = new Function(this.object + ".stopScroll=false")
};
function doScrollUp() {
    if (this.stopScroll != true) if (this.curLineHeight >= this.lineHeight) {
        this.curStopTime += 1;
        if (this.curStopTime >= this.stopTime) this.curStopTime = this.curLineHeight = 0
    } else {
        this.curLineHeight += 10;
        this.style.marginTop = parseInt(this.style.marginTop) - 10 + "px";
        if ( - parseInt(this.style.marginTop) >= this.defaultHeight) this.style.marginTop = 0
    }
}
AP.widget.autoTab = function() {
    var a = "current",
    b = [],
    d = [],
    e = false,
    g = 0,
    f,
    k,
    n,
    t = function(r) {
        if (r.innerHTML) for (var s = 0; s < b.length; s++) if (b[s] == r) {
            r = s;
            break
        }
        D.removeClass(b[g], a);
        AP.widget.xTab.hide(d[g]);
        D.addClass(b[r], a);
        AP.widget.xTab.show(d[r]);
        g = r
    },
    p = function() {
        if (e) return false;
        t((g + 1) % b.length);
        return true
    };
    return {
        setAutoKey: function(r) {
            e = r
        },
        init: function(r) {
            n = r || {};
            if (! (n.name && n.mainId && n.menuId && n.contentId)) return false;
            if (n.defaultTab) g = n.defaultTab;
            else n.defaultTab = 0;
            if (!n.timer) n.timer = 5E3;
            if (!n.delay) n.delay = 50;
            D.get(n.mainId).onmouseover = D.get(n.mainId).onfocus = function() {
                eval(n.name + ".setAutoKey(true)")
            };
            D.get(n.mainId).onmouseout = function() {
                eval(n.name + ".setAutoKey(false)")
            };
            var s = D.get(n.menuId);
            r = D.get(n.contentId);
            for (var v = 0; v < s.childNodes.length; v++) if (s.childNodes[v].nodeType === 1) {
                D.removeClass(s.childNodes[v], a);
                s.childNodes[v].onmouseover = s.childNodes[v].onfocus = function() {
                    f = this;
                    k = setTimeout(n.name + ".switchTo()", n.delay)
                };
                s.childNodes[v].onmouseout = function() {
                    clearTimeout(k)
                };
                b[b.length] = s.childNodes[v]
            }
            for (s = 0; s < r.childNodes.length; s++) if (r.childNodes[s].nodeType === 1) {
                AP.widget.xTab.hide(r.childNodes[s]);
                d[d.length] = r.childNodes[s]
            }
            D.addClass(b[n.defaultTab], a);
            AP.widget.xTab.show(d[n.defaultTab]);
            setInterval(n.name + ".autoSwitch()", n.timer);
            return true
        },
        autoSwitch: p,
        switchTo: function() {
            t(f)
        }
    }
};
AP.widget.dropDown = new AP.Class({
    initialize: function(a, b) {
        this.targets = a;
        this.options = this.setOptions(b);
        this.tmp = null;
        this.tag = false;
        this.targets.forEach(function(d) {
            this.bindEvents(d, this.getDrop(d))
        },
        this);
        this.onTargetClickEvent = new U.CustomEvent("onTargetClickEvent");
        this.onHiddenClickEvent = new U.CustomEvent("onhiddenEvent");
        this.onTargetClickEvent.subscribe(this.options.targetClick, this, true);
        this.onHiddenClickEvent.subscribe(this.options.hideEvent, this, true)
    },
    setOptions: function(a) {
        return AP.hashExtend({
            isposition: false,
            offset: [0, 0],
            styles: {},
            targetClick: function() {},
            hideEvent: function() {},
            mousehandle: false,
            outcontent: false,
            iframe: false
        },
        a || {})
    },
    getDrop: function(a) {
        if (this.options.outcontent) {
            if (D.get("J_" + a.id + "_Box")) return D.get("J_" + a.id + "_Box");
            if (D.get(a.id + "Extend")) {
                var b = D.get(a.id + "Extend"),
                d = b.cloneNode(true);
                d.id = "J_" + a.id + "_Box";
                b.parentNode.removeChild(b);
                document.body.appendChild(d);
                return d
            }
            throw "function getDrop not retrun any dropbox";
        }
        return D.get(a.id + "Extend")
    },
    bindEvents: function(a, b) {
        if (this.options.mousehandle) {
            E.on(a, "mouseover", this.show, a, this);
            E.on(a, "mouseout", this.hide, b, this)
        } else {
            E.on(a, "click", this.taggleShow, a, this);
            E.on(a, "mouseover", this.setTagTrue, a, this);
            E.on(a, "mouseout", this.setTagFalse, a, this);
            E.on(b, "mouseover", this.setTagTrue, b, this);
            E.on(b, "mouseout", this.setTagFalse, b, this);
            E.on(document.body, "click", this.bodyClick, b, this)
        }
    },
    bodyClick: function(a, b) {
        this.tag || this.hide(a, b)
    },
    setTagTrue: function() {
        this.tag = true
    },
    setTagFalse: function() {
        this.tag = false
    },
    taggleShow: function(a, b) {
        D.hasClass(this.getDrop(b), "fn-hide") ? this.show(false, b) : this.hide(false, this.getDrop(b));
        E.preventDefault(a)
    },
    show: function(a, b) {
        var d = this.getDrop(b);
        this.current_target = b;
        this.tmp && this.hide(a, this.tmp);
        this.tmp = d;
        if (this.options.isposition) {
            this.setPosition(this.current_target, d);
            E.on(window, "resize",
            function() {
                this.setPosition(this.current_target, d)
            },
            "", this)
        }
        D.removeClass(d, "fn-hide");
        AP.env.browser.msie6 && this.options.iframe && this.iframeCfg(d);
        this.onTargetClickEvent.fire(this.current_target)
    },
    iframeCfg: function(a) {
        if (!D.query("iframe", a).length) {
            var b = Element.create("iframe");
            b.src = "javascript:false;";
            var d = D.getStyle(a, "width"),
            e = D.getStyle(a.firstChild, "height");
            D.setStyle(b, "opacity", "0");
            D.setStyle(b, "width", d);
            D.setStyle(b, "height", e);
            a.appendChild(b)
        }
    },
    setPosition: function(a, b) {
        D.setStyles(b, {
            position: "absolute",
            "z-index": "900"
        });
        D.setStyles(b, this.options.styles);
        a = D.getRegion(a);
        D.setStyles(b, {
            left: a.left + this.options.offset[0] + "px",
            top: a.bottom + this.options.offset[1] + "px"
        })
    },
    hide: function(a, b) {
        D.addClass(b, "fn-hide");
        this.onHiddenClickEvent.fire()
    }
});
AP.widget.jointDropDown = AP.widget.dropDown.extend({
    initialize: function(a, b) {
        this.extend_id = b.extend_id;
        this.parent(a, b)
    },
    getDrop: function() {
        return D.get(this.extend_id)
    },
    taggleShow: function(a, b) {
        var d = this.getDrop(b);
        this.current_target = b;
        this.show(d);
        this.setPosition(b, d);
        E.preventDefault(a)
    },
    show: function(a) {
        this.tmp && this.hide(this.tmp);
        this.tmp = a;
        if (this.options.isposition) {
            this.setPosition(this.current_target, a);
            E.on(window, "resize",
            function() {
                this.setPosition(this.current_target, a)
            },
            "", this)
        }
        this.onTargetClickEvent.fire(this.current_target, a)
    },
    bodyClick: function() {}
});



AP.pk.pa.animDropDown = AP.widget.dropDown.extend({
    bindEvents: function(a, b) {
        this.parent(a, b);
        if (this.options.mousehandle) {
            E.on(this.options.animTarget, "mouseout", this.hide, b, this);
            E.on(this.options.animTarget, "mouseover", this.show, a, this)
        }
    },
    setOptions: function(a) {
        return AP.hashExtend({
            isposition: false,
            offset: [0, 0],
            styles: {},
            targetClick: function() {},
            hideEvent: function() {},
            mousehandle: false,
            outcontent: false,
            animTarget: D.get("J-nav-sub-life")
        },
        a || {})
    },
    show: function(a, b) {
        this.hideTimer && window.clearTimeout(this.hideTimer);
        var d = this.getDrop(b);
        this.current_target = b;
        if (this.options.isposition) {
            E.on(window, "resize",
            function() {
                this.setPosition(this.current_target, d)
            },
            "", this);
            this.setPosition(this.current_target, d)
        }
        D.removeClass(d, "fn-hide");
        if (!this.dropboxOffsetHeight) this.dropboxOffsetHeight = d.offsetHeight;
        a = new YAHOO.util.Anim(this.options.animTarget, {
            top: {
                to: 0
            }
        },
        0.3, YAHOO.util.Easing.easeNone);
        a.animate();
        this.onTargetClickEvent.fire(this.current_target)
    },
    hide: function(a, b) {
        D.get(b.id.replace("Extend", ""));
        var d = new YAHOO.util.Anim(this.options.animTarget, {
            top: {
                to: -this.dropboxOffsetHeight
            }
        },
        0.3, YAHOO.util.Easing.easeNone);
        this.hideTimer && window.clearTimeout(this.hideTimer);
        this.hideTimer = window.setTimeout(function() {
            d.animate()
        },
        300);
        var e = this;
        d.onComplete.subscribe(function() {
            if (parseInt(e.options.animTarget.style.top) == -e.dropboxOffsetHeight) {
                D.addClass(b, "fn-hide");
                e.onHiddenClickEvent.fire()
            }
        })
    },
    setPosition: function(a, b) {
        D.setStyles(b, {
            position: "absolute",
            "z-index": "900"
        });
        D.setStyles(b, this.options.styles);
        a = D.getRegion(a);
        AP.fn.browser.msie ? D.setStyles(b, {
            left: a.left + this.options.offset[0] - 2 + "px",
            top: a.bottom + this.options.offset[1] - 2 + "px"
        }) : D.setStyles(b, {
            left: a.left + this.options.offset[0] + "px",
            top: a.bottom + this.options.offset[1] + "px"
        })
    }
});






AP.widget.tipdone = new AP.Class({
    setOptions: function(a) {
        return AP.hashExtend({
            timeout: 5
        },
        a || {})
    },
    initialize: function(a) {
        this.options = this.setOptions(a)
    },
    remove: function() {
        var a = D.query(".tip-done")[0];
        a && a.parentNode.removeChild(a)
    },
    show: function(a) {
        this.remove();
        a = this.createDom(a);
        D.setStyle(a, "left", (document.documentElement.clientWidth - a.offsetWidth) / 2 + "px");
        this.position(a);
        this.scollChange(a);
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(this.remove, 5E3)
    },
    scollChange: function(a) {
        E.on(window, "scroll",
        function() {
            this.position(a)
        },
        "", this)
    },
    position: function(a) {
        D.setStyle(a, "top", document.documentElement.scrollTop + "px")
    },
    getTip: function() {
        return D.query(".tip-done")[0]
    },
    createDom: function(a) {
        html = '<div class="container">' + a + "</div>";
        return Element.create("div", {
            innerHTML: html,
            appendTo: document.body,
            "class": "tip-done"
        })
    }
});
AP.widget.combo = function() {
    var a = function(k) {
        k = D.get(k);
        this.value = (document.all ? k.getAttributeNode("value").specified: k.hasAttribute("value")) ? k.value: k.text;
        this.text = k.text;
        this.url = k.getAttribute(b.linkAttributeName);
        this.selected = k.selected;
        this.el = k
    },
    b = {
        linkAttributeName: "data-link",
        comboClass: "com-popmenu",
        titleClass: "com-popmenu-arrow",
        hiddenClass: "fn-hide",
        activateEvent: "click"
    },
    d = [],
    e,
    g = 0,
    f = function() {
        D.addClass(b.transform, b.hiddenClass);
        for (var k = 0; k < b.transform.options.length; k++) {
            d[k] = new a(b.transform.options[k]);
            if (d[k].selected) g = k
        }
        e = document.createElement("div");
        D.addClass(e, b.comboClass);
        var n = document.createElement("a");
        D.addClass(n, b.titleClass);
        n.innerHTML = b.title;
        var t = document.createElement("ul");
        D.addClass(t, b.hiddenClass);
        for (k = 0; k < d.length; k++) {
            var p = d[k].url ? d[k].url: "#";
            t.innerHTML += '<li><a href="' + p + '" value="' + d[k].value + '">' + d[k].text + "</a></li>"
        }
        e.appendChild(n);
        e.appendChild(t);
        E.on(n, b.activateEvent,
        function(r) {
            D.removeClass(t, b.hiddenClass);
            E.preventDefault(r)
        });
        E.on([t, n], "mouseover",
        function() {
            AP.cache._mouseout_ = false
        });
        E.on([t, n], "mouseout",
        function() {
            AP.cache._mouseout_ = true;
            var r = this == n ? t: this;
            setTimeout(function() {
                AP.cache._mouseout_ && D.addClass(r, b.hiddenClass)
            },
            600)
        });
        D.getElementsBy(function() {
            return true
        },
        "a", t,
        function(r) {
            E.on(r, "click",
            function(s) {
                for (var v = 0; v < d.length; v++) if (d[v].text == r.innerHTML) {
                    b.transform.options[v].selected = true;
                    if (d[v].url) window.location.href = d[v].url;
                    else b.onselect && b.onselect(d[v]);
                    D.addClass(t, b.hiddenClass);
                    break
                }
                E.preventDefault(s)
            })
        });
        b.onselect && b.onselect(d[g])
    };
    return {
        init: function(k) {
            k = k || {};
            for (var n in k) b[n] = k[n];
            if (!b.transform) return false;
            b.transform = D.get(b.transform);
            b.title = b.title ? b.title: b.transform.getAttribute("title");
            if (b.wrapMethod) e = b.wrapMethod.call(this, b);
            else f();
            D.insertBefore(e, b.transform);
            b.onwrap && b.onwrap(e);
            return true
        },
        getCombo: function() {
            return e
        }
    }
};
AP.pk.pa.counter = function(a) {
    var b = this,
    d = [],
    e;
    this.type = ["sms", "phone", "email"];
    this.btnDisable = "btn-normal-disabled";
    this.btnAble = "btn-normal";
    this.sec = AP.cache.countdown = 60;
    this.count = a.count || 60;
    this.action = a.action || false;
    this.text = {
        sms: ["\u91cd\u53d1\u77ed\u4fe1\u6821\u9a8c\u7801", "\u91cd\u65b0\u83b7\u53d6\u77ed\u4fe1"],
        phone: ["\u8bed\u97f3\u83b7\u53d6\u6821\u9a8c\u7801", "\u4f7f\u7528\u8bed\u97f3\u83b7\u53d6", "\u514d\u8d39\u8bed\u97f3\u83b7\u53d6\u6821\u9a8c\u7801"],
        email: ["\u70b9\u51fb\u91cd\u65b0\u53d1\u9001\u90ae\u4ef6", "\u91cd\u65b0\u53d1\u9001\u90ae\u4ef6"]
    };
    this.setMobile = function(g) {
        this.mobilePhone = g
    };
    this.initType = function() {
        this.type.forEach(function(g) {
            a.hasOwnProperty(g) && d.push(g)
        });
        return d
    };
    this.setCount = function(g) {
        b.sec = AP.cache.countdown = g
    };
    this.encode = function(g) {
        if (!/^([0-9]+)[0-9]{4}([0-9]{4})/g.test(g)) return g;
        return g.replace(/^([0-9]+)[0-9]{4}([0-9]{4})/g, "$1****$2")
    };
    this.getLink = function(g) {
        return parseInt(g) == 1 ? '\uff08<a href="/user/mobile/modifyMobile.htm">\u4fee\u6539\u53f7\u7801</a>\uff09': parseInt(g) == 0 ? '\uff08<a href="/user/mobile/bindMobile.htm">\u4fee\u6539\u53f7\u7801</a>\uff09': ""
    };
    this.updateText = function(g) {
        var f;
        if (g === "phone") f = '<p class="t-explain">\u652f\u4ed8\u5b9d\u5411\u60a8\u7684\u624b\u673a\uff1a' + this.encode(this.mobilePhone) + (a.noChangeLink ? "": this.getLink(a.isBind)) + '\u62e8\u6253\u7535\u8bdd\u5e76\u64ad\u62a5\u6821\u9a8c\u7801\u3002<p class="t-explain"><em>\u6765\u7535\u53f7\u7801\uff1a057126883721\u3002</em>\u5982\u679c1\u5206\u949f\u5185\u6ca1\u63a5\u5230\u8bed\u97f3\u6821\u9a8c\u7801\u7535\u8bdd\uff0c\u8bf7\u70b9\u51fb\u6309\u94ae\u91cd\u65b0\u83b7\u53d6\u3002</p>';
        else if (g === "sms") f = '<p class="t-explain"><em>6\u4f4d\u6570\u5b57\u6821\u9a8c\u7801\u77ed\u4fe1</em>\u5df2\u7ecf\u514d\u8d39\u53d1\u9001\u5230\u60a8\u7684\u624b\u673a\uff1a' + this.encode(this.mobilePhone) + (a.noChangeLink ? "": this.getLink(a.isBind)) + '\u3002</p><p class="t-explain">\u5982\u679c1\u5206\u949f\u5185\u6ca1\u6709\u6536\u5230\u6821\u9a8c\u7801\u77ed\u4fe1\uff0c\u8bf7\u70b9\u51fb\u6309\u94ae\u91cd\u65b0\u83b7\u53d6\u3002</p>';
        else if (g === "email") f = '<p class="t-explain">\u8bf7\u8fdb\u5165\u90ae\u7bb1\u67e5\u6536\u90ae\u4ef6\uff0c\u82e5\u65e0\u6cd5\u6536\u5230\u90ae\u4ef6\uff0c\u8bf7\u70b9\u51fb\u91cd\u65b0\u53d1\u9001\u90ae\u4ef6\u3002<a href="emailChange.htm">\u4fee\u6539Email</a></p>';
        D.get(a.txtId).innerHTML = a.text || f
    };
    this.countdown = function(g) {
        if (this.sec !== null) if (this.sec === 0) {
            this.countDownUI(g, false);
            D.get(a.txtId).innerHTML = e;
            D.addClass(D.get(a[g] + "-notice"), "fn-hide");
            this.sec = AP.cache.countdown
        } else {
            this.countDownUI(g, true);
            this.sec--;
            clearTimeout(AP.cache.countTimer);
            AP.cache.countTimer = setTimeout(function() {
                b.countdown(g)
            },
            1E3)
        }
    };
    this.countDownUI = function(g, f) {
        f = f === true || false;
        d.forEach(function(k) {
            var n = D.get(a[k]);
            n.parentNode.className = f ? b.btnDisable: b.btnAble;
            n.disabled = f;
            n.value = f ? "\uff08" + b.sec + "\u79d2\u540e\uff09" + b.text[k][1] : b.text[k][0]
        })
    };
    this.request = function(g) {
        var f = "",
        k;
        g = g + "-" + (a.status || "");
        switch (g) {
        case "email-":
            f = "user/loginName/resendEmail";
            k = {
                resendType: a.emailType
            };
            break;
        case "email-activate":
            f = "user/reg/resendEmailToActivate";
            k = {
                email: a.emailAddress
            };
            break;
        case "phone-bindMobile":
            f = "user/mobile/resendIvrAckCodeToBind";
            k = {
                mobilePhone: a.mobilePhone
            };
            break;
        case "phone-unbindMobile":
            f = "user/mobile/resendIvrAckCodeToUnBind";
            k = {
                mobilePhone: a.mobilePhone
            };
            break;
        case "sms-activate":
            f = "user/reg/resendSmsAckCodeToActivate";
            k = {
                mobilePhone: a.mobilePhone
            };
            break;
        case "sms-bindMobile":
            f = "user/mobile/resendSmsAckCodeToBind";
            k = {
                mobilePhone: a.mobilePhone
            };
            break;
        case "sms-unbindMobile":
            f = "user/mobile/resendSmsAckCodeToUnBind";
            k = {
                mobilePhone: a.mobilePhone
            };
            break;
        case "sms-modifyMobile":
            f = "user/mobile/resendSmsAckCodeToModify";
            k = {
                mobilePhone: a.mobilePhone
            };
            break;
        case "sms-":
            f = "user/mobile/resendSmsAckCode";
            k = typeof a.smsParams == "undefined" ? {
                businessType: a.businessType,
                businessId: a.businessId
            }: {
                businessType: a.businessType,
                businessId: a.businessId,
                smsParams: a.smsParams
            };
            break;
        case "phone-":
            f = "user/mobile/resendIvrAckCode";
            k = {
                businessType: a.businessType,
                businessId: a.businessId
            };
            break;
        case "sms-revokeCert":
            f = "cert/resendSmsAckCodeToRevoke";
            k = {
                mobilePhone: a.mobilePhone
            };
            break;
        case "sms-updateCert":
            f = "cert/resendSmsAckCodeToUpdate";
            k = {
                mobilePhone: a.mobilePhone,
                AckCodeId: a.businessId
            };
            break;
        case "sms-scBindMobile":
            f = "sc/mobile/resendSmsAckCodeToBind";
            k = {
                mobilePhone: a.mobilePhone
            };
            break;
        case "sms-stopConvoy":
            f = "sc/mobile/resendSmsAckCodeToStopConvoy";
            k = {
                mobilePhone: a.mobilePhone
            };
            break;
        case "sms-setConvoyLimit":
            f = "sc/mobile/resendSmsAckCodeToSetConvoyLimit";
            k = {
                mobilePhone: a.mobilePhone
            };
            break;
        case "phone-scBindMobile":
            f = "sc/mobile/resendIvrAckCodeToBind";
            k = {
                mobilePhone: a.mobilePhone
            };
            break;
        case "phone-stopConvoy":
            f = "sc/mobile/resendIvrAckCodeToStopConvoy";
            k = {
                mobilePhone: a.mobilePhone
            };
            break;
        case "phone-setConvoyLimit":
            f = "sc/mobile/resendIvrAckCodeToSetConvoyLimit";
            k = {
                mobilePhone: a.mobilePhone
            };
            break;
        case "sms-sendSMS":
            f = "sc/mobile/resendIvrAckCodeToStopConvoy";
            k = {
                mobilePhone: b.mobilePhone
            };
            break;
        case "sms-security":
            f = "standard/payment/sendAckCodeSms";
            k = {
                requestId: a.businessId
            };
            break;
        case "phone-security":
            f = "standard/payment/sendAckCodeIvr";
            k = {
                requestId: a.businessId
            };
            break;
        case "phone-loginFind":
            f = "user/pwdFind/resendQVoiceAckCode";
            k = {
                logonId: a.logonId
            };
            break;
        case "sms-loginFind":
            f = "user/pwdFind/resendQSmsAckCode";
            k = {
                logonId: a.logonId
            };
            break;
        case "phone-payFind":
            f = "user/pwdFind/resendPVoiceAckCode";
            k = {
                logonId: a.logonId
            };
            break;
        case "sms-payFind":
            f = "user/pwdFind/resendPSmsAckCode";
            k = {
                logonId: a.logonId
            };
            break;
        case "email-loginFind":
            f = "user/pwdFind/resendQEmail";
            k = {
                logonId: a.logonId,
                method: a.emailType,
                email: a.emailAddress
            };
            break;
        case "email-payFind":
            f = "user/pwdFind/resendPEmail";
            k = {
                logonId: a.logonId,
                method: a.emailType,
                email: a.emailAddress
            };
            break;
        case "sms-modifyEmailAcct":
            f = "user/loginName/unlongin/changeEmailResendAckCode";
            k = {
                logonId: a.logonId,
                mobilePhone: a.mobilePhone
            };
            break;
        case "email-modifyEmailAcct":
            f = "user/loginName/unlongin/changeEmailResendEmail";
            k = {
                logonId: a.logonId
            };
            break;
        case "phone-couponValiCode":
            f = "coupon/mobile/resendIvrAckCode";
            k = {
                mobilePhone: a.mobilePhone,
                businessId: a.businessId,
                businessType: a.businessType,
                resultCode: a.resultCode
            };
            break;
        case "sms-couponValiCode":
            f = "coupon/mobile/resendSmsAckCode";
            k = {
                mobilePhone: a.mobilePhone,
                businessId: a.businessId,
                businessType: a.businessType,
                resultCode: a.resultCode
            };
            break;
        case "sms-lifeGetCheckCodeQ":
            f = "life/mobile/getCheckCodeQ";
            k = {
                mobile: a.mobilePhone
            };
            break
        }
        if (f) {
            var n = a.domain && a.domain.indexOf(".alipay.") > -1 ? a.domain: AP.PageVar.app_domain;
            g = new AP.core.api(f, {
                api_url: n,
                method: "POST",
                cache: false,
                format: "jsonp",
                onAPISuccess: function() {}
            },
            this);
            g.call(k)
        }
    };
    this.fireEvent = function(g, f) {
        f === "phone" ? b.setCount(120) : b.setCount(60);
        if (a.beforeCountEvent) if (a.beforeCountEvent.call(b) == false) return false;
        b.countdown(a[f]);
        b.request(f);
        a.noUpdateText || b.updateText(f);
        D.get(a[f] + "-notice") && D.addClass(a[f] + "-notice", "fn-hide")
    };
    this.init = function(g) {
        e = D.get(g.txtId) && D.get(g.txtId).innerHTML || "";
        this.setMobile(g.mobilePhone);
        this.request = g.request || this.request;
        this.initType();
        d.forEach(function(f) {
            D.get(g[f]).disabled = false;
            E.on(g[f], "click", b.fireEvent, f, this);
            if (f === "phone") {
                E.on(g[f], "mouseover",
                function() {
                    D.removeClass(g[f] + "-notice", "fn-hide")
                });
                E.on(g[f], "mouseout",
                function() {
                    D.addClass(g[f] + "-notice", "fn-hide")
                })
            }
            if (f === "sms" || f === "email") {
                b.setCount(60);
                if (!g.auto || g.auto == false) b.countdown(f)
            }
        })
    };
    this.fire = function(g) { ["sms", "phone", "email"].has(g) && b.countdown(g)
    };
    this.restart = function(g, f) {
        this.sec = 60;
        AP.cache.countdown = 60;
        clearTimeout(AP.cache.countTimer);
        d.forEach(function(k) {
            var n = D.get(a[k]);
            n.parentNode.className = b.btnAble;
            n.disabled = false;
            n.value = b.text[k][0]
        });
        b.fireEvent(g, f)
    };
    this.init(a)
};
AP.widget.confirmBox = new AP.Class({
    initialize: function(a) {
        this.widget = a.widget || D.get("deletebox");
        this.confirm = a.confirm || D.getElementsByClassName("confirm", "input", this.widget)[0];
        this.cancel = a.cancel || D.getElementsByClassName("cancel", "input", this.widget)[0];
        this.triggers = a.triggers || D.getElementsByClassName("delete");
        if (!this.triggers.length) this.triggers = [this.triggers];
        this.positionAdjust = a.positionAdjust || [0, 0];
        this.fireType = a.fireType || "click";
        a.preventDefault = a.preventDefault || false;
        if (!a.preventDefault) try {
            this.triggers.forEach(function(d) {
                E.on(d, this.fireType, a.onCall || this.onCall, d, this)
            },
            this)
        } catch(b) {
            E.on(this.triggers, this.fireType, a.onCall || this.onCall, "", this)
        }
        E.on(this.confirm, "click", a.onConfirm || this.onConfirm, this.data || "", this);
        E.on(this.cancel, "click", a.onCancel || this.onCancel, this.data || "", this)
    },
    showElement: function(a, b) {
        b ? D.removeClass(a, "fn-hide") : D.addClass(a, "fn-hide")
    },
    onConfirm: function() {
        this.showElement(this.widget, false);
        this.currentDelete = null
    },
    onCancel: function() {
        this.showElement(this.widget, false);
        this.currentDelete = null
    },
    onCall: function(a, b, d) {
        this.data = d || "";
        this.showElement(this.widget, true);
        D.setXY(this.widget, this.getPosition(b));
        this.currentDelete = b;
        this.cancel.focus();
        E.preventDefault(a)
    },
    getPosition: function(a) {
        return [D.getXY(a)[0] + this.positionAdjust[0], D.getXY(a)[1] + this.positionAdjust[1]]
    },
    addTrigger: function(a) {
        a.forEach(function(b) {
            E.on(b, this.fireType, this.onCall, b, this)
        },
        this)
    }
});
AP.pk.pa.highlight = new AP.Class({
    setOptions: function(a) {
        return AP.hashExtend({
            target: "faq",
            warnClass: "m-warn",
            iconClass: "m-cue",
            duartion: 1,
            scrollPage: true,
            autoShow: true,
            originalColor: "#FFF"
        },
        a || {})
    },
    initialize: function(a) {
        this._options = this.setOptions(a);
        this.icons = D.query("." + this._options.iconClass, D.get(this._options.target));
        this._options.autoShow && this.show()
    },
    show: function() {
        this.animation()
    },
    animation: function() {
        var a = new YAHOO.util.ColorAnim(this._options.target, {
            backgroundColor: {
                to: "#FFFFA4"
            }
        },
        this._options.duartion),
        b = new YAHOO.util.ColorAnim(this._options.target, {
            backgroundColor: {
                to: this._options.originalColor
            }
        },
        this._options.duartion);
        this.changeIcon();
        a.animate();
        a.onComplete.subscribe(function() {
            b.animate()
        });
        var d = this;
        b.onComplete.subscribe(function() {
            d.changeIcon("done")
        },
        d);
        this._options.scrollPage && AP.util.scrollPage(this._options.target, 1)
    },
    changeIcon: function(a) {
        a == "done" ? this.icons.forEach(function(b) {
            D.replaceClass(b, this._options.warnClass, this._options.iconClass)
        },
        this) : this.icons.forEach(function(b) {
            D.replaceClass(b, this._options.iconClass, this._options.warnClass)
        },
        this)
    }
});
AP.pk.pa.searchBox = new AP.Class({
    setOptions: function() {
        return AP.hashExtend({
            textDefaultClass: "i-text-gray",
            textDefaultExplain: "data-explain"
        })
    },
    initialize: function(a, b) {
        this.form = a;
        this.input = D.query("input[type='text']", a)[0];
        this.options = this.setOptions(b);
        this.defaultText = this.input.getAttribute(this.options.textDefaultExplain);
        this.bindEvents()
    },
    bindEvents: function() {
        this.blur();
        E.on(this.input, "focus", this.focus, "", this);
        E.on(this.input, "blur", this.blur, "", this);
        E.on(this.form, "submit",
        function(a) {
            if (this.input.value.trim() == "" || this.input.value.trim() == this.defaultText) E.preventDefault(a)
        },
        {},
        this)
    },
    focus: function() {
        if (this.input.value.trim() == this.defaultText) this.input.value = "";
        D.removeClass(this.input, this.options.textDefaultClass)
    },
    blur: function() {
        if (this.input.value.trim() == "" || this.input.value.trim() == this.defaultText) {
            this.input.value = this.defaultText;
            D.addClass(this.input, this.options.textDefaultClass)
        }
    }
});
AP.widget.popNotice = new AP.Class({
    setOptions: function(a) {
        return AP.hashExtend({
            pop_class: "pop-info",
            pop_id: "J_popContainer",
            message: "no message",
            click: false,
            offset: [0, 0],
            customEvent: false,
            styles: {},
            onshow: function() {},
            onhide: function() {}
        },
        a || {})
    },
    initialize: function(a, b) {
        this.options = this.setOptions(b);
        this.current_el = null;
        if (D.get("J_popContainer")) {
            this.pop = D.get("J_popContainer");
            this.pop_b = D.get("J_popBottom")
        } else {
            this.pop = this.getBuildDom();
            this.pop_b = this.getBuildBottomEl()
        }
        this.bodyBindEvent();
        this.setStyles(this.options.styles);
        a && this.bindEvents(a);
        this.targets = a;
        this.onShowEvent = new U.CustomEvent("onShowEvent");
        this.onHideEvent = new U.CustomEvent("onHideEvent");
        this.onShowEvent.subscribe(this.options.onshow, this, true);
        this.onHideEvent.subscribe(this.options.onhide, this, true)
    },
    bindEvents: function(a) {
        if (!this.options.customEvent) {
            a.forEach(function(b) {
                if (this.options.click) E.on(b, "click", this.show, b, this);
                else {
                    E.on(b, "mouseover", this.show, b, this);
                    E.on(b, "mouseout", this.mouseHiddenEvent, b, this)
                }
            },
            this);
            if (!this.options.click) {
                E.on(this.pop, "mouseout", this.mouseHiddenEvent, "", this);
                E.on(this.pop_b, "mouseout", this.mouseHiddenEvent, "", this)
            }
        }
    },
    mouseHiddenEvent: function(a) {
        try {
            E.getTarget(a);
            var b = E.getRelatedTarget(a);
            if (D.query("*", this.pop).contains(b) || b == this.pop || b == this.current_el || b == this.pop_b) return
        } catch(d) {}
        this.hide()
    },
    setPosition: function(a) {
        var b = D.getRegion(this.pop),
        d = b.bottom - b.top;
        b = b.right - b.left;
        var e = D.getRegion(a);
        a = e.left + this.options.offset[0];
        e = e.top - d - 3;
        D.setStyles(this.pop_b, {
            height: d + 5 + "px",
            width: b + "px"
        });
        D.setXY(this.pop, [a, e]);
        D.setXY(this.pop_b, [a, e])
    },
    show: function(a, b) {
        this.current_el = b;
        if (D.get("J_popContainer") === null) {
            this.pop = this.getBuildDom();
            this.pop_b = this.getBuildBottomEl();
            this.setStyles(this.options.styles)
        }
        D.removeClass(this.pop, "fn-hide");
        D.removeClass(this.pop_b, "fn-hide");
        if (!this.options.click) {
            E.on(this.pop, "mouseout", this.mouseHiddenEvent, "", this);
            E.on(this.pop_b, "mouseout", this.mouseHiddenEvent, "", this)
        }
        this.innerMessage();
        this.setPosition(b);
        this.onShowEvent.fire()
    },
    innerMessage: function() {
        var a = D.query(".pop_extend_txt", this.current_el).length ? D.query(".pop_extend_txt", this.current_el)[0] : D.query(".pop_extend_txt", this.current_el.parentNode)[0];
        a = a ? a.innerHTML: this.options.message;
        D.query(".container", this.pop)[0].innerHTML = a
    },
    bodyBindEvent: function() {
        E.on(document.body, "click",
        function(a) {
            var b = E.getTarget(a),
            d = D.query("*", this.pop),
            e = false;
            d.forEach(function(g) {
                if (g == b) e = true
            });
            b.parentNode == this.pop || b == this.current_el || e || this.hide(a)
        },
        "", this)
    },
    hide: function() {
        if (this.options.click) {
            D.addClass(this.pop, "fn-hide");
            D.addClass(this.pop_b, "fn-hide")
        } else {
            try {
                this.pop.parentNode.removeChild(this.pop)
            } catch(a) {}
            try {
                this.pop_b.parentNode.removeChild(this.pop_b)
            } catch(b) {}
        }
        this.onHideEvent.fire()
    },
    setStyles: function(a) {
        D.setStyles(D.query(".container", this.pop)[0], a)
    },
    getBuildDom: function() {
        var a = '<div class="container"></div><div style="left: 20px;" class="angle"/>';
        a = Element.create("div", {
            innerHTML: a,
            appendTo: document.body,
            id: this.options.pop_id,
            "class": "fn-hide"
        });
        D.addClass(a, this.options.pop_class);
        return a
    },
    getBuildBottomEl: function() {
        var a = Element.create("div", {
            appendTo: document.body,
            id: "J_popBottom",
            "class": "fn-hide"
        });
        D.setStyles(a, {
            position: "absolute",
            "z-index": "488"
        });
        return a
    }
});
AP.widget.seniorPop = AP.widget.popNotice.extend({
    show: function(a, b, d) {
        if (D.get("J_popContainer") === null) {
            this.pop = this.getBuildDom();
            this.pop_b = this.getBuildBottomEl();
            this.setStyles(this.options.styles)
        }
        D.removeClass(this.pop, "fn-hide");
        D.removeClass(this.pop_b, "fn-hide");
        this.current_el = b;
        d = d || {};
        d.hideAngle ? this.hideAngle() : this.showAngle();
        if (!this.options.click) {
            E.on(this.pop, "mouseout", this.mouseHiddenEvent, "", this);
            E.on(this.pop_b, "mouseout", this.mouseHiddenEvent, "", this)
        }
        this.innerMessage();
        this.setPosition(b, d);
        this.onShowEvent.fire()
    },
    hideAngle: function() {
        D.addClass(D.query(".angle", this.pop)[0], "fn-hidden")
    },
    showAngle: function() {
        D.removeClass(D.query(".angle", this.pop)[0], "fn-hidden")
    },
    setPosition: function(a, b) {
        var d = D.getRegion(this.pop);
        a = D.getRegion(a);
        b = b.center ? this.remoteCenter(d) : this.remoteXY(d, a);
        D.setXY(this.pop, b);
        D.setXY(this.pop_b, b)
    },
    remoteCenter: function(a) {
        var b = a.bottom - a.top,
        d = a.right - a.left,
        e = D.getViewportWidth();
        a = D.getViewportHeight();
        d = e / 2 - d / 2;
        b = a / 2 - b / 2;
        return [d, b]
    },
    remoteXY: function(a, b) {
        var d = a.bottom - a.top;
        a = a.right - a.left;
        var e = b.left + this.options.offset[0],
        g = b.top - d - 3;
        this.setStyles(this.options.styles);
        D.removeClass(D.query(".angle", this.pop)[0], "angle-top");
        D.setStyles(D.query(".angle", this.pop)[0], {
            left: "20px",
            right: "auto"
        });
        if (d > b.top - D.getDocumentScrollTop()) {
            g = b.bottom + 10;
            D.addClass(D.query(".angle", this.pop)[0], "angle-top")
        }
        if (e + a > D.getViewportWidth()) {
            D.setStyles(D.query(".angle", this.pop)[0], {
                left: "auto",
                right: "20px"
            });
            e = b.right - a - this.options.offset[0]
        }
        D.setStyles(this.pop_b, {
            height: d + 5 + "px",
            width: a + "px"
        });
        return [e, g]
    }
});
AP.widget.errorXbox = new AP.Class({
    initialize: function(a) {
        this.error_info = a.error_info;
        this.url_info = a.url_info;
        this.xbox = new AP.widget.xBox({
            type: "dom",
            value: "#errorXbox",
            width: 500,
            height: 100
        });
        this.build()
    },
    build: function() {
        this.buildHTML();
        this.xbox.fire();
        this.getElements();
        this.buildClose();
        this.counter()
    },
    getElements: function() {
        this.xbox_container = D.get("errorXbox");
        this.close_el = D.get("J_xbox_colse");
        this.url_container = D.query(".n-explain", this.xbox_container)[0]
    },
    buildClose: function() {
        E.on(this.close_el, "click",
        function(a) {
            AP.widget.xBox.hide();
            E.preventDefault(a)
        },
        "", this)
    },
    counter: function() {
        var a = D.query("a", this.url_container);
        if (!a.length) {
            var b = this,
            d = 10,
            e = function() {
                d -= 1;
                b.close_el.innerHTML = d + "\u79d2\u540e\u81ea\u52a8\u5173\u95ed";
                if (d <= 0) {
                    AP.widget.xBox.hide();
                    d = 10
                }
            };
            setInterval(e, 1E3)
        }
    },
    buildHTML: function() {
        var a = Element.create("div", {
            "class": "fn-hide"
        }),
        b = '<div class="container-xbox" id="errorXbox"><div class="no-title"><a class="xbox-close-link" id="J_xbox_colse" href="#">\u5173\u95ed</a></div><div class="notice n-error-xbox"><h3>{error_info}</h3><p class="n-explain">{url_info}</p></div></div>';
        b = b.replace("{error_info}", this.error_info);
        b = b.replace("{url_info}", this.url_info);
        a.innerHTML = b;
        document.body.appendChild(a)
    }
});
AP.widget.Editable = new AP.Class({
    setOptions: function(a) {
        return AP.hashExtend({
            edit_type: "input",
            edit_target: null,
            class_edit: "",
            class_cannel: "",
            class_focus: "",
            default_txt: "\u70b9\u51fb\u6dfb\u52a0\u5185\u5bb9",
            defalut_show: true
        },
        a || {})
    },
    initialize: function(a, b) {
        this.options = this.setOptions(b);
        this.bindTargetEvents(a);
        this.onSaveButtonClickEvent = new U.CustomEvent("onSaveButtonClickEvent");
        b.saveEvent && this.onSaveButtonClickEvent.subscribe(b.saveEvent, this, true)
    },
    bindTargetEvents: function(a) {
        a.forEach(function(b) {
            if (this.options.defalut_show) {
                b = D.query(".J_editable_target", b.parentNode)[0];
                E.on(b, "click", this.onClickEvent, b, this)
            } else {
                E.on(b, "mouseover", this.onMouseOverEvent, b, this);
                E.on(b, "mouseout", this.onMouseOutEvent, b, this);
                E.on(b, "click", this.onClickEvent, b, this)
            }
        },
        this)
    },
    onMouseOverEvent: function(a, b) {
        if (this.options.edit_target) {
            a = this.getEditTarget(b);
            D.removeClass(a, "fn-hide")
        } else D.addClass(b, this.options.class_focus)
    },
    onMouseOutEvent: function(a, b) {
        if (this.options.edit_target) {
            a = this.getEditTarget(b);
            D.addClass(a, "fn-hide")
        } else D.removeClass(b, this.options.class_focus)
    },
    onClickEvent: function(a, b) {
        this.current_target = b;
        var d = b.parentNode.getAttribute("rel");
        if (this.options.edit_target && D.hasClass(b, "J_editable_target") || !this.options.edit_target) this.showEditable(b);
        D.query("input[type=text]", b.parentNode.parentNode)[0].value = d;
        E.preventDefault(a)
    },
    onSaveEvent: function(a, b) {
        this.onSaveButtonClickEvent.fire(b);
        E.preventDefault(a)
    },
    onCannelEvent: function(a, b) {
        this.hideEditable(b);
        E.preventDefault(a)
    },
    getEditTarget: function(a) {
        var b = D.query(".J_editable_target", a)[0];
        if (!b) {
            b = this.BuildTargetButton();
            a.appendChild(b)
        }
        return b
    },
    getEditableTarget: function(a) {
        var b = a.parentNode.parentNode;
        if (D.hasClass(b, "J_editable")) a = a.parentNode;
        else(a = D.query(".J_editable", b)[0]) || (a = this.BuildEditableDom(b));
        return a
    },
    showEditable: function(a) {
        var b = this.getEditableTarget(a);
        D.removeClass(b, "fn-hide");
        D.addClass(a.parentNode, "fn-hide");
        a = D.query("input[type=text]", b)[0];
        a.select()
    },
    hideEditable: function(a) {
        var b = this.getEditableTarget(a);
        a = D.query(":first", a.parentNode.parentNode);
        D.removeClass(a, "fn-hide");
        D.addClass(b, "fn-hide")
    },
    BuildEditableDom: function(a) {
        var b = Element.create("span", {
            "class": "J_editable fn-hide"
        }),
        d = this.BuildEditInputDom(),
        e = this.BuildSaveButton(),
        g = this.BuildCannelButton();
        AP.widget.formInputStyle.init(d);
        b.appendChild(d);
        b.appendChild(e);
        b.appendChild(g);
        a.appendChild(b);
        return b
    },
    BuildEditInputDom: function() {
        var a = this.options.edit_type;
        return a = Element.create(a, {
            "class": "i-text",
            value: this.current_target.parentNode.getAttribute("rel"),
            type: "text",
            maxlength: "10"
        })
    },
    BuildSaveButton: function() {
        var a = Element.create("input", {
            type: "button",
            value: "\u4fdd\u5b58",
            "class": "btn-2cn"
        });
        E.on(a, "click", this.onSaveEvent, a, this);
        return a
    },
    BuildCannelButton: function() {
        var a = Element.create("a", {
            innerHTML: "\u53d6\u6d88",
            href: "#"
        });
        E.on(a, "click", this.onCannelEvent, a, this);
        return a
    },
    BuildTargetButton: function() {
        var a = Element.create("a", {
            innerHTML: this.options.edit_target,
            "class": "fn-hide J_editable_target",
            href: "#"
        });
        E.on(a, "click", this.onClickEvent, a, this);
        return a
    }
});
AP.widget.reviewCardID = new AP.Class({
    initialize: function(a) {
        this.targets = a;
        E.on(this.targets, "focus", this.focusEvent, "", this);
        E.on(this.targets, "blur", this.blurEvent, "", this);
        E.on(this.targets, "keyup", this.keyupEvent, "", this);
        this.buidDom()
    },
    focusEvent: function(a) {
        a = E.getTarget(a);
        this.createIframe(a);
        this.reviewCardID(a)
    },
    blurEvent: function(a) {
        a = E.getTarget(a);
        a.value = this.getSplitCardID(a.value);
        this.hide()
    },
    keyupEvent: function(a) {
        a = E.getTarget(a);
        this.reviewCardID(a)
    },
    reviewCardID: function(a) {
        if (a.value.trimAll().length) {
            this.numberBox.innerHTML = this.getSplitCardID(a.value);
            this.show(a)
        } else this.hide()
    },
    getSplitCardID: function(a) {
        a = a.trimAll().split("");
        var b = "";
        a.forEach(function(d, e) {
            e += 1;
            b += d;
            if (e % 4 == 0) b += " "
        });
        return b
    },
    setExplain: function() {
        return false
    },
    position: function(a) {
        var b = D.getRegion(this.container);
        a = D.getRegion(a);
        b = a.top - (b.bottom - b.top);
        D.setXY(this.container, [a.left, b])
    },
    createIframe: function(a) {
        if (!D.query("iframe", this.container).length) {
            var b = Element.create("iframe");
            b.src = "javascript:false;";
            var d = D.getRegion(a);
            a = d.right - d.left + "px";
            d = d.bottom - d.top + "px";
            D.setStyle(b, "opacity", "0");
            D.setStyle(b, "width", a);
            D.setStyle(b, "height", d);
            D.setStyle(b, "position", "absolute");
            D.setStyle(b, "top", "-5px");
            D.setStyle(b, "left", "-5px");
            D.setStyle(b, "z-index", "0");
            this.outBox.appendChild(b)
        }
    },
    show: function(a) {
        D.removeClass(this.container, "fn-hide");
        this.position(a)
    },
    hide: function() {
        D.addClass(this.container, "fn-hide")
    },
    buidDom: function() {
        this.numberBox = this.getCreateNumberDom();
        this.explainBox = this.getCreateExplainDom();
        this.outBox = this.getCreateBoxDom();
        this.container = Element.create("div", {
            "class": "bank-card-review fn-hide"
        });
        this.outBox.appendChild(this.numberBox);
        this.container.appendChild(this.outBox);
        D.setStyles(this.container, {
            position: "absolute"
        });
        document.body.appendChild(this.container)
    },
    getCreateBoxDom: function() {
        var a = Element.create("div");
        D.setStyles(a, {
            position: "relative"
        });
        return a
    },
    getCreateNumberDom: function() {
        var a = Element.create("div", {
            "class": "cardid"
        });
        D.setStyle(a, "font-size", "18px");
        D.setStyle(a, "font-family", "tahoma");
        return a
    },
    getCreateExplainDom: function() {
        var a = Element.create("div", {
            "class": "explain-info"
        });
        return a
    }
});
AP.widget.formInputStyle = function() {
    var a = function(b) {
        E.on(b, "focus",
        function() {
            D.removeClass(this.parentNode, "fm-hover");
            D.removeClass(this.parentNode, "fm-error");
            D.addClass(this.parentNode, "fm-focus")
        });
        E.on(b, "mouseover",
        function() {
            D.addClass(this.parentNode, "fm-hover")
        });
        E.on(b, "mouseout",
        function() {
            D.removeClass(this.parentNode, "fm-hover")
        });
        E.on(b, "blur",
        function() {
            D.removeClass(this.parentNode, "fm-hover");
            D.removeClass(this.parentNode, "fm-focus")
        })
    };
    return {
        init: function(b) {
            a(b)
        }
    }
} ();
AP.widget.autoFontsize = new AP.Class({
    setOptions: function(a) {
        return AP.hashExtend({
            minSize: 12,
            target: D.query(".aside-amount em")[0],
            maxWidth: 106
        },
        a || {})
    },
    initialize: function(a) {
        this.options = this.setOptions(a);
        this.options.target.constructor == Array ? this.options.target.forEach(function(b) {
            this.resize(b)
        },
        this) : this.resize(this.options.target)
    },
    resize: function(a) {
        for (var b = parseInt(D.getStyle(a, "fontSize")); a.offsetWidth > this.options.maxWidth;) if (--b < this.options.minSize) break;
        else D.setStyle(a, "fontSize", b + "px");
        this.resizeComplete()
    },
    resizeComplete: function() {}
});
AP.pk.pa.asidePortrait = function() {
    function a(r) {
        return AP.hashExtend({
            my: D.get("J_portrait"),
            container: D.get("J_aside_portraits"),
            pointer: {},
            ul: D.query("ul", D.get("J_aside_portraits"))[0],
            timer: {},
            curUserPicClass: "J_portrait"
        },
        r || {})
    }
    function b() {
        p.pointer = Element.create("span", {
            "class": "ico-angleR",
            title: "\u5c55\u5f00",
            appendTo: p.container
        })
    }
    function d() {
        D.removeClass(p.container, "fn-hide");
        p.ul.className = "hover";
        p.pointer.className = "ico-angleR";
        p.pointer.title = "\u5c55\u5f00"
    }
    function e() {
        D.removeClass(p.container, "fn-hide");
        p.ul.className = "expand";
        p.pointer.className = "ico-angleL";
        p.pointer.title = "\u5173\u95ed";
        typeof Tracker != "undefined" && Tracker.click("aside-portrait-expand")
    }
    function g(r) {
        if (p.ul.className == "hover" || r == true) D.addClass(p.container, "fn-hide")
    }
    function f() {
        E.on(p.my, "mouseover", d);
        E.on([p.pointer, D.query("li", p.ul)], "click",
        function(r) {
            p.pointer.className == "ico-angleR" ? e() : g(true);
            E.stopEvent(r)
        });
        E.on(document.body, "click",
        function() {
            p.pointer.className == "ico-angleL" && g(true)
        });
        E.on([p.ul, p.pointer], "mouseout",
        function() {
            p.timer = setTimeout(g, 100)
        });
        E.on([p.ul, p.pointer], "mouseover",
        function() {
            clearTimeout(p.timer)
        });
        D.query("li", p.ul).length > 2 && E.on(D.query("li", p.ul)[1], "click", k, {
            type: "old"
        })
    }
    function k(r, s) {
        var v = D.get("J_aside_acctname").getAttribute("data-host");
        v = new AP.core.api("user/modiPortraitUrl", {
            onAPISuccess: n,
            api_url: v,
            method: "POST",
            format: "jsonp"
        });
        v.call({
            type: s.type
        });
        p.my.src = D.query("img", D.query("li", p.ul)[1])[0].src;
        E.preventDefault(r)
    }
    function n(r, s) {
        r = D.query("img", p.ul);
        r[0].src = AP.fn.url.img + "/" + s[0].cur;
        log(r[0].width, r[0].height);
        if (s[0].old) if (D.query("li", p.ul).length == 2) {
            r = document.createElement("li");
            r.innerHTML = '<a href="#"><img height="54" width="54" alt="\u4e0a\u6b21\u5934\u50cf" src="' + AP.fn.url.img + "/" + s[0].old + '" /></a>';
            D.insertAfter(r, D.query("li", p.ul)[0]);
            E.on(r, "click", k, {
                type: "old"
            })
        } else r[1].src = AP.fn.url.img + "/" + s[0].old;
        else D.query("li", p.ul).length == 3 && p.ul.removeChild(D.query("li", p.ul)[1]);
        p.my.src = AP.fn.url.img + "/" + s[0].cur;
        D.query("img." + p.curUserPicClass, D.get("container")).forEach(function(v) {
            v.src = AP.fn.url.img + "/" + s[0].cur
        })
    }
    function t() {
        var r = D.get("J_aside_acctname").getAttribute("data-host");
        r = new AP.core.api("user/getPortraitUrl", {
            onAPISuccess: n,
            api_url: r,
            method: "POST",
            format: "jsonp"
        });
        r.call({
            get: "all"
        })
    }
    var p;
    return {
        init: function(r) {
            p = a(r);
            if (p.my) if (p.container) {
                b();
                f()
            }
        },
        renew: function() {
            t()
        }
    }
} ();
AP.pk.pa.remindScene = function() {
    var a = {
        listContainer: "J_asidemlist",
        totalNum: 0,
        canDelTotalNum: 0,
        totalPages: 1,
        currentPage: 1,
        onePage: 10,
        pre: {},
        next: {}
    },
    b,
    d,
    e,
    g,
    f,
    k,
    n = function(h) {
        var l = D.query("a", h)[0],
        q = D.query(".ico-del-aside", h)[0];
        E.on(h, "mouseover",
        function(u, x) {
            D.addClass(x, "hover")
        },
        h);
        E.on(h, "mouseout",
        function(u, x) {
            D.removeClass(x, "hover")
        },
        h);
        E.on(q, "click", t, h);
        l.type == "REMIND" && E.on(l, "click", t, h)
    },
    t = function(h, l) {
        var q = D.query(".ico-del-aside", l)[0].href.toQueryParams().delId,
        u = D.get("J_aside_acctname") ? D.get("J_aside_acctname").getAttribute("data-host") : AP.PageVar.app_domain;
        try {
            var x = new AP.core.api("home/statusbar/deleteRemindScene", {
                onAPISuccess: function(B, z) {
                    p(z, l)
                },
                api_url: u,
                method: "POST",
                format: "jsonp"
            });
            x.call({
                id: q
            })
        } catch(A) {
            log(A)
        }
        E.getTarget(h).type || E.stopEvent(h)
    },
    p = function(h, l) {
        r(l)
    },
    r = function(h) {
        var l = {
            height: {
                to: 0
            },
            opacity: {
                to: 0
            }
        };
        AP.fn.browser.msie && (l = {
            opacity: {
                to: 0
            }
        });
        l = new YAHOO.util.Anim(h, l, 0.3);
        l.animate();
        l.onComplete.subscribe(function() {
            s(h)
        })
    },
    s = function(h) {
        a.canDelTotalNum--;
        a.totalNum--;
        a.totalNum == 0 && v();
        log(a.totalNum, b.length);
        if (a.totalPages > 1) {
            var l = b.indexOf(h.parentNode.lastChild);
            l < a.totalNum && h.parentNode.appendChild(b[l + 1])
        }
        o();
        b.remove(h);
        h.parentNode.removeChild(h)
    },
    v = function() {
        D.addClass(D.query(".aside-main", D.get("aside"))[0], "aside-notice-hide")
    },
    w = function() {
        e = D.query("ul", D.get(a.listContainer))[0];
        D.addClass(e, "fn-hide");
        var h = D.query(".aside-page a", D.get("aside"));
        a.pre = h[0];
        a.next = h[1];
        E.on(a.pre, "click",
        function(l) {
            j(a.currentPage - 1);
            E.preventDefault(l)
        });
        E.on(a.next, "click",
        function(l) {
            j(a.currentPage + 1);
            E.preventDefault(l)
        });
        D.removeClass(a.next, "fn-hide");
        f = document.createElement("ul");
        k = document.createElement("ul");
        g = Element.create("div", {
            style: {
                width: "500px"
            },
            appendTo: D.get(a.listContainer)
        });
        b.forEach(function(l, q) {
            q < a.onePage && f.appendChild(l)
        });
        g.appendChild(f);
        g.appendChild(k)
    },
    j = function(h) {
        if (h > a.currentPage) {
            D.query("li", k).forEach(function(l) {
                e.appendChild(l)
            });
            b.forEach(function(l, q) {
                parseInt(q / a.onePage) == h - 1 && k.appendChild(l)
            });
            m("next")
        }
        if (h < a.currentPage) {
            D.query("li", f).forEach(function(l) {
                e.appendChild(l)
            });
            b.forEach(function(l, q) {
                parseInt(q / a.onePage) == h - 1 && f.appendChild(l)
            });
            m("pre")
        }
        a.currentPage = h
    },
    m = function(h) {
        h = h == "next" ? {
            marginLeft: {
                from: 0,
                to: -222
            }
        }: {
            marginLeft: {
                from: -222,
                to: 0
            }
        };
        h = new YAHOO.util.Anim(g, h, 0.3, YAHOO.util.Easing.easeOut);
        h.animate();
        h.onComplete.subscribe(function() {
            o()
        })
    },
    o = function() {
        a.totalPages = Math.ceil(a.totalNum / a.onePage);
        if (a.totalPages == 1 && a.currentPage < a.totalPages + 1) {
            D.removeClass(D.get(a.listContainer), "maxheight");
            D.addClass([a.pre, a.next], "fn-hide")
        } else if (a.currentPage == 1) {
            D.addClass(a.pre, "fn-hide");
            D.removeClass(a.next, "fn-hide")
        } else if (a.currentPage > a.totalPages - 1) {
            D.addClass(a.next, "fn-hide");
            D.removeClass(a.pre, "fn-hide")
        } else {
            D.removeClass(a.pre, "fn-hide");
            D.removeClass(a.next, "fn-hide")
        }
        D.get("J_aside_current_page").innerHTML = a.currentPage;
        D.get("J_aside_total_page").innerHTML = a.totalPages
    };
    return {
        init: function(h) {
            AP.fn.apply(a, h);
            if (D.get(a.listContainer)) {
                b = D.query("li", D.get(a.listContainer));
                d = D.query("a.ico-del-aside", D.get(a.listContainer));
                a.canDelTotalNum = d.length;
                a.totalNum = b.length;
                a.totalPages = Math.ceil(a.totalNum / a.onePage);
                D.get("J_aside_total_page").innerHTML = a.totalPages;
                b.forEach(function(l) {
                    n(l)
                });
                a.totalPages > 1 && w()
            }
        },
        gotoPage: function(h) {
            j(h)
        }
    }
} ();
AP.pk.pa.switchAcct = AP.widget.dropDown.extend({
    initialize: function(a, b) {
        this.parent(a, b);
        this.acctListsDone = false
    },
    getAcctListsDone: function() {
        new AP.widget.xBox({
            el: D.query(".aside-accounts li:not(.selected)"),
            type: "iframe",
            value: function(a) {
                return a.firstChild.href + "&goto=" + parent.location.href
            },
            width: 400,
            height: 224,
            modal: true,
            hasHead: false,
            fixed: false,
            autoFitPosition: false
        });
        this.acctListsDone = true
    },
    getAcctLists: function(a) {
        var b = this,
        d = D.get("J_aside_acctname") ? D.get("J_aside_acctname").getAttribute("data-host") : AP.PageVar.app_domain;
        d = new AP.core.api("home/statusbar/getRelativeAccounts", {
            onAPISuccess: function(e, g) {
                if (g[0].stat == "ok") {
                    e = g[0].accts;
                    g = D.query("li a", a)[0].href;
                    for (var f = 0; f < e.length; f++) a.innerHTML += '<li><a title="' + e[f] + '" href="' + g + e[f] + '">' + AP.util.handleLongEmail(e[f]) + "</a></li>";
                    D.query("li", a).length > 10 && D.addClass(a, "maxheight");
                    E.on(D.query("li", a)[0], "click",
                    function(k) {
                        E.preventDefault(k)
                    });
                    E.on(D.query("li", a), "click",
                    function() {
                        D.addClass(a, "fn-hide")
                    });
                    b.getAcctListsDone()
                }
            },
            api_url: d,
            method: "POST",
            format: "jsonp"
        });
        d.call()
    },
    bindEvents: function(a, b) {
        this.parent(a, b);
        E.on(a, "click",
        function() {
            this.acctListsDone || this.getAcctLists(b);
            typeof Tracker != "undefined" && Tracker.click("aside-switchaccount")
        },
        b, this)
    }
});
AP.pk.pa.asideAmountFontsize = AP.widget.autoFontsize.extend({
    resizeComplete: function() {
        D.removeClass(D.query(".aside-amount", D.get("aside"))[0], "fn-hidden")
    }
});
AP.pk.pa.aside = {
    initialize: function() {
        if (this.aside = D.get("aside")) {
            if (D.query(".aside-bar", D.get("aside"))[0]) {
                this.asideBar = D.query(".aside-bar", D.get("aside"))[0];
                this.bindEvents();
                var a = D.query("dt", this.asideBar)[0];
                if (!AP.fn.browser.msie || a.innerHTML == "") a.innerHTML = "\u67e5\u770b\u8d26\u6237\u4fe1\u606f";
                D.removeClass(a, "fn-hide");
                this.stat = 0;
                this.asideRegion = D.getRegion(this.aside);
                this.pwSwitch("hide");
                this.asyncLoading = false
            }
            this.loadAsideContainer();
            this.asideContainer.length > 1 && this.initComponents()
        }
    },
    sendTrack: function(a) {
        typeof Tracker != "undefined" && Tracker.click(a)
    },
    loadAsideContainer: function() {
        this.asideContainer = D.query("#aside>div", D.get("content")).concat(D.query("#aside>iframe", D.get("content")))
    },
    endAsynLoading: function() {
        this.asyncLoading = false
    },
    asyncLoad: function() {
        this.asyncLoading = true;
        var a = this;
        YAHOO.util.Connect.asyncRequest("GET", "/tile/service/home:aside.tile?isExpandAside=true&referPage=" + location.href + "&r=" + +new Date, {
            success: function(b) {
                b = b.responseText;
                b = b.replace(/\r\n/gi, "");
                b = b.replace(/\n/gi, "");
                var d, e = b.indexOf("iframe") > -1 ? false: true;
                d = e ? /(<div class=\"aside-info\".*)<\/div><div class=\"aside-widget/gi: /(<iframe.*<\/iframe>)/gi;
                if (d = d.exec(b)) {
                    var g = document.createElement("div");
                    g.className = "J-asyncload " + (e ? "aside-main": "") + (b.indexOf("aside-notice-hide") > -1 ? " aside-notice-hide": "");
                    g.innerHTML = d[1];
                    D.insertBefore(g, a.asideBar);
                    a.loadAsideContainer();
                    a.initComponents();
                    a.expandAnim()
                }
                a.endAsynLoading()
            }
        })
    },
    bindEvents: function() {
        E.on(this.asideBar, "click",
        function() {
            D.query(".aside-main", D.get("aside")).length || D.query(".J-asyncload", D.get("aside")).length || this.asyncLoading ? this.expandAnim() : this.asyncLoad()
        },
        {},
        this);
        E.on(document.body, "click",
        function(a) {
            if (this.stat == 1 && this.checkFoldable(a)) {
                this.pwSwitch("hide");
                this.foldAnim()
            }
        },
        {},
        this)
    },
    foldAnim: function() {
        var a = {
            width: {
                form: 235,
                to: 30
            }
        };
        a = new YAHOO.util.Anim("aside", a, 0.3, YAHOO.util.Easing.easeIn);
        a.animate();
        var b = this;
        a.onComplete.subscribe(function() {
            b.asideContainer.forEach(function(d) {
                d == b.asideBar ? D.removeClass(d, "fn-hide") : D.addClass(d, "fn-hide")
            },
            b);
            b.stat = 0
        },
        b)
    },
    expandAnim: function() {
        this.asideContainer.forEach(function(d) {
            d == this.asideBar ? D.addClass(d, "fn-hide") : D.removeClass(d, "fn-hide")
        },
        this);
        if (AP.fn.browser.msie6 && this.aside.innerHTML.indexOf("<IFRAME") == -1) {
            var a = document.createElement("div");
            a.className = "aside-layer-bg";
            a.innerHTML = '<iframe src="javascript:\'\'" scrolling="no" height="900" frameborder="0"></iframe>';
            this.aside.appendChild(a)
        }
        a = {
            width: {
                form: 0,
                to: 235
            }
        };
        a = new YAHOO.util.Anim("aside", a, 0.3, YAHOO.util.Easing.easeOut);
        a.animate();
        var b = this;
        a.onComplete.subscribe(function() {
            b.stat = 1;
            b.pwSwitch("show");
            if (!b.autoFontsizeDone) b.autoFontsizeDone = new AP.pk.pa.asideAmountFontsize
        },
        b);
        this.sendTrack("aside-expand")
    },
    checkFoldable: function(a) {
        return ! AP.fn.eInRegion(D.getRegion(this.aside), a) && !AP.fn.eInRegion(D.getRegion("J_mypop"), a)
    },
    pwSwitch: function(a) {
        if (window.asideLoginIframe) try {
            if (a == "hide") {
                D.addClass(window.asideLoginIframe.document.getElementsByTagName("embed")[0], "fn-hide");
                D.addClass(window.asideLoginIframe.document.getElementsByTagName("object")[0], "fn-hide")
            } else {
                D.removeClass(window.asideLoginIframe.document.getElementsByTagName("object")[0], "fn-hide");
                D.removeClass(window.asideLoginIframe.document.getElementsByTagName("embed")[0], "fn-hide")
            }
        } catch(b) {
            log(b)
        }
    },
    initComponents: function() {
        AP.pk.pa.remindScene.init();
        var a = D.query(".aside-status li", D.get("aside"));
        D.query(".ico-coupon", D.get("aside")).length && a.push(D.query(".ico-coupon", D.get("aside"))[0]);
        var b = this;
        new AP.widget.seniorPop(a, {
            offset: [ - 16, 0],
            onshow: function() {
                b.sendTrack("aside-" + this.current_el.className.substring(8))
            }
        });
        D.hasClass(D.query(".aside-amount", D.get("aside"))[0], "fn-hidden") && new AP.pk.pa.asideAmountFontsize;
        AP.pk.pa.asidePortrait.init();
        if (D.hasClass("J_aside_acctname", "multi")) {
            new AP.pk.pa.switchAcct(D.query("#J_aside_acctname"));
            D.get("J_aside_acctname").title = "\u5207\u6362\u767b\u5f55\u8d26\u6237"
        }
        new AP.widget.xBox({
            el: D.query(".aside-portraits li:contains('\u4e0a\u4f20') a", D.get("aside"))[0],
            type: "iframe",
            value: function(d) {
                return d.href
            },
            modal: true,
            fixed: false
        });
        D.query("#aside .aside-widget a").forEach(function(d) {
            if (d.href.indexOf("uisrc=") == -1) d.href += "&uisrc=aside";
            d.href += "&ref=" + location.href
        })
    }
};
AP.PageVar = AP.PageVar || {};
if (!AP.PageVar.reset_domain) try {
    var _ADOMAIN = document.domain.split("."),
    _SDOMAIN = _ADOMAIN[_ADOMAIN.length - 2] + "." + _ADOMAIN[_ADOMAIN.length - 1];
    document.domain = _SDOMAIN
} catch(e$$115) {}
E.onDOMReady(function() {
    function a() {
        var n = D.getViewportHeight(),
        t = D.get("container").offsetHeight,
        p = D.getY("content");
        if (t < n + p) D.get("container").style.height = n + p + "px";
        window.scroll(0, p)
    }
    if ((D.get("viewFaq") || D.get("view-faq")) && D.get("faq")) {
        AP.widget.highligthFaq = new AP.pk.pa.highlight({
            autoShow: false
        });
        E.on(["viewFaq", "view-faq"], "click",
        function(n) {
            AP.widget.highligthFaq.show();
            E.preventDefault(n)
        })
    }
    try {
        AP.util.inputHack()
    } catch(b) {}
    try {
        AP.pk.pa.aside.initialize()
    } catch(d) {
        log(d)
    }
    D.get("faqsearch") && new AP.pk.pa.searchBox(D.get("faqsearch"));
    D.get("asidesearch") && new AP.pk.pa.searchBox(D.get("asidesearch"));
    D.get("error404search") && new AP.pk.pa.searchBox(D.get("error404search"));
    if (D.query(".J-scroll-to-title").length > 0 || D.query(".aside-bar", D.get("aside")).length > 0 && D.query(".title a.cancel", D.get("main")).length > 0) a();
    E.on(D.query(".J-scroll-to-top"), "click",
    function(n) {
        a();
        E.preventDefault(n)
    });
    D.query(".J-scroll-to-top", D.get("faq")).length > 0 && D.getDocumentHeight() == D.getViewportHeight() && D.addClass(D.query(".J-scroll-to-top", D.get("faq"))[0], "fn-hide");
    E.on(D.query(".title a.return", D.get("content"))[0], "click",
    function(n) {
        if (E.getTarget(n).href == "" || E.getTarget(n).href == window.location.href || E.getTarget(n).href == window.location.href + "#") {
            history.go( - 1);
            E.preventDefault(n)
        }
    });
    var e = history.length + (AP.fn.browser.msie ? 1 : 0);
    e == 1 && D.query(".title a.action", D.get("content")).length > 0 && location.href.indexOf("_xbox") == -1 && D.addClass(D.query(".title a.action", D.get("content"))[0], "fn-hide");
    D.hasClass(document.body, "xbox") && self.parent === self && D.query(".xbox-close-link").length && D.addClass(D.query(".xbox-close-link")[0], "fn-hide");
    try { (function() {
            var n = D.query("input:text").concat(D.query("textarea")),
            t = n.length;
            if (! (t < 1)) for (var p = 0; p < t; p++) if (n[p].offsetHeight > 0 && D.hasClass(n[p], "J-autofocus") && !D.hasClass(n[p].parentNode, "fm-error")) {
                window.setTimeout(function() {
                    n[p].focus();
                    n[p].select()
                },
                200);
                D.hasClass(n[p].parentNode, "fm-item") && D.addClass(n[p].parentNode, "fm-focus");
                break
            }
        })()
    } catch(g) {}
    AP.widget.scrollToAnchor = function() {
        var n = window.location.href,
        t = /[?|&]anchor=([^&]*)/;
        if (t.test(n)) {
            n = t.exec(n)[1];
            if (D.get(n) || D.get("J_" + n)) {
                n = D.get(n) ? D.get(n) : D.get("J_" + n);
                AP.util.scrollPage(n, 1)
            }
        }
    } ();
    D.get("J-nav-life") && D.get("J-nav-lifeExtend") && new AP.pk.pa.animDropDown(D.query("#J-nav-life"), {
        isposition: true,
        offset: [3, -7],
        mousehandle: true,
        targetClick: function() {
            AP.pk.pa.aside.pwSwitch("hide")
        },
        hideEvent: function() {
            AP.pk.pa.aside.pwSwitch("show")
        }
    });
    E.on("J-nav-life", "click",
    function(n) {
        E.stopEvent(n)
    });
    var f = D.query(".nav-master-life.current", D.get("nav")).length ? D.query(".nav-master", D.get("nav")) : D.query(".nav-master:not(li.nav-master-life)", D.get("nav")),
    k = 0;
    if (f.length) {
        f.forEach(function(n, t) {
            k = D.hasClass(n, "current") ? t: k;
            E.on(n, "mouseover",
            function() {
                for (var p = 0; p < f.length; p++) D.removeClass(f[p], "current");
                D.addClass(n, "current")
            });
            E.on(n, "mouseout",
            function() {
                for (var p = 0; p < f.length; p++) D.removeClass(f[p], "current")
            })
        });
        E.on("nav", "mouseout",
        function() {
            D.addClass(f[k], "current")
        });
        D.addClass(D.query(".nav-master-a", f[k])[0], "nav-master-a-hover")
    }
    new AP.widget.xBox({
        el: D.query(".J-feedback"),
        type: "iframe",
        value: function(n) {
            return n.href
        },
        modal: true,
        fixed: false,
        width: 485
    });
    E.on("J-backTaobao", "click",
    function() {
        window.open(D.get("J-backTaobao").getAttribute("rel"))
    })
});