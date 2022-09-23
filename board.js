"strict mode";
import { sleep } from "./util.js";

export default class Board {
  grid;

  constructor() {
    this.board = document.querySelector(".board");
    this.startPoint = [12, 8];
    this.endPoint = [12, 17];
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

  getStartEnd = () => {
    return [this.startPoint, this.endPoint];
  };

  dropTarget = (e) => {
    const [i, j] = e.target.dataset.id.split(",");
    if (this.grid[i][j] === 1) return;

    const [k, l] = e.dataTransfer.getData("id").split(",");
    const cellToRemove = document.querySelector(`[data-id="${[k, l]}"]`);
    this.grid[k][l] = 0;

    if ([...cellToRemove.classList][1] === "startPoint") {
      this.startPoint = [+i, +j];
      this.setStartPoint(this.startPoint);
    } else {
      this.endPoint = [+i, +j];
      this.setEndPoint(this.endPoint);
    }

    cellToRemove.classList.remove(`${[...cellToRemove.classList][1]}`);
  };

  dragStart = (e) => {
    e.dataTransfer.setData("id", e.target.dataset.id);
  };

  cancelDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return;
  };

  setStartPoint = (startPos) => {
    const [i, j] = startPos;
    const grid = document.querySelector(`[data-id="${startPos}"]`);
    grid.setAttribute("draggable", "true");
    grid.classList.add("startPoint");
    grid.addEventListener("dragstart", this.dragStart), (this.grid[i][j] = "s");
  };

  setEndPoint = (endPos) => {
    const [i, j] = endPos;
    const grid = document.querySelector(`[data-id="${endPos}"]`);
    grid.setAttribute("draggable", "true");
    grid.classList.add("endPoint");
    grid.addEventListener("dragstart", this.dragStart);
    this.grid[i][j] = "t";
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
        this.grid[i][j] = 1;
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
    this.setStartPoint(this.startPoint);
    this.setEndPoint(this.endPoint);
    this.board.addEventListener("drop", this.dropTarget);
    this.board.addEventListener("dragenter", this.cancelDefault);
    this.board.addEventListener("dragover", this.cancelDefault);
  }
}
