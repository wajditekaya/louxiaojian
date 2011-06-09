(function() {
	var els = document.getElementsByTagName('script'),
		srcPath = '';
	for (var i = 0; i < els.length; i++) {
		var src = els[i].src.split(/apps[\\\/]/g);
		if (src[1]) {
			srcPath = src[0];
			break;
		}
	}

	//通过以下update-tag，来解决core与dom不是同时提测的问题
	//update-tag: core/* -
	//update-tag: dom/* tag001


	document.write('<script type="text/javascript" src="' + srcPath + 'core_base.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'module.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'browser.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'string.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'object.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'array.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'hashset.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'date.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'function.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'class.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'helper.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'custevent.js"><\/script>');

	document.write('<script type="text/javascript" src="' + srcPath + 'selector.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'dom.u.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'node.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'node.w.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'event.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'event.w.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'eventtarget.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'jss.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'node.c.js"><\/script>');

	document.write('<script type="text/javascript" src="' + srcPath + 'core_retouch.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'dom_retouch.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'youa_retouch.js"><\/script>');
}());