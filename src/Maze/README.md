## Maze generation algorithms.

So far, the code supports randomised Kruskal's algorithm to generate the maze. The code attempts to decouple the maze *graph* generation from the graphical representation of the maze. The only thing that the algorithm needs to know is how to calculate the neighbour indices of given maze cell, i.e:

`In a rectangular N by M maze, cells are numbered left-to-right, top to bottom from 0 to N*M-1. Thus the neighbour of a cell C somewhere in the middle of therefore C-1 (left), C+1 (right), C+N (bottom), C-N (top).`

It also needs to know of a list of walls that separate each two neighbouring cells. Here, a [wall](Wall.js) is just a container for two neighbouring cells. This again allows to decouple graphical representation from data representation.

## Kruskal's randomised algorithm

From wiki:

> 1.Create a list of all walls, and create a set for each cell, each containing just that one cell.
>
> 2. For each wall, in some random order:
>
>  If the cells divided by this wall belong to distinct sets:
>
>  a. Remove the current wall.
>
>  b. Join the sets of the formerly divided cells."

To make the set operations efficient, a  [Union Find](https://en.wikipedia.org/wiki/Disjoint-set_data_structure) is [implemented](UnionFind.js).

