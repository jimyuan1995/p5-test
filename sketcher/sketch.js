function setup() {
	createCanvas(720, 400);
	background(51);
	noLoop();
	noStroke();
	drawCircle(100, 5);
}

function drawCircle(radius, level) {
	if (level > 0) {
		fill(255/10*level);
		ellipse(width / 2, height / 2, radius, radius);
		drawCircle(radius / 2, level-1);
	}
}

function draw() {
	if (mouseX )
}