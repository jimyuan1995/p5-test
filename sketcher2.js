// TODO: slider to adjust size of the canvas.
// TODO: label the axis.
// TODO: simplify the axis drawing
// TODO: padding and margins
// TODO: scale maybe??
// TODO: Discontinuity
// TODO: not in one go??

var gridWidth = 30;
var strkWeight = 2;
var padding = 15;

function setup() {
	createCanvas(600, 600);
	background(255);
	noLoop();
}

function draw() {
	// draw grid, axis, and label
	drawGrid();
	drawHorizontalAxis();
	drawVerticalAxis();
	drawLabel();
}

function drawHorizontalAxis() {
	push();
	
	noFill();
	strokeWeight(strkWeight);
	strokeJoin(ROUND);
	stroke(0);

	var leftMargin = padding;
	var rightMargin = width - padding;

	beginShape();
	vertex(leftMargin, height/2);
	vertex(rightMargin, height / 2);
	vertex(rightMargin - 10, height / 2 - 5);
	vertex(rightMargin, height / 2);
	vertex(rightMargin - 10, height / 2 + 5);
	endShape();
	
	pop();
}

function drawVerticalAxis() {
	push();
	
	noFill();
	strokeWeight(strkWeight);
	strokeJoin(ROUND);
	stroke(0);

	var upMargin = padding;
	var bottomMargin = height - padding;

	beginShape();
	vertex(width/2, bottomMargin);
	vertex(width/2, upMargin);
	vertex(width/2 - 5, upMargin + 10);
	vertex(width/2, upMargin);
	vertex(width/2 + 5, upMargin + 10);
	endShape();
	
	pop();
}

function drawGrid() {
	push();
	stroke(215);
	strokeWeight(strkWeight);

	var num = height / gridWidth;
	for (var i = 0; i < num; i++) {
		line(0, i*gridWidth, width, i*gridWidth);
	}

	var num = width / gridWidth;
	for (var i = 0; i < num; i++) {
		line(i*gridWidth, 0, i*gridWidth, height);
	}

	pop();
}

function drawLabel() {
	push();

	textSize(16);
	stroke(0);
	text("O", width/2 - 15, height/2 + 15);
	text("x", width - 12, height/2 + 15);
	text("y", width/2 - 15, 12);

	pop();
}

// --------------------------------------------------
var drawnPoints;
var testPoints;

var Point = function(x, y) {
	this.x = x;
	this.y = y;
}

function mouseDragged() {
	var current = new Point(mouseX, mouseY);

	push();
	stroke(0, 155, 255);
	strokeWeight(strkWeight);
	if (drawnPoints.length > 0) {
		var prev = drawnPoints[drawnPoints.length - 1];
		line(prev.x, prev.y, current.x, current.y);
	}
	pop();

	drawnPoints.push(current);	
}

function mousePressed() {
	clear();
	drawGrid();
	drawHorizontalAxis();
	drawVerticalAxis();
	drawLabel();

	testPoints = drawnPoints;
	drawnPoints = [];
}

function mouseReleased() {
	if (typeof testPoints != "undefined") {
		test(testPoints, drawnPoints);
	}
}









