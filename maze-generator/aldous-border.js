"strict mode";
import { randomNum } from "../util.js";

const aldousBorder = (grid) => {
  grid.forEach((cells, i) =>
    cells.forEach((cell, j) => {
      grid[i][j] = 1;
    })
  );

  let counter =
    Math.ceil((grid.length - 2) / 2) * Math.ceil((grid[0].length - 2) / 2);
  const startPoint = [1, 1];
  grid[1][1] = 0;
  let next;
  let pass;
  const dir = (node, num) => {
    const [i, j] = node;
    switch (num) {
      case 1:
        next = [i + 2, j];
        pass = [i + 1, j];
        break;
      case 2:
        next = [i - 2, j];
        pass = [i - 1, j];
        break;
      case 3:
        next = [i, j + 2];
        pass = [i, j + 1];
        break;
      case 4:
        next = [i, j - 2];
        pass = [i, j - 1];
        break;
    }
  };

  let visited = {};
  // visited[startPoint] = true
  let current = startPoint;

  while (true) {
    // if (visited[current]) continue;
    const [curI, curJ] = current;
    visited[current] = true;
    grid[curI][curJ] = 0;

    while (true) {
      dir(current, randomNum(4));
      const [i, j] = next;
      if (i > 0 && j > 0 && i < grid.length - 1 && j < grid[0].length - 1)
        break;
    }

    if (!visited[next]) {
      const [passI, passJ] = pass;
      grid[passI][passJ] = 0;
    }

    if (Object.keys(visited).length === counter) break;
    current = next;
  }

  console.log(grid);

  grid.forEach((cells, i) =>
    cells.forEach((cell, j) => {
      const g = document.querySelector(`[data-id="${i},${j}"]`);
      g.style.backgroundColor = cell === 1 ? "black" : "white";
    })
  );
};

export default aldousBorder;
