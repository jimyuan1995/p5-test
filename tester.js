var tolerance = 20;
var sampleInterval = 20;

function distance(a, b) {
	return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

function gradient(a, b) {
	if (a.x - b.x == 0) return 0;
	return (a.y - b.y) / (a.x - b.x);
}

function average(arr) {
	var sum = 0;
	for (var i in arr) sum += arr[i];
	return sum / arr.length;
}

function variance(arr) {
	var ave = average(arr);
	var sumSquare = 0;
	for (var i in arr) {
		sumSquare += (arr[i]) * (arr[i]);
	}
	return sumSquare - (ave * ave);
}

function sampling(arr) {
	var sampledKnots = []; 
	sampledKnots.push(arr[0]);
	var i = 0;
	var j = 0;
	while (i < arr.length) {
		while (j < arr.length && distance(arr[i], arr[j]) < sampleInterval) j++;
		if (j < arr.length) sampledKnots.push(arr[j]);
		i = j;
	}
	return sampledKnots;
}

function findError(arr1, arr2) {
	var err = [];
	var idx1 = 0;
	var idx2 = 0;

	while (idx1 < arr1.length && idx2 < arr2.length) {
		if (arr1[idx1].x > arr2[idx2].x) {
			if (arr2[idx2 + 1].x > arr2[idx2].x) {
				idx2++;
				continue;
			} 
			
		}
		if (idx2 == 0) {
			idx1++;
			continue;
		}
		var p = arr1[idx1];
		var p0 = arr2[idx2 - 1];
		var p1 = arr2[idx2];
		var grad = gradient(p0, p1);
		var estimate = p0.y + grad * (p.x - p0.x);
		err.push(abs(estimate - p.y));
		idx1++;
 	}
	console.log(err);
 	return average(err);
}


function test(testPoints, drawnPoints) {
	var sampledTestPoints = sampling(testPoints);
	var sampledDrawnPoints = sampling(drawnPoints);
	if (sampledDrawnPoints.length < 5) 
	{
		console.log("Incorrect!");
		return;
	}
	
	var err = findError(sampledTestPoints, sampledDrawnPoints);
	console.log(err);

	if (err > tolerance) {
		console.log("Incorrect");
	} else {
		console.log("Correct!");
	}
}