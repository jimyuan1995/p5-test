while (idx1 < arr1.length && idx2 < arr2.length) {
		if (abs(arr1[idx1].x - arr2[idx2].x) < sampleInterval) {
			err.push(distance(arr1[idx1], arr2[idx2]));
			idx1++;
			idx2++;
		} else if (arr1[idx1] < arr2[idx2]) {
			idx1++;
		} else {
			idx2++;
		}
	}

collect, sample control points, smooth, resample, compare.

function draw() {
	var pts = [];
	pts.push(new Point(82, 20));
	pts.push(new Point(10,10));
	pts.push(new Point(90, 90));
	pts.push(new Point(15,80));
	drawCurve(genericBezier(pts));
}

// TODO: scale maybe??
// TODO: Discontinuity
// TODO: not in one go??

drawKnots(findInterceptX(pts));
	drawKnots(findInterceptY(pts));
	drawKnots(findTurningPts(pts));
