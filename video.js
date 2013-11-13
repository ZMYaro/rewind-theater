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
function playPause(e) {
	if(e) { e.preventDefault(); }
	if(vid.paused) {
		vid.play();
	} else {
		vid.pause();
	}
}

/** Start rewinding */
function startRew(e) {
	if(e) { e.preventDefault(); }
	if(!rewInterval) {
		rewInterval = setInterval(rewind, 100);
	}
}
/** Stop rewinding */
function stopRew(e) {
	if(e) { e.preventDefault(); }
	clearInterval(rewInterval);
	rewInterval = null;
}
/** Rewind the video slightly */
function rewind(e) {
	if(e) { e.preventDefault(); }
	vid.currentTime -= SEEK_AMT;
}
/** Start fast-forwarding */
function startFwd(e) { 
	if(e) { e.preventDefault(); }
	if(!fwdInterval) {
		fwdInterval = setInterval(fastForward, 100);
	}
}
/** Stop fast-forwarding */
function stopFwd(e) {
	if(e) { e.preventDefault(); }
	clearInterval(fwdInterval);
	fwdInterval = null;
}
/** Fast-forward the video slightly */
function fastForward(e) {
	if(e) { e.preventDefault(); }
	vid.currentTime += SEEK_AMT;
}

window.addEventListener('load', function() {
	vid = document.getElementById('vid');
	document.getElementById('playPauseBtn').addEventListener('click', playPause, false);
	document.getElementById('rewBtn').addEventListener('mousedown', startRew, false);
	document.getElementById('rewBtn').addEventListener('mouseup', stopRew, false);
	document.getElementById('fwdBtn').addEventListener('mousedown', startFwd, false);
	document.getElementById('fwdBtn').addEventListener('mouseup', stopFwd, false);
	document.getElementById('vidUpload').addEventListener('change', loadVideo, false);
	
	document.getElementById('hideToolbarBtn').addEventListener('click', function(e) {
		e.preventDefault();
		e.target.blur();
		document.getElementById('toolbar').classList.toggle('hidden');
	}, false);
}, false);