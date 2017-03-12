'use strict';
import 'app.scss';
import {Maze, generateRectangularWalls}  from 'Maze';
import Snap  from 'snapsvg-cjs';


function drawWalls(snap, walls, scale, style) {

	let lines = walls.map(wall => {
		let start = wall.startPoint;
		let end = wall.endPoint; 
		// console.log(start, end);
		return snap.line(
			strokeWidth + scale*start.x, 
			strokeWidth + scale*start.y, 
			strokeWidth + scale*end.x, 
			strokeWidth + scale*end.y);
	});
	lines.forEach(line => line.attr(style));
}

function drawCoordinates(snap, width, height, scale) {
	let fontSize = 9;
	let texts = [];
	for (let j = 0; j < height; ++j)
		for (let i = 0; i < width; ++i) {
			texts.push(snap.text(i*scale+scale/2, j*scale+fontSize/2 + scale/2, `(${i}, ${j})`));
	}
	for (let t of texts) {
		t.attr({
			fontSize,
			textAnchor: 'middle'
		});
	}

}



const canvas = Snap('#canvas');
let scale = 30; // 'pixels' per cell
let mazeWidth = 8;
let mazeHeight = 6;
let strokeWidth = 1;
let canvasHeight = mazeHeight * scale + 2 * strokeWidth;
let canvasWidth = mazeWidth * scale + 2* strokeWidth;
canvas.attr({
	width: canvasWidth,
	height: canvasHeight
});
// let walls = generateRectangularWalls(mazeWidth, mazeHeight);
let maze = new Maze(mazeWidth, mazeHeight);

drawWalls(canvas, generateRectangularWalls(mazeWidth, mazeHeight), scale, { 
		strokeWidth: strokeWidth,
		stroke: '#f5f5f5'
	});

drawWalls(canvas, maze.walls, scale, { 
		strokeWidth: strokeWidth,
		stroke: 'black'
	});

// drawCoordinates(canvas, mazeWidth, mazeHeight, scale);
for (let cell of maze.cells) {
	console.debug(cell);
}

