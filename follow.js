var x = 100;
var y = 100;
var angle = 0;
var segLength = 30;

function setup() {
	createCanvas(710, 400);

  	strokeWeight(20.0);
  	stroke(255, 100);
  	fill(151);
}

function draw() {
	clear();
	background(0);
	var dx = mouseX - x;
	var dy = mouseY - y;
	angle = atan2(dy, dx);
	x = mouseX - (cos(angle) * segLength);
	y = mouseY - (sin(angle) * segLength);

	drawSegment(x, y, angle);
	ellipse(x, y, 10, 10);
}	

function drawSegment(x, y, angle) {
	push();
	translate(x, y);
	rotate(angle);
	line(0, 0, segLength, 0);
	pop();
}