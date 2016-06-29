var num = 200;
var limit = 1;

function funcPts(func, begin, end) {
	var step = (end - begin) / num;
	var pts = [];
	for (var x = begin; x < end; x += step) {
		pts.push(new Point(x, func(x)));
	}
	return pts;
}

function transform(pts, scaleX, scaleY, biasX, biasY) {
	for (var i = 0; i < pts.length; i++) {
		pts[i].x = pts[i].x * scaleX + biasX;
		pts[i].y = pts[i].y * scaleY + biasY;
	}
	return pts;
}


function findInterceptX(pts) {
	var intercepts = [];
	pts = normalise(pts);
	for (var i = 0; i < pts.length; i++) {
		if (pts[i].x - 300 < limit && pts[i].getDist(inter[inter.length - 1]) < 10) {
			intercepts.push(pts[i]);
		}
	}
	return intercepts;	
}

function findInterceptY(pts) {
	var inter = [];
	pts = normalise(pts);
	for (var i = 0; i < pts.length; i++) {
		if (pts[i].y - 300 < limit && pts[i].getDist(inter[inter.length - 1]) < 10) {
			inter.push(pts[i]);
		}
	}
	return inter;	
}

function findTurningPts(pts) {
	var turningPts = [];
	for (var i = 1; i < pts.length; i++) {
		var dx = pts[i].x - pts[i-1].x;
		var dy = pts[i].y - pts[i-1].y;
		if (dx != 0 && (dy/dx < limit) && pts[i].getDist(turningPts[turningPts.length - 1]) < 10) {
			turningPts.push(pts[i]);
		}
	}
	return turningPts;
}