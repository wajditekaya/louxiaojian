// JavaScript Document
/*
mix ( r, s, ov, wl )：将 s 对象的成员复制到 对象上。（ov:是否用s中的成员覆盖r中的同名成员。wl:只复制wl中指定的s中的成员到r） 
merge ( arguments：object)：将多个对象的成员合并到一个新对象上。参数中，后面的对象成员会覆盖前面的。 
augment ( r, s, ov, wl )：将 s.prototype 的成员复制到 r.prototype 上。 
extend ( r, s, px, sx )：让函数对象 r 继承函数对象 s.（和Ext.extend几乎一样） 
*/

create: function(html, props, ownerDoc) {
	if (nodeTypeIs(html, 1) || nodeTypeIs(html, 3)) return cloneNode(html);
	if (isKSNode(html)) return cloneNode(html[0]);
	if (!(html = S.trim(html))) return null;

	var ret = null, creators = DOM._creators,
		m, tag = DIV, k, nodes;

	// 简单 tag, 比如 DOM.create('<p>')
	if ((m = RE_SIMPLE_TAG.exec(html))) {
		ret = (ownerDoc || doc).createElement(m[1]);
	}
	// 复杂情况，比如 DOM.create('<img src="sprite.png" />')
	else {
		if ((m = RE_TAG.exec(html)) && (k = m[1]) && S.isFunction(creators[(k = k.toLowerCase())])) {
			tag = k;
		}

		nodes = creators[tag](html, ownerDoc).childNodes;

		if (nodes.length === 1) {
			// return single node, breaking parentNode ref from "fragment"
			ret = nodes[0][PARENT_NODE].removeChild(nodes[0]);
		}
		else {
			// return multiple nodes as a fragment
			ret = nl2frag(nodes, ownerDoc || doc);
		}
	}

	return attachProps(ret, props);
};

add: function(name, fn, config) {
	var self = this, mods = self.Env.mods, mod, o;

	// S.add(name, config) => S.add( { name: config } )
	if (S.isString(name) && !config && S.isPlainObject(fn)) {
		o = { };
		o[name] = fn;
		name = o;
	}

	// S.add( { name: config } )
	if (S.isPlainObject(name)) {
		S.each(name, function(v, k) {
			v.name = k;
			if(mods[k]) mix(v, mods[k], false); // 保留之前添加的配置
		});
		mix(mods, name);
	}
	// S.add(name[, fn[, config]])
	else {
		config = config || { };

		mod = mods[name] || { };
		name = config.host || mod.host || name;
		mod = mods[name] || { };

		// 注意：通过 S.add(name[, fn[, config]]) 注册的代码，无论是页面中的代码，还
		//      是 js 文件里的代码，add 执行时，都意味着该模块已经 LOADED
		mix(mod, { name: name, status: LOADED });
		if(!mod.fns) mod.fns = [];
		fn && mod.fns.push(fn);
		mix((mods[name] = mod), config);

		// 对于 requires 都已 attached 的模块，比如 core 中的模块，直接 attach
		if ((mod['attach'] !== false) && self.__isAttached(mod.requires)) {
			self.__attachMod(mod);
		}
	}

	return self;
};

/*augment ( r, s, ov, wl )：将 s.prototype 的成员复制到 r.prototype 上。*/
augment: function(/*r, s1, s2, ..., ov, wl*/) {
	var args = arguments, len = args.length - 2,
		r = args[0], ov = args[len], wl = args[len + 1],
		i = 1;

	if (!S.isArray(wl)) {
		ov = wl;
		wl = undefined;
		len++;
	}

	if (!S.isBoolean(ov)) {
		ov = undefined;
		len++;
	}

	for (; i < len; i++) {
		mix(r.prototype, args[i].prototype || args[i], ov, wl);
	}

	return r;
}

