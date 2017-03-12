export default class Wall {
  /**
  * Wall class that stores the wall data. By convention, cellA is on the right or above cellB
  * In order to draw the wall, create a function that knows how to map cell indices to appropriate
  * draw calls.
  * @constructor
  * @param {number} cellA The index of the first cell adjacent to the wall. More left
  * @param {number} cellB The index of the second cell adjacent to the wall. May be null
  */
  constructor(cellA, cellB) {
    this.cellA = cellA;
    this.cellB = cellB;
  }
}
