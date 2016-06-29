// test the correctness of user-drawn diagrams.
var error_tolerance = 0.02;
var normDegree = 3;

function findError(pts1, pts2) {
	var err = 0;
	for (var i = 0; i < pts1.length; i++) {
		err += Math.pow(pts1[i].getDist(pts2[i]), normDegree);
	}
 	return Math.pow(err, 1 / normDegree) / pts1.length;
}

function normalise(pts) {
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

function test(testPoints, drawnPoints) {
	var err1 = findError(normalise(testPoints), normalise(drawnPoints));
	testPoints.reverse();
	var err2 = findError(normalise(testPoints), normalise(drawnPoints));
	var err = Math.min(err1, err2);
	console.log(err);
	if (err > error_tolerance) {
		console.log("Incorrect");
	} else {
		console.log("Correct!");
	}
}