"strict mode";
import Board from "./board.js";
import { bfsStart, bfsPathfinder } from "./algorithm/bfs.js";
import { dfsStart, dfsPathfinder } from "./algorithm/dfs.js";

import aldousBorder from "./maze-generator/aldous-border.js";

const App = () => {
  const board = new Board();
  const pathfinder = document.querySelector(".pathfinder");
  const maze = document.querySelector(".maze");
  const start = document.querySelector(".start-btn");
  const reset = document.querySelector(".reset-btn");

  const switchMaze = (e) => {
    board.init();
    board.readyToSetupMaze();
    aldousBorder(board.grid);
  };

  const switchPathfinder = (e) => {
    console.log(e.target.value);
  };

  const renderPath = async () => {
    const [startPoint, endPoint] = board.getStartEnd();

    const nodes = dfsStart(startPoint, board.grid);
    const path = dfsPathfinder(endPoint, nodes);

    const renderSearchPath = async () => {
      const endNodeIndex = nodes.findIndex(
        (n) => endPoint.toString() === n.currentNode.toString()
      );
      const shortNodeList = nodes.slice(1, endNodeIndex);
      await board.renderSearchPath(shortNodeList);
    };

    await renderSearchPath();
    board.setPath(path);
  };

  start.addEventListener("click", renderPath);
  reset.addEventListener("click", board.init.bind(board));
  maze.addEventListener("change", switchMaze);
  pathfinder.addEventListener("change", switchPathfinder);
};

App();
