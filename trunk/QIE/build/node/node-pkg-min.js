QIE.add("node",function(b){var c=b.DOM;function a(f,h,e){var d=this,g;if(!(d instanceof a)){return new a(f,h,e)}g=f;d[0]=g}a.TYPE="-ks-Node";a.prototype.length=1;a.prototype.getDOMNode=function(){return this[0]};a.prototype.nodeType=a.TYPE;b.$=function(e){var d="string"==typeof e?document.getElementById(e):e;return d?new a(d):null};b.Node=a});QIE.add("node-attach",function(d,b){var i=d.DOM,h=d.Node,a=NodeList.prototype,c=h.prototype,e="getDOMNode",f=e+"s";function g(k,j){d.each(k,function(l){d.each([c,a],function(n,m){n[l]=(function(o){switch(j){default:return function(){var p=this[m?f:e](),q=o.apply(i,[p].concat(d.makeArray(arguments)));return q===b?this:q}}})(i[l])})})}d.mix(c,{one:function(j){return d.one(j,this[0])},all:function(j){return d.all(j,this[0])}});g(["hasClass","addClass","removeClass","replaceClass","toggleClass","getStyle","setStyle","on","getObjPos"])});
