function setup() {
	createCanvas(720,400);
	background(125);
	fill(255);
}


function draw() {
	clear();
	translate(width / 2, height / 2);
	var dx = mouseX - width / 2;
	var dy = mouseY - height / 2;
	var angle = atan2(dy, dx);
	rotate(angle);
	rect(-30, -5, 60, 10);
}