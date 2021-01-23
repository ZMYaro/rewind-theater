window.addEventListener('keydown', function(e) {
	if (e.ctrlKey || e.altKey || e.metaKey) {
		// Do not override browser/system shortcuts.
		return;
	}
	switch(e.keyCode) {
		case 27: // esc
			e.preventDefault();
			clearCanvas();
			break;
		case 32: // space
			e.preventDefault();
			playPause();
			break;
		case 37: // left
			e.preventDefault();
			startRew();
			document.getElementById('rewBtn').disabled = true;
			break;
		case 39: // right
			e.preventDefault();
			startFwd();
			document.getElementById('fwdBtn').disabled = true;
			break;
		case 67: // C
			e.preventDefault();
			clearCanvas();
			break;
		case 69: // E
			e.preventDefault();
			tool = 'ellipse';
			break;
		case 82: // R
			e.preventDefault();
			tool = 'rect';
			break;
		case 84: // T
			e.preventDefault();
			toggleToolbar();
			break;
	}
}, false);
window.addEventListener('keyup', function(e) {
	switch(e.keyCode) {
		case 37: // left
			e.preventDefault();
			stopRew();
			document.getElementById('rewBtn').disabled = false;
			break;
		case 39: // right
			e.preventDefault();
			stopFwd();
			document.getElementById('fwdBtn').disabled = false;
			break;
	}
}, false);