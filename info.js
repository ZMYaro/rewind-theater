var infoSheet;

function showInfoSheet(ev) {
	stopEvent(ev);
	
	if (location.hash !== '#about') {
		location.hash = '#about';
		return;
	}
	stopDraw(ev);
	infoSheet.classList.remove('hidden');
}

function hideInfoSheet(ev) {
	stopEvent(ev);
	
	if (location.hash !== '') {
		location.hash = '';
		return;
	}
	infoSheet.classList.add('hidden');
}

function handleHashChange() {
	if (location.hash === '#about') {
		showInfoSheet();
	} else {
		hideInfoSheet();
	}
}

window.addEventListener('load', function () {
	infoSheet = document.getElementById('info-sheet');
	infoSheet.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
	document.body.addEventListener('pointerdown', hideInfoSheet);
	document.getElementById('info-btn').addEventListener('click', showInfoSheet);
	window.addEventListener('hashchange', handleHashChange);
	
	// Handle the hash on load.
	handleHashChange();
});
