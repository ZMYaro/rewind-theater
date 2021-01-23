window.addEventListener('keydown', function (e) {
	if (e.ctrlKey || e.altKey || e.metaKey) {
		// Do not override browser/system shortcuts.
		return;
	}
	switch (e.keyCode) {
		case 27: // Esc
			e.preventDefault();
			clearCanvas();
			break;
		case 32: // Space
			e.preventDefault();
			playPause();
			break;
		case 37: // Left
			e.preventDefault();
			startRew();
			document.getElementById('rew-btn').disabled = true;
			break;
		case 39: // Right
			e.preventDefault();
			startFwd();
			document.getElementById('fwd-btn').disabled = true;
			break;
		case 67: // C
			e.preventDefault();
			clearCanvas();
			break;
		case 69: // E
			e.preventDefault();
			tool = 'ellipse';
			break;
		case 74: // J
			e.preventDefault();
			startRew();
			document.getElementById('rew-btn').disabled = true;
			break;
		case 75: // K
			e.preventDefault();
			playPause();
			break;
		case 76: // L
			e.preventDefault();
			startFwd();
			document.getElementById('fwd-btn').disabled = true;
			break;
		case 79: // O
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
window.addEventListener('keyup', function (e) {
	switch (e.keyCode) {
		case 37: // Left
			e.preventDefault();
			stopRew();
			document.getElementById('rew-btn').disabled = false;
			break;
		case 39: // Right
			e.preventDefault();
			stopFwd();
			document.getElementById('fwd-btn').disabled = false;
			break;
		case 74: // J
			e.preventDefault();
			stopRew();
			document.getElementById('rew-btn').disabled = false;
			break;
		case 76: // L
			e.preventDefault();
			stopFwd();
			document.getElementById('fwd-btn').disabled = false;
			break;
	}
}, false);
