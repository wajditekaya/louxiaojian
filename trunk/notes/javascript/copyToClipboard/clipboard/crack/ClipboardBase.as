package 
{
    import flash.display.*;
    import flash.events.*;
    import flash.external.*;
    import flash.system.*;

    public class ClipboardBase extends MovieClip
    {
        private var _highlighterId:String;

        public function ClipboardBase()
        {
            var _loc_1:Object;
            addEventListener(MouseEvent.CLICK, onMouseClick);
            mouseChildren = false;
            useHandCursor = true;
            buttonMode = true;
			//stage.scaleMode = StageScaleMode.NO_SCALE;
            _loc_1 = root.loaderInfo.parameters;
            _highlighterId = _loc_1.highlighterId;
            return;
        }

        private function onMouseClick(param1:MouseEvent) : void
        {
            var $content:Object;
            var e:* = param1;
            $content = executeCommand("get");
            if ($content == null)
            {
                return;
            }// end if
            try
            {
                System.setClipboard($content as String);
                executeCommand("ok");
            }
            catch (e:Error)
            {
                trace(e.message);
                executeCommand("error", e.message + "\n\n" + $content);
            }
            return;
        }

        private function executeCommand(param1:String, param2:String = null) : Object
        {
            if (ExternalInterface.available)
            {
                return ExternalInterface.call("executeCommand", null, null, _highlighterId, "copyToClipboard", {command:param1, message:param2});
            }// end if
            return null;
        }

        private function setState(param1:String) : void
        {
            executeCommand("state_" + param1);
            return;
        }
    }
}
