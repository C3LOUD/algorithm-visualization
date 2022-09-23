"strict mode";
import Node from "../node.js";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const dfsStart = (startPos, grid) => {
  let queue = [];
  const nodes = [];
  let visitedNodes = [startPos];
  queue.push(startPos);

  while (!!queue.length) {
    const node = new Node(...queue.pop());
    nodes.push(node);

    for (let neighbor of node.neighbors) {
      const [i, j] = neighbor;
      if (visitedNodes.some((n) => n[0] === i && n[1] === j)) continue;
      if (i < 0 || j < 0 || i > grid.length - 1 || j > grid[i].length - 1)
        continue;
      if (grid[i][j] !== 0) continue;

      queue.push([...neighbor, node.currentNodeId]);
      visitedNodes.push(neighbor);
    }
  }

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
