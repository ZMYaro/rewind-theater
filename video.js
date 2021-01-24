/** How far to seek when rewinding or fast-forwarding */
var SEEK_AMT = 1;

var vid,
	vidUpload,
	playIcon,
	pauseIcon,
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
	if (!file || !file.type.match('video.*')) {
		alert('Please upload a valid video file.');
		return;
	}
	
	vid.src = URL.createObjectURL(file);
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
	
	vid.currentTime -= SEEK_AMT;
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
	
	vid.currentTime += SEEK_AMT;
}

/** Toggles the toolbar's hiddenness */
function toggleToolbar(e) {
	stopEvent(e);
	document.getElementById('toolbar').classList.toggle('hidden');
}

window.addEventListener('load', function() {
	vid = document.getElementById('vid');
	playIcon = document.getElementById('play-icon');
	pauseIcon = document.getElementById('pause-icon');
	vidUpload = document.getElementById('vid-upload');
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
