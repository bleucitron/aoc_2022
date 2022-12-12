import parse, { logMap } from './core.js';

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

function distance([x, y], [X, Y]) {
  return Math.abs(X - x) + Math.abs(Y - y);
}

function move(grid, position, visited, end) {
  let [x, y] = position.split('-');
  x = parseInt(x);
  y = parseInt(y);

  const currentHeight =
    grid[x][y] === 'S' ? 0 : letters.findIndex(l => l === grid[x][y]);
  let newX = x;
  let newY = y;
  let possibleHeight = -Infinity;
  let d = distance([x, y], end);
  let stop = false;

  const debug = x === 22 && (y === 138 || y === 139);
  console.log('');
  console.log('Current', x, y, grid[x][y]);
  // console.log('VISITED', [...visited].slice(-5));

  // console.log('CURRENT', x, y, grid[x][y]);
  let options = [];

  for (let i = -1; i <= 1; i++) {
    for (let j = 1; j >= -1; j--) {
      if (i === 0 && j === 0) {
        continue;
      }
      if (Math.abs(i) + Math.abs(j) === 2) {
        continue;
      }
      const xi = x + i;
      const yj = y + j;

      const letter = grid[xi]?.[yj];
      if (debug) {
        console.log('X', xi, 'Y', yj, letter);
      }

      console.log({ x: xi, y: yj });
      if (visited.has(`${xi}-${yj}`)) {
        continue;
      }

      const height =
        letter === 'E'
          ? letters.length - 1
          : letters.findIndex(l => l === letter);
      if (height === -1) {
        continue;
      }

      const newD = distance([xi, yj], end);
      console.log({ x: xi, y: yj, height, distance: newD });

      if (height - currentHeight <= 1) {
        options.push({ coords: [xi, yj], height, distance: newD });
        // if (newD < d) {
        //   newX = xi;
        //   newY = yj;
        //   d = newD;
        //   // break;
        // }
      }

      if (height - currentHeight <= 0) {
        if (letter === 'E') {
          options = [{ coords: [xi, yj], height, distance: newD }];
          stop = true;
          break;
        }

        // if (newD < d) {
        //   newX = xi;
        //   newY = yj;
        //   d = newD;
        // }

        // if (height > possibleHeight) {
        //   possibleHeight = height;

        //   newX = xi;
        //   newY = yj;
        // }
      }
    }
    if (stop) break;
  }
  const destination = options.sort((a, b) => a.distance - b.distance)[0];
  console.log('Options', options);
  console.log(' =>', destination);
  return destination.coords;
}

export function part1(input) {
  const grid = parse(input);

  let coords;
  let end;
  for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === 'S') {
        coords = [i, j];
      }
      if (line[j] === 'E') {
        end = [i, j];
      }
    }
    if (coords && end) break;
  }

  const initialPosition = coords.join('-');
  let position = initialPosition;
  console.log('COORDS', coords);
  console.log('END', end);
  console.log('POSITION', position);
  let steps = [];
  const visited = new Set([]);
  const map = grid.map(line => line.map(() => ' '));

  let i = 0;

  // while (grid[coords[0]][coords[1]] !== 'E') {
  while (i <= 1000 && grid[coords[0]][coords[1]] !== 'E') {
    i++;
    console.log('I', i);
    const [x, y] = coords;
    const [X, Y] = move(grid, position, visited, end);

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

    coords = [X, Y];
    // console.log('new COORDS', coords);
    position = coords.join('-');
    if (!steps.includes(position)) {
      steps.push(position);
      visited.add(position);
    } else {
      const index = steps.findIndex(step => step === position);
      const toRemove = steps.splice(index);

      toRemove.forEach(p => {
        const [x, y] = p.split('-');
        map[x][y] = ' ';
      });
      visited.add(...steps.splice(index));
      steps = steps.splice(0, index);
      // console.log('STEPS', steps);
      position = steps.at(-1) ?? initialPosition;
      coords = position.split('-').map(i => parseInt(i));
    }
    // console.log('Pos', position, visited);
    console.log('Steps', steps);
    // console.log('Coords', coords);
    // console.log('LETTER', grid[coords[0]][coords[1]]);
    // console.log('Steps', steps.length);
  }
  map[coords[0]][coords[1]] = 'E';

  logMap(map);

  return steps.length;
}

export function part2(input) {
  const data = parse(input);

  return data.length;
}
