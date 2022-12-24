export function parse(input) {
  const lines = input.trim().split('\n');

  const height = lines.length - 2;
  let width;

  const walls = new Set();
  const winds = new Map();
  lines.forEach((line, j) => {
    line = line.trim();
    width = line.length - 2;
    line.split('').forEach((pt, i) => {
      const position = makePosition([i, j]);

      if (pt === '#') {
        walls.add(position);
      }
      if (
        i !== 0 &&
        i !== width + 1 &&
        j !== 0 &&
        j !== height + 1 &&
        pt !== '#'
      ) {
        winds.set(position, pt === '.' ? '' : pt);
      }
    });
  });

  return { winds, walls, width, height };
}

export function makePosition([x, y]) {
  return `${x},${y}`;
}
export function parsePosition(position) {
  return position
    .split('_')[0]
    .split(',')
    .map(e => parseInt(e));
}

const deltaByWind = {
  '>': [1, 0],
  '<': [-1, 0],
  '^': [0, -1],
  v: [0, 1],
};

const moves = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
  [0, 0],
];

function moveWinds({ winds, width, height }) {
  const newWinds = new Map();

  [...winds.entries()].forEach(([position, value]) => {
    const [x, y] = parsePosition(position);
    const ws = value.split('');

    ws.forEach(w => {
      const [dX, dY] = deltaByWind[w];
      let newPosition = makePosition([
        (x + dX) % width || width,
        (y + dY) % height || height,
      ]);
      const newValue = newWinds.get(newPosition) ?? '';

      newWinds.set(newPosition, newValue + w);
    });
  });
  return newWinds;
}

export function walk({ winds, walls, width, height, start, objective }) {
  let minutes = 0;
  let found = false;
  let byMinute = [new Set([start])];

  while (!found) {
    const positions = byMinute[minutes];

    if (positions.has(objective)) {
      found = true;
      break;
    }

    winds = moveWinds({ winds, width, height });

    byMinute[minutes + 1] = new Set();
    positions.forEach(position => {
      const [x, y] = parsePosition(position);

      const possible = moves
        .map(([dX, dY]) => [x + dX, y + dY])
        .filter(([X, Y]) => {
          const pos = makePosition([X, Y]);

          return X >= 0 && Y >= 0 && !walls.has(pos) && !winds.has(pos);
        })
        .map(makePosition);
      possible.forEach(p => {
        byMinute[minutes + 1].add(p);
      });
    });
    minutes++;
  }
  return { minutes, winds };
}

export function logMap({ winds, width, height }) {
  const xS = 1;
  const yS = 0;
  const xE = width;
  const yE = height + 1;

  let s = '';
  for (let y = 0; y <= height + 1; y++) {
    for (let x = 0; x <= width + 1; x++) {
      const coords = [x, y];
      if (x === 0 || x === width + 1 || y === 0 || y === height + 1) {
        if ((x === xS && y === yS) || (x === xE && y === yE)) {
          s += ' ';
        } else {
          s += '#';
        }
      } else {
        const position = makePosition(coords);
        const pt = winds.get(position);

        if (!pt) {
          s += ' ';
        } else if (pt.length > 1) {
          s += pt.length;
        } else {
          s += pt;
        }
      }
    }
    s += '\n';
  }
  console.log();
  console.log(s);
  return s.trim();
}
