/*
 *	Copyright (c) QWrap.
 *	version: $version$ $release$ released
 *  description: anim
*/

(function() {
	var els = document.getElementsByTagName('script'),
		srcPath = '';
	for (var i = 0; i < els.length; i++) {
		var src = els[i].src.split(/[\\\/]wagang[\\\/]/g);
		if (src[1]) {
			srcPath = src[0] + '/';
			break;
		}
	}

	document.write('<script type="text/javascript" src="' + srcPath + 'anim_base.js"></script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'elanim.js"></script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'easing.js"></script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'anim_retouch.js"></script>');
}());