KISSY.add('node', function(S) {

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

        // handle Node(''), Node(null), or Node(undefined)
        if (!html) {
            self.length = 0;
            return;
        }

        // create from html
        if (S.isString(html)) {
            domNode = DOM.create(html, props, ownerDocument);
            // 将 S.Node('<p>1</p><p>2</p>') 转换为 NodeList
            if(domNode.nodeType === 11) { // fragment
                return new S.NodeList(domNode.childNodes);
            }
        }
        // handle Node
        else if(html instanceof Node) {
            return html;
        }
        // node, document, window 等等，由使用者保证正确性
        else {
            domNode = html;
        }

        self[0] = domNode;
    }

    Node.TYPE = '-ks-Node';

    S.augment(Node, {

        /**
         * 长度为 1
         */
        length: 1,

        /**
         * Retrieves the DOMNode.
         */
        getDOMNode: function() {
            return this[0];
        },

        nodeType: Node.TYPE
    });

    // query api
    S.one = function(selector, context) {
        var elem = S.get(selector, context);
        return elem ? new Node(elem) : null;
    };

    S.Node = Node;
});
/**
 * @module  nodelist
 * @author  lifesinger@gmail.com
 */
KISSY.add('nodelist', function(S) {

    var DOM = S.DOM,
        AP = Array.prototype;

    /**
     * The NodeList class provides a wrapper for manipulating DOM NodeList.
     */
    function NodeList(domNodes) {
        // factory or constructor
        if (!(this instanceof NodeList)) {
            return new NodeList(domNodes);
        }

        // push nodes
        AP.push.apply(this, S.makeArray(domNodes) || []);
    }

    S.mix(NodeList.prototype, {

        /**
         * 默认长度为 0
         */
        length: 0,

        /**
         * Retrieves the Node instance at the given index
         */
        item: function(index) {
            var ret = null;
            if(DOM._isElementNode(this[index])) {
                ret = new S.Node(this[index]);
            }
            return ret;
        },

        /**
         * Retrieves the DOMNodes.
         */
        getDOMNodes: function() {
            return AP.slice.call(this);
        },

        /**
         * Applies the given function to each Node in the NodeList.
         * @param fn The function to apply. It receives 3 arguments: the current node instance, the node's index, and the NodeList instance
         * @param context An optional context to apply the function with Default context is the current Node instance
         */
        each: function(fn, context) {
            var len = this.length, i = 0, node;

            for (node = new S.Node(this[0]);
                 i < len && fn.call(context || node, node, i, this) !== false; node = new S.Node(this[++i])) {
            }

            return this;
        }
    });

    // query api
    S.all = function(selector, context) {
        return new NodeList(S.query(selector, context, true));
    };

    S.NodeList = NodeList;
});



// 将 LiveNodeList 等 array-like 集合转换为普通数组
function slice2Arr(arr) {
	return AP.slice.call(arr);
}
// ie 不支持用 slice 转换 LiveNodeList, 降级到普通方法
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
}

	makeArray: function(o) {
		if (o === null || o === undefined) return [];
		if (S.isArray(o)) return o;

		// The strings and functions also have 'length'
		if (typeof o.length !== 'number' || S.isString(o) || S.isFunction(o)) {
			return [o];
		}

		return slice2Arr(o);
	}
		
each: function(object, fn, context) {
            var key, val, i = 0, length = object.length,
                isObj = length === undefined || S.isFunction(object);
            context = context || win;
            
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
}

