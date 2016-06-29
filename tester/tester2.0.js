// test the correctness of user-drawn diagrams.
var error_tolerance_position = 0.02;
var error_tolerance_shape = 0.02;
var normDegree = 3;

function findError(pts1, pts2) {
	var err = 0;
	for (var i = 0; i < pts1.length; i++) {
		err += Math.pow(pts1[i].getDist(pts2[i]), normDegree);
	}
 	return Math.pow(err, 1 / normDegree) / pts1.length;
}

function normalise_position(pts) {
	var maxY = 0, 
		maxX = 0;
	for (var i = 1; i < pts.length; i++) {
		maxY = Math.max(abs(height/2 - pts[i].y), maxY);
		maxX = Math.max(abs(pts[i].x - width/2), maxX);
	}
	
	var normalisedPts = [];
	for (var i = 0; i < pts.length; i++) {
		var nx = (pts[i].x - width/2) / maxX;
		var ny = (height/2 - pts[i].y) / maxY;
		normalisedPts.push(new Point(nx, ny));
	}

	return normalisedPts;
}

function normalise_shape(pts) {
	var maxY = pts[0].y, 
		minY = pts[0].y, 
		maxX = pts[0].x, 
		minX = pts[0].x;

	for (var i = 1; i < pts.length; i++) {
		maxY = Math.max(pts[i].y, maxY);
		minY = Math.min(pts[i].y, minY);
		maxX = Math.max(pts[i].x, maxX);
		minX = Math.min(pts[i].x, minX);
	}

	var normalisedPts = [];
	var rangeX = maxX - minX;
	var rangeY = maxY - minY;

	for (var i = 0; i < pts.length; i++) {
		var nx = (pts[i].x - minX) / rangeX;
		var ny = (pts[i].y - minY) / rangeY;
		normalisedPts.push(new Point(nx, ny));
	}

	return normalisedPts;
}


function normalise_test(testPoints, drawnPoints, normalise, error_tolerance) {
	var err1 = findError(normalise(testPoints), normalise(drawnPoints));
	
	testPoints.reverse();
	var err2 = findError(normalise(testPoints), normalise(drawnPoints));
	
	var err = Math.min(err1, err2);
	if (err > error_tolerance) {
		return false;
	} else {
		return true;
	}
}

function testSpecialPts(testPoints, drawnPoints) {
	function inner(pts1, pts2) {
		if (pts1.length != pts1.length) return false;

		for (var i = 0; i < pts1.length; i++)
			if ((pts1[i].x - 300) * (pts2[i].x - 300) < 0 || (pts1[i].y - 300) * (pts2[i].y - 300) < 0) 
				return false;

		return true;
	}

	if (!inner(findInterceptX(testPoints), findInterceptX(drawnPoints))) return false;
	if (!inner(findInterceptY(testPoints), findInterceptY(drawnPoints))) return false;
	if (!inner(findTurningPts(testPoints), findTurningPts(drawnPoints))) return false;
	return true;
}


function test(testPoints, drawnPoints) {
	if (testPoints.length != drawnPoints.length) return false;
	for (var i = 0; i < testPoints.length; i++) {
		if (!normalise_test(testPoints[i], drawnPoints[i], normalise_position, error_tolerance_position)) console.log('fail position');
		if (!normalise_test(testPoints[i], drawnPoints[i], normalise_shape, error_tolerance_shape)) console.log('fail shape');
		if (!testSpecialPts(testPoints[i], drawnPoints[i])) console.log('fail knots');
	}
	console.log('end');
}






