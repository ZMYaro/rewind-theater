var canvas;
var tool = 'rect';
var currentShape;

function startDraw(e) {
	e.preventDefault();
	
	// If a shape is already being drawn, do not start another one.
	if(currentShape) {
		return;
	}
	
	// Save the current shape properties to a global variable that can be
	// accessed by the other drawing functions.
	currentShape = {};
	
	if(e.changedTouches) {
		currentShape.startX = e.changedTouches[0].pageX;
		currentShape.startY = e.changedTouches[0].pageY;
	} else {
		currentShape.startX = e.pageX;
		currentShape.startY = e.pageY;
	}
	
	// Create a new shape element.
	currentShape.elem = document.createElement('div');
	currentShape.elem.className = 'shape ' + tool;
	
	currentShape.elem.style.left = currentShape.startX + 'px';
	currentShape.elem.style.top = currentShape.startY + 'px';
	canvas.appendChild(currentShape.elem);
}
function continueDraw(e) {
	e.preventDefault();
	if(!currentShape) {
		return;
	}
	
	var x, y;
	if(e.changedTouches) {
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY;
	} else {
		x = e.pageX;
		y = e.pageY;
	}
	
	if(x > currentShape.startX) {
		currentShape.elem.style.left =
			currentShape.startX + 'px';
		currentShape.elem.style.width =
			(x - currentShape.startX) + 'px';
	} else {
		currentShape.elem.style.left =
			x + 'px';
		currentShape.elem.style.width =
			(currentShape.startX - x) + 'px';
	}
	if(y > currentShape.startY) {
		currentShape.elem.style.top =
			currentShape.startY + 'px';
		currentShape.elem.style.height =
			(y - currentShape.startY) + 'px';
	} else {
		currentShape.elem.style.top =
			y + 'px';
		currentShape.elem.style.height =
			(currentShape.startY - y) + 'px';
	}
}
function stopDraw(e) {
	e.preventDefault();
	currentShape = null;
}

/** Remove all shapes from the canvas */
function clearCanvas(e) {
	if(e) { e.preventDefault(); }
	// Remove all canvas content.
	canvas.innerHTML = '<span></span>';
	/*var shapes = canvas.getElementsByClassName('shape');
	while(shapes.length > 0) {
		canvas.removeChild(shapes[0]);
	}*/
}

window.addEventListener('load', function() {
	canvas = document.getElementById('canvas');
	
	canvas.addEventListener('selectstart', function(e) {
		e.preventDefault();
	}, false);
	
	canvas.addEventListener('mousedown', startDraw, false);
	canvas.addEventListener('touchstart', startDraw, false);
	
	canvas.addEventListener('mousemove', continueDraw, false);
	canvas.addEventListener('touchmove', continueDraw, false);
	
	canvas.addEventListener('mouseup', stopDraw, false);
	//window.addEventListener('mouseout', stopDraw, false);
	canvas.addEventListener('touchend', stopDraw, false);
	canvas.addEventListener('touchcancel', stopDraw, false);
	//canvas.addEventListener('touchleave', stopDraw, false);
	
	document.getElementById('clearBtn').addEventListener('click', clearCanvas, false);
	document.getElementById('rectBtn').addEventListener('click', function() {
		tool = 'rect';
	}, false);
	document.getElementById('ellipseBtn').addEventListener('click', function() {
		tool = 'ellipse';
	})
}, false);