"strict mode";

export default class Node {
  constructor(row, col, parentNodeId) {
    this.currentNode = [row, col];
    this.parentNodeId = parentNodeId;
  }

  get currentNodeId() {
    const [row, col] = this.currentNode;
    return `${row}x${col}`;
  }

  get neighbors() {
    const [row, col] = this.currentNode;
    return [
      [row + 1, col],
      [row - 1, col],
      [row, col + 1],
      [row, col - 1],
    ];
  }
}
