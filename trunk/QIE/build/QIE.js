/*
 20101122
 */
;(function(S,undef){
    if (window[S] === undefined) window[S] = {};
    S = window[S];
    S.DOM={};
    S.event={};
    S.Env = S.Env || {};
    S.Env.mods = {}
    var win = S.__HOST || window,
            doc = win['document'],
            docElem = doc.documentElement,
            LOADED = 2,ATTACHED = 4;
    function uncamelize(s, sep) {
        sep = sep || '-';
        return s.replace(/([a-z])([A-Z])/g, function (strMatch, p1, p2){
            return p1 + sep + p2.toLowerCase();
        });
    }
    function camelize(s) {
        return s.replace(/-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
    }
    // Copies all the properties of s to r
    S.mix = function(r, s, ov, wl) {
        if (!s || !r) return r;
        if (ov === undefined) ov = true;
        var i, p, l;

        if (wl && (l = wl.length)) {
            for (i = 0; i < l; i++) {
                p = wl[i];
                if (p in s) {
                    if (ov || !(p in r)) {
                        r[p] = s[p];
                    }
                }
            }
        } else {
            for (p in s) {
                if (ov || !(p in r)) {
                    r[p] = s[p];
                }
            }
        }
        return r;
    };
    S.mix(S,{
        $:function(id) {
            var elem="string" == typeof id ? document.getElementById(id) : id;
            return elem;
        },
        ready:function(fn){
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
                /*					  try{
                 document.documentElement.doScroll('left');
                 } catch (error){
                 setTimeout(arguments.callee, 0);
                 return;
                 };
                 alert('')
                 fn.call(window,self);*/

            }else{
                document.addEventListener('DOMContentLoaded', function(){fn.call(window,self)}, false);
            }
        },
        each:function(object, fn, context) {
            var key, val, i = 0, length = object.length,
                    isObj = length === undef || S.type(object) === 'function';
            context = context || window;

            if (isObj) {
                for (key in object) {
                    if (fn.call(context, object[key], key, object) === false) {
                        break;
                    }
                }
            } else {
                for (val = object[0];
                     i < length && fn.call(context, val, i, object) !== false; val = object[++i]) {
                }
            }

            return object;
        },
        __attachMod: function(mod) {
            var self = this;

            if (mod.fns) {
                S.each(mod.fns, function(fn) {
                    fn && fn(self);
                });
                mod.fns = undef; // 保证 attach 过的方法只执行一次
                //S.log(mod.name + '.status = attached');
            }

            mod.status = ATTACHED;
        },
        __isAttached: function(modNames) {
            var mods = this.Env.mods, mod,
                    i = (modNames = S.makeArray(modNames)).length - 1;

            for (; i >= 0; i--) {
                var name = modNames[i].replace(/\+css/, "");
                mod = mods[name] || {};
                if (mod.status !== ATTACHED) return false;
            }

            return true;
        },
        add: function(name, fn, config) {
            var self = this, mods = self.Env.mods, mod, o;

            // S.add(name, config) => S.add( { name: config } )
            if (S['isString'](name) && !config && S.isPlainObject(fn)) {
                o = {};
                o[name] = fn;
                name = o;
            }

            // S.add( { name: config } )
            if (S.isPlainObject(name)) {
                S.each(name, function(v, k) {
                    v.name = k;
                    if (mods[k]) mix(v, mods[k], false); // 保留之前添加的配置
                });
                S.mix(mods, name);
            }
            // S.add(name[, fn[, config]])
            else {
                config = config || {};

                mod = mods[name] || {};
                name = config.host || mod.host || name;
                mod = mods[name] || {};

                // 注意：通过 S.add(name[, fn[, config]]) 注册的代码，无论是页面中的代码，还
                //      是 js 文件里的代码，add 执行时，都意味着该模块已经 LOADED
                S.mix(mod, { name: name, status: LOADED });

                if (!mod.fns) mod.fns = [];
                fn && mod.fns.push(fn);

                S.mix((mods[name] = mod), config);

                // 对于 requires 都已 attached 的模块，比如 core 中的模块，直接 attach
                if ((mod['attach'] !== false) && self.__isAttached(mod.requires)) {
                    self.__attachMod(mod);
                }
            }

            return self;
        },

        Bind:function(object, fun) {
            var args = Array.prototype.slice.call(arguments).slice(2);
            return function() {
                return fun.apply(object, args);
            }
        },
        getECN:function(node, name, type) {
            var r = [], re = new RegExp("(^|\\s)" + name + "(\\s|$)"), e = (node || document).getElementsByTagName(type || "*");
            for ( var i = 0,len=e.length; i < len; i++ ) {
                if(re.test(e[i].className) )
                    r.push(e[i]);
            }
            return r;
        },
        cleanWhitespace:function(oEelement)
        {
            for(var i=0;i<oEelement.childNodes.length;i++){
                var node=oEelement.childNodes[i];
                if(node.nodeType==3 && !/\S/.test(node.nodeValue)){node.parentNode.removeChild(node)}
            }
        },
        setCookie:function(name,value,days){
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        },
        getCookie:function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        },
        makeArray:function(o) {
            if (o === null || o === undef) return [];
            if (S.isArray(o)) return o;

            // The strings and functions also have 'length'
            if (typeof o.length !== 'number' || S.isString(o) || S.isFunction(o)) {
                return [o];
            }

            return slice2Arr(o);
        },
        Browser:{
            isIE: /msie/.test(window.navigator.userAgent.toLowerCase()),
            isIE6:document.all && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6),
            moz: /gecko/.test(window.navigator.userAgent.toLowerCase()),
            opera: /opera/.test(window.navigator.userAgent.toLowerCase())
        }

    });

    // Converts array-like collection such as LiveNodeList to normal array.
    function slice2Arr(arr) {
        return Array.prototype.slice.call(arr);
    }
    // IE will throw error.
    try {
        slice2Arr(docElem.childNodes);
    }
    catch(e) {
        slice2Arr = function(arr) {
            for (var ret = [], i = arr.length - 1; i >= 0; i--) {
                ret[i] = arr[i];
            }
            return ret;
        }
    };
    S.mix(S.DOM,{
        removeClass:function(elem,c){
            if(!elem || !elem.className) return false;
            if(elem.className.indexOf(c)!=-1) {elem.className=elem.className.replace(c,'');}
        },
        addClass:function(elem,c){
            if(!elem) return false;
            var elemClass = elem.className;
            if (!elemClass) {
                elem.className = c;
            }else{
                if(elem.className.indexOf(c)==-1) elem.className+=' '+c;
            }
        },
        getStyle:function(elem,s){
            var r;
            function camelize(s) {
                return s.replace(/-(\w)/g, function (strMatch, p1){
                    return p1.toUpperCase();
                });
            }
            if(!+'\v1'){
                if(s.indexOf('-')!=-1) s=camelize(s);
                r=elem.currentStyle[s]
            }else{
                r=document.defaultView.getComputedStyle(elem, null).getPropertyValue(s);
            }
            return r
        },
        setStyle:function(elem, styles) {
            for (var property in styles) {
                if(!styles.hasOwnProperty(property)) continue;
                if(property ==='opacity'){
                    elem.style.filter = "alpha(opacity=" + styles[property] * 100 + ")";
                    elem.style.opacity = styles[property];
                }else{
                    if(elem.style.setProperty) {
                        elem.style.setProperty(
                                uncamelize(property,'-'),styles[property],null);
                    } else {
                        elem.style[camelize(property)] = styles[property];
                    }
                }

            }
        },
        getObjPos:function(obj){
            var x = y = 0;
            if (obj.getBoundingClientRect){ //for IE,FF3.0+,Opera9.5+ ,google

                var box = obj.getBoundingClientRect();
                var D = document.documentElement;
                x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;
                y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop;

            } else {    //个别低版本不支持getBoundingClientRect()t的浏览器

                for(; obj != document.body; x += obj.offsetLeft, y += obj.offsetTop, obj = obj.offsetParent );
            }
            return {'x':x, 'y':y,'left':x, 'top':y};
        }
    });
	S.DOM.css=S.DOM.getStyle;
    S.DOM.offset=S.DOM.getObjPos;
	S.DOM.position=S.DOM.getObjPos;
    S.mix(S,S.DOM);
    S.mix(S.event,{
        addEvent:function(node, type, listener ) {
            //if(!(node = S.$(node))) return false;
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
        removeEvent:function(node, type, listener ) {
            //if(!(node = $(node))) return false;
            if (node.removeEventListener) {
                node.removeEventListener( type, listener, false );
                return true;
            } else if (node.detachEvent) {
                // MSIE method
                node.detachEvent( 'on'+type, node[type+listener] );
                node[type+listener] = null;
                return true;
            }
            // Didn't have either so return false
            return false;
        },
        formatEvent:function (oEvent) {
            if (!document.addEventListener) {
                oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
                oEvent.eventPhase = 2;
                oEvent.isChar = (oEvent.charCode > 0);
                oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
                oEvent.pageY = oEvent.clientY + document.body.scrollTop;
                oEvent.preventDefault = function () {
                    this.returnValue = false;
                };

                if (oEvent.type == "mouseout") {
                    oEvent.relatedTarget = oEvent.toElement;
                } else if (oEvent.type == "mouseover") {
                    oEvent.relatedTarget = oEvent.fromElement;
                }

                oEvent.stopPropagation = function () {
                    this.cancelBubble = true;
                };

                oEvent.target = oEvent.srcElement;
                oEvent.time = (new Date).getTime();
            }
            return oEvent;
        },
        getEvent:function() {
            if (window.event) {
                return this.formatEvent(window.event);
            } else {
                return this.getEvent.caller.arguments[0];
            }
        }
    });
    S.event.on=S.event.addEvent;
    S.DOM.on=S.event.addEvent;
	S.mix(S,S.event);
})('QIE');
(function(S, undef) {
    var host = S.__HOST,

            toString = Object.prototype.toString,
            indexOf = Array.prototype.indexOf,
            lastIndexOf = Array.prototype.lastIndexOf,
            filter = Array.prototype.filter,
            trim = String.prototype.trim,

            EMPTY = '',
            CLONE_MARKER = '__~ks_cloned',
            RE_TRIM = /^\s+|\s+$/g,

        // [[Class]] -> type pairs
            class2type = {};
    S.mix(S, {

        /**
         * Determine the internal JavaScript [[Class]] of an object.
         */
        type: function(o) {
            return o == null ?
                    String(o) :
                    class2type[toString.call(o)] || 'object';
        },
        isPlainObject: function(o) {
            return o && toString.call(o) === '[object Object]' && 'isPrototypeOf' in o;
        }
    }
            );

    S.each('Boolean Number String Function Array Date RegExp Object'.split(' '),
            function(name, lc) {
                // populate the class2type map
                class2type['[object ' + name + ']'] = (lc = name.toLowerCase());

                // add isBoolean/isNumber/...
                S['is' + name] = function(o) {
                    return S.type(o) == lc;
                }
            });

})(QIE);
QIE.add('node', function(S) {

    var DOM = S.DOM;
    /**
     * The Node class provides a wrapper for manipulating DOM Node.
     */
    function Node(html, props, ownerDocument) {
        var self = this, domNode;

        // factory or constructor
        if (!(self instanceof Node)) {
            return new Node(html, props, ownerDocument);
        }


        domNode = html;

        self[0] = domNode;
    }

    Node.TYPE = '-ks-Node';

    Node.prototype.length=1;
    Node.prototype.getDOMNode=function() {
        return this[0];
    };
    Node.prototype.nodeType=Node.TYPE;

    // query api
    /*    S.one = function(selector, context) {
     var elem = S.get(selector, context);
     return elem ? new Node(elem) : null;
     };*/

    S.one=function(id) {
        var elem="string" == typeof id ? document.getElementById(id) : id;
        return elem ? new Node(elem) : null;/*返回Node对象而不是原生 的DOM ;*/
    };

    S.Node = Node;
});

