// provide sketch interface and collect drawn data points from user.

var gridWidth = 30;
var strkWeight = 2;
var padding = 15;
var drawnPoints = [];
var testPoints = [];

var Point = function(x, y) {
	this.x = x;
	this.y = y;
	this.getDist = function(other) {
		return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
	}
}

function setup() {
	createCanvas(600, 600);
	background(255);
	noLoop();

	drawGrid();
	drawHorizontalAxis();
	drawVerticalAxis();
	drawLabel();
	drawScale();
}

function draw() {
	push();

	stroke(0, 155, 255);
	var pts = funcPts(Math.sin, -PI, PI);
	var pts = transform(pts, gridWidth, gridWidth, width/2, height/2);
	drawCurve(pts);

	pop();
}

function drawHorizontalAxis() {
	push();
	
	strokeWeight(strkWeight);
	strokeJoin(ROUND);
	stroke(0);
	noFill();

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
	
	strokeWeight(strkWeight);
	strokeJoin(ROUND);
	stroke(0);
	noFill();

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

	noFill();
	strokeWeight(strkWeight);
	strokeJoin(ROUND);
	stroke(215);

	push();
	translate(0, height / 2);
	var num = height / (gridWidth * 2);
	for (var i = 0; i < num; i++) {
		line(0, -i*gridWidth, width, -i*gridWidth);
		line(0, i*gridWidth, width, i*gridWidth);
	}
	pop();

	push();
	translate(width / 2, 0);
	var num = width / (gridWidth * 2);
	for (var i = 0; i < num; i++) {
		line(-i*gridWidth, 0, -i*gridWidth, height);
		line(i*gridWidth, 0, i*gridWidth, height);
	}
	pop();

	pop();
}

function drawLabel() {
	push();

	textSize(16);
	stroke(0);
	strokeWeight(1);

	text("O", width/2 - 15, height/2 + 15);
	text("x", width - 12, height/2 + 15);
	text("y", width/2 - 15, 12);

	pop();
}

function drawScale() {
	var len = 3;

	push();
	strokeWeight(1);
	stroke(0);
	textSize(12);

	push();
	translate(0, height / 2);
	var num = height / (gridWidth * 2);
	for (var i = 1; i < num; i++) {
		line(width/2 -len, -i*gridWidth, width/2 + len, -i*gridWidth);
		line(width/2 - len, i*gridWidth, width/2 + len, i*gridWidth);
		text(-i, width/2 + 5, -i * gridWidth + 5);
		text(i, width/2 + 5, i * gridWidth + 5);
	}
	pop();

	push();
	translate(width / 2, 0);
	var num = width / (gridWidth * 2);
	for (var i = 1; i < num; i++) {
		line(-i*gridWidth, height/2 - len, -i*gridWidth, height / 2 + len);
		line(i*gridWidth, height/2 - len, i*gridWidth, height /2 + len);
		text(-i, -i * gridWidth - 5, height / 2 + 15);
		text(i, i * gridWidth - 5, height / 2 + 15);
	}
	pop();

	pop();
}

function drawCurve(pts) {
	push();
	strokeWeight(strkWeight);
	for (var i = 1; i < pts.length; i++) {
		line(pts[i-1].x, pts[i-1].y, pts[i].x, pts[i].y);
	}
	pop();
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
	setup();
	
	testPoints = drawnPoints;
	drawnPoints = [];

	if (testPoints.length != 0) {
		stroke(0);
		var testBez = genericBezier(sample(testPoints));
		drawCurve(testBez);
	}	
}

function mouseReleased() {
	setup();

	stroke(0, 155, 255);
	var drawBez = genericBezier(sample(drawnPoints));
	drawCurve(drawBez);
	
	if (testPoints.length != 0) {
		stroke(0);
		var testBez = genericBezier(sample(testPoints));
		drawCurve(testBez);
		test(testBez, drawBez);
	}
}	












