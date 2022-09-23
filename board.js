"strict mode";
import { sleep } from "./util.js";

export default class Board {
  grid;

  constructor() {
    this.board = document.querySelector(".board");
    this.init();
  }

  resetBoard = (length) => {
    this.board.style.setProperty("--col", `repeat(${length}, 1fr)`);
    this.board.style.setProperty("--row", `repeat(${length}, 1fr)`);
    this.grid = [];
    for (let i = 0; i < length; i++) {
      this.grid.push(new Array(length).fill(0));
      // this.grid.push([]);
      // for (let j = 0; j < 25; j++) {
      //   this.grid[i].push(Math.round(Math.random() * 0.7));
      // }
    }
  };

  resetCell = (e) => {
    console.log(e.target);
  };

  setStarter = (startPos) => {
    const [i, j] = startPos;
    const grid = document.querySelector(`[data-id="${startPos}"]`);
    grid.setAttribute("draggable", "true");
    this.grid[i][j] = "s";
    grid.style.backgroundColor = "red";
  };

  setTarget = (targetPos) => {
    const [i, j] = targetPos;
    const grid = document.querySelector(`[data-id="${targetPos}"]`);
    grid.setAttribute("draggable", "true");
    this.grid[i][j] = "t";
    grid.style.backgroundColor = "green";
  };

  setPath = async (path) => {
    for (const node of path) {
      const [i, j] = node;
      if (this.grid[i][j] !== 0) continue;
      const grid = document.querySelector(`[data-id="${node}"]`);
      grid.style.backgroundColor = "#fa798f";
      await sleep(0.02);
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

  readyToSetupMaze = () => {
    this.grid.forEach((cells, i) =>
      cells.forEach((cell, j) => {
        grid[i][j] = 1;
      })
    );
  };

  generateBoard = async () => {
    this.board.innerHTML = "";
    for (const i in this.grid) {
      for (const j in this.grid[i]) {
        const el = document.createElement("div");
        el.setAttribute("data-id", `${i},${j}`);
        el.classList.add("cell");
        this.grid[i][j] === 1 ? (el.style.backgroundColor = "black") : null;
        this.board.appendChild(el);
        // await sleep(0.005);
      }
    }
  };

  init() {
    this.resetBoard(25);
    this.generateBoard();
    this.setStarter([12, 8]);
    this.setTarget([12, 17]);
    this.board.addEventListener("drop", this.resetCell.bind(this));
  }
}
