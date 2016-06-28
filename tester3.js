// test the correctness of user-drawn diagrams.
var error_tolerance = 0.1;
var normDegree = 3;

function findError(pts1, pts2) {
	var err = 0;
	for (var i = 0; i < pts1.length; i++) {
		err += Math.pow(pts1[i].getDist(pts2[i]), normDegree);
	}
 	return Math.pow(err, 1 / normDegree) / pts1.length;
}

function normalise(pts) {
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

function test(testPoints, drawnPoints) {
	console.log(normalise(testPoints));
	var err = findError(normalise(testPoints), normalise(drawnPoints));
	console.log(err);
	if (err > error_tolerance) {
		console.log("Incorrect");
	} else {
		console.log("Correct!");
	}
}