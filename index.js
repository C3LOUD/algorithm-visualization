"strict mode";
import Board from "./board.js";
import { bfsStart, bfsPathfinder } from "./bfs.js";

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
    const path = bfsPathfinder(endPoint, nodesList);
    await renderSearchPath();
    console.log("fired");
    board.setPath(path);
    removeEventListener("keydown", renderPath);
  };

  const pickEndPoint = (e) => {
    const [i, j] = e.target.dataset.id.split(",");
    board.setTarget([i, j]);
    endPoint = [i, j];
    board.board.removeEventListener("click", pickEndPoint);
    addEventListener("keydown", renderPath);
  };

  const pickStartPoint = (e) => {
    const [i, j] = e.target.dataset.id.split(",");
    nodesList = bfsStart([+i, +j], board.grid);
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
};

App();
