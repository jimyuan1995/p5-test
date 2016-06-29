var pastPoints = [];
var fRate = 15;

function setup() {
	createCanvas(720, 400);
	background(255);
	frameRate(fRate);
	loop();
}

var Point = function(x, y) {
	this.x = x;
	this.y = y;
	this.time = 2 * fRate;
	this.isTimeOut = function() {
		return (this.time === 0);
	};
}

function draw() {
	clear();

	pastPoints.push(new Point(mouseX, mouseY));

	var count = pastPoints.length - 1;
	while (count >= 0 && !(pastPoints[count].isTimeOut())) {
		pastPoints[count].time--;
		count--;
	}


	if (count >= 0) {
		pastPoints = pastPoints.slice(count);
	}

	var cStep = 255 / pastPoints.length;
	
	for (var i = 1; i < pastPoints.length; i++) {
		stroke(255 - i * cStep);
		ellipse(pastPoints[i-1].x, pastPoints[i-1].y, 10, 10);
		var px = pastPoints[i-1].x;
		var py = pastPoints[i-1].y;
		var cx = pastPoints[i].x;
		var cy = pastPoints[i].y;
		line(cx, cy, px, py);
	}
}