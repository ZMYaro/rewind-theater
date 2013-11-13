window.addEventListener('keydown', function(e) {
	switch(e.keyCode) {
		case 32: // space
			playPause(e);
			break;
		case 37: // left
			startRew(e);
			document.getElementById('rewBtn').disabled = true;
			break;
		case 39: // right
			startFwd(e);
			document.getElementById('fwdBtn').disabled = true;
			break;
	}
}, false);
window.addEventListener('keyup', function(e) {
	switch(e.keyCode) {
		case 37: // left
			stopRew(e);
			document.getElementById('rewBtn').disabled = false;
			break;
		case 39: // right
			stopFwd(e);
			document.getElementById('fwdBtn').disabled = false;
			break;
	}
}, false);