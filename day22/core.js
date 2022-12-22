import { makeNeighbors } from './neighbors.js';

export function parse(input) {
  const [carte, steps] = input.split('\n\n');

  return { carte, instructions: steps.trim() };
}

export function parseSteps(s) {
  let number = '';
  let steps = [];
  s.split('').forEach(c => {
    if (c !== 'L' && c !== 'R') {
      number += c;
    } else {
      steps.push(parseInt(number));
      steps.push(c);
      number = '';
    }
  });
  steps.push(parseInt(number));

  return steps;
}
export function parseFlat(carte) {
  const map = new Map();

  carte.split('\n').forEach((line, j) => {
    const pts = line.split('');
    pts.forEach((pt, i) => {
      if (pt !== ' ') {
        map.set(`${i + 1},${j + 1}`, pt);
      }
    });
  });

  return map;
}

export function parseCube(carte, { size = 50 }) {
  const lines = carte.split('\n');

  const lY = Math.floor(lines.length / size);
  const lX = Math.floor(Math.max(...lines.map(l => l.length)) / size);

  const cube = new Map();
  [...Array(lX * lY)].forEach((_, id) => {
    const map = new Map();
    cube.set(id + 1, { map });
  });

  lines.forEach((line, j) => {
    const _y = Math.floor(j / size);
    const y = (j % size) + 1;

    const pts = line.split('');
    pts.forEach((pt, i) => {
      const _x = Math.floor(i / size);
      const x = (i % size) + 1;

      const cubeId = _y * lX + _x + 1;

      if (pt !== ' ') {
        const meta = cube.get(cubeId);
        meta.map.set(`${x},${y}`, pt);
        meta.toGlobal = ([x, y]) => [_x * size + x, _y * size + y];
      }
    });
  });

  const neighborsById = makeNeighbors(cube, size);

  return { cube, neighborsById };
}
