/*
Copyright 2011, KISSY UI Library v1.1.8dev
MIT Licensed
build time: ${build.time}
*/
/**
 * @module  node
 * @author  lifesinger@gmail.com
 */

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

	S.$=function(id) {
		var elem="string" == typeof id ? document.getElementById(id) : id;
		return elem ? new Node(elem) : null;
	};
	
    S.Node = Node;
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
    attach(['hasClass', 'addClass', 'removeClass', 'replaceClass', 'toggleClass','cssValue','on','getObjPos']);

});
