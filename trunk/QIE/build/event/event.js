/**
 * Created by louxiaojian.
 * User: Sean Lou
 * Date: 11-5-8
 * Time: 下午9:24
 * Mail: louxiaojian@gmail.com
 * To change this template use File | Settings | File Templates.
 */
var QIE={}
QIE.event = {
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
};
