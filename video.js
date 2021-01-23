/** How far to seek when rewinding or fast-forwarding */
var SEEK_AMT = 1;

var vid,
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
	// If the event clicked something like a button, remove focus from the clicked thing.
	if(e instanceof MouseEvent && e.target && e.target.blur) {
		e.target.blur();
	}
}

/**
 * Load the video from the <input>
 * @param e
 */
function loadVideo(e) {
	stopEvent(e);
	
	if(window.File && window.FileReader && window.FileList && window.Blob) {
		var file = e.target.files[0];
		if(!file || !file.type.match('video.*')) {
			return;
		}
		var reader = new FileReader();
		reader.onload = function(ev) {
			vid.src = ev.target.result;
		};
		reader.readAsDataURL(file);
	} else {
		alert('Please switch to a browser that supports the file APIs such as Google Chrome or Internet Explorer 11.');
	}
}

/** Toggle video play state */
function playPause(e) {
	stopEvent(e);
	
	if(vid.paused) {
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
	
	if(!rewInterval) {
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
	
	if(!fwdInterval) {
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
	playIcon = document.getElementById('playIcon');
	pauseIcon = document.getElementById('pauseIcon');
	document.getElementById('playPauseBtn').addEventListener('click', playPause, false);
	document.getElementById('rewBtn').addEventListener('mousedown', startRew, false);
	document.getElementById('rewBtn').addEventListener('mouseup', stopRew, false);
	document.getElementById('fwdBtn').addEventListener('mousedown', startFwd, false);
	document.getElementById('fwdBtn').addEventListener('mouseup', stopFwd, false);
	document.getElementById('vidUpload').addEventListener('change', loadVideo, false);
	
	document.getElementById('hideToolbarBtn').addEventListener('click', toggleToolbar, false);
}, false);