/**
 * Created by louxiaojian.
 * User: Sean Lou
 * Date: 11-10-03
 * Time: 下午12:37
 * Mail: louxiaojian@gmail.com
 * To change this template use File | Settings | File Templates.
 */
(function(S){
    /*===iframeLoad===*/
    var iframeLoad=function(frame,callback){
        var _this=this;
        if (!(_this instanceof iframeLoad)) {
            return new iframeLoad(frame,callback);
        }
        this.frame = frame;
        this.setIframeHeight=function(){
            this.newHeight=this.frame.Document ? (this.frame.Document.body.scrollHeight+"px") : (this.frame.contentDocument.documentElement.offsetHeight+"px");
            this.iframeTitle=this.frame.Document ? this.frame.Document.title : this.frame.contentDocument.title;
            //alert(this.frame.contentWindow.name)
            //alert(this.frame.contentDocument.documentElement.scrollHeight)
        }
        if (this.frame.attachEvent){
            this.frame.attachEvent("onload", function(){
                _this.setIframeHeight();callback.call(_this)
            });
        } else {
            this.frame.onload = function(){
                _this.setIframeHeight();callback.call(_this)
            };
        }

    }
    /*===/iframeLoad===*/
    S.iframeLoad=iframeLoad;
})(QIE)