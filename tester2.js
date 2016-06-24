// test the correctness of user-drawn diagrams.

var error_tolerance = 2;
var normDegree = 3;

function findError(pts1, pts2) {
	var err = 0;
	for (var i = 0; i < pts1.length; i++) {
		err += Math.pow(pts1[i].getDist(pts2[i]), normDegree);
	}
 	return Math.pow(err, 1 / normDegree) / pts1.length;
}

function test(testPoints, drawnPoints) {
	var err = findError(testPoints, drawnPoints);
	console.log(err);
	if (err > error_tolerance) {
		console.log("Incorrect");
	} else {
		console.log("Correct!");
	}
}