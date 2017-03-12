import Snap from 'snapsvg-cjs';
import './app.scss';
import Maze from './Maze/Maze';
import generateRectangularWalls from './Maze/generators/rectangular';

// a hack to use snap.svg mina which is only defined on window
const mina = window.mina; // eslint-disable-line

async function drawRectangularWalls(snap, walls, mazeWidth, mazeHeight, scale, style, animate) {
  const strokeWidth = style.strokeWidth;
  const lines = [];
  for (let i = 0; i < mazeWidth; ++i) {
    // draw top horizontal maze boundary
    lines.push(snap.line(
      strokeWidth / 2 + scale * i,
      strokeWidth / 2,
      strokeWidth / 2 + scale * (i + 1),
      strokeWidth / 2,
    ));
  }
  // draw right vertical maze boundary
  for (let i = 0; i < mazeHeight; ++i) {
    lines.push(snap.line(
      strokeWidth / 2 + scale * mazeWidth,
      strokeWidth / 2 + scale * i,
      strokeWidth / 2 + scale * mazeWidth,
      strokeWidth / 2 + scale * (i + 1),
      ));
  }
  // draw left vertical maze boundary
  for (let i = 0; i < mazeHeight; ++i) {
    lines.push(snap.line(
      strokeWidth / 2,
      strokeWidth / 2 + scale * i,
      strokeWidth / 2,
      strokeWidth / 2 + scale * (i + 1),
      ));
  }
  // draw bottom horizontal maze boundary
  for (let i = 0; i < mazeWidth; ++i) {
    lines.push(snap.line(
      strokeWidth / 2 + scale * i,
      strokeWidth / 2 + scale * mazeHeight,
      strokeWidth / 2 + scale * (i + 1),
      strokeWidth / 2 + scale * mazeHeight,
      ));
  }


  walls.forEach((wall) => {
    const cellA = wall.cellA;
    const cellB = wall.cellB;
    if (cellA === null || cellB === null) {
      return; // draw internal walls only
    }
    // x coordinates of cellA
    // determine where to draw the line basing on cell indices
    const x = cellA % mazeWidth;
    const y = Math.floor(cellA / mazeWidth);
    let startX;
    let startY;
    let endX;
    let endY;
    switch (cellB - cellA) {
      case 1: // cell B is on the right
        startX = x + 1;
        startY = y;
        endX = x + 1;
        endY = y + 1;
        break;
      case mazeWidth: // cell B is below
        startX = x;
        startY = y + 1;
        endX = x + 1;
        endY = y + 1;
        break;
      default: // ???
        return;
    }
    lines.push(snap.line(
      strokeWidth / 2 + scale * startX,
      strokeWidth / 2 + scale * startY,
      strokeWidth / 2 + scale * endX,
      strokeWidth / 2 + scale * endY,
      ),
    );
  });
  // console.log(lines);
  for (const line of lines) {
    if (animate) {
      // using await goodness for sequential animation without a callback hell
      await animateDraw(line, style, scale, 50); // eslint-disable-line
    } else {
      line.attr(style);
    }
  }
}

function animateDraw(line, style, lineLength, speed) {
  const startStyle = Object.assign(style,
    {
      'stroke-dasharray': `${lineLength} ${lineLength}`,
      'stroke-dashoffset': lineLength,
    });
  const endStyle = { 'stroke-dashoffset': 0 };
  return new Promise((resolve) => {
    line.attr(startStyle);
    line.animate(endStyle, speed, null, resolve);
  });
}
// jshint ignore: end

function drawCoordinates(snap, width, height, scale) {
  const fontSize = 9;
  const texts = [];
  for (let j = 0; j < height; ++j) {
    for (let i = 0; i < width; ++i) {
      texts.push(snap.text(
        i * scale + scale / 2,
        j * scale + fontSize / 2 + scale / 2,
        `(${i}, ${j})`,
        ));
    }
  }
  for (const t of texts) {
    t.attr({
      fontSize,
      textAnchor: 'middle',
    });
  }
}

const canvas = Snap('#canvas');
const scale = 40; // 'pixels' per cell
const mazeWidth = 10;
const mazeHeight = 10;
const strokeWidth = 2;
const canvasHeight = mazeHeight * scale + strokeWidth;
const canvasWidth = mazeWidth * scale + strokeWidth;
canvas.attr({
  width: canvasWidth,
  height: canvasHeight,
});
// let walls = generateRectangularWalls(mazeWidth, mazeHeight);
const maze = new Maze(mazeWidth, mazeHeight);
const grid = generateRectangularWalls(mazeWidth, mazeHeight);
const gridStyle = {
  strokeWidth,
  strokeLinecap: 'square',
  stroke: '#f5f5f5',
};

const wallStyle = {
  strokeWidth,
  strokeLinecap: 'square',
  stroke: 'black',
};
drawRectangularWalls(canvas, grid, mazeWidth, mazeHeight, scale, gridStyle);
async function draw() {
  await drawRectangularWalls(canvas, maze.walls, mazeWidth, mazeHeight, scale, wallStyle, true);
}
draw();
