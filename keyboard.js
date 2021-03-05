window.addEventListener('keydown', function (e) {
	if (e.ctrlKey || e.altKey || e.metaKey) {
		// Do not override browser/system shortcuts.
		return;
	}
	switch (e.keyCode) {
		case 27: // Esc =
		case 67: // C = clear annotations
			e.preventDefault();
			clearCanvas();
			break;
		case 32: // Space =
		case 75: // K = play/pause
			e.preventDefault();
			playPause();
			break;
		case 33: // PgUp =
		case 38: // Up = speed up
			e.preventDefault();
			increaseSpeed();
			break;
		case 34: // PgDn =
		case 40: // Down = speed down
			e.preventDefault();
			decreaseSpeed();
			break;
		case 37: // Left =
		case 74: // J = rewind
			e.preventDefault();
			startRew();
			document.getElementById('rew-btn').disabled = true;
			break;
		case 39: // Right =
		case 76: // L = fast forward
			e.preventDefault();
			startFwd();
			document.getElementById('fwd-btn').disabled = true;
			break;
		case 69: // E =
		case 79: // O = ellipse (oval) tool
			e.preventDefault();
			setEllipseTool();
			break;
		case 82: // R = rectangle tool
			e.preventDefault();
			setRectTool();
			break;
		case 84: // T = toggle toolbar
			e.preventDefault();
			toggleToolbar();
			break;
		case 112: // F1 = show info. sheet
			e.preventDefault();
			showInfoSheet();	
			break;
	}
}, false);
window.addEventListener('keyup', function (e) {
	switch (e.keyCode) {
		case 37: // Left
		case 74: // J
			e.preventDefault();
			stopRew();
			document.getElementById('rew-btn').disabled = false;
			break;
		case 39: // Right
		case 76: // L
			e.preventDefault();
			stopFwd();
			document.getElementById('fwd-btn').disabled = false;
			break;
	}
}, false);