QIE.add('nodeList', function(S) {

    var DOM = S.DOM;
    /**
     * The Node class provides a wrapper for manipulating DOM Node.
     */
    function NodeList(html, props, ownerDocument) {
        var self = this, domNode;

        // factory or constructor
        if (!(self instanceof Node)) {
            return new Node(html, props, ownerDocument);
        }


        domNode = html;

        self[0] = domNode;
    }
    S.NodeList = NodeList;
});
/**
 * Notes:
 *
 *  2010.04
 *   - each 方法传给 fn 的 this, 在 jQuery 里指向原生对象，这样可以避免性能问题。
 *     但从用户角度讲，this 的第一直觉是 $(this), kissy 和 yui3 保持一致，牺牲
 *     性能，以易用为首。
 *   - 有了 each 方法，似乎不再需要 import 所有 dom 方法，意义不大。
 *   - dom 是低级 api, node 是中级 api, 这是分层的一个原因。还有一个原因是，如果
 *     直接在 node 里实现 dom 方法，则不大好将 dom 的方法耦合到 nodelist 里。可
 *     以说，技术成本会制约 api 设计。
 */
/**
 * @module  node-attach
 * @author  lifesinger@gmail.com
 */
QIE.add('node-attach', function(S, undefined) {

    var DOM = S.DOM,
            Node = S.Node,
            NodeList = S.NodeList,
            NLP = NodeList.prototype,
            NP = Node.prototype,
            GET_DOM_NODE = 'getDOMNode',
            GET_DOM_NODES = GET_DOM_NODE + 's';


    function attach(methodNames, type) {
        S.each(methodNames, function(methodName) {
            S.each([NP, NLP], function(P, isNodeList) {

                P[methodName] = (function(fn) {

                    switch (type) {

                        default:
                            return function() {
                                // 有非 undefined 返回值时，直接 return 返回值；没返回值时，return this, 以支持链式调用。
                                var elems = this[isNodeList ? GET_DOM_NODES : GET_DOM_NODE](),
                                        ret = fn.apply(DOM, [elems].concat(S.makeArray(arguments)));
                                return ret === undefined ? this : ret;
                            };
                    }

                })(DOM[methodName]);
            });
        });
    }

    // selector
    S.mix(NP, {
        /**
         * Retrieves a node based on the given CSS selector.
         */
        one: function(selector) {
            return S.one(selector, this[0]);
        },

        /**
         * Retrieves a nodeList based on the given CSS selector.
         */
        all: function(selector) {
            return S.all(selector, this[0]);
        }
    });

    // dom-class
    attach(['hasClass', 'addClass', 'removeClass', 'replaceClass', 'toggleClass','getStyle','css','setStyle','on','getObjPos','offset','position']);

});