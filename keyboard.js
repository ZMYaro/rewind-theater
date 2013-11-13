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