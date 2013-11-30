window.addEventListener('keydown', function(e) {
	e.preventDefault();
	switch(e.keyCode) {
		case 27: // esc
			clearCanvas();
			break;
		case 32: // space
			playPause();
			break;
		case 37: // left
			startRew();
			document.getElementById('rewBtn').disabled = true;
			break;
		case 39: // right
			startFwd();
			document.getElementById('fwdBtn').disabled = true;
			break;
		case 67: // C
			clearCanvas();
			break;
		case 69: // E
			tool = 'ellipse';
			break;
		case 82: // R
			tool = 'rect';
			break;
		case 84: // T
			toggleToolbar();
			break;
	}
}, false);
window.addEventListener('keyup', function(e) {
	e.preventDefault();
	switch(e.keyCode) {
		case 37: // left
			stopRew();
			document.getElementById('rewBtn').disabled = false;
			break;
		case 39: // right
			stopFwd();
			document.getElementById('fwdBtn').disabled = false;
			break;
	}
}, false);