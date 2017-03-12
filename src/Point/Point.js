'use strict';
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
// the symbols are package-private, meaning that X and Y can only be accessed
// with 
const symX = Symbol('x');
const symY = Symbol('y');
export class Point {
	constructor(x, y) {
		if (!isNumber(x) || !isNumber(y)) {
			throw new TypeError('Non numeric Point coordinates');
		}
		this[symX] = Number.parseInt(x) || Number.parseFloat(x);
		this[symY] = Number.parseInt(y) || Number.parseFloat(y);
	}

	get x() { return this[symX]; }
	get y() { return this[symY]; }
	// trying to set x or y will result in a TypeError
}
