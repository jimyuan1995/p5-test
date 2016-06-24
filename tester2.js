// test the correctness of user-drawn diagrams.
var error_tolerance = 100;

function findError(pts1, pts2) {
	var err = 0;
	for (var i = 0; i < pts1.length; i++) {
		err += pts1[i].getDist(pts2[i]);
	}
 	return err / pts1.length;
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