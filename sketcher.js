// TODO: slider to adjust size of the canvas.
// TODO: label the axis.
// TODO: simplify the axis drawing
// TODO: padding and margins
// TODO: scale maybe??
// TODO: Discontinuity


var drawnPoints;
var testPoints;

var fRate = 15;
var gridWidth = 30;
var strkWeight = 2;
var padding = 0;
var drawStarted = false;

var tolerance = 10000;

function setup() {
	createCanvas(600, 600);
	background(255);
	frameRate(fRate);

	// drawing grid and axis
	drawGrid();
	drawHorizontalAxis();
	drawVerticalAxis();
	drawLabel();

	// TODO: label
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
	text("0", width/2 - 12, height/2 + 15);
	text("x", width - 12, height/2 + 15)
	text("y", width/2 - 15, 12)

	pop();
}

var Point = function(x, y) {
	this.x = x;
	this.y = y;
}

function mousePressed() {
	clear();
	drawGrid();
	drawHorizontalAxis();
	drawVerticalAxis();
	drawLabel();

	testPoints = drawnPoints;
	drawnPoints = [];
	drawStarted = true;
}

function mouseReleased() {
	drawStarted = false;
	if (typeof testPoints != "undefined") {
		test(drawnPoints, testPoints);
	}
}

function draw() {

	if (drawStarted) {
		var current = new Point(mouseX, mouseY);

		if (drawnPoints.length > 0) {
			stroke(0, 155, 255);
			var prev = drawnPoints[drawnPoints.length - 1];
			line(prev.x, prev.y, current.x, current.y);
		}

		drawnPoints.push(current);
	}

}

 

function findDifference(drawnPoints, testPoints) {

	var i = 0;
	var j = 0;
	var diff = [];


	while (i < testPoints.length && j < drawnPoints.length) {

		if (testPoints[i].x > drawnPoints[j].x) {
			j++;
			continue;
		}


		if (j == 0) {
			i++;
			continue;
		}

		var tx = testPoints[i].x;
		var ty = testPoints[i].y;
		var x0 = drawnPoints[j-1].x;
		var y0 = drawnPoints[j-1].y;
		var x1 = drawnPoints[j].x;
		var y1 = drawnPoints[j].y;

		var grad = (y1 - y0) / (x1 - x0);
		var ey = y0 + grad * (tx - x0);

		diff.push(ey - ty);

		i++;
 	}

 	return diff;
}

function average(arr) {
	var sum = 0;
	for (var i in arr) {
		sum += arr[i];
	}
	return sum / arr.length;
}

function variance(arr) {
	var ave = average(arr);
	var sumSquare = 0;
	for (var i in arr) {
		sumSquare += (arr[i]) * (arr[i]);
	}
	return sumSquare - (ave * ave);
}

function test(drawnPoints, testPoints) {
	var diff = findDifference(drawnPoints, testPoints);
	var vari = variance(diff);
	console.log(vari);
	if (vari > tolerance) {
		console.log("Incorrect");
	} else {
		console.log("Correct!");
	}
}






