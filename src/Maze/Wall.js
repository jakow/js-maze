export class Wall {
	/**
	* Wall class that stores the wall data. By convention, cellA is on the left or above cellB
	* In order to draw the wall, create a function that knows how to map startPoint and endPoint
	* to appropriate draw calls
	* @constructor
	* @param {number} cellA The index of the first cell adjacent to the wall. More left
	* @param {number} cellB The index of the second cell adjacent to the wall. May be null
	* @param {Point} startPoint The start point 
	*/
	constructor(cellA, cellB, startPoint, endPoint) {
		this.cellA = cellA;
		this.cellB = cellB; 
		this.startPoint = startPoint;
		this.endPoint = endPoint;
	}

}