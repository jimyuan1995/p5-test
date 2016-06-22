var to_be_sorted = ["sin()", "Omega", "g", "K", "B", "cos()", "alpha", "l", "L", "ln()"];

// helper arrays
var latinLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var latinLettersUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var greekLetters = ["\\alpha","\\beta","\\gamma","\\delta","\\varepsilon","\\zeta","\\eta","\\theta","\\iota","\\kappa","\\lambda","\\mu","\\nu","\\xi","\\omicron","\\pi","\\rho","\\sigma","\\tau","\\upsilon","\\phi","\\chi","\\psi","\\omega"];
var greekLettersUpper = ["\\Gamma","\\Delta","\\Theta","\\Lambda","\\Xi","\\Pi","\\Sigma","\\Upsilon","\\Phi","\\Psi","\\Omega"];

function forEachIn(arr, func) {
	for (var i = 0; i < arr.length; i++) {
		arr[i] = func(arr[i]);
	}
}
function rmSlash(x) {
	return x.slice(1);
}
forEachIn(greekLetters, rmSlash);
forEachIn(greekLettersUpper, rmSlash);

var whole = [].concat(latinLetters, latinLettersUpper, greekLetters, greekLettersUpper);
console.log(whole);

function isFunction(a) {
	return (a.slice(-2) === '()');
}

function compare(a, b) {
	if (isFunction(a) && isFunction(b)) {
		if (a < b) {
			return -1;
		} else if (a === b) {
			return 0;
		} else return 1;
	} else if (isFunction(a)) {
		return 1;
	} else if (isFunction(b)) {
		return -1;
	} else {
		var idxA = whole.indexOf(a);
		var idxB = whole.indexOf(b);
		if (idxA < idxB) {
			return -1;
		} else if (idxA === idxB) {
			return 0;
		} else {
			return 1;
		}
	}
}

console.log(to_be_sorted.sort(compare));