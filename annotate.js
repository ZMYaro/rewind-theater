var DEFAULT_COLOR = '#00ff00';

var canvas,
	colorPicker,
	colorPickerBtn,
	tool,
	rectBtn,
	ellipseBtn,
	currentShape;

/**
 * Set the current tool to the rectangle tool.
 */
function setRectTool() {
	ellipseBtn.classList.remove('selected');
	rectBtn.classList.add('selected');
	tool = 'rect';
}

/**
 * Set the current tool to the ellipse tool.
 */
function setEllipseTool() {
	rectBtn.classList.remove('selected');
	ellipseBtn.classList.add('selected');
	tool = 'ellipse';
}

/**
 * Start drawing a shape.
 * @param {PointerEvent} e
 */
function startDraw(e) {
	e.preventDefault();
	
	// If the info. sheet is open, do not draw.
	if (!!infoSheet && !infoSheet.classList.contains('hidden')) {
		return;
	}
	
	// If a shape is already being drawn, do not start another one.
	if (currentShape) {
		return;
	}
	
	// Save the current shape properties to a global variable that can be
	// accessed by the other drawing functions.
	currentShape = {};
	
	if (e.changedTouches) {
		currentShape.startX = e.changedTouches[0].pageX;
		currentShape.startY = e.changedTouches[0].pageY;
	} else {
		currentShape.startX = e.pageX;
		currentShape.startY = e.pageY;
	}
	
	// Create a new shape element.
	currentShape.elem = document.createElement('div');
	currentShape.elem.className = 'shape ' + tool;
	currentShape.elem.style.borderColor = colorPicker.value;
	currentShape.elem.style.color = colorPicker.value; // box-shadow uses the `color` by default.
	
	currentShape.elem.style.left = currentShape.startX + 'px';
	currentShape.elem.style.top = currentShape.startY + 'px';
	canvas.appendChild(currentShape.elem);
}
/**
 * Handle the pointer moving after starting to draw.
 * @param {PointerEvent} e
 */
function continueDraw(e) {
	e.preventDefault();
	if (!currentShape) {
		return;
	}
	
	var x, y;
	if (e.changedTouches) {
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY;
	} else {
		x = e.pageX;
		y = e.pageY;
	}
	
	if (x > currentShape.startX) {
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
	if (y > currentShape.startY) {
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
/**
 * Handle the pointer releasing after drawing a shape.
 */
function stopDraw(e) {
	if (e) {
		e.preventDefault();
	}
	currentShape = null;
}

/**
 * Remove all shapes from the canvas.
 * @param {Event} e - The event, if this was triggered by an event listener
 */
function clearCanvas(e) {
	if (e) { e.preventDefault(); }
	// Remove all canvas content.
	canvas.innerHTML = '<span></span>';
}

/**
 * Set the color icon and saved color to the current color picker value.
 */
function setColor() {
	localStorage.color = colorPicker.value;
	colorPickerBtn.style.fill = colorPicker.value;
	colorPickerBtn.classList.toggle('dark-color', isColorDark(colorPicker.value));
}

/**
 * Check whether the color is roughly dark enough to get lost on a dark background.
 * @param {String} colorHex - The CSS hex value of the color
 * @returns {Boolean}
 */
function isColorDark(colorHex) {
	var LUM_THRESHOLD = 52;
	var r = parseInt(colorHex.substr(1, 2), 16),
		g = parseInt(colorHex.substr(3, 2), 16),
		b = parseInt(colorHex.substr(5, 2), 16),
		luminance = (0.299 * r) + (0.587 * g) + (0.114 * b);
	return (luminance < LUM_THRESHOLD);
}

window.addEventListener('load', function () {
	canvas = document.getElementById('canvas');
	
	canvas.addEventListener('selectstart', function (e) { e.preventDefault(); }, false);
	
	canvas.addEventListener('pointerdown', startDraw, false);
	canvas.addEventListener('pointermove', continueDraw, false);
	canvas.addEventListener('pointerup',     stopDraw, false);
	canvas.addEventListener('pointerleave',  stopDraw, false);
	canvas.addEventListener('pointercancel', stopDraw, false);
	
	// Set up color picker events.
	colorPicker = document.getElementById('color-picker');
	colorPicker.addEventListener('input', setColor);
	colorPickerBtn = document.getElementById('color-picker-btn');
	colorPickerBtn.addEventListener('click', function () { colorPicker.click(); });
	// Get the last used color or set it to the default.
	colorPicker.value = localStorage.color || DEFAULT_COLOR;
	// Propagate that to the button icon.
	setColor();
	
	rectBtn = document.getElementById('rect-btn');
	rectBtn.addEventListener('click', setRectTool, false);
	ellipseBtn = document.getElementById('ellipse-btn');
	ellipseBtn.addEventListener('click', setEllipseTool, false);
	document.getElementById('clear-btn').addEventListener('click', clearCanvas, false);
	
	// Select the rectangle tool by default.
	setRectTool();
}, false);