KISSY.add('node-attach', function(S, undefined) {

    var DOM = S.DOM, Event = S.Event,
        nodeTypeIs = DOM._nodeTypeIs,
        isKSNode = DOM._isKSNode,
        NP = S.Node.prototype,
        NLP = S.NodeList.prototype,
        GET_DOM_NODE = 'getDOMNode',
        GET_DOM_NODES = GET_DOM_NODE + 's',
        HAS_NAME = 1,
        ONLY_VAL = 2,
        ALWAYS_NODE = 4;

    function normalGetterSetter(isNodeList, args, valIndex, fn) {
        var elems = this[isNodeList ? GET_DOM_NODES : GET_DOM_NODE](),
            args2 = [elems].concat(S.makeArray(args));

        if (args[valIndex] === undefined) {
            return fn.apply(DOM, args2);
        } else {
            fn.apply(DOM, args2);
            return this;
        }
    }

    function attach(methodNames, type) {
        S.each(methodNames, function(methodName) {
            S.each([NP, NLP], function(P, isNodeList) {

                P[methodName] = (function(fn) {
                    switch (type) {
                        // fn(name, value, /* other arguments */): attr, css etc.
                        case HAS_NAME:
                            return function() {
                                return normalGetterSetter.call(this, isNodeList, arguments, 1, fn);
                            };

                        // fn(value, /* other arguments */): text, html, val etc.
                        case ONLY_VAL:
                            return function() {
                                return normalGetterSetter.call(this, isNodeList, arguments, 0, fn);
                            };

                        // parent, next 等返回 Node/NodeList 的方法
                        case ALWAYS_NODE:
                            return function() {
                                var elems = this[isNodeList ? GET_DOM_NODES : GET_DOM_NODE](),
                                    ret = fn.apply(DOM, [elems].concat(S.makeArray(arguments)));
                                return ret ? new S[S.isArray(ret) ? 'NodeList' : 'Node'](ret) : null;
                            };

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

    // dom-data
    attach(['data', 'removeData'], HAS_NAME);

    // dom-class
    attach(['hasClass', 'addClass', 'removeClass', 'replaceClass', 'toggleClass']);

    // dom-attr
    attach(['attr', 'removeAttr'], HAS_NAME);
    attach(['val', 'text'], ONLY_VAL);

    // dom-style
    attach(['css'], HAS_NAME);
    attach(['width', 'height'], ONLY_VAL);

    // dom-offset
    attach(['offset'], ONLY_VAL);
    attach(['scrollIntoView']);

    // dom-traversal
    attach(['parent', 'next', 'prev', 'siblings', 'children'], ALWAYS_NODE);
    attach(['contains']);

    // dom-create
    attach(['html'], ONLY_VAL);
    attach(['remove']);

    // dom-insertion
    S.each(['insertBefore', 'insertAfter'], function(methodName) {
        // 目前只给 Node 添加，不考虑 NodeList（含义太复杂）
        NP[methodName] = function(refNode) {
            DOM[methodName].call(DOM, this[0], refNode);
            return this;
        };
    });
    S.each([NP, NLP], function(P, isNodeList) {
        S.mix(P, {

            /**
             *  Insert content to the end of the node.
             */
            append: function(html) {
                if (html) {
                    S.each(this, function(elem) {
                        var domNode;

                        // 对于 NodeList, 需要 cloneNode, 因此直接调用 create
                        if (isNodeList || S.isString(html)) {
                            domNode = DOM.create(html);
                        } else {
                            if (nodeTypeIs(html, 1) || nodeTypeIs(html, 3)) domNode = html;
                            if (isKSNode(html)) domNode = html[0];
                        }

                        elem.appendChild(domNode);
                    });
                }
                return this;
            },

            /**
             * Insert the element to the end of the parent.
             */
            appendTo: function(parent) {
                if ((parent = S.get(parent)) && parent.appendChild) {
                    S.each(this, function(elem) {
                        parent.appendChild(elem);
                    });
                }
                return this;
            }
        });
    });


    // event-target
    S.each([NP, NLP], function(P) {

        S.mix(P, S.EventTarget);
        P._supportSpecialEvent = true;

        P._addEvent = function(type, handle, capture) {
            for (var i = 0, len = this.length; i < len; i++) {
                Event._simpleAdd(this[i], type, handle, capture);
            }
        };

        P._removeEvent = function(type, handle, capture) {
            for (var i = 0, len = this.length; i < len; i++) {
                Event._simpleRemove(this[i], type, handle, capture);
            }
        };

        delete P.fire;
    });
});
