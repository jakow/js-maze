'use strict';
import {Point} from '../Point';
import {Wall} from './Wall';
import UnionFind from './UnionFind';
import shuffle from 'shuffle-array';


export class Maze {
	constructor(width, height) {
		let maze = generateMazeKruskal(width, height);
		this.cells = maze.cells;
		this.walls = maze.walls;
	}
}


/*
* Randomised Kruskal algorithm for maze generation.
* 1. Create a list of all walls, and create a set for each cell, each containing just that one cell.
* 2. For each wall, in some random order:
* 	If the cells divided by this wall belong to distinct sets:
* 		a. Remove the current wall.
* 		b. Join the sets of the formerly divided cells.

* In order to generate a maze, the maze must know how to:
* a) determine the neighbours of each cell
* b) determine if two neighbours are connected
* To do this
* 
*/
function generateMazeKruskal(width, height) {

	// first create all the walls and shuffle them randomly
	let allWalls = generateRectangularWalls(width, height);
	allWalls = shuffle(allWalls.slice()); // shuffle a copy using fisher-yates

	// create 
	let mazeWalls = [];
	// adjacency list of edges
	// stored as a map of cellNumber -> [adjacentCellNumbers]
	let maze = new Map(); 
	// create a union-find (disjoint set) data structure which will keep track of which cells are
	// connected
	let uf = new UnionFind(width * height); // add cells to UF
	for (let wall of allWalls) {
		let cellA = wall.cellA;
		let cellB = wall.cellB;
		if (cellA === null || cellB === null) {
			// console.debug('null wall of ', cellToString(cellA), cellToString(cellB), 'continue');
			mazeWalls.push(wall);
			continue;
		}
		let connected = uf.find(cellA, cellB);
		if (!connected) { // are they not connected?
			// connect
			// continue;
			uf.union(cellA, cellB);
			connectCells(cellA, cellB, maze);
			
		} else {
			mazeWalls.push(wall);
			// continue;
		}

	}
	return {cells: maze, walls: mazeWalls};

	function cellToString(cell) {
		if (cell == null) return 'null';
		let x = cell % width;
		let y = Math.floor(cell / width);
		return `(${x}, ${y})`;
	}

}

export function generateRectangularWalls(width, height) {
	// map 2d coordinates to cell idx
	function cell(i, j) {
		if (i < width && j < height) return i + j * width;
		else return null; 
	}

 

	let walls = [];
	// left wall of the maze
	for (let i = 0; i < height; ++i){
		walls.push(new Wall(null, i*width, new Point(0,i), new Point(0,i+1)));
	}
	// top wall of the maze
	for (let i = 0; i < width; ++i) {
		walls.push(new Wall(null, i, new Point(i, 0), new Point(i+1,0)));
	}
	// now create the rest of the cells
	for (let j = 0; j < height; ++j) {
		for (let i = 0; i < width; ++i) {
			// console.debug(`(i, j): (${i}, ${j})`);
			// right wall
			let rightWall = new Wall(
				cell(i, j), 
				cell(i+1, j), 
				new Point(i+1,j), // between this cell and next, vertically down
				new Point(i+1, j+1));
			// console.debug('rightWall', rightWall.cellA, rightWall.cellB);
			walls.push(rightWall);
			// bottom wall
			let bottomWall = new Wall(
				cell(i, j), 
				cell(i, j+1),  
				new Point (i, j+1), 
				new Point (i+1, j+1));
			// console.debug('bottomWall', bottomWall.cellA, bottomWall.cellB);
			walls.push(bottomWall);
		}
	}
	return walls;
}

function connectCells(cellA, cellB, maze) {
	if (maze.get(cellA) === undefined)
		maze.set(cellA, []);
	if (maze.get(cellB) === undefined)
		maze.set(cellB, []);
	maze.get(cellA).push(cellB);
	maze.get(cellB).push(cellA);
}

