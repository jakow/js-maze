export default class UnionFind {
  /**
   * Creates an instance of UnionFind. Also known as disjoint, this data structure supports
   * efficient set concatenation and finding whether two items belong in the same set.
   *
   * @constructor
   * @this {UnionFind}
   * @param {number} size The number of elements in the set
   */
  constructor(size) {
    this.N = size;
    this.parent = [];
    this.size = [];
    for (let i = 0; i < this.N; ++i) {
      this.parent[i] = i;
      this.size[i] = 1;
    }
  }

    // find the root of p
  root(p) {
    let q = p;
    while (q !== this.parent[q]) {
      // path compression - after getting the root of a node, set the root of visited node
      // to its parent
      this.parent[q] = this.parent[this.parent[q]];
      q = this.parent[q];
    }
    return q;
  }
  /**
   * Connect p and q trees.
   * @this {UnionFind}
   * @param {number} p The member of the first tree to be connected.
   * @param {number} q The member of the second tree to be connected.
 */
  union(p, q) {
    const pRoot = this.root(p);
    const qRoot = this.root(q);
    if (pRoot === qRoot) return;
    // connect smaller to bigger
    if (this.size[pRoot] < this.size[qRoot]) {
      // p tree is smaller so gets connected to q tree
      this.parent[pRoot] = qRoot;
      this.size[qRoot] += this.size[pRoot]; // q tree grows
    } else {
      // the q tree is smaller or equal in size so gets connected to q tree
      this.parent[qRoot] = pRoot;
      this.size[pRoot] += this.size[qRoot]; // p tree grows
    }
  }
  // find: are p and q connected?
  find(p, q) {
    return this.root(p) === this.root(q);
  }
}
