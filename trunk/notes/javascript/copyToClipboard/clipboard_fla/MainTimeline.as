package clipboard_fla
{
    import flash.desktop.*;
    import flash.display.*;
    import flash.events.*;
    import flash.external.*;
    import flash.net.*;

    dynamic public class MainTimeline extends MovieClip
    {
        public var imgLoad:Loader;
        public var paramObj:Object;
        public var copyCon:String;
        public var btnURI:String;
        public var imgReq:URLRequest;
        public var sp:MovieClip;

        public function MainTimeline()
        {
            addFrameScript(0, this.frame1);
            return;
        }

        public function copyContent(param1:MouseEvent)
        {
            Clipboard.generalClipboard.setData(ClipboardFormats.TEXT_FORMAT, this.copyCon);
            ExternalInterface.call("copySuccess");
            return;
        }

        public function styleChange(param1:MouseEvent)
        {
            param1.target.alpha = 0.8;
            return;
        }

        function frame1()
        {
            stage.align = StageAlign.TOP_LEFT;
            stage.scaleMode = StageScaleMode.NO_SCALE;
            this.paramObj = LoaderInfo(this.root.loaderInfo).parameters;
            this.copyCon = String(this.paramObj["content"]);
            this.btnURI = String(this.paramObj["uri"]);
            this.imgReq = new URLRequest();
            this.imgLoad = new Loader();
            this.sp = new MovieClip();
            this.imgReq.url = this.btnURI;
            this.imgLoad.load(this.imgReq);
            addChild(this.sp);
            var _loc_1:int;
            this.sp.y = 0;
            this.sp.x = _loc_1;
            this.sp.buttonMode = true;
            this.sp.addChild(this.imgLoad);
            this.sp.addEventListener("mouseOver", this.styleChange);
            this.sp.addEventListener("mouseOut", this.styleBack);
            this.sp.addEventListener("click", this.copyContent);
            return;
        }

        public function styleBack(param1:MouseEvent)
        {
            param1.target.alpha = 1;
            return;
        }
    }
}
