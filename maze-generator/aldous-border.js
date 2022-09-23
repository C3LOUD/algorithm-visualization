"strict mode";
import { randomNum } from "../util.js";

const aldousBorder = (grid) => {
  let counter = 0;
  grid.forEach((cells, i) => {
    cells.forEach((cell, j) => {
      const grid = document.querySelector(`[data-id="${[i, j]}"]`);
      grid.style.backgroundColor = "black";
      grid.style.border = "1px solid white";
      counter += 1;
    });
  });

  const randomGridMax = randomNum(grid.length - 1);
  const randomSwitcher = randomNum(2) === 2 ? true : false;
  const startPoint = randomSwitcher ? [0, randomGridMax] : [randomGridMax, 0];
  let next;
  let pass;
  const randomDir = (node) => {
    const [i, j] = node;
    switch (randomNum(4)) {
      case 0:
        next = [i + 2, j];
        pass = [i + 1, j];
        break;
      case 1:
        next = [i - 2, j];
        pass = [i - 1, j];
        break;
      case 2:
        next = [i + 2, j];
        pass = [i + 1, j];
        break;
      case 3:
        next = [i + 2, j];
        pass = [i + 1, j];
        break;
    }
    return next;
  };

  let visited = {};
  // visited[startPoint] = true
  let current = startPoint;

  while (true) {
    if (visited[current]) continue;
    visited[current] = true;
    //check if all of the maze has been walk through

    while (true) {
      randomDir(current);
      const [i, j] = next;
      if (i < 0 || j < 0 || i > grid.length - 1 || j > grid.length - 1) {
      } else {
        break;
      }
    }
    visited[pass] = true;

    if (Object.keys(visited).length === 10) return;
    console.log(next);
    current = next;
  }
};

export default aldousBorder;
