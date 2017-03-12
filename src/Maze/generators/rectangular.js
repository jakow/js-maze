import Wall from '../Wall';

function cell(x, y, width, height) {
  if (x < width && y < height) {
    return x + y * width;
  }
  return null;
}

// for the purpose of generation, the neighbours are unidirectional,
// e.g wall that divides 2 and 3 appears only once as 2->3 and not
// twice as 2->3 and 3-> 2
function neighbours(x, y, width, height) {
  const neighbourList = [];
  const right = cell(x + 1, y, width, height);
  const bottom = cell(x, y + 1, width, height);
  if (right !== null) neighbourList.push(right);
  if (bottom !== null) neighbourList.push(bottom);
  return neighbourList;
}

export default function generateWalls(width, height) {
  // map 2d coordinates to cell idx
  const walls = [];
  // left wall of the maze
  for (let i = 0; i < height; ++i) {
    walls.push(new Wall(null, i * width));
  }
  // top wall of the maze
  for (let i = 0; i < width; ++i) {
    walls.push(new Wall(null, i));
  }
  // now create the rest of the cells
  for (let j = 0; j < height; ++j) {
    for (let i = 0; i < width; ++i) {
      const thisCell = cell(i, j, width, height);
      for (const neighbor of neighbours(i, j, width, height)) {
        const wall = new Wall(thisCell, neighbor);
        walls.push(wall);
        // console.debug(`wall ${wall.cellA}->${wall.cellB}`);
      }
    }
  }
  return walls;
}
