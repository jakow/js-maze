'use strict';

function TimeoutPromise(time) { // jshint ignore:line
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}

//jshint ignore:start
async function asyncWorld() {
	console.time('asyncWorld');
	console.log("Hello...");
	var promise;
	await TimeoutPromise(1000); 
	console.timeEnd('asyncWorld');
	console.log("async world!");
	
}
//jshint ignore:end
var world = (num) => num > 1 ? num + ' worlds!' : 'world!';
console.log('Hello ' +  world(5*5));

asyncWorld();


