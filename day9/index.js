import parse, { logMap, logVisited } from './core.js';

function makePoint(x, y) {
  return `${x},${y}`;
}

const DIR = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1],
};

export function part1(input) {
  const data = parse(input);

  let currentH = [0, 0];
  let currentT = currentH;
  const visited = new Set([makePoint(...currentT)]);

  data.forEach(([direction, steps]) => {
    const [mvtX, mvtY] = DIR[direction];
    let [xH, yH] = currentH;
    let [xT, yT] = currentT;

    for (let i = 0; i < steps; i++) {
      xH += mvtX;
      yH += mvtY;

      const distX = Math.abs(xH - xT);
      const signX = Math.sign(xH - xT);
      const distY = Math.abs(yH - yT);
      const signY = Math.sign(yH - yT);

      if (distX > 1 && distY === 0) {
        xT += mvtX;
      } else if (distY > 1 && distX === 0) {
        yT += mvtY;
      } else if (distX + distY > 2) {
        xT += signX;
        yT += signY;
      }

      currentH = [xH, yH];
      currentT = [xT, yT];

      visited.add(makePoint(...currentT));
    }
  });

  return visited.size;
}

export function part2(input) {
  const data = parse(input);

  const knots = Array.from({ length: 10 }, () => [0, 0]);
  const visited = new Set([makePoint(...knots.at(-1))]);

  data.forEach(([direction, steps]) => {
    const [mvtX, mvtY] = DIR[direction];
    let [xH, yH] = knots[0];

    for (let i = 0; i < steps; i++) {
      xH += mvtX;
      yH += mvtY;

      knots[0] = [xH, yH];

      for (let i = 1; i < knots.length; i++) {
        let [x, y] = knots[i];
        const [X, Y] = knots[i - 1];

        const distX = Math.abs(X - x);
        const signX = Math.sign(X - x);
        const distY = Math.abs(Y - y);
        const signY = Math.sign(Y - y);

        if (distX > 1 && distY === 0) {
          x += signX;
        } else if (distY > 1 && distX === 0) {
          y += signY;
        } else if (distX + distY > 2) {
          x += signX;
          y += signY;
        }

        knots[i] = [x, y];
      }

      visited.add(makePoint(...knots.at(-1)));
      // logMap(knots);
    }
  });

  // logVisited(visited);

  return visited.size;
}
