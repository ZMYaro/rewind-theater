/** How far to seek when rewinding or fast-forwarding */
var SEEK_AMT = 1;

var vid;
var rewInterval;
var fwdInterval;

/**
 * Load the video from the <input>
 * @param e
 */
function loadVideo(e) {
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
function playPause() {
	if(vid.paused) {
		vid.play();
	} else {
		vid.pause();
	}
}

/** Start rewinding */
function startRew() { rewInterval = setInterval(rewind, 100); }
/** Stop rewinding */
function stopRew() { clearInterval(rewInterval); }
/** Rewind the video slightly */
function rewind() { vid.currentTime -= SEEK_AMT; }
/** Start fast-forwarding */
function startFwd() { fwdInterval = setInterval(fastForward, 100); }
/** Stop fast-forwarding */
function stopFwd() { clearInterval(fwdInterval); }
/** Fast-forward the video slightly */
function fastForward() { vid.currentTime += SEEK_AMT; }

window.addEventListener('load', function() {
	vid = document.getElementById('vid');
	document.getElementById('playPauseBtn').addEventListener('click', playPause, false);
	document.getElementById('rewBtn').addEventListener('mousedown', startRew, false);
	document.getElementById('rewBtn').addEventListener('mouseup', stopRew, false);
	document.getElementById('fwdBtn').addEventListener('mousedown', startFwd, false);
	document.getElementById('fwdBtn').addEventListener('mouseup', stopFwd, false);
	document.getElementById('vidUpload').addEventListener('change', loadVideo, false);
}, false);

window.addEventListener('keydown', function(e) {
	switch(e.keyCode) {
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