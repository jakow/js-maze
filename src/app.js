'use strict';
import css from 'app.scss'
import { generateMaze, generateRectangularWalls } from 'Maze';
import Snap  from 'snapsvg-cjs';

const canvas = Snap('#canvas');


function drawWalls(walls) {
	walls.forEach(wall => {
			console.log(wall);
	});
}

drawWalls(generateRectangularWalls(10, 10));



