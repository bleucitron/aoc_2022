export default function parse(input) {
  const data = input.trim().split('\n');

  const grid = data.map(line => line.split(''));

  // console.log('Grid', grid);

  return grid;
}

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

const directions = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

export function trail(grid, start) {
  const xLimit = grid.length - 1;
  const yLimit = grid[0].length - 1;

  let queue = [start];
  const [xS, yS] = start;
  const position = `${xS}-${yS}`;

  // BFS algorithm: https://en.wikipedia.org/wiki/Breadth-first_search
  const tree = new Map();
  tree.set(position, {
    position,
    coords: start,
    letter: grid[xS][yS],
    parent: null,
  });

  let end;

  while (queue.length) {
    const [x, y] = queue.shift();
    const letter = grid[x][y];

    if (letter === 'E') {
      const position = `${x}-${y}`;
      end = tree.get(position);
      break;
    }

    directions.forEach(([i, j]) => {
      const X = x + i;
      const Y = y + j;
      const pos = `${X}-${Y}`;

      if (X < 0 || Y < 0 || X > xLimit || Y > yLimit) {
        return;
      }
      const letter = grid[X][Y];

      const prevHeight = letters.findIndex(l => grid[x]?.[y] === l);
      const height =
        letter === 'E'
          ? letters.length - 1
          : letters.findIndex(l => grid[X]?.[Y] === l);

      const diff = height - prevHeight;

      if (diff <= 1 && !tree.has(pos)) {
        queue.push([X, Y]);
        const position = `${X}-${Y}`;
        tree.set(position, {
          position,
          coords: [X, Y],
          letter: grid[X]?.[Y],
          parent: tree.get(`${x}-${y}`).position,
        });
      }
    });
  }

  // Never got the end
  if (!end) return null;

  let current = end;
  const path = [end.position];

  while (current.parent) {
    const future = tree.get(current.parent);

    current = future;
    path.unshift(current.position);
  }

  return path;
}

function parsePosition(position) {
  return position.split('-').map(n => parseInt(n));
}

export function logMap(grid, path) {
  const map = grid.map(line => line.map(() => ' '));

  path.map(parsePosition).forEach(([x, y], i) => {
    if (i === 0) {
      map[x][y] = 'S';
    } else if (i === path.length - 1) {
      map[x][y] = 'E';
    } else {
      const [X, Y] = parsePosition(path[i + 1]);

      const dir =
        X - x > 0
          ? 'v'
          : x - X > 0
          ? '^'
          : Y - y > 0
          ? '>'
          : y - Y > 0
          ? '<'
          : ' ';
      map[x][y] = dir;
    }
  });

  let s = '';

  map.forEach(line => {
    line.forEach(letter => {
      s += letter;
    });

    s += '\n';
  });

  return s;
}
