var vid,
	vidUpload,
	playIcon,
	pauseIcon,
	speedPicker,
	rewInterval,
	fwdInterval;

/**
 * Stops an event and blurs any clicked button
 * @param {Event} e
 */
function stopEvent(e) {
	if(!e) {
		return;
	}
	e.preventDefault();
	e.stopPropagation();
	// If the event clicked something like a button, remove focus from the clicked thing.
	if (e instanceof MouseEvent && e.target && e.target.blur) {
		e.target.blur();
	}
}

/**
 * Load the video from the <input>
 * @param e
 */
function loadVideo(e) {
	stopEvent(e);
	
	if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
		alert('Please switch to a browser that supports the file APIs, such as Google Chrome.');
		return;
	}
	
	var file = e.target.files[0];
	if (!file) {
		return;
	}
	if (!file.type.match('video.*')) {
		alert('Please upload a valid video file.');
		return;
	}
	
	vid.src = URL.createObjectURL(file);
	document.title = file.name + ' - Rewind Theater';
}

/** Toggle video play state */
function playPause(e) {
	stopEvent(e);
	
	if (vid.paused) {
		vid.play();
		playIcon.style.display = 'none';
		pauseIcon.style.removeProperty('display');
	} else {
		vid.pause();
		pauseIcon.style.display = 'none';
		playIcon.style.removeProperty('display');
	}
}

/** Start rewinding */
function startRew(e) {
	stopEvent(e);
	
	if (!rewInterval) {
		rewInterval = setInterval(rewind, 100);
	}
}
/** Stop rewinding */
function stopRew(e) {
	stopEvent(e);
	
	clearInterval(rewInterval);
	rewInterval = null;
}
/** Rewind the video slightly */
function rewind(e) {
	stopEvent(e);
	
	vid.currentTime -= parseFloat(speedPicker.value);
}
/** Start fast-forwarding */
function startFwd(e) {
	stopEvent(e);
	
	if (!fwdInterval) {
		fwdInterval = setInterval(fastForward, 100);
	}
}
/** Stop fast-forwarding */
function stopFwd(e) {
	stopEvent(e);
	
	clearInterval(fwdInterval);
	fwdInterval = null;
}
/** Fast-forward the video slightly */
function fastForward(e) {
	stopEvent(e);
	
	vid.currentTime += parseFloat(speedPicker.value);
}

/** Toggles the toolbar's hiddenness */
function toggleToolbar(e) {
	stopEvent(e);
	document.getElementById('toolbar').classList.toggle('hidden');
}

/** Set the playback speed to the speed picker setting. */
function setSpeed() {
	vid.playbackRate = speedPicker.value;
}
/** Decrease to the next speed setting down on the picker. */
function decreaseSpeed() {
	if (speedPicker.selectedIndex > 0) {
		speedPicker.selectedIndex--;
		setSpeed();
	}
}
/** Increase to the next speed setting up on the picker. */
function increaseSpeed() {
	if (speedPicker.selectedIndex < speedPicker.options.length - 1) {
		speedPicker.selectedIndex++;
		setSpeed();
	}
}

window.addEventListener('load', function() {
	vid = document.getElementById('vid');
	playIcon = document.getElementById('play-icon');
	pauseIcon = document.getElementById('pause-icon');
	speedPicker = document.getElementById('speed-picker');
	vidUpload = document.getElementById('vid-upload');
	
	speedPicker.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
	speedPicker.addEventListener('input', setSpeed);
	
	document.getElementById('play-pause-btn').addEventListener('click', playPause, false);
	document.getElementById('rew-btn').addEventListener('pointerdown', startRew, false);
	document.getElementById('rew-btn').addEventListener('pointerup',    stopRew, false);
	document.getElementById('rew-btn').addEventListener('pointerleave',  stopRew, false);
	document.getElementById('rew-btn').addEventListener('pointercancel', stopRew, false);
	document.getElementById('fwd-btn').addEventListener('pointerdown', startFwd, false);
	document.getElementById('fwd-btn').addEventListener('pointerup',     stopFwd, false);
	document.getElementById('fwd-btn').addEventListener('pointerleave',  stopFwd, false);
	document.getElementById('fwd-btn').addEventListener('pointercancel', stopFwd, false);
	document.getElementById('hide-toolbar-btn').addEventListener('click', toggleToolbar, false);
	document.getElementById('upload-btn').addEventListener('click', function () {
		vidUpload.click();
	});
	vidUpload.addEventListener('change', loadVideo, false);
}, false);
