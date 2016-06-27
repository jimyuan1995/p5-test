var num = 200;
	
function transform(pts, scaleX, scaleY, biasX, biasY) {
	for (var i = 0; i < pts.length; i++) {
		pts[i].x = pts[i].x * scaleX + biasX;
		pts[i].y = pts[i].y * (-scaleY) + biasY;
	}
	return pts;
}

function funcPts(func, begin, end) {
	var step = (end - begin) / num;
	var pts = [];
	for (var x = begin; x < end; x += step) {
		pts.push(new Point(x, func(x)));
	}
	return pts;
}