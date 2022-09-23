"strict mode";
import Node from "../node.js";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const dfsStart = (startPos, grid) => {
  const nodes = [];
  let visitedNodes = {};

  const dfsRecursive = (node, visitedNodes, parentNodeId) => {
    const n = new Node(...node, parentNodeId);
    nodes.push(n);
    visitedNodes[node] = true;

    for (let neighbor of n.neighbors) {
      const [i, j] = neighbor;
      if (visitedNodes[neighbor]) continue;
      if (i < 0 || j < 0 || i > grid.length - 1 || j > grid[i].length - 1)
        continue;
      if (grid[i][j] === 1) continue;
      visitedNodes[neighbor] = true;
      dfsRecursive(neighbor, visitedNodes, n.currentNodeId);
    }
  };

  dfsRecursive(startPos, visitedNodes);

  return nodes;
};

export const dfsPathfinder = (endPos, nodes) => {
  const prePath = [];

  const endNode = nodes.find(
    (n) => endPos.toString() === n.currentNode.toString()
  );
  prePath.push(endNode);

  while (true) {
    const node = prePath[0];
    if (!node.parentNodeId) break;

    const nextNode = nodes.find((n) => node.parentNodeId === n.currentNodeId);
    prePath.unshift(nextNode);
  }

  const path = prePath.map((node) => node.currentNode);

  return path;
};
