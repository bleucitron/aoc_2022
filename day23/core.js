export function parse(input) {
  const lines = input.trim().split('\n');

  const elves = new Set();

  lines.forEach((line, j) => {
    const points = line.trim().split('');

    points.forEach((point, i) => {
      if (point === '#') {
        elves.add(makePosition([i + 1, j + 1]));
      }
    });
  });

  return elves;
}

function makePosition([x, y]) {
  return `${x},${y}`;
}
function parsePosition(position) {
  return position.split(',').map(e => parseInt(e));
}

export function logMap(set) {
  const elves = [...set].map(parsePosition);
  const allX = elves.map(([x, y]) => x);
  const allY = elves.map(([x, y]) => y);
  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);

  let s = '';
  for (let y = 0; y <= maxY - minY; y++) {
    for (let x = 0; x <= maxX - minX; x++) {
      const coords = [minX + x, minY + y];
      const hasElf = set.has(makePosition(coords));
      s += hasElf ? '#' : '.';
    }
    s += '\n';
  }
  // console.log(s);
  return s.trim();
}

const deltas = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

export const { N, W, S, E } = {
  N: 0,
  W: 1,
  S: 2,
  E: 3,
};

const directionById = {
  0: 'N',
  1: 'W',
  2: 'S',
  3: 'E',
};

const deltaByDir = {
  [N]: [0, -1],
  [W]: [-1, 0],
  [S]: [0, 1],
  [E]: [1, 0],
};

export function round(set, order) {
  // first: get propositions
  const propositions = [];

  function isElf(coords) {
    return set.has(makePosition(coords));
  }

  set.forEach(p => {
    const [x, y] = parsePosition(p);

    // check if alone
    const alone = deltas.every(([dX, dY]) => !isElf([x + dX, y + dY]));

    if (alone) return [x, y];

    // propose a move
    let proposition = [x, y];
    for (let n = 0; n < order.length; n++) {
      const dir = order[n];

      const [dX, dY] = deltaByDir[dir];
      const options =
        dX === 0
          ? [
              [-1, dY],
              [0, dY],
              [1, dY],
            ]
          : [
              [dX, -1],
              [dX, 0],
              [dX, 1],
            ];

      const free = options.every(([dX, dY]) => !isElf([x + dX, y + dY]));

      if (free) {
        proposition = [x + dX, y + dY];
        break;
      }
    }

    propositions.push({
      position: p,
      proposition: makePosition(proposition),
    });
  });

  // second: check propositions
  let moves = 0;
  propositions.forEach(({ position, proposition }) => {
    // check if other elf made same proposition
    const nbSimilar = propositions.filter(
      ({ proposition: p }) => p === proposition,
    ).length;

    if (nbSimilar > 1) {
      return;
    }

    if (proposition !== position) {
      moves++;
      set.delete(position);
      set.add(proposition);
    }
  });
  // end of the round
  const [first, ...rest] = order;
  order = [...rest, first];

  return { set, order, moves };
}
