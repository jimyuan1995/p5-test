var prevX;
var prevY;

function setup() {
	createCanvas(720, 400);
	background(0);
	stroke(255);
	fill(151);
	frameRate(5);
}

function mousePressed() {
	curX = mouseX;
	curY = mouseY;
	ellipse(curX,curY,10,10);
	if (typeof prevX != undefined) {
		line(prevX, prevY, curX, curY);
	}
	prevX = curX;
	prevY = curY;
}

function mouseDraged

