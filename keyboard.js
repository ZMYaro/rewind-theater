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
		case 33: // PgUp = speed up
			e.preventDefault();
			increaseSpeed();
			break;
		case 34: // PgDn = speed down
			e.preventDefault();
			decreaseSpeed();
			break;
		case 37: // Left = rewind
			e.preventDefault();
			startRew();
			document.getElementById('rew-btn').disabled = true;
			break;
		case 38: // Up = speed up
			e.preventDefault();
			increaseSpeed();
			break;
		case 39: // Right = fast forward
			e.preventDefault();
			startFwd();
			document.getElementById('fwd-btn').disabled = true;
			break;
		case 40: // Down = speed down
			e.preventDefault();
			decreaseSpeed();
			break;
		case 67: // C
			e.preventDefault();
			clearCanvas();
			break;
		case 69: // E
			e.preventDefault();
			setEllipseTool();
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
			setEllipseTool();
			break;
		case 82: // R
			e.preventDefault();
			setRectTool();
			break;
		case 84: // T
			e.preventDefault();
			toggleToolbar();
			break;
		case 112: // F1
			e.preventDefault();
			showInfoSheet();	
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
