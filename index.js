"strict mode";
import Board from "./board.js";
import { bfsStart, bfsPathfinder } from "./algorithm/bfs.js";
import { dfsStart, dfsPathfinder } from "./algorithm/dfs.js";

import aldousBorder from "./maze-generator/aldous-border.js";

const App = () => {
  const board = new Board();
  let nodesList;
  let endPoint;

  const renderSearchPath = async () => {
    const endNodeIndex = nodesList.findIndex(
      (n) => endPoint.toString() === n.currentNode.toString()
    );
    const shortNodeList = nodesList.slice(1, endNodeIndex);
    await board.renderSearchPath(shortNodeList);
  };

  const renderPath = async (e) => {
    if (e.key !== "Enter") return;
    const path = dfsPathfinder(endPoint, nodesList);
    await renderSearchPath();
    board.setPath(path);
    removeEventListener("keydown", renderPath);
  };

  const pickEndPoint = (e) => {
    const [i, j] = e.target.dataset.id.split(",");
    if (board.grid[i][j] !== 0) return;
    board.setTarget([i, j]);
    endPoint = [i, j];
    board.board.removeEventListener("click", pickEndPoint);
    addEventListener("keydown", renderPath);
  };

  const pickStartPoint = (e) => {
    const [i, j] = e.target.dataset.id.split(",");
    nodesList = dfsStart([+i, +j], board.grid);
    board.setStarter([+i, +j]);
    board.board.removeEventListener("click", pickStartPoint);
    board.board.addEventListener("click", pickEndPoint);
  };

  board.board.addEventListener("click", pickStartPoint);

  addEventListener("keyup", (e) => {
    if (e.key === "r") {
      board.init();
      board.board.addEventListener("click", pickStartPoint);
    }
  });

  aldousBorder(board.grid);
};

App();
