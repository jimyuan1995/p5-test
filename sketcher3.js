// provide sketch interface and collect drawn data points from user.

// TODO: slider to adjust size of the canvas.

var gridWidth = 30;
var strkWeight = 2;
var padding = 15;
var drawnPoints;
var testPoints;

var Point = function(x, y) {
	this.x = x;
	this.y = y;
	this.getDist = function(other) {
		return Math.sqrt((this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y));
	}
}

function setup() {
	createCanvas(600, 600);
	background(255);
	noLoop();

	noFill();
	strokeWeight(strkWeight);
	strokeJoin(ROUND);

	drawGrid();
	drawHorizontalAxis();
	drawVerticalAxis();
	drawLabel();
}

function drawHorizontalAxis() {
	push();
	
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

function drawCurve(pts) {
	push();
	stroke(0, 155, 255);
	for (var i = 1; i < pts.length; i++) {
		line(pts[i-1].x, pts[i-1].y, pts[i].x, pts[i].y);
	}
	pop();
}


function mouseDragged() {
	var current = new Point(mouseX, mouseY);
	
	push();
	stroke(0, 155, 255);
	if (drawnPoints.length > 0) {
		var prev = drawnPoints[drawnPoints.length - 1];
		line(prev.x, prev.y, current.x, current.y);
	}
	pop();

	drawnPoints.push(current);	
}

function mousePressed() {
	setup();
	testPoints = drawnPoints;
	drawnPoints = [];
}

function mouseReleased() {
	setup();
	var bez = genericBezier(sample(drawnPoints))
	drawCurve(bez);

	if (typeof testPoints != "undefined") {
		test(sample(genericBezier(testPoints)), bez);
	}
}	












