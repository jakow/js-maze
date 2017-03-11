'use strict';
import {Point} from '../Point';
import {Wall} from './Wall';
/*
1.Create a list of all walls, and create a set for each cell, each containing just that one cell.
2. For each wall, in some random order:
	If the cells divided by this wall belong to distinct sets:
		a. Remove the current wall.
		b. Join the sets of the formerly divided cells.
*/

/* 
	cells are represented as numbers. For a rectangular maze, the cell is 
*/
export function generateRectangularWalls(width, height) {
	let walls = [];
	// the cell to the right of index or null if cell is on the right edge of maze
	let rightOf = (index) => (index + 1 < width ? index + 1: null);
	// the cell below the index or null if cell is the bottom of maze
	let below = (index) => (((index + width) < (width * height)) ? index + width : null); 

	walls.push(new Wall(null, 0, new Point(0,0), new Point(0,1))); // top left corner, left wall
	// top wall of the maze
	for (let i = 0; i < width; ++i) {
		walls.push(new Wall(null, i, new Point(i, 0), new Point(i+1,0)));
	}
	// now create the rest of the cells
	for (let i = 0; i < width; ++i) {
		for (let j = 0; j < height; ++j) {
			// right wall
			walls.push(new Wall(i, rightOf(i), new Point(i,j), new Point(i+1, j)));
			// bottom wall
			walls.push(new Wall(i, below(i),  new Point (i, j), new Point (i, j+1)));
		}
	}
	return walls;
}
// generate maze from an array of walls
export function generateMaze(width, height) {

	var maze = new Map(); // adjacency list of 
}

class UnionFind {
	/**
	 * Creates an instance of UnionFind.
	 *
	 * @constructor
	 * @this {UnionFind}
	 * @param {number} size The desired radius of the circle.
	 */
	constructor(size) {
		this.N = size;
        this.parent = [];
        this.size = [];
        for (var i = 0; i < N; ++i) {
            this.parent[i] = i;
            this.size[i] = 1;
        }
	}

		// find the root of p
	root(p) {
        while (p !== this.parent[p]) {
            // path compression - after getting the root of a node, set the root of visited node to its parent
            this.parent[p] = this.parent[parent[p]];
            p = this.parent[p];
        }
        return p;
	}
	/**
	 * Connect p and q trees.
	 * @this {Circle}
	 * @param {number} p The member of the first tree to be connected.
	 * @param {number} q The member of the second tree to be connected.
 */
	union(p, q) {
		let pRoot = root(p);
        let qRoot = root(q);
        if (pRoot === qRoot) return;
        // connect smaller to bigger
        if (this.size[pRoot] < this.size[qRoot]) {
        	// p tree is smaller so gets connected to q tree
            this.parent[pRoot] = qRoot;
            this.size[qRoot] += this.size[pRoot]; // q tree grows
        } else {
        	// the q tree is smaller so gets connected to q tree
            this.parent[qRoot] = this.pRoot;
            size[pRoot] += size[qRoot]; // p tree grows
        }
        parent[root(p)] = root(q);
	}
	// find: are and b connected? 
	find(p, q) {
		return root(p) === root(q);
	}

}