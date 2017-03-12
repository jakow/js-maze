import shuffle from 'shuffle-array';
import generateRectangularWalls from './generators/rectangular';
import UnionFind from './UnionFind';
/*
* Randomised Kruskal algorithm for maze generation.
* 1. Create a list of all walls, and create a set for each cell, each containing just that one cell.
* 2. For each wall, in some random order:
*   If the cells divided by this wall belong to distinct sets:
*     a. Remove the current wall.
*     b. Join the sets of the formerly divided cells.

* In order to generate a maze, the maze must know how to:
* a) determine the neighbours of each cell
* b) determine if two neighbours are connected
* To do this
*/
function connectCells(cellA, cellB, maze) {
  if (maze.get(cellA) === undefined) {
    maze.set(cellA, []);
  }
  if (maze.get(cellB) === undefined) {
    maze.set(cellB, []);
  }
  maze.get(cellA).push(cellB);
  maze.get(cellB).push(cellA);
}

function generateMazeKruskal(width, height) {
  // first create all the walls and shuffle them randomly
  let allWalls = generateRectangularWalls(width, height);
  allWalls = shuffle(allWalls.slice()); // shuffle a copy using fisher-yates
  // create
  const mazeWalls = [];
  // adjacency list of edges
  // stored as a map of cellNumber -> [adjacentCellNumbers]
  const maze = new Map();
  // create a union-find (disjoint set) data structure which will keep track of which cells are
  // connected
  const uf = new UnionFind(width * height); // add cells to UF
  for (const wall of allWalls) {
    const cellA = wall.cellA;
    const cellB = wall.cellB;
    if (cellA === null || cellB === null) {
      mazeWalls.push(wall);
    } else {
      const connected = uf.find(cellA, cellB);
      if (!connected) { // are they not connected?
        // connect them
        uf.union(cellA, cellB);
        connectCells(cellA, cellB, maze);
      } else {
        // put a wall in the list, to be plotted later
        mazeWalls.push(wall);
      }
    }
  }
  return { cells: maze, walls: mazeWalls };
}

export default class Maze {
  constructor(width, height) {
    const maze = generateMazeKruskal(width, height);
    this.cells = maze.cells;
    this.walls = maze.walls;
  }
}

