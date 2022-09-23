"strict mode";
import { sleep } from "./util.js";

export default class Board {
  grid;

  constructor() {
    this.board = document.querySelector(".board");
    this.init();
  }

  resetBoard = () => {
    this.grid = [];
    for (let i = 0; i < 25; i++) {
      this.grid.push(new Array(25).fill(0));
      // this.grid.push([]);
      // for (let j = 0; j < 25; j++) {
      //   this.grid[i].push(Math.round(Math.random() * 0.7));
      // }
    }
  };

  setStarter = (startPos) => {
    const grid = document.querySelector(`[data-id="${startPos}"]`);
    grid.style.backgroundColor = "red";
  };

  setTarget = (targetPos) => {
    const grid = document.querySelector(`[data-id="${targetPos}"]`);
    grid.style.backgroundColor = "green";
  };

  setPath = async (path) => {
    for (const node of path) {
      const [i, j] = node;
      if (this.grid[i][j] !== 0) continue;
      const grid = document.querySelector(`[data-id="${node}"]`);
      grid.style.backgroundColor = "orange";
      await sleep(0.2);
    }
  };

  renderSearchPath = async (path) => {
    for (const node of path) {
      const grid = document.querySelector(`[data-id="${node.currentNode}"]`);
      grid.style.backgroundColor = "blue";
      await sleep(0.01);
    }
    return new Promise((res) => {
      res();
    });
  };

  renderBoard = async () => {
    this.board.innerHTML = "";
    for (const i in this.grid) {
      for (const j in this.grid[i]) {
        const el = document.createElement("div");
        el.style.border = "1px solid black";
        el.setAttribute("data-id", `${i},${j}`);
        el.style.transitionDuration = "1s";
        this.grid[i][j] === 1 ? (el.style.backgroundColor = "black") : null;
        this.board.appendChild(el);
        // await sleep(0.005);
      }
    }
  };

  init() {
    this.resetBoard();
    this.renderBoard();
  }
}